import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { MONSTERS, getRelatedMonsters } from "../data/monsters";
import { getWeakness } from "../data/weakness";
import { getRideAction } from "../data/rideActions";
import { getLocation } from "../data/locations";
import { getGenes } from "../data/genes";
import { geneToZH } from "../data/geneTranslations";
import { GeneDetailModal } from "../components/GeneDetailModal";
import { getBingoBonus } from "../data/bingoBonus";
import { getDamageEffectiveness } from "../data/damageEffectiveness";
import { getStatusEffectiveness, STATUS_LABELS } from "../data/statusEffectiveness";
import { getInvasiveBeast, getInvasiveEvolution, getInvasiveByUnlock, getEvolutionByUnlock, getMutationsFrom, getMutationTo, getTemperedElderInfo } from "../data/invasive";
import { getOtomonStats, OTOMON_STAT_LABELS } from "../data/otomonStats";
import { getHatchingSkills, getHatchingSkillDetail, hatchingSkillToZH, HATCHING_ELEMENT_LABELS } from "../data/hatchingSkills";
import type { HatchingSkillGroup } from "../data/hatchingSkills";
import { MONSTER_KINSHIP, KINSHIP_SKILLS } from "../data/kinshipSkills";
import type { StatusLevel } from "../data/statusEffectiveness";
import { ATTACK_TYPE_COLORS, ELEMENT_COLORS, RESIST_LEVEL_COLORS } from "../types/monster";
import type { ResistLevel } from "../types/monster";
import { AttackTypeIcon } from "../components/AttackTypeIcon";

function ResistBadge({ level }: { level: ResistLevel }) {
  return (
    <span className="resist-badge" style={{ backgroundColor: RESIST_LEVEL_COLORS[level] }}>
      {level}
    </span>
  );
}

function RideActionBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`ride-badge ${active ? "ride-active" : "ride-inactive"}`}>
      {label}
    </span>
  );
}

const STATUS_CELL_CLASSES: Record<string, string> = {
  "⭐": "status-low",
  "⭐⭐": "status-mid",
  "⭐⭐⭐": "status-high",
  "✔": "status-yes",
  "❌": "status-no",
  "❌❌": "status-no",
  "❓": "status-unknown",
  "X": "status-no",
};

function StatusCell({ level }: { level: StatusLevel }) {
  const cls = STATUS_CELL_CLASSES[level] || "";
  return <td className={`status-eff-cell ${cls}`}>{level}</td>;
}

export function MonsterDetailPage() {
  const { monsterId } = useParams<{ monsterId: string }>();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [geneModalGene, setGeneModalGene] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState(0);

  const monster = MONSTERS.find((m) => m.id === monsterId);
  if (!monster) {
    return (
      <div className="detail-not-found">
        <h2>找不到此魔物</h2>
        <button className="back-btn" onClick={() => navigate("/monsters")}>返回圖鑑</button>
      </div>
    );
  }

  const weakness = getWeakness(monster.nameEN);
  const rideAction = getRideAction(monster.nameEN);
  const location = getLocation(monster.nameEN);
  const genes = getGenes(monster.nameEN);
  const relatedMonsters = getRelatedMonsters(monster.nameEN);
  const bingoBonus = getBingoBonus(monster.nameEN);
  const damageEff = getDamageEffectiveness(monster.nameEN);
  const statusEff = getStatusEffectiveness(monster.nameEN);
  const invasiveBeast = getInvasiveBeast(monster.name);
  const invasiveEvo = getInvasiveEvolution(monster.name);
  const invasiveByUnlock = getInvasiveByUnlock(monster.name);
  const evoByUnlock = getEvolutionByUnlock(monster.name);
  const mutationsFrom = getMutationsFrom(monster.name);
  const mutationTo = getMutationTo(monster.name);
  const temperedInfo = getTemperedElderInfo(monster.name);
  const otomonStats = getOtomonStats(monster.nameEN);
  const hatchingSkills = getHatchingSkills(monster.nameEN);
  const kinshipSkillJP = MONSTER_KINSHIP[monster.nameEN];
  const kinshipSkill = kinshipSkillJP ? KINSHIP_SKILLS[kinshipSkillJP] : null;
  const borderColor = ATTACK_TYPE_COLORS[monster.normalAttack] || ATTACK_TYPE_COLORS["-"];

  function monsterLink(nameZH: string) {
    const found = MONSTERS.find((m) => m.name === nameZH);
    if (!found) return <span>{nameZH}</span>;
    return <Link to={`/monsters/${found.id}`} className="inline-monster-link">{nameZH}</Link>;
  }

  const RIDE_LABELS = [
    { key: "fly" as const, label: "飛行" },
    { key: "climb" as const, label: "攀爬" },
    { key: "swim" as const, label: "水上移動" },
    { key: "jump" as const, label: "跳躍" },
    { key: "roar" as const, label: "咆哮" },
    { key: "stealth" as const, label: "隱密移動" },
    { key: "melee" as const, label: "近接攻擊" },
    { key: "breath" as const, label: "吐息攻擊" },
    { key: "burrow" as const, label: "地中移動" },
  ];

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate("/monsters")}>
        ← 返回圖鑑
      </button>

      <div className="detail-hero" style={{ "--card-accent": borderColor } as React.CSSProperties}>
        <div className="detail-icon-wrapper">
          {imgError ? (
            <div className="detail-icon-fallback">{monster.name[0]}</div>
          ) : (
            <img
              src={`${monster.icon}.webp`}
              alt={monster.name}
              className="detail-icon"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="detail-hero-info">
          <div className="detail-name-group">
            <span className="detail-name">{monster.name}</span>
            <span className="detail-name-sub">{monster.nameEN}</span>
            <span className="detail-name-sub detail-name-jp">{monster.nameJP}</span>
          </div>
          <div className="detail-tags">
            <span className="tag species-tag">{monster.species === "-" ? "其他" : monster.species}</span>
            {monster.group !== "一般魔物" && (
              <span className="tag category-tag">{monster.group}</span>
            )}
            {monster.normalAttack !== "-" && (
              <span
                className="tag attack-tag"
                style={{ borderColor: ATTACK_TYPE_COLORS[monster.normalAttack], color: ATTACK_TYPE_COLORS[monster.normalAttack] }}
              >
                <AttackTypeIcon type={monster.normalAttack} size={14} />
                {monster.normalAttack}
              </span>
            )}
          </div>
          {monster.specialAttacks.length > 0 && (
            <div className="detail-specials">
              {monster.specialAttacks.map((sa, i) => (
                <span
                  key={i}
                  className="special-attack"
                  style={{ borderColor: ATTACK_TYPE_COLORS[sa.type] }}
                >
                  <span className="special-condition">[{sa.condition}]</span>
                  <AttackTypeIcon type={sa.type} size={14} />
                  <span className="special-type" style={{ color: ATTACK_TYPE_COLORS[sa.type] }}>{sa.type}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="detail-sections">
        {weakness && (
          <section className="detail-section">
            <h2 className="section-title">屬性弱點</h2>
            <div className="weakness-grid">
              {([
                ["無", "neutral", weakness.neutral],
                ["火", "fire", weakness.fire],
                ["水", "water", weakness.water],
                ["雷", "thunder", weakness.thunder],
                ["氷", "ice", weakness.ice],
                ["龍", "dragon", weakness.dragon],
              ] as [string, string, ResistLevel][]).map(([label, , level]) => (
                <div key={label} className="weakness-item">
                  <span className="weakness-element" style={{ color: ELEMENT_COLORS[label] }}>{label}</span>
                  <ResistBadge level={level} />
                </div>
              ))}
            </div>
          </section>
        )}

        {statusEff && (
          <section className="detail-section">
            <h2 className="section-title">狀態異常耐性</h2>
            <div className="status-eff-table-wrapper">
              <table className="status-eff-table">
                <thead>
                  <tr>
                    {STATUS_LABELS.map(({ key, label, icon }) => (
                      <th key={key}>
                        {icon ? (
                          <div className="status-header-icon">
                            <img src={icon} alt={label} className="status-icon" />
                            <span>{label}</span>
                          </div>
                        ) : (
                          <span>{label}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {STATUS_LABELS.map(({ key }) => (
                      <StatusCell key={key} level={statusEff[key]} />
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {damageEff && (
          <section className="detail-section">
            <h2 className="section-title">傷害效果</h2>
            {damageEff.forms.length > 1 && (
              <div className="dmg-form-tabs">
                {damageEff.forms.map((fd, i) => (
                  <button
                    key={fd.form}
                    className={`dmg-form-tab ${activeForm === i ? "active" : ""}`}
                    onClick={() => setActiveForm(i)}
                  >
                    {fd.form}
                  </button>
                ))}
              </div>
            )}
            {damageEff.forms[activeForm] && (
              <div className="dmg-eff-table-wrapper">
                <table className="dmg-eff-table">
                  <thead>
                    <tr>
                      <th>部位</th>
                      <th>斬擊</th>
                      <th>打擊</th>
                      <th>穿刺</th>
                    </tr>
                  </thead>
                  <tbody>
                    {damageEff.forms[activeForm].parts.map((pt) => (
                      <tr key={pt.part}>
                        <td className="dmg-eff-part">{pt.part}</td>
                        <td className={pt.cutting === "⭐" ? "dmg-eff-yes" : "dmg-eff-no"}>{pt.cutting}</td>
                        <td className={pt.blunt === "⭐" ? "dmg-eff-yes" : "dmg-eff-no"}>{pt.blunt}</td>
                        <td className={pt.piercing === "⭐" ? "dmg-eff-yes" : "dmg-eff-no"}>{pt.piercing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {invasiveBeast && (
          <section className="detail-section">
            <h2 className="section-title">侵獸攻略</h2>
            <div className="invasive-info">
              <div className="invasive-detail-grid">
                <div className="invasive-row">
                  <span className="invasive-label">出現地區</span>
                  <span className="invasive-value">{invasiveBeast.region}</span>
                </div>
                <div className="invasive-row">
                  <span className="invasive-label">出現地點</span>
                  <span className="invasive-value">{invasiveBeast.location}</span>
                </div>
                {invasiveBeast.requirement !== "-" && (
                  <div className="invasive-row">
                    <span className="invasive-label">需求裝備</span>
                    <span className="invasive-value invasive-requirement">{invasiveBeast.requirement}</span>
                  </div>
                )}
                {invasiveBeast.method !== "-" && (
                  <div className="invasive-row">
                    <span className="invasive-label">攻略方式</span>
                    <span className="invasive-value invasive-method">{invasiveBeast.method}</span>
                  </div>
                )}
                <div className="invasive-row">
                  <span className="invasive-label">解鎖危惧種</span>
                  <span className="invasive-value">
                    {invasiveBeast.unlocksMonster}
                    <span className="invasive-sub">{invasiveBeast.unlocksMonsterJP}</span>
                  </span>
                </div>
              </div>
              {invasiveEvo && (invasiveEvo.subSpecies !== "-" || invasiveEvo.deviant !== "-") && (
                <div className="invasive-evolution">
                  <h3 className="invasive-evo-title">可派生突變物種</h3>
                  <div className="evo-chain">
                    {invasiveEvo.subSpecies !== "-" && (
                      <div className="evo-card">
                        <div className="evo-card-type">亞種</div>
                        <div className="evo-card-name">{monsterLink(invasiveEvo.subSpecies)}</div>
                        <div className="evo-card-condition">{invasiveEvo.subSpeciesCondition}</div>
                      </div>
                    )}
                    {invasiveEvo.deviant !== "-" && (
                      <div className="evo-card evo-card-deviant">
                        <div className="evo-card-type">二名</div>
                        <div className="evo-card-name">{monsterLink(invasiveEvo.deviant)}</div>
                        <div className="evo-card-condition">{invasiveEvo.deviantCondition}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {invasiveByUnlock && (
          <section className="detail-section">
            <h2 className="section-title">侵獸來源</h2>
            <div className="invasive-info">
              <div className="invasive-detail-grid">
                <div className="invasive-row">
                  <span className="invasive-label">來源侵獸</span>
                  <span className="invasive-value">{monsterLink(invasiveByUnlock.invasive)}</span>
                </div>
                <div className="invasive-row">
                  <span className="invasive-label">出現地區</span>
                  <span className="invasive-value">{invasiveByUnlock.region}</span>
                </div>
              </div>
              {evoByUnlock && (evoByUnlock.subSpecies !== "-" || evoByUnlock.deviant !== "-") && (
                <div className="invasive-evolution">
                  <h3 className="invasive-evo-title">可派生突變物種</h3>
                  <div className="evo-chain">
                    {evoByUnlock.subSpecies !== "-" && (
                      <div className="evo-card">
                        <div className="evo-card-type">亞種</div>
                        <div className="evo-card-name">{monsterLink(evoByUnlock.subSpecies)}</div>
                        <div className="evo-card-condition">{evoByUnlock.subSpeciesCondition}</div>
                      </div>
                    )}
                    {evoByUnlock.deviant !== "-" && (
                      <div className="evo-card evo-card-deviant">
                        <div className="evo-card-type">二名</div>
                        <div className="evo-card-name">{monsterLink(evoByUnlock.deviant)}</div>
                        <div className="evo-card-condition">{evoByUnlock.deviantCondition}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {(mutationsFrom.length > 0 || mutationTo) && (
          <section className="detail-section">
            <h2 className="section-title">突然變異</h2>
            <div className="mutation-info">
              {mutationTo && (
                <div className="mutation-block">
                  <div className="mutation-header">變異來源</div>
                  <div className="mutation-detail-grid">
                    <div className="mutation-row">
                      <span className="mutation-label">變異元</span>
                      <span className="mutation-value">{mutationTo.source.split(" / ").map((s, i) => (
                        <span key={s}>{i > 0 && " / "}{monsterLink(s)}</span>
                      ))}</span>
                    </div>
                    <div className="mutation-row">
                      <span className="mutation-label">變異條件</span>
                      <span className="mutation-value mutation-condition">{mutationTo.condition}</span>
                    </div>
                  </div>
                </div>
              )}
              {mutationsFrom.length > 0 && (
                <div className="mutation-block">
                  <div className="mutation-header">可變異為</div>
                  <div className="mutation-targets">
                    {mutationsFrom.map((m) => (
                      <div key={m.result} className="mutation-target-card">
                        <div className="mutation-target-name">{monsterLink(m.result)}</div>
                        <div className="mutation-target-jp">{m.resultJP}</div>
                        <div className="mutation-target-condition">{m.condition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {temperedInfo && (
          <section className="detail-section">
            <h2 className="section-title">天變古龍攻略</h2>
            <div className="invasive-info">
              <div className="invasive-detail-grid">
                <div className="invasive-row">
                  <span className="invasive-label">出現地區</span>
                  <span className="invasive-value">{temperedInfo.region}</span>
                </div>
                <div className="invasive-row">
                  <span className="invasive-label">出現地點</span>
                  <span className="invasive-value">{temperedInfo.location}</span>
                </div>
                <div className="invasive-row">
                  <span className="invasive-label">攻擊屬性</span>
                  <span className="invasive-value" style={{ color: ELEMENT_COLORS[temperedInfo.element] || "var(--text-primary)" }}>
                    {temperedInfo.element}
                  </span>
                </div>
                <div className="invasive-row">
                  <span className="invasive-label">可獲得</span>
                  <span className="invasive-value">{temperedInfo.obtainable ? "✓ 可孵蛋" : "✗ 無法取得"}</span>
                </div>
                <div className="invasive-row">
                  <span className="invasive-label">攻略要點</span>
                  <span className="invasive-value invasive-method">{temperedInfo.strategy}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {rideAction && (
          <section className="detail-section">
            <h2 className="section-title">騎乘資訊</h2>
            <div className="ride-info">
              <div className="ride-meta">
                <span className="ride-star">{rideAction.star}</span>
                {rideAction.attackElement !== "無" && (
                  <span className="ride-element" style={{ color: ELEMENT_COLORS[rideAction.attackElement] || "var(--text-secondary)" }}>
                    攻擊屬性: {rideAction.attackElement}
                  </span>
                )}
              </div>
              <div className="ride-actions-grid">
                {RIDE_LABELS.map(({ key, label }) => (
                  <RideActionBadge key={key} label={label} active={rideAction[key]} />
                ))}
              </div>
            </div>
          </section>
        )}

        {otomonStats && (
          <section className="detail-section">
            <h2 className="section-title">能力傾向</h2>
            <div className="otomon-stats-grid">
              {OTOMON_STAT_LABELS.map(({ key, label }) => {
                const val = otomonStats[key];
                return (
                  <div key={key} className="otomon-stat-row">
                    <span className="otomon-stat-label">{label}</span>
                    <div className="otomon-stat-bar-track">
                      <div
                        className="otomon-stat-bar-fill"
                        style={{
                          width: `${val * 10}%`,
                          backgroundColor: val >= 8 ? "#e74c3c" : val >= 6 ? "#f39c12" : val >= 4 ? "#3498db" : "#95a5a6",
                        }}
                      />
                    </div>
                    <span className="otomon-stat-value">{val}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {location && (
          <section className="detail-section">
            <h2 className="section-title">出現場所</h2>
            <div className="location-info">
              <div className="location-row">
                <span className="location-label">地點</span>
                <span className="location-value">
                  {location.locations.split(" / ").map((loc, i) => (
                    <span key={i} className="location-chip">{loc}</span>
                  ))}
                </span>
              </div>
              <div className="location-row">
                <span className="location-label">入手方法</span>
                <span className="location-value">{location.obtainMethod}</span>
              </div>
            </div>
          </section>
        )}

        {bingoBonus && (
          <section className="detail-section">
            <h2 className="section-title">賓果數加成</h2>
            <div className="bingo-grid">
              <div className="bingo-row">
                <span className="bingo-label">2 賓果</span>
                <span className="bingo-value">{bingoBonus.bingo2}</span>
              </div>
              <div className="bingo-row">
                <span className="bingo-label">3 賓果</span>
                <span className="bingo-value">{bingoBonus.bingo3}</span>
              </div>
              <div className="bingo-row">
                <span className="bingo-label">5 賓果</span>
                <span className="bingo-value">{bingoBonus.bingo5}</span>
              </div>
            </div>
          </section>
        )}

        <section className="detail-section">
          <h2 className="section-title">羈絆基因</h2>
          {genes === null ? (
            <p className="pending-text">待補充</p>
          ) : (
            <div className="genes-list">
              {genes.map((gene) => (
                <button
                  key={gene}
                  className={`gene-chip ${geneModalGene === gene ? "expanded" : ""}`}
                  onClick={() => setGeneModalGene(gene)}
                >
                  <span className="gene-chip-zh">{geneToZH(gene)}</span>
                  <span className="gene-chip-jp">{gene}</span>
                </button>
              ))}
            </div>
          )}
          {geneModalGene && (
            <GeneDetailModal gene={geneModalGene} onClose={() => setGeneModalGene(null)} />
          )}
        </section>

        {kinshipSkill && (
          <section className="detail-section">
            <h2 className="section-title">絆技</h2>
            <div className="kinship-skill-card">
              <div className="kinship-skill-header">
                <span className="kinship-skill-zh">{kinshipSkill.nameZH}</span>
                <span className="kinship-skill-jp">{kinshipSkill.nameJP}</span>
                <span className="kinship-skill-element" style={{ color: ELEMENT_COLORS[kinshipSkill.element] || "#95a5a6" }}>{kinshipSkill.element}</span>
              </div>
              <div className="kinship-skill-body">
                <span className="kinship-skill-target">{kinshipSkill.target}</span>
                <span className="kinship-skill-effect">{kinshipSkill.effect}</span>
              </div>
              <div className="kinship-skill-stats">
                <span>威力 {kinshipSkill.power}</span>
                <span>破龍力 {kinshipSkill.dragonBreak}</span>
              </div>
            </div>
          </section>
        )}

        {hatchingSkills && (
          <section className="detail-section">
            <h2 className="section-title">孵技</h2>
            <p className="hatching-hint">依據孵蛋時的區域屬性，該魔物會學會不同的孵技。</p>
            <div className="hatching-skills-grid">
              {HATCHING_ELEMENT_LABELS.map(({ key, label, color }) => {
                const skillJP = hatchingSkills[key as keyof HatchingSkillGroup];
                const detail = getHatchingSkillDetail(skillJP);
                return (
                  <div key={key} className="hatching-skill-card">
                    <div className="hatching-skill-element" style={{ color }}>{label}</div>
                    <div className="hatching-skill-info">
                      <span className="hatching-skill-zh">{hatchingSkillToZH(skillJP)}</span>
                      <span className="hatching-skill-jp">{skillJP}</span>
                      {detail && (
                        <span className="hatching-skill-effect">{detail.effect}</span>
                      )}
                    </div>
                    {detail && detail.power !== "-" && (
                      <div className="hatching-skill-stats">
                        <span>ST {detail.stCost}</span>
                        <span>威力 {detail.power}</span>
                        <span>破龍 {detail.dragonBreak}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {relatedMonsters.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">相關魔物</h2>
            <div className="related-monsters-grid">
              {relatedMonsters.map((rm) => (
                <Link key={rm.id} to={`/monsters/${rm.id}`} className="related-monster-card">
                  <img
                    src={`${rm.icon}.webp`}
                    alt={rm.name}
                    className="related-monster-icon"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="related-monster-info">
                    <span className="related-monster-name">{rm.name}</span>
                    <span className="related-monster-en">{rm.nameEN}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
