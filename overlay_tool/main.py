"""MHST3 Monster Overlay - Integrated Application."""
import argparse
import ctypes
import ctypes.wintypes
import threading
import time
import traceback

from capture import capture_region, recognize_texts, get_ocr, switch_model
from config import load_config, save_config
from monster_data import find_monsters, parse_special_attacks
from overlay import OverlayWindow, RegionSelector, SettingsDialog, _get_hwnd

WDA_EXCLUDEFROMCAPTURE = 0x00000011
WDA_NONE = 0x00000000


def _enable_dpi_awareness():
    """Fix Windows DPI scaling so coordinates match real pixels (2K/4K screens)."""
    try:
        ctypes.windll.shcore.SetProcessDpiAwareness(2)
    except Exception:
        try:
            ctypes.windll.user32.SetProcessDPIAware()
        except Exception:
            pass


def _set_capture_affinity(hwnd: int, hide: bool) -> bool:
    """Toggle window capture visibility (Win10 2004+)."""
    try:
        flag = WDA_EXCLUDEFROMCAPTURE if hide else WDA_NONE
        return ctypes.windll.user32.SetWindowDisplayAffinity(
            ctypes.wintypes.HWND(hwnd), ctypes.wintypes.DWORD(flag)
        )
    except Exception:
        return False


class App:
    def __init__(self, debug: bool = False):
        self.cfg = load_config()
        self._debug = debug
        self.overlay = OverlayWindow(
            opacity=self.cfg.get("overlay_opacity", 0.88),
            position=self.cfg.get("overlay_position"),
        )
        self.overlay.on_toggle_scan = self._toggle_scan
        self.overlay.on_select_region = self._open_region_selector
        self.overlay.on_open_settings = self._open_settings

        self._scanning = False
        self._scan_job = None
        self._clear_job = None
        self._last_keys: list[str] = []
        self._has_result = False
        self._last_found_time: float = 0
        self._bg_lock = threading.Lock()
        self._capture_hidden = False

        threading.Thread(target=self._warmup_ocr, args=(self.cfg.get("ocr_model"),), daemon=True).start()

    def _apply_capture_affinity(self):
        """Set or clear WDA_EXCLUDEFROMCAPTURE based on config."""
        hide = self.cfg.get("hide_from_capture", True)
        if hide == self._capture_hidden:
            return
        try:
            hwnd = _get_hwnd(self.overlay.root)
            if hwnd and _set_capture_affinity(hwnd, hide):
                self._capture_hidden = hide
        except Exception:
            pass

    @staticmethod
    def _warmup_ocr(model_key: str | None = None):
        try:
            get_ocr(model_key)
        except Exception:
            pass

    # ── scan ─────────────────────────────────────────────────
    def _toggle_scan(self):
        if self._scanning:
            self._stop_scan()
        else:
            self._start_scan()

    def _start_scan(self):
        self._scanning = True
        self.overlay.set_scanning(True)
        self._apply_capture_affinity()
        self._schedule_next()

    def _stop_scan(self):
        self._scanning = False
        self.overlay.set_scanning(False)
        if self._scan_job:
            self.overlay.root.after_cancel(self._scan_job)
            self._scan_job = None
        self._cancel_clear()

    def _schedule_next(self):
        if not self._scanning:
            return
        if self._has_result:
            interval = self.cfg.get("found_interval_ms", 3000)
        else:
            interval = self.cfg.get("idle_interval_ms", 1000)
        self._scan_job = self.overlay.schedule(interval, self._scan_tick)

    def _scan_tick(self):
        if not self._scanning:
            return
        threading.Thread(target=self._bg_scan, daemon=True).start()

    def _bg_scan(self):
        with self._bg_lock:
            try:
                region = self.cfg.get("capture_region", {})
                model_key = self.cfg.get("ocr_model")
                img = capture_region(region)
                segments = recognize_texts(img, model_key)
                monsters = find_monsters(segments)
                keys = [m["nameEN"] for m in monsters]

                if self._debug:
                    ts = time.strftime("%H:%M:%S")
                    print(f"[{ts}] OCR: {segments}")
                    if monsters:
                        for m in monsters:
                            print(f"  >> {m['name']} / {m['nameEN']} | {m.get('type','')}")
                    else:
                        print("  (no match)")

                if monsters:
                    self._last_found_time = time.monotonic()

                if keys == self._last_keys:
                    self.overlay.root.after(0, self._schedule_next)
                    return

                if monsters:
                    self._last_keys = keys
                    data = [
                        (m, parse_special_attacks(m.get("specialAttacks", "")))
                        for m in monsters
                    ]
                    self.overlay.root.after(0, self._apply_found, data)
                else:
                    self.overlay.root.after(0, self._handle_empty)

            except Exception:
                traceback.print_exc()
                self.overlay.root.after(0, self._schedule_next)

    def _apply_found(self, data):
        self._cancel_clear()
        self._has_result = True
        self.overlay.update_monsters(data)
        self._schedule_next()

    def _handle_empty(self):
        if not self._has_result:
            self._schedule_next()
            return
        delay_s = self.cfg.get("clear_delay_s", 5)
        elapsed = time.monotonic() - self._last_found_time
        remaining_ms = int((delay_s - elapsed) * 1000)
        if remaining_ms <= 0:
            self._do_clear()
        elif self._clear_job is None:
            self._clear_job = self.overlay.schedule(remaining_ms, self._do_clear)
        self._schedule_next()

    def _do_clear(self):
        self._cancel_clear()
        self._has_result = False
        self._last_keys = []
        self.overlay.update_monsters([])

    def _cancel_clear(self):
        if self._clear_job:
            self.overlay.root.after_cancel(self._clear_job)
            self._clear_job = None

    # ── region selector ──────────────────────────────────────
    def _open_region_selector(self):
        was_scanning = self._scanning
        if was_scanning:
            self._stop_scan()
        RegionSelector(
            self.overlay.root,
            lambda r: self._on_region_selected(r, was_scanning),
        )

    def _on_region_selected(self, region: dict, resume: bool):
        self.cfg["capture_region"] = region
        save_config(self.cfg)
        if resume:
            self._start_scan()

    # ── settings ─────────────────────────────────────────────
    def _open_settings(self):
        was_scanning = self._scanning
        if was_scanning:
            self._stop_scan()
        SettingsDialog(
            self.overlay.root, dict(self.cfg),
            lambda new_cfg: self._on_settings_saved(new_cfg, was_scanning),
        )

    def _on_settings_saved(self, new_cfg: dict, resume: bool):
        old_model = self.cfg.get("ocr_model")
        self.cfg.update(new_cfg)
        save_config(self.cfg)
        self.overlay.set_opacity(self.cfg.get("overlay_opacity", 0.88))
        self._apply_capture_affinity()

        new_model = self.cfg.get("ocr_model")
        if new_model and new_model != old_model:
            threading.Thread(target=switch_model, args=(new_model,), daemon=True).start()

        if resume:
            self._start_scan()

    # ── lifecycle ────────────────────────────────────────────
    def _on_close(self):
        self._scanning = False
        self.cfg["overlay_position"] = self.overlay.get_position()
        save_config(self.cfg)

    def run(self):
        self.overlay.root.protocol(
            "WM_DELETE_WINDOW",
            lambda: (self._on_close(), self.overlay.root.destroy()),
        )
        self.overlay.run()


def cli_mode():
    """Terminal-only mode: capture screen and print OCR + match results."""
    _enable_dpi_awareness()
    cfg = load_config()
    region = cfg.get("capture_region", {})
    interval = cfg.get("idle_interval_ms", 1000) / 1000

    print(f"CLI mode | region={region} | interval={interval}s")
    print("Press Ctrl+C to stop.\n")
    model_key = cfg.get("ocr_model")

    while True:
        try:
            img = capture_region(region)
            segments = recognize_texts(img, model_key)
            monsters = find_monsters(segments)

            print(f"[{time.strftime('%H:%M:%S')}] OCR raw: {segments}")
            if monsters:
                for m in monsters:
                    sa = parse_special_attacks(m.get("specialAttacks", ""))
                    sa_str = ", ".join(f"[{a['condition']}]: {a['type']}" for a in sa) or "-"
                    print(f"  >> {m['name']} / {m['nameEN']} | {m.get('type','')} | SA: {sa_str}")
            else:
                print("  (no match)")
            print()
        except KeyboardInterrupt:
            print("\nStopped.")
            break
        except Exception:
            traceback.print_exc()

        time.sleep(interval)


def main():
    parser = argparse.ArgumentParser(description="MHST3 Monster Overlay")
    parser.add_argument("--cli", action="store_true", help="Terminal-only mode (no GUI)")
    parser.add_argument("--debug", action="store_true", help="Print OCR results to terminal")
    args = parser.parse_args()

    if args.cli:
        cli_mode()
    else:
        _enable_dpi_awareness()
        App(debug=args.debug).run()


if __name__ == "__main__":
    main()
