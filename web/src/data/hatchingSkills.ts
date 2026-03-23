export interface HatchingSkillDetail {
  nameJP: string;
  nameZH: string;
  type: string;
  element: string;
  target: string;
  stCost: number;
  power: number | string;
  dragonBreak: number | string;
  effect: string;
}

export interface HatchingSkillGroup {
  neutral: string;
  fire: string;
  water: string;
  thunder: string;
  ice: string;
  dragon: string;
}

export const HATCHING_SKILL_DETAILS: Record<string, HatchingSkillDetail> = {
  "円の構え": { nameJP: "円の構え", nameZH: "圓之構", type: "無", element: "無屬性", target: "我方全體", stCost: 20, power: "-", dragonBreak: "-", effect: "我方全體賦予防禦力提升。每次使用效果提升。" },
  "気力充実": { nameJP: "気力充実", nameZH: "氣力充實", type: "無", element: "無屬性", target: "我方全體", stCost: 50, power: "-", dragonBreak: "-", effect: "回復我方全體耐力。" },
  "大自然の治癒": { nameJP: "大自然の治癒", nameZH: "大自然的治癒", type: "無", element: "無屬性", target: "我方全體", stCost: 30, power: "-", dragonBreak: "-", effect: "回復我方全體HP。" },
  "慈愛のカタマリ": { nameJP: "慈愛のカタマリ", nameZH: "慈愛塊", type: "無", element: "無屬性", target: "我方單體", stCost: 100, power: "-", dragonBreak: "-", effect: "回復我方單體1點生命值。" },
  "太陽の咆哮": { nameJP: "太陽の咆哮", nameZH: "太陽的咆哮", type: "無", element: "無屬性", target: "自身", stCost: 30, power: "-", dragonBreak: "-", effect: "獲得羈絆量表。" },

  "陽炎": { nameJP: "陽炎", nameZH: "陽炎", type: "無", element: "無屬性", target: "我方全體", stCost: 20, power: "-", dragonBreak: "-", effect: "我方全體賦予迴避率提升。每次使用效果提升。" },
  "緋の心得": { nameJP: "緋の心得", nameZH: "緋之心得", type: "無", element: "無屬性", target: "我方全體", stCost: 20, power: "-", dragonBreak: "-", effect: "我方全體賦予會心率提升。每次使用效果提升。" },
  "炎陣": { nameJP: "炎陣", nameZH: "炎陣", type: "無", element: "無屬性", target: "我方全體", stCost: 20, power: "-", dragonBreak: "-", effect: "我方全體賦予攻擊力提升。每次使用效果提升。" },
  "焔星": { nameJP: "焔星", nameZH: "焰星", type: "無", element: "無屬性", target: "自身", stCost: 50, power: "-", dragonBreak: "-", effect: "自身不攻擊，該回合我方全體對敵人造成的傷害提升。" },
  "王の裁き": { nameJP: "王の裁き", nameZH: "王之裁決", type: "速度", element: "火屬性", target: "敵單體", stCost: 60, power: 150, dragonBreak: 10, effect: "對敵單體造成火屬性傷害，機率賦予灼傷。" },

  "水鏡割り": { nameJP: "水鏡割り", nameZH: "水鏡割", type: "技巧", element: "水屬性", target: "敵單體", stCost: 20, power: 70, dragonBreak: 30, effect: "對敵單體造成水屬性傷害，賦予龍氣防禦力下降。" },
  "明鏡止水": { nameJP: "明鏡止水", nameZH: "明鏡止水", type: "無", element: "無屬性", target: "我方全體", stCost: 20, power: "-", dragonBreak: "-", effect: "我方全體賦予破龍力提升。每次使用效果提升。" },
  "激流の渦": { nameJP: "激流の渦", nameZH: "激流之渦", type: "速度", element: "水屬性", target: "敵單體", stCost: 40, power: 120, dragonBreak: 10, effect: "對敵單體造成水屬性傷害。" },
  "絶海波濤": { nameJP: "絶海波濤", nameZH: "絕海波濤", type: "無", element: "水屬性", target: "敵隨機", stCost: 30, power: 240, dragonBreak: 50, effect: "隨機對敵全體造成水屬性傷害。" },
  "月輪の咆哮": { nameJP: "月輪の咆哮", nameZH: "月輪的咆哮", type: "無", element: "無屬性", target: "敵全體", stCost: 20, power: "-", dragonBreak: "-", effect: "解除敵全體所有增益效果。" },

  "充雷": { nameJP: "充雷", nameZH: "充雷", type: "無", element: "無屬性", target: "我方全體", stCost: 30, power: "-", dragonBreak: "-", effect: "我方全體賦予自然回復與耐力回復量提升。" },
  "雷鳴武装": { nameJP: "雷鳴武装", nameZH: "雷鳴武裝", type: "無", element: "無屬性", target: "我方全體", stCost: 20, power: "-", dragonBreak: "-", effect: "我方全體賦予狀態異常賦予率提升。" },
  "紫電一閃": { nameJP: "紫電一閃", nameZH: "紫電一閃", type: "力量", element: "雷屬性", target: "敵全體", stCost: 50, power: 120, dragonBreak: 30, effect: "對敵全體造成雷屬性傷害。" },
  "憤怒の剛力": { nameJP: "憤怒の剛力", nameZH: "憤怒的剛力", type: "無", element: "無屬性", target: "自身", stCost: 25, power: "-", dragonBreak: "-", effect: "下回合自身對敵人造成的傷害大幅提升。" },
  "雷霆天討": { nameJP: "雷霆天討", nameZH: "雷霆天討", type: "技巧", element: "雷屬性", target: "敵單體", stCost: 35, power: 90, dragonBreak: 20, effect: "對敵單體造成無視防禦的雷屬性傷害。較易搶先行動。" },

  "氷縛撃": { nameJP: "氷縛撃", nameZH: "冰縛擊", type: "速度", element: "氷屬性", target: "敵單體", stCost: 20, power: 80, dragonBreak: 20, effect: "對敵單體造成冰屬性傷害，賦予速度下降。" },
  "砕氷の型": { nameJP: "砕氷の型", nameZH: "碎冰之型", type: "無", element: "無屬性", target: "自身", stCost: 30, power: "-", dragonBreak: "-", effect: "自身賦予破龍力提升。" },
  "霧氷の疾風": { nameJP: "霧氷の疾風", nameZH: "霧冰的疾風", type: "無", element: "無屬性", target: "我方全體", stCost: 30, power: "-", dragonBreak: "-", effect: "我方全體賦予速度提升。" },
  "氷塊零度": { nameJP: "氷塊零度", nameZH: "冰塊零度", type: "力量", element: "氷屬性", target: "敵單體", stCost: 20, power: 40, dragonBreak: 60, effect: "對敵單體造成冰屬性傷害，賦予速度下降。" },
  "白雪纏い": { nameJP: "白雪纏い", nameZH: "白雪纏身", type: "無", element: "無屬性", target: "自身", stCost: 40, power: "-", dragonBreak: "-", effect: "自身賦予會心率提升、迴避率提升與速度提升。" },

  "龍門": { nameJP: "龍門", nameZH: "龍門", type: "無", element: "無屬性", target: "我方全體", stCost: 25, power: "-", dragonBreak: "-", effect: "我方全體賦予狀態異常無效。" },
  "牙龍点睛": { nameJP: "牙龍点睛", nameZH: "牙龍點睛", type: "技巧", element: "龍屬性", target: "敵單體", stCost: 45, power: 120, dragonBreak: 10, effect: "對敵單體造成龍屬性傷害。" },
  "龍轟撃": { nameJP: "龍轟撃", nameZH: "龍轟擊", type: "力量", element: "龍屬性", target: "敵單體", stCost: 25, power: 50, dragonBreak: 40, effect: "對敵單體造成龍屬性傷害。自身殘餘HP越低威力越高。" },
  "大落龍": { nameJP: "大落龍", nameZH: "大落龍", type: "無", element: "龍屬性", target: "敵隨機", stCost: 50, power: 360, dragonBreak: 30, effect: "隨機對敵全體造成龍屬性傷害。" },
  "古龍の威圧": { nameJP: "古龍の威圧", nameZH: "古龍的威壓", type: "無", element: "無屬性", target: "敵全體", stCost: 30, power: "-", dragonBreak: "-", effect: "對敵全體賦予攻擊力下降與防禦力下降。每次使用效果提升。" },
};

const GROUP_A: HatchingSkillGroup = { neutral: "円の構え", fire: "陽炎", water: "水鏡割り", thunder: "充雷", ice: "氷縛撃", dragon: "龍門" };
const GROUP_B: HatchingSkillGroup = { neutral: "気力充実", fire: "緋の心得", water: "明鏡止水", thunder: "雷鳴武装", ice: "砕氷の型", dragon: "牙龍点睛" };
const GROUP_C: HatchingSkillGroup = { neutral: "大自然の治癒", fire: "炎陣", water: "激流の渦", thunder: "紫電一閃", ice: "霧氷の疾風", dragon: "龍轟撃" };
const GROUP_D: HatchingSkillGroup = { neutral: "慈愛のカタマリ", fire: "焔星", water: "絶海波濤", thunder: "雷霆天討", ice: "氷塊零度", dragon: "大落龍" };
const GROUP_E: HatchingSkillGroup = { neutral: "太陽の咆哮", fire: "王の裁き", water: "月輪の咆哮", thunder: "憤怒の剛力", ice: "白雪纏い", dragon: "古龍の威圧" };

const MONSTER_HATCHING_GROUP: Record<string, HatchingSkillGroup> = {
  "Velocidrome": GROUP_A,
  "Great Izuchi": GROUP_A,
  "Kulu-Ya-Ku": GROUP_A,
  "Yian Kut-Ku": GROUP_A,
  "Blue Yian Kut-Ku": GROUP_B,
  "Gypceros": GROUP_A,
  "Purple Gypceros": GROUP_B,
  "Aknosom": GROUP_A,
  "Pukei-Pukei": GROUP_A,
  "Yian Garuga": GROUP_B,
  "Deadeye Yian Garuga": GROUP_E,

  "Arzuros": GROUP_A,
  "Bishaten": GROUP_A,
  "Blood Orange Bishaten": GROUP_B,
  "Blangonga": GROUP_A,
  "Garangolm": GROUP_B,
  "Ajarakan": GROUP_C,
  "Goss Harag": GROUP_C,
  "Canyne": GROUP_C,

  "Chatacabra": GROUP_A,
  "Tetranadon": GROUP_A,

  "Shogun Ceanataur": GROUP_A,

  "Nerscylla": GROUP_A,
  "Shrouded Nerscylla": GROUP_B,
  "Rakna-Kadaki": GROUP_C,

  "Barroth": GROUP_A,
  "Jade Barroth": GROUP_B,
  "Anjanath": GROUP_B,
  "Fulgur Anjanath": GROUP_C,
  "Glavenus": GROUP_C,
  "Hellblade Glavenus": GROUP_E,
  "Brachydios": GROUP_D,
  "Deviljho": GROUP_E,

  "Plesioth": GROUP_B,
  "Green Plesioth": GROUP_C,

  "Royal Ludroth": GROUP_A,
  "Purple Ludroth": GROUP_B,
  "Somnacanth": GROUP_B,
  "Aurora Somnacanth": GROUP_C,
  "Lagiacrus": GROUP_C,
  "Ivory Lagiacrus": GROUP_D,
  "Mizutsune": GROUP_C,
  "Soulseer Mizutsune": GROUP_E,
  "Almudron": GROUP_C,

  "Tobi-Kadachi": GROUP_A,
  "Odogaron": GROUP_C,
  "Ebony Odogaron": GROUP_D,
  "Zinogre": GROUP_C,
  "Stygian Zinogre": GROUP_D,
  "Thunderlord Zinogre": GROUP_E,
  "Lunagaron": GROUP_C,
  "Magnamalo": GROUP_D,

  "Paolumu": GROUP_A,
  "Khezu": GROUP_A,
  "Red Khezu": GROUP_B,
  "Rathian": GROUP_B,
  "Pink Rathian": GROUP_C,
  "Dreadqueen Rathian": GROUP_E,
  "Legiana": GROUP_B,
  "Barioth": GROUP_B,
  "Sand Barioth": GROUP_C,
  "Nargacuga": GROUP_B,
  "Green Nargacuga": GROUP_C,
  "Silverwind Nargacuga": GROUP_E,
  "Astalos": GROUP_C,
  "Boltreaver Astalos": GROUP_E,
  "Rathalos": GROUP_C,
  "Azure Rathalos": GROUP_D,
  "Dreadking Rathalos": GROUP_E,
  "Tigrex": GROUP_C,
  "Brute Tigrex": GROUP_D,
  "Grimclaw Tigrex": GROUP_E,
  "Gravios": GROUP_C,
  "Black Gravios": GROUP_D,
  "Diablos": GROUP_C,
  "Black Diablos": GROUP_D,
  "Bloodbath Diablos": GROUP_E,
  "Seregios": GROUP_D,
  "Espinas": GROUP_D,
  "Rey Dau": GROUP_D,
  "Arkveld": GROUP_D,

  "Namielle": GROUP_E,
  "Velkhana": GROUP_E,
  "Malzeno": GROUP_E,

  "Dos Poogie": GROUP_C,
};

export const HATCHING_ELEMENT_LABELS = [
  { key: "neutral" as const, label: "無", color: "#95a5a6" },
  { key: "fire" as const, label: "火", color: "#e74c3c" },
  { key: "water" as const, label: "水", color: "#3498db" },
  { key: "thunder" as const, label: "雷", color: "#f1c40f" },
  { key: "ice" as const, label: "氷", color: "#74b9ff" },
  { key: "dragon" as const, label: "龍", color: "#a855f7" },
] as const;

export function getHatchingSkills(nameEN: string): HatchingSkillGroup | null {
  return MONSTER_HATCHING_GROUP[nameEN] ?? null;
}

export function getHatchingSkillDetail(nameJP: string): HatchingSkillDetail | null {
  return HATCHING_SKILL_DETAILS[nameJP] ?? null;
}

export function hatchingSkillToZH(nameJP: string): string {
  return HATCHING_SKILL_DETAILS[nameJP]?.nameZH ?? nameJP;
}

export function getAllHatchingSkillNames(): string[] {
  return Object.keys(HATCHING_SKILL_DETAILS);
}

export function isHatchingSkill(nameJP: string): boolean {
  return nameJP in HATCHING_SKILL_DETAILS;
}
