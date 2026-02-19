import type { ModelDef, UsageMode } from '@/types';
import { BUDGET, USAGE_PROFILES } from './constants';

export function costPerMessage(model: ModelDef, mode: UsageMode): number {
  const profile = USAGE_PROFILES[mode];
  const inputCost = (profile.inputTokensPerMessage / 1_000_000) * model.inputPricePerMillion;
  const outputCost = (profile.outputTokensPerMessage / 1_000_000) * model.outputPricePerMillion;
  return inputCost + outputCost;
}

export function totalMessages(model: ModelDef, mode: UsageMode): number {
  const cpm = costPerMessage(model, mode);
  if (cpm === 0) return Infinity;
  return Math.floor(BUDGET / cpm);
}

export function remainingBudget(model: ModelDef, mode: UsageMode, messagesUsed: number): number {
  const spent = messagesUsed * costPerMessage(model, mode);
  return Math.max(0, BUDGET - spent);
}

export function formatDollars(amount: number): string {
  if (amount >= 1) return `$${amount.toFixed(2)}`;
  return `$${amount.toFixed(4)}`;
}

export function formatCostPerMessage(model: ModelDef, mode: UsageMode): string {
  const cpm = costPerMessage(model, mode);
  if (cpm < 0.001) return `$${cpm.toFixed(6)}`;
  if (cpm < 0.01) return `$${cpm.toFixed(5)}`;
  return `$${cpm.toFixed(4)}`;
}
