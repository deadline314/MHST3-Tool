export interface InvasiveBeast {
  region: string;
  invasive: string;
  invasiveJP: string;
  requirement: string;
  method: string;
  unlocksMonster: string;
  unlocksMonsterJP: string;
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

export const INVASIVE_BEASTS: InvasiveBeast[] = [
  { region: "亞茲萊爾領域", invasive: "侵獸水龍", invasiveJP: "侵獣ガノトトス", requirement: "火屬性武器", method: "等鰓位置出現水泡後，用火屬性攻擊一直打水泡位置", unlocksMonster: "海龍", unlocksMonsterJP: "ラギアクルス" },
  { region: "亞茲萊爾領域", invasive: "侵獸千刃龍", invasiveJP: "侵獣セルレギオス", requirement: "含「完美」「精準」名詞技能的槌子", method: "咆哮後的下一回合使用含「完美」「精準」名詞的槌子技能對決勝利", unlocksMonster: "電龍", unlocksMonsterJP: "ライゼクス" },
  { region: "亞茲萊爾領域", invasive: "侵獸黑狼鳥", invasiveJP: "侵獣イャンガルルガ", requirement: "-", method: "-", unlocksMonster: "雌火龍", unlocksMonsterJP: "リオレイア" },
  { region: "卡納爾塔密林", invasive: "侵獸青熊獸", invasiveJP: "侵獣アオアシラ", requirement: "-", method: "-", unlocksMonster: "加爾克", unlocksMonsterJP: "ガルク" },
  { region: "卡納爾塔密林", invasive: "侵獸影蜘蛛", invasiveJP: "侵獣ネルスキュラ", requirement: "有「龍擊砲」技能的銃槍", method: "確保耐力72以上，等盧迪說出「重頭戲」且紅線對著玩家時使用龍擊砲", unlocksMonster: "迅龍", unlocksMonsterJP: "ナルガクルガ" },
  { region: "卡納爾塔密林", invasive: "侵獸鎌蟹", invasiveJP: "侵獣ショウグンギザミ", requirement: "同時有守勢之歌與飛躍旋律的笛子", method: "將隊伍防禦BUFF疊到防禦[大]（守勢之歌→飛躍旋律→飛躍旋律）", unlocksMonster: "泡狐龍", unlocksMonsterJP: "タマミツネ" },
  { region: "塔基爾坎", invasive: "侵獸慘爪龍", invasiveJP: "侵獣オドガロン", requirement: "泥翁龍（需有掀起泥浪/泥沼地獄技能）", method: "一直打爪子，隨行獸無腦使用掀起泥浪/泥沼地獄，需同時完成爪子破壞與在侵襲:紅蓮爪時身上有淤泥陷阱DEBUFF", unlocksMonster: "雷狼龍", unlocksMonsterJP: "ジンオウガ" },
  { region: "塔基爾坎", invasive: "侵獸角龍", invasiveJP: "侵獣ディアブロス", requirement: "有「隕星」技能的大錘", method: "第1回合咆哮不管、第2回合遁地不管、第3回合使用隕星技能砸最右邊的目標", unlocksMonster: "轟龍", unlocksMonsterJP: "ティガレックス" },
  { region: "桑提亞", invasive: "侵獸白電龍", invasiveJP: "侵獣フルフル", requirement: "-", method: "-", unlocksMonster: "冰牙龍", unlocksMonsterJP: "ベリオロス" },
];

export const INVASIVE_EVOLUTIONS: InvasiveEvolution[] = [
  { invasive: "侵獸水龍", unlocksMonster: "海龍", subSpecies: "白海龍", subSpeciesCondition: "海龍生態A級以上", deviant: "-", deviantCondition: "-" },
  { invasive: "侵獸千刃龍", unlocksMonster: "電龍", subSpecies: "-", subSpeciesCondition: "-", deviant: "青電主電龍", deviantCondition: "電龍在雷屬性地區生態S、雷屬性區域中需有至少3種雷屬性魔物" },
  { invasive: "侵獸黑狼鳥", unlocksMonster: "雌火龍", subSpecies: "櫻火龍", subSpeciesCondition: "雌火龍生態B級以上", deviant: "紫毒姬火龍", deviantCondition: "雌火龍或櫻火龍生態S、生態系中有3隻以上持毒魔物" },
  { invasive: "侵獸影蜘蛛", unlocksMonster: "迅龍", subSpecies: "綠迅龍", subSpeciesCondition: "迅龍生態A級以上", deviant: "白疾風迅龍", deviantCondition: "迅龍或綠迅龍生態S、地區中至少2隻會使用風的魔物" },
  { invasive: "侵獸鎌蟹", unlocksMonster: "泡狐龍", subSpecies: "-", subSpeciesCondition: "-", deviant: "天眼泡狐龍", deviantCondition: "泡狐龍生態S、同時存在雷狼龍" },
  { invasive: "侵獸慘爪龍", unlocksMonster: "雷狼龍", subSpecies: "獄狼龍", subSpeciesCondition: "雷狼龍生態A級以上", deviant: "金雷公雷狼龍", deviantCondition: "雷狼龍或獄狼龍生態S、同時存在泡狐龍" },
  { invasive: "侵獸角龍", unlocksMonster: "轟龍", subSpecies: "黑轟龍", subSpeciesCondition: "轟龍生態A級以上", deviant: "荒鉤爪轟龍", deviantCondition: "轟龍或黑轟龍生態S、生態系至少4隻力量型魔物" },
  { invasive: "侵獸白電龍", unlocksMonster: "冰牙龍", subSpecies: "砂冰牙龍", subSpeciesCondition: "冰牙龍生態A級以上", deviant: "-", deviantCondition: "-" },
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
  { result: "砂冰牙龍", resultJP: "ベリオロス亜種", source: "冰牙龍", sourceJP: "ベリオロス", condition: "冰牙龍生態等級A以上" },
  { result: "蒼火龍", resultJP: "リオレウス亜種", source: "火龍", sourceJP: "リオレウス", condition: "火龍生態等級A以上" },
  { result: "黑炎王火龍", resultJP: "黒炎王リオレウス", source: "火龍 / 蒼火龍", sourceJP: "リオレウス / リオレウス亜種", condition: "①火龍或蒼火龍生態等級S ②生態系中有4隻以上飛龍種" },
];
