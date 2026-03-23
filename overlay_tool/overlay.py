"""Overlay window - fully responsive UI with settings panel."""
import ctypes
import sys
import tkinter as tk
from pathlib import Path

from config import SETTINGS_META
from capture import OCR_MODEL_PRESETS, OCR_MODEL_KEYS, DEFAULT_OCR_MODEL

GWL_EXSTYLE = -20
WS_EX_APPWINDOW = 0x00040000
WS_EX_TOOLWINDOW = 0x00000080
SW_HIDE = 0
SW_SHOW = 5
SWP_NOMOVE = 0x0002
SWP_NOSIZE = 0x0001
SWP_NOZORDER = 0x0004
SWP_FRAMECHANGED = 0x0020

def _get_icon_path() -> Path:
    if getattr(sys, "frozen", False):
        base = Path(sys._MEIPASS)
    else:
        base = Path(__file__).parent
    return base / "logo.png"


def _get_hwnd(root: tk.Tk) -> int:
    """Get the real top-level HWND for a Tkinter window."""
    root.update_idletasks()
    inner = root.winfo_id()
    parent = ctypes.windll.user32.GetParent(inner)
    return parent if parent else inner


def _force_taskbar(root: tk.Tk):
    """Force an overrideredirect window to appear in the Windows taskbar."""
    hwnd = _get_hwnd(root)
    style = ctypes.windll.user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
    style = (style & ~WS_EX_TOOLWINDOW) | WS_EX_APPWINDOW
    ctypes.windll.user32.SetWindowLongW(hwnd, GWL_EXSTYLE, style)
    ctypes.windll.user32.SetWindowPos(
        hwnd, 0, 0, 0, 0, 0,
        SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_FRAMECHANGED,
    )
    ctypes.windll.user32.ShowWindow(hwnd, SW_HIDE)
    ctypes.windll.user32.ShowWindow(hwnd, SW_SHOW)

# ── theme ────────────────────────────────────────────────────
ATTACK_COLORS = {
    "力量": "#ff6b6b", "速度": "#339af0", "技巧": "#51cf66",
    "Power": "#ff6b6b", "Speed": "#339af0", "Technical": "#51cf66",
}
ATTACK_BG = {
    "力量": "#2a1a1a", "速度": "#1a1a2e", "技巧": "#1a2a1a",
}
ATTACK_SYMBOLS = {"力量": "\u2694", "速度": "\u26a1", "技巧": "\u2726"}
DEFAULT_COLOR = "#868e96"

BG = "#0d0d18"
CARD_BG = "#161625"
TOOLBAR_BG = "#0e0e1e"
BORDER = "#2a2a4a"
FG = "#eaeaea"
ACCENT = "#e94560"
MUTED = "#666"
BTN_HOVER = "#222240"

FONT = "Microsoft JhengHei UI"
FONT_FB = "Segoe UI"

NORMAL_SIZE = 16
SPECIAL_SIZE = 15
COND_SIZE = 12
NAME_SIZE = 14
SUB_SIZE = 9
LABEL_SIZE = 10

MIN_W = 180
MIN_H = 80


# ── helpers ──────────────────────────────────────────────────
def _hover_bind(widget, fg_normal, fg_hover, bg_normal=None, bg_hover=None):
    def enter(_):
        widget.config(fg=fg_hover)
        if bg_hover:
            widget.config(bg=bg_hover)
    def leave(_):
        widget.config(fg=fg_normal)
        if bg_normal:
            widget.config(bg=bg_normal)
    widget.bind("<Enter>", enter)
    widget.bind("<Leave>", leave)


def _make_btn(parent, text, fg, bg, command, font_size=9):
    btn = tk.Label(
        parent, text=text, fg=fg, bg=bg,
        font=(FONT, font_size, "bold"), cursor="hand2",
        padx=10, pady=2,
    )
    btn.bind("<Button-1>", lambda _: command())
    _hover_bind(btn, fg, "#fff", bg, BTN_HOVER)
    return btn


def _selectable_label(parent, text, fg, bg, font_tuple, **kw):
    """Read-only Entry that looks like a label but allows text selection."""
    var = tk.StringVar(value=text)
    e = tk.Entry(
        parent, textvariable=var, fg=fg, bg=bg, font=font_tuple,
        readonlybackground=bg, relief="flat", bd=0,
        highlightthickness=0, state="readonly", cursor="arrow",
        **kw,
    )
    return e


# ── settings dialog ──────────────────────────────────────────
class SettingsDialog:
    def __init__(self, parent: tk.Tk, cfg: dict, on_save):
        self._cfg = cfg
        self._on_save = on_save
        self._vars: dict[str, tk.Variable] = {}

        self._win = tk.Toplevel(parent)
        self._win.title("設定")
        icon_path = _get_icon_path()
        if icon_path.exists():
            self._icon = tk.PhotoImage(file=str(icon_path))
            self._win.iconphoto(False, self._icon)
        self._win.attributes("-topmost", True)
        self._win.configure(bg=BG)
        self._win.resizable(False, False)

        tk.Label(
            self._win, text="\u2699  設定", fg=ACCENT, bg=BG,
            font=(FONT, 14, "bold"),
        ).pack(fill="x", padx=16, pady=(16, 12))

        form = tk.Frame(self._win, bg=BG)
        form.pack(fill="x", padx=16)
        for meta in SETTINGS_META:
            self._add_row(form, meta)

        self._add_model_selector(form)
        self._add_capture_toggle(form)

        tk.Frame(self._win, bg=BORDER, height=1).pack(fill="x", padx=16, pady=12)
        region = cfg.get("capture_region", {})
        region_text = (
            f"擷取區域:  ({region.get('left', '?')}, {region.get('top', '?')})  "
            f"{region.get('width', '?')} x {region.get('height', '?')}"
        )
        tk.Label(self._win, text=region_text, fg=MUTED, bg=BG, font=(FONT, 9)).pack(fill="x", padx=16)

        btn_row = tk.Frame(self._win, bg=BG)
        btn_row.pack(fill="x", padx=16, pady=(16, 16))
        _make_btn(btn_row, "  儲存  ", "#51cf66", "#1e3a2a", self._save, 10).pack(side="right")
        _make_btn(btn_row, "  取消  ", MUTED, CARD_BG, self._win.destroy, 10).pack(side="right", padx=(0, 8))
        _make_btn(btn_row, "  重置  ", "#ffa94d", "#2a2010", self._reset, 10).pack(side="left")

        self._win.update_idletasks()
        ww = self._win.winfo_reqwidth() + 40
        wh = self._win.winfo_reqheight() + 10
        px = parent.winfo_x() + (parent.winfo_width() - ww) // 2
        py = parent.winfo_y() + (parent.winfo_height() - wh) // 2
        self._win.geometry(f"{ww}x{wh}+{max(0, px)}+{max(0, py)}")

    def _add_row(self, parent, meta):
        row = tk.Frame(parent, bg=BG)
        row.pack(fill="x", pady=6)
        tk.Label(row, text=meta["label"], fg=FG, bg=BG, font=(FONT, 11), anchor="w", width=14).pack(side="left")
        current = self._cfg.get(meta["key"], 0)
        if meta["type"] == "int":
            var = tk.IntVar(value=int(current))
            tk.Spinbox(
                row, from_=meta["min"], to=meta["max"], increment=meta["step"],
                textvariable=var, width=8, font=(FONT_FB, 11),
                bg=CARD_BG, fg=FG, buttonbackground=TOOLBAR_BG, insertbackground=FG,
                relief="flat", highlightthickness=1, highlightbackground=BORDER,
            ).pack(side="right")
            if "ms" in meta["key"]:
                tk.Label(row, text="ms", fg=MUTED, bg=BG, font=(FONT_FB, 9)).pack(side="right", padx=(0, 4))
        else:
            var = tk.DoubleVar(value=float(current))
            tk.Spinbox(
                row, from_=meta["min"], to=meta["max"], increment=meta["step"],
                textvariable=var, width=8, font=(FONT_FB, 11), format="%.2f",
                bg=CARD_BG, fg=FG, buttonbackground=TOOLBAR_BG, insertbackground=FG,
                relief="flat", highlightthickness=1, highlightbackground=BORDER,
            ).pack(side="right")
        self._vars[meta["key"]] = var

    def _add_model_selector(self, parent):
        tk.Frame(parent, bg=BORDER, height=1).pack(fill="x", pady=(12, 8))
        tk.Label(
            parent, text="OCR 辨識模型", fg=ACCENT, bg=BG,
            font=(FONT, 11, "bold"), anchor="w",
        ).pack(fill="x")

        current_key = self._cfg.get("ocr_model", DEFAULT_OCR_MODEL)
        self._model_var = tk.StringVar(value=current_key)
        self._model_desc_label = None

        for key in OCR_MODEL_KEYS:
            preset = OCR_MODEL_PRESETS[key]
            frame = tk.Frame(parent, bg=BG)
            frame.pack(fill="x", pady=2)

            rb = tk.Radiobutton(
                frame, variable=self._model_var, value=key,
                bg=BG, fg=FG, selectcolor=CARD_BG,
                activebackground=BG, activeforeground=FG,
                highlightthickness=0, bd=0,
                command=self._on_model_changed,
            )
            rb.pack(side="left")

            tk.Label(
                frame, text=preset["label"], fg=FG, bg=BG,
                font=(FONT, 10, "bold"), anchor="w",
            ).pack(side="left")

            tk.Label(
                frame, text=f"  {preset['desc']}", fg=MUTED, bg=BG,
                font=(FONT, 9), anchor="w",
            ).pack(side="left", padx=(4, 0))

        self._model_desc_label = tk.Label(
            parent, text="", fg="#aaa", bg=BG, font=(FONT, 9),
            anchor="w", wraplength=350, justify="left",
        )
        self._model_desc_label.pack(fill="x", pady=(4, 0))
        self._on_model_changed()

    def _on_model_changed(self):
        key = self._model_var.get()
        preset = OCR_MODEL_PRESETS.get(key, {})
        hint = {
            "v5_server": "推薦：最高辨識率，適合難辨字體。首次使用會自動下載模型。",
            "v5_mobile": "輕量快速，辨識率略低於 Server，適合低配電腦。",
            "v4_server": "上一代高精度模型，穩定可靠。",
            "v4_mobile": "最快速度，辨識率最低，適合要求即時反應的場景。",
        }.get(key, "")
        if self._model_desc_label:
            self._model_desc_label.config(text=hint)

    def _add_capture_toggle(self, parent):
        tk.Frame(parent, bg=BORDER, height=1).pack(fill="x", pady=(12, 8))
        self._hide_capture_var = tk.BooleanVar(value=self._cfg.get("hide_from_capture", True))
        frame = tk.Frame(parent, bg=BG)
        frame.pack(fill="x", pady=2)
        cb = tk.Checkbutton(
            frame, variable=self._hide_capture_var,
            bg=BG, fg=FG, selectcolor=CARD_BG,
            activebackground=BG, activeforeground=FG,
            highlightthickness=0, bd=0,
        )
        cb.pack(side="left")
        tk.Label(
            frame, text="對截圖隱藏 Overlay", fg=FG, bg=BG,
            font=(FONT, 10, "bold"), anchor="w",
        ).pack(side="left")
        tk.Label(
            parent,
            text="開啟時 Overlay 不會出現在截圖中（避免遮擋遊戲畫面擷取）。\n"
                 "關閉後可正常截圖顯示 Overlay。需重新啟動偵測生效。",
            fg=MUTED, bg=BG, font=(FONT, 9), anchor="w",
            wraplength=350, justify="left",
        ).pack(fill="x", pady=(2, 0))

    def _save(self):
        for key, var in self._vars.items():
            self._cfg[key] = var.get()
        self._cfg["ocr_model"] = self._model_var.get()
        self._cfg["hide_from_capture"] = self._hide_capture_var.get()
        self._on_save(self._cfg)
        self._win.destroy()

    def _reset(self):
        from config import ALL_DEFAULTS
        for meta in SETTINGS_META:
            default = ALL_DEFAULTS.get(meta["key"])
            if default is not None:
                self._vars[meta["key"]].set(default)
        self._model_var.set(ALL_DEFAULTS.get("ocr_model", DEFAULT_OCR_MODEL))
        self._on_model_changed()
        self._hide_capture_var.set(ALL_DEFAULTS.get("hide_from_capture", True))


# ── region selector ──────────────────────────────────────────
class RegionSelector:
    def __init__(self, parent: tk.Tk, callback):
        self._callback = callback
        self._win = tk.Toplevel(parent)
        self._win.overrideredirect(True)
        self._win.attributes("-topmost", True)
        self._win.attributes("-alpha", 0.25)
        self._win.configure(bg="black", cursor="crosshair")
        sw = self._win.winfo_screenwidth()
        sh = self._win.winfo_screenheight()
        self._win.geometry(f"{sw}x{sh}+0+0")
        self._canvas = tk.Canvas(self._win, bg="black", highlightthickness=0, width=sw, height=sh)
        self._canvas.pack(fill="both", expand=True)
        self._canvas.create_text(sw // 2, 50, text="拖曳選擇擷取區域 (Esc 取消)", fill="white", font=(FONT, 16, "bold"))
        self._coords_text = self._canvas.create_text(sw // 2, 85, text="", fill="#aaa", font=(FONT_FB, 11))
        self._sx = self._sy = 0
        self._rect = None
        self._canvas.bind("<Button-1>", self._press)
        self._canvas.bind("<B1-Motion>", self._drag)
        self._canvas.bind("<ButtonRelease-1>", self._release)
        self._win.bind("<Escape>", lambda _: self._win.destroy())

    def _press(self, e):
        self._sx, self._sy = e.x, e.y
        if self._rect:
            self._canvas.delete(self._rect)
        self._rect = self._canvas.create_rectangle(e.x, e.y, e.x, e.y, outline="#e94560", width=2, dash=(6, 3))

    def _drag(self, e):
        if self._rect:
            self._canvas.coords(self._rect, self._sx, self._sy, e.x, e.y)
            x, y = min(self._sx, e.x), min(self._sy, e.y)
            self._canvas.itemconfig(self._coords_text, text=f"({x}, {y})  {abs(e.x-self._sx)} \u00d7 {abs(e.y-self._sy)}")

    def _release(self, e):
        x1, y1 = min(self._sx, e.x), min(self._sy, e.y)
        x2, y2 = max(self._sx, e.x), max(self._sy, e.y)
        w, h = x2 - x1, y2 - y1
        self._win.destroy()
        if w > 10 and h > 10:
            self._callback({"left": x1, "top": y1, "width": w, "height": h})


# ── main overlay ─────────────────────────────────────────────
class OverlayWindow:
    def __init__(self, opacity: float = 0.88, position: dict | None = None):
        self.root = tk.Tk()
        self.root.title("MHST3 Overlay")

        icon_path = _get_icon_path()
        if icon_path.exists():
            self._icon = tk.PhotoImage(file=str(icon_path))
            self.root.iconphoto(True, self._icon)

        self.root.overrideredirect(True)
        self.root.attributes("-topmost", True)
        self.root.attributes("-alpha", opacity)
        self.root.configure(bg=BG)

        pos = position or {}
        x, y = pos.get("x", 50), pos.get("y", 50)
        w, h = pos.get("w", 0), pos.get("h", 0)
        self.root.geometry(f"{w}x{h}+{x}+{y}" if w and h else f"+{x}+{y}")

        self._drag_data = {"x": 0, "y": 0}
        self._resize_origin: dict = {}
        self.on_toggle_scan = None
        self.on_select_region = None
        self.on_open_settings = None
        self._current_entries: list = []
        self._last_cols = 0

        # use grid for root children so grip never gets hidden
        self.root.rowconfigure(1, weight=1)
        self.root.columnconfigure(0, weight=1)

        self._toolbar = tk.Frame(self.root, bg=TOOLBAR_BG, padx=8, pady=5)
        self._toolbar.grid(row=0, column=0, sticky="ew")
        self._build_toolbar()

        self._body = tk.Frame(self.root, bg=BG)
        self._body.grid(row=1, column=0, sticky="nsew", padx=3, pady=3)

        self._grip = tk.Label(
            self.root, text="\u25E2", fg=MUTED, bg=BORDER,
            font=(FONT_FB, 6), anchor="se", cursor="size_nw_se", padx=2, pady=1,
        )
        self._grip.grid(row=2, column=0, sticky="ew")

        self._show_idle()
        self._bind_events()
        self._body.bind("<Configure>", self._on_body_resize)
        _force_taskbar(self.root)

    # ── toolbar ──────────────────────────────────────────────
    def _build_toolbar(self):
        bar = self._toolbar
        self._title = tk.Label(bar, text="MHST3", fg=ACCENT, bg=TOOLBAR_BG, font=(FONT, 10, "bold"))
        self._title.pack(side="left")

        close = tk.Label(bar, text=" \u2715 ", fg="#555", bg=TOOLBAR_BG, font=(FONT_FB, 10), cursor="hand2")
        close.pack(side="right")
        close.bind("<Button-1>", lambda _: self.root.destroy())
        _hover_bind(close, "#555", "#ff6b6b")

        gear = _make_btn(bar, " \u2699 ", "#aaa", TOOLBAR_BG, lambda: self._fire("on_open_settings"))
        gear.pack(side="right", padx=2)
        tk.Frame(bar, bg=BORDER, width=1).pack(side="right", fill="y", padx=6, pady=2)
        self._status = tk.Label(bar, text="\u25cf 已停止", fg=MUTED, bg=TOOLBAR_BG, font=(FONT, 8))
        self._status.pack(side="right", padx=(0, 6))

        btns = tk.Frame(bar, bg=TOOLBAR_BG)
        btns.pack(side="left", padx=(12, 0))
        self._scan_btn = _make_btn(btns, " \u25B6 開始 ", "#51cf66", "#172917", lambda: self._fire("on_toggle_scan"))
        self._scan_btn.pack(side="left", padx=(0, 6))
        self._region_btn = _make_btn(btns, " \u25A3 框選 ", "#339af0", "#141e2e", lambda: self._fire("on_select_region"))
        self._region_btn.pack(side="left")

    def _fire(self, attr):
        cb = getattr(self, attr, None)
        if cb:
            cb()

    def set_scanning(self, active: bool):
        if active:
            self._scan_btn.config(text=" \u23F8 暫停 ", fg="#ff6b6b", bg="#2a1515")
            self._status.config(text="\u25cf 偵測中", fg="#51cf66")
        else:
            self._scan_btn.config(text=" \u25B6 開始 ", fg="#51cf66", bg="#172917")
            self._status.config(text="\u25cf 已停止", fg=MUTED)

    def set_opacity(self, val: float):
        self.root.attributes("-alpha", val)

    # ── drag (entire toolbar) ────────────────────────────────
    def _bind_events(self):
        for w in (self._toolbar, self._title, self._status):
            w.bind("<Button-1>", self._on_drag_press)
            w.bind("<B1-Motion>", self._on_drag_move)
        self._grip.bind("<Button-1>", self._on_grip_press)
        self._grip.bind("<B1-Motion>", self._on_grip_drag)

    def _on_drag_press(self, e):
        self._drag_data = {"x": e.x_root - self.root.winfo_x(), "y": e.y_root - self.root.winfo_y()}

    def _on_drag_move(self, e):
        nx = e.x_root - self._drag_data["x"]
        ny = e.y_root - self._drag_data["y"]
        w = self.root.winfo_width()
        h = self.root.winfo_height()
        self.root.geometry(f"{w}x{h}+{nx}+{ny}")

    # ── resize (grip) ────────────────────────────────────────
    def _on_grip_press(self, e):
        self._resize_origin = {
            "x": e.x_root, "y": e.y_root,
            "w": self.root.winfo_width(), "h": self.root.winfo_height(),
            "rx": self.root.winfo_x(), "ry": self.root.winfo_y(),
        }

    def _on_grip_drag(self, e):
        o = self._resize_origin
        if not o:
            return
        nw = max(MIN_W, o["w"] + e.x_root - o["x"])
        nh = max(MIN_H, o["h"] + e.y_root - o["y"])
        self.root.geometry(f"{nw}x{nh}+{o['rx']}+{o['ry']}")

    # ── responsive card layout ───────────────────────────────
    def _on_body_resize(self, _=None):
        if not self._current_entries:
            return
        body_w = self._body.winfo_width()
        n = len(self._current_entries)
        card_min = 180
        cols = max(1, body_w // card_min) if body_w > 50 else n
        cols = min(cols, n)
        if cols != self._last_cols:
            self._render()

    def _show_idle(self):
        self._current_entries = []
        self._last_cols = 0
        self._clear_body()
        self._body.columnconfigure(0, weight=1)
        tk.Label(
            self._body, text="等待偵測...\n按「開始」後，框選遊戲畫面中魔物名稱的區域",
            fg=MUTED, bg=BG, font=(FONT, 10), justify="center",
        ).grid(row=0, column=0, sticky="nsew", padx=10, pady=16)
        self._fit_height()

    def _clear_body(self):
        for w in self._body.winfo_children():
            w.destroy()
        cols, rows = self._body.grid_size()
        for i in range(cols):
            self._body.columnconfigure(i, weight=0, minsize=0)
        for i in range(rows):
            self._body.rowconfigure(i, weight=0, minsize=0)

    def update_monsters(self, entries: list[tuple[dict, list[dict]]]):
        if not entries:
            self._show_idle()
            return
        self._current_entries = entries
        self._render()

    def _render(self):
        self._clear_body()
        entries = self._current_entries
        if not entries:
            return

        body_w = self._body.winfo_width()
        n = len(entries)
        card_min = 180
        cols = max(1, body_w // card_min) if body_w > 50 else n
        cols = min(cols, n)
        self._last_cols = cols

        for c in range(cols):
            self._body.columnconfigure(c, weight=1, uniform="card")
        rows = (n + cols - 1) // cols
        for r in range(rows):
            self._body.rowconfigure(r, weight=1)

        for idx, (monster, specials) in enumerate(entries):
            r, c = divmod(idx, cols)
            card = self._build_card(monster, specials)
            card.grid(row=r, column=c, sticky="nsew", padx=2, pady=2)

        self._fit_height()

    def _fit_height(self):
        """Shrink window height to fit content, keeping current width and position."""
        self.root.update_idletasks()
        req_h = self.root.winfo_reqheight()
        cur_w = self.root.winfo_width()
        x, y = self.root.winfo_x(), self.root.winfo_y()
        new_h = max(MIN_H, req_h)
        self.root.geometry(f"{cur_w}x{new_h}+{x}+{y}")

    def _build_card(self, m: dict, specials: list[dict]) -> tk.Frame:
        card = tk.Frame(self._body, bg=CARD_BG, padx=12, pady=8)
        card.configure(highlightbackground=BORDER, highlightthickness=1)
        card.columnconfigure(0, weight=1)

        row = 0

        # zh name (selectable)
        e = _selectable_label(card, m["name"], FG, CARD_BG, (FONT, NAME_SIZE, "bold"))
        e.grid(row=row, column=0, sticky="ew"); row += 1

        # en + jp name
        sub = f"{m['nameEN']}  |  {m.get('nameJP', '')}"
        e2 = _selectable_label(card, sub, MUTED, CARD_BG, (FONT_FB, SUB_SIZE))
        e2.grid(row=row, column=0, sticky="ew", pady=(0, 4)); row += 1

        # normal attack
        tk.Label(card, text="\u25B6 普通攻擊", fg="#888", bg=CARD_BG, font=(FONT, LABEL_SIZE), anchor="w").grid(
            row=row, column=0, sticky="ew", pady=(2, 0)); row += 1
        atk = m["normalAttack"]
        color = ATTACK_COLORS.get(atk, DEFAULT_COLOR)
        abg = ATTACK_BG.get(atk, CARD_BG)
        sym = ATTACK_SYMBOLS.get(atk, "")
        atk_text = f" {sym}  {atk} " if atk and atk != "-" else "  -"
        e3 = _selectable_label(card, atk_text, color, abg, (FONT, NORMAL_SIZE, "bold"))
        e3.grid(row=row, column=0, sticky="ew", pady=(2, 0)); row += 1

        # special attacks
        tk.Label(card, text="\u25B6 特殊攻擊", fg="#888", bg=CARD_BG, font=(FONT, LABEL_SIZE), anchor="w").grid(
            row=row, column=0, sticky="ew", pady=(6, 2)); row += 1

        if not specials:
            tk.Label(card, text="  無", fg="#444", bg=CARD_BG, font=(FONT, SPECIAL_SIZE)).grid(
                row=row, column=0, sticky="w"); row += 1
        else:
            for sp in specials:
                sf = tk.Frame(card, bg=CARD_BG)
                sf.grid(row=row, column=0, sticky="ew", pady=1); row += 1
                tk.Label(sf, text=f"  [{sp['condition']}]", fg="#aaa", bg=CARD_BG, font=(FONT, COND_SIZE), anchor="w").pack(side="left")
                sc = ATTACK_COLORS.get(sp["type"], DEFAULT_COLOR)
                ss = ATTACK_SYMBOLS.get(sp["type"], "")
                tk.Label(sf, text=f" {ss} {sp['type']}", fg=sc, bg=CARD_BG, font=(FONT, SPECIAL_SIZE, "bold")).pack(side="left", padx=(6, 0))

        return card

    # ── public ───────────────────────────────────────────────
    def get_position(self) -> dict:
        return {
            "x": self.root.winfo_x(), "y": self.root.winfo_y(),
            "w": self.root.winfo_width(), "h": self.root.winfo_height(),
        }

    def schedule(self, ms: int, callback):
        return self.root.after(ms, callback)

    def run(self):
        self.root.mainloop()
