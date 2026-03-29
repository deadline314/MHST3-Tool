import type { Monster, AttackType, SpecialAttack } from "../types/monster";
import { categoryToGroup } from "../types/monster";

function parseSpecialAttacks(raw: string): SpecialAttack[] {
  if (!raw || raw.trim() === "-") return [];
  return raw.split("/").map((part) => {
    const match = part.trim().match(/\[(.+?)\]:\s*(.+)/);
    if (!match) return { condition: "", type: "-" as AttackType };
    return { condition: match[1], type: match[2].trim() as AttackType };
  });
}

function nameToIconFile(nameEN: string): string {
  return `MHST3-${nameEN.replace(/ /g, "_")}_Icon`;
}

interface RawMonster {
  name: string;
  nameEN: string;
  nameJP: string;
  species: string;
  normalAttack: string;
  specialAttacks: string;
}

const ICON_OVERRIDES: Record<string, string> = {
  "Bnahabra": "Blue_Bnahabra",
  "Exotic Velocidrome": "Velocidrome",
  "Exotic Seregios": "Invasive_Seregios",
  "Exotic Legiana": "Feral_Legiana",
  "Exotic Nibelsnarf": "Nibelsnarf",
  "Barrel Felyne": "Barrel_Felyne",
  "Dos Poogie": "Dos_Poogie",
  "Great Dracophage Bug": "Rachnoid",
  "Great Thunderbug": "Rachnoid",
  "Kirin": "Velkhana",
  "Teostra": "Rathalos",
  "Kushala Daora": "Barioth",
  "Nergigante": "Deviljho",
  "Altaroth": "Rachnoid",
  "Slagtoth": "Brown_Slagtoth",
  "Tempered Namielle": "Namielle",
  "Tempered Ibushi": "Wind_Serpent_Ibushi",
  "Tempered Narwa": "Thunder_Serpent_Narwa",
  "Tempered Yama Tsukami": "Yama_Tsukami",
  "Tempered Velkhana": "Velkhana",
  "Bound Azure Rathalos": "Bound_Azure_Rathalos",
  "Bound Lunagaron": "Bound_Lunagaron",
  // "Feral Chatacabra": "Chatacabra",
  // "Feral Yian Kut-Ku": "Yian_Kut-Ku",
  // "Feral Velocidrome": "Velocidrome",
  // "Feral Gypceros": "Gypceros",
  // "Feral Somnacanth": "Somnacanth",
  // "Feral Great Izuchi": "Great_Izuchi",
  // "Feral Aknosom": "Aknosom",
  // "Feral Nerscylla": "Nerscylla",
  // "Feral Brachydios": "Brachydios",
  // "Feral Paolumu": "Paolumu",
  // "Feral Bishaten": "Bishaten",
  // "Feral Tetranadon": "Tetranadon",
  // "Feral Espinas": "Espinas",
  // "Feral Tobi-Kadachi": "Tobi-Kadachi",
  // "Feral Barroth": "Barroth",
  // "Feral Glavenus": "Glavenus",
  // "Feral Gravios": "Gravios",
  // "Feral Legiana": "Legiana",
  // "Feral Magnamalo": "Magnamalo",
  // "Feral Yama Tsukami": "Yama_Tsukami_2",
  // "Feral Ajarakan": "Ajarakan",
  // "Feral Rakna-Kadaki": "Rakna-Kadaki",
  // "Feral Blangonga": "Blangonga",
};

function getIconPath(nameEN: string): string {
  if (ICON_OVERRIDES[nameEN]) {
    return `/monsters/MHST3-${ICON_OVERRIDES[nameEN]}_Icon`;
  }
  return `/monsters/${nameToIconFile(nameEN)}`;
}

const RAW_DATA: { category: string; monsters: RawMonster[] }[] = [
  {
    category: "草食種",
    monsters: [
      { name: "草食龍", nameEN: "Aptonoth", nameJP: "アプトノス", species: "草食種", normalAttack: "力量", specialAttacks: "-" },
      { name: "精靈鹿", nameEN: "Kelbi", nameJP: "ケルビ", species: "草食種", normalAttack: "-", specialAttacks: "-" },
      { name: "雲羊鹿", nameEN: "Moofah", nameJP: "モーファ", species: "草食種", normalAttack: "-", specialAttacks: "-" },
      { name: "垂皮龍", nameEN: "Slagtoth", nameJP: "ズワロポス", species: "草食種", normalAttack: "力量", specialAttacks: "-" },
    ],
  },
  {
    category: "甲蟲種",
    monsters: [
      { name: "飛甲蟲", nameEN: "Bnahabra", nameJP: "ブナハブラ", species: "甲蟲種", normalAttack: "技巧", specialAttacks: "-" },
      { name: "甲蟲", nameEN: "Altaroth", nameJP: "オルタロス", species: "甲蟲種", normalAttack: "技巧", specialAttacks: "-" },
    ],
  },
  {
    category: "鳥龍種",
    monsters: [
      { name: "搔鳥", nameEN: "Kulu-Ya-Ku", nameJP: "クルルヤック", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[舉岩]: 力量" },
      { name: "怪鳥", nameEN: "Yian Kut-Ku", nameJP: "イャンクック", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "青怪鳥", nameEN: "Blue Yian Kut-Ku", nameJP: "イャンクック亜種", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "迅猛龍王", nameEN: "Velocidrome", nameJP: "ドスランポス", species: "鳥龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "毒妖鳥", nameEN: "Pukei-Pukei", nameJP: "プケプケ", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[毒活性【用餐】]: 速度 / [毒活性【啃咬】]: 力量" },
      { name: "毒怪鳥", nameEN: "Gypceros", nameJP: "ゲリョス", species: "鳥龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "紫毒鳥", nameEN: "Purple Gypceros", nameJP: "ゲリョス亜種", species: "鳥龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "黑狼鳥", nameEN: "Yian Garuga", nameJP: "イャンガルルガ", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 力量" },
      { name: "獨眼黑狼鳥", nameEN: "Deadeye Yian Garuga", nameJP: "隻眼イャンガルルガ", species: "鳥龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "傘鳥", nameEN: "Aknosom", nameJP: "アケノシルム", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 力量" },
      { name: "鐮鼬龍王", nameEN: "Great Izuchi", nameJP: "オサイズチ", species: "鳥龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "迅猛龍", nameEN: "Velociprey", nameJP: "ランポス", species: "鳥龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "鎌鼬龍", nameEN: "Izuchi", nameJP: "イズチ", species: "鳥龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "丸鳥", nameEN: "Gargwa", nameJP: "ガーグァ", species: "鳥龍種", normalAttack: "速度", specialAttacks: "-" },
    ],
  },
  {
    category: "兩棲種",
    monsters: [
      { name: "纏蛙", nameEN: "Chatacabra", nameJP: "チャタカブラ", species: "兩棲種", normalAttack: "力量", specialAttacks: "[礦物纏身]: 技巧" },
      { name: "河童蛙", nameEN: "Tetranadon", nameJP: "ヨツミワドウ", species: "兩棲種", normalAttack: "力量", specialAttacks: "[吃撐]: 技巧" },
    ],
  },
  {
    category: "牙獸種",
    monsters: [
      { name: "青熊獸", nameEN: "Arzuros", nameJP: "アオアシラ", species: "牙獸種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "天狗獸", nameEN: "Bishaten", nameJP: "ビシュテンゴ", species: "牙獸種", normalAttack: "技巧", specialAttacks: "[豎尾]: 速度" },
      { name: "緋天狗獸", nameEN: "Blood Orange Bishaten", nameJP: "ビシュテンゴ亜種", species: "牙獸種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "雪獅子王", nameEN: "Blangonga", nameJP: "ドドブランゴ", species: "牙獸種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
      { name: "雪鬼獸", nameEN: "Goss Harag", nameJP: "ゴシャハギ", species: "牙獸種", normalAttack: "力量", specialAttacks: "[憤怒【冰拳】]: 技巧 / [憤怒【冰劍】]: 速度" },
      { name: "赫猿獸", nameEN: "Ajarakan", nameJP: "アジャラカン", species: "牙獸種", normalAttack: "技巧", specialAttacks: "[赤熱化]: 力量" },
      { name: "加爾克", nameEN: "Canyne", nameJP: "ガルク", species: "牙獸種", normalAttack: "速度", specialAttacks: "-" },
      { name: "雪獅子", nameEN: "Blango", nameJP: "ブランゴ", species: "牙獸種", normalAttack: "力量", specialAttacks: "-" },
      { name: "剛纏獸", nameEN: "Garangolm", nameJP: "ガランゴルム", species: "牙獸種", normalAttack: "力量", specialAttacks: "[熔岩纏身]: 速度 / [青苔纏身]: 技巧" },
    ],
  },
  {
    category: "牙龍種",
    monsters: [
      { name: "雷狼龍", nameEN: "Zinogre", nameJP: "ジンオウガ", species: "牙龍種", normalAttack: "速度", specialAttacks: "[帶電]: 技巧 / [超帶電]: 力量" },
      { name: "獄狼龍", nameEN: "Stygian Zinogre", nameJP: "ジンオウガ亜種", species: "牙龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度 / [龍氣]: 力量" },
      { name: "金雷公雷狼龍", nameEN: "Thunderlord Zinogre", nameJP: "金雷公ジンオウガ", species: "牙龍種", normalAttack: "力量", specialAttacks: "-" },
      { name: "冰狼龍", nameEN: "Lunagaron", nameJP: "ルナガロン", species: "牙龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "飛雷龍", nameEN: "Tobi-Kadachi", nameJP: "トビカガチ", species: "牙龍種", normalAttack: "速度", specialAttacks: "[帶電]: 技巧" },
      { name: "慘爪龍", nameEN: "Odogaron", nameJP: "オドガロン", species: "牙龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 速度 / [狂暴化]: 力量" },
      { name: "兇爪龍", nameEN: "Ebony Odogaron", nameJP: "オドガロン亜種", species: "牙龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 速度 / [狂暴化]: 力量" },
      { name: "怨虎龍", nameEN: "Magnamalo", nameJP: "マガイマガド", species: "牙龍種", normalAttack: "速度", specialAttacks: "[鬼火臨界]: 技巧 / [鬼火纏身]: 力量" },
    ],
  },
  {
    category: "獸龍種",
    monsters: [
      { name: "土砂龍", nameEN: "Barroth", nameJP: "ボルボロス", species: "獸龍種", normalAttack: "速度", specialAttacks: "[泥漿纏身]: 技巧" },
      { name: "冰碎龍", nameEN: "Jade Barroth", nameJP: "ボルボロス亜種", species: "獸龍種", normalAttack: "力量", specialAttacks: "[冰雪纏身]: 技巧 / [憤怒]: 速度" },
      { name: "角龍", nameEN: "Diablos", nameJP: "ディアブロス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
      { name: "黑角龍", nameEN: "Black Diablos", nameJP: "ディアブロス亜種", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
      { name: "鏖魔角龍", nameEN: "Bloodbath Diablos", nameJP: "鏖魔ディアブロス", species: "飛龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "斬龍", nameEN: "Glavenus", nameJP: "ディノバルド", species: "獸龍種", normalAttack: "速度", specialAttacks: "[赤熱化【尾巴】]: 力量 / [赤熱化【喉嚨】]: 技巧" },
      { name: "燼滅刃斬龍", nameEN: "Hellblade Glavenus", nameJP: "燼滅刃ディノバルド", species: "獸龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "恐暴龍", nameEN: "Deviljho", nameJP: "イビルジョー", species: "獸龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度 / [龍氣]: 力量" },
      { name: "蠻顎龍", nameEN: "Anjanath", nameJP: "アンジャナフ", species: "獸龍種", normalAttack: "力量", specialAttacks: "[發熱]: 技巧" },
      { name: "雷顎龍", nameEN: "Fulgur Anjanath", nameJP: "アンジャナフ亜種", species: "獸龍種", normalAttack: "力量", specialAttacks: "[帶電]: 速度" },
      { name: "碎龍", nameEN: "Brachydios", nameJP: "ブラキディオス", species: "獸龍種", normalAttack: "力量", specialAttacks: "[黏菌活性]: 速度 / [憤怒]: 力量" },
    ],
  },
  {
    category: "魚龍種",
    monsters: [
      { name: "水龍", nameEN: "Plesioth", nameJP: "ガノトトス", species: "魚龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "翠水龍", nameEN: "Green Plesioth", nameJP: "ガノトトス亜種", species: "魚龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 技巧" },
    ],
  },
  {
    category: "海龍種",
    monsters: [
      { name: "海龍", nameEN: "Lagiacrus", nameJP: "ラギアクルス", species: "海龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度 / [蓄電]: 技巧" },
      { name: "白海龍", nameEN: "Ivory Lagiacrus", nameJP: "ラギアクルス亜種", species: "海龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量 / [蓄電]: 技巧" },
      { name: "泡狐龍", nameEN: "Mizutsune", nameJP: "タマミツネ", species: "海龍種", normalAttack: "技巧", specialAttacks: "[泡沫纏身【潤滑】]: 速度" },
      { name: "天眼泡狐龍", nameEN: "Soulseer Mizutsune", nameJP: "天眼タマミツネ", species: "海龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "泥翁龍", nameEN: "Almudron", nameJP: "オロミドロ", species: "海龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧 / [大泥球]: 速度" },
      { name: "水生獸", nameEN: "Ludroth", nameJP: "ルドロス", species: "海龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "水獸", nameEN: "Royal Ludroth", nameJP: "ロアルドロス", species: "海龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "紫水獸", nameEN: "Purple Ludroth", nameJP: "ロアルドロス亜種", species: "海龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "人魚龍", nameEN: "Somnacanth", nameJP: "イソネミクニ", species: "海龍種", normalAttack: "技巧", specialAttacks: "[豎尾]: 速度" },
      { name: "冰人魚龍", nameEN: "Aurora Somnacanth", nameJP: "イソネミクニ亜種", species: "海龍種", normalAttack: "技巧", specialAttacks: "[豎尾]: 速度" },
    ],
  },
  {
    category: "甲殼種",
    monsters: [
      { name: "鐮蟹", nameEN: "Ceanataur", nameJP: "ガミザミ", species: "甲殼種", normalAttack: "力量", specialAttacks: "-" },
      { name: "將軍蟹", nameEN: "Shogun Ceanataur", nameJP: "ショウグンギザミ", species: "甲殼種", normalAttack: "速度", specialAttacks: "[無殼]: 技巧 / [殼【貝】]: 力量/ [殼【頭骨】]: 速度" },
    ],
  },
  {
    category: "鋏角種",
    monsters: [
      { name: "影蜘蛛", nameEN: "Nerscylla", nameJP: "ネルスキュラ", species: "鋏角種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "骸蜘蛛", nameEN: "Shrouded Nerscylla", nameJP: "ネルスキュラ亜種", species: "鋏角種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "妃蜘蛛", nameEN: "Rakna-Kadaki", nameJP: "ヤツカダキ", species: "鋏角種", normalAttack: "技巧", specialAttacks: "[無蛛絲]: 技巧 / 絲線纏身【腳】: 技巧 / [絲線纏身【繭】]: 速度" },
      { name: "臣蜘蛛", nameEN: "Rachnoid", nameJP: "ツケヒバキ", species: "鋏角種", normalAttack: "技巧", specialAttacks: "-" },
    ],
  },
  {
    category: "蛇龍種",
    monsters: [
      { name: "潛口龍", nameEN: "Nibelsnarf", nameJP: "ハプルボッカ", species: "蛇龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度 / [擬態]: 速度" },
      { name: "翼蛇龍", nameEN: "Remobra", nameJP: "ガブラス", species: "蛇龍種", normalAttack: "技巧", specialAttacks: "-" },
    ],
  },
  {
    category: "飛龍種",
    monsters: [
      { name: "浮空龍", nameEN: "Paolumu", nameJP: "パオウルムー", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[滯空]: 速度" },
      { name: "雌火龍", nameEN: "Rathian", nameJP: "リオレイア", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "櫻火龍", nameEN: "Pink Rathian", nameJP: "リオレイア亜種", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "紫毒姬火龍", nameEN: "Dreadqueen Rathian", nameJP: "紫毒姫リオレイア", species: "飛龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "火龍", nameEN: "Rathalos", nameJP: "リオレウス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧 / [憤怒【滯空】]: 速度" },
      { name: "蒼火龍", nameEN: "Azure Rathalos", nameJP: "リオレウス亜種", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧 / [憤怒【滯空】]: 速度" },
      { name: "黑炎王火龍", nameEN: "Dreadking Rathalos", nameJP: "黒炎王リオレウス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "冰牙龍", nameEN: "Barioth", nameJP: "ベリオロス", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "風牙龍", nameEN: "Sand Barioth", nameJP: "ベリオロス亜種", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "迅龍", nameEN: "Nargacuga", nameJP: "ナルガクルガ", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 技巧" },
      { name: "白疾風迅龍", nameEN: "Silverwind Nargacuga", nameJP: "白疾風ナルガクルガ", species: "飛龍種", normalAttack: "速度", specialAttacks: "-" },
      { name: "綠迅龍", nameEN: "Green Nargacuga", nameJP: "ナルガクルガ亜種", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "風漂龍", nameEN: "Legiana", nameJP: "レイギエナ", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒【滯空】]: 力量 / [滯空]: 技巧" },
      { name: "電龍", nameEN: "Astalos", nameJP: "ライゼクス", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "青電主電龍", nameEN: "Boltreaver Astalos", nameJP: "青電主ライゼクス", species: "飛龍種", normalAttack: "技巧", specialAttacks: "-" },
      { name: "轟龍", nameEN: "Tigrex", nameJP: "ティガレックス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
      { name: "黑轟龍", nameEN: "Brute Tigrex", nameJP: "ティガレックス亜種", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
      { name: "荒鉤爪轟龍", nameEN: "Grimclaw Tigrex", nameJP: "荒鉤爪ティガレックス", species: "飛龍種", normalAttack: "力量", specialAttacks: "-" },
      { name: "千刃龍", nameEN: "Seregios", nameJP: "セルレギオス", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "鎧龍", nameEN: "Gravios", nameJP: "グラビモス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[蓄熱]: 技巧" },
      { name: "黑鎧龍", nameEN: "Black Gravios", nameJP: "グラビモス亜種", species: "飛龍種", normalAttack: "力量", specialAttacks: "[蓄熱]: 技巧" },
      { name: "奇怪龍", nameEN: "Khezu", nameJP: "フルフル", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[帶電]: 力量" },
      { name: "紅怪龍", nameEN: "Red Khezu", nameJP: "フルフル亜種", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[帶電]: 力量 / [放電]: 速度" },
      { name: "棘龍", nameEN: "Espinas", nameJP: "エスピナス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度 / [狂暴化]: 力量" },
      { name: "煌雷龍", nameEN: "Rey Dau", nameJP: "レ・ダウ", species: "飛龍種", normalAttack: "速度", specialAttacks: "[蒼雷晶纏身]: 力量" },
      { name: "鎖刃龍", nameEN: "Arkveld", nameJP: "アルシュベルド", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 力量" },
    ],
  },
  {
    category: "古龍種",
    monsters: [
      { name: "冰咒龍", nameEN: "Velkhana", nameJP: "イヴェルカーナ", species: "古龍種", normalAttack: "技巧", specialAttacks: "[寒冰護體]: 速度 / [霧冰護體]: 力量" },
      { name: "溟波龍", nameEN: "Namielle", nameJP: "ネロミェール", species: "古龍種", normalAttack: "技巧", specialAttacks: "[蓄水]: 速度 / [枯竭]: 力量" },
      { name: "爵銀龍", nameEN: "Malzeno", nameJP: "メルゼナ", species: "古龍種", normalAttack: "速度", specialAttacks: "[封龍]: 速度 / [血氣活化]: 技巧" },
      { name: "浮岳龍", nameEN: "Yama Tsukami", nameJP: "ヤマツカミ", species: "古龍種", normalAttack: "力量", specialAttacks: "[張口]: 速度 / [憤怒]: 力量" },
      { name: "雷神龍", nameEN: "Thunder Serpent Narwa", nameJP: "ナルハタタヒメ", species: "古龍種", normalAttack: "速度", specialAttacks: "[帶電]: 技巧" },
      { name: "風神龍", nameEN: "Wind Serpent Ibushi", nameJP: "イブシマキヒコ", species: "古龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
      // { name: "麒麟", nameEN: "Kirin", nameJP: "キリン", species: "古龍種", normalAttack: "速度", specialAttacks: "[帶電]: 技巧" },
      // { name: "炎王龍", nameEN: "Teostra", nameJP: "テオ・テスカトル", species: "古龍種", normalAttack: "力量", specialAttacks: "[爆炎]: 技巧" },
      // { name: "鋼龍", nameEN: "Kushala Daora", nameJP: "クシャルダオラ", species: "古龍種", normalAttack: "技巧", specialAttacks: "[風鎧]: 速度" },
      // { name: "滅盡龍", nameEN: "Nergigante", nameJP: "ネルギガンテ", species: "古龍種", normalAttack: "力量", specialAttacks: "[再生棘]: 技巧" },
    ],
  },
  {
    category: "特殊（劇情 / Exotic / Honed）",
    monsters: [
      { name: "強化斬龍", nameEN: "Honed Glavenus", nameJP: "強化竜ディノバルド", species: "獸龍種", normalAttack: "速度", specialAttacks: "[赤熱化【尾巴】]: 力量 / [赤熱化【喉嚨】]: 技巧" },
      { name: "超龍化蒼火龍", nameEN: "Bound Azure Rathalos", nameJP: "超龍化リオレウス亜種", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度 / [超龍化【解放】]: 技巧" },
      { name: "超龍化冰狼龍", nameEN: "Bound Lunagaron", nameJP: "超龍化ルナガロン", species: "牙龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量 / [超龍化【解放】]: 技巧" },
      { name: "珍種迅猛龍王", nameEN: "Exotic Velocidrome", nameJP: "珍種ドスランポス", species: "鳥龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "珍種千刃龍", nameEN: "Exotic Seregios", nameJP: "珍種セルレギオス", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 技巧" },
      { name: "珍種風漂龍", nameEN: "Exotic Legiana", nameJP: "珍種レイギエナ", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒【滯空】]: 力量 / [滯空]: 技巧" },
      { name: "珍種潛口龍", nameEN: "Exotic Nibelsnarf", nameJP: "珍種ハプルボッカ", species: "海龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度 / [擬態]: 速度" },
      { name: "木桶艾路", nameEN: "Barrel Felyne", nameJP: "タルアイルー", species: "-", normalAttack: "-", specialAttacks: "-" },
      { name: "噗吱豬", nameEN: "Dos Poogie", nameJP: "ドスプーギー", species: "-", normalAttack: "力量", specialAttacks: "-" },
      { name: "大龍蝕蟲", nameEN: "Great Dracophage Bug", nameJP: "ドス龍蝕蟲", species: "-", normalAttack: "速度", specialAttacks: "-" },
      { name: "大雷光蟲", nameEN: "Great Thunderbug", nameJP: "ドス雷光虫", species: "-", normalAttack: "速度", specialAttacks: "-" },
    ],
  },
  {
    category: "天變古龍",
    monsters: [
      { name: "天變溟波龍", nameEN: "Tempered Namielle", nameJP: "天変ネロミェール", species: "古龍種", normalAttack: "技巧", specialAttacks: "[水纏]: 技巧 / [溟帶電]: 速度" },
      { name: "天變風神龍", nameEN: "Tempered Ibushi", nameJP: "天変イブシマキヒコ", species: "古龍種", normalAttack: "力量", specialAttacks: "[風纏]: 力量" },
      { name: "天變雷神龍", nameEN: "Tempered Narwa", nameJP: "天変ナルハタタヒメ", species: "古龍種", normalAttack: "速度", specialAttacks: "[異體同心]: 速度" },
      { name: "天變浮岳龍", nameEN: "Tempered Yama Tsukami", nameJP: "天変ヤマツカミ", species: "古龍種", normalAttack: "力量", specialAttacks: "[張口]: 速度" },
      { name: "天變冰咒龍", nameEN: "Tempered Velkhana", nameJP: "天変イヴェルカーナ", species: "古龍種", normalAttack: "技巧", specialAttacks: "[冰纏]: 速度 / [冰霧纏]: 力量" },
    ],
  },
  {
    category: "侵獸",
    monsters: [
      { name: "侵獸青熊獸", nameEN: "Invasive Arzuros", nameJP: "侵獣アオアシラ", species: "牙獸種", normalAttack: "力量", specialAttacks: "[侵化]: 技巧" },
      { name: "侵獸角龍", nameEN: "Invasive Diablos", nameJP: "侵獣ディアブロス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[侵化]: 力量" },
      { name: "侵獸白電龍", nameEN: "Invasive Khezu", nameJP: "侵獣フルフル", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[侵化]: 力量" },
      { name: "侵獸影蜘蛛", nameEN: "Invasive Nerscylla", nameJP: "侵獣ネルスキュラ", species: "鋏角種", normalAttack: "技巧", specialAttacks: "[侵化]: 速度" },
      { name: "侵獸慘爪龍", nameEN: "Invasive Odogaron", nameJP: "侵獣オドガロン", species: "牙龍種", normalAttack: "速度", specialAttacks: "[侵化]: 技巧" },
      { name: "侵獸水龍", nameEN: "Invasive Plesioth", nameJP: "侵獣ガノトトス", species: "魚龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 力量 / [侵化態]: 技巧" },
      { name: "侵獸千刃龍", nameEN: "Invasive Seregios", nameJP: "侵獣セルレギオス", species: "飛龍種", normalAttack: "速度", specialAttacks: "[侵化]: 技巧" },
      { name: "侵獸將軍蟹", nameEN: "Invasive Shogun Ceanataur", nameJP: "侵獣ショウグンギザミ", species: "甲殼種", normalAttack: "力量", specialAttacks: "[侵化]: 速度 / [無殼]: 技巧 / [殼【貝】]: 力量/ [殼【頭骨】]: 速度" },
      { name: "侵獸黑狼鳥", nameEN: "Invasive Yian Garuga", nameJP: "侵獣イャンガルルガ", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[侵化]: 力量" },
    ],
  },
  {
    category: "凶異魔物",
    monsters: [
      { name: "凶異纏蛙", nameEN: "Feral Chatacabra", nameJP: "凶異チャタカブラ", species: "兩棲種", normalAttack: "力量", specialAttacks: "[鑛物纏身]: 技巧" },
      { name: "凶異浮空龍", nameEN: "Feral Paolumu", nameJP: "凶異パオウルムー", species: "飛龍種", normalAttack: "技巧", specialAttacks: "[飛行]: 速度" },
      { name: "凶異迅猛龍王", nameEN: "Feral Velocidrome", nameJP: "凶異ドスランポス", species: "鳥龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "凶異毒怪鳥", nameEN: "Feral Gypceros", nameJP: "凶異ゲリョス", species: "鳥龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 技巧" },
      { name: "凶異怪鳥", nameEN: "Feral Yian Kut-Ku", nameJP: "凶異イャンクック", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "凶異人魚龍", nameEN: "Feral Somnacanth", nameJP: "凶異イソネミクニ", species: "海龍種", normalAttack: "技巧", specialAttacks: "[豎尾]: 速度" },
      { name: "凶異鐮鼬龍王", nameEN: "Feral Great Izuchi", nameJP: "凶異オサイズチ", species: "鳥龍種", normalAttack: "速度", specialAttacks: "[憤怒]: 力量" },
      { name: "凶異傘鳥", nameEN: "Feral Aknosom", nameJP: "凶異アケノシルム", species: "鳥龍種", normalAttack: "技巧", specialAttacks: "[憤怒]: 力量" },
      { name: "凶異影蜘蛛", nameEN: "Feral Nerscylla", nameJP: "凶異ネルスキュラ", species: "鋏角種", normalAttack: "技巧", specialAttacks: "[憤怒]: 速度" },
      { name: "凶異碎龍", nameEN: "Feral Brachydios", nameJP: "凶異ブラキディオス", species: "獸龍種", normalAttack: "力量", specialAttacks: "[黏菌活性]: 速度 / [憤怒]: 力量" },
      { name: "凶異天狗獸", nameEN: "Feral Bishaten", nameJP: "凶異ビシュテンゴ", species: "牙獸種", normalAttack: "技巧", specialAttacks: "[豎尾]: 速度 / [閃閃柿子]: 速度 / [毒毒柿子]: 力量 / [麻麻柿子]: 技巧" },
      { name: "凶異河童蛙", nameEN: "Feral Tetranadon", nameJP: "凶異ヨツミワドウ", species: "兩棲種", normalAttack: "力量", specialAttacks: "[吃撐]: 技巧" },
      { name: "凶異棘龍", nameEN: "Feral Espinas", nameJP: "凶異エスピナス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度 / [狂暴化]: 力量" },
      { name: "凶異飛雷龍", nameEN: "Feral Tobi-Kadachi", nameJP: "凶異トビカガチ", species: "牙龍種", normalAttack: "速度", specialAttacks: "[帶電]: 技巧" },
      { name: "凶異土砂龍", nameEN: "Feral Barroth", nameJP: "凶異ボルボロス", species: "獸龍種", normalAttack: "速度", specialAttacks: "[泥漿纏身]: 技巧" },
      { name: "凶異斬龍", nameEN: "Feral Glavenus", nameJP: "凶異ディノバルド", species: "獸龍種", normalAttack: "速度", specialAttacks: "[赤熱化【尾巴】]: 力量 / [憤怒]: 技巧" },
      { name: "凶異鎧龍", nameEN: "Feral Gravios", nameJP: "凶異グラビモス", species: "飛龍種", normalAttack: "力量", specialAttacks: "[蓄熱]: 技巧" },
      { name: "凶異風漂龍", nameEN: "Feral Legiana", nameJP: "凶異レイギエナ", species: "飛龍種", normalAttack: "速度", specialAttacks: "[憤怒【滯空】]: 力量 / [滯空]: 技巧" },
      { name: "凶異怨虎龍", nameEN: "Feral Magnamalo", nameJP: "凶異マガイマガド", species: "牙龍種", normalAttack: "速度", specialAttacks: "[鬼火臨界]: 技巧 / [鬼火纏身]: 力量" },
      { name: "凶異浮岳龍", nameEN: "Feral Yama Tsukami", nameJP: "凶異ヤマツカミ", species: "古龍種", normalAttack: "力量", specialAttacks: "[張口]: 速度" },
      { name: "凶異赫猿獸", nameEN: "Feral Ajarakan", nameJP: "凶異アジャラカン", species: "牙獸種", normalAttack: "技巧", specialAttacks: "[赤熱化]: 力量" },
      { name: "凶異妃蜘蛛", nameEN: "Feral Rakna-Kadaki", nameJP: "凶異ヤツカダキ", species: "鋏角種", normalAttack: "技巧", specialAttacks: "[無蛛絲]: 技巧 / [絲線纏身(腳)]: 技巧 / [絲線纏身(繭)]: 速度" },
      { name: "凶異雪獅子王", nameEN: "Feral Blangonga", nameJP: "凶異ドドブランゴ", species: "牙獸種", normalAttack: "力量", specialAttacks: "[憤怒]: 速度" },
    ],
  },
];

function toSlug(nameEN: string): string {
  return nameEN.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "");
}

export const MONSTERS: Monster[] = RAW_DATA.flatMap(({ category, monsters }) =>
  monsters.map((m) => ({
    id: toSlug(m.nameEN),
    name: m.name,
    nameEN: m.nameEN,
    nameJP: m.nameJP,
    species: m.species,
    category,
    group: categoryToGroup(category),
    normalAttack: m.normalAttack as AttackType,
    specialAttacks: parseSpecialAttacks(m.specialAttacks),
    icon: getIconPath(m.nameEN),
  }))
);

const RELATED_FAMILIES: string[][] = [
  ["Yian Kut-Ku", "Blue Yian Kut-Ku", "Feral Yian Kut-Ku"],
  ["Gypceros", "Purple Gypceros", "Feral Gypceros"],
  ["Yian Garuga", "Deadeye Yian Garuga", "Invasive Yian Garuga"],
  ["Great Izuchi", "Izuchi", "Feral Great Izuchi"],
  ["Velocidrome", "Velociprey", "Exotic Velocidrome", "Feral Velocidrome"],
  ["Chatacabra", "Feral Chatacabra"],
  ["Tetranadon", "Feral Tetranadon"],
  ["Bishaten", "Blood Orange Bishaten", "Feral Bishaten"],
  ["Blangonga", "Blango", "Feral Blangonga"],
  ["Arzuros", "Invasive Arzuros"],
  ["Ajarakan", "Feral Ajarakan"],
  ["Aknosom", "Feral Aknosom"],
  ["Zinogre", "Stygian Zinogre", "Thunderlord Zinogre"],
  ["Lunagaron", "Bound Lunagaron"],
  ["Odogaron", "Ebony Odogaron", "Invasive Odogaron"],
  ["Magnamalo", "Feral Magnamalo"],
  ["Tobi-Kadachi", "Feral Tobi-Kadachi"],
  ["Barroth", "Jade Barroth", "Feral Barroth"],
  ["Diablos", "Black Diablos", "Bloodbath Diablos", "Invasive Diablos"],
  ["Glavenus", "Hellblade Glavenus", "Honed Glavenus", "Feral Glavenus"],
  ["Anjanath", "Fulgur Anjanath"],
  ["Brachydios", "Feral Brachydios"],
  ["Plesioth", "Green Plesioth", "Invasive Plesioth"],
  ["Ludroth", "Royal Ludroth", "Purple Ludroth"],
  ["Lagiacrus", "Ivory Lagiacrus"],
  ["Mizutsune", "Soulseer Mizutsune"],
  ["Somnacanth", "Aurora Somnacanth", "Feral Somnacanth"],
  ["Nerscylla", "Shrouded Nerscylla", "Feral Nerscylla", "Invasive Nerscylla"],
  ["Rakna-Kadaki", "Feral Rakna-Kadaki"],
  ["Rathian", "Pink Rathian", "Dreadqueen Rathian"],
  ["Rathalos", "Azure Rathalos", "Dreadking Rathalos", "Bound Azure Rathalos"],
  ["Barioth", "Sand Barioth"],
  ["Nargacuga", "Silverwind Nargacuga", "Green Nargacuga"],
  ["Tigrex", "Brute Tigrex", "Grimclaw Tigrex"],
  ["Astalos", "Boltreaver Astalos"],
  ["Gravios", "Black Gravios", "Feral Gravios"],
  ["Khezu", "Red Khezu", "Invasive Khezu"],
  ["Espinas", "Feral Espinas"],
  ["Seregios", "Exotic Seregios", "Invasive Seregios"],
  ["Legiana", "Exotic Legiana", "Feral Legiana"],
  ["Nibelsnarf", "Exotic Nibelsnarf"],
  ["Paolumu", "Feral Paolumu"],
  ["Garangolm"],
  ["Velkhana", "Tempered Velkhana"],
  ["Namielle", "Tempered Namielle"],
  ["Yama Tsukami", "Tempered Yama Tsukami", "Feral Yama Tsukami"],
  ["Thunder Serpent Narwa", "Tempered Narwa"],
  ["Wind Serpent Ibushi", "Tempered Ibushi"],
  ["Shogun Ceanataur", "Ceanataur", "Invasive Shogun Ceanataur"],
];

const FAMILY_INDEX = new Map<string, string[]>();
for (const family of RELATED_FAMILIES) {
  for (const name of family) {
    FAMILY_INDEX.set(name, family);
  }
}

export function getRelatedMonsters(nameEN: string): Monster[] {
  const family = FAMILY_INDEX.get(nameEN);
  if (!family) return [];
  return family
    .filter((n) => n !== nameEN)
    .map((n) => MONSTERS.find((m) => m.nameEN === n))
    .filter((m): m is Monster => m != null);
}
