"""Parse appmedia attribute resistance (屬性耐性) - 6 columns: 無属性, 火, 水, 雷, 氷, 龍"""
import re
import os

JP_TO_EN: dict[str, str] = {
    "アプトノス": "Aptonoth",
    "ドスランポス": "Velocidrome",
    "凶異ドスランポス": "Feral Velocidrome",
    "珍種ドスランポス": "Exotic Velocidrome",
    "イズチ": "Izuchi",
    "オサイズチ": "Great Izuchi",
    "凶異オサイズチ": "Feral Great Izuchi",
    "クルルヤック": "Kulu-Ya-Ku",
    "イャンクック": "Yian Kut-Ku",
    "イャンクック亜種": "Blue Yian Kut-Ku",
    "凶異イャンクック": "Feral Yian Kut-Ku",
    "ゲリョス": "Gypceros",
    "ゲリョス亜種": "Purple Gypceros",
    "凶異ゲリョス": "Feral Gypceros",
    "アケノシルム": "Aknosom",
    "凶異アケノシルム": "Feral Aknosom",
    "プケプケ": "Pukei-Pukei",
    "イャンガルルガ": "Yian Garuga",
    "隻眼イャンガルルガ": "Deadeye Yian Garuga",
    "侵獣イャンガルルガ": "Invasive Yian Garuga",
    "アオアシラ": "Arzuros",
    "侵獣アオアシラ": "Invasive Arzuros",
    "チャタカブラ": "Chatacabra",
    "凶異チャタカブラ": "Feral Chatacabra",
    "ヨツミワドウ": "Tetranadon",
    "凶異ヨツミワドウ": "Feral Tetranadon",
    "ビシュテンゴ": "Bishaten",
    "ビシュテンゴ亜種": "Blood Orange Bishaten",
    "凶異ビシュテンゴ": "Feral Bishaten",
    "ブランゴ": "Blango",
    "ドドブランゴ": "Blangonga",
    "凶異ドドブランゴ": "Feral Blangonga",
    "ガランゴルム": "Garangolm",
    "アジャラカン": "Ajarakan",
    "凶異アジャラカン": "Feral Ajarakan",
    "ゴシャハギ": "Goss Harag",
    "トビカガチ": "Tobi-Kadachi",
    "凶異トビカガチ": "Feral Tobi-Kadachi",
    "オドガロン": "Odogaron",
    "オドガロン亜種": "Ebony Odogaron",
    "侵獣オドガロン": "Invasive Odogaron",
    "ジンオウガ": "Zinogre",
    "ジンオウガ亜種": "Stygian Zinogre",
    "金雷公ジンオウガ": "Thunderlord Zinogre",
    "ルナガロン": "Lunagaron",
    "マガイマガド": "Magnamalo",
    "凶異マガイマガド": "Feral Magnamalo",
    "ボルボロス": "Barroth",
    "ボルボロス亜種": "Jade Barroth",
    "凶異ボルボロス": "Feral Barroth",
    "アンジャナフ": "Anjanath",
    "アンジャナフ亜種": "Fulgur Anjanath",
    "ディノバルド": "Glavenus",
    "燼滅刃ディノバルド": "Hellblade Glavenus",
    "強化竜ディノバルド": "Honed Glavenus",
    "凶異ディノバルド": "Feral Glavenus",
    "ディアブロス": "Diablos",
    "ディアブロス亜種": "Black Diablos",
    "鏖魔ディアブロス": "Bloodbath Diablos",
    "侵獣ディアブロス": "Invasive Diablos",
    "ブラキディオス": "Brachydios",
    "凶異ブラキディオス": "Feral Brachydios",
    "イビルジョー": "Deviljho",
    "ガノトトス": "Plesioth",
    "ガノトトス亜種": "Green Plesioth",
    "侵獣ガノトトス": "Invasive Plesioth",
    "ロアルドロス": "Royal Ludroth",
    "ロアルドロス亜種": "Purple Ludroth",
    "ハプルボッカ": "Nibelsnarf",
    "イソネミクニ": "Somnacanth",
    "イソネミクニ亜種": "Aurora Somnacanth",
    "凶異イソネミクニ": "Feral Somnacanth",
    "ラギアクルス": "Lagiacrus",
    "ラギアクルス亜種": "Ivory Lagiacrus",
    "タマミツネ": "Mizutsune",
    "天眼タマミツネ": "Soulseer Mizutsune",
    "オロミドロ": "Almudron",
    "ガミザミ": "Ceanataur",
    "ショウグンギザミ": "Shogun Ceanataur",
    "侵獣ショウグンギザミ": "Invasive Shogun Ceanataur",
    "ネルスキュラ": "Nerscylla",
    "ネルスキュラ亜種": "Shrouded Nerscylla",
    "凶異ネルスキュラ": "Feral Nerscylla",
    "侵獣ネルスキュラ": "Invasive Nerscylla",
    "ヤツカダキ": "Rakna-Kadaki",
    "凶異ヤツカダキ": "Feral Rakna-Kadaki",
    "パオウルムー": "Paolumu",
    "凶異パオウルムー": "Feral Paolumu",
    "フルフル": "Khezu",
    "フルフル亜種": "Red Khezu",
    "侵獣フルフル": "Invasive Khezu",
    "リオレイア": "Rathian",
    "リオレイア亜種": "Pink Rathian",
    "紫毒姫リオレイア": "Dreadqueen Rathian",
    "レイギエナ": "Legiana",
    "凶異レイギエナ": "Feral Legiana",
    "ベリオロス": "Barioth",
    "ベリオロス亜種": "Sand Barioth",
    "ナルガクルガ": "Nargacuga",
    "ナルガクルガ亜種": "Green Nargacuga",
    "白疾風ナルガクルガ": "Silverwind Nargacuga",
    "ライゼクス": "Astalos",
    "青電主ライゼクス": "Boltreaver Astalos",
    "リオレウス": "Rathalos",
    "リオレウス亜種": "Azure Rathalos",
    "黒炎王リオレウス": "Dreadking Rathalos",
    "ティガレックス": "Tigrex",
    "ティガレックス亜種": "Brute Tigrex",
    "荒鉤爪ティガレックス": "Grimclaw Tigrex",
    "グラビモス": "Gravios",
    "グラビモス亜種": "Black Gravios",
    "凶異グラビモス": "Feral Gravios",
    "セルレギオス": "Seregios",
    "珍種セルレギオス": "Exotic Seregios",
    "侵獣セルレギオス": "Invasive Seregios",
    "エスピナス": "Espinas",
    "凶異エスピナス": "Feral Espinas",
    "レ・ダウ": "Rey Dau",
    "アルシュベルド": "Arkveld",
    "ヤマツカミ": "Yama Tsukami",
    "ヤマツカミ(凶異)": "Yama Tsukami (Feral)",
    "ネロミェール": "Namielle",
    "イヴェルカーナ": "Velkhana",
    "イブシマキヒコ": "Wind Serpent Ibushi",
    "ナルハタタヒメ": "Thunder Serpent Narwa",
    "メルゼナ": "Malzeno",
    "ルドロス": "Ludroth",
}

SYMBOL_MAP = {"-": "普通", "⬇︎": "弱點", "⬇︎⬇︎": "大弱點", "⬆︎": "微耐", "⬆︎⬆︎": "耐性", "?": "不明"}


def parse_appmedia(path: str) -> dict[str, list[str]]:
    with open(path, encoding="utf-8") as f:
        content = f.read()

    result: dict[str, list[str]] = {}
    pattern = r"\[([^\]]+)\]\(https://appmedia\.jp/mhst3/\d+\)"
    blocks = re.split(r"(?=\[)", content)

    for block in blocks:
        m = re.search(pattern, block)
        if not m:
            continue
        jp_name = m.group(1)
        if jp_name not in JP_TO_EN:
            continue

        idx = block.find("属性耐性")
        if idx == -1:
            continue

        after = block[idx:]
        values = re.findall(r"[-⬇︎⬆︎?]+", after)
        if len(values) < 6:
            continue

        elem_vals = []
        for v in values[:6]:
            elem_vals.append(SYMBOL_MAP.get(v, "不明"))

        result[JP_TO_EN[jp_name]] = elem_vals

    return result


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    candidates = [
        os.path.join(script_dir, "appmedia_monsters.txt"),
        os.path.join(os.path.dirname(script_dir), "information", "appmedia_monsters.txt"),
    ]
    appmedia_path = None
    for p in candidates:
        if os.path.exists(p):
            appmedia_path = p
            break
    if not appmedia_path:
        import sys
        if len(sys.argv) > 1:
            appmedia_path = sys.argv[1]
        else:
            print("Usage: python parse_weakness.py <appmedia_file_path>")
            print("Or place appmedia content in scripts/appmedia_monsters.txt")
            return

    data = parse_appmedia(appmedia_path)
    out_path = os.path.join(script_dir, "weakness_output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        for name_en in sorted(data.keys()):
            row = data[name_en]
            neutral, fire, water, thunder, ice, dragon = row[0], row[1], row[2], row[3], row[4], row[5]
            f.write(f'  "{name_en}": ["{neutral}", "{fire}", "{water}", "{thunder}", "{ice}", "{dragon}"],\n')
    print(f"Written {len(data)} entries to {out_path}")


if __name__ == "__main__":
    main()
