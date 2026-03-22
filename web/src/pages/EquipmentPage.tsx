import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { WEAPONS } from "../data/weapons";
import { ARMORS } from "../data/armors";
import { WEAPON_DETAILS } from "../data/weaponDetails";
import { toPinyin } from "../utils/search";
import { WeaponTypeIcon } from "../components/WeaponTypeIcon";
import { translateSkillName, translateWeaponName, translateArmorName, translateArmorSkill, translateMaterialName, findMonsterForMaterial } from "../data/weaponTranslations";
import type { Weapon, Armor, WeaponType, WeaponDetail } from "../types/monster";
import {
  WEAPON_TYPE_LIST,
  ELEMENT_LIST,
  STATUS_AILMENT_LIST,
  ELEMENT_COLORS,
  ARMOR_RESIST_COLORS,
} from "../types/monster";

type EquipTab = "weapons" | "armors";
type SortKey = "attack" | "defense" | "affinity" | "dragonBreak" | "name" | "element" | "slots";

function matchEquipSearch(query: string, name: string, zhName?: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;
  if (name.toLowerCase().includes(q)) return true;
  if (name.includes(q)) return true;
  if (zhName && zhName.includes(q)) return true;
  const py = toPinyin(zhName || name).toLowerCase();
  return py.includes(q);
}

function matchSkillSearch(query: string, detail: WeaponDetail | undefined): boolean {
  if (!query || !detail) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return detail.skills.some((s) =>
    s.name.includes(q) || s.effect.includes(q) ||
    translateSkillName(s.name).includes(q)
  );
}

function totalSlots(s: { lv1: number; lv2: number; lv3: number }): number {
  return s.lv1 + s.lv2 + s.lv3;
}

function slotsDisplay(s: { lv1: number; lv2: number; lv3: number }): string {
  const parts: string[] = [];
  for (let i = 0; i < s.lv3; i++) parts.push("③");
  for (let i = 0; i < s.lv2; i++) parts.push("②");
  for (let i = 0; i < s.lv1; i++) parts.push("①");
  return parts.length > 0 ? parts.join(" ") : "-";
}

function MaterialChip({ material }: { material: string }) {
  const monster = findMonsterForMaterial(material);
  const zhName = translateMaterialName(material);
  if (monster) {
    return (
      <Link to={`/monsters/${monster.id}`} className="eq-material-chip eq-material-link" title={`→ ${monster.name}`}>
        {zhName}
      </Link>
    );
  }
  return <span className="eq-material-chip">{zhName}</span>;
}

function WeaponCard({ weapon }: { weapon: Weapon }) {
  const elColor = ELEMENT_COLORS[weapon.element] || ELEMENT_COLORS["無"];
  const detail = WEAPON_DETAILS[weapon.name];
  return (
    <Link to={`/equipment/weapon/${encodeURIComponent(weapon.name)}`} className="eq-card-link">
      <div className="eq-card" style={{ borderLeftColor: elColor }}>
        <div className="eq-card-header">
          <div className="eq-card-title-row">
            <WeaponTypeIcon type={weapon.weaponType} />
            <div className="eq-card-name-col">
              <span className="eq-card-name">{translateWeaponName(weapon.name)}</span>
              {translateWeaponName(weapon.name) !== weapon.name && (
                <span className="eq-card-name-jp">{weapon.name}</span>
              )}
            </div>
          </div>
          <span className="eq-card-type">{weapon.weaponType}</span>
        </div>
        <div className="eq-card-stats">
          <div className="eq-stat"><span className="eq-stat-label">攻擊</span><span className="eq-stat-value eq-stat-atk">{weapon.attack}</span></div>
          <div className="eq-stat"><span className="eq-stat-label">屬性</span><span className="eq-stat-value" style={{ color: elColor }}>{weapon.element}</span></div>
          {weapon.affinity > 0 && <div className="eq-stat"><span className="eq-stat-label">會心</span><span className="eq-stat-value eq-stat-aff">{Math.round(weapon.affinity * 100)}%</span></div>}
          <div className="eq-stat"><span className="eq-stat-label">破龍</span><span className="eq-stat-value">{weapon.dragonBreak}</span></div>
          {weapon.statusAilment !== "-" && <div className="eq-stat"><span className="eq-stat-label">{weapon.statusAilment}</span><span className="eq-stat-value eq-stat-status">{weapon.statusValue}</span></div>}
          {weapon.defense > 0 && <div className="eq-stat"><span className="eq-stat-label">防禦</span><span className="eq-stat-value">+{weapon.defense}</span></div>}
          <div className="eq-stat"><span className="eq-stat-label">插槽</span><span className="eq-stat-value eq-stat-slots">{slotsDisplay(weapon.slots)}</span></div>
        </div>
        {detail && detail.skills.length > 0 && (
          <div className="eq-card-skill-preview">
            {detail.skills.map((s, i) => (
              <span key={i} className={`eq-skill-chip ${s.skillType === "アクティブ" ? "chip-active" : "chip-passive"}`}>
                {translateSkillName(s.name)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function ArmorCard({ armor }: { armor: Armor }) {
  const elColor = ELEMENT_COLORS[armor.element] || ELEMENT_COLORS["無"];
  const zhName = translateArmorName(armor.name);
  const resists = [
    { label: "無", value: armor.resistNeutral }, { label: "火", value: armor.resistFire },
    { label: "水", value: armor.resistWater }, { label: "雷", value: armor.resistThunder },
    { label: "氷", value: armor.resistIce }, { label: "龍", value: armor.resistDragon },
  ];
  return (
    <Link to={`/equipment/armor/${encodeURIComponent(armor.name)}`} className="eq-card-link">
      <div className="eq-card" style={{ borderLeftColor: elColor }}>
        <div className="eq-card-header">
          <div className="eq-card-name-col">
            <span className="eq-card-name">{zhName}</span>
            {zhName !== armor.name && <span className="eq-card-name-jp">{armor.name}</span>}
          </div>
          <span className="eq-card-def">防禦 {armor.defense}</span>
        </div>
        <div className="eq-resist-row">
          {resists.map((r) => (
            <div key={r.label} className="eq-resist-cell">
              <span className="eq-resist-label" style={{ color: ELEMENT_COLORS[r.label] || "#95a5a6" }}>{r.label}</span>
              <span className="eq-resist-value" style={{ color: ARMOR_RESIST_COLORS[r.value] || "#95a5a6" }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div className="eq-card-stats">
          <div className="eq-stat"><span className="eq-stat-label">插槽</span><span className="eq-stat-value eq-stat-slots">{slotsDisplay(armor.slots)}</span></div>
        </div>
        {armor.skills.length > 0 && (
          <div className="eq-card-skills">{armor.skills.map((s, i) => <span key={i} className="eq-skill-chip">{translateArmorSkill(s)}</span>)}</div>
        )}
        {armor.materials.length > 0 && (
          <div className="eq-card-materials">{armor.materials.map((m, i) => <MaterialChip key={i} material={m} />)}</div>
        )}
      </div>
    </Link>
  );
}

export function EquipmentPage() {
  const [tab, setTab] = useState<EquipTab>("weapons");
  const [search, setSearch] = useState("");
  const [weaponTypes, setWeaponTypes] = useState<Set<WeaponType>>(new Set());
  const [elements, setElements] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("attack");
  const [sortAsc, setSortAsc] = useState(false);
  const [materialSearch, setMaterialSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [minSlots, setMinSlots] = useState(0);

  const toggleSet = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, val: T) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val); else next.add(val);
      return next;
    });
  }, []);

  const filteredWeapons = useMemo(() => {
    let result = WEAPONS.filter((w) => {
      if (!matchEquipSearch(search, w.name, translateWeaponName(w.name))) return false;
      if (weaponTypes.size > 0 && !weaponTypes.has(w.weaponType)) return false;
      if (elements.size > 0 && !elements.has(w.element)) return false;
      if (statusFilter.size > 0 && !statusFilter.has(w.statusAilment)) return false;
      if (minSlots > 0 && totalSlots(w.slots) < minSlots) return false;
      if (materialSearch && !w.materials.some((m) => m.includes(materialSearch))) return false;
      if (skillSearch && !matchSkillSearch(skillSearch, WEAPON_DETAILS[w.name])) return false;
      return true;
    });
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "attack": cmp = a.attack - b.attack; break;
        case "affinity": cmp = a.affinity - b.affinity; break;
        case "dragonBreak": cmp = a.dragonBreak - b.dragonBreak; break;
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "element": cmp = a.element.localeCompare(b.element); break;
        case "slots": cmp = totalSlots(a.slots) - totalSlots(b.slots); break;
        default: cmp = a.attack - b.attack;
      }
      return sortAsc ? cmp : -cmp;
    });
    return result;
  }, [search, weaponTypes, elements, statusFilter, sortKey, sortAsc, materialSearch, skillSearch, minSlots]);

  const filteredArmors = useMemo(() => {
    let result = ARMORS.filter((a) => {
      if (!matchEquipSearch(search, a.name, translateArmorName(a.name))) return false;
      if (elements.size > 0 && !elements.has(a.element)) return false;
      if (minSlots > 0 && totalSlots(a.slots) < minSlots) return false;
      if (materialSearch && !a.materials.some((m) => m.includes(materialSearch))) return false;
      return true;
    });
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "defense": cmp = a.defense - b.defense; break;
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "element": cmp = a.element.localeCompare(b.element); break;
        case "slots": cmp = totalSlots(a.slots) - totalSlots(b.slots); break;
        default: cmp = a.defense - b.defense;
      }
      return sortAsc ? cmp : -cmp;
    });
    return result;
  }, [search, elements, sortKey, sortAsc, materialSearch, minSlots]);

  const clearFilters = useCallback(() => {
    setSearch(""); setWeaponTypes(new Set()); setElements(new Set());
    setStatusFilter(new Set()); setMaterialSearch(""); setSkillSearch(""); setMinSlots(0);
  }, []);

  const hasFilters = search || weaponTypes.size > 0 || elements.size > 0 || statusFilter.size > 0 || materialSearch || skillSearch || minSlots > 0;

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((a) => !a);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }, [sortKey]);

  return (
    <>
      <div className="eq-tabs">
        <button className={`eq-tab ${tab === "weapons" ? "active" : ""}`} onClick={() => setTab("weapons")}>
          武器 ({tab === "weapons" ? filteredWeapons.length : WEAPONS.length})
        </button>
        <button className={`eq-tab ${tab === "armors" ? "active" : ""}`} onClick={() => setTab("armors")}>
          防具 ({tab === "armors" ? filteredArmors.length : ARMORS.length})
        </button>
      </div>

      <div className="eq-toolbar">
        <div className="eq-search-row">
          <input type="text" className="eq-search-input" placeholder="搜尋裝備名稱..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type="text" className="eq-search-input eq-search-small" placeholder="搜尋素材..." value={materialSearch} onChange={(e) => setMaterialSearch(e.target.value)} />
          {tab === "weapons" && (
            <input type="text" className="eq-search-input eq-search-small" placeholder="搜尋技能..." value={skillSearch} onChange={(e) => setSkillSearch(e.target.value)} />
          )}
        </div>

        <div className="eq-filter-section">
          <span className="eq-filter-label">屬性</span>
          <div className="eq-filter-chips">
            {ELEMENT_LIST.map((el) => (
              <button key={el} className={`eq-chip ${elements.has(el) ? "active" : ""}`}
                style={elements.has(el) ? { background: ELEMENT_COLORS[el], color: "#fff" } : {}}
                onClick={() => toggleSet(setElements, el)}>{el}</button>
            ))}
          </div>
        </div>

        {tab === "weapons" && (
          <>
            <div className="eq-filter-section">
              <span className="eq-filter-label">武器種</span>
              <div className="eq-filter-chips">
                {WEAPON_TYPE_LIST.map((wt) => (
                  <button key={wt} className={`eq-chip ${weaponTypes.has(wt) ? "active" : ""}`} onClick={() => toggleSet(setWeaponTypes, wt)}>{wt}</button>
                ))}
              </div>
            </div>
            <div className="eq-filter-section">
              <span className="eq-filter-label">狀態異常</span>
              <div className="eq-filter-chips">
                {STATUS_AILMENT_LIST.map((s) => (
                  <button key={s} className={`eq-chip ${statusFilter.has(s) ? "active" : ""}`} onClick={() => toggleSet(setStatusFilter, s)}>{s}</button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="eq-filter-section">
          <span className="eq-filter-label">最少插槽</span>
          <div className="eq-filter-chips">
            {[0, 1, 2, 3].map((n) => (
              <button key={n} className={`eq-chip ${minSlots === n ? "active" : ""}`} onClick={() => setMinSlots(n)}>
                {n === 0 ? "不限" : `≥${n}`}
              </button>
            ))}
          </div>
        </div>

        <div className="eq-sort-row">
          <span className="eq-filter-label">排序</span>
          <div className="eq-filter-chips">
            {tab === "weapons"
              ? ([["attack", "攻擊"], ["affinity", "會心"], ["dragonBreak", "破龍"], ["slots", "插槽"], ["name", "名稱"]] as [SortKey, string][]).map(([k, label]) => (
                  <button key={k} className={`eq-chip ${sortKey === k ? "active" : ""}`} onClick={() => handleSort(k)}>
                    {label} {sortKey === k ? (sortAsc ? "↑" : "↓") : ""}
                  </button>))
              : ([["defense", "防禦"], ["slots", "插槽"], ["name", "名稱"]] as [SortKey, string][]).map(([k, label]) => (
                  <button key={k} className={`eq-chip ${sortKey === k ? "active" : ""}`} onClick={() => handleSort(k)}>
                    {label} {sortKey === k ? (sortAsc ? "↑" : "↓") : ""}
                  </button>))
            }
          </div>
          {hasFilters && <button className="eq-clear-btn" onClick={clearFilters}>清除篩選</button>}
        </div>
      </div>

      <div className="eq-grid">
        {tab === "weapons"
          ? filteredWeapons.map((w) => (
              <WeaponCard key={w.name} weapon={w} />
            ))
          : filteredArmors.map((a) => <ArmorCard key={a.name} armor={a} />)
        }
        {((tab === "weapons" && filteredWeapons.length === 0) || (tab === "armors" && filteredArmors.length === 0)) && (
          <div className="eq-empty">沒有符合條件的裝備</div>
        )}
      </div>
    </>
  );
}
