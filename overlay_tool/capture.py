"""Screen capture and OCR recognition module (performance-optimized)."""
import threading

import mss
import numpy as np
from PIL import Image, ImageFilter
from rapidocr import EngineType, LangDet, LangRec, ModelType, OCRVersion, RapidOCR

_ocr_engine = None
_ocr_lock = threading.Lock()
_ocr_model_key: str = ""
_sct_local = threading.local()

OCR_MODEL_PRESETS: dict[str, dict] = {
    "v5_server": {
        "label": "PP-OCRv5 Server",
        "desc": "最高精度 | 速度較慢 | 繁/簡/英/日",
        "params": {
            "Det.engine_type": EngineType.ONNXRUNTIME,
            "Det.lang_type": LangDet.CH,
            "Det.model_type": ModelType.SERVER,
            "Det.ocr_version": OCRVersion.PPOCRV5,
            "Rec.engine_type": EngineType.ONNXRUNTIME,
            "Rec.lang_type": LangRec.CH,
            "Rec.model_type": ModelType.SERVER,
            "Rec.ocr_version": OCRVersion.PPOCRV5,
            "Cls.engine_type": EngineType.ONNXRUNTIME,
        },
    },
    "v5_mobile": {
        "label": "PP-OCRv5 Mobile",
        "desc": "高精度 | 速度快 | 繁/簡/英/日",
        "params": {
            "Det.engine_type": EngineType.ONNXRUNTIME,
            "Det.lang_type": LangDet.CH,
            "Det.model_type": ModelType.MOBILE,
            "Det.ocr_version": OCRVersion.PPOCRV5,
            "Rec.engine_type": EngineType.ONNXRUNTIME,
            "Rec.lang_type": LangRec.CH,
            "Rec.model_type": ModelType.MOBILE,
            "Rec.ocr_version": OCRVersion.PPOCRV5,
            "Cls.engine_type": EngineType.ONNXRUNTIME,
        },
    },
    "v4_server": {
        "label": "PP-OCRv4 Server",
        "desc": "高精度 | 速度中等 | 中/英",
        "params": {
            "Det.engine_type": EngineType.ONNXRUNTIME,
            "Det.lang_type": LangDet.CH,
            "Det.model_type": ModelType.SERVER,
            "Det.ocr_version": OCRVersion.PPOCRV4,
            "Rec.engine_type": EngineType.ONNXRUNTIME,
            "Rec.lang_type": LangRec.CH,
            "Rec.model_type": ModelType.SERVER,
            "Rec.ocr_version": OCRVersion.PPOCRV4,
            "Cls.engine_type": EngineType.ONNXRUNTIME,
        },
    },
    "v4_mobile": {
        "label": "PP-OCRv4 Mobile",
        "desc": "一般精度 | 速度最快 | 中/英",
        "params": {
            "Det.engine_type": EngineType.ONNXRUNTIME,
            "Det.lang_type": LangDet.CH,
            "Det.model_type": ModelType.MOBILE,
            "Det.ocr_version": OCRVersion.PPOCRV4,
            "Rec.engine_type": EngineType.ONNXRUNTIME,
            "Rec.lang_type": LangRec.CH,
            "Rec.model_type": ModelType.MOBILE,
            "Rec.ocr_version": OCRVersion.PPOCRV4,
            "Cls.engine_type": EngineType.ONNXRUNTIME,
        },
    },
}

DEFAULT_OCR_MODEL = "v5_server"
OCR_MODEL_KEYS = list(OCR_MODEL_PRESETS.keys())


def _build_ocr(model_key: str) -> RapidOCR:
    preset = OCR_MODEL_PRESETS.get(model_key, OCR_MODEL_PRESETS[DEFAULT_OCR_MODEL])
    return RapidOCR(params=preset["params"])


def get_ocr(model_key: str | None = None) -> RapidOCR:
    global _ocr_engine, _ocr_model_key
    key = model_key or DEFAULT_OCR_MODEL
    if _ocr_engine is not None and _ocr_model_key == key:
        return _ocr_engine
    with _ocr_lock:
        if _ocr_engine is not None and _ocr_model_key == key:
            return _ocr_engine
        _ocr_engine = _build_ocr(key)
        _ocr_model_key = key
    return _ocr_engine


def switch_model(model_key: str) -> None:
    """Force rebuild OCR engine with a new model (call from main thread save)."""
    global _ocr_engine, _ocr_model_key
    with _ocr_lock:
        _ocr_engine = _build_ocr(model_key)
        _ocr_model_key = model_key


def _get_sct() -> mss.mss:
    if not hasattr(_sct_local, "sct"):
        _sct_local.sct = mss.mss()
    return _sct_local.sct


def capture_region(region: dict) -> Image.Image:
    """Capture a screen region. region = {left, top, width, height}."""
    sct = _get_sct()
    shot = sct.grab(region)
    return Image.frombytes("RGB", shot.size, shot.rgb)


def preprocess(img: Image.Image) -> np.ndarray:
    """Sharpen + upscale small captures for better OCR accuracy."""
    w, h = img.size
    if h < 80:
        scale = 80 / h
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    img = img.filter(ImageFilter.SHARPEN)
    return np.array(img)


def recognize_texts(img: Image.Image, model_key: str | None = None) -> list[str]:
    """Run OCR on a PIL image, return each detected text segment."""
    arr = preprocess(img)
    ocr = get_ocr(model_key)
    result = ocr(arr)
    if not result or not result.txts:
        return []
    return list(result.txts)
