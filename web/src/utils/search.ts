import { pinyin } from "pinyin-pro";

const pinyinCache = new Map<string, string>();

export function toPinyin(text: string): string {
  const cached = pinyinCache.get(text);
  if (cached) return cached;
  const result = pinyin(text, { toneType: "none", type: "array" }).join("");
  pinyinCache.set(text, result);
  return result;
}

export function matchSearch(query: string, name: string, nameEN: string, nameJP: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (name.toLowerCase().includes(q)) return true;
  if (nameEN.toLowerCase().includes(q)) return true;
  if (nameJP.includes(q)) return true;
  if (toPinyin(name).toLowerCase().includes(q)) return true;
  return false;
}
