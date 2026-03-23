import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUniqueGenes, getGenes } from "../data/genes";
import { MONSTERS } from "../data/monsters";
import { matchSearch } from "../utils/search";
import { geneToZH } from "../data/geneTranslations";
import { getGeneDetail, getGeneStatusTags, ALL_STATUS_TAGS } from "../data/geneDetails";
import { GeneDetailModal } from "../components/GeneDetailModal";
import { AttackTypeIcon } from "../components/AttackTypeIcon";
import { ATTACK_TYPE_COLORS, ELEMENT_COLORS } from "../types/monster";
import type { AttackType } from "../types/monster";
import { getBingoBonus } from "../data/bingoBonus";
import { getOtomonStats, OTOMON_STAT_LABELS, isOtomon } from "../data/otomonStats";
import type { OtomonStats } from "../data/otomonStats";
import { getHatchingSkills, hatchingSkillToZH, getHatchingSkillDetail, getAllHatchingSkillNames, isHatchingSkill } from "../data/hatchingSkills";

const GRID_SIZE = 9;
const RAINBOW_GENE = "__rainbow__";
const RAINBOW_LABEL = "彩色基因";

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
  statusTags: Set<string>;
}

const EMPTY_GENE_FILTERS: GeneFilters = {
  types: new Set(),
  elements: new Set(),
  skillTypes: new Set(),
  targets: new Set(),
  statusTags: new Set(),
};

const BINGO_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function getSlotTypeAndElement(gene: string): { type: string; element: string } | null {
  if (gene === RAINBOW_GENE) return { type: "彩色", element: "彩色" };
  const gd = getGeneDetail(gene);
  if (gd) return { type: gd.type, element: gd.element };
  const hd = getHatchingSkillDetail(gene);
  if (hd) return { type: hd.type, element: hd.element };
  return null;
}

function checkLineMatch(vals: (string | null)[]): boolean {
  if (vals.some(v => !v)) return false;
  const nonRainbow = vals.filter(v => v !== "彩色") as string[];
  if (nonRainbow.length === 0) return true;
  return nonRainbow.every(v => v === nonRainbow[0]);
}

interface BingoLineInfo {
  line: number[];
  kind: "type" | "element";
  value: string;
}

function getBingoLines(slots: GeneSlot[]): BingoLineInfo[] {
  const result: BingoLineInfo[] = [];
  for (const line of BINGO_LINES) {
    const infos = line.map(i => slots[i].gene ? getSlotTypeAndElement(slots[i].gene!) : null);
    if (infos.some(i => !i)) continue;
    const types = infos.map(i => i!.type);
    const elements = infos.map(i => i!.element);
    if (checkLineMatch(types)) {
      const nonRainbow = types.filter(t => t !== "彩色");
      result.push({ line, kind: "type", value: nonRainbow[0] ?? "彩色" });
    }
    if (checkLineMatch(elements)) {
      const nonRainbow = elements.filter(e => e !== "彩色");
      result.push({ line, kind: "element", value: nonRainbow[0] ?? "彩色" });
    }
  }
  return result;
}

function slotDisplayName(gene: string): string {
  if (gene === RAINBOW_GENE) return RAINBOW_LABEL;
  if (isHatchingSkill(gene)) return hatchingSkillToZH(gene);
  return geneToZH(gene);
}

const BINGO_STAT_MAP: Record<string, keyof OtomonStats> = {
  "會心率": "crit",
  "速度": "speed",
  "耐力恢復力": "stRecovery",
  "耐力初始值": "stInitial",
};

function parseBingoBonus(bonusStr: string): { statKey: keyof OtomonStats; value: number } | null {
  for (const [prefix, key] of Object.entries(BINGO_STAT_MAP)) {
    if (bonusStr.startsWith(prefix)) {
      const num = parseInt(bonusStr.slice(prefix.length));
      if (!isNaN(num)) return { statKey: key, value: num };
    }
  }
  return null;
}

function toggleSetItem<T>(set: Set<T>, item: T): Set<T> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

function CollapsibleSection({ title, defaultExpanded = true, children }: { title: string; defaultExpanded?: boolean; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <div>
      <div className="collapsible-header" onClick={() => setExpanded(!expanded)}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>{title}</h2>
        <button className={`collapsible-toggle ${expanded ? "" : "collapsed"}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      <div className={`collapsible-body ${expanded ? "" : "collapsed"}`} style={expanded ? { marginTop: 14 } : {}}>
        {children}
      </div>
    </div>
  );
}

export function GenePlannerPage() {
  const [slots, setSlots] = useState<GeneSlot[]>(Array.from({ length: GRID_SIZE }, () => ({ gene: null })));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [geneModalGene, setGeneModalGene] = useState<string | null>(null);
  const [monsterSearch, setMonsterSearch] = useState("");
  const [geneFilters, setGeneFilters] = useState<GeneFilters>(EMPTY_GENE_FILTERS);
  const [geneFilterExpanded, setGeneFilterExpanded] = useState(false);
  const [geneQueryExpanded, setGeneQueryExpanded] = useState(false);
  const [geneQuerySearch, setGeneQuerySearch] = useState("");
  const [baseMonsterEN, setBaseMonsterEN] = useState<string>("");
  const geneListRef = useRef<HTMLDivElement>(null);
  const [needsCollapse, setNeedsCollapse] = useState(false);
  const [pickerTab, setPickerTab] = useState<"gene" | "hatching">("gene");
  const [pickerSearch, setPickerSearch] = useState("");

  const allGenes = useMemo(() => getUniqueGenes(), []);

  const otomonList = useMemo(() => MONSTERS.filter((m) => isOtomon(m.nameEN)), []);

  const baseMonster = useMemo(() => {
    if (!baseMonsterEN) return null;
    return MONSTERS.find((m) => m.nameEN === baseMonsterEN) ?? null;
  }, [baseMonsterEN]);

  const baseMonsterStats = useMemo(() => baseMonsterEN ? getOtomonStats(baseMonsterEN) : null, [baseMonsterEN]);
  const baseMonsterBingo = useMemo(() => baseMonsterEN ? getBingoBonus(baseMonsterEN) : null, [baseMonsterEN]);

  const bingoLines = useMemo(() => getBingoLines(slots), [slots]);
  const bingoCount = bingoLines.length;

  const allHatchingNames = useMemo(() => getAllHatchingSkillNames(), []);

  const filteredPickerGenes = useMemo(() => {
    if (!pickerSearch) return allGenes;
    const q = pickerSearch.toLowerCase();
    return allGenes.filter((g) => g.toLowerCase().includes(q) || geneToZH(g).toLowerCase().includes(q));
  }, [allGenes, pickerSearch]);

  const filteredPickerHatching = useMemo(() => {
    if (!pickerSearch) return allHatchingNames;
    const q = pickerSearch.toLowerCase();
    return allHatchingNames.filter((h) => {
      const d = getHatchingSkillDetail(h);
      return h.toLowerCase().includes(q) || (d && (d.nameZH.toLowerCase().includes(q) || d.effect.toLowerCase().includes(q)));
    });
  }, [allHatchingNames, pickerSearch]);

  const bingoBonusStats = useMemo(() => {
    if (!baseMonsterBingo) return {};
    const result: Partial<Record<keyof OtomonStats, number>> = {};
    const thresholds: [number, string][] = [[2, baseMonsterBingo.bingo2], [3, baseMonsterBingo.bingo3], [5, baseMonsterBingo.bingo5]];
    for (const [threshold, bonusStr] of thresholds) {
      if (bingoCount >= threshold) {
        const parsed = parseBingoBonus(bonusStr);
        if (parsed) result[parsed.statKey] = (result[parsed.statKey] ?? 0) + parsed.value;
      }
    }
    return result;
  }, [baseMonsterBingo, bingoCount]);

  const bingoBonusOther = useMemo(() => {
    if (!baseMonsterBingo) return [];
    const result: { label: string; value: number }[] = [];
    const thresholds: [number, string][] = [[2, baseMonsterBingo.bingo2], [3, baseMonsterBingo.bingo3], [5, baseMonsterBingo.bingo5]];
    for (const [threshold, bonusStr] of thresholds) {
      if (bingoCount >= threshold) {
        const parsed = parseBingoBonus(bonusStr);
        if (!parsed) {
          const match = bonusStr.match(/^(.+?)(\d+)$/);
          if (match) result.push({ label: match[1], value: parseInt(match[2]) });
        }
      }
    }
    return result;
  }, [baseMonsterBingo, bingoCount]);

  const assignGene = useCallback((slotIndex: number, gene: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = { gene };
      return next;
    });
    setSelectedSlot(null);
    setPickerSearch("");
    setPickerTab("gene");
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

  const hasRainbow = useMemo(() => slots.some((s) => s.gene === RAINBOW_GENE), [slots]);

  const geneFilterActiveCount = geneFilters.types.size + geneFilters.elements.size + geneFilters.skillTypes.size + geneFilters.targets.size + geneFilters.statusTags.size;

  const queryGenes = useMemo(() => {
    const base = usedGenes.size > 0 ? allGenes.filter((g) => usedGenes.has(g)) : allGenes;

    let filtered = base;
    if (geneQuerySearch) {
      const q = geneQuerySearch.toLowerCase();
      filtered = filtered.filter((g) => {
        if (g.toLowerCase().includes(q) || geneToZH(g).toLowerCase().includes(q)) return true;
        const detail = getGeneDetail(g);
        if (detail && detail.effect.toLowerCase().includes(q)) return true;
        return false;
      });
    }

    if (geneFilterActiveCount === 0) return filtered;

    return filtered.filter((gene) => {
      const detail = getGeneDetail(gene);
      if (!detail) return geneFilterActiveCount === 0;
      if (geneFilters.types.size > 0 && !geneFilters.types.has(detail.type)) return false;
      if (geneFilters.elements.size > 0 && !geneFilters.elements.has(detail.element)) return false;
      if (geneFilters.skillTypes.size > 0 && !geneFilters.skillTypes.has(detail.skillType)) return false;
      if (geneFilters.targets.size > 0 && !(detail.target && geneFilters.targets.has(detail.target))) return false;
      if (geneFilters.statusTags.size > 0) {
        const tags = getGeneStatusTags(gene);
        if (!tags.some((t) => geneFilters.statusTags.has(t))) return false;
      }
      return true;
    });
  }, [allGenes, usedGenes, geneFilters, geneFilterActiveCount, geneQuerySearch]);

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
          <div className="gene-grid-wrapper">
            <svg className="gene-grid-bg-lines" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
              {/* Grid connecting lines (horizontal, vertical, diagonal) */}
              {[
                [50,50, 150,50], [150,50, 250,50],
                [50,150, 150,150], [150,150, 250,150],
                [50,250, 150,250], [150,250, 250,250],
                [50,50, 50,150], [50,150, 50,250],
                [150,50, 150,150], [150,150, 150,250],
                [250,50, 250,150], [250,150, 250,250],
                [50,50, 150,150], [150,150, 250,250],
                [250,50, 150,150], [150,150, 50,250],
              ].map(([x1,y1,x2,y2], idx) => (
                <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(160,140,110,0.15)" strokeWidth="2" />
              ))}
            </svg>
            <div className="gene-grid">
              {slots.map((slot, i) => {
                const info = slot.gene ? getSlotTypeAndElement(slot.gene) : null;
                const isRainbow = slot.gene === RAINBOW_GENE;
                const typeColor = info ? (ATTACK_TYPE_COLORS[info.type] ?? "#95a5a6") : undefined;
                const elColor = info ? (ELEMENT_COLORS[info.element] ?? "#95a5a6") : undefined;
                const typeClass = info ? ({
                  "力量": "filled-power",
                  "速度": "filled-speed",
                  "技巧": "filled-technique",
                }[info.type] ?? "") : "";
                const defaultBorder = "rgba(160,140,110,0.35)";
                const borderTop = slot.gene && !isRainbow ? typeColor : defaultBorder;
                const borderBottom = slot.gene && !isRainbow ? elColor : defaultBorder;
                return (
                  <button
                    key={i}
                    className={`gene-slot ${selectedSlot === i ? "selected" : ""} ${slot.gene ? `filled ${typeClass}` : ""} ${isRainbow ? "rainbow-slot" : ""}`}
                    onClick={() => setSelectedSlot(selectedSlot === i ? null : i)}
                  >
                    <svg className="gene-slot-border-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      {isRainbow && (
                        <defs>
                          <linearGradient id={`rainbow-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e74c3c" />
                            <stop offset="25%" stopColor="#f1c40f" />
                            <stop offset="50%" stopColor="#2ecc71" />
                            <stop offset="75%" stopColor="#1e88e5" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      )}
                      <polyline
                        points="0,80 0,20 20,0 80,0 100,20"
                        fill="none"
                        stroke={isRainbow ? `url(#rainbow-grad-${i})` : borderTop}
                        strokeWidth="3" strokeLinejoin="round"
                      />
                      <polyline
                        points="100,20 100,80 80,100 20,100 0,80"
                        fill="none"
                        stroke={isRainbow ? `url(#rainbow-grad-${i})` : borderBottom}
                        strokeWidth="3" strokeLinejoin="round"
                      />
                    </svg>
                    {info && !isRainbow && (
                      <span className="gene-slot-type-icon">
                        <AttackTypeIcon type={info.type as AttackType} size={14} />
                      </span>
                    )}
                    {info && !isRainbow && elColor && info.element !== "無屬性" && (
                      <span className="gene-slot-element-dot" style={{ background: elColor }} />
                    )}
                    {slot.gene ? (
                      <div className="gene-slot-content">
                        <span className="gene-slot-name">{slotDisplayName(slot.gene)}</span>
                        {!isRainbow && <span className="gene-slot-jp">{slot.gene}</span>}
                        {isRainbow && <span style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>屬性萬用</span>}
                        <span
                          role="button"
                          className="gene-slot-clear"
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); clearSlot(i); }}
                        >
                          ✕
                        </span>
                      </div>
                    ) : (
                      <span className="gene-slot-empty">+</span>
                    )}
                  </button>
                );
              })}
            </div>
            {bingoLines.length > 0 && (
              <svg className="bingo-lines-overlay" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                {bingoLines.map((bl, idx) => {
                  const centers = bl.line.map(si => ({
                    x: (si % 3) * 100 + 50,
                    y: Math.floor(si / 3) * 100 + 50,
                  }));
                  const color = bl.kind === "type"
                    ? (ATTACK_TYPE_COLORS[bl.value] ?? "#fff")
                    : (ELEMENT_COLORS[bl.value] ?? "#fff");
                  const lineColor = color.startsWith("linear") ? "#fff" : color;
                  return (
                    <g key={idx}>
                      <line
                        className="bingo-line-glow"
                        x1={centers[0].x} y1={centers[0].y}
                        x2={centers[2].x} y2={centers[2].y}
                        stroke={lineColor}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      />
                      <line
                        className="bingo-line"
                        x1={centers[0].x} y1={centers[0].y}
                        x2={centers[2].x} y2={centers[2].y}
                        stroke={lineColor}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      />
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
          {bingoLines.length > 0 && (
            <div className="bingo-line-legend">
              {bingoLines.map((bl, idx) => {
                const color = bl.kind === "type"
                  ? (ATTACK_TYPE_COLORS[bl.value] ?? "#fff")
                  : (ELEMENT_COLORS[bl.value] ?? "#fff");
                const lineColor = color.startsWith("linear") ? "#a855f7" : color;
                const label = bl.kind === "type" ? bl.value : bl.value.replace("屬性", "");
                return (
                  <span key={idx} className="bingo-line-legend-item">
                    <span className="bingo-line-legend-dot" style={{ background: lineColor }} />
                    {bl.kind === "type" ? "類型" : "屬性"}: {label}
                  </span>
                );
              })}
            </div>
          )}
          <button className="clear-filters-btn" onClick={clearAllSlots} style={{ marginTop: 12 }}>
            清空全部基因格
          </button>

          <div style={{ marginTop: 16 }}>
            <CollapsibleSection title="基底魔物" defaultExpanded={true}>
              <div className="base-monster-section">
                <div className="base-monster-selector">
                  <select
                    className="base-monster-dropdown"
                    value={baseMonsterEN}
                    onChange={(e) => setBaseMonsterEN(e.target.value)}
                  >
                    <option value="">-- 選擇基底魔物 --</option>
                    {otomonList.map((m) => (
                      <option key={m.nameEN} value={m.nameEN}>{m.name} ({m.nameEN})</option>
                    ))}
                  </select>
                  {baseMonsterEN && (
                    <button className="base-monster-clear" onClick={() => setBaseMonsterEN("")}>清除</button>
                  )}
                </div>
                {baseMonster && (
                  <Link to={`/monsters/${baseMonster.id}`} className="base-monster-preview" style={{ marginTop: 8, textDecoration: "none" }}>
                    <img src={`${baseMonster.icon}.webp`} alt={baseMonster.name} className="base-monster-preview-icon" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <span className="base-monster-preview-name">{baseMonster.name}</span>
                  </Link>
                )}
              </div>
            </CollapsibleSection>
          </div>

          {baseMonsterStats && (
            <div style={{ marginTop: 12 }}>
              <CollapsibleSection title="能力傾向" defaultExpanded={true}>
                <div className="planner-stats-section">
                  <div className="planner-stats-grid">
                    {OTOMON_STAT_LABELS.map(({ key, short }) => {
                      const val = baseMonsterStats[key];
                      const bonus = bingoBonusStats[key];
                      const baseColor = val >= 8 ? "#e74c3c" : val >= 6 ? "#f39c12" : val >= 4 ? "#3498db" : "#95a5a6";
                      const baseWidth = val * 10;
                      const bonusWidth = bonus ? Math.min(bonus * 10, 100 - baseWidth) : 0;
                      return (
                        <div key={key} className="planner-stat-row">
                          <span className="planner-stat-label">{short}</span>
                          <div className="planner-stat-bar-track">
                            <div
                              className="planner-stat-bar-fill"
                              style={{ width: `${baseWidth}%`, backgroundColor: baseColor }}
                            />
                            {bonusWidth > 0 && (
                              <div
                                className="planner-stat-bar-bonus"
                                style={{ width: `${bonusWidth}%`, left: `${baseWidth}%` }}
                              />
                            )}
                          </div>
                          <span className="planner-stat-value">{val}</span>
                          <span className="stat-bonus">{bonus ? `+${bonus}` : ""}</span>
                        </div>
                      );
                    })}
                    {bingoBonusOther.length > 0 && (
                      <div className="planner-stat-row" style={{ marginTop: 4 }}>
                        <span className="planner-stat-label" />
                        <span className="stat-bonus" style={{ flex: 1 }}>
                          {bingoBonusOther.map((b) => `${b.label}+${b.value}`).join("、")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          )}

          {baseMonsterBingo && (
            <div style={{ marginTop: 12 }}>
              <CollapsibleSection title={`賓果數加成 (${bingoCount})`} defaultExpanded={true}>
                <div className="planner-bingo-section">
                  <div className="planner-bingo-grid">
                    <div className={`planner-bingo-row ${bingoCount >= 2 ? "bingo-achieved" : "bingo-dimmed"}`}>
                      <span className="planner-bingo-label">2 賓果</span>
                      <span className="planner-bingo-value">{baseMonsterBingo.bingo2}</span>
                    </div>
                    <div className={`planner-bingo-row ${bingoCount >= 3 ? "bingo-achieved" : "bingo-dimmed"}`}>
                      <span className="planner-bingo-label">3 賓果</span>
                      <span className="planner-bingo-value">{baseMonsterBingo.bingo3}</span>
                    </div>
                    <div className={`planner-bingo-row ${bingoCount >= 5 ? "bingo-achieved" : "bingo-dimmed"}`}>
                      <span className="planner-bingo-label">5 賓果</span>
                      <span className="planner-bingo-value">{baseMonsterBingo.bingo5}</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
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

                <div className="filter-section">
                  <h3 className="filter-title">異常狀態</h3>
                  <div className="filter-chips">
                    {ALL_STATUS_TAGS.map((tag) => (
                      <button
                        key={tag}
                        className={`chip status-chip ${geneFilters.statusTags.has(tag) ? "active" : ""}`}
                        onClick={() => setGeneFilters((f) => ({ ...f, statusTags: toggleSetItem(f.statusTags, tag) }))}
                      >
                        {tag}
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
            <input
              className="gene-search-input"
              placeholder="搜尋基因名稱或效果..."
              value={geneQuerySearch}
              onChange={(e) => setGeneQuerySearch(e.target.value)}
            />
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

          <div style={{ marginTop: 24 }}>
            <CollapsibleSection title="魔物基因 & 孵技一覽" defaultExpanded={true}>
              <input
                className="gene-search-input"
                placeholder="搜尋魔物名稱..."
                value={monsterSearch}
                onChange={(e) => setMonsterSearch(e.target.value)}
              />
              <div className="monster-gene-list">
                {filteredMonsters.map((m) => {
                  const genes = getGenes(m.nameEN);
                  const hatching = getHatchingSkills(m.nameEN);
                  return (
                    <div key={m.id} className="monster-gene-row">
                      <Link to={`/monsters/${m.id}`} className="monster-gene-name">
                        <img src={`${m.icon}.webp`} alt={m.name} className="mini-icon" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
                        {hatching && (
                          <span className="gene-chip-sm" style={{ borderColor: "var(--accent)", color: "var(--accent)", cursor: "default" }}>
                            孵技 ✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>

      {selectedSlot !== null && (
        <div className="gene-picker-modal-overlay" onClick={() => { setSelectedSlot(null); setPickerSearch(""); setPickerTab("gene"); }}>
          <div className="gene-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gene-picker-modal-header">
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: 0 }}>選擇（格位 {selectedSlot + 1}）</h3>
              <button className="gene-picker-modal-close" onClick={() => { setSelectedSlot(null); setPickerSearch(""); setPickerTab("gene"); }}>✕</button>
            </div>
            <div className="gene-picker-tabs">
              <button className={`gene-picker-tab ${pickerTab === "gene" ? "active" : ""}`} onClick={() => { setPickerTab("gene"); setPickerSearch(""); }}>羈絆基因</button>
              <button className={`gene-picker-tab ${pickerTab === "hatching" ? "active" : ""}`} onClick={() => { setPickerTab("hatching"); setPickerSearch(""); }}>孵技</button>
            </div>
            <div style={{ padding: "12px 16px 0" }}>
              <input
                className="gene-search-input"
                placeholder={pickerTab === "gene" ? "搜尋基因名稱..." : "搜尋孵技名稱或效果..."}
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="gene-picker-modal-body">
              <div className="gene-picker-modal-list">
                {!pickerSearch && (
                  <button
                    className={`gene-picker-item rainbow-gene-item ${hasRainbow && !usedGenes.has(RAINBOW_GENE) ? "used" : ""}`}
                    style={usedGenes.has(RAINBOW_GENE) ? { opacity: 0.5 } : undefined}
                    onClick={() => assignGene(selectedSlot, RAINBOW_GENE)}
                    disabled={hasRainbow && slots[selectedSlot]?.gene !== RAINBOW_GENE}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className="gene-chip-dot rainbow-dot" />
                      <span className="gene-picker-zh">{RAINBOW_LABEL}</span>
                      <span className="gene-chip-element" style={{ color: "var(--text-muted)" }}>屬性萬用</span>
                    </span>
                    {hasRainbow && slots[selectedSlot]?.gene !== RAINBOW_GENE && <span className="gene-used-label">已使用（限1）</span>}
                  </button>
                )}
                {pickerTab === "gene" ? (
                  filteredPickerGenes.map((gene) => {
                    const detail = getGeneDetail(gene);
                    const typeColor = detail && detail.type !== "無" ? ATTACK_TYPE_COLORS[detail.type] : undefined;
                    const elColor = detail ? ELEMENT_COLORS[detail.element] : undefined;
                    return (
                      <button
                        key={gene}
                        className={`gene-picker-item ${usedGenes.has(gene) ? "used" : ""}`}
                        onClick={() => assignGene(selectedSlot, gene)}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {typeColor && <span className="gene-chip-dot" style={{ backgroundColor: typeColor }} />}
                          <span className="gene-picker-zh">{geneToZH(gene)}</span>
                          {elColor && detail?.element !== "無屬性" && (
                            <span className="gene-chip-element" style={{ color: elColor }}>{detail!.element.replace("屬性", "")}</span>
                          )}
                        </span>
                        {usedGenes.has(gene) && <span className="gene-used-label">已使用</span>}
                      </button>
                    );
                  })
                ) : (
                  filteredPickerHatching.map((h) => {
                    const d = getHatchingSkillDetail(h);
                    const elColor = d ? ELEMENT_COLORS[d.element] : "#95a5a6";
                    return (
                      <button
                        key={h}
                        className={`gene-picker-item ${usedGenes.has(h) ? "used" : ""}`}
                        onClick={() => assignGene(selectedSlot, h)}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                          <span className="gene-chip-dot" style={{ backgroundColor: elColor }} />
                          <span className="gene-picker-zh">{d?.nameZH ?? h}</span>
                          <span className="gene-picker-jp">{h}</span>
                        </span>
                        {d && <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.effect}</span>}
                        {usedGenes.has(h) && <span className="gene-used-label">已使用</span>}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
