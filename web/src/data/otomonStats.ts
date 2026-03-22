export interface OtomonStats {
  hp: number;
  attack: number;
  crit: number;
  speed: number;
  defense: number;
  stRecovery: number;
  stInitial: number;
}

const OTOMON_STATS_RAW: Record<string, [number, number, number, number, number, number, number]> = {
  "Reus":                    [6, 7, 1, 6, 5, 7, 7],
  "Velocidrome":             [3, 6, 1, 9, 3, 10, 4],
  "Great Izuchi":            [3, 5, 6, 7, 3, 7, 7],
  "Kulu-Ya-Ku":              [4, 5, 1, 8, 5, 10, 4],
  "Yian Kut-Ku":             [3, 4, 1, 6, 5, 10, 4],
  "Blue Yian Kut-Ku":        [4, 5, 1, 6, 3, 7, 7],
  "Gypceros":                [5, 4, 1, 5, 6, 10, 4],
  "Purple Gypceros":         [5, 5, 1, 5, 4, 7, 7],
  "Aknosom":                 [5, 6, 1, 6, 5, 7, 7],
  "Pukei-Pukei":             [5, 4, 1, 6, 5, 7, 7],
  "Yian Garuga":             [4, 6, 6, 7, 5, 7, 7],
  "Deadeye Yian Garuga":     [6, 8, 6, 7, 3, 7, 7],
  "Arzuros":                 [5, 4, 1, 5, 4, 7, 7],
  "Bishaten":                [5, 6, 1, 7, 4, 10, 4],
  "Blood Orange Bishaten":   [5, 7, 1, 7, 3, 7, 7],
  "Blangonga":               [6, 6, 1, 5, 4, 7, 7],
  "Garangolm":               [7, 5, 1, 4, 8, 7, 7],
  "Ajarakan":                [7, 7, 6, 5, 3, 4, 10],
  "Goss Harag":              [7, 8, 1, 4, 3, 4, 10],
  "Canyne":                  [4, 5, 1, 9, 4, 10, 4],
  "Chatacabra":              [5, 4, 1, 4, 4, 4, 10],
  "Tetranadon":              [7, 7, 1, 4, 3, 7, 7],
  "Shogun Ceanataur":        [4, 5, 6, 8, 6, 7, 7],
  "Nerscylla":               [4, 4, 1, 5, 5, 7, 7],
  "Shrouded Nerscylla":      [5, 6, 1, 5, 3, 7, 7],
  "Rakna-Kadaki":            [8, 6, 6, 6, 4, 7, 7],
  "Barroth":                 [5, 4, 1, 6, 8, 7, 7],
  "Jade Barroth":            [6, 5, 1, 6, 7, 7, 7],
  "Anjanath":                [6, 7, 1, 5, 4, 4, 10],
  "Fulgur Anjanath":         [7, 8, 1, 5, 2, 4, 10],
  "Glavenus":                [6, 8, 1, 5, 6, 7, 7],
  "Hellblade Glavenus":      [7, 10, 1, 5, 1, 4, 10],
  "Brachydios":              [8, 9, 1, 5, 3, 10, 4],
  "Deviljho":                [7, 9, 1, 5, 2, 4, 10],
  "Plesioth":                [6, 6, 1, 7, 5, 10, 4],
  "Green Plesioth":          [7, 7, 1, 7, 3, 7, 7],
  "Royal Ludroth":           [4, 5, 1, 6, 4, 10, 4],
  "Purple Ludroth":          [5, 6, 1, 6, 3, 7, 7],
  "Somnacanth":              [6, 5, 1, 7, 5, 7, 7],
  "Aurora Somnacanth":       [6, 6, 1, 7, 4, 7, 7],
  "Lagiacrus":               [6, 7, 1, 6, 7, 7, 7],
  "Ivory Lagiacrus":         [7, 8, 1, 6, 5, 4, 10],
  "Mizutsune":               [6, 6, 6, 5, 5, 7, 7],
  "Soulseer Mizutsune":      [7, 8, 6, 5, 2, 4, 10],
  "Almudron":                [6, 7, 1, 6, 5, 4, 10],
  "Tobi-Kadachi":            [4, 6, 6, 7, 3, 10, 4],
  "Odogaron":                [5, 7, 6, 8, 3, 4, 10],
  "Ebony Odogaron":          [6, 9, 6, 8, 1, 4, 10],
  "Zinogre":                 [7, 7, 1, 7, 6, 7, 7],
  "Stygian Zinogre":         [7, 9, 1, 7, 3, 4, 10],
  "Thunderlord Zinogre":     [8, 10, 1, 7, 2, 4, 10],
  "Lunagaron":               [5, 7, 1, 8, 4, 4, 10],
  "Magnamalo":               [7, 8, 1, 7, 6, 7, 7],
  "Paolumu":                 [5, 3, 1, 5, 6, 4, 10],
  "Khezu":                   [6, 6, 1, 5, 5, 10, 4],
  "Red Khezu":               [6, 7, 1, 5, 3, 7, 7],
  "Rathian":                 [5, 6, 1, 7, 6, 10, 4],
  "Pink Rathian":            [6, 7, 1, 7, 5, 7, 7],
  "Dreadqueen Rathian":      [8, 8, 1, 7, 3, 4, 10],
  "Legiana":                 [6, 7, 1, 7, 5, 7, 7],
  "Barioth":                 [5, 6, 6, 8, 6, 7, 7],
  "Sand Barioth":            [5, 7, 6, 8, 4, 7, 7],
  "Nargacuga":               [5, 5, 8, 10, 4, 7, 7],
  "Green Nargacuga":         [5, 6, 8, 10, 3, 7, 7],
  "Silverwind Nargacuga":    [6, 7, 10, 10, 1, 4, 10],
  "Astalos":                 [5, 8, 6, 8, 4, 7, 7],
  "Boltreaver Astalos":      [6, 9, 8, 8, 1, 4, 10],
  "Rathalos":                [7, 7, 1, 6, 5, 7, 7],
  "Azure Rathalos":          [7, 8, 1, 6, 4, 7, 7],
  "Dreadking Rathalos":      [8, 9, 1, 6, 2, 4, 10],
  "Tigrex":                  [6, 7, 1, 7, 5, 7, 7],
  "Brute Tigrex":            [6, 9, 1, 7, 3, 4, 10],
  "Grimclaw Tigrex":         [7, 10, 1, 7, 1, 4, 10],
  "Seregios":                [6, 7, 6, 7, 3, 4, 10],
  "Gravios":                 [8, 5, 1, 3, 10, 7, 7],
  "Black Gravios":           [10, 6, 1, 3, 8, 4, 10],
  "Diablos":                 [8, 7, 1, 7, 7, 10, 4],
  "Black Diablos":           [8, 8, 1, 7, 5, 10, 4],
  "Bloodbath Diablos":       [9, 10, 1, 7, 2, 7, 7],
  "Espinas":                 [7, 8, 1, 7, 3, 10, 4],
  "Rey Dau":                 [6, 7, 1, 7, 5, 7, 7],
  "Arkveld":                 [8, 8, 1, 6, 5, 4, 10],
  "Dos Poogie":              [5, 10, 1, 10, 1, 10, 4],
  "Namielle":                [10, 7, 1, 6, 8, 4, 10],
  "Velkhana":                [9, 8, 1, 7, 7, 4, 10],
  "Malzeno":                 [8, 8, 1, 9, 6, 4, 10],
};

const STAT_KEYS: (keyof OtomonStats)[] = ["hp", "attack", "crit", "speed", "defense", "stRecovery", "stInitial"];

export function getOtomonStats(nameEN: string): OtomonStats | null {
  const raw = OTOMON_STATS_RAW[nameEN];
  if (!raw) return null;
  const result: Record<string, number> = {};
  STAT_KEYS.forEach((k, i) => { result[k] = raw[i]; });
  return result as unknown as OtomonStats;
}

export function isOtomon(nameEN: string): boolean {
  return nameEN in OTOMON_STATS_RAW;
}

export const OTOMON_STAT_LABELS: { key: keyof OtomonStats; label: string; short: string }[] = [
  { key: "hp", label: "生命力", short: "HP" },
  { key: "attack", label: "攻撃力", short: "攻擊" },
  { key: "crit", label: "會心率", short: "會心" },
  { key: "speed", label: "速度", short: "速度" },
  { key: "defense", label: "防禦力", short: "防禦" },
  { key: "stRecovery", label: "耐力回復", short: "耐回" },
  { key: "stInitial", label: "耐力初始", short: "耐初" },
];
