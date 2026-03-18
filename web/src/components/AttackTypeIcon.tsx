import { memo } from "react";
import type { AttackType } from "../types/monster";
import { ATTACK_TYPE_COLORS } from "../types/monster";

interface AttackTypeIconProps {
  type: AttackType;
  size?: number;
}

function PowerIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L9 7H4L7 12L4 17H9L12 22L15 17H20L17 12L20 7H15L12 2Z"
        fill={color}
        opacity="0.2"
      />
      <path
        d="M12 2L9 7H4L7 12L4 17H9L12 22L15 17H20L17 12L20 7H15L12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeedIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L4.5 13H11L10 22L19.5 11H13L13 2Z" fill={color} opacity="0.2" />
      <path
        d="M13 2L4.5 13H11L10 22L19.5 11H13L13 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TechniqueIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" opacity="0.2" fill={color} />
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="12" y1="3" x2="12" y2="7" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="1.5" />
      <line x1="3" y1="12" x2="7" y2="12" stroke={color} strokeWidth="1.5" />
      <line x1="17" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const ICON_MAP: Record<string, typeof PowerIcon> = {
  "力量": PowerIcon,
  "速度": SpeedIcon,
  "技巧": TechniqueIcon,
};

export const AttackTypeIcon = memo(function AttackTypeIcon({ type, size = 16 }: AttackTypeIconProps) {
  const IconComponent = ICON_MAP[type];
  if (!IconComponent) return null;
  const color = ATTACK_TYPE_COLORS[type];
  return <IconComponent size={size} color={color} />;
});
