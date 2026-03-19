import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUniqueGenes, getGenes } from "../data/genes";
import { MONSTERS } from "../data/monsters";
import { matchSearch } from "../utils/search";
import { geneToZH } from "../data/geneTranslations";
import { getGeneDetail } from "../data/geneDetails";
import { GeneDetailModal } from "../components/GeneDetailModal";
import { AttackTypeIcon } from "../components/AttackTypeIcon";
import { ATTACK_TYPE_COLORS, ELEMENT_COLORS } from "../types/monster";
import type { AttackType } from "../types/monster";

const GRID_SIZE = 9;

const GENE_TYPES = ["力量", "速度", "技巧", "無"] as const;
const GENE_ELEMENTS = ["無屬性", "火屬性", "水屬性", "雷屬性", "氷屬性", "龍屬性"] as const;
const GENE_SKILL_TYPES = ["主動", "被動"] as const;
const GENE_TARGETS = ["敵單體", "敵全體", "自身", "我方全體", "敵隨機"] as const;
const GENE_QUERY_COLLAPSED_HEIGHT = 108;

interface GeneSlot {
  gene: string | null;
}

interface GeneFilters {
  types: Set<string>;
  elements: Set<string>;
  skillTypes: Set<string>;
  targets: Set<string>;
}

const EMPTY_GENE_FILTERS: GeneFilters = {
  types: new Set(),
  elements: new Set(),
  skillTypes: new Set(),
  targets: new Set(),
};

function toggleSetItem<T>(set: Set<T>, item: T): Set<T> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

export function GenePlannerPage() {
  const [slots, setSlots] = useState<GeneSlot[]>(Array.from({ length: GRID_SIZE }, () => ({ gene: null })));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [geneSearch, setGeneSearch] = useState("");
  const [geneModalGene, setGeneModalGene] = useState<string | null>(null);
  const [monsterSearch, setMonsterSearch] = useState("");
  const [geneFilters, setGeneFilters] = useState<GeneFilters>(EMPTY_GENE_FILTERS);
  const [geneFilterExpanded, setGeneFilterExpanded] = useState(false);
  const [geneQueryExpanded, setGeneQueryExpanded] = useState(false);
  const geneListRef = useRef<HTMLDivElement>(null);
  const [needsCollapse, setNeedsCollapse] = useState(false);

  const allGenes = useMemo(() => getUniqueGenes(), []);

  const filteredGenes = useMemo(() => {
    if (!geneSearch) return allGenes;
    const q = geneSearch.toLowerCase();
    return allGenes.filter((g) => g.toLowerCase().includes(q) || geneToZH(g).toLowerCase().includes(q));
  }, [allGenes, geneSearch]);

  const assignGene = useCallback((slotIndex: number, gene: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = { gene };
      return next;
    });
    setSelectedSlot(null);
  }, []);

  const clearSlot = useCallback((slotIndex: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = { gene: null };
      return next;
    });
  }, []);

  const clearAllSlots = useCallback(() => {
    setSlots(Array.from({ length: GRID_SIZE }, () => ({ gene: null })));
  }, []);

  const usedGenes = useMemo(() => {
    return new Set(slots.filter((s) => s.gene).map((s) => s.gene!));
  }, [slots]);

  const geneFilterActiveCount = geneFilters.types.size + geneFilters.elements.size + geneFilters.skillTypes.size + geneFilters.targets.size;

  const queryGenes = useMemo(() => {
    const base = usedGenes.size > 0 ? allGenes.filter((g) => usedGenes.has(g)) : allGenes;
    if (geneFilterActiveCount === 0) return base;

    return base.filter((gene) => {
      const detail = getGeneDetail(gene);
      if (!detail) return geneFilterActiveCount === 0;
      if (geneFilters.types.size > 0 && !geneFilters.types.has(detail.type)) return false;
      if (geneFilters.elements.size > 0 && !geneFilters.elements.has(detail.element)) return false;
      if (geneFilters.skillTypes.size > 0 && !geneFilters.skillTypes.has(detail.skillType)) return false;
      if (geneFilters.targets.size > 0 && !(detail.target && geneFilters.targets.has(detail.target))) return false;
      return true;
    });
  }, [allGenes, usedGenes, geneFilters, geneFilterActiveCount]);

  useEffect(() => {
    if (!geneListRef.current) return;
    setNeedsCollapse(geneListRef.current.scrollHeight > GENE_QUERY_COLLAPSED_HEIGHT);
  }, [queryGenes]);

  const clearGeneFilters = useCallback(() => setGeneFilters(EMPTY_GENE_FILTERS), []);

  const filteredMonsters = useMemo(() => {
    return MONSTERS.filter((m) => {
      const genes = getGenes(m.nameEN);
      if (!genes || genes.length === 0) return false;
      if (monsterSearch && !matchSearch(monsterSearch, m.name, m.nameEN, m.nameJP)) return false;
      return true;
    });
  }, [monsterSearch]);

  return (
    <div className="gene-planner">
      <div className="gene-planner-layout">
        <div className="gene-grid-section">
          <h2 className="section-title">基因格 (3×3)</h2>
          <div className="gene-grid">
            {slots.map((slot, i) => (
              <div
                key={i}
                className={`gene-slot ${selectedSlot === i ? "selected" : ""} ${slot.gene ? "filled" : ""}`}
                onClick={() => setSelectedSlot(selectedSlot === i ? null : i)}
              >
                {slot.gene ? (
                  <div className="gene-slot-content">
                    <span className="gene-slot-name">{geneToZH(slot.gene)}</span>
                    <span className="gene-slot-jp">{slot.gene}</span>
                    <button
                      className="gene-slot-clear"
                      onClick={(e) => { e.stopPropagation(); clearSlot(i); }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="gene-slot-empty">+</span>
                )}
              </div>
            ))}
          </div>
          <button className="clear-filters-btn" onClick={clearAllSlots} style={{ marginTop: 12 }}>
            清空全部基因格
          </button>

          {selectedSlot !== null && (
            <div className="gene-picker">
              <h3 className="gene-picker-title">選擇基因（格位 {selectedSlot + 1}）</h3>
              <input
                className="gene-search-input"
                placeholder="搜尋基因名稱..."
                value={geneSearch}
                onChange={(e) => setGeneSearch(e.target.value)}
              />
              <div className="gene-picker-list">
                {filteredGenes.map((gene) => (
                  <button
                    key={gene}
                    className={`gene-picker-item ${usedGenes.has(gene) ? "used" : ""}`}
                    onClick={() => assignGene(selectedSlot, gene)}
                  >
                    <span className="gene-picker-zh">{geneToZH(gene)}</span>
                    <span className="gene-picker-jp">{gene}</span>
                    {usedGenes.has(gene) && <span className="gene-used-label">已使用</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="gene-info-section">
          <div className="gene-filter-panel">
            <div className="filter-section">
              <div className="filter-header">
                <h3 className="filter-title">基因類型</h3>
                <button
                  className="filter-expand-btn"
                  onClick={() => setGeneFilterExpanded(!geneFilterExpanded)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
                  {geneFilterExpanded ? "收起篩選" : "展開更多篩選"}
                  {!geneFilterExpanded && geneFilterActiveCount > 0 && (
                    <span className="filter-badge-count">{geneFilterActiveCount}</span>
                  )}
                </button>
              </div>
              <div className="filter-chips">
                {GENE_TYPES.map((type) => (
                  <button
                    key={type}
                    className={`chip attack-chip ${geneFilters.types.has(type) ? "active" : ""}`}
                    style={
                      geneFilters.types.has(type) && type !== "無"
                        ? { borderColor: ATTACK_TYPE_COLORS[type], color: ATTACK_TYPE_COLORS[type], backgroundColor: `${ATTACK_TYPE_COLORS[type]}18` }
                        : geneFilters.types.has(type) ? { borderColor: "#95a5a6", color: "#95a5a6", backgroundColor: "rgba(149,165,166,0.1)" } : {}
                    }
                    onClick={() => setGeneFilters((f) => ({ ...f, types: toggleSetItem(f.types, type) }))}
                  >
                    {type !== "無" && <AttackTypeIcon type={type as AttackType} size={14} />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {geneFilterExpanded && (
              <>
                <div className="filter-section">
                  <h3 className="filter-title">屬性</h3>
                  <div className="filter-chips">
                    {GENE_ELEMENTS.map((el) => {
                      const color = ELEMENT_COLORS[el] || "#95a5a6";
                      return (
                        <button
                          key={el}
                          className={`chip ride-element-chip ${geneFilters.elements.has(el) ? "active" : ""}`}
                          style={
                            geneFilters.elements.has(el)
                              ? { borderColor: color, color, backgroundColor: `${color}18` }
                              : {}
                          }
                          onClick={() => setGeneFilters((f) => ({ ...f, elements: toggleSetItem(f.elements, el) }))}
                        >
                          {el.replace("屬性", "")}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="filter-section">
                  <h3 className="filter-title">技能類別</h3>
                  <div className="filter-chips">
                    {GENE_SKILL_TYPES.map((st) => (
                      <button
                        key={st}
                        className={`chip category-chip ${geneFilters.skillTypes.has(st) ? "active" : ""}`}
                        onClick={() => setGeneFilters((f) => ({ ...f, skillTypes: toggleSetItem(f.skillTypes, st) }))}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-section">
                  <h3 className="filter-title">目標</h3>
                  <div className="filter-chips">
                    {GENE_TARGETS.map((tgt) => (
                      <button
                        key={tgt}
                        className={`chip location-chip ${geneFilters.targets.has(tgt) ? "active" : ""}`}
                        onClick={() => setGeneFilters((f) => ({ ...f, targets: toggleSetItem(f.targets, tgt) }))}
                      >
                        {tgt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {geneFilterActiveCount > 0 && (
              <button className="clear-filters-btn" onClick={clearGeneFilters}>
                清除基因篩選
              </button>
            )}
          </div>

          <div className="gene-query-section">
            <div className="filter-header">
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                基因查詢
                <span className="gene-query-count">{queryGenes.length}</span>
              </h2>
            </div>
            <p className="gene-info-hint">
              {usedGenes.size > 0
                ? "已篩選為九宮格上的基因，點選查看詳細資訊"
                : "點選基因查看類型、屬性、效果與擁有魔物"}
            </p>
            <div
              ref={geneListRef}
              className={`gene-all-list ${!geneQueryExpanded && needsCollapse ? "collapsed" : ""}`}
              style={!geneQueryExpanded && needsCollapse ? { maxHeight: GENE_QUERY_COLLAPSED_HEIGHT } : undefined}
            >
              {queryGenes.map((gene) => {
                const detail = getGeneDetail(gene);
                const typeColor = detail && detail.type !== "無" ? ATTACK_TYPE_COLORS[detail.type] : undefined;
                const elColor = detail ? ELEMENT_COLORS[detail.element] : undefined;
                return (
                  <button
                    key={gene}
                    className={`gene-chip gene-chip-enhanced ${geneModalGene === gene ? "expanded" : ""}`}
                    onClick={() => setGeneModalGene(gene)}
                  >
                    {typeColor && <span className="gene-chip-dot" style={{ backgroundColor: typeColor }} />}
                    <span className="gene-chip-zh">{geneToZH(gene)}</span>
                    {elColor && detail?.element !== "無屬性" && (
                      <span className="gene-chip-element" style={{ color: elColor }}>{detail!.element.replace("屬性", "")}</span>
                    )}
                  </button>
                );
              })}
            </div>
            {needsCollapse && (
              <button
                className="filter-expand-btn gene-query-toggle"
                onClick={() => setGeneQueryExpanded(!geneQueryExpanded)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {geneQueryExpanded
                    ? <polyline points="18 15 12 9 6 15" />
                    : <polyline points="6 9 12 15 18 9" />
                  }
                </svg>
                {geneQueryExpanded ? "收起" : `展開全部 (${queryGenes.length})`}
              </button>
            )}
          </div>

          {geneModalGene && (
            <GeneDetailModal gene={geneModalGene} onClose={() => setGeneModalGene(null)} />
          )}

          <h2 className="section-title" style={{ marginTop: 24 }}>魔物基因一覽</h2>
          <input
            className="gene-search-input"
            placeholder="搜尋魔物名稱..."
            value={monsterSearch}
            onChange={(e) => setMonsterSearch(e.target.value)}
          />
          <div className="monster-gene-list">
            {filteredMonsters.map((m) => {
              const genes = getGenes(m.nameEN);
              return (
                <div key={m.id} className="monster-gene-row">
                  <Link to={`/monsters/${m.id}`} className="monster-gene-name">
                    <img src={m.icon} alt={m.name} className="mini-icon" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    {m.name}
                  </Link>
                  <div className="monster-gene-chips">
                    {genes ? genes.map((g) => (
                      <button
                        key={g}
                        className="gene-chip-sm"
                        onClick={() => setGeneModalGene(g)}
                      >
                        {geneToZH(g)}
                      </button>
                    )) : <span className="pending-text">待補充</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
