export type AttackType = "力量" | "速度" | "技巧" | "-";

export type ElementType = "火" | "水" | "雷" | "氷" | "龍";

export type ResistLevel = "大弱點" | "弱點" | "普通" | "微耐" | "耐性" | "不明";

export interface SpecialAttack {
  condition: string;
  type: AttackType;
}

export interface ElementResist {
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
  "蟲蛛種",
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
  火: "#e74c3c",
  水: "#3498db",
  雷: "#f1c40f",
  氷: "#74b9ff",
  龍: "#a855f7",
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
  "天變古龍",
  "兇異魔物",
  "特殊（劇情 / Exotic / Honed）",
] as const;

const GROUP_CATEGORIES = new Set(["天變古龍", "兇異魔物", "特殊（劇情 / Exotic / Honed）"]);

export function categoryToGroup(category: string): string {
  return GROUP_CATEGORIES.has(category) ? category : "一般魔物";
}
