import { useParams, Link } from "react-router-dom";
import { WEAPONS } from "../data/weapons";
import { WEAPON_DETAILS } from "../data/weaponDetails";
import { MATERIAL_SOURCES } from "../data/materialSources";
import { WeaponTypeIcon } from "../components/WeaponTypeIcon";
import {
  translateSkillName,
  translateEffect,
  translateWeaponName,
  translateMaterialName,
  findMonsterForMaterial,
  TARGET_ZH,
  SKILL_TYPE_ZH,
} from "../data/weaponTranslations";
import { ELEMENT_COLORS } from "../types/monster";
import type { WeaponSkill } from "../types/monster";

function slotsDisplay(s: { lv1: number; lv2: number; lv3: number }): string {
  const parts: string[] = [];
  for (let i = 0; i < s.lv3; i++) parts.push("③");
  for (let i = 0; i < s.lv2; i++) parts.push("②");
  for (let i = 0; i < s.lv1; i++) parts.push("①");
  return parts.length > 0 ? parts.join(" ") : "-";
}

function SkillCard({ skill }: { skill: WeaponSkill }) {
  const isActive = skill.skillType === "アクティブ";
  const zhName = translateSkillName(skill.name);
  const zhTarget = TARGET_ZH[skill.target] || skill.target;
  const zhType = SKILL_TYPE_ZH[skill.skillType] || skill.skillType;
  const zhEffect = translateEffect(skill.effect);

  return (
    <div className={`wd-skill-card ${isActive ? "wd-skill-active" : "wd-skill-passive"}`}>
      <div className="wd-skill-top">
        <div className="wd-skill-name-col">
          <span className="wd-skill-name-zh">{zhName}</span>
          {zhName !== skill.name && <span className="wd-skill-name-jp">{skill.name}</span>}
        </div>
        <div className="wd-skill-badges">
          <span className={`wd-badge ${isActive ? "wd-badge-active" : "wd-badge-passive"}`}>{zhType}</span>
          {skill.target !== "-" && <span className="wd-badge wd-badge-target">{zhTarget}</span>}
        </div>
      </div>
      {isActive && (
        <div className="wd-skill-stat-bar">
          <div className="wd-skill-stat-item">
            <span className="wd-skill-stat-icon wd-icon-st">⚡</span>
            <div className="wd-skill-stat-info">
              <span className="wd-skill-stat-label">耐力</span>
              <span className="wd-skill-stat-val">{skill.stCost}</span>
            </div>
          </div>
          <div className="wd-skill-stat-divider" />
          <div className="wd-skill-stat-item">
            <span className="wd-skill-stat-icon wd-icon-power">⚔</span>
            <div className="wd-skill-stat-info">
              <span className="wd-skill-stat-label">威力</span>
              <span className="wd-skill-stat-val">{skill.power || "-"}</span>
            </div>
          </div>
          <div className="wd-skill-stat-divider" />
          <div className="wd-skill-stat-item">
            <span className="wd-skill-stat-icon wd-icon-db">🐉</span>
            <div className="wd-skill-stat-info">
              <span className="wd-skill-stat-label">破龍力</span>
              <span className="wd-skill-stat-val">{skill.dragonBreak || "-"}</span>
            </div>
          </div>
        </div>
      )}
      <div className="wd-skill-effect">
        <span className="wd-skill-effect-zh">{zhEffect}</span>
        {zhEffect !== skill.effect && <span className="wd-skill-effect-jp">{skill.effect}</span>}
      </div>
    </div>
  );
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

export function WeaponDetailPage() {
  const { weaponName } = useParams<{ weaponName: string }>();
  const decodedName = weaponName ? decodeURIComponent(weaponName) : "";
  const weapon = WEAPONS.find((w) => w.name === decodedName);
  const detail = decodedName ? WEAPON_DETAILS[decodedName] : undefined;

  if (!weapon) {
    return (
      <div className="wd-not-found">
        <h2>找不到武器</h2>
        <Link to="/equipment" className="wd-back-link">← 返回裝備檢索</Link>
      </div>
    );
  }

  const elColor = ELEMENT_COLORS[weapon.element] || ELEMENT_COLORS["無"];
  const hasUpgrade = detail && Object.keys(detail.upgradeMaterials).length > 0;
  const hasMaterialDetails = detail && Object.keys(detail.materialDetails).length > 0;

  return (
    <div className="wd-page">
      <Link to="/equipment" className="wd-back-link">← 裝備檢索</Link>

      <div className="wd-hero" style={{ borderColor: elColor }}>
        <div className="wd-hero-icon">
          <WeaponTypeIcon type={weapon.weaponType} size={64} />
        </div>
        <div className="wd-hero-info">
          <h1 className="wd-hero-name">{translateWeaponName(weapon.name)}</h1>
          {translateWeaponName(weapon.name) !== weapon.name && (
            <span className="wd-hero-name-jp">{weapon.name}</span>
          )}
          <div className="wd-hero-tags">
            <span className="wd-tag wd-tag-type">{weapon.weaponType}</span>
            <span className="wd-tag" style={{ background: elColor, color: "#fff" }}>
              {weapon.element === "無" ? "無屬性" : weapon.element + "屬性"}
            </span>
            {weapon.statusAilment !== "-" && (
              <span className="wd-tag wd-tag-status">{weapon.statusAilment} {weapon.statusValue}</span>
            )}
          </div>
        </div>
      </div>

      <div className="wd-section">
        <h2 className="wd-section-title">基本數值</h2>
        <div className="wd-stats-grid">
          <div className="wd-stat-box">
            <span className="wd-stat-label">攻擊力</span>
            <span className="wd-stat-value wd-stat-atk">{weapon.attack}</span>
            {detail && detail.statsPerLevel.length > 1 && (
              <div className="wd-stat-levels">
                {detail.statsPerLevel.map((v, i) => (
                  <span key={i} className="wd-stat-lv">Lv.{i + 1}: <b>{v}</b></span>
                ))}
              </div>
            )}
          </div>
          <div className="wd-stat-box">
            <span className="wd-stat-label">會心率</span>
            <span className="wd-stat-value wd-stat-aff">{weapon.affinity > 0 ? `${Math.round(weapon.affinity * 100)}%` : "0"}</span>
          </div>
          <div className="wd-stat-box">
            <span className="wd-stat-label">破龍力</span>
            <span className="wd-stat-value">{weapon.dragonBreak}</span>
          </div>
          {weapon.defense > 0 && (
            <div className="wd-stat-box">
              <span className="wd-stat-label">防禦力</span>
              <span className="wd-stat-value">+{weapon.defense}</span>
            </div>
          )}
          <div className="wd-stat-box">
            <span className="wd-stat-label">插槽</span>
            <span className="wd-stat-value wd-stat-slots">{slotsDisplay(weapon.slots)}</span>
          </div>
        </div>
      </div>

      {detail && detail.skills.length > 0 && (
        <div className="wd-section">
          <h2 className="wd-section-title">武器技能</h2>
          <div className="wd-skills-grid">
            {detail.skills.map((s, i) => <SkillCard key={i} skill={s} />)}
          </div>
        </div>
      )}

      {hasUpgrade && (
        <div className="wd-section">
          <h2 className="wd-section-title">強化素材</h2>
          <div className="wd-upgrade-table">
            {Object.entries(detail!.upgradeMaterials).map(([lv, mats]) => (
              <div key={lv} className="wd-upgrade-row">
                <div className="wd-upgrade-lv">Lv.{lv}</div>
                <div className="wd-upgrade-items">
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

      {hasMaterialDetails && (
        <div className="wd-section">
          <h2 className="wd-section-title">素材細節</h2>
          <div className="wd-mat-detail-table">
            {Object.entries(detail!.materialDetails).map(([cat, items]) => (
              <div key={cat} className="wd-mat-group">
                <div className="wd-mat-group-name"><MaterialLink name={cat} /></div>
                {MATERIAL_SOURCES[cat] && (
                  <div className="wd-mat-source-info">
                    {MATERIAL_SOURCES[cat].sources.map((s, i) => (
                      <span key={i} className={`wd-mat-source-tag wd-mat-source-${s.type}`}>{s.zhDescription}</span>
                    ))}
                  </div>
                )}
                <div className="wd-mat-group-items">
                  {items.map((item, i) => (
                    <div key={i} className="wd-mat-detail-item">
                      <span className="wd-mat-item-name">{translateMaterialName(item.name)}</span>
                      <span className="wd-pts">{item.pts}pts</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
