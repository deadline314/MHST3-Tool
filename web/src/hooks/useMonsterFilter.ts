import { useMemo } from "react";
import { MONSTERS } from "../data/monsters";
import { matchSearch } from "../utils/search";
import { monsterMatchesLocation, getMonsterLocationParts } from "../data/locations";
import { getRideAction } from "../data/rideActions";
import { isMutationResult, isMutationSource } from "../data/invasive";
import { isOtomon, getOtomonStats } from "../data/otomonStats";
import type { OtomonStats } from "../data/otomonStats";
import type { AttackType, Monster } from "../types/monster";

export type SortOption =
  | "default" | "name" | "nameEN" | "species" | "location"
  | "stat_hp" | "stat_attack" | "stat_crit" | "stat_speed" | "stat_defense" | "stat_stRecovery" | "stat_stInitial";

export type RideAbility = "fly" | "climb" | "swim" | "jump" | "roar" | "stealth" | "melee" | "breath" | "burrow";

export const RIDE_ABILITIES: { key: RideAbility; label: string }[] = [
  { key: "fly", label: "飛行" },
  { key: "climb", label: "攀爬" },
  { key: "swim", label: "游泳" },
  { key: "burrow", label: "潛地" },
  { key: "stealth", label: "隱密" },
  { key: "roar", label: "咆哮" },
  { key: "breath", label: "吐息" },
];

export const RIDE_ELEMENTS = ["火", "水", "雷", "冰", "龍", "無"] as const;

export interface Filters {
  search: string;
  species: Set<string>;
  attackTypes: Set<AttackType>;
  categories: Set<string>;
  locations: Set<string>;
  rideAbilities: Set<RideAbility>;
  rideElements: Set<string>;
  sort: SortOption;
  sortAsc: boolean;
}

const LOCATION_SORT_ORDER: Record<string, number> = {
  "亞茲萊爾領域": 0,
  "卡納爾塔密林": 1,
  "塔基爾坎": 2,
  "桑提亞": 3,
};

function getLocationSortKey(m: Monster): number {
  const parts = getMonsterLocationParts(m.nameEN);
  if (parts.length === 0) return 999;
  const region = parts[0].split("：")[0];
  return LOCATION_SORT_ORDER[region] ?? 998;
}

function getStatValue(m: Monster, key: keyof OtomonStats): number {
  const stats = getOtomonStats(m.nameEN);
  return stats ? stats[key] : 0;
}

function sortMonsters(monsters: Monster[], sort: SortOption, asc: boolean): Monster[] {
  if (sort === "default") return monsters;
  const sorted = [...monsters];
  const dir = asc ? 1 : -1;
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => dir * a.name.localeCompare(b.name, "zh-Hant"));
    case "nameEN":
      return sorted.sort((a, b) => dir * a.nameEN.localeCompare(b.nameEN));
    case "species":
      return sorted.sort((a, b) => dir * (a.species.localeCompare(b.species, "zh-Hant") || a.name.localeCompare(b.name, "zh-Hant")));
    case "location":
      return sorted.sort((a, b) => dir * (getLocationSortKey(a) - getLocationSortKey(b)) || a.name.localeCompare(b.name, "zh-Hant"));
    default: {
      if (sort.startsWith("stat_")) {
        const statKey = sort.slice(5) as keyof OtomonStats;
        return sorted.sort((a, b) => dir * (getStatValue(a, statKey) - getStatValue(b, statKey)) || a.name.localeCompare(b.name, "zh-Hant"));
      }
      return sorted;
    }
  }
}

function matchesCategory(m: Monster, categories: Set<string>): boolean {
  for (const cat of categories) {
    if (cat === "突然變異") {
      if (isMutationResult(m.name) || isMutationSource(m.name)) return true;
    } else if (cat === "隨行獸") {
      if (isOtomon(m.nameEN)) return true;
    } else {
      if (m.group === cat) return true;
    }
  }
  return false;
}

export function useFilteredMonsters(filters: Filters): Monster[] {
  return useMemo(() => {
    const filtered = MONSTERS.filter((m) => {
      if (!matchSearch(filters.search, m.name, m.nameEN, m.nameJP)) return false;
      if (filters.species.size > 0 && !filters.species.has(m.species)) return false;
      if (filters.attackTypes.size > 0 && !filters.attackTypes.has(m.normalAttack)) return false;
      if (filters.categories.size > 0 && !matchesCategory(m, filters.categories)) return false;
      if (filters.locations.size > 0 && !monsterMatchesLocation(m.nameEN, filters.locations)) return false;
      if (filters.rideAbilities.size > 0 || filters.rideElements.size > 0) {
        const ride = getRideAction(m.nameEN);
        if (!ride) return false;
        if (filters.rideAbilities.size > 0) {
          for (const ability of filters.rideAbilities) {
            if (!ride[ability]) return false;
          }
        }
        if (filters.rideElements.size > 0 && !filters.rideElements.has(ride.attackElement)) return false;
      }
      return true;
    });
    return sortMonsters(filtered, filters.sort, filters.sortAsc);
  }, [filters]);
}
