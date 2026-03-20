import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Monster } from "../types/monster";
import { ATTACK_TYPE_COLORS } from "../types/monster";
import { AttackTypeIcon } from "./AttackTypeIcon";

interface MonsterCardProps {
  monster: Monster;
}

export const MonsterCard = memo(function MonsterCard({ monster }: MonsterCardProps) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const borderColor = ATTACK_TYPE_COLORS[monster.normalAttack] || ATTACK_TYPE_COLORS["-"];

  return (
    <div
      className="monster-card"
      style={{ "--card-accent": borderColor } as React.CSSProperties}
      onClick={() => navigate(`/monsters/${monster.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(`/monsters/${monster.id}`); }}
    >
      <div className="card-icon-wrapper">
        {imgError ? (
          <div className="card-icon-fallback">{monster.name[0]}</div>
        ) : (
          <img
            src={`${monster.icon}.webp`}
            alt={monster.name}
            className="card-icon"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="card-body">
        <div className="card-name-group">
          <span className="card-name">{monster.name}</span>
          <span className="card-name-en">{monster.nameEN}</span>
          <span className="card-name-jp">{monster.nameJP}</span>
        </div>
        <div className="card-tags">
          <span className="tag species-tag">{monster.species === "-" ? "其他" : monster.species}</span>
          {monster.normalAttack !== "-" && (
            <span
              className="tag attack-tag"
              style={{
                borderColor: ATTACK_TYPE_COLORS[monster.normalAttack],
                color: ATTACK_TYPE_COLORS[monster.normalAttack],
              }}
            >
              <AttackTypeIcon type={monster.normalAttack} size={12} />
              {monster.normalAttack}
            </span>
          )}
        </div>
        {monster.specialAttacks.length > 0 && (
          <div className="card-specials">
            {monster.specialAttacks.map((sa, i) => (
              <span
                key={i}
                className="special-attack"
                style={{ borderColor: ATTACK_TYPE_COLORS[sa.type] }}
              >
                <span className="special-condition">[{sa.condition}]</span>
                <AttackTypeIcon type={sa.type} size={12} />
                <span className="special-type" style={{ color: ATTACK_TYPE_COLORS[sa.type] }}>
                  {sa.type}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
