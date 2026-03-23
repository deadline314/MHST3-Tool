export interface MaterialSource {
  zhName: string;
  items: { name: string; zhName: string; pts: number }[];
  sources: {
    type: "採取" | "掉落" | "購買";
    description: string;
    zhDescription: string;
  }[];
}

export const MATERIAL_SOURCES: Record<string, MaterialSource> = {
  "矛玉": {
    zhName: "矛玉",
    items: [
      { name: "矛玉【小】", zhName: "矛玉【小】", pts: 1 },
      { name: "矛玉【中】", zhName: "矛玉【中】", pts: 2 },
      { name: "矛玉【大】", zhName: "矛玉【大】", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 鉱脈(赤)・大岩", zhDescription: "全區域 — 礦脈（紅）、大岩石" },
      { type: "購買", description: "交易店(特別品) 凶異ヤマツカミ討伐後", zhDescription: "交易店（特別品）凶異山神討伐後 — 200金×5" },
    ],
  },
  "鎧玉": {
    zhName: "鎧玉",
    items: [
      { name: "鎧玉【小】", zhName: "鎧玉【小】", pts: 1 },
      { name: "鎧玉【中】", zhName: "鎧玉【中】", pts: 2 },
      { name: "鎧玉【大】", zhName: "鎧玉【大】", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 鉱脈(赤)・大岩", zhDescription: "全區域 — 礦脈（紅）、大岩石" },
      { type: "購買", description: "交易店(特別品) 凶異ヤマツカミ討伐後", zhDescription: "交易店（特別品）凶異山神討伐後 — 200金×5" },
    ],
  },
  "竜骨": {
    zhName: "龍骨",
    items: [
      { name: "竜骨【小】", zhName: "龍骨【小】", pts: 1 },
      { name: "竜骨【中】", zhName: "龍骨【中】", pts: 2 },
      { name: "竜骨【大】", zhName: "龍骨【大】", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 骨塚", zhDescription: "全區域 — 骨塚" },
    ],
  },
  "獣骨": {
    zhName: "獸骨",
    items: [
      { name: "獣骨【小】", zhName: "獸骨【小】", pts: 1 },
      { name: "獣骨【中】", zhName: "獸骨【中】", pts: 2 },
      { name: "獣骨【大】", zhName: "獸骨【大】", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 骨塚", zhDescription: "全區域 — 骨塚" },
    ],
  },
  "結晶": {
    zhName: "結晶",
    items: [
      { name: "大地の結晶", zhName: "大地結晶", pts: 1 },
      { name: "天空の結晶", zhName: "天空結晶", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 鉱脈(青)", zhDescription: "全區域 — 礦脈（藍）" },
    ],
  },
  "クリスタル": {
    zhName: "水晶",
    items: [
      { name: "ライトクリスタル", zhName: "亮水晶", pts: 1 },
      { name: "ノヴァクリスタル", zhName: "璀璨水晶", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 鉱脈(青)", zhDescription: "全區域 — 礦脈（藍）" },
    ],
  },
  "下級鉱石": {
    zhName: "下級礦石",
    items: [
      { name: "鉄鉱石", zhName: "鐵礦石", pts: 1 },
      { name: "シーブライト鉱石", zhName: "海光石", pts: 2 },
      { name: "マカライト鉱石", zhName: "燕雀石", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 鉱脈(赤)", zhDescription: "全區域 — 礦脈（紅）" },
    ],
  },
  "上級鉱石": {
    zhName: "上級礦石",
    items: [
      { name: "ドラグライト鉱石", zhName: "輝龍石", pts: 1 },
      { name: "デプスライト鉱石", zhName: "淵水晶", pts: 2 },
      { name: "ユニオン鉱石", zhName: "白鳩石", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 鉱脈(赤)", zhDescription: "全區域 — 礦脈（紅）" },
    ],
  },
  "下級虫": {
    zhName: "下級蟲",
    items: [
      { name: "虫の死骸", zhName: "蟲的屍骸", pts: 1 },
      { name: "セッチャクロアリ", zhName: "黏著黑蟻", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 虫採り", zhDescription: "全區域 — 捕蟲點" },
    ],
  },
  "上級虫": {
    zhName: "上級蟲",
    items: [
      { name: "キラビートル", zhName: "光輝甲蟲", pts: 1 },
      { name: "ドスヘラクレス", zhName: "大獨角仙", pts: 5 },
    ],
    sources: [
      { type: "採取", description: "全域 - 虫採り", zhDescription: "全區域 — 捕蟲點" },
    ],
  },
  "竜石": {
    zhName: "龍石",
    items: [
      { name: "竜石", zhName: "龍石", pts: 1 },
    ],
    sources: [
      { type: "掉落", description: "マガイマガド・オドガロン・オドガロン亜種・ジンオウガ・ジンオウガ亜種・イビルジョー", zhDescription: "怨虎龍、兇爪龍、兇爪龍亞種、雷狼龍、雷狼龍亞種、恐暴龍" },
    ],
  },
  "古龍の血": {
    zhName: "古龍之血",
    items: [
      { name: "古龍の血", zhName: "古龍之血", pts: 1 },
    ],
    sources: [
      { type: "掉落", description: "古龍種モンスター", zhDescription: "古龍種魔物掉落" },
    ],
  },
  "侵獣素材": {
    zhName: "侵獸素材",
    items: [
      { name: "侵獣の狂皮", zhName: "侵獸的狂皮", pts: 1 },
      { name: "侵獣の狂爪", zhName: "侵獸的狂爪", pts: 2 },
      { name: "侵獣の狂鱗", zhName: "侵獸的狂鱗", pts: 5 },
    ],
    sources: [
      { type: "掉落", description: "侵獣イャンガルルガ・侵獣アオアシラ・その他侵獣モンスター", zhDescription: "侵獸黑狼鳥、侵獸青熊獸及其他侵獸魔物" },
    ],
  },
};
