'use client';

import { useMemo } from 'react';
import type { ModelDef, UsageMode, TankState } from '@/types';
import { costPerMessage, totalMessages, remainingBudget } from '@/lib/calculations';

export function useTankStates(
  models: ModelDef[],
  mode: UsageMode,
  elapsedMessages: number
): TankState[] {
  return useMemo(() => {
    return models.map((model) => {
      const cpm = costPerMessage(model, mode);
      const total = totalMessages(model, mode);
      const used = Math.min(Math.floor(elapsedMessages), total);
      const remaining = remainingBudget(model, mode, used);

      return {
        modelId: model.id,
        remaining,
        messagesUsed: used,
        totalMessages: total,
        costPerMessage: cpm,
        isEmpty: remaining <= 0,
      };
    });
  }, [models, mode, elapsedMessages]);
}
