"""Monster data loader and matcher (supports multi-monster detection).

Matching priority:
  1. Exact normalised text match
  2. Pinyin (romanisation) exact match
  3. Pinyin substring match (longest wins; text similarity breaks ties)
  4. Text substring match (longest wins — e.g. 凶異碎龍 → 碎龍)
"""
import json
import re
from difflib import SequenceMatcher
from pathlib import Path

from pypinyin import Style, lazy_pinyin

DATA_PATH = Path(__file__).parent / "monsters.json"
MIN_NAME_LEN = 2

_monsters: list[dict] = []
_name_index: dict[str, dict] = {}
_pinyin_index: dict[str, list[dict]] = {}


def _load() -> list[dict]:
    global _monsters, _name_index, _pinyin_index
    if _monsters:
        return _monsters

    _monsters = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    for m in _monsters:
        for key in ("name", "nameEN", "nameJP"):
            norm = _normalize(m[key])
            _name_index[norm] = m

        py = _to_pinyin(m["name"])
        _pinyin_index.setdefault(py, []).append(m)

    return _monsters


def _normalize(text: str) -> str:
    return re.sub(r"\s+", "", text).strip().lower()


def _to_pinyin(text: str) -> str:
    return "".join(lazy_pinyin(text, style=Style.NORMAL))


def _text_similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a, b).ratio()


def find_monsters(ocr_segments: list[str]) -> list[dict]:
    """Match multiple OCR text segments against monster names.
    Returns deduplicated list preserving detection order.
    """
    _load()
    seen: set[str] = set()
    results: list[dict] = []

    for seg in ocr_segments:
        text = _normalize(seg)
        if not text:
            continue
        match = _match_one(text)
        if match and match["nameEN"] not in seen:
            seen.add(match["nameEN"])
            results.append(match)
    return results


def _match_one(text: str) -> dict | None:
    # 1) exact normalised text
    if text in _name_index:
        return _name_index[text]

    text_py = _to_pinyin(text)

    # 2) exact pinyin match
    if text_py in _pinyin_index:
        candidates = _pinyin_index[text_py]
        if len(candidates) == 1:
            return candidates[0]
        return max(candidates, key=lambda m: _text_similarity(text, _normalize(m["name"])))

    # 3) pinyin substring — OCR text pinyin contains a monster's pinyin
    py_candidates: list[tuple[int, float, dict]] = []
    for py, monsters in _pinyin_index.items():
        if len(py) < MIN_NAME_LEN * 2 or py not in text_py:
            continue
        for m in monsters:
            sim = _text_similarity(text, _normalize(m["name"]))
            py_candidates.append((len(py), sim, m))

    if py_candidates:
        py_candidates.sort(key=lambda c: (c[0], c[1]), reverse=True)
        return py_candidates[0][2]

    # 4) text substring fallback (e.g. 凶異碎龍 → 碎龍)
    txt_candidates: list[tuple[int, dict]] = []
    for norm_name, monster in _name_index.items():
        if len(norm_name) >= MIN_NAME_LEN and norm_name in text:
            txt_candidates.append((len(norm_name), monster))

    if txt_candidates:
        txt_candidates.sort(key=lambda c: c[0], reverse=True)
        return txt_candidates[0][1]

    return None


def parse_special_attacks(raw: str) -> list[dict]:
    """Parse '[condition]: type / ...' into list of dicts."""
    if not raw or raw.strip() == "-":
        return []
    parts = raw.split("/")
    result = []
    for part in parts:
        match = re.match(r"\s*\[(.+?)\]:\s*(.+)", part.strip())
        if match:
            result.append({"condition": match.group(1), "type": match.group(2).strip()})
            continue
        m2 = re.match(r"(.+?):\s*(.+)", part.strip())
        if m2:
            result.append({"condition": m2.group(1).strip(), "type": m2.group(2).strip()})
    return result
