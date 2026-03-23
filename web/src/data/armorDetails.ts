import type { ArmorDetail } from "../types/monster";

export const ARMOR_DETAILS: Record<string, ArmorDetail> = {
  "ブラキ装備": {
    defensePerLevel: [90, 120, 150],
    decoration: "ボマー【小】",
    upgradeMaterials: {
      1: [{name:"砕竜素材",pts:6}],
      2: [{name:"砕竜素材",pts:10}, {name:"火竜素材",pts:6}],
      3: [{name:"砕竜素材",pts:18}, {name:"怨虎竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "砕竜素材": [{name:"砕竜の甲殻",pts:1}, {name:"砕竜の拳",pts:2}, {name:"砕竜の骨髄",pts:5}],
      "火竜素材": [{name:"火竜の鱗",pts:1}, {name:"火竜の翼膜",pts:2}, {name:"火竜の逆鱗",pts:5}],
      "怨虎竜素材": [{name:"怨虎竜の甲殻",pts:1}, {name:"怨虎竜の腕刃",pts:2}, {name:"怨虎竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"ボマー【大】",effect:"爆破やられやタル爆弾で与えるダメージが大きく上昇する。"},
      {name:"タイマン好き【中】",effect:"真っ向勝負によるダメージが上昇する。"},
      {name:"根性【小】",effect:"HPが50%以上のとき、HPが0になる攻撃を受けても一度だけ耐える。"},
    ],
  },
  "エスピナ装備": {
    defensePerLevel: [98, 132, 150],
    decoration: "付与率アップ【小】",
    upgradeMaterials: {
      1: [{name:"棘竜素材",pts:6}],
      2: [{name:"棘竜素材",pts:10}, {name:"氷牙竜素材",pts:6}],
      3: [{name:"棘竜素材",pts:18}, {name:"獄狼竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "棘竜素材": [{name:"棘竜の甲殻",pts:1}, {name:"棘竜の棘",pts:2}, {name:"棘竜の角",pts:5}],
      "氷牙竜素材": [{name:"氷牙竜の甲殻",pts:1}, {name:"氷牙竜の棘",pts:2}, {name:"琥珀色の牙",pts:5}],
      "獄狼竜素材": [{name:"獄狼竜の甲殻",pts:1}, {name:"獄狼竜の爪",pts:2}, {name:"獄狼竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"付与率アップ【大】",effect:"状態異常付与率が大きく上昇する。"},
      {name:"追い打ち強化【中】",effect:"部位を攻撃したとき、部位へのダメージがわずかに上昇する。"},
      {name:"破壊王【小】",effect:"部位を攻撃したとき、部位へのダメージがわずかに上昇する。"},
    ],
  },
  "ガノスU装備": {
    defensePerLevel: [64, 100, 132],
    decoration: "水属性攻撃力強化【小】",
    upgradeMaterials: {
      1: [{name:"翠水竜素材",pts:6}],
      2: [{name:"翠水竜素材",pts:12}, {name:"骸蜘蛛素材",pts:6}],
      3: [{name:"翠水竜素材",pts:20}, {name:"雪鬼獣素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "翠水竜素材": [{name:"翠水竜の鱗",pts:1}, {name:"翠水竜の牙",pts:2}, {name:"翠水竜のヒレ",pts:5}],
      "骸蜘蛛素材": [{name:"骸蜘蛛の甲殻",pts:1}, {name:"骸蜘蛛の鋏角",pts:2}, {name:"骸蜘蛛の爪",pts:5}],
      "雪鬼獣素材": [{name:"雪鬼獣の毛",pts:1}, {name:"雪鬼獣の拳爪",pts:2}, {name:"しゃっこい氷塊",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"水属性攻撃力強化【中】",effect:"水属性で攻撃したときのダメージが上昇する。"},
      {name:"シンクロ【中】",effect:"ダブルアクションのダメージが上昇する。"},
      {name:"スタミナ増強【小】",effect:"スタミナ初期値をわずかに上昇させる。"},
    ],
  },
  "スキュラ装備": {
    defensePerLevel: [38, 52, 64],
    decoration: "耐即死【小】",
    upgradeMaterials: {
      1: [{name:"影蜘蛛素材",pts:6}],
      2: [{name:"影蜘蛛素材",pts:15}, {name:"人魚竜素材",pts:6}],
      3: [{name:"影蜘蛛素材",pts:25}, {name:"潜口竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "影蜘蛛素材": [{name:"影蜘蛛の甲殻",pts:1}, {name:"影蜘蛛の鋏角",pts:2}, {name:"影蜘蛛の棘",pts:5}],
      "人魚竜素材": [{name:"人魚竜の甲殻",pts:1}, {name:"人魚竜の鱗",pts:2}, {name:"人魚竜の髪ヒレ",pts:5}],
      "潜口竜素材": [{name:"潜口竜の甲殻",pts:1}, {name:"潜口竜の皮",pts:2}, {name:"潜口竜の頭殻",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐睡眠【小】",effect:"睡眠を低確率で無効化する。"},
      {name:"付与率アップ【中】",effect:"状態異常付与率が上昇する。"},
      {name:"耐即死【小】",effect:"致命の一撃攻撃を低確率で無効化する。"},
    ],
  },
  "ガノス装備": {
    defensePerLevel: [52, 68, 102],
    decoration: "水属性防御力強化【小】",
    upgradeMaterials: {
      1: [{name:"水竜素材",pts:6}],
      2: [{name:"水竜素材",pts:12}, {name:"泥翁竜素材",pts:6}],
      3: [{name:"水竜素材",pts:20}, {name:"迅竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "水竜素材": [{name:"水竜の鱗",pts:1}, {name:"水竜の牙",pts:2}, {name:"水竜のヒレ",pts:5}],
      "泥翁竜素材": [{name:"泥翁竜の鱗",pts:1}, {name:"泥翁竜の髭",pts:2}, {name:"泥翁竜の逆鱗",pts:5}],
      "迅竜素材": [{name:"迅竜の鱗",pts:1}, {name:"迅竜の黒毛",pts:2}, {name:"迅竜���刃翼",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"全力【中】",effect:"スキルのスタミナ消費量が増加する代わりに、スキルで与えるダメージが上昇する。"},
      {name:"水属性防御力強化【中】",effect:"水属性の攻撃を受けたときのダメージを軽減する。"},
      {name:"巣守り【小】",effect:"討伐したモンスターの帰巣確率がわずかに上昇する。"},
    ],
  },
  "ジャナフ装備": {
    defensePerLevel: [48, 62, 82],
    decoration: "火属性防御力強化【小】",
    upgradeMaterials: {
      1: [{name:"蛮顎竜素材",pts:6}],
      2: [{name:"蛮顎竜素材",pts:12}, {name:"鎧竜素材",pts:6}],
      3: [{name:"蛮顎竜素材",pts:20}, {name:"砕竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "蛮顎竜素材": [{name:"蛮顎竜の鱗",pts:1}, {name:"蛮顎竜の鼻骨",pts:2}, {name:"蛮顎竜の牙",pts:5}],
      "鎧竜素材": [{name:"鎧竜の甲殻",pts:1}, {name:"鎧竜の頭殻",pts:2}, {name:"鎧竜の骨髄",pts:5}],
      "砕竜素材": [{name:"砕竜の甲殻",pts:1}, {name:"砕竜の拳",pts:2}, {name:"砕竜の骨髄",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"火属性防御力強化【中】",effect:"火属性の攻撃を受けたときのダメージを軽減する。"},
      {name:"タイマン好き【小】",effect:"真っ向勝負によるダメージがわずかに上昇する。"},
    ],
  },
  "リオハート装備": {
    defensePerLevel: [48, 68, 108],
    decoration: "自己回復【小】",
    upgradeMaterials: {
      1: [{name:"桜火竜素材",pts:6}],
      2: [{name:"桜火竜素材",pts:12}, {name:"赫猿獣素材",pts:10}],
      3: [{name:"桜火竜素材",pts:20}, {name:"砕竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "赫猿獣素材": [{name:"赫猿獣の鱗",pts:1}, {name:"赫炎結晶",pts:2}, {name:"赫猿獣の骨髄",pts:5}],
      "砕竜素材": [{name:"砕竜の甲殻",pts:1}, {name:"砕竜の拳",pts:2}, {name:"砕竜の骨髄",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"自己回復【中】",effect:"ターン終了時にHPが少量回復する。"},
      {name:"会心撃・回復【中】",effect:"クリティカル発生時、自身のHPが少量回復する。"},
    ],
  },
  "エーデル装備": {
    defensePerLevel: [42, 60, 82],
    decoration: "アイテム節約【小】",
    upgradeMaterials: {
      1: [{name:"エーデル装備",pts:1}, {name:"下級虫",pts:8}],
      2: [{name:"水獣素材",pts:8}, {name:"垂皮竜の皮",pts:8}],
      3: [{name:"水獣素材",pts:16}, {name:"翼蛇竜の皮",pts:10}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "エーデル装備": [{name:"エーデル装備の書",pts:1}],
      "下級虫": [{name:"虫の死骸",pts:1}, {name:"セッチャクロアリ",pts:5}],
      "水獣素材": [{name:"水獣の鱗",pts:1}, {name:"水獣の尻尾",pts:2}, {name:"水獣のトサカ",pts:5}],
      "垂皮竜の皮": [{name:"垂皮竜の皮",pts:1}],
      "翼蛇竜の皮": [{name:"翼蛇竜の皮",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐毒【中】",effect:"毒、猛毒、劇毒を確率で無効化する。"},
      {name:"アイテム節約【中】",effect:"アイテム使用時、低確率でアイテムを消費しない。"},
    ],
  },
  "テンタクル装備": {
    defensePerLevel: [52, 162, 174],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"溟龍素材",pts:3}],
      2: [{name:"溟龍素材",pts:5}, {name:"黒轟竜素材",pts:6}],
      3: [{name:"溟龍素材",pts:10}, {name:"侵獣素材",pts:6}, {name:"古龍の血",pts:3}],
    },
    materialDetails: {
      "溟龍素材": [{name:"溟龍の皮",pts:1}, {name:"溟龍の翼膜",pts:2}, {name:"溟龍の尾",pts:5}],
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "古龍の血": [{name:"古龍の血",pts:1}],
    },
    skills: [
      {name:"全力【特】",effect:"スキルのスタミナ消費量が増加する代わりに、スキルで与えるダメージがかなり上昇する。"},
      {name:"スタミナ増強【大】",effect:"スタミナ初期値を大きく上昇させる。"},
      {name:"スタミナ急速回復【大】",effect:"スタミナ回復量を大きく上昇させる。"},
    ],
  },
  "カガチ装備": {
    defensePerLevel: [38, 52, 64],
    decoration: "雷属性攻撃力強化【小】",
    upgradeMaterials: {
      1: [{name:"飛雷竜素材",pts:6}],
      2: [{name:"飛雷竜素材",pts:15}, {name:"天狗獣素材",pts:6}],
      3: [{name:"飛雷竜素材",pts:25}, {name:"赫猿獣素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "飛雷竜素材": [{name:"飛雷竜の毛皮",pts:1}, {name:"飛雷竜の爪",pts:2}, {name:"飛雷竜の電極針",pts:5}],
      "天狗獣素材": [{name:"天狗獣の腕羽",pts:1}, {name:"天狗獣の尾甲",pts:2}, {name:"天狗獣の頭襟",pts:5}],
      "赫猿獣素材": [{name:"赫猿獣の鱗",pts:1}, {name:"赫炎結晶",pts:2}, {name:"赫猿獣の骨髄",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"雷属性攻撃力強化【中】",effect:"雷属性で攻撃したときのダメージが上昇する。"},
      {name:"回避性能【小】",effect:"回避率がわずかに上昇する。"},
    ],
  },
  "レンジャー装備": {
    defensePerLevel: [18, 36, 52],
    decoration: "巣守り【小】",
    upgradeMaterials: {
    },
    materialDetails: {
      "ルドロスの皮": [{name:"ルドロスの皮",pts:1}],
      "結晶": [{name:"大地の結晶",pts:1}, {name:"天空の結晶",pts:5}],
      "イズチの毛": [{name:"イズチの毛",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"巣守り【小】",effect:"討伐したモンスターの帰巣確率がわずかに上昇する。"},
    ],
  },
  "クックU装備": {
    defensePerLevel: [36, 54, 68],
    decoration: "火属性攻撃力強化【小】",
    upgradeMaterials: {
      1: [{name:"青怪鳥素材",pts:6}],
      2: [{name:"青怪鳥素材",pts:15}, {name:"傘鳥素材",pts:6}],
      3: [{name:"青怪鳥素材",pts:25}, {name:"黒狼鳥素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "青怪鳥素材": [{name:"青怪鳥の鱗",pts:1}, {name:"青怪鳥の甲殻",pts:2}, {name:"青怪鳥の耳",pts:5}],
      "傘鳥素材": [{name:"傘鳥の鱗",pts:1}, {name:"傘鳥の羽鱗",pts:2}, {name:"傘鳥のトサカ",pts:5}],
      "黒狼鳥素材": [{name:"黒狼鳥の鱗",pts:1}, {name:"黒狼鳥の耳",pts:2}, {name:"尖ったクチバシ",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"火属性攻撃力強化【小】",effect:"火属性で攻撃したときのダメージがわずかに上昇する。"},
      {name:"会心【小】",effect:"会心率がわずかに上昇する。"},
    ],
  },
  "ゲリョスU装備": {
    defensePerLevel: [36, 54, 68],
    decoration: "不屈【小】",
    upgradeMaterials: {
      1: [{name:"紫毒鳥素材",pts:6}],
      2: [{name:"紫毒鳥素材",pts:15}, {name:"奇怪竜素材",pts:6}],
      3: [{name:"紫毒鳥素材",pts:25}, {name:"赤怪竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "紫毒鳥素材": [{name:"ゴム質の紫皮",pts:1}, {name:"紫毒鳥の翼膜",pts:2}, {name:"ゴム質の紫尾",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"危機感【小】",effect:"HPが50%以上のとき、会心率がわずかに上昇する。"},
      {name:"不屈【小】",effect:"ライフポイントが残り1のとき、攻撃力と防御力がわずかに上昇する。"},
    ],
  },
  "レイア装備": {
    defensePerLevel: [34, 44, 62],
    decoration: "巣守り【小】",
    upgradeMaterials: {
      1: [{name:"雌火竜素材",pts:6}],
      2: [{name:"雌火竜素材",pts:12}, {name:"毒妖鳥素材",pts:6}],
      3: [{name:"雌火竜素材",pts:20}, {name:"泡狐竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "雌火竜素材": [{name:"雌火竜の甲殻",pts:1}, {name:"雌火竜の棘",pts:2}, {name:"雌火竜の逆鱗",pts:5}],
      "毒妖鳥素材": [{name:"毒妖鳥の鱗",pts:1}, {name:"毒妖鳥の喉袋",pts:2}, {name:"毒妖鳥の尻尾",pts:5}],
      "泡狐竜素材": [{name:"泡狐竜の紫毛",pts:1}, {name:"泡狐竜の錦ヒレ",pts:2}, {name:"泡狐竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉��中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"巣守り【中】",effect:"討伐したモンスターの帰巣確率が上昇する。"},
      {name:"体力増強【小】",effect:"最大HPがわずにかに上昇する。"},
    ],
  },
  "ルドロス装備": {
    defensePerLevel: [26, 44, 62],
    decoration: "水属性防御力強化【小】",
    upgradeMaterials: {
      1: [{name:"水獣素材",pts:6}],
      2: [{name:"水獣素材",pts:15}, {name:"河童蛙素材",pts:6}],
      3: [{name:"水獣素材",pts:25}, {name:"氷人魚竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "水獣素材": [{name:"水獣の鱗",pts:1}, {name:"水獣の尻尾",pts:2}, {name:"水獣のトサカ",pts:5}],
      "河童蛙素材": [{name:"河童蛙の苔背甲",pts:1}, {name:"河童蛙の嘴",pts:2}, {name:"河童蛙の皿",pts:5}],
      "氷人魚竜素材": [{name:"氷人魚竜の甲殻",pts:1}, {name:"氷人魚竜の鱗",pts:2}, {name:"氷人魚竜の爪",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"水属性防御力強化【小】",effect:"水属性の攻撃を受けたときのダメージをわずかに軽減する。"},
      {name:"耐スキル封じ【小】",effect:"スキル封じを低確率で無効化する。"},
    ],
  },
  "ウルムー装備": {
    defensePerLevel: [26, 44, 62],
    decoration: "精霊の加護【小】",
    upgradeMaterials: {
      1: [{name:"浮空竜素材",pts:6}],
      2: [{name:"浮空竜素材",pts:5}, {name:"鎌鼬竜素材",pts:6}],
      3: [{name:"浮空竜素材",pts:25}, {name:"傘鳥素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "浮空竜素材": [{name:"浮空竜の毛皮",pts:1}, {name:"浮空竜の翼膜",pts:2}, {name:"ゴム質の甲殻",pts:5}],
      "鎌鼬竜素材": [{name:"鎌鼬竜の毛",pts:1}, {name:"鎌鼬竜の皮",pts:2}, {name:"鎌鼬竜の刃尾",pts:5}],
      "傘鳥素材": [{name:"傘鳥の鱗",pts:1}, {name:"傘鳥の羽鱗",pts:2}, {name:"傘鳥のトサカ",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"精霊の加護【小】",effect:"受けるダメージが極わずかな確率で半減する。"},
      {name:"スタミナ急速回復【小】",effect:"スタミナ回復量をわずかに上昇させる。"},
    ],
  },
  "クック装備": {
    defensePerLevel: [26, 44, 62],
    decoration: "耐やけど【小】",
    upgradeMaterials: {
      1: [{name:"怪鳥素材",pts:6}],
      2: [{name:"怪鳥素材",pts:15}, {name:"青熊獣素材",pts:6}],
      3: [{name:"怪鳥素材",pts:25}, {name:"傘鳥素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "怪鳥素材": [{name:"怪鳥の鱗",pts:1}, {name:"怪鳥の翼膜",pts:2}, {name:"巨大なクチバシ",pts:5}],
      "青熊獣素材": [{name:"青熊獣の毛",pts:1}, {name:"青熊獣の甲殻",pts:2}, {name:"青熊獣の腕甲",pts:5}],
      "傘鳥素材": [{name:"傘鳥の鱗",pts:1}, {name:"傘鳥の羽鱗",pts:2}, {name:"傘鳥のトサカ",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中��",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"火属性防御力強化【小】",effect:"火属性の攻撃を受けたときのダメージをわずかに軽減する。"},
      {name:"耐やけど【小】",effect:"やけどを低確率で無効化する。"},
    ],
  },
  "ゲリョス装備": {
    defensePerLevel: [26, 44, 62],
    decoration: "耐毒【小】",
    upgradeMaterials: {
      1: [{name:"毒怪鳥素材",pts:6}],
      2: [{name:"毒怪鳥素材",pts:15}, {name:"クリスタル",pts:10}],
      3: [{name:"毒怪鳥素材",pts:25}, {name:"白海竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "毒怪鳥素材": [{name:"ゴム質の皮",pts:1}, {name:"毒怪鳥の翼膜",pts:2}, {name:"毒怪鳥の頭",pts:5}],
      "クリスタル": [{name:"ライトクリスタル",pts:1}, {name:"ノヴァクリスタル",pts:5}],
      "白海竜素材": [{name:"白海竜の鱗",pts:1}, {name:"白海竜の角",pts:2}, {name:"白海竜の背電殻",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐毒【小】",effect:"毒、猛毒、劇毒を低確率で無効化する。"},
      {name:"耐くらやみ【小】",effect:"くらやみを低確率で無効化する。"},
      {name:"雷属性防御力強化【小】",effect:"雷属性の攻撃を受けたときのダメージをわずかに軽減する。"},
    ],
  },
  "チャタ装備": {
    defensePerLevel: [26, 44, 62],
    decoration: "体力増強【小】",
    upgradeMaterials: {
      1: [{name:"纏蛙素材",pts:6}],
      2: [{name:"纏蛙素材",pts:15}, {name:"毒妖鳥素材",pts:6}],
      3: [{name:"纏蛙素材",pts:25}, {name:"水竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "纏蛙素材": [{name:"纏蛙の鱗",pts:1}, {name:"纏蛙の皮",pts:2}, {name:"纏蛙の纏甲",pts:5}],
      "毒妖鳥素材": [{name:"毒妖鳥の鱗",pts:1}, {name:"毒妖鳥の喉袋",pts:2}, {name:"毒妖鳥の尻尾",pts:5}],
      "水竜素材": [{name:"水竜の鱗",pts:1}, {name:"水竜の牙",pts:2}, {name:"水竜のヒレ",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"体力増強【小】",effect:"最大HPがわずにかに上昇する。"},
      {name:"アイテム節約【小】",effect:"アイテム使用時、わずかな確率でアイテムを消費しない。"},
      {name:"存在感【小】",effect:"相手の攻撃をわずかに自身に集中させやすくなる。"},
    ],
  },
  "ブナハ装備": {
    defensePerLevel: [22, 44, 62],
    decoration: "付与率アップ【小】",
    upgradeMaterials: {
      1: [{name:"飛甲虫の甲羅",pts:3}, {name:"下級虫",pts:8}],
      2: [{name:"飛甲虫の甲羅",pts:8}, {name:"クリスタル",pts:10}],
      3: [{name:"飛甲虫の甲羅",pts:16}, {name:"白海竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "下級虫": [{name:"虫の死骸",pts:1}, {name:"セッチャクロアリ",pts:5}],
      "クリスタル": [{name:"ライトクリスタル",pts:1}, {name:"ノヴァクリスタル",pts:5}],
      "白海竜素材": [{name:"白海竜の鱗",pts:1}, {name:"白海竜の角",pts:2}, {name:"白海竜の背電殻",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"付与率アップ【小】",effect:"状態異常付与率がわずかに上昇する。"},
      {name:"龍属性防御力強化【小】",effect:"龍属性の攻撃を受けたときのダメージをわずかに軽減する。"},
    ],
  },
  "ボーン装備": {
    defensePerLevel: [20, 38, 54],
    decoration: "無属性攻撃力強化【小】",
    upgradeMaterials: {
      1: [{name:"ボーン装備",pts:1}, {name:"獣骨",pts:8}],
      2: [{name:"獣骨",pts:8}, {name:"ルドロスの皮",pts:8}],
      3: [{name:"獣骨",pts:16}, {name:"ブランゴの毛",pts:10}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "ボーン装備": [{name:"ボーン装備の書",pts:1}],
      "獣骨": [{name:"獣骨【小】",pts:1}, {name:"獣骨【中】",pts:2}, {name:"獣骨【大】",pts:5}],
      "ルドロスの皮": [{name:"ルドロスの皮",pts:1}],
      "ブランゴの毛": [{name:"ブランゴの毛",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"無属性攻撃力強化【小】",effect:"無属性で攻撃したときのダメージが上昇する。"},
    ],
  },
  "ハンター装備": {
    defensePerLevel: [20, 38, 54],
    decoration: "無属性防御力強化【小】",
    upgradeMaterials: {
      1: [{name:"ハンター装備",pts:1}, {name:"結晶",pts:8}],
      2: [{name:"下級鉱石",pts:8}, {name:"飛甲虫の甲殻",pts:8}],
      3: [{name:"下級鉱石",pts:16}, {name:"丸鳥の羽",pts:10}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "ハンター装備": [{name:"ハンター装備の書",pts:1}],
      "結晶": [{name:"大地の結晶",pts:1}, {name:"天空の結晶",pts:5}],
      "下級鉱石": [{name:"鉄鉱石",pts:1}, {name:"シーブライト鉱石",pts:2}, {name:"マカライト鉱石",pts:5}],
      "飛甲虫の甲殻": [{name:"飛甲虫の甲殻",pts:1}],
      "丸鳥の羽": [{name:"丸鳥の羽",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"無属性防御力強化【小】",effect:"無属性の攻撃を受けたときのダメージをわずかに軽減する。"},
    ],
  },
  "レザー装備": {
    defensePerLevel: [20, 38, 54],
    decoration: "シンクロ【小】",
    upgradeMaterials: {
      1: [{name:"レザー装備",pts:1}, {name:"下級鉱石",pts:8}],
      2: [{name:"ランポスの鱗",pts:8}, {name:"下級虫",pts:10}],
      3: [{name:"ランポスの鱗",pts:16}, {name:"垂皮竜の皮",pts:10}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "レザー装備": [{name:"レザー装備の書",pts:1}],
      "下級鉱石": [{name:"鉄鉱石",pts:1}, {name:"シーブライト鉱石",pts:2}, {name:"マカライト鉱石",pts:5}],
      "ランポスの鱗": [{name:"ランポスの鱗",pts:1}],
      "下級虫": [{name:"虫の死骸",pts:1}, {name:"セッチャクロアリ",pts:5}],
      "垂皮竜の皮": [{name:"垂皮竜の皮",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"シンクロ【小】",effect:"ダブルアクションのダメージがわずかに上昇する。"},
    ],
  },
  "ダマスク装備": {
    defensePerLevel: [134, 144, 164],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"ダマスク装備の書",pts:1}, {name:"クリスタル",pts:8}],
      2: [{name:"浮岳龍素材",pts:8}, {name:"黒轟竜素材",pts:8}],
      3: [{name:"浮岳龍素材",pts:16}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "クリスタル": [{name:"ライトクリスタル",pts:1}, {name:"ノヴァクリスタル",pts:5}],
      "浮岳龍素材": [{name:"龍苔",pts:1}, {name:"龍木",pts:2}, {name:"浮岳龍の皮",pts:5}],
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"全属性防御力強化【大】",effect:"攻撃を受けたときのダメージを大きく軽減する。"},
      {name:"耐状態異常【中】",effect:"すべての状態異常をわずかな確率で無効化する。"},
      {name:"根性【小】",effect:"HPが50%以上のとき、HPが0になる攻撃を受けても一度だけ耐える。"},
    ],
  },
  "ハイメタ装備": {
    defensePerLevel: [106, 130, 138],
    decoration: "体力増強【小】",
    upgradeMaterials: {
      1: [{name:"ハイメタ装備の書",pts:1}, {name:"結晶",pts:8}],
      2: [{name:"轟竜素材",pts:8}, {name:"クリスタル",pts:10}],
      3: [{name:"轟竜素材",pts:16}, {name:"上級鉱石",pts:15}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "結晶": [{name:"大地の結晶",pts:1}, {name:"天空の結晶",pts:5}],
      "轟竜素材": [{name:"轟竜の鱗",pts:1}, {name:"轟竜の爪",pts:2}, {name:"轟竜の頭殻",pts:5}],
      "クリスタル": [{name:"ライトクリスタル",pts:1}, {name:"ノヴァクリスタル",pts:5}],
      "上級鉱石": [{name:"ドラグライト鉱石",pts:1}, {name:"デプスライト鉱石",pts:2}, {name:"ユニオン鉱石",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"体力増強【大】",effect:"最大HPが大きく上昇する。"},
      {name:"耐即死【中】",effect:"致命の一撃攻撃を確率で無効化する。"},
    ],
  },
  "アーティア装備": {
    defensePerLevel: [104, 128, 136],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"アーティア装備の書",pts:1}, {name:"海竜素材",pts:8}],
      2: [{name:"氷狼竜素材",pts:8}, {name:"下級鉱石",pts:10}],
      3: [{name:"氷狼竜素材",pts:16}, {name:"上級鉱石",pts:15}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "海竜素材": [{name:"海竜の鱗",pts:1}, {name:"海竜の角",pts:2}, {name:"海竜の背電殻",pts:5}],
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "下級鉱石": [{name:"鉄鉱石",pts:1}, {name:"シーブライト鉱石",pts:2}, {name:"マカライト鉱石",pts:5}],
      "上級鉱石": [{name:"ドラグライト鉱石",pts:1}, {name:"デプスライト鉱石",pts:2}, {name:"ユニオン鉱石",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"魂の絆【大】",effect:"絆ゲージの上昇量が大きく上昇する。"},
      {name:"ダンサー【中】",effect:"HPが最大のとき、素早く動けるようになり、攻撃力と防御力が上昇する。"},
    ],
  },
  "ガーディアン装備": {
    defensePerLevel: [68, 98, 116],
    decoration: "精霊の加護【小】",
    upgradeMaterials: {
      1: [{name:"ガーディアン装備の書",pts:1}, {name:"クリスタル",pts:8}],
      2: [{name:"惨爪竜素材",pts:8}, {name:"上級鉱石",pts:10}],
      3: [{name:"轟竜素材",pts:16}, {name:"上級鉱石",pts:15}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "クリスタル": [{name:"ライトクリスタル",pts:1}, {name:"ノヴァクリスタル",pts:5}],
      "惨爪竜素材": [{name:"惨爪竜の鱗",pts:1}, {name:"惨爪竜の爪",pts:2}, {name:"惨爪竜の逆鱗",pts:5}],
      "上級鉱石": [{name:"ドラグライト鉱石",pts:1}, {name:"デプスライト鉱石",pts:2}, {name:"ユニオン鉱石",pts:5}],
      "轟竜素材": [{name:"轟竜の鱗",pts:1}, {name:"轟竜の爪",pts:2}, {name:"轟竜の頭殻",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"体力増強【中】",effect:"最大HPが上昇する。"},
      {name:"精霊の加護【中】",effect:"受けるダメージがわずかな確率で半減する。"},
    ],
  },
  "ロワーガ装備": {
    defensePerLevel: [78, 104, 128],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"ロワーガ装備の書",pts:1}, {name:"臣蜘蛛の糸",pts:8}],
      2: [{name:"龍光エキス",pts:8}, {name:"上級虫",pts:10}],
      3: [{name:"龍光エキス",pts:16}, {name:"電竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "臣蜘蛛の糸": [{name:"臣蜘蛛の糸",pts:1}],
      "龍光エキス": [{name:"龍光エキス",pts:1}],
      "上級虫": [{name:"キラビートル",pts:1}, {name:"ドスヘラクレス",pts:5}],
      "電竜素材": [{name:"電竜の鱗",pts:1}, {name:"電竜の冠甲",pts:2}, {name:"電竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"会心【中】",effect:"会心率が上昇する。"},
      {name:"会心撃・絆【中】",effect:"クリティカル発生時、絆ゲージが上昇する。"},
      {name:"龍属性防御力強化【小】",effect:"龍属性の攻撃を受けたときのダメージをわずかに軽減する。"},
    ],
  },
  "アスール装備": {
    defensePerLevel: [68, 98, 116],
    decoration: "耐状態異常【小】",
    upgradeMaterials: {
      1: [{name:"アスール装備の書",pts:1}, {name:"上級虫",pts:8}],
      2: [{name:"棘竜素材",pts:8}, {name:"ガレオスの小鱗",pts:8}],
      3: [{name:"棘竜素材",pts:16}, {name:"龍光エキス",pts:10}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "上級虫": [{name:"キラビートル",pts:1}, {name:"ドスヘラクレス",pts:5}],
      "棘竜素材": [{name:"棘竜の甲殻",pts:1}, {name:"棘竜の棘",pts:2}, {name:"棘竜の角",pts:5}],
      "ガレオスの小鱗": [{name:"ガレオスの小鱗",pts:1}],
      "龍光エキス": [{name:"龍光エキス",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"全属性防御力強化【中】",effect:"攻撃をうけたときのダメージを軽減する。"},
      {name:"耐状態異常【中】",effect:"すべての状態異常をわずかな確率で無効化する。"},
      {name:"底力【中】",effect:"HPが50%以下のとき、受けるダメージを軽減する。"},
    ],
  },
  "ユクモ装備": {
    defensePerLevel: [52, 66, 98],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"ユクモ装備の書",pts:1}, {name:"丸鳥の羽",pts:8}],
      2: [{name:"赫猿獣素材",pts:8}, {name:"獣骨",pts:10}],
      3: [{name:"緋天狗獣素材",pts:16}, {name:"獣骨",pts:15}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "丸鳥の羽": [{name:"丸鳥の羽",pts:1}],
      "赫猿獣素材": [{name:"赫猿獣の鱗",pts:1}, {name:"赫炎結晶",pts:2}, {name:"赫猿獣の骨髄",pts:5}],
      "獣骨": [{name:"獣骨【小】",pts:1}, {name:"獣骨【中】",pts:2}, {name:"獣骨【大】",pts:5}],
      "緋天狗獣素材": [{name:"緋天狗獣の腕羽",pts:1}, {name:"緋天狗獣の尾甲",pts:2}, {name:"緋天狗獣の頭襟",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"会心【中】",effect:"会心率が上昇する。"},
      {name:"回避性能【中】",effect:"回避率が上昇する。"},
    ],
  },
  "アロイ装備": {
    defensePerLevel: [42, 50, 68],
    decoration: "水属性攻撃力強化【小】",
    upgradeMaterials: {
      1: [{name:"アロイ装備の書",pts:1}, {name:"下級鉱石",pts:8}],
      2: [{name:"下級鉱石",pts:8}, {name:"クリスタル",pts:10}],
      3: [{name:"上級鉱石",pts:16}, {name:"結晶",pts:15}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "下級鉱石": [{name:"鉄鉱石",pts:1}, {name:"シーブライト鉱石",pts:2}, {name:"マカライト鉱石",pts:5}],
      "クリスタル": [{name:"ライトクリスタル",pts:1}, {name:"ノヴァクリスタル",pts:5}],
      "上級鉱石": [{name:"ドラグライト鉱石",pts:1}, {name:"デプスライト鉱石",pts:2}, {name:"ユニオン鉱石",pts:5}],
      "結晶": [{name:"大地の結晶",pts:1}, {name:"天空の結晶",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"会心【小】",effect:"会心率がわずかに上昇する。"},
      {name:"水属性攻撃力強化【小】",effect:"水属性で攻撃したときのダメージがわずかに上昇する"},
    ],
  },
  "ラヴィーナ装備": {
    defensePerLevel: [140, 162, 174],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"冰龍素材",pts:3}],
      2: [{name:"冰龍素材",pts:5}, {name:"恐暴竜素材",pts:6}],
      3: [{name:"冰龍素材",pts:10}, {name:"侵獣素材",pts:6}, {name:"古龍の血",pts:3}],
    },
    materialDetails: {
      "冰龍素材": [{name:"冰龍の甲殻",pts:1}, {name:"冰龍の翼",pts:2}, {name:"冰龍の爪",pts:5}],
      "恐暴竜素材": [{name:"恐暴竜の鱗",pts:1}, {name:"恐暴竜の牙",pts:2}, {name:"恐暴竜の鉤爪",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "古龍の血": [{name:"古龍の血",pts:1}],
    },
    skills: [
      {name:"絆技強化【特】",effect:"絆技のダメージがかなり上昇する。"},
      {name:"耐状態異常【大】",effect:"すべての状態異常を低確率で無効化する。"},
      {name:"精霊の加護【大】",effect:"受けるダメージが低確率で半減する。"},
    ],
  },
  "ベリオU装備": {
    defensePerLevel: [140, 152, 164],
    decoration: "耐くらやみ【小】",
    upgradeMaterials: {
      1: [{name:"風牙竜素材",pts:6}],
      2: [{name:"風牙竜素材",pts:12}, {name:"黒角竜素材",pts:6}],
      3: [{name:"風牙竜素材",pts:20}, {name:"侵獣素材",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "風牙竜素材": [{name:"風牙竜の甲殻",pts:1}, {name:"風牙竜の毛皮",pts:2}, {name:"群青色の牙",pts:5}],
      "黒角竜素材": [{name:"黒角竜の甲殻",pts:1}, {name:"黒角竜の尻尾",pts:2}, {name:"黒巻き角",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐くらやみ【大】",effect:"くらやみを高確率で無効化する。"},
      {name:"回避本能【大】",effect:"HPが50%以下のとき、回避率が大きく上昇する。"},
      {name:"回避性能【大】",effect:"回避率が大きく上昇する。"},
    ],
  },
  "禍鎧装備": {
    defensePerLevel: [138, 150, 162],
    decoration: "真っ向勝負師【小】",
    upgradeMaterials: {
      1: [{name:"怨虎竜素材",pts:6}],
      2: [{name:"怨虎竜素材",pts:10}, {name:"黒鎧竜素材",pts:6}],
      3: [{name:"怨虎竜素材",pts:18}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "怨虎竜素材": [{name:"怨虎竜の甲殻",pts:1}, {name:"怨虎竜の腕刃",pts:2}, {name:"怨虎竜の逆鱗",pts:5}],
      "黒鎧竜素材": [{name:"黒鎧竜の甲殻",pts:1}, {name:"黒鎧竜の頭殻",pts:2}, {name:"黒鎧竜の骨髄",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中���",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"真っ向勝負師【特】",effect:"真っ向勝負で勝利したときの絆ゲージ上昇量がかなり上昇する。"},
      {name:"耐爆破やられ【大】",effect:"爆破やられを高確率で無効化する。"},
      {name:"不屈【中】",effect:"ライフポイントが残り1のとき、攻撃力と防御力が上昇する。"},
    ],
  },
  "リオソウル装備": {
    defensePerLevel: [138, 156, 168],
    decoration: "会心撃・絆【小】",
    upgradeMaterials: {
      1: [{name:"蒼火竜素材",pts:6}],
      2: [{name:"蒼火竜素材",pts:10}, {name:"爵銀龍素材",pts:6}],
      3: [{name:"蒼火竜素材",pts:18}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "蒼火竜素材": [{name:"蒼火竜の鱗",pts:1}, {name:"蒼火竜の翼膜",pts:2}, {name:"蒼火竜の逆鱗",pts:5}],
      "爵銀龍素材": [{name:"爵銀龍の甲殻",pts:1}, {name:"爵銀龍の翼膜",pts:2}, {name:"爵銀龍の牙",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"会心【特】",effect:"会心率がかなり上昇する。"},
      {name:"会心撃・絆【大】",effect:"クリティカル発生時、絆ゲージが大きく上昇する。"},
      {name:"全力【大】",effect:"スキルのスタミナ消費量が増加する代わりに、スキルで与えるダメージが大きく上昇する。"},
    ],
  },
  "シュバルカ装備": {
    defensePerLevel: [136, 160, 170],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"鎖刃竜素材",pts:6}],
      2: [{name:"鎖刃竜素材",pts:10}, {name:"侵獣素材",pts:3}],
      3: [{name:"鎖刃竜素材",pts:18}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "鎖刃竜素材": [{name:"鎖刃竜の鱗",pts:1}, {name:"鎖刃竜の鎧殻",pts:2}, {name:"鎖刃竜の角",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"���玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"シンクロ【特】",effect:"ダブルアクションのダメージがかなり上昇する。"},
      {name:"スタミナ急速回復【大】",effect:"スタミナ回復量を大きく上昇させる。"},
      {name:"根性【中】",effect:"HPが50%以上のとき、HPが0になる攻撃を受けても、HPがわずかに残った状態で一度だけ耐える。"},
    ],
  },
  "メルゼ装備": {
    defensePerLevel: [136, 158, 170],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"爵銀龍素材",pts:6}],
      2: [{name:"爵銀龍素材",pts:10}, {name:"侵獣素材",pts:3}],
      3: [{name:"爵銀龍素材",pts:18}, {name:"古龍の血",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "爵銀龍素材": [{name:"爵銀龍の甲殻",pts:1}, {name:"爵銀龍の翼膜",pts:2}, {name:"爵銀龍の牙",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "古龍の血": [{name:"古龍の血",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"自己回復【特】",effect:"ターン終了時にHPが回復する。"},
      {name:"弱点特攻【大】",effect:"有効な武器で部位を攻撃したとき、会心率が大きく上昇する。"},
      {name:"会心撃・回復【中】",effect:"クリティカル発生時、自身のHPが少量回復する。"},
    ],
  },
  "ジンオウU装備": {
    defensePerLevel: [134, 150, 168],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"獄狼竜素材",pts:6}],
      2: [{name:"獄狼竜素材",pts:10}, {name:"黒轟竜素材",pts:6}],
      3: [{name:"獄狼竜素材",pts:18}, {name:"侵獣素材",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "獄狼竜素材": [{name:"獄狼竜の甲殻",pts:1}, {name:"獄狼竜の爪",pts:2}, {name:"獄狼竜の逆鱗",pts:5}],
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"龍属性攻撃力強化【特】",effect:"龍属性で攻撃したときのダメージがかなり上昇する。"},
      {name:"ダンサー【大】",effect:"HPが最大のとき、素早く動けるようになり、攻撃力と防御力が大きく上昇する。"},
      {name:"相棒【中】",effect:"HPが50%以下のとき、絆ゲージの上昇量が上昇する。"},
    ],
  },
  "レウス装備": {
    defensePerLevel: [132, 140, 150],
    decoration: "破壊王【小】",
    upgradeMaterials: {
      1: [{name:"火竜素材",pts:6}],
      2: [{name:"火竜素材",pts:12}, {name:"鎖刃竜素材",pts:6}],
      3: [{name:"火竜素材",pts:20}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "火竜素材": [{name:"火竜の鱗",pts:1}, {name:"火竜の翼膜",pts:2}, {name:"火竜の逆鱗",pts:5}],
      "鎖刃竜素材": [{name:"鎖刃竜の鱗",pts:1}, {name:"鎖刃竜の鎧殻",pts:2}, {name:"鎖刃竜の角",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"破壊王【大】",effect:"部位を攻撃したとき、部位へのダメージが大きく上昇する。"},
      {name:"火属性攻撃力強化【大】",effect:"火属性で攻撃したときのダメージが大きく上昇する。"},
      {name:"魂の絆【中】",effect:"絆ゲージの上昇量が上昇する。"},
    ],
  },
  "ベリオ装備": {
    defensePerLevel: [128, 138, 160],
    decoration: "耐スキル封じ【小】",
    upgradeMaterials: {
      1: [{name:"氷牙竜素材",pts:6}],
      2: [{name:"氷牙竜素材",pts:12}, {name:"氷狼竜素材",pts:6}],
      3: [{name:"氷牙竜素材",pts:20}, {name:"風牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "氷牙竜素材": [{name:"氷牙竜の甲殻",pts:1}, {name:"氷牙竜の棘",pts:2}, {name:"琥珀色の牙",pts:5}],
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "風牙竜素材": [{name:"風牙竜の甲殻",pts:1}, {name:"風牙竜の毛皮",pts:2}, {name:"群青色の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐スキル封じ【大】",effect:"スキル封じを高確率で無効化する。"},
      {name:"会心【大】",effect:"会心率が大きく上昇する。"},
      {name:"破壊王【中】",effect:"部位を攻撃したとき、部位へのダメージが上昇する。"},
    ],
  },
  "レックスU装備": {
    defensePerLevel: [132, 148, 168],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"黒轟竜素材",pts:6}],
      2: [{name:"黒轟竜素材",pts:10}, {name:"雷顎竜素材",pts:6}],
      3: [{name:"黒轟竜素材",pts:18}, {name:"風牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "風牙竜素材": [{name:"風牙竜の甲殻",pts:1}, {name:"風牙竜の毛皮",pts:2}, {name:"群青色の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"無属性攻撃力強化【大】",effect:"無属性で攻撃したときのダメージが大きく上昇する。"},
      {name:"絆技強化【大】",effect:"絆技のダメージが大きく上昇する。"},
      {name:"不屈【大】",effect:"ライフポイントが残り1のとき、攻撃力と防御力が大きく上昇する。"},
    ],
  },
  "ナルガU装備": {
    defensePerLevel: [128, 142, 154],
    decoration: "回避本能【小】",
    upgradeMaterials: {
      1: [{name:"緑迅竜素材",pts:6}],
      2: [{name:"緑迅竜素材",pts:12}, {name:"兇爪竜素材",pts:6}],
      3: [{name:"緑迅竜素材",pts:20}, {name:"風牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "緑迅竜素材": [{name:"緑迅竜の鱗",pts:1}, {name:"緑迅竜の斑毛",pts:2}, {name:"緑迅竜の刃翼",pts:5}],
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "風牙竜素材": [{name:"風牙竜の甲殻",pts:1}, {name:"風牙竜の毛皮",pts:2}, {name:"群青色の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"回避本能【大】",effect:"HPが50%以下のとき、回避率が大きく上昇する。"},
      {name:"加速【大】",effect:"素早さが上昇し、確率で行動順が早くなる。"},
      {name:"スタミナ急速回復【中】",effect:"スタミナ回復量を上昇させる。"},
    ],
  },
  "バンギス装備": {
    defensePerLevel: [126, 140, 160],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"恐暴竜素材",pts:6}],
      2: [{name:"恐暴竜素材",pts:10}, {name:"侵獣素材",pts:3}],
      3: [{name:"恐暴竜素材",pts:18}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "恐暴竜素材": [{name:"恐暴竜の鱗",pts:1}, {name:"恐暴竜の牙",pts:2}, {name:"恐暴竜の鉤爪",pts:5}],
      "侵獣素材": [{name:"侵獣の狂皮",pts:1}, {name:"侵獣の狂爪",pts:2}, {name:"侵獣の狂鱗",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"根性【大】",effect:"HPが50%以上のとき、HPが0になる攻撃を受けても、HPが残った状態で一度だけ耐える。"},
      {name:"タイマン好き【中】",effect:"真っ向勝負によるダメージが上昇する。"},
      {name:"危機感【中】",effect:"HPが50%以下のとき、会心率が上昇する。"},
    ],
  },
  "ジンオウ装備": {
    defensePerLevel: [124, 138, 150],
    decoration: "相棒【小】",
    upgradeMaterials: {
      1: [{name:"雷狼竜素材",pts:6}],
      2: [{name:"雷狼竜素材",pts:12}, {name:"爵銀龍素材",pts:6}],
      3: [{name:"雷狼竜素材",pts:20}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "雷狼竜素材": [{name:"雷狼竜の甲殻",pts:1}, {name:"雷狼竜の帯電毛",pts:2}, {name:"雷狼竜の逆鱗",pts:5}],
      "爵銀龍素材": [{name:"爵銀龍の甲殻",pts:1}, {name:"爵銀龍の翼膜",pts:2}, {name:"爵銀龍の牙",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"相棒【大】",effect:"HPが50%以下のとき、絆ゲージの上昇量が大きく上昇する。"},
      {name:"危機感【中】",effect:"HPが50%以下のとき、会心率が上昇する。"},
      {name:"弱点特攻【小】",effect:"有効な武器で部位を攻撃したとき、会心率がわずかに上昇する。"},
    ],
  },
  "デスガロン装備": {
    defensePerLevel: [124, 146, 164],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"兇爪竜素材",pts:6}],
      2: [{name:"兇爪竜素材",pts:10}, {name:"獄狼竜素材",pts:6}],
      3: [{name:"兇爪竜素材",pts:18}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "獄狼竜素材": [{name:"獄狼竜の甲殻",pts:1}, {name:"獄狼竜の爪",pts:2}, {name:"獄狼竜の逆鱗",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"追い打ち強化【大】",effect:"状態異常の相手へのダメージが大きく上昇する。"},
      {name:"不屈【大】",effect:"ライフポイントが残り1のとき、攻撃力と防御力が大きく上昇する。"},
      {name:"龍属性攻撃力強化【大】",effect:"龍属性で攻撃したときのダメージが大きく上昇する。"},
    ],
  },
  "グラビドU装備": {
    defensePerLevel: [120, 136, 170],
    decoration: "破竜力強化【小】",
    upgradeMaterials: {
      1: [{name:"黒鎧竜素材",pts:6}],
      2: [{name:"黒鎧竜素材",pts:10}, {name:"兇爪竜素材",pts:6}],
      3: [{name:"黒鎧竜素材",pts:18}, {name:"蒼火竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "黒鎧竜素材": [{name:"黒鎧竜の甲殻",pts:1}, {name:"黒鎧竜の頭殻",pts:2}, {name:"黒鎧竜の骨髄",pts:5}],
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "蒼火竜素材": [{name:"蒼火竜の鱗",pts:1}, {name:"蒼火竜の翼膜",pts:2}, {name:"蒼火竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"底力【大】",effect:"HPが50%以下のとき、受けるダメージを大きく軽減する。"},
      {name:"耐やけど【大】",effect:"やけどを高確率で無効化する。"},
      {name:"破竜力強化【中】",effect:"破竜力を上昇させる。"},
    ],
  },
  "ギエナ装備": {
    defensePerLevel: [118, 138, 160],
    decoration: "加速【小】",
    upgradeMaterials: {
      1: [{name:"風漂竜素材",pts:6}],
      2: [{name:"風漂竜素材",pts:12}, {name:"氷牙竜素材",pts:6}],
      3: [{name:"風漂竜素材",pts:20}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "風漂竜素材": [{name:"風漂竜の爪",pts:1}, {name:"風漂竜の翼膜",pts:2}, {name:"風漂竜の逆鱗",pts:5}],
      "氷牙竜素材": [{name:"氷牙竜の甲殻",pts:1}, {name:"氷牙竜の棘",pts:2}, {name:"琥珀色の牙",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"加速【大】",effect:"素早さが上昇し、確率で行動順が早くなる。"},
      {name:"氷属性攻撃力強化【大】",effect:"氷属性で攻撃したときのダメージが大きく上昇する。"},
      {name:"精霊の加護【中】",effect:"受けるダメージがわずかな確率で半減する。"},
    ],
  },
  "ジャナール装備": {
    defensePerLevel: [118, 132, 150],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"雷顎竜素材",pts:6}],
      2: [{name:"雷顎竜素材",pts:12}, {name:"電竜素材",pts:6}],
      3: [{name:"雷顎竜素材",pts:20}, {name:"蒼火竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "電竜素材": [{name:"電竜の鱗",pts:1}, {name:"電竜の冠甲",pts:2}, {name:"電竜の逆鱗",pts:5}],
      "蒼火竜素材": [{name:"蒼火竜の鱗",pts:1}, {name:"蒼火竜の翼膜",pts:2}, {name:"蒼火竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"アイテム節約【大】",effect:"アイテム使用時、確率でアイテムを消費しない。"},
      {name:"雷属性攻撃力強化【大】",effect:"雷属性で攻撃したときのダメージが大きく上昇する。"},
      {name:"弱点特攻【中】",effect:"有効な武器で部位を攻撃したとき、会心率が上昇する。"},
    ],
  },
  "ディアネロ装備": {
    defensePerLevel: [116, 132, 162],
    decoration: "KO術【小】",
    upgradeMaterials: {
      1: [{name:"黒角竜素材",pts:6}],
      2: [{name:"黒角竜素材",pts:10}, {name:"雷顎竜素材",pts:6}],
      3: [{name:"黒角竜素材",pts:18}, {name:"風牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "黒角竜素材": [{name:"黒角竜の甲殻",pts:1}, {name:"黒角竜の尻尾",pts:2}, {name:"黒巻き角",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "風牙竜素材": [{name:"風牙竜の甲殻",pts:1}, {name:"風牙竜の毛皮",pts:2}, {name:"群青色の��",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"KO術【大】",effect:"通常攻撃時、わずかな確率で相手にスタンを付与する。"},
      {name:"破壊王【中】",effect:"部位を攻撃したとき、部位へのダメージが上昇する。"},
      {name:"破竜力強化【中】",effect:"破竜力を上昇させる。"},
    ],
  },
  "ルナガロ装備": {
    defensePerLevel: [112, 144, 162],
    decoration: "危機感【小】",
    upgradeMaterials: {
      1: [{name:"氷狼竜素材",pts:6}],
      2: [{name:"氷狼竜素材",pts:12}, {name:"黒轟竜素材",pts:6}],
      3: [{name:"氷狼竜素材",pts:20}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"危機感【大】",effect:"HPが50%以下のとき、会心率が大きく上昇する。"},
      {name:"回避本能【大】",effect:"HPが50%以下のとき、回避率が大きく上昇する。"},
      {name:"火事場力【中】",effect:"HPが50%以下のとき、与えるダメージが上昇する。"},
    ],
  },
  "ボロスU装備": {
    defensePerLevel: [112, 136, 154],
    decoration: "耐即死【小】",
    upgradeMaterials: {
      1: [{name:"氷砕竜素材",pts:6}],
      2: [{name:"氷砕竜素材",pts:12}, {name:"兇爪竜素材",pts:6}],
      3: [{name:"氷砕竜素材",pts:20}, {name:"黒角竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "氷砕竜素材": [{name:"氷砕竜の甲殻",pts:1}, {name:"氷砕竜の爪",pts:2}, {name:"氷砕竜の頭殻",pts:5}],
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "黒角竜素材": [{name:"黒角竜の甲殻",pts:1}, {name:"黒角竜の尻尾",pts:2}, {name:"黒巻き角",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐即死【大】",effect:"致命の一撃攻撃を高確率で無効化する。"},
      {name:"KO術【中】",effect:"通常攻撃時、稀に相手にスタンを付与する。"},
      {name:"底力【中】",effect:"HPが50%以下のとき、受けるダメージを軽減する。"},
    ],
  },
  "ゴシャ装備": {
    defensePerLevel: [108, 140, 164],
    decoration: "火事場力【小】",
    upgradeMaterials: {
      1: [{name:"雪鬼獣素材",pts:6}],
      2: [{name:"雪鬼獣素材",pts:12}, {name:"爵銀龍素材",pts:6}],
      3: [{name:"雪鬼獣素材",pts:20}, {name:"竜石",pts:3}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "雪鬼獣素材": [{name:"雪鬼獣の毛",pts:1}, {name:"雪鬼獣の拳爪",pts:2}, {name:"しゃっこい氷塊",pts:5}],
      "爵銀龍素材": [{name:"爵銀龍の甲殻",pts:1}, {name:"爵銀龍の翼膜",pts:2}, {name:"爵銀龍の牙",pts:5}],
      "竜石": [{name:"竜石",pts:1}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"火事場力【大】",effect:"HPが50%以下のとき、与えるダメージが大きく上昇する。"},
      {name:"破竜力強化【大】",effect:"破竜力を大きく上昇させる。"},
      {name:"体力増強【中】",effect:"最大HPが上昇する。"},
    ],
  },
  "ヤツカダ装備": {
    defensePerLevel: [80, 106, 132],
    decoration: "スタミナ増強【小】",
    upgradeMaterials: {
      1: [{name:"妃蜘蛛素材",pts:6}],
      2: [{name:"妃蜘蛛素材",pts:12}, {name:"鎧竜素材",pts:6}],
      3: [{name:"妃蜘蛛素材",pts:20}, {name:"千刃竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "妃蜘蛛素材": [{name:"妃蜘蛛の爪",pts:1}, {name:"妃蜘蛛の糸",pts:2}, {name:"妃蜘蛛の棘",pts:5}],
      "鎧竜素材": [{name:"鎧竜の甲殻",pts:1}, {name:"鎧竜の頭殻",pts:2}, {name:"鎧竜の骨髄",pts:5}],
      "千刃竜素材": [{name:"千刃竜の刃鱗",pts:1}, {name:"千刃竜の刀角",pts:2}, {name:"千刃竜の爪",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"スタミナ増強【中】",effect:"スタミナ初期値を上昇させる。"},
      {name:"スタミナ急速回復【中】",effect:"スタミナ回復量を上昇させる。"},
    ],
  },
  "ゼクス装備": {
    defensePerLevel: [106, 132, 150],
    decoration: "属性特攻・破竜【小】",
    upgradeMaterials: {
      1: [{name:"電竜素材",pts:6}],
      2: [{name:"電竜素材",pts:12}, {name:"龍光エキス",pts:8}],
      3: [{name:"電竜素材",pts:20}, {name:"黒角竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "電竜素材": [{name:"電竜の鱗",pts:1}, {name:"電竜の冠甲",pts:2}, {name:"電竜の逆鱗",pts:5}],
      "龍光エキス": [{name:"龍光エキス",pts:1}],
      "黒角竜素材": [{name:"黒角竜の甲殻",pts:1}, {name:"黒角竜の尻尾",pts:2}, {name:"黒巻き角",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中��",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"属性特攻・破竜【大】",effect:"弱点属性で攻撃したとき、竜気ゲージへのダメージを大きく上昇させる。"},
      {name:"スタミナ急速回復【中】",effect:"スタミナ回復量を上昇させる。"},
      {name:"耐マヒ【中】",effect:"マヒを確率で無効化する。"},
    ],
  },
  "レダゼルト装備": {
    defensePerLevel: [106, 132, 150],
    decoration: "属性特攻・破竜【小】",
    upgradeMaterials: {
      1: [{name:"煌雷竜素材",pts:6}],
      2: [{name:"煌雷竜素材",pts:10}, {name:"黒角竜素材",pts:6}],
      3: [{name:"煌雷竜素材",pts:18}, {name:"黒轟竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "煌雷竜素材": [{name:"煌雷竜の鱗",pts:1}, {name:"煌雷竜の電角",pts:2}, {name:"煌雷竜の逆鱗",pts:5}],
      "黒角竜素材": [{name:"黒角竜の甲殻",pts:1}, {name:"黒角竜の尻尾",pts:2}, {name:"黒巻き角",pts:5}],
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"タイマン好き【大】",effect:"真っ向勝負のダメージが大きく上昇する。"},
      {name:"全力【中】",effect:"スキルのスタミナ消費量が増加する代わりに、スキルで与えるダメージが上昇する。"},
      {name:"属性特攻・破竜【中】",effect:"弱点属性で攻撃したとき、竜気ゲージへのダメージを上昇させる。"},
    ],
  },
  "ブランゴ装備": {
    defensePerLevel: [106, 132, 138],
    decoration: "氷属性防御力強化【小】",
    upgradeMaterials: {
      1: [{name:"雪獅子素材",pts:10}],
      2: [{name:"雪獅子素材",pts:15}, {name:"雪鬼獣素材",pts:6}],
      3: [{name:"雪獅子素材",pts:25}, {name:"氷牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "雪獅子素材": [{name:"雪獅子の毛",pts:1}, {name:"雪獅子の牙",pts:2}, {name:"雪獅子の鬣",pts:5}],
      "雪鬼獣素材": [{name:"雪鬼獣の毛",pts:1}, {name:"雪鬼獣の拳爪",pts:2}, {name:"しゃっこい氷塊",pts:5}],
      "氷牙竜素材": [{name:"氷牙竜の甲殻",pts:1}, {name:"氷牙竜の棘",pts:2}, {name:"琥珀色の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"氷属性防御力強化【大】",effect:"氷属性の耐性を一段階上昇させ、氷属性の攻撃を受けたときのダメージを軽減する。"},
      {name:"属性特攻・部位【中】",effect:"弱点属性で攻撃したとき、部位へのダメージを上昇させる。"},
    ],
  },
  "グラビド装備": {
    defensePerLevel: [104, 124, 144],
    decoration: "存在感【小】",
    upgradeMaterials: {
      1: [{name:"鎧竜素材",pts:6}],
      2: [{name:"鎧竜素材",pts:12}, {name:"雷顎竜素材",pts:6}],
      3: [{name:"鎧竜素材",pts:20}, {name:"火竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "鎧竜素材": [{name:"鎧竜の甲殻",pts:1}, {name:"鎧竜の頭殻",pts:2}, {name:"鎧竜の骨髄",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "火竜素材": [{name:"火竜の鱗",pts:1}, {name:"火竜の翼膜",pts:2}, {name:"火竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"全属性防御力強化【大】",effect:"攻撃を受けたときのダメージを大きく軽減する。"},
      {name:"耐睡眠【大】",effect:"睡眠を高確率で無効化する。"},
      {name:"存在感【大】",effect:"相手の攻撃をそれなりに自身に集中させやすくなる。"},
    ],
  },
  "ディアブロ装備": {
    defensePerLevel: [100, 120, 140],
    decoration: "底力【小】",
    upgradeMaterials: {
      1: [{name:"角竜素材",pts:6}],
      2: [{name:"角竜素材",pts:12}, {name:"兇爪竜素材",pts:6}],
      3: [{name:"角竜素材",pts:20}, {name:"黒角竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "角竜素材": [{name:"角竜の甲殻",pts:1}, {name:"角竜の尻尾",pts:2}, {name:"ねじれた角",pts:5}],
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "黒角竜素材": [{name:"黒角竜の甲殻",pts:1}, {name:"黒角竜の尻尾",pts:2}, {name:"黒巻き角",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"底力【大】",effect:"HPが50%以下のとき、受けるダメージを大きく軽減する。"},
      {name:"火事場力【中】",effect:"HPが50%以下のとき、与えるダメージが上昇する。"},
      {name:"危機感【中】",effect:"HPが50%以下のとき、会心率が上昇する。"},
    ],
  },
  "レックス装備": {
    defensePerLevel: [98, 116, 136],
    decoration: "真っ向勝負師【小】",
    upgradeMaterials: {
      1: [{name:"轟竜素材",pts:6}],
      2: [{name:"轟竜素材",pts:12}, {name:"氷狼竜素材",pts:6}],
      3: [{name:"轟竜素材",pts:20}, {name:"黒轟竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "轟竜素材": [{name:"轟竜の鱗",pts:1}, {name:"轟竜の爪",pts:2}, {name:"轟竜の頭殻",pts:5}],
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "黒轟竜素材": [{name:"黒轟竜の鱗",pts:1}, {name:"黒轟竜の爪",pts:2}, {name:"黒轟竜の尻尾",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"真っ向勝負師【中】",effect:"真っ向勝負で勝利したときの絆ゲージ上昇量が上昇する。"},
      {name:"底力【中】",effect:"HPが50%以下のとき、受けるダメージを軽減する。"},
      {name:"破竜力強化【小】",effect:"破竜力をわずかに上昇させる。"},
    ],
  },
  "テンゴU装備": {
    defensePerLevel: [98, 118, 138],
    decoration: "危機感【小】",
    upgradeMaterials: {
      1: [{name:"緋天狗獣素材",pts:6}],
      2: [{name:"緋天狗獣素材",pts:12}, {name:"雪鬼獣素材",pts:6}],
      3: [{name:"緋天狗獣素材",pts:20}, {name:"氷牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "緋天狗獣素材": [{name:"緋天狗獣の腕羽",pts:1}, {name:"緋天狗獣の尾甲",pts:2}, {name:"緋天狗獣の頭襟",pts:5}],
      "雪鬼獣素材": [{name:"雪鬼獣の毛",pts:1}, {name:"雪鬼獣の拳爪",pts:2}, {name:"しゃっこい氷塊",pts:5}],
      "氷牙竜素材": [{name:"氷牙竜の甲殻",pts:1}, {name:"氷牙竜の棘",pts:2}, {name:"琥珀色の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"火属性防御力強化【中】",effect:"火属性の攻撃を受けたときのダメージを軽減する。"},
      {name:"耐やけど【中】",effect:"やけどを確率で無効化する。"},
      {name:"危機感【中】",effect:"HPが50%以下のとき、会心率が上昇する。"},
    ],
  },
  "スキュラU装備": {
    defensePerLevel: [98, 118, 138],
    decoration: "耐状態異常【小】",
    upgradeMaterials: {
      1: [{name:"骸蜘蛛素材",pts:6}],
      2: [{name:"骸蜘蛛素材",pts:12}, {name:"風漂竜素材",pts:6}],
      3: [{name:"骸蜘蛛素材",pts:20}, {name:"怨虎竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "骸蜘蛛素材": [{name:"骸蜘蛛の甲殻",pts:1}, {name:"骸蜘蛛の鋏角",pts:2}, {name:"骸蜘蛛の爪",pts:5}],
      "風漂竜素材": [{name:"風漂竜の爪",pts:1}, {name:"風漂竜の翼膜",pts:2}, {name:"風漂竜の逆鱗",pts:5}],
      "怨虎竜素材": [{name:"怨虎竜の甲殻",pts:1}, {name:"怨虎竜の腕刃",pts:2}, {name:"怨虎竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐状態異常【中】",effect:"すべての状態異常をわずかな確率で無効化する。"},
      {name:"回避性能【小】",effect:"回避率がわずかに上昇する。"},
      {name:"会心【小】",effect:"会心率がわずかに上昇する。"},
    ],
  },
  "ディノ装備": {
    defensePerLevel: [96, 130, 148],
    decoration: "属性特攻・部位【小】",
    upgradeMaterials: {
      1: [{name:"斬竜素材",pts:6}],
      2: [{name:"斬竜素材",pts:12}, {name:"雷顎竜素材",pts:6}],
      3: [{name:"斬竜素材",pts:20}, {name:"蒼火竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "斬竜素材": [{name:"斬竜の牙",pts:1}, {name:"斬竜の炎状殻",pts:2}, {name:"斬竜の逆鱗",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "蒼火竜素材": [{name:"蒼火竜の鱗",pts:1}, {name:"蒼火竜の翼膜",pts:2}, {name:"蒼火竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中���",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"属性特攻・部位【大】",effect:"弱点属性で攻撃したとき、部位へのダメージを大きく上昇させる。"},
      {name:"属性特攻・破竜【中】",effect:"弱点属性で攻撃したとき、竜気ゲージへのダメージを上昇させる。"},
    ],
  },
  "ミツネ装備": {
    defensePerLevel: [96, 118, 138],
    decoration: "ダンサー【小】",
    upgradeMaterials: {
      1: [{name:"泡狐竜素材",pts:6}],
      2: [{name:"泡狐竜素材",pts:12}, {name:"風漂竜素材",pts:6}],
      3: [{name:"泡狐竜素材",pts:20}, {name:"緑迅竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "泡狐竜素材": [{name:"泡狐竜の紫毛",pts:1}, {name:"泡狐竜の錦ヒレ",pts:2}, {name:"泡狐竜の逆鱗",pts:5}],
      "風漂竜素材": [{name:"風漂竜の爪",pts:1}, {name:"風漂竜の翼膜",pts:2}, {name:"風漂竜の逆鱗",pts:5}],
      "緑迅竜素材": [{name:"緑迅竜の鱗",pts:1}, {name:"緑迅竜の斑毛",pts:2}, {name:"緑迅竜の刃翼",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"ダンサー【中】",effect:"HPが最大のとき、素早く動けるようになり、攻撃力と防御力が上昇する。"},
      {name:"回避性能【中】",effect:"回避率が上昇する。"},
      {name:"水属性攻撃力強化【中】",effect:"水属性で攻撃したときのダメージが上昇する。"},
    ],
  },
  "ナルガ装備": {
    defensePerLevel: [90, 110, 132],
    decoration: "回避性能【小】",
    upgradeMaterials: {
      1: [{name:"迅竜素材",pts:6}],
      2: [{name:"迅竜素材",pts:12}, {name:"氷狼竜素材",pts:6}],
      3: [{name:"迅竜素材",pts:20}, {name:"風牙竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "迅竜素材": [{name:"迅竜の鱗",pts:1}, {name:"迅竜の黒毛",pts:2}, {name:"迅竜の刃翼",pts:5}],
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "風牙竜素材": [{name:"風牙竜の甲殻",pts:1}, {name:"風牙竜の毛皮",pts:2}, {name:"群青色の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"回避性能【大】",effect:"回避率が大きく上昇する。"},
      {name:"会心【中】",effect:"会心率が上昇する。"},
      {name:"加速【小】",effect:"素早さがわずかに上昇し、低確率で行動順が早くなる。"},
    ],
  },
  "ゴルム装備": {
    defensePerLevel: [82, 110, 134],
    decoration: "全力【小】",
    upgradeMaterials: {
      1: [{name:"剛纏獣素材",pts:6}],
      2: [{name:"剛纏獣素材",pts:12}, {name:"雪獅子素材",pts:6}],
      3: [{name:"剛纏獣素材",pts:20}, {name:"兇爪竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "剛纏獣素材": [{name:"剛纏獣の鱗",pts:1}, {name:"剛纏獣の牙",pts:2}, {name:"剛纏獣の鍬尾",pts:5}],
      "雪獅子素材": [{name:"雪獅子の毛",pts:1}, {name:"雪獅子の牙",pts:2}, {name:"雪獅子の鬣",pts:5}],
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"全力【大】",effect:"スキルのスタミナ消費量が増加する代わりに、スキルで与えるダメージが大きく上昇する。"},
      {name:"全属性防御力強化【中】",effect:"攻撃をうけたときのダメージを軽減する。"},
    ],
  },
  "ガルルガ装備": {
    defensePerLevel: [78, 106, 132],
    decoration: "タイマン好き【小】",
    upgradeMaterials: {
      1: [{name:"黒狼鳥素材",pts:6}],
      2: [{name:"黒狼鳥素材",pts:12}, {name:"風漂竜素材",pts:6}],
      3: [{name:"黒狼鳥素材",pts:20}, {name:"千刃竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "黒狼鳥素材": [{name:"黒狼鳥の鱗",pts:1}, {name:"黒狼鳥の耳",pts:2}, {name:"尖ったクチバシ",pts:5}],
      "風漂竜素材": [{name:"風漂竜の爪",pts:1}, {name:"風漂竜の翼膜",pts:2}, {name:"風漂竜の逆鱗",pts:5}],
      "千刃竜素材": [{name:"千刃竜の刃鱗",pts:1}, {name:"千刃竜の刀角",pts:2}, {name:"千刃竜の爪",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"タイマン好き【中】",effect:"真っ向勝負によるダメージが上昇する。"},
      {name:"付与率アップ【中】",effect:"状態異常付与率が上昇する。"},
      {name:"耐毒【小】",effect:"毒、猛毒、劇毒を低確率で無効化する。"},
    ],
  },
  "アジャラ装備": {
    defensePerLevel: [78, 104, 128],
    decoration: "ボマー【小】",
    upgradeMaterials: {
      1: [{name:"赫猿獣素材",pts:6}],
      2: [{name:"赫猿獣素材",pts:12}, {name:"煌雷竜素材",pts:6}],
      3: [{name:"赫猿獣素材",pts:20}, {name:"兇爪竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "赫猿獣素材": [{name:"赫猿獣の鱗",pts:1}, {name:"赫炎結晶",pts:2}, {name:"赫猿獣の骨髄",pts:5}],
      "煌雷竜素材": [{name:"煌雷竜の鱗",pts:1}, {name:"煌雷竜の電角",pts:2}, {name:"煌雷竜の逆鱗",pts:5}],
      "兇爪竜素材": [{name:"兇爪竜の鱗",pts:1}, {name:"兇爪竜の爪",pts:2}, {name:"兇爪竜の尾",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"ボマー【中】",effect:"爆破やられやタル爆弾で与えるダメージが上昇する。"},
      {name:"耐爆破やられ【中】",effect:"爆破やられを確率で無効化する。"},
      {name:"破壊王【小】",effect:"部位を攻撃したとき、部位へのダメージがわずかに上昇する。"},
    ],
  },
  "ガロン装備": {
    defensePerLevel: [74, 100, 124],
    decoration: "耐裂傷【小】",
    upgradeMaterials: {
      1: [{name:"惨爪竜素材",pts:6}],
      2: [{name:"惨爪竜素材",pts:12}, {name:"轟竜素材",pts:6}],
      3: [{name:"惨爪竜素材",pts:20}, {name:"雷顎竜素材",pts:23}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "惨爪竜素材": [{name:"惨爪竜の鱗",pts:1}, {name:"惨爪竜の爪",pts:2}, {name:"惨爪竜の逆鱗",pts:5}],
      "轟竜素材": [{name:"轟竜の鱗",pts:1}, {name:"轟竜の爪",pts:2}, {name:"轟竜の頭殻",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐裂傷【大】",effect:"裂傷を高確率で無効化する。"},
      {name:"スタミナ増強【小】",effect:"スタミナ初期値をわずかに上昇させる。"},
      {name:"スタミナ急速回復【小】",effect:"スタミナ回復量をわずかに上昇させる。"},
    ],
  },
  "ボロス装備": {
    defensePerLevel: [72, 104, 122],
    decoration: "底力【小】",
    upgradeMaterials: {
      1: [{name:"土砂竜素材",pts:10}],
      2: [{name:"土砂竜素材",pts:15}, {name:"鎧竜素材",pts:6}],
      3: [{name:"土砂竜素材",pts:25}, {name:"雪鬼獣素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "土砂竜素材": [{name:"土砂竜の甲殻",pts:1}, {name:"土砂竜の爪",pts:2}, {name:"土砂竜の頭殻",pts:5}],
      "鎧竜素材": [{name:"鎧竜の甲殻",pts:1}, {name:"鎧竜の頭殻",pts:2}, {name:"鎧竜の骨髄",pts:5}],
      "雪鬼獣素材": [{name:"雪鬼獣の毛",pts:1}, {name:"雪鬼獣の拳爪",pts:2}, {name:"しゃっこい氷塊",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"底力【中】",effect:"HPが50%以下のとき、受けるダメージを軽減する。"},
      {name:"存在感【中】",effect:"相手の攻撃を自身に集中させやすくなる。"},
    ],
  },
  "ギザミ装備": {
    defensePerLevel: [68, 100, 118],
    decoration: "相棒【小】",
    upgradeMaterials: {
      1: [{name:"鎌蟹素材",pts:10}],
      2: [{name:"鎌蟹素材",pts:15}, {name:"緋天狗獣素材",pts:6}],
      3: [{name:"鎌蟹素材",pts:25}, {name:"氷狼竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "鎌蟹素材": [{name:"鎌蟹の脚",pts:1}, {name:"鎌蟹の甲殻",pts:2}, {name:"鎌蟹の爪",pts:5}],
      "緋天狗獣素材": [{name:"緋天狗獣の腕羽",pts:1}, {name:"緋天狗獣の尾甲",pts:2}, {name:"緋天狗獣の頭襟",pts:5}],
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"ダンサー【中】",effect:"HPが最大のとき、素早く動けるようになり、攻撃力と防御力が上昇する。"},
      {name:"相棒【中】",effect:"HPが50%以下のとき、絆ゲージの上昇量が上昇する。"},
    ],
  },
  "クルル装備": {
    defensePerLevel: [68, 100, 118],
    decoration: "KO術【小】",
    upgradeMaterials: {
      1: [{name:"掻鳥素材",pts:10}],
      2: [{name:"掻鳥素材",pts:15}, {name:"斬竜素材",pts:6}],
      3: [{name:"掻鳥素材",pts:25}, {name:"煌雷竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "掻鳥素材": [{name:"掻鳥の皮",pts:1}, {name:"掻鳥のクチバシ",pts:2}, {name:"掻鳥の飾り羽",pts:5}],
      "斬竜素材": [{name:"斬竜の牙",pts:1}, {name:"斬竜の炎状殻",pts:2}, {name:"斬竜の逆鱗",pts:5}],
      "煌雷竜素材": [{name:"煌雷竜の鱗",pts:1}, {name:"煌雷竜の電角",pts:2}, {name:"煌雷竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"KO術【中】",effect:"通常攻撃時、稀に相手にスタンを付与する。"},
      {name:"会心【小】",effect:"会心率がわずかに上昇する。"},
    ],
  },
  "イソネ装備": {
    defensePerLevel: [44, 68, 100],
    decoration: "耐睡眠【小】",
    upgradeMaterials: {
      1: [{name:"人魚竜素材",pts:6}],
      2: [{name:"人魚竜素材",pts:12}, {name:"鎌蟹素材",pts:6}],
      3: [{name:"人魚竜素材",pts:20}, {name:"砕竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "人魚竜素材": [{name:"人魚竜の甲殻",pts:1}, {name:"人魚竜の鱗",pts:2}, {name:"人魚竜の髪ヒレ",pts:5}],
      "鎌蟹素材": [{name:"鎌蟹の脚",pts:1}, {name:"鎌蟹の甲殻",pts:2}, {name:"鎌蟹の爪",pts:5}],
      "砕竜素材": [{name:"砕竜の甲殻",pts:1}, {name:"砕竜の拳",pts:2}, {name:"砕竜の骨髄",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"付与率アップ【中】",effect:"状態異常付与率が上昇する。"},
      {name:"耐睡眠【中】",effect:"睡眠を確率で無効化する。"},
      {name:"追い打ち強化【小】",effect:"状態異常の相手へのダメージわずかにが上昇する。"},
    ],
  },
  "オロミド装備": {
    defensePerLevel: [68, 100, 118],
    decoration: "属性特攻・部位【小】",
    upgradeMaterials: {
      1: [{name:"泥翁竜素材",pts:6}],
      2: [{name:"泥翁竜素材",pts:12}, {name:"角竜素材",pts:6}],
      3: [{name:"泥翁竜素材",pts:20}, {name:"氷狼竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "泥翁竜素材": [{name:"泥翁竜の鱗",pts:1}, {name:"泥翁竜の髭",pts:2}, {name:"泥翁竜の逆鱗",pts:5}],
      "角竜素材": [{name:"角竜の甲殻",pts:1}, {name:"角竜の尻尾",pts:2}, {name:"ねじれた角",pts:5}],
      "氷狼竜素材": [{name:"氷狼竜の鱗",pts:1}, {name:"氷狼竜の朱爪",pts:2}, {name:"凍てつく狼牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"属性特攻・破竜【中】",effect:"弱点属性で攻撃したとき、竜気ゲージへのダメージを上昇させる。"},
      {name:"属性特攻・部位【中】",effect:"弱点属性で攻撃したとき、部位へのダメージを上昇させる。"},
    ],
  },
  "イソネU装備": {
    defensePerLevel: [62, 82, 108],
    decoration: "氷属性攻撃力強化【小】",
    upgradeMaterials: {
      1: [{name:"氷人魚竜素材",pts:6}],
      2: [{name:"氷人魚竜素材",pts:12}, {name:"緋天狗獣素材",pts:6}],
      3: [{name:"氷人魚竜素材",pts:20}, {name:"風漂竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "氷人魚竜素材": [{name:"氷人魚竜の甲殻",pts:1}, {name:"氷人魚竜の鱗",pts:2}, {name:"氷人魚竜の爪",pts:5}],
      "緋天狗獣素材": [{name:"緋天狗獣の腕羽",pts:1}, {name:"緋天狗獣の尾甲",pts:2}, {name:"緋天狗獣の頭襟",pts:5}],
      "風漂竜素材": [{name:"風漂竜の爪",pts:1}, {name:"風漂竜の翼膜",pts:2}, {name:"風漂竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"氷属性攻撃力強化【中】",effect:"氷属性で攻撃したときのダメージが上昇する。"},
      {name:"魂の絆【中】",effect:"絆ゲージの上昇量が上昇する。"},
      {name:"属性特攻・破竜【小】",effect:"弱点属性で攻撃したとき、竜気ゲージへのダメージをわずかに上昇させる。"},
    ],
  },
  "フルフルU装備": {
    defensePerLevel: [62, 82, 108],
    decoration: "会心撃・回復【小】",
    upgradeMaterials: {
      1: [{name:"赤怪竜素材",pts:6}],
      2: [{name:"赤怪竜素材",pts:12}, {name:"惨爪竜素材",pts:6}],
      3: [{name:"赤怪竜素材",pts:20}, {name:"雷顎竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "惨爪竜素材": [{name:"惨爪竜の鱗",pts:1}, {name:"惨爪竜の爪",pts:2}, {name:"惨爪竜の逆鱗",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐マヒ【中】",effect:"マヒを確率で無効化する。"},
      {name:"会心撃・回復【中】",effect:"クリティカル発生時、自身のHPが少量回復する。"},
    ],
  },
  "ルドロスU装備": {
    defensePerLevel: [60, 82, 108],
    decoration: "耐毒【小】",
    upgradeMaterials: {
      1: [{name:"紫水獣素材",pts:10}],
      2: [{name:"紫水獣素材",pts:15}, {name:"剛纏獣素材",pts:6}],
      3: [{name:"紫水獣素材",pts:25}, {name:"氷砕竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "紫水獣素材": [{name:"紫水獣の鱗",pts:1}, {name:"紫水獣の爪",pts:2}, {name:"海綿質の紫皮",pts:5}],
      "剛纏獣素材": [{name:"剛纏獣の鱗",pts:1}, {name:"剛纏獣の牙",pts:2}, {name:"剛纏獣の鍬尾",pts:5}],
      "氷砕竜素材": [{name:"氷砕竜の甲殻",pts:1}, {name:"氷砕竜の爪",pts:2}, {name:"氷砕竜の頭殻",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐毒【大】",effect:"毒、猛毒、劇毒を高確率で無効化する。"},
      {name:"追い打ち強化【中】",effect:"部位を攻撃したとき、部位へのダメージがわずかに上昇する。"},
      {name:"水属性攻撃力強化【小】",effect:"水属性で攻撃したときのダメージがわずかに上昇する"},
    ],
  },
  "ラギアU装備": {
    defensePerLevel: [58, 120, 150],
    decoration: "破壊王【小】",
    upgradeMaterials: {
      1: [{name:"白海竜素材",pts:6}],
      2: [{name:"白海竜素材",pts:10}, {name:"雷顎竜素材",pts:6}],
      3: [{name:"白海竜素材",pts:18}, {name:"電竜素材",pts:12}, {name:"鎧玉",pts:10}],
    },
    materialDetails: {
      "白海竜素材": [{name:"白海竜の鱗",pts:1}, {name:"白海竜の角",pts:2}, {name:"白海竜の背電殻",pts:5}],
      "雷顎竜素材": [{name:"雷顎竜の鱗",pts:1}, {name:"雷顎竜の毛皮",pts:2}, {name:"雷顎竜の牙",pts:5}],
      "電竜素材": [{name:"電竜の鱗",pts:1}, {name:"電竜の冠甲",pts:2}, {name:"電竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"雷属性攻撃力強化【大】",effect:"雷属性で攻撃したときのダメージが大きく上昇する。"},
      {name:"全属性防御力強化【中】",effect:"攻撃をうけたときのダメージを軽減する。"},
      {name:"破壊王【中】",effect:"部位を攻撃したとき、部位へのダメージが上昇する。"},
    ],
  },
  "フルフル装備": {
    defensePerLevel: [54, 68, 100],
    decoration: "耐マヒ【小】",
    upgradeMaterials: {
      1: [{name:"奇怪竜素材",pts:10}],
      2: [{name:"奇怪竜素材",pts:15}, {name:"潜口竜素材",pts:6}],
      3: [{name:"奇怪竜素材",pts:25}, {name:"鎧竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "潜口竜素材": [{name:"潜口竜の甲殻",pts:1}, {name:"潜口竜の皮",pts:2}, {name:"潜口竜の頭殻",pts:5}],
      "鎧竜素材": [{name:"鎧竜の甲殻",pts:1}, {name:"鎧竜の頭殻",pts:2}, {name:"鎧竜の骨髄",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"雷属性防御力強化【中】",effect:"雷属性の攻撃を受けたときのダメージを軽減する。"},
      {name:"自己回復【中】",effect:"ターン終了時にHPが少量回復する。"},
      {name:"耐マヒ【小】",effect:"マヒを低確率で無効化する。"},
    ],
  },
  "アケノ装備": {
    defensePerLevel: [54, 68, 100],
    decoration: "ダンサー【小】",
    upgradeMaterials: {
      1: [{name:"傘鳥素材",pts:10}],
      2: [{name:"傘鳥素材",pts:15}, {name:"蛮顎竜素材",pts:6}],
      3: [{name:"傘鳥素材",pts:25}, {name:"妃蜘蛛素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "傘鳥素材": [{name:"傘鳥の鱗",pts:1}, {name:"傘鳥の羽鱗",pts:2}, {name:"傘鳥のトサカ",pts:5}],
      "蛮顎竜素材": [{name:"蛮顎竜の鱗",pts:1}, {name:"蛮顎竜の鼻骨",pts:2}, {name:"蛮顎竜の牙",pts:5}],
      "妃蜘蛛素材": [{name:"妃蜘蛛の爪",pts:1}, {name:"妃蜘蛛の糸",pts:2}, {name:"妃蜘蛛の棘",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"火属性攻撃力強化【中】",effect:"火属性で攻撃したときのダメージが上昇する。"},
      {name:"ダンサー【小】",effect:"HPが最大のとき、素早く動けるようになり、攻撃力と防御力がわずかに上昇する。"},
    ],
  },
  "ラギア装備": {
    defensePerLevel: [48, 70, 110],
    decoration: "",
    upgradeMaterials: {
      1: [{name:"海竜素材",pts:6}],
      2: [{name:"海竜素材",pts:12}, {name:"鎌蟹素材",pts:6}],
      3: [{name:"海竜素材",pts:20}, {name:"氷砕竜素材",pts:12}, {name:"鎧玉",pts:8}],
    },
    materialDetails: {
      "海竜素材": [{name:"海竜の鱗",pts:1}, {name:"海竜の角",pts:2}, {name:"海竜の背電殻",pts:5}],
      "鎌蟹素材": [{name:"鎌蟹の脚",pts:1}, {name:"鎌蟹の甲殻",pts:2}, {name:"鎌蟹の爪",pts:5}],
      "氷砕竜素材": [{name:"氷砕竜の甲殻",pts:1}, {name:"氷砕竜の爪",pts:2}, {name:"氷砕竜の頭殻",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"雷属性防御力強化【中】",effect:"雷属性の攻撃を受けたときのダメージを軽減する。"},
      {name:"魂の絆【中】",effect:"絆ゲージの上昇量が上昇する。"},
      {name:"絆技強化【中】",effect:"絆技のダメージが上昇する。"},
    ],
  },
  "イズチ装備": {
    defensePerLevel: [44, 62, 82],
    decoration: "加速【小】",
    upgradeMaterials: {
      1: [{name:"鎌鼬竜素材",pts:10}],
      2: [{name:"鎌鼬竜素材",pts:15}, {name:"天狗獣素材",pts:6}],
      3: [{name:"鎌鼬竜素材",pts:25}, {name:"掻鳥素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "鎌鼬竜素材": [{name:"鎌鼬竜の毛",pts:1}, {name:"鎌鼬竜の皮",pts:2}, {name:"鎌鼬竜の刃尾",pts:5}],
      "天狗獣素材": [{name:"天狗獣の腕羽",pts:1}, {name:"天狗獣の尾甲",pts:2}, {name:"天狗獣の頭襟",pts:5}],
      "掻鳥素材": [{name:"掻鳥の皮",pts:1}, {name:"掻鳥のクチバシ",pts:2}, {name:"掻鳥の飾り羽",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"会心【中】",effect:"会心率が上昇する。"},
      {name:"スタミナ増強【小】",effect:"スタミナ初期値をわずかに上昇させる。"},
      {name:"加速【小】",effect:"素早さがわずかに上昇し、低確率で行動順が早くなる。"},
    ],
  },
  "テンゴ装備": {
    defensePerLevel: [44, 62, 82],
    decoration: "全力【小】",
    upgradeMaterials: {
      1: [{name:"天狗獣素材",pts:10}],
      2: [{name:"天狗獣素材",pts:15}, {name:"蛮顎竜素材",pts:6}],
      3: [{name:"天狗獣素材",pts:25}, {name:"惨爪竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "天狗獣素材": [{name:"天狗獣の腕羽",pts:1}, {name:"天狗獣の尾甲",pts:2}, {name:"天狗獣の頭襟",pts:5}],
      "蛮顎竜素材": [{name:"蛮顎竜の鱗",pts:1}, {name:"蛮顎竜の鼻骨",pts:2}, {name:"蛮顎竜の牙",pts:5}],
      "惨爪竜素材": [{name:"惨爪竜の鱗",pts:1}, {name:"惨爪竜の爪",pts:2}, {name:"惨爪竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"アイテム節約【中】",effect:"アイテム使用時、低確率でアイテムを消費しない。"},
      {name:"全力【小】",effect:"スキルのスタミナ消費量が増加する代わりに、スキルで与えるダメージがわずかに上昇する。"},
    ],
  },
  "ヨツミ装備": {
    defensePerLevel: [44, 62, 82],
    decoration: "スタミナ増強【小】",
    upgradeMaterials: {
      1: [{name:"河童蛙素材",pts:10}],
      2: [{name:"河童蛙素材",pts:15}, {name:"紫水獣素材",pts:6}],
      3: [{name:"河童蛙素材",pts:25}, {name:"泥翁竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "河童蛙素材": [{name:"河童蛙の苔背甲",pts:1}, {name:"河童蛙の嘴",pts:2}, {name:"河童蛙の皿",pts:5}],
      "紫水獣素材": [{name:"紫水獣の鱗",pts:1}, {name:"紫水獣の爪",pts:2}, {name:"海綿質の紫皮",pts:5}],
      "泥翁竜素材": [{name:"泥翁竜の鱗",pts:1}, {name:"泥翁竜の髭",pts:2}, {name:"泥翁竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"スタミナ増強【中】",effect:"スタミナ初期値を上昇させる。"},
      {name:"スタミナ急速回復【小】",effect:"スタミナ回復量をわずかに上昇させる。"},
      {name:"水属性攻撃力強化【小】",effect:"水属性で攻撃したときのダメージがわずかに上昇する"},
    ],
  },
  "アシラ装備": {
    defensePerLevel: [44, 62, 82],
    decoration: "全属性防御力強化【小】",
    upgradeMaterials: {
      1: [{name:"青熊獣素材",pts:10}],
      2: [{name:"青熊獣素材",pts:15}, {name:"鎌鼬竜素材",pts:6}],
      3: [{name:"青熊獣素材",pts:25}, {name:"赫猿獣素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "青熊獣素材": [{name:"青熊獣の毛",pts:1}, {name:"青熊獣の甲殻",pts:2}, {name:"青熊獣の腕甲",pts:5}],
      "鎌鼬竜素材": [{name:"鎌鼬竜の毛",pts:1}, {name:"鎌鼬竜の皮",pts:2}, {name:"鎌鼬竜の刃尾",pts:5}],
      "赫猿獣素材": [{name:"赫猿獣の鱗",pts:1}, {name:"赫炎結晶",pts:2}, {name:"赫猿獣の骨髄",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"全属性防御力強化【中】",effect:"攻撃をうけたときのダメージを軽減する。"},
      {name:"アイテム節約【小】",effect:"アイテム使用時、わずかな確率でアイテムを消費しない。"},
    ],
  },
  "プケプケ装備": {
    defensePerLevel: [44, 62, 82],
    decoration: "アイテム節約【小】",
    upgradeMaterials: {
      1: [{name:"毒妖鳥素材",pts:10}],
      2: [{name:"毒妖鳥素材",pts:15}, {name:"水竜素材",pts:6}],
      3: [{name:"毒妖鳥素材",pts:25}, {name:"惨爪竜素材",pts:12}, {name:"鎧玉",pts:5}],
    },
    materialDetails: {
      "毒妖鳥素材": [{name:"毒妖鳥の鱗",pts:1}, {name:"毒妖鳥の喉袋",pts:2}, {name:"毒妖鳥の尻尾",pts:5}],
      "水竜素材": [{name:"水竜の鱗",pts:1}, {name:"水竜の牙",pts:2}, {name:"水竜のヒレ",pts:5}],
      "惨爪竜素材": [{name:"惨爪竜の鱗",pts:1}, {name:"惨爪竜の爪",pts:2}, {name:"惨爪竜の逆鱗",pts:5}],
      "鎧玉": [{name:"鎧玉【小】",pts:1}, {name:"鎧玉【中】",pts:2}, {name:"鎧玉【大】",pts:5}],
    },
    skills: [
      {name:"耐毒【中】",effect:"毒、猛毒、劇毒を確率で無効化する。"},
      {name:"付与率アップ【中】",effect:"状態異常付与率が上昇する。"},
      {name:"アイテム節約【小】",effect:"アイテム使用時、わずかな確率でアイテムを消費しない。"},
    ],
  },
};
