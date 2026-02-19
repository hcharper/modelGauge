'use client';

import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { GasTank } from './GasTank';
import { MODELS } from '@/data/models';
import type { TankState, UsageMode } from '@/types';

interface TankGridProps {
  selectedIds: Set<string>;
  tankStates: TankState[];
  mode: UsageMode;
}

export function TankGrid({ selectedIds, tankStates, mode }: TankGridProps) {
  const stateMap = new Map(tankStates.map((s) => [s.modelId, s]));

  if (selectedIds.size === 0) {
    return (
      <div className="text-center py-20 text-neutral-500">
        <p className="text-lg">No models selected</p>
        <p className="text-sm mt-1">Pick some models above to compare costs</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-6 justify-items-center py-3 sm:py-6">
        <AnimatePresence mode="popLayout">
          {MODELS.filter((m) => selectedIds.has(m.id)).map((model) => {
            const state = stateMap.get(model.id);
            if (!state) return null;
            return <GasTank key={model.id} model={model} state={state} mode={mode} />;
          })}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
