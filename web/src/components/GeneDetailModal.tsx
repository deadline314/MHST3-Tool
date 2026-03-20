import { Link } from "react-router-dom";
import { geneToZH } from "../data/geneTranslations";
import { getGeneDetail } from "../data/geneDetails";
import { getMonstersWithGene } from "../data/genes";
import { MONSTERS } from "../data/monsters";
import { ATTACK_TYPE_COLORS, ELEMENT_COLORS } from "../types/monster";
import type { AttackType } from "../types/monster";
import { AttackTypeIcon } from "./AttackTypeIcon";

interface GeneDetailModalProps {
  gene: string;
  onClose: () => void;
}

export function GeneDetailModal({ gene, onClose }: GeneDetailModalProps) {
  const detail = getGeneDetail(gene);
  const monsters = getMonstersWithGene(gene).map((en) => MONSTERS.find((m) => m.nameEN === en)).filter(Boolean);

  return (
    <div className="gene-modal-overlay" onClick={onClose}>
      <div className="gene-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gene-modal-close" onClick={onClose} aria-label="關閉">✕</button>
        <div className="gene-modal-header">
          <h2 className="gene-modal-title">
            <span className="gene-modal-zh">{geneToZH(gene)}</span>
            <span className="gene-modal-jp">{gene}</span>
          </h2>
        </div>
        <div className="gene-modal-body">
          {detail ? (
            <>
              <div className="gene-detail-badges">
                {["力量", "速度", "技巧"].includes(detail.type) && (
                  <span className="gene-badge gene-badge-type" style={{ backgroundColor: `${ATTACK_TYPE_COLORS[detail.type as AttackType]}22`, color: ATTACK_TYPE_COLORS[detail.type as AttackType] }}>
                    <AttackTypeIcon type={detail.type as AttackType} size={12} />
                    {detail.type}
                  </span>
                )}
                <span className="gene-badge gene-badge-element" style={{ backgroundColor: `${ELEMENT_COLORS[detail.element] || "#95a5a6"}22`, color: ELEMENT_COLORS[detail.element] || "#95a5a6" }}>
                  {detail.element}
                </span>
                <span className="gene-badge gene-badge-skill">{detail.skillType}</span>
                {detail.target && <span className="gene-badge gene-badge-target">{detail.target}</span>}
              </div>
              {detail.skillType === "主動" && (detail.stCost !== undefined || detail.power !== undefined || detail.dragonBreak !== undefined || detail.learnLv !== undefined) && (
                <div className="gene-detail-stats">
                  {detail.stCost !== undefined && (
                    <div className="gene-stat">
                      <span className="gene-stat-label">耐力</span>
                      <span className="gene-stat-value">{detail.stCost}</span>
                    </div>
                  )}
                  {detail.power !== undefined && detail.power !== "-" && (
                    <div className="gene-stat">
                      <span className="gene-stat-label">威力</span>
                      <span className="gene-stat-value">{detail.power}</span>
                    </div>
                  )}
                  {detail.dragonBreak !== undefined && detail.dragonBreak !== "-" && (
                    <div className="gene-stat">
                      <span className="gene-stat-label">破龍</span>
                      <span className="gene-stat-value">{detail.dragonBreak}</span>
                    </div>
                  )}
                  {detail.learnLv !== undefined && (
                    <div className="gene-stat">
                      <span className="gene-stat-label">習得</span>
                      <span className="gene-stat-value">Lv.{detail.learnLv}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="gene-detail-effect-card">
                <span className="gene-effect-label">效果</span>
                <p className="gene-effect-text">{detail.effect}</p>
              </div>
            </>
          ) : (
            <p className="gene-modal-no-detail">此基因的詳細資料尚待補充。</p>
          )}
          {monsters.length > 0 && (
            <div className="gene-modal-monsters">
              <h3 className="gene-modal-subtitle">擁有此基因的魔物</h3>
              <div className="gene-modal-monster-grid">
                {monsters.map((m) =>
                  m ? (
                    <Link key={m.id} to={`/monsters/${m.id}`} className="gene-modal-monster-card" onClick={onClose}>
                      <img src={`${m.icon}.webp`} alt={m.name} className="gene-modal-monster-icon" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <span>{m.name}</span>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
