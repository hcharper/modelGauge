'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';
import { MODELS } from '@/data/models';
import type { TankState } from '@/types';
import { formatDollars } from '@/lib/calculations';

interface StatsBarProps {
  tankStates: TankState[];
  selectedIds: Set<string>;
}

export function StatsBar({ tankStates, selectedIds }: StatsBarProps) {
  const relevantStates = tankStates.filter((s) => selectedIds.has(s.modelId));

  if (relevantStates.length === 0) return null;

  const sorted = [...relevantStates].sort((a, b) => a.costPerMessage - b.costPerMessage);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];
  const avgCost = relevantStates.reduce((sum, s) => sum + s.costPerMessage, 0) / relevantStates.length;

  const getName = (id: string) => MODELS.find((m) => m.id === id)?.name ?? id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs"
    >
      <div className="flex items-center gap-2">
        <TrendingDown className="w-4 h-4 text-green-400" />
        <span className="text-neutral-400">Cheapest:</span>
        <span className="text-green-400 font-semibold">{getName(cheapest.modelId)}</span>
        <span className="text-neutral-500">({formatDollars(cheapest.costPerMessage)}/msg)</span>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-red-400" />
        <span className="text-neutral-400">Most expensive:</span>
        <span className="text-red-400 font-semibold">{getName(mostExpensive.modelId)}</span>
        <span className="text-neutral-500">({formatDollars(mostExpensive.costPerMessage)}/msg)</span>
      </div>
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-blue-400" />
        <span className="text-neutral-400">Avg cost:</span>
        <span className="text-blue-400 font-semibold">{formatDollars(avgCost)}/msg</span>
      </div>
    </motion.div>
  );
}
