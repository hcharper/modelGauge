export type ProviderId = 'openai' | 'anthropic' | 'google' | 'deepseek' | 'xai' | 'mistral' | 'meta';

export interface ModelDef {
  id: string;
  name: string;
  provider: ProviderId;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
}

export interface ProviderMeta {
  label: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export interface UsageProfile {
  label: string;
  inputTokensPerMessage: number;
  outputTokensPerMessage: number;
}

export type UsageMode = 'chat' | 'codegen';

export type SortMode = 'cheapest' | 'expensive' | 'provider';

export type SpeedMultiplier = 0.5 | 1 | 2 | 5 | 10;

export type PlayState = 'idle' | 'playing' | 'paused';

export interface TankState {
  modelId: string;
  remaining: number;
  messagesUsed: number;
  totalMessages: number;
  costPerMessage: number;
  isEmpty: boolean;
}
