import { pinyin } from "pinyin-pro";

const pinyinCache = new Map<string, string>();
const pinyinInitialCache = new Map<string, string>();

export function toPinyin(text: string): string {
  const cached = pinyinCache.get(text);
  if (cached) return cached;
  const result = pinyin(text, { toneType: "none", type: "array" }).join("");
  pinyinCache.set(text, result);
  return result;
}

function toPinyinInitials(text: string): string {
  const cached = pinyinInitialCache.get(text);
  if (cached) return cached;
  const arr = pinyin(text, { toneType: "none", type: "array" });
  const result = arr.map((s) => s[0] || "").join("");
  pinyinInitialCache.set(text, result);
  return result;
}

const FUZZY_PAIRS: [string, string][] = [
  ["zh", "z"], ["ch", "c"], ["sh", "s"],
  ["n", "l"], ["r", "l"],
  ["f", "h"],
  ["ang", "an"], ["eng", "en"], ["ing", "in"],
  ["ong", "on"],
  ["uan", "uang"],
];

function normalizeFuzzyPinyin(py: string): string {
  let result = py;
  for (const [a, b] of FUZZY_PAIRS) {
    result = result.replaceAll(a, b);
  }
  return result;
}

function editDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }
  return matrix[a.length][b.length];
}

function fuzzyContains(haystack: string, needle: string): boolean {
  if (haystack.length < needle.length) return false;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    const sub = haystack.substring(i, i + needle.length);
    if (editDistance(sub, needle) <= 1) return true;
  }
  return false;
}

const MAX_EDIT_DISTANCE_RATIO = 0.3;

export function matchSearch(query: string, name: string, nameEN: string, nameJP: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;

  if (name.toLowerCase().includes(q)) return true;
  if (nameEN.toLowerCase().includes(q)) return true;
  if (nameJP.includes(q)) return true;

  const namePinyin = toPinyin(name).toLowerCase();
  if (namePinyin.includes(q)) return true;

  const hasChinese = /[\u4e00-\u9fff]/.test(q);

  if (hasChinese) {
    const queryPinyin = toPinyin(q).toLowerCase();
    if (namePinyin.includes(queryPinyin)) return true;
    if (normalizeFuzzyPinyin(namePinyin).includes(normalizeFuzzyPinyin(queryPinyin))) return true;
  }

  if (/^[a-z]+$/.test(q)) {
    const initials = toPinyinInitials(name).toLowerCase();
    if (initials.includes(q)) return true;

    const normalizedQuery = normalizeFuzzyPinyin(q);
    const normalizedPinyin = normalizeFuzzyPinyin(namePinyin);
    if (normalizedPinyin.includes(normalizedQuery)) return true;

    const en = nameEN.toLowerCase();
    const maxDist = Math.max(1, Math.floor(q.length * MAX_EDIT_DISTANCE_RATIO));
    if (q.length >= 3 && editDistance(en, q) <= maxDist) return true;
    if (q.length >= 3 && fuzzyContains(en, q)) return true;
  }

  return false;
}
