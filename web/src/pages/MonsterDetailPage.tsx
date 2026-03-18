import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { MONSTERS } from "../data/monsters";
import { getWeakness } from "../data/weakness";
import { getRideAction } from "../data/rideActions";
import { getLocation } from "../data/locations";
import { getGenes } from "../data/genes";
import { getMonstersWithGene } from "../data/genes";
import { geneToZH } from "../data/geneTranslations";
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

export function MonsterDetailPage() {
  const { monsterId } = useParams<{ monsterId: string }>();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [expandedGene, setExpandedGene] = useState<string | null>(null);

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
  const borderColor = ATTACK_TYPE_COLORS[monster.normalAttack] || ATTACK_TYPE_COLORS["-"];

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
              src={monster.icon}
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

        <section className="detail-section">
          <h2 className="section-title">羈絆基因</h2>
          {genes === null ? (
            <p className="pending-text">待補充</p>
          ) : (
            <div className="genes-list">
              {genes.map((gene) => (
                <div key={gene} className="gene-item-wrapper">
                  <button
                    className={`gene-chip ${expandedGene === gene ? "expanded" : ""}`}
                    onClick={() => setExpandedGene(expandedGene === gene ? null : gene)}
                  >
                    <span className="gene-chip-zh">{geneToZH(gene)}</span>
                    <span className="gene-chip-jp">{gene}</span>
                  </button>
                  {expandedGene === gene && (
                    <div className="gene-monsters-dropdown">
                      <p className="gene-monsters-title">擁有此基因的魔物：</p>
                      {getMonstersWithGene(gene).map((enName) => {
                        const m = MONSTERS.find((mon) => mon.nameEN === enName);
                        if (!m) return <span key={enName}>{enName}</span>;
                        return (
                          <Link key={m.id} to={`/monsters/${m.id}`} className="gene-monster-link">
                            {m.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
