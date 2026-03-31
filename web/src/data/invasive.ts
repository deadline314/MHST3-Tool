export interface InvasiveBeast {
  region: string;
  location: string;
  invasive: string;
  invasiveJP: string;
  requirement: string;
  method: string;
  unlocksMonster: string;
  unlocksMonsterJP: string;
  baseMonster: string;
}

export interface InvasiveEvolution {
  invasive: string;
  unlocksMonster: string;
  subSpecies: string;
  subSpeciesCondition: string;
  deviant: string;
  deviantCondition: string;
}

export interface MutationInfo {
  result: string;
  resultJP: string;
  source: string;
  sourceJP: string;
  condition: string;
}

export interface TemperedElderInfo {
  nameZH: string;
  nameJP: string;
  region: string;
  location: string;
  element: string;
  obtainable: boolean;
  strategy: string;
}

export const INVASIVE_BEASTS: InvasiveBeast[] = [
  { region: "亞茲萊爾領域", location: "明鏡之湖（北邊洞窟，夜間限定）", invasive: "侵獸水龍", invasiveJP: "侵獣ガノトトス", requirement: "火屬性大錘", method: "用火屬性大錘攻擊頭部進行部位破壞即可歸巢。侵化態為技巧型，注意超滅氣攻擊，可用預防旋律防止。HP約40%以下後行動變得混亂，會使用更多全體攻擊", unlocksMonster: "海龍", unlocksMonsterJP: "ラギアクルス", baseMonster: "水龍" },
  { region: "亞茲萊爾領域", location: "明鏡之湖西北懸崖（騎能游泳的隨行獸到圓圈處的上升氣流，切換成擂斯飛上去再往海角飛過去）", invasive: "侵獸千刃龍", invasiveJP: "侵獣セルレギオス", requirement: "含有「完美」或「精準」名詞技能的槌子（如完美命中、精準碎擊、精準重擊等）", method: "歸巢條件：在千刃龍咆哮後的下一回合，用含有「完美」或「精準」名詞的槌子技能贏得對決即可擊退。\n【回合攻略】\n第1回合：千刃龍一定用全體技，直接扣四顆愛心，建議夥伴帶艾蓮娜用根性撐過去。\n第2回合：艾蓮娜會吸引砲火，讓她扛下來（會倒）。\n第3回合：注意千刃龍咆哮的顏色，這會決定下一回合的對決屬性。\n第4回合：根據上回合咆哮判斷對決屬性（紅色＝力量、藍色＝速度、綠色＝技巧），用完美命中、精準碎擊、精準重擊等槌子技能贏得對決就能擊退。\n【咆哮判斷表】\n侵撃：襲擊之咆哮（攻擊力↑）→ 豪速鱗為力量\n侵撃：迅速之咆哮（速度↑）→ 豪速鱗為速度\n侵撃：堅牢之咆哮（防禦力↑）→ 豪速鱗為技巧\n如果沒看到咆哮名稱，也可以從千刃龍身上的BUFF圖示來判斷對決屬性。", unlocksMonster: "電龍", unlocksMonsterJP: "ライゼクス", baseMonster: "千刃龍" },
  { region: "亞茲萊爾領域", location: "花陽之平原", invasive: "侵獸黑狼鳥", invasiveJP: "侵獣イャンガルルガ", requirement: "-", method: "弱冰屬性。通常技巧→憤怒力量→侵化力量。注意劇毒和火燒攻擊。憤怒模式A（蓄力x3，安全時間）和B交替出現。HP約30%後普攻變為連續閃耀爆裂（全體火燒）", unlocksMonster: "雌火龍", unlocksMonsterJP: "リオレイア", baseMonster: "黑狼鳥" },
  { region: "卡納爾塔密林", location: "恩惠之丘", invasive: "侵獸青熊獸", invasiveJP: "侵獣アオアシラ", requirement: "-", method: "歸巢條件：耗盡青熊獸的蜂蜜。重點是殺死召喚出的普通青熊獸小怪，而非BOSS本體。若侵化態結束時場上仍有2隻青熊獸，會使出即死全體攻擊（蜂蜜爪）。對異常狀態（毒、爆破、麻痺）極度脆弱", unlocksMonster: "加爾克", unlocksMonsterJP: "ガルク", baseMonster: "青熊獸" },
  { region: "卡納爾塔密林", location: "恩惠之丘東方河道（夜間限定）", invasive: "侵獸影蜘蛛", invasiveJP: "侵獣ネルスキュラ", requirement: "有「龍擊砲」技能的銃槍", method: "侵化態會隱身，只有龍擊砲和羈絆技能命中。在侵襲：死亡剪刀回合使用龍擊砲可造成強制倒地＋解除隱身。確保耐力72以上。注意睡眠、毒、封印、即死等異常狀態，可用預防旋律防範。HP約40%後死亡剪刀時機會改變來騙龍擊砲", unlocksMonster: "迅龍", unlocksMonsterJP: "ナルガクルガ", baseMonster: "影蜘蛛" },
  { region: "卡納爾塔密林", location: "瀑布隱藏冰窟（夜間限定）", invasive: "侵獸將軍蟹", invasiveJP: "侵獣ショウグンギザミ", requirement: "同時有守勢之歌與飛躍旋律的笛子(推薦奇怪龍笛)＋硬化藥(可選)", method: "歸巢條件：防禦提升【大】即可。建議夥伴：歐帕\n打法1：\n鐮蟹攻略：把隊伍防禦ＢＵＦＦ灌到防禦［大］即可\n開局：守勢之歌（全隊防禦小）\n第二回合：飛躍旋律（全隊防禦中）\n第三回合：飛躍旋律（全隊防禦大）\n歐帕也會幫忙吹飛躍旋律，所以第二回合就能疊出防禦大了，但由於死掉會導致BUFF清空，所以如果鐮蟹打BUFF沒滿的對像的話就重來吧。\n打法2：\n第1回合：對隨行獸使用硬化藥\n第2回合：用飛躍旋律將防禦提升至【大】\n第3回合：隨行獸承受侵襲：鐵塊斬。\n殼（頭蓋骨）型態為力量，侵化速度型，脫殼技巧型。殼型態時有反擊準備，不要攻擊。侵化態攻擊藍/黃線=速度，紅線=鐵塊斬。", unlocksMonster: "泡狐龍", unlocksMonsterJP: "タマミツネ", baseMonster: "將軍蟹" },  { region: "塔基爾坎", location: "奇岩帶西方高台（夜間限定）", invasive: "侵獸慘爪龍", invasiveJP: "侵獣オドガロン", requirement: "泥翁龍（需有掀起泥浪/泥沼地獄技能）＋穿刺武器（弓/銃槍）", method: "歸巢條件：在侵襲：紅蓮爪時同時完成「爪子部位破壞」和「身上有淤泥陷阱DEBUFF」。用穿刺武器一直打爪子，隨行獸持續使用掀起泥浪/泥沼地獄疊泥DEBUFF", unlocksMonster: "雷狼龍", unlocksMonsterJP: "ジンオウガ", baseMonster: "慘爪龍" },
  { region: "塔基爾坎", location: "巨龍之骸東南（夜間限定）", invasive: "侵獸角龍", invasiveJP: "侵獣ディアブロス", requirement: "有「隕星槌」技能的大錘＋孵技：太陽之咆哮", method: "歸巢條件：角龍遁地後左右出現沙塵，用隕星槌砸「最右邊」的目標即可強制倒地＋取消遁地。用太陽之咆哮充滿羈絆值備用。HP約50%後獄咆哮替換為全體攻擊麥克斯角", unlocksMonster: "轟龍", unlocksMonsterJP: "ティガレックス", baseMonster: "角龍" },
  { region: "桑提亞", location: "冰河東北懸崖（夜間限定）", invasive: "侵獸奇怪龍", invasiveJP: "侵獣フルフル", requirement: "有預防旋律的狩獵笛＋耐雷裝備", method: "歸巢條件：不讓龍氣獵食者成功（用雙重對決勝出），撐到第2次侵襲：死亡之聲。全程除了特動就是用一直用雙重對決阻止他攻擊，大概到第10回合他跳出\"學習完畢\"時盧迪會提示說要阻止他攻擊，第11回合用羈絆技斷他招，12回合結束就會撤退了。\n主要就是要防麻痺跟一直打雙重對決", unlocksMonster: "冰牙龍", unlocksMonsterJP: "ベリオロス", baseMonster: "奇怪龍" },
];

export const INVASIVE_EVOLUTIONS: InvasiveEvolution[] = [
  { invasive: "侵獸水龍", unlocksMonster: "海龍", subSpecies: "白海龍", subSpeciesCondition: "海龍生態A級以上", deviant: "-", deviantCondition: "-" },
  { invasive: "侵獸千刃龍", unlocksMonster: "電龍", subSpecies: "-", subSpeciesCondition: "-", deviant: "青電主電龍", deviantCondition: "電龍在雷屬性地區生態S、雷屬性區域中需有至少3種雷屬性魔物" },
  { invasive: "侵獸黑狼鳥", unlocksMonster: "雌火龍", subSpecies: "櫻火龍", subSpeciesCondition: "雌火龍生態B級以上", deviant: "紫毒姬火龍", deviantCondition: "雌火龍或櫻火龍生態S、生態系中有3隻以上持毒魔物" },
  { invasive: "侵獸影蜘蛛", unlocksMonster: "迅龍", subSpecies: "綠迅龍", subSpeciesCondition: "迅龍生態A級以上", deviant: "白疾風迅龍", deviantCondition: "迅龍或綠迅龍生態S、地區中至少2隻會使用風的魔物" },
  { invasive: "侵獸將軍蟹", unlocksMonster: "泡狐龍", subSpecies: "-", subSpeciesCondition: "-", deviant: "天眼泡狐龍", deviantCondition: "泡狐龍生態S、同時存在雷狼龍" },
  { invasive: "侵獸慘爪龍", unlocksMonster: "雷狼龍", subSpecies: "獄狼龍", subSpeciesCondition: "雷狼龍生態A級以上", deviant: "金雷公雷狼龍", deviantCondition: "雷狼龍或獄狼龍生態S、同時存在泡狐龍" },
  { invasive: "侵獸角龍", unlocksMonster: "轟龍", subSpecies: "黑轟龍", subSpeciesCondition: "轟龍生態A級以上", deviant: "荒鉤爪轟龍", deviantCondition: "轟龍或黑轟龍生態S、生態系至少4隻力量型魔物" },
  { invasive: "侵獸奇怪龍", unlocksMonster: "冰牙龍", subSpecies: "風牙龍", subSpeciesCondition: "冰牙龍生態A級以上", deviant: "-", deviantCondition: "-" },
];

export const MUTATIONS: MutationInfo[] = [
  { result: "櫻火龍", resultJP: "リオレイア亜種", source: "雌火龍", sourceJP: "リオレイア", condition: "雌火龍生態等級B以上" },
  { result: "紫毒姬火龍", resultJP: "紫毒姫リオレイア", source: "雌火龍 / 櫻火龍", sourceJP: "リオレイア / リオレイア亜種", condition: "①雌火龍或櫻火龍生態等級S ②生態系中有3隻以上持毒的魔物" },
  { result: "白海龍", resultJP: "ラギアクルス亜種", source: "海龍", sourceJP: "ラギアクルス", condition: "海龍生態等級A以上" },
  { result: "青電主電龍", resultJP: "青電主ライゼクス", source: "電龍", sourceJP: "ライゼクス", condition: "①電龍生態等級S ②雷屬性地區且生態系中有3隻以上雷屬性魔物" },
  { result: "獨眼黑狼鳥", resultJP: "隻眼イャンガルルガ", source: "黑狼鳥", sourceJP: "イャンガルルガ", condition: "①黑狼鳥生態等級S ②同生態系中有3隻以上隨行獸等級★4以上的魔物" },
  { result: "天眼泡狐龍", resultJP: "天眼タマミツネ", source: "泡狐龍", sourceJP: "タマミツネ", condition: "①泡狐龍生態等級S ②同生態系中存在雷狼龍系統" },
  { result: "綠迅龍", resultJP: "ナルガクルガ亜種", source: "迅龍", sourceJP: "ナルガクルガ", condition: "迅龍生態等級A以上" },
  { result: "白疾風迅龍", resultJP: "白疾風ナルガクルガ", source: "迅龍 / 綠迅龍", sourceJP: "ナルガクルガ / ナルガクルガ亜種", condition: "①迅龍或綠迅龍生態等級S ②同生態系中有2隻以上擅長使用風的魔物" },
  { result: "獄狼龍", resultJP: "ジンオウガ亜種", source: "雷狼龍", sourceJP: "ジンオウガ", condition: "雷狼龍生態等級A以上" },
  { result: "金雷公雷狼龍", resultJP: "金雷公ジンオウガ", source: "雷狼龍 / 獄狼龍", sourceJP: "ジンオウガ / ジンオウガ亜種", condition: "①雷狼龍或獄狼龍生態等級S ②同生態系中存在泡狐龍" },
  { result: "燼滅刃斬龍", resultJP: "燼滅刃ディノバルド", source: "斬龍", sourceJP: "ディノバルド", condition: "①斬龍生態等級S ②同生態系中有4隻以上持銳利刃的魔物" },
  { result: "黑轟龍", resultJP: "ティガレックス亜種", source: "轟龍", sourceJP: "ティガレックス", condition: "轟龍生態等級A以上" },
  { result: "荒鉤爪轟龍", resultJP: "荒鉤爪ティガレックス", source: "轟龍 / 黑轟龍", sourceJP: "ティガレックス / ティガレックス亜種", condition: "①轟龍或黑轟龍生態等級S ②生態系中有4隻以上力量型魔物" },
  { result: "鏖魔角龍", resultJP: "鏖魔ディアブロス", source: "角龍 / 黑角龍", sourceJP: "ディアブロス / ディアブロス亜種", condition: "①角龍或黑角龍生態等級S ②在塔基爾坎「天惠砂海」中存在角龍或黑角龍" },
  { result: "風牙龍", resultJP: "ベリオロス亜種", source: "冰牙龍", sourceJP: "ベリオロス", condition: "冰牙龍生態等級A以上" },
  { result: "蒼火龍", resultJP: "リオレウス亜種", source: "火龍", sourceJP: "リオレウス", condition: "火龍生態等級A以上" },
  { result: "黑炎王火龍", resultJP: "黒炎王リオレウス", source: "火龍 / 蒼火龍", sourceJP: "リオレウス / リオレウス亜種", condition: "①火龍或蒼火龍生態等級S ②生態系中有4隻以上飛龍種" },
];

export const TEMPERED_ELDERS: TemperedElderInfo[] = [
  { nameZH: "天變溟波龍", nameJP: "天変ネロミェール", region: "亞茲萊爾領域", location: "明鏡之湖", element: "水", obtainable: true, strategy: "夜間在明鏡之湖觸發。弱火、冰、龍屬性。狀態切換：水纏（技巧）→溟帶電（速度）→封龍（力量）。對毒極弱（⬇⬇），可用麻痺和裂傷。注意抗雷和水屬性" },
  { nameZH: "天變風神龍", nameJP: "天変イブシマキヒコ", region: "卡納爾塔密林", location: "嚴界山", element: "龍", obtainable: false, strategy: "夜間在嚴界山觸發，與雷神龍同時出現（雙體戰）。弱火、龍屬性。狀態切換：風纏（力量）→異體同心（速度）→封龍（力量）。對封印和裂傷有效（⬇⬇）。大部分異常狀態高抗性" },
  { nameZH: "天變雷神龍", nameJP: "天変ナルハタタヒメ", region: "卡納爾塔密林", location: "嚴界山", element: "雷", obtainable: false, strategy: "與風神龍的雙體戰。弱冰、龍屬性。狀態切換：雷纏（技巧）→異體同心（速度）→雷纏（技巧）。對毒和裂傷極弱（⬇⬇）。異體同心為兩龍合體狀態" },
  { nameZH: "天變浮岳龍", nameJP: "天変ヤマツカミ", region: "塔基爾坎", location: "巨龍之骸", element: "無", obtainable: false, strategy: "夜間在巨龍之骸觸發。弱冰、龍（⬇⬇）屬性。狀態切換：通常（力量）→開口（速度）。首回合觸手大迴轉為無屬性全體攻擊，防禦需340+或用銃槍防禦。破壞兩隻觸手後進入開口狀態，集中火力攻擊嘴部。浮岳龍引力為必中大傷害全體攻擊，必須騎乘隨行獸存活。封龍狀態會使用帶屬性攻擊，積極贏得對決充羈絆值。推薦龍屬性武器" },
  { nameZH: "天變冰咒龍", nameJP: "天変イヴェルカーナ", region: "桑提亞", location: "冰河", element: "冰", obtainable: true, strategy: "夜間在冰河觸發。弱火（⬇⬇）、雷、龍屬性。狀態切換：通常（技巧）→冰纏（速度）→封龍（技巧/力量）。對麻痺和束縛極弱（⬇⬇），毒和裂傷也有效。冰纏狀態下火弱點降低，雷弱點消失" },
];

const MUTATION_RESULTS = new Set(MUTATIONS.map((m) => m.result));

export function isMutationResult(monsterNameZH: string): boolean {
  return MUTATION_RESULTS.has(monsterNameZH);
}

const MUTATION_SOURCES = new Set(
  MUTATIONS.flatMap((m) => m.source.split(" / "))
);

export function isMutationSource(monsterNameZH: string): boolean {
  return MUTATION_SOURCES.has(monsterNameZH);
}

export function getInvasiveBeast(monsterNameZH: string): InvasiveBeast | null {
  return INVASIVE_BEASTS.find((ib) =>
    ib.invasive === monsterNameZH || ib.baseMonster === monsterNameZH
  ) || null;
}

export function getInvasiveEvolution(monsterNameZH: string): InvasiveEvolution | null {
  const beast = getInvasiveBeast(monsterNameZH);
  if (!beast) return null;
  return INVASIVE_EVOLUTIONS.find((ie) => ie.invasive === beast.invasive) || null;
}

export function getInvasiveByUnlock(monsterNameZH: string): InvasiveBeast | null {
  return INVASIVE_BEASTS.find((ib) => ib.unlocksMonster === monsterNameZH) || null;
}

export function getEvolutionByUnlock(monsterNameZH: string): InvasiveEvolution | null {
  return INVASIVE_EVOLUTIONS.find((ie) => ie.unlocksMonster === monsterNameZH) || null;
}

export function getMutationsFrom(monsterNameZH: string): MutationInfo[] {
  return MUTATIONS.filter((m) => m.source.split(" / ").includes(monsterNameZH));
}

export function getMutationTo(monsterNameZH: string): MutationInfo | null {
  return MUTATIONS.find((m) => m.result === monsterNameZH) || null;
}

export function getTemperedElderInfo(monsterNameZH: string): TemperedElderInfo | null {
  return TEMPERED_ELDERS.find((t) => t.nameZH === monsterNameZH) || null;
}
