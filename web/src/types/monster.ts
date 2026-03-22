export type AttackType = "力量" | "速度" | "技巧" | "-";

export type ElementType = "火" | "水" | "雷" | "氷" | "龍";

export type ResistLevel = "大弱點" | "弱點" | "普通" | "微耐" | "耐性" | "不明";

export interface SpecialAttack {
  condition: string;
  type: AttackType;
}

export interface ElementResist {
  neutral: ResistLevel;
  fire: ResistLevel;
  water: ResistLevel;
  thunder: ResistLevel;
  ice: ResistLevel;
  dragon: ResistLevel;
}

export interface RideAction {
  star: string;
  attackElement: string;
  fly: boolean;
  climb: boolean;
  swim: boolean;
  jump: boolean;
  roar: boolean;
  stealth: boolean;
  melee: boolean;
  breath: boolean;
  burrow: boolean;
}

export interface BingoBonus {
  bingo2: string;
  bingo3: string;
  bingo5: string;
}

export interface MonsterLocation {
  locations: string;
  obtainMethod: string;
}

export interface Monster {
  id: string;
  name: string;
  nameEN: string;
  nameJP: string;
  species: string;
  category: string;
  group: string;
  normalAttack: AttackType;
  specialAttacks: SpecialAttack[];
  icon: string;
}

export const SPECIES_LIST = [
  "草食種",
  "甲蟲種",
  "鳥龍種",
  "兩棲種",
  "牙獸種",
  "牙龍種",
  "獸龍種",
  "魚龍種",
  "海龍種",
  "甲殼種",
  "鋏角種",
  "蛇龍種",
  "飛龍種",
  "古龍種",
  "-",
] as const;

export const ATTACK_TYPES: AttackType[] = ["力量", "速度", "技巧"];

export const ATTACK_TYPE_COLORS: Record<string, string> = {
  力量: "#e74c3c",
  速度: "#3498db",
  技巧: "#2ecc71",
  "-": "#95a5a6",
};

export const ELEMENT_COLORS: Record<string, string> = {
  無: "#95a5a6",
  無屬性: "#95a5a6",
  火: "#e74c3c",
  火屬性: "#e74c3c",
  水: "#3498db",
  水屬性: "#3498db",
  雷: "#f1c40f",
  雷屬性: "#f1c40f",
  氷: "#74b9ff",
  氷屬性: "#74b9ff",
  龍: "#a855f7",
  龍屬性: "#a855f7",
};

export const RESIST_LEVEL_COLORS: Record<ResistLevel, string> = {
  大弱點: "#e74c3c",
  弱點: "#e67e22",
  普通: "#95a5a6",
  微耐: "#74b9ff",
  耐性: "#3498db",
  不明: "#6b7280",
};

export const CATEGORY_LIST = [
  "一般魔物",
  "隨行獸",
  "天變古龍",
  "兇異魔物",
  "侵獸",
  "突然變異",
  "特殊（劇情 / Exotic / Honed）",
] as const;

const GROUP_CATEGORIES = new Set(["天變古龍", "兇異魔物", "侵獸", "特殊（劇情 / Exotic / Honed）"]);

export function categoryToGroup(category: string): string {
  return GROUP_CATEGORIES.has(category) ? category : "一般魔物";
}

export type WeaponType = "大劍" | "太刀" | "大鎚" | "狩獵笛" | "弓" | "銃槍";

export type StatusAilment = "毒" | "灼傷" | "麻痺" | "睡眠" | "爆破" | "裂傷" | "目眩";

export interface SlotConfig {
  lv1: number;
  lv2: number;
  lv3: number;
}

export interface Weapon {
  name: string;
  weaponType: WeaponType;
  attack: number;
  element: string;
  affinity: number;
  dragonBreak: number;
  statusAilment: string;
  statusValue: number;
  defense: number;
  slots: SlotConfig;
  materials: string[];
}

export interface MaterialRequirement {
  name: string;
  pts: number;
}

export interface MaterialDetailItem {
  name: string;
  pts: number;
}

export interface WeaponSkill {
  name: string;
  weaponType: string;
  target: string;
  skillType: "アクティブ" | "パッシブ";
  stCost: number;
  power: number;
  dragonBreak: number;
  effect: string;
}

export interface WeaponDetail {
  upgradeMaterials: Record<number, MaterialRequirement[]>;
  materialDetails: Record<string, MaterialDetailItem[]>;
  skills: WeaponSkill[];
  statsPerLevel: number[];
}

export interface Armor {
  name: string;
  defense: number;
  element: string;
  resistNeutral: string;
  resistFire: string;
  resistWater: string;
  resistThunder: string;
  resistIce: string;
  resistDragon: string;
  slots: SlotConfig;
  skills: string[];
  materials: string[];
}

export interface ArmorSkill {
  name: string;
  effect: string;
}

export interface ArmorDetail {
  defensePerLevel: number[];
  decoration: string;
  upgradeMaterials: Record<number, MaterialRequirement[]>;
  materialDetails: Record<string, MaterialDetailItem[]>;
  skills: ArmorSkill[];
}

export const WEAPON_TYPE_LIST: WeaponType[] = ["大劍", "太刀", "大鎚", "狩獵笛", "弓", "銃槍"];

export const WEAPON_TYPE_JP: Record<WeaponType, string> = {
  大劍: "大剣",
  太刀: "太刀",
  大鎚: "ハンマー",
  狩獵笛: "狩猟笛",
  弓: "弓",
  銃槍: "ガンランス",
};

export const ELEMENT_LIST = ["無", "火", "水", "雷", "氷", "龍"] as const;

export const STATUS_AILMENT_LIST: StatusAilment[] = ["毒", "灼傷", "麻痺", "睡眠", "爆破", "裂傷", "目眩"];

export const ARMOR_RESIST_LABELS: Record<string, string> = {
  "⬆︎⬆︎": "大耐",
  "⬆︎": "小耐",
  "-": "普通",
  "⬇︎": "小弱",
  "⬇︎⬇︎": "大弱",
};

export const ARMOR_RESIST_COLORS: Record<string, string> = {
  "⬆︎⬆︎": "#3498db",
  "⬆︎": "#74b9ff",
  "-": "#95a5a6",
  "⬇︎": "#e67e22",
  "⬇︎⬇︎": "#e74c3c",
};
