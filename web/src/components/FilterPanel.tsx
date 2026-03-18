import { memo, useState } from "react";
import { SPECIES_LIST, ATTACK_TYPES, ATTACK_TYPE_COLORS, CATEGORY_LIST, ELEMENT_COLORS } from "../types/monster";
import { REGION_LIST, LOCATION_LIST } from "../data/locations";
import type { Filters, SortOption, RideAbility } from "../hooks/useMonsterFilter";
import { RIDE_ABILITIES, RIDE_ELEMENTS } from "../hooks/useMonsterFilter";
import type { AttackType } from "../types/monster";
import { AttackTypeIcon } from "./AttackTypeIcon";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "預設排序" },
  { value: "name", label: "中文名稱" },
  { value: "nameEN", label: "英文名稱" },
  { value: "species", label: "種類" },
  { value: "location", label: "地區" },
];

interface FilterPanelProps {
  filters: Filters;
  hasActiveFilters: boolean;
  onToggleSpecies: (species: string) => void;
  onToggleAttackType: (type: AttackType) => void;
  onToggleCategory: (cat: string) => void;
  onToggleLocation: (loc: string) => void;
  onToggleRideAbility: (ability: RideAbility) => void;
  onToggleRideElement: (element: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
}

export const FilterPanel = memo(function FilterPanel({
  filters,
  hasActiveFilters,
  onToggleSpecies,
  onToggleAttackType,
  onToggleCategory,
  onToggleLocation,
  onToggleRideAbility,
  onToggleRideElement,
  onSortChange,
  onClear,
}: FilterPanelProps) {
  const [locationExpanded, setLocationExpanded] = useState(false);

  return (
    <div className="filter-panel">
      <div className="filter-row-top">
        <div className="filter-section filter-section-inline">
          <h3 className="filter-title">排序</h3>
          <select
            className="sort-select"
            value={filters.sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">攻擊類型</h3>
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
        <h3 className="filter-title">種類</h3>
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
        <h3 className="filter-title">分類</h3>
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

      <div className="filter-section">
        <div className="filter-header">
          <h3 className="filter-title">地區</h3>
          <button
            className="filter-toggle-btn"
            onClick={() => setLocationExpanded(!locationExpanded)}
          >
            {locationExpanded ? "收起子地點" : "展開子地點"}
          </button>
        </div>
        <div className="filter-chips">
          {REGION_LIST.map((region) => (
            <button
              key={region}
              className={`chip location-chip ${filters.locations.has(region) ? "active" : ""}`}
              onClick={() => onToggleLocation(region)}
            >
              {region}
            </button>
          ))}
        </div>
        {locationExpanded && (
          <div className="filter-chips location-sub-chips">
            {LOCATION_LIST.map((loc) => (
              <button
                key={loc}
                className={`chip location-chip sub ${filters.locations.has(loc) ? "active" : ""}`}
                onClick={() => onToggleLocation(loc)}
              >
                {loc.split("：")[1]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3 className="filter-title">騎乘能力</h3>
        <div className="filter-chips">
          {RIDE_ABILITIES.map(({ key, label }) => (
            <button
              key={key}
              className={`chip ride-ability-chip ${filters.rideAbilities.has(key) ? "active" : ""}`}
              onClick={() => onToggleRideAbility(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">騎乘攻擊屬性</h3>
        <div className="filter-chips">
          {RIDE_ELEMENTS.map((el) => (
            <button
              key={el}
              className={`chip ride-element-chip ${filters.rideElements.has(el) ? "active" : ""}`}
              style={
                filters.rideElements.has(el) && el !== "無"
                  ? { borderColor: ELEMENT_COLORS[el], color: ELEMENT_COLORS[el], backgroundColor: `${ELEMENT_COLORS[el]}18` }
                  : {}
              }
              onClick={() => onToggleRideElement(el)}
            >
              {el}
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
