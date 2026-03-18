export type Effectiveness = "⭐" | "❌";

export interface PartEffectiveness {
  part: string;
  cutting: Effectiveness;
  blunt: Effectiveness;
  piercing: Effectiveness;
}

export interface FormData {
  form: string;
  parts: PartEffectiveness[];
}

export interface DamageEffectiveness {
  forms: FormData[];
}

type P = PartEffectiveness;
const c = (part: string): P => ({ part, cutting: "⭐", blunt: "❌", piercing: "❌" });
const b = (part: string): P => ({ part, cutting: "❌", blunt: "⭐", piercing: "❌" });
const p = (part: string): P => ({ part, cutting: "❌", blunt: "❌", piercing: "⭐" });
const a = (part: string): P => ({ part, cutting: "⭐", blunt: "⭐", piercing: "⭐" });

function f(form: string, parts: P[]): FormData { return { form, parts }; }

const DATA: Record<string, FormData[]> = {
  "Velocidrome": [f("通常", [a("本體"), p("頭部"), c("軀幹")])],
  "Kulu-Ya-Ku": [f("通常", [c("本體")])],
  "Yian Kut-Ku": [f("通常", [a("本體"), p("頭部"), b("翅膀"), c("尾巴")])],
  "Blue Yian Kut-Ku": [f("通常", [a("本體"), p("頭部"), b("翅膀"), c("尾巴")])],
  "Pukei-Pukei": [f("通常", [c("本體"), p("翅膀"), b("軀幹")])],
  "Gypceros": [f("通常", [a("本體"), p("頭部"), b("腹部"), c("尾巴")])],
  "Purple Gypceros": [f("通常", [a("本體"), p("頭部"), b("腹部"), c("尾巴")])],
  "Yian Garuga": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Deadeye Yian Garuga": [f("通常", [c("本體")])],
  "Aknosom": [f("通常", [c("本體")])],
  "Great Izuchi": [f("通常", [c("尾巴"), p("軀幹"), b("頭部")])],
  "Chatacabra": [f("通常", [a("本體"), c("頭部"), b("軀幹")])],
  "Tetranadon": [
    f("通常", [c("尾巴"), p("頭部"), b("腳部")]),
    f("滿腹", [c("尾巴 / 腹部"), p("頭部 / 腹部"), b("腳部 / 腹部")]),
  ],
  "Arzuros": [f("通常", [c("軀幹"), p("腳部"), b("頭部")])],
  "Bishaten": [
    f("通常", [c("本體"), p("翅膀"), b("頭部")]),
    f("尻尾立", [c("尾巴"), p("翅膀"), b("頭部")]),
  ],
  "Blood Orange Bishaten": [f("通常", [c("本體")])],
  "Blangonga": [f("通常", [c("本體")])],
  "Goss Harag": [f("通常", [c("本體")])],
  "Ajarakan": [
    f("通常", [c("腕部"), p("本體"), b("頭部")]),
    f("赤熱化", [c("腕部"), p("反射板"), b("頭部")]),
  ],
  "Zinogre": [f("通常", [c("尾巴"), p("背部"), b("頭部")])],
  "Stygian Zinogre": [f("通常", [c("本體")])],
  "Lunagaron": [f("通常", [c("本體")])],
  "Tobi-Kadachi": [f("通常", [a("本體"), b("頭部"), c("腳部"), p("尾巴")])],
  "Odogaron": [f("通常", [c("本體")])],
  "Ebony Odogaron": [f("通常", [c("本體")])],
  "Magnamalo": [
    f("通常", [c("尾巴"), p("軀幹"), b("本體")]),
    f("鬼火纏身", [c("尾巴"), p("前腳【鬼火】/ 軀幹"), b("頭部【鬼火】")]),
  ],
  "Barroth": [
    f("通常", [c("尾巴"), p("腳部"), b("頭部")]),
    f("泥纏", [c("尾巴【泥】"), p("前腳【泥】/ 軀幹【泥】"), b("頭部【泥】")]),
  ],
  "Jade Barroth": [f("通常", [c("本體")])],
  "Garangolm": [
    f("通常", [c("頭部"), p("尾巴"), b("本體")]),
    f("屬性化", [c("頭部 / 苔腕"), p("尾巴"), b("溶岩腕")]),
  ],
  "Diablos": [f("通常", [c("本體")])],
  "Black Diablos": [f("通常", [c("尾巴"), p("軀幹"), b("角")])],
  "Bloodbath Diablos": [f("通常", [c("本體")])],
  "Glavenus": [
    f("通常", [c("尾巴"), p("本體"), b("頭部")]),
    f("赤熱化【喉】", [c("尾巴"), p("喉【赤熱】"), b("本體")]),
    f("赤熱化【尾巴】", [c("尾巴【赤熱】"), p("本體"), b("頭部")]),
  ],
  "Deviljho": [f("通常", [c("尾巴"), p("腳部"), b("頭部")])],
  "Anjanath": [f("通常", [a("本體"), b("鼻部"), p("腳部"), c("尾巴")])],
  "Fulgur Anjanath": [f("通常", [c("本體")])],
  "Brachydios": [f("通常", [c("本體")])],
  "Plesioth": [f("通常", [a("本體"), p("頭部"), b("背部"), c("尾巴")])],
  "Green Plesioth": [f("通常", [a("本體"), p("頭部"), b("背部"), c("尾巴")])],
  "Lagiacrus": [
    f("通常", [c("尾巴"), p("背部"), b("頭部")]),
    f("蓄電", [c("尾巴"), p("背電殼"), b("頭部")]),
  ],
  "Ivory Lagiacrus": [f("通常", [c("本體")])],
  "Mizutsune": [
    f("通常", [c("尾巴"), p("背部"), b("頭部")]),
    f("泡纏", [c("尾巴 / 泡"), p("背部 / 泡"), b("頭部 / 泡")]),
  ],
  "Soulseer Mizutsune": [f("通常", [c("本體")])],
  "Almudron": [f("通常", [c("本體")])],
  "Royal Ludroth": [f("通常", [a("本體"), p("頭部"), b("腹部"), c("尾巴")])],
  "Purple Ludroth": [f("通常", [c("本體")])],
  "Somnacanth": [
    f("通常", [c("尾巴"), p("頭部"), b("腹部")]),
    f("粉溜", [c("本體"), p("喉"), b("本體")]),
  ],
  "Aurora Somnacanth": [f("通常", [c("本體")])],
  "Shogun Ceanataur": [f("通常", [c("本體")])],
  "Nerscylla": [f("通常", [a("本體"), p("頭部"), c("腳部"), b("尖刺")])],
  "Shrouded Nerscylla": [f("通常", [c("本體")])],
  "Rakna-Kadaki": [
    f("糸纏【腳】", [c("前腳 / 胸部"), p("本體"), b("後腳 / 背棘")]),
    f("糸纏【繭】", [c("胸部"), p("繭"), b("背棘")]),
    f("無糸", [c("胸部"), p("本體"), b("背棘")]),
  ],
  "Nibelsnarf": [f("通常", [c("本體")])],
  "Paolumu": [
    f("通常", [a("本體"), p("頭部"), c("頸囊（地面）"), b("頸囊（滯空）")]),
  ],
  "Rathian": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Pink Rathian": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Rathalos": [
    f("通常", [c("尾巴"), p("軀幹"), b("頭部")]),
    f("滯空", [c("尾巴"), p("翅膀 / 軀幹"), b("頭部")]),
  ],
  "Azure Rathalos": [f("通常", [c("本體")])],
  "Dreadking Rathalos": [f("通常", [c("本體")])],
  "Barioth": [f("通常", [c("本體")])],
  "Sand Barioth": [f("通常", [c("本體")])],
  "Nargacuga": [
    f("通常", [c("尾巴"), p("翅膀"), b("頭部")]),
    f("憤怒", [c("棘"), p("翅膀"), b("頭部")]),
  ],
  "Silverwind Nargacuga": [f("通常", [c("本體")])],
  "Green Nargacuga": [f("通常", [c("本體")])],
  "Legiana": [
    f("通常", [c("軀幹"), p("本體"), b("頭部")]),
    f("滯空", [c("軀幹"), p("翅膀"), b("頭部")]),
  ],
  "Astalos": [f("通常", [c("本體")])],
  "Boltreaver Astalos": [f("通常", [c("本體")])],
  "Tigrex": [f("通常", [c("尾巴"), p("腳部"), b("頭部")])],
  "Brute Tigrex": [f("通常", [c("尾巴"), p("腳部"), b("頭部")])],
  "Seregios": [f("通常", [c("腳部"), p("翅膀"), b("頭部")])],
  "Gravios": [f("通常", [c("腹部"), p("背部"), b("頭部")])],
  "Black Gravios": [f("通常", [c("本體")])],
  "Khezu": [f("通常", [c("腳部"), p("頭部"), b("軀幹")])],
  "Red Khezu": [f("通常", [c("本體")])],
  "Espinas": [f("通常", [a("本體"), p("頭部"), b("翅膀"), c("尾巴")])],
  "Rey Dau": [
    f("通常", [c("軀幹"), p("本體"), b("頭部")]),
    f("閃管石纏", [c("軀幹 / 尾巴【閃管石】"), p("翅膀【閃管石】"), b("頭部")]),
  ],
  "Arkveld": [
    f("通常", [c("尾巴"), p("本體"), b("頭部")]),
    f("龍纏", [c("尾巴"), p("鎖刃翼"), b("頭部")]),
  ],
  "Velkhana": [f("通常", [c("本體")])],
  "Namielle": [f("通常", [a("本體"), p("頭部"), b("翅膀"), c("尾巴")])],
  "Malzeno": [f("通常", [c("本體")])],
  "Yama Tsukami": [
    f("通常", [c("右觸手"), p("左觸手"), b("排出口")]),
    f("開口", [a("口內"), b("排出口")]),
  ],
  "Thunder Serpent Narwa": [f("通常", [c("本體")])],
  "Wind Serpent Ibushi": [f("通常", [c("本體")])],

  // === 侵獸 ===
  "Invasive Yian Garuga": [
    f("通常", [c("本體"), p("翅膀 / 尾巴"), b("頭部")]),
    f("侵化態", [c("腳部"), p("翅膀 / 尾巴"), b("頭部")]),
  ],
  "Invasive Arzuros": [f("通常", [c("腳部"), p("頭部"), b("軀幹")])],
  "Invasive Shogun Ceanataur": [f("通常", [c("本體")])],
  "Invasive Nerscylla": [f("通常", [c("本體")])],
  "Invasive Plesioth": [
    f("通常", [c("尾巴"), p("背部"), b("腳部")]),
    f("侵化態", [c("尾巴"), p("背部"), b("腳部 / 頭部")]),
  ],
  "Invasive Odogaron": [f("通常", [c("本體")])],
  "Invasive Khezu": [f("通常", [c("腳部"), p("頭部"), b("軀幹")])],
  "Invasive Diablos": [
    f("通常", [c("尾巴"), p("軀幹"), b("角 / 腳部")]),
    f("侵化態", [a("本體")]),
  ],
  "Invasive Seregios": [f("通常", [c("翅膀 / 腳部"), p("尾巴"), b("頭部")])],

  // === 天變古龍 ===
  "Tempered Namielle": [
    f("水纏", [c("尾巴"), p("翅膀"), b("頭部")]),
    f("溟帶電", [c("尾巴"), p("翅膀"), b("頭部")]),
    f("封龍", [c("尾巴"), p("翅膀"), b("頭部")]),
  ],
  "Tempered Ibushi": [
    f("風纏", [c("背部【風纏】/ 尾巴【風纏】/ 胸部"), p("翼腕【風纏】/ 背部【風纏】"), b("頭部 / 背部【風纏】")]),
  ],
  "Tempered Narwa": [
    f("異體同心", [c("本體"), p("背部"), b("頭部")]),
  ],
  "Tempered Yama Tsukami": [
    f("通常", [c("右觸手"), p("左觸手"), b("排出口")]),
    f("開口", [a("口內"), b("排出口")]),
  ],
  "Tempered Velkhana": [
    f("通常", [c("尾巴"), p("腳部"), b("頭部")]),
    f("氷纏", [c("尾巴【氷纏】"), p("腳部【氷纏】"), b("頭部【氷纏】")]),
    f("氷霧纏", [c("尾巴【氷纏】"), p("腳部【氷纏】"), b("頭部【氷纏】")]),
  ],

  // === 兇異 ===
  "Afflicted Velocidrome": [f("通常", [c("軀幹"), p("本體"), b("頭部")])],
  "Afflicted Great Izuchi": [f("通常", [c("尾巴"), p("軀幹"), b("頭部")])],
  "Afflicted Yian Kut-Ku": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Afflicted Gypceros": [f("通常", [c("尾巴"), p("腹部"), b("頭部")])],
  "Afflicted Aknosom": [f("通常", [c("翅膀"), p("頭部"), b("尾巴")])],
  "Afflicted Bishaten": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Afflicted Blangonga": [f("通常", [c("軀幹"), p("前腳"), b("牙")])],
  "Afflicted Ajarakan": [
    f("通常", [c("腕部"), p("本體"), b("頭部")]),
    f("赤熱化", [c("腕部"), p("反射板"), b("頭部")]),
  ],
  "Afflicted Chatacabra": [
    f("通常", [c("頭部"), p("軀幹"), b("本體")]),
    f("鑛物纏", [c("頭部"), p("軀幹"), b("右腕 / 左腕")]),
  ],
  "Afflicted Tetranadon": [
    f("通常", [c("尾巴"), p("頭部"), b("腳部")]),
    f("滿腹", [c("腹部 / 尾巴"), p("頭部 / 腹部"), b("腳部 / 腹部")]),
  ],
  "Afflicted Nerscylla": [f("通常", [c("腳部"), p("尖刺"), b("頭部")])],
  "Afflicted Rakna-Kadaki": [
    f("糸纏【腳】", [c("前腳 / 胸部"), p("本體"), b("後腳 / 背棘")]),
    f("糸纏【繭】", [c("胸部"), p("繭"), b("背棘")]),
    f("無糸", [c("胸部"), p("本體"), b("背棘")]),
  ],
  "Afflicted Barroth": [
    f("通常", [c("尾巴"), p("前腳"), b("頭部")]),
    f("泥纏", [c("尾巴【泥】"), p("前腳【泥】"), b("頭部 / 軀幹【泥】")]),
  ],
  "Afflicted Glavenus": [
    f("通常", [c("尾巴"), p("本體"), b("頭部")]),
    f("赤熱化【尾巴】", [c("尾巴【赤熱】"), p("本體"), b("頭部")]),
  ],
  "Afflicted Brachydios": [
    f("通常", [c("尾巴"), p("前腳【黏菌】"), b("頭部【黏菌】")]),
    f("黏菌枯竭", [c("尾巴"), p("前腳"), b("頭部")]),
  ],
  "Afflicted Somnacanth": [
    f("通常", [c("尾巴"), p("頭部"), b("腹部")]),
    f("粉溜", [c("本體"), p("喉"), b("本體")]),
  ],
  "Afflicted Tobi-Kadachi": [f("通常", [c("腳部"), p("頭部"), b("尾巴")])],
  "Afflicted Magnamalo": [
    f("通常", [c("尾巴"), p("軀幹"), b("本體")]),
    f("鬼火纏身", [c("尾巴"), p("前腳【鬼火】/ 軀幹"), b("頭部【鬼火】")]),
  ],
  "Afflicted Paolumu": [
    f("通常", [c("軀幹"), p("本體"), b("頭部")]),
    f("滯空", [c("本體"), p("頸囊"), b("頭部")]),
  ],
  "Afflicted Legiana": [
    f("通常", [c("軀幹"), p("翅膀"), b("頭部")]),
  ],
  "Afflicted Gravios": [f("通常", [c("腹部"), p("背部"), b("頭部")])],
  "Afflicted Espinas": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Afflicted Yama Tsukami": [
    f("通常", [c("右觸手"), p("左觸手"), b("排出口")]),
    f("開口", [a("口內"), b("排出口")]),
  ],

  // === 特殊 ===
  "Honed Glavenus": [
    f("通常", [c("尾巴"), p("本體"), b("頭部")]),
  ],
  "Bound Azure Rathalos": [f("通常", [c("本體")])],
  "Bound Lunagaron": [f("通常", [c("本體")])],
  "Exotic Velocidrome": [f("通常", [a("本體"), p("頭部"), c("軀幹")])],
  "Exotic Seregios": [f("通常", [c("腳部"), p("翅膀"), b("頭部")])],
  "Exotic Legiana": [f("通常", [c("軀幹"), p("本體"), b("頭部")])],
  "Exotic Nibelsnarf": [f("通常", [c("本體")])],
  "Thunderlord Zinogre": [f("通常", [c("尾巴"), p("背部"), b("頭部")])],
  "Hellblade Glavenus": [f("通常", [c("尾巴"), p("本體"), b("頭部")])],
  "Dreadqueen Rathian": [f("通常", [c("尾巴"), p("翅膀"), b("頭部")])],
  "Grimclaw Tigrex": [f("通常", [c("尾巴"), p("腳部"), b("頭部")])],
};

export function getDamageEffectiveness(nameEN: string): DamageEffectiveness | null {
  const forms = DATA[nameEN];
  if (!forms) return null;
  return { forms };
}
