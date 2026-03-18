import { useMemo } from "react";
import { MONSTERS } from "../data/monsters";
import { matchSearch } from "../utils/search";
import type { AttackType, Monster } from "../types/monster";

export interface Filters {
  search: string;
  species: Set<string>;
  attackTypes: Set<AttackType>;
  categories: Set<string>;
}

export function useFilteredMonsters(filters: Filters): Monster[] {
  return useMemo(() => {
    return MONSTERS.filter((m) => {
      if (!matchSearch(filters.search, m.name, m.nameEN, m.nameJP)) return false;
      if (filters.species.size > 0 && !filters.species.has(m.species)) return false;
      if (filters.attackTypes.size > 0 && !filters.attackTypes.has(m.normalAttack)) return false;
      if (filters.categories.size > 0 && !filters.categories.has(m.group)) return false;
      return true;
    });
  }, [filters]);
}
