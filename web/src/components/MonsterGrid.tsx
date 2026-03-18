import { memo } from "react";
import type { Monster } from "../types/monster";
import { MonsterCard } from "./MonsterCard";

interface MonsterGridProps {
  monsters: Monster[];
  totalCount: number;
}

export const MonsterGrid = memo(function MonsterGrid({ monsters, totalCount }: MonsterGridProps) {
  if (monsters.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p className="empty-text">找不到符合條件的魔物</p>
        <p className="empty-hint">試試調整搜尋條件或篩選器</p>
      </div>
    );
  }

  return (
    <>
      <div className="result-count">
        顯示 <strong>{monsters.length}</strong> / {totalCount} 隻魔物
      </div>
      <div className="monster-grid">
        {monsters.map((monster) => (
          <MonsterCard key={monster.id} monster={monster} />
        ))}
      </div>
    </>
  );
});
