"""Convert monsters.ts raw data into monsters.json for the overlay tool."""
import json
import re
from pathlib import Path

TS_FILE = Path(__file__).parent.parent / "web" / "src" / "data" / "monsters.ts"
OUT_FILE = Path(__file__).parent / "monsters.json"

text = TS_FILE.read_text(encoding="utf-8")

pattern = re.compile(
    r'\{\s*name:\s*"([^"]+)",\s*nameEN:\s*"([^"]+)",\s*nameJP:\s*"([^"]+)",'
    r'\s*species:\s*"([^"]*)",\s*normalAttack:\s*"([^"]*)",'
    r'\s*specialAttacks:\s*"([^"]*)"\s*\}'
)

monsters = []
for m in pattern.finditer(text):
    # skip commented-out lines
    line_start = text.rfind("\n", 0, m.start()) + 1
    line = text[line_start:m.start()]
    if "//" in line:
        continue

    name, name_en, name_jp, species, normal, specials = m.groups()
    monsters.append({
        "name": name,
        "nameEN": name_en,
        "nameJP": name_jp,
        "species": species,
        "normalAttack": normal,
        "specialAttacks": specials,
    })

OUT_FILE.write_text(json.dumps(monsters, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Exported {len(monsters)} monsters to {OUT_FILE}")
