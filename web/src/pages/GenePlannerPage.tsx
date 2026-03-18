import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { getUniqueGenes, getMonstersWithGene, getGenes } from "../data/genes";
import { MONSTERS } from "../data/monsters";
import { matchSearch } from "../utils/search";
import { geneToZH } from "../data/geneTranslations";

const GRID_SIZE = 9;

interface GeneSlot {
  gene: string | null;
}

export function GenePlannerPage() {
  const [slots, setSlots] = useState<GeneSlot[]>(Array.from({ length: GRID_SIZE }, () => ({ gene: null })));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [geneSearch, setGeneSearch] = useState("");
  const [selectedGeneInfo, setSelectedGeneInfo] = useState<string | null>(null);
  const [monsterSearch, setMonsterSearch] = useState("");

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

  const monstersForGeneInfo = useMemo(() => {
    if (!selectedGeneInfo) return [];
    return getMonstersWithGene(selectedGeneInfo).map((enName) => {
      return MONSTERS.find((m) => m.nameEN === enName);
    }).filter(Boolean);
  }, [selectedGeneInfo]);

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
          <h2 className="section-title">基因查詢</h2>
          <p className="gene-info-hint">點選基因名稱來查看擁有該基因的魔物</p>
          <div className="gene-all-list">
            {allGenes.map((gene) => (
              <button
                key={gene}
                className={`gene-chip ${selectedGeneInfo === gene ? "expanded" : ""}`}
                onClick={() => setSelectedGeneInfo(selectedGeneInfo === gene ? null : gene)}
              >
                <span className="gene-chip-zh">{geneToZH(gene)}</span>
              </button>
            ))}
          </div>

          {selectedGeneInfo && (
            <div className="gene-detail-panel">
              <h3 className="gene-detail-title">
                <span className="gene-title-zh">{geneToZH(selectedGeneInfo)}</span>
                <span className="gene-title-jp">{selectedGeneInfo}</span>
              </h3>
              <p className="gene-detail-subtitle">擁有此基因的魔物：</p>
              <div className="gene-monster-grid">
                {monstersForGeneInfo.map((m) =>
                  m ? (
                    <Link key={m.id} to={`/monsters/${m.id}`} className="gene-monster-card">
                      <img src={m.icon} alt={m.name} className="gene-monster-icon" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <span>{m.name}</span>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
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
                        onClick={() => setSelectedGeneInfo(g)}
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
