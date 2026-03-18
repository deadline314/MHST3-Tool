import { useFiltersContext } from "../App";
import { useFilteredMonsters } from "../hooks/useMonsterFilter";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { MonsterGrid } from "../components/MonsterGrid";
import { MONSTERS } from "../data/monsters";

export function MonsterListPage() {
  const { filters, setSearch, toggleSpecies, toggleAttackType, toggleCategory, clearFilters, hasActiveFilters } =
    useFiltersContext();
  const filtered = useFilteredMonsters(filters);

  return (
    <>
      <div className="toolbar">
        <SearchBar value={filters.search} onChange={setSearch} />
        <FilterPanel
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onToggleSpecies={toggleSpecies}
          onToggleAttackType={toggleAttackType}
          onToggleCategory={toggleCategory}
          onClear={clearFilters}
        />
      </div>
      <MonsterGrid monsters={filtered} totalCount={MONSTERS.length} />
    </>
  );
}
