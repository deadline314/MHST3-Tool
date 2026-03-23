import { useParams, Link } from "react-router-dom";
import { ARMORS } from "../data/armors";
import { ARMOR_DETAILS } from "../data/armorDetails";
import { MATERIAL_SOURCES } from "../data/materialSources";
import {
  translateArmorName,
  translateArmorSkill,
  translateArmorEffect,
  translateMaterialName,
  findMonsterForMaterial,
} from "../data/weaponTranslations";
import { ELEMENT_COLORS, ARMOR_RESIST_COLORS } from "../types/monster";
import type { ArmorSkill } from "../types/monster";

function slotsDisplay(s: { lv1: number; lv2: number; lv3: number }): string {
  const parts: string[] = [];
  for (let i = 0; i < s.lv3; i++) parts.push("【Lv3】");
  for (let i = 0; i < s.lv2; i++) parts.push("【Lv2】");
  for (let i = 0; i < s.lv1; i++) parts.push("【Lv1】");
  const total = s.lv1 + s.lv2 + s.lv3;
  for (let i = total; i < 3; i++) parts.push("【-】");
  return parts.join("");
}

function MaterialLink({ name }: { name: string }) {
  const monster = findMonsterForMaterial(name);
  const zhName = translateMaterialName(name);
  if (monster) {
    return (
      <Link to={`/monsters/${monster.id}`} className="wd-mat-tag wd-mat-monster-link" title={`→ ${monster.name}`}>
        {zhName}
        {zhName !== name && <span className="wd-mat-tag-jp">{name}</span>}
      </Link>
    );
  }
  return (
    <span className="wd-mat-tag">
      {zhName}
      {zhName !== name && <span className="wd-mat-tag-jp">{name}</span>}
    </span>
  );
}

const RESIST_ORDER = [
  { key: "resistNeutral", label: "無", zh: "無屬性" },
  { key: "resistFire", label: "火", zh: "火屬性" },
  { key: "resistWater", label: "水", zh: "水屬性" },
  { key: "resistThunder", label: "雷", zh: "雷屬性" },
  { key: "resistIce", label: "氷", zh: "冰屬性" },
  { key: "resistDragon", label: "龍", zh: "龍屬性" },
] as const;

const RESIST_LABEL_ZH: Record<string, string> = {
  "⬆︎⬆︎": "大耐性",
  "⬆︎": "小耐性",
  "-": "普通",
  "⬇︎": "小弱點",
  "⬇︎⬇︎": "大弱點",
};

function ArmorSkillCard({ skill }: { skill: ArmorSkill }) {
  const zhName = translateArmorSkill(skill.name);
  const zhEffect = translateArmorEffect(skill.effect);

  return (
    <div className="ad-detail-skill-card">
      <div className="ad-detail-skill-top">
        <div className="ad-detail-skill-name-col">
          <span className="ad-detail-skill-zh">{zhName}</span>
          {zhName !== skill.name && <span className="ad-detail-skill-jp">{skill.name}</span>}
        </div>
        <span className="wd-badge wd-badge-passive">被動</span>
      </div>
      <div className="ad-detail-skill-effect">
        <span className="ad-detail-skill-effect-zh">{zhEffect}</span>
        {zhEffect !== skill.effect && <span className="ad-detail-skill-effect-jp">{skill.effect}</span>}
      </div>
    </div>
  );
}

export function ArmorDetailPage() {
  const { armorName } = useParams<{ armorName: string }>();
  const decodedName = armorName ? decodeURIComponent(armorName) : "";
  const armor = ARMORS.find((a) => a.name === decodedName);
  const detail = ARMOR_DETAILS[decodedName];

  if (!armor) {
    return (
      <div className="wd-not-found">
        <h2>找不到防具</h2>
        <Link to="/equipment" className="wd-back-link">← 返回裝備檢索</Link>
      </div>
    );
  }

  const zhName = translateArmorName(armor.name);
  const elColor = ELEMENT_COLORS[armor.element] || ELEMENT_COLORS["無"];
  const defLevels = detail?.defensePerLevel || [armor.defense];
  const decoration = detail?.decoration || "";
  const zhDecoration = decoration ? translateArmorSkill(decoration) : "";

  return (
    <div className="wd-page">
      <Link to="/equipment" className="wd-back-link">← 裝備檢索</Link>

      <div className="wd-hero" style={{ borderColor: elColor }}>
        <div className="wd-hero-icon">
          <img src="/weapon/armor_icon.webp" alt="防具" width={64} height={64} className="weapon-type-icon" />
        </div>
        <div className="wd-hero-info">
          <h1 className="wd-hero-name">{zhName}</h1>
          {zhName !== armor.name && <span className="wd-hero-name-jp">{armor.name}</span>}
          <div className="wd-hero-tags">
            <span className="wd-tag" style={{ background: elColor, color: "#fff" }}>
              {armor.element === "無" ? "無屬性" : armor.element + "屬性"}
            </span>
          </div>
        </div>
      </div>

      {/* 基本資訊 */}
      <div className="wd-section">
        <h2 className="wd-section-title">基本資訊</h2>
        <div className="ad-info-table">
          <div className="ad-info-row">
            <span className="ad-info-label">屬性</span>
            <span className="ad-info-value" style={{ color: elColor }}>
              {armor.element === "無" ? "無屬性" : armor.element + "屬性"}
            </span>
          </div>
          <div className="ad-info-row">
            <span className="ad-info-label">插槽</span>
            <span className="ad-info-value ad-info-slots">{slotsDisplay(armor.slots)}</span>
          </div>
          {zhDecoration && (
            <div className="ad-info-row">
              <span className="ad-info-label">裝飾品<span className="ad-info-sub">(最大強化)</span></span>
              <span className="ad-info-value ad-info-deco">{zhDecoration}</span>
            </div>
          )}
        </div>
      </div>

      {/* 防禦力 */}
      <div className="wd-section">
        <h2 className="wd-section-title">防禦力</h2>
        <div className="ad-def-table">
          <div className="ad-def-header">
            {defLevels.map((_, i) => (
              <span key={i} className="ad-def-lv">Lv{i + 1}</span>
            ))}
          </div>
          <div className="ad-def-values">
            {defLevels.map((d, i) => (
              <span key={i} className={`ad-def-val ${i === defLevels.length - 1 ? "ad-def-max" : ""}`}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 屬性抗性 */}
      <div className="wd-section">
        <h2 className="wd-section-title">屬性抗性</h2>
        <div className="ad-resist-grid">
          {RESIST_ORDER.map((r) => {
            const val = armor[r.key];
            return (
              <div key={r.key} className="ad-resist-card">
                <span className="ad-resist-el" style={{ color: ELEMENT_COLORS[r.label] || "#95a5a6" }}>{r.zh}</span>
                <span className="ad-resist-val" style={{ color: ARMOR_RESIST_COLORS[val] || "#95a5a6" }}>{val}</span>
                <span className="ad-resist-desc" style={{ color: ARMOR_RESIST_COLORS[val] || "#95a5a6" }}>{RESIST_LABEL_ZH[val] || ""}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 防具技能 */}
      {detail && detail.skills.length > 0 && (
        <div className="wd-section">
          <h2 className="wd-section-title">防具技能</h2>
          <div className="ad-detail-skills-list">
            {detail.skills.map((s, i) => (
              <ArmorSkillCard key={i} skill={s} />
            ))}
          </div>
        </div>
      )}

      {/* 必要素材 */}
      {detail && Object.keys(detail.upgradeMaterials).length > 0 && (
        <div className="wd-section">
          <h2 className="wd-section-title">必要素材</h2>
          <div className="wd-upgrade-table">
            {Object.entries(detail.upgradeMaterials).map(([lv, mats]) => (
              <div key={lv} className="wd-upgrade-row">
                <span className="wd-upgrade-lv">Lv.{lv}</span>
                <div className="wd-upgrade-mats">
                  {mats.map((m, i) => (
                    <div key={i} className="wd-upgrade-item">
                      <MaterialLink name={m.name} />
                      <span className="wd-pts">{m.pts}pts</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 素材細節 */}
      {detail && Object.keys(detail.materialDetails).length > 0 && (
        <div className="wd-section">
          <h2 className="wd-section-title">素材細節</h2>
          <div className="wd-mat-detail-grid">
            {Object.entries(detail.materialDetails).map(([category, items]) => {
              return (
                <div key={category} className="wd-mat-detail-group">
                  <div className="wd-mat-detail-cat">
                    <MaterialLink name={category} />
                  </div>
                  {MATERIAL_SOURCES[category] && (
                    <div className="wd-mat-source-info">
                      {MATERIAL_SOURCES[category].sources.map((s, i) => (
                        <span key={i} className={`wd-mat-source-tag wd-mat-source-${s.type}`}>{s.zhDescription}</span>
                      ))}
                    </div>
                  )}
                  <div className="wd-mat-detail-items">
                    {items.map((item, i) => (
                      <div key={i} className="wd-mat-detail-item">
                        <MaterialLink name={item.name} />
                        <span className="wd-mat-detail-pts">{item.pts}pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
