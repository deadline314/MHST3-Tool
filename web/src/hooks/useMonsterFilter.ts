import { useMemo } from "react";
import { MONSTERS } from "../data/monsters";
import { matchSearch } from "../utils/search";
import { monsterMatchesLocation, getMonsterLocationParts } from "../data/locations";
import { getRideAction } from "../data/rideActions";
import type { AttackType, Monster } from "../types/monster";

export type SortOption = "default" | "name" | "nameEN" | "species" | "location";

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

function sortMonsters(monsters: Monster[], sort: SortOption): Monster[] {
  if (sort === "default") return monsters;
  const sorted = [...monsters];
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));
    case "nameEN":
      return sorted.sort((a, b) => a.nameEN.localeCompare(b.nameEN));
    case "species":
      return sorted.sort((a, b) => a.species.localeCompare(b.species, "zh-Hant") || a.name.localeCompare(b.name, "zh-Hant"));
    case "location":
      return sorted.sort((a, b) => getLocationSortKey(a) - getLocationSortKey(b) || a.name.localeCompare(b.name, "zh-Hant"));
  }
}

export function useFilteredMonsters(filters: Filters): Monster[] {
  return useMemo(() => {
    const filtered = MONSTERS.filter((m) => {
      if (!matchSearch(filters.search, m.name, m.nameEN, m.nameJP)) return false;
      if (filters.species.size > 0 && !filters.species.has(m.species)) return false;
      if (filters.attackTypes.size > 0 && !filters.attackTypes.has(m.normalAttack)) return false;
      if (filters.categories.size > 0 && !filters.categories.has(m.group)) return false;
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
    return sortMonsters(filtered, filters.sort);
  }, [filters]);
}
