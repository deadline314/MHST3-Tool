import { HashRouter, Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect, createContext, useContext } from "react";
import { MonsterListPage } from "./pages/MonsterListPage";
import { MonsterDetailPage } from "./pages/MonsterDetailPage";
import { GenePlannerPage } from "./pages/GenePlannerPage";
import { EquipmentPage } from "./pages/EquipmentPage";
import { WeaponDetailPage } from "./pages/WeaponDetailPage";
import { ArmorDetailPage } from "./pages/ArmorDetailPage";
import type { Filters, SortOption, RideAbility } from "./hooks/useMonsterFilter";
import type { AttackType } from "./types/monster";
import "./App.css";

interface FiltersContextType {
  filters: Filters;
  setSearch: (search: string) => void;
  toggleSpecies: (species: string) => void;
  toggleAttackType: (type: AttackType) => void;
  toggleCategory: (cat: string) => void;
  toggleLocation: (loc: string) => void;
  toggleRideAbility: (ability: RideAbility) => void;
  toggleRideElement: (element: string) => void;
  setSort: (sort: SortOption) => void;
  toggleSortDir: () => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FiltersContext = createContext<FiltersContextType | null>(null);

export function useFiltersContext() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("FiltersContext not found");
  return ctx;
}

const INITIAL_FILTERS: Filters = {
  search: "",
  species: new Set(),
  attackTypes: new Set(),
  categories: new Set(),
  locations: new Set(),
  rideAbilities: new Set(),
  rideElements: new Set(),
  sort: "default",
  sortAsc: true,
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const toggleSpecies = useCallback((species: string) => {
    setFilters((prev) => {
      const next = new Set(prev.species);
      if (next.has(species)) next.delete(species);
      else next.add(species);
      return { ...prev, species: next };
    });
  }, []);

  const toggleAttackType = useCallback((type: AttackType) => {
    setFilters((prev) => {
      const next = new Set(prev.attackTypes);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, attackTypes: next };
    });
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setFilters((prev) => {
      const next = new Set(prev.categories);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return { ...prev, categories: next };
    });
  }, []);

  const toggleLocation = useCallback((loc: string) => {
    setFilters((prev) => {
      const next = new Set(prev.locations);
      if (next.has(loc)) next.delete(loc);
      else next.add(loc);
      return { ...prev, locations: next };
    });
  }, []);

  const toggleRideAbility = useCallback((ability: RideAbility) => {
    setFilters((prev) => {
      const next = new Set(prev.rideAbilities);
      if (next.has(ability)) next.delete(ability);
      else next.add(ability);
      return { ...prev, rideAbilities: next };
    });
  }, []);

  const toggleRideElement = useCallback((element: string) => {
    setFilters((prev) => {
      const next = new Set(prev.rideElements);
      if (next.has(element)) next.delete(element);
      else next.add(element);
      return { ...prev, rideElements: next };
    });
  }, []);

  const setSort = useCallback((sort: SortOption) => {
    const sortAsc = !sort.startsWith("stat_");
    setFilters((prev) => ({ ...prev, sort, sortAsc }));
  }, []);

  const toggleSortDir = useCallback(() => {
    setFilters((prev) => ({ ...prev, sortAsc: !prev.sortAsc }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.species.size > 0 ||
    filters.attackTypes.size > 0 ||
    filters.categories.size > 0 ||
    filters.locations.size > 0 ||
    filters.rideAbilities.size > 0 ||
    filters.rideElements.size > 0;

  return (
    <FiltersContext.Provider
      value={{ filters, setSearch, toggleSpecies, toggleAttackType, toggleCategory, toggleLocation, toggleRideAbility, toggleRideElement, setSort, toggleSortDir, clearFilters, hasActiveFilters }}
    >
      <HashRouter>
        <ScrollToTop />
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <h1 className="app-title">
                <span className="title-mh">Monster Hunter</span>
                <span className="title-stories">Stories 3</span>
              </h1>
              <nav className="app-nav">
                <NavLink to="/monsters" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                  魔物圖鑑
                </NavLink>
                <NavLink to="/gene-planner" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                  基因規劃器
                </NavLink>
                <NavLink to="/equipment" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                  裝備檢索
                </NavLink>
              </nav>
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Navigate to="/monsters" replace />} />
              <Route path="/monsters" element={<MonsterListPage />} />
              <Route path="/monsters/:monsterId" element={<MonsterDetailPage />} />
              <Route path="/gene-planner" element={<GenePlannerPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/equipment/weapon/:weaponName" element={<WeaponDetailPage />} />
              <Route path="/equipment/armor/:armorName" element={<ArmorDetailPage />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>MHST3 Tool — Monster Hunter Stories 3 魔物查詢工具</p>
            <p className="app-footer-author">Created by Stanley Li</p>
            <p className="app-version">v{__APP_VERSION__}</p>
          </footer>
        </div>
      </HashRouter>
    </FiltersContext.Provider>
  );
}

export default App;
