import type { MonsterLocation } from "../types/monster";

export const REGION_LIST = [
  "亞茲萊爾領域",
  "卡納爾塔密林",
  "塔基爾坎",
  "桑提亞",
] as const;

export const LOCATION_LIST = [
  "亞茲萊爾領域：花陽平原",
  "亞茲萊爾領域：明鏡之湖",
  "亞茲萊爾領域：巨樹山口",
  "亞茲萊爾領域：厄石之森",
  "卡納爾塔密林：恩惠之丘",
  "卡納爾塔密林：啼吠之森",
  "卡納爾塔密林：大瀑布",
  "卡納爾塔密林：嚴界山",
  "卡納爾塔密林：瀑隱冰窟",
  "塔基爾坎：巨龍之骸",
  "塔基爾坎：奇岩帶",
  "塔基爾坎：天惠砂海",
  "塔基爾坎：死之淵",
  "桑提亞：冰河",
  "桑提亞：榮都古道",
  "桑提亞：聖域・舊都拉茲里恩",
] as const;

function parseLocationParts(raw: string): string[] {
  if (!raw || raw.startsWith("-") || raw === "待補充") return [];
  return raw.split(/\s*\/\s*/).map((s) => s.replace(/（.*）/, "").trim()).filter(Boolean);
}

export function getMonsterLocationParts(nameEN: string): string[] {
  const entry = LOCATION_RAW[nameEN];
  if (!entry) return [];
  return parseLocationParts(entry.locations);
}

export function monsterMatchesLocation(nameEN: string, locationFilter: Set<string>): boolean {
  if (locationFilter.size === 0) return true;
  const parts = getMonsterLocationParts(nameEN);
  if (parts.length === 0) return false;
  for (const loc of parts) {
    if (locationFilter.has(loc)) return true;
    const region = loc.split("：")[0];
    if (locationFilter.has(region)) return true;
  }
  return false;
}

const LOCATION_RAW: Record<string, MonsterLocation> = {
  "Velocidrome": { locations: "亞茲萊爾領域：花陽平原", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Great Izuchi": { locations: "卡納爾塔密林：啼吠之森 / 卡納爾塔密林：恩惠之丘", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Kulu-Ya-Ku": { locations: "塔基爾坎：巨龍之骸", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Yian Kut-Ku": { locations: "亞茲萊爾領域：花陽平原 / 亞茲萊爾領域：明鏡之湖", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Blue Yian Kut-Ku": { locations: "亞茲萊爾領域：巨樹山口 / 亞茲萊爾領域：厄石之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Pukei-Pukei": { locations: "卡納爾塔密林：大瀑布 / 卡納爾塔密林：啼吠之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Gypceros": { locations: "亞茲萊爾領域：花陽平原 / 亞茲萊爾領域：厄石之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Purple Gypceros": { locations: "亞茲萊爾領域：巨樹山口", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Aknosom": { locations: "卡納爾塔密林：嚴界山 / 卡納爾塔密林：啼吠之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Yian Garuga": { locations: "卡納爾塔密林：嚴界山 / 卡納爾塔密林：啼吠之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Deadeye Yian Garuga": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Chatacabra": { locations: "亞茲萊爾領域：巨樹山口 / 亞茲萊爾領域：厄石之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Tetranadon": { locations: "卡納爾塔密林：大瀑布 / 卡納爾塔密林：瀑隱冰窟", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Arzuros": { locations: "卡納爾塔密林：恩惠之丘 / 卡納爾塔密林：大瀑布", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Bishaten": { locations: "卡納爾塔密林：恩惠之丘 / 卡納爾塔密林：啼吠之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Blood Orange Bishaten": { locations: "塔基爾坎：天惠砂海", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Blangonga": { locations: "桑提亞：冰河", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Goss Harag": { locations: "桑提亞：榮都古道", obtainMethod: "-" },
  "Ajarakan": { locations: "塔基爾坎：天惠砂海", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Garangolm": { locations: "卡納爾塔密林：嚴界山 / 塔基爾坎：巨龍之骸", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Canyne": { locations: "卡納爾塔密林：恩惠之丘", obtainMethod: "侵獸青熊獸戰後的侵獸巢穴取得蛋" },
  "Tobi-Kadachi": { locations: "亞茲萊爾領域：巨樹山口", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Zinogre": { locations: "-（侵獸巢穴）", obtainMethod: "塔基爾坎-奇岩帶西側高台的侵獸巢穴取得蛋並孵化" },
  "Stygian Zinogre": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Thunderlord Zinogre": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Lunagaron": { locations: "桑提亞：榮都古道", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Odogaron": { locations: "塔基爾坎：死之淵", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Ebony Odogaron": { locations: "桑提亞：聖域・舊都拉茲里恩", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Magnamalo": { locations: "桑提亞：榮都古道", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Barroth": { locations: "塔基爾坎：巨龍之骸", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Jade Barroth": { locations: "桑提亞：榮都古道", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Diablos": { locations: "塔基爾坎：奇岩帶", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Black Diablos": { locations: "塔基爾坎：奇岩帶 / 塔基爾坎：死之淵", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Bloodbath Diablos": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Glavenus": { locations: "塔基爾坎：奇岩帶", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Hellblade Glavenus": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Deviljho": { locations: "卡納爾塔密林：嚴界山 / 桑提亞：聖域・舊都拉茲里恩", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Anjanath": { locations: "亞茲萊爾領域：巨樹山口", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Fulgur Anjanath": { locations: "桑提亞：榮都古道", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Brachydios": { locations: "桑提亞：冰河", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Plesioth": { locations: "亞茲萊爾領域：明鏡之湖", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Green Plesioth": { locations: "亞茲萊爾領域：明鏡之湖 / 塔基爾坎：天惠砂海", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Lagiacrus": { locations: "-（侵獸巢穴）", obtainMethod: "亞茲萊爾領域-明鏡之湖北側洞窟的侵獸巢穴取得蛋並孵化" },
  "Ivory Lagiacrus": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Mizutsune": { locations: "-（侵獸巢穴）", obtainMethod: "卡納爾塔密林北側瀑隱冰窟的侵獸巢穴取得蛋並孵化" },
  "Soulseer Mizutsune": { locations: "-（突然變異）", obtainMethod: "突然變異後加入生態系，再從怪物巢穴取得蛋並孵化" },
  "Almudron": { locations: "塔基爾坎：巨龍之骸", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Royal Ludroth": { locations: "亞茲萊爾領域：花陽平原 / 亞茲萊爾領域：明鏡之湖", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Purple Ludroth": { locations: "卡納爾塔密林：大瀑布 / 卡納爾塔密林：恩惠之丘", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Somnacanth": { locations: "卡納爾塔密林：大瀑布 / 卡納爾塔密林：瀑隱冰窟", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Aurora Somnacanth": { locations: "卡納爾塔密林：嚴界山 / 卡納爾塔密林：瀑隱冰窟", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Shogun Ceanataur": { locations: "塔基爾坎：巨龍之骸", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Nerscylla": { locations: "亞茲萊爾領域：花陽平原 / 亞茲萊爾領域：厄石之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Shrouded Nerscylla": { locations: "塔基爾坎：奇岩帶", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Rakna-Kadaki": { locations: "塔基爾坎：死之淵", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Paolumu": { locations: "亞茲萊爾領域：厄石之森", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Rathian": { locations: "-（侵獸巢穴）", obtainMethod: "亞茲萊爾領域的侵獸巢穴取得蛋並孵化" },
  "Pink Rathian": { locations: "-（突然變異）", obtainMethod: "突然變異（雌火龍生態等級B），再從怪物巢穴取得蛋並孵化" },
  "Dreadqueen Rathian": { locations: "-（突然變異）", obtainMethod: "突然變異（雌火龍/櫻火龍生態等級S + 毒屬性魔物3體以上）" },
  "Rathalos": { locations: "桑提亞：聖域・舊都拉茲里恩", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Azure Rathalos": { locations: "-（突然變異）", obtainMethod: "突然變異（火龍生態等級A），再從怪物巢穴取得蛋並孵化" },
  "Dreadking Rathalos": { locations: "-（突然變異）", obtainMethod: "突然變異（火龍/蒼火龍生態等級S + 飛龍種4體以上）" },
  "Barioth": { locations: "-（侵獸巢穴）", obtainMethod: "桑提亞：冰河北東的侵獸巢穴取得蛋並孵化" },
  "Sand Barioth": { locations: "-（突然變異）", obtainMethod: "突然變異（冰牙龍生態等級A），再從怪物巢穴取得蛋並孵化" },
  "Nargacuga": { locations: "-（侵獸巢穴）", obtainMethod: "卡納爾塔密林-恩惠之丘東側的侵獸巢穴取得蛋並孵化" },
  "Green Nargacuga": { locations: "-（突然變異）", obtainMethod: "突然變異（迅龍生態等級A），再從怪物巢穴取得蛋並孵化" },
  "Silverwind Nargacuga": { locations: "-（突然變異）", obtainMethod: "突然變異（迅龍/綠迅龍生態等級S + 風系魔物2體以上）" },
  "Legiana": { locations: "桑提亞：冰河", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Astalos": { locations: "-（侵獸巢穴）", obtainMethod: "亞茲萊爾領域-明鏡之湖北西崖奧的侵獸巢穴取得蛋並孵化" },
  "Boltreaver Astalos": { locations: "-（突然變異）", obtainMethod: "突然變異（電龍生態等級S + 雷屬性區域且雷屬性魔物3體以上）" },
  "Tigrex": { locations: "-（侵獸巢穴）", obtainMethod: "塔基爾坎-巨龍之骸南東的侵獸巢穴取得蛋並孵化" },
  "Brute Tigrex": { locations: "-（突然變異）", obtainMethod: "突然變異（轟龍生態等級A），再從怪物巢穴取得蛋並孵化" },
  "Grimclaw Tigrex": { locations: "-（突然變異）", obtainMethod: "突然變異（轟龍/黑轟龍生態等級S + 力量型魔物4體以上）" },
  "Seregios": { locations: "卡納爾塔密林：嚴界山", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Gravios": { locations: "塔基爾坎：奇岩帶", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Black Gravios": { locations: "塔基爾坎：天惠砂海 / 塔基爾坎：死之淵", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Khezu": { locations: "卡納爾塔密林：瀑隱冰窟", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Red Khezu": { locations: "卡納爾塔密林：瀑隱冰窟 / 桑提亞：冰河", obtainMethod: "怪物巢穴取得蛋並孵化" },
  "Espinas": { locations: "亞茲萊爾領域：巨樹山口（西側洞窟內）/ 塔基爾坎：天惠砂海", obtainMethod: "巨樹山口洞窟歸巢後從怪物巢穴取得蛋並孵化" },
  "Rey Dau": { locations: "塔基爾坎：死之淵", obtainMethod: "擊破煌雷龍後從怪物巢穴取得蛋並孵化" },
  "Arkveld": { locations: "桑提亞：聖域・舊都拉茲里恩", obtainMethod: "擊敗鎖刃龍後在怪物巢穴取得蛋並孵化" },
  "Namielle": { locations: "亞茲萊爾領域：明鏡之湖", obtainMethod: "明鏡之湖天變古流戰討伐後，在怪物巢穴取得蛋" },
  "Velkhana": { locations: "桑提亞：冰河", obtainMethod: "冰河天變古流戰討伐後，在怪物巢穴取得蛋" },
  "Malzeno": { locations: "桑提亞：聖域・舊都拉茲里恩", obtainMethod: "擊敗爵銀龍後在怪物巢穴取得蛋並孵化" },
  "Yama Tsukami": { locations: "待補充", obtainMethod: "待補充" },
  "Thunder Serpent Narwa": { locations: "待補充", obtainMethod: "待補充" },
  "Wind Serpent Ibushi": { locations: "待補充", obtainMethod: "待補充" },
  "Honed Glavenus": { locations: "待補充", obtainMethod: "待補充" },
  "Dos Poogie": { locations: "-（任務）", obtainMethod: "完成任務「プーギーハント・其之4」後取得蛋並孵化" },
  "Feral Chatacabra": { locations: "亞茲萊爾領域：灰之道（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Yian Kut-Ku": { locations: "亞茲萊爾領域（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Velocidrome": { locations: "亞茲萊爾領域（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Gypceros": { locations: "亞茲萊爾領域（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Somnacanth": { locations: "卡納爾塔密林（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Great Izuchi": { locations: "卡納爾塔密林（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Aknosom": { locations: "卡納爾塔密林（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Nerscylla": { locations: "亞茲萊爾領域：明鏡之湖", obtainMethod: "-（解鎖營地）" },
  "Feral Brachydios": { locations: "亞茲萊爾領域：厄石之森", obtainMethod: "-（解鎖營地）" },
  "Feral Paolumu": { locations: "亞茲萊爾領域：巨樹山口", obtainMethod: "-（解鎖營地）" },
  "Feral Bishaten": { locations: "卡納爾塔密林：啼吠之森", obtainMethod: "-（解鎖營地）" },
  "Feral Tetranadon": { locations: "卡納爾塔密林：瀑隱冰窟", obtainMethod: "-（解鎖營地）" },
  "Feral Espinas": { locations: "卡納爾塔密林：嚴界山", obtainMethod: "-（解鎖營地）" },
  "Feral Tobi-Kadachi": { locations: "卡納爾塔密林：恩惠之丘", obtainMethod: "-（解鎖營地）" },
  "Feral Barroth": { locations: "塔基爾坎：巨龍之骸", obtainMethod: "-（解鎖營地）" },
  "Feral Glavenus": { locations: "塔基爾坎：天惠砂海", obtainMethod: "-（解鎖營地）" },
  "Feral Gravios": { locations: "塔基爾坎：奇岩帶", obtainMethod: "-（解鎖營地）" },
  "Feral Legiana": { locations: "桑提亞：榮都古道", obtainMethod: "-（解鎖營地）" },
  "Feral Magnamalo": { locations: "桑提亞：聖域・舊都拉茲里恩", obtainMethod: "-（解鎖營地）" },
  "Feral Yama Tsukami": { locations: "-（劇情Boss）", obtainMethod: "-（劇情Boss）" },
  "Feral Ajarakan": { locations: "塔基爾坎（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Rakna-Kadaki": { locations: "塔基爾坎（劇情）", obtainMethod: "-（劇情Boss）" },
  "Feral Blangonga": { locations: "桑提亞（劇情）", obtainMethod: "-（劇情Boss）" },
};

export function getLocation(nameEN: string): MonsterLocation | null {
  return LOCATION_RAW[nameEN] || null;
}
