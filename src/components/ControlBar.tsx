'use client';

import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, MessageSquare, Code2 } from 'lucide-react';
import type { PlayState, SpeedMultiplier, UsageMode, SortMode } from '@/types';
import { SPEED_OPTIONS } from '@/lib/constants';

interface ControlBarProps {
  playState: PlayState;
  speed: SpeedMultiplier;
  mode: UsageMode;
  sort: SortMode;
  canPlay: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (s: SpeedMultiplier) => void;
  onModeChange: (m: UsageMode) => void;
  onSortChange: (s: SortMode) => void;
}

export function ControlBar({
  playState,
  speed,
  mode,
  sort,
  canPlay,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  onModeChange,
  onSortChange,
}: ControlBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-wrap items-center gap-4"
    >
      {/* Play controls */}
      <div className="flex items-center gap-2">
        {playState === 'playing' ? (
          <ControlButton onClick={onPause} title="Pause">
            <Pause className="w-4 h-4" />
          </ControlButton>
        ) : (
          <ControlButton onClick={onPlay} disabled={!canPlay} title="Play">
            <Play className="w-4 h-4" />
          </ControlButton>
        )}
        <ControlButton onClick={onReset} title="Reset">
          <RotateCcw className="w-4 h-4" />
        </ControlButton>
      </div>

      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Speed */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-neutral-500 mr-1">Speed</span>
        {SPEED_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-2 py-1 text-xs rounded-md transition-all ${
              speed === s
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50'
                : 'text-neutral-400 hover:text-white border border-transparent hover:border-[var(--color-border)]'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Mode toggle */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-neutral-500 mr-1">Mode</span>
        <button
          onClick={() => onModeChange('chat')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-all ${
            mode === 'chat'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
              : 'text-neutral-400 hover:text-white border border-transparent hover:border-[var(--color-border)]'
          }`}
        >
          <MessageSquare className="w-3 h-3" /> Chat
        </button>
        <button
          onClick={() => onModeChange('codegen')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-all ${
            mode === 'codegen'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
              : 'text-neutral-400 hover:text-white border border-transparent hover:border-[var(--color-border)]'
          }`}
        >
          <Code2 className="w-3 h-3" /> Code Gen
        </button>
      </div>

      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Sort */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-neutral-500 mr-1">Sort</span>
        <SortButton label="Cheapest" active={sort === 'cheapest'} onClick={() => onSortChange('cheapest')} />
        <SortButton label="Expensive" active={sort === 'expensive'} onClick={() => onSortChange('expensive')} />
        <SortButton label="Provider" active={sort === 'provider'} onClick={() => onSortChange('provider')} />
      </div>
    </motion.div>
  );
}

function ControlButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-2 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-neutral-300 hover:text-white hover:border-neutral-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function SortButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-xs rounded-md transition-all ${
        active
          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50'
          : 'text-neutral-400 hover:text-white border border-transparent hover:border-[var(--color-border)]'
      }`}
    >
      {label}
    </button>
  );
}
