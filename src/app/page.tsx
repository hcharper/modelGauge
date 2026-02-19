'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ModelSelector } from '@/components/ModelSelector';
import { ControlBar } from '@/components/ControlBar';
import { TankGrid } from '@/components/TankGrid';
import { StatsBar } from '@/components/StatsBar';
import { Legend } from '@/components/Legend';
import { useAnimationEngine } from '@/hooks/useAnimationEngine';
import { useTankStates } from '@/hooks/useTankState';
import { MODELS, PRESETS, DEFAULT_MODELS } from '@/data/models';
import { totalMessages, costPerMessage } from '@/lib/calculations';
import { LOCAL_STORAGE_KEY, MIN_SELECTED_MODELS } from '@/lib/constants';
import type { PlayState, SpeedMultiplier, UsageMode, SortMode } from '@/types';

export default function Home() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(DEFAULT_MODELS));
  const [playState, setPlayState] = useState<PlayState>('idle');
  const [speed, setSpeed] = useState<SpeedMultiplier>(1);
  const [mode, setMode] = useState<UsageMode>('chat');
  const [sort, setSort] = useState<SortMode>('cheapest');
  const [elapsed, setElapsed] = useState(0);

  // Load selection from localStorage on mount, filtering out stale model IDs
  useEffect(() => {
    try {
      const validIds = new Set(MODELS.map((m) => m.id));
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((id) => validIds.has(id));
          if (valid.length >= MIN_SELECTED_MODELS) {
            setSelected(new Set(valid));
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist selection
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...selected]));
    } catch {
      // ignore
    }
  }, [selected]);

  // Sort and filter models
  const sortedModels = useMemo(() => {
    const filtered = MODELS.filter((m) => selected.has(m.id));

    switch (sort) {
      case 'cheapest':
        return [...filtered].sort((a, b) => costPerMessage(a, mode) - costPerMessage(b, mode));
      case 'expensive':
        return [...filtered].sort((a, b) => costPerMessage(b, mode) - costPerMessage(a, mode));
      case 'provider':
        return filtered;
      default:
        return filtered;
    }
  }, [selected, sort, mode]);

  // Max messages across selected models (for knowing when to stop animation)
  const maxMessages = useMemo(() => {
    if (selected.size === 0) return 0;
    return Math.max(
      ...MODELS.filter((m) => selected.has(m.id)).map((m) => totalMessages(m, mode))
    );
  }, [selected, mode]);

  const onTick = useCallback((e: number) => setElapsed(e), []);

  const { reset } = useAnimationEngine({
    playState,
    speed,
    onTick,
    maxMessages,
  });

  const tankStates = useTankStates(sortedModels, mode, elapsed);

  const handlePlay = () => {
    if (selected.size < MIN_SELECTED_MODELS) return;
    setPlayState('playing');
  };

  const handlePause = () => setPlayState('paused');

  const handleReset = () => {
    setPlayState('idle');
    reset();
  };

  const handleModeChange = (m: UsageMode) => {
    handleReset();
    setMode(m);
  };

  const canPlay = selected.size >= MIN_SELECTED_MODELS && playState !== 'playing';

  return (
    <main className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      <Header />
      <ModelSelector selected={selected} onChange={setSelected} />
      <ControlBar
        playState={playState}
        speed={speed}
        mode={mode}
        sort={sort}
        canPlay={canPlay}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onSpeedChange={setSpeed}
        onModeChange={handleModeChange}
        onSortChange={setSort}
      />
      <StatsBar tankStates={tankStates} selectedIds={selected} />
      <TankGrid selectedIds={selected} tankStates={tankStates} mode={mode} />
      <Legend />
    </main>
  );
}
