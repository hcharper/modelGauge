import type { UsageProfile, UsageMode, SpeedMultiplier } from '@/types';

export const BUDGET = 100;

export const USAGE_PROFILES: Record<UsageMode, UsageProfile> = {
  chat: {
    label: 'Chat',
    inputTokensPerMessage: 500,
    outputTokensPerMessage: 1500,
  },
  codegen: {
    label: 'Code Gen',
    inputTokensPerMessage: 300,
    outputTokensPerMessage: 3000,
  },
};

export const SPEED_OPTIONS: SpeedMultiplier[] = [0.5, 1, 2, 5, 10];

export const MESSAGES_PER_SECOND_BASE = 2;

export const MIN_SELECTED_MODELS = 2;

export const LOCAL_STORAGE_KEY = 'aimeter-selected-models-v2';
