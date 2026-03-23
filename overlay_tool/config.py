"""Configuration constants and user-editable settings."""
import json
import sys
from pathlib import Path

if getattr(sys, "frozen", False):
    CONFIG_PATH = Path(sys.executable).parent / "config.json"
else:
    CONFIG_PATH = Path(__file__).parent / "config.json"

DEFAULT_CAPTURE_REGION = {"left": 800, "top": 10, "width": 320, "height": 50}
DEFAULT_IDLE_INTERVAL_MS = 1000
DEFAULT_FOUND_INTERVAL_MS = 3000
DEFAULT_CLEAR_DELAY_S = 5
DEFAULT_OVERLAY_OPACITY = 0.88
DEFAULT_OVERLAY_POSITION = {"x": 50, "y": 50}
DEFAULT_OCR_MODEL = "v5_server"
DEFAULT_HIDE_FROM_CAPTURE = True

ALL_DEFAULTS = {
    "capture_region": DEFAULT_CAPTURE_REGION,
    "idle_interval_ms": DEFAULT_IDLE_INTERVAL_MS,
    "found_interval_ms": DEFAULT_FOUND_INTERVAL_MS,
    "clear_delay_s": DEFAULT_CLEAR_DELAY_S,
    "overlay_opacity": DEFAULT_OVERLAY_OPACITY,
    "overlay_position": DEFAULT_OVERLAY_POSITION,
    "ocr_model": DEFAULT_OCR_MODEL,
    "hide_from_capture": DEFAULT_HIDE_FROM_CAPTURE,
}

SETTINGS_META = [
    {
        "key": "idle_interval_ms",
        "label": "未偵測到輪詢 (ms)",
        "type": "int",
        "min": 300,
        "max": 10000,
        "step": 100,
    },
    {
        "key": "found_interval_ms",
        "label": "已偵測到輪詢 (ms)",
        "type": "int",
        "min": 500,
        "max": 10000,
        "step": 100,
    },
    {
        "key": "clear_delay_s",
        "label": "資訊保留時間 (秒)",
        "type": "int",
        "min": 1,
        "max": 60,
        "step": 1,
    },
    {
        "key": "overlay_opacity",
        "label": "視窗透明度",
        "type": "float",
        "min": 0.3,
        "max": 1.0,
        "step": 0.05,
    },
]


def load_config() -> dict:
    cfg = dict(ALL_DEFAULTS)
    if CONFIG_PATH.exists():
        try:
            user = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
            cfg.update(user)
        except (json.JSONDecodeError, OSError):
            pass
    else:
        save_config(cfg)
    return cfg


def save_config(cfg: dict) -> None:
    CONFIG_PATH.write_text(
        json.dumps(cfg, ensure_ascii=False, indent=2), encoding="utf-8"
    )
