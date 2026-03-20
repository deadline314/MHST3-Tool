import { memo, useRef, useState, useEffect } from "react";
import type { Monster } from "../types/monster";
import { MonsterCard } from "./MonsterCard";

const INITIAL_BATCH = 30;
const LOAD_MORE_BATCH = 30;

interface MonsterGridProps {
  monsters: Monster[];
  totalCount: number;
}

export const MonsterGrid = memo(function MonsterGrid({ monsters, totalCount }: MonsterGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [monsters]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + LOAD_MORE_BATCH, monsters.length));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [monsters.length]);

  if (monsters.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p className="empty-text">找不到符合條件的魔物</p>
        <p className="empty-hint">試試調整搜尋條件或篩選器</p>
      </div>
    );
  }

  const visibleMonsters = monsters.slice(0, visibleCount);

  return (
    <>
      <div className="result-count">
        顯示 <strong>{monsters.length}</strong> / {totalCount} 隻魔物
      </div>
      <div className="monster-grid">
        {visibleMonsters.map((monster) => (
          <MonsterCard key={monster.id} monster={monster} />
        ))}
      </div>
      {visibleCount < monsters.length && <div ref={sentinelRef} style={{ height: 1 }} />}
    </>
  );
});
