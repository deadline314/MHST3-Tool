import { memo } from "react";
import { SPECIES_LIST, ATTACK_TYPES, ATTACK_TYPE_COLORS, CATEGORY_LIST } from "../types/monster";
import type { Filters } from "../hooks/useMonsterFilter";
import type { AttackType } from "../types/monster";
import { AttackTypeIcon } from "./AttackTypeIcon";

interface FilterPanelProps {
  filters: Filters;
  hasActiveFilters: boolean;
  onToggleSpecies: (species: string) => void;
  onToggleAttackType: (type: AttackType) => void;
  onToggleCategory: (cat: string) => void;
  onClear: () => void;
}

export const FilterPanel = memo(function FilterPanel({
  filters,
  hasActiveFilters,
  onToggleSpecies,
  onToggleAttackType,
  onToggleCategory,
  onClear,
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">攻擊類型</h3>
        </div>
        <div className="filter-chips">
          {ATTACK_TYPES.map((type) => (
            <button
              key={type}
              className={`chip attack-chip ${filters.attackTypes.has(type) ? "active" : ""}`}
              style={
                filters.attackTypes.has(type)
                  ? { borderColor: ATTACK_TYPE_COLORS[type], color: ATTACK_TYPE_COLORS[type], backgroundColor: `${ATTACK_TYPE_COLORS[type]}18` }
                  : {}
              }
              onClick={() => onToggleAttackType(type)}
            >
              <AttackTypeIcon type={type} size={14} />
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">種類</h3>
        </div>
        <div className="filter-chips">
          {SPECIES_LIST.map((species) => (
            <button
              key={species}
              className={`chip species-chip ${filters.species.has(species) ? "active" : ""}`}
              onClick={() => onToggleSpecies(species)}
            >
              {species === "-" ? "其他" : species}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">分類</h3>
        </div>
        <div className="filter-chips">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              className={`chip category-chip ${filters.categories.has(cat) ? "active" : ""}`}
              onClick={() => onToggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={onClear}>
          清除所有篩選
        </button>
      )}
    </div>
  );
});
