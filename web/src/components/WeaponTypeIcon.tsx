import type { WeaponType } from "../types/monster";
import { WEAPON_TYPE_ICON_MAP } from "../data/weaponTranslations";

export function WeaponTypeIcon({ type, size = 28 }: { type: WeaponType; size?: number }) {
  const src = WEAPON_TYPE_ICON_MAP[type];
  if (!src) return null;
  return <img src={src} alt={type} width={size} height={size} className="weapon-type-icon" />;
}
