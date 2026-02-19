import type { ModelDef, ProviderId, ProviderMeta } from '@/types';

export const PROVIDERS: Record<ProviderId, ProviderMeta> = {
  openai: {
    label: 'OpenAI',
    color: '#22c55e',
    bgClass: 'bg-green-500',
    borderClass: 'border-green-500',
    textClass: 'text-green-400',
  },
  anthropic: {
    label: 'Anthropic',
    color: '#f97316',
    bgClass: 'bg-orange-500',
    borderClass: 'border-orange-500',
    textClass: 'text-orange-400',
  },
  google: {
    label: 'Google',
    color: '#3b82f6',
    bgClass: 'bg-blue-500',
    borderClass: 'border-blue-500',
    textClass: 'text-blue-400',
  },
  deepseek: {
    label: 'DeepSeek',
    color: '#a855f7',
    bgClass: 'bg-purple-500',
    borderClass: 'border-purple-500',
    textClass: 'text-purple-400',
  },
  xai: {
    label: 'xAI',
    color: '#ef4444',
    bgClass: 'bg-red-500',
    borderClass: 'border-red-500',
    textClass: 'text-red-400',
  },
  mistral: {
    label: 'Mistral',
    color: '#06b6d4',
    bgClass: 'bg-cyan-500',
    borderClass: 'border-cyan-500',
    textClass: 'text-cyan-400',
  },
  meta: {
    label: 'Meta',
    color: '#0ea5e9',
    bgClass: 'bg-sky-500',
    borderClass: 'border-sky-500',
    textClass: 'text-sky-400',
  },
  moonshot: {
    label: 'Moonshot',
    color: '#f43f5e',
    bgClass: 'bg-rose-500',
    borderClass: 'border-rose-500',
    textClass: 'text-rose-400',
  },
  minimax: {
    label: 'MiniMax',
    color: '#8b5cf6',
    bgClass: 'bg-violet-500',
    borderClass: 'border-violet-500',
    textClass: 'text-violet-400',
  },
  zhipu: {
    label: 'Zhipu AI',
    color: '#10b981',
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-500',
    textClass: 'text-emerald-400',
  },
};

export const MODELS: ModelDef[] = [
  // OpenAI
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', inputPricePerMillion: 2.5, outputPricePerMillion: 10.0 },
  { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'openai', inputPricePerMillion: 2.0, outputPricePerMillion: 8.0 },
  { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex', provider: 'openai', inputPricePerMillion: 1.75, outputPricePerMillion: 14.0 },
  { id: 'o1', name: 'o1', provider: 'openai', inputPricePerMillion: 15.0, outputPricePerMillion: 60.0 },
  { id: 'o3-mini', name: 'o3-mini', provider: 'openai', inputPricePerMillion: 1.1, outputPricePerMillion: 4.4 },
  // Anthropic
  { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', provider: 'anthropic', inputPricePerMillion: 5.0, outputPricePerMillion: 25.0 },
  { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6', provider: 'anthropic', inputPricePerMillion: 3.0, outputPricePerMillion: 15.0 },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', provider: 'anthropic', inputPricePerMillion: 3.0, outputPricePerMillion: 15.0 },
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', provider: 'anthropic', inputPricePerMillion: 1.0, outputPricePerMillion: 5.0 },
  // Google
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'google', inputPricePerMillion: 1.25, outputPricePerMillion: 10.0 },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'google', inputPricePerMillion: 0.3, outputPricePerMillion: 2.5 },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'google', inputPricePerMillion: 0.1, outputPricePerMillion: 0.4 },
  // DeepSeek
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'deepseek', inputPricePerMillion: 0.14, outputPricePerMillion: 0.28 },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'deepseek', inputPricePerMillion: 0.55, outputPricePerMillion: 2.19 },
  // xAI
  { id: 'grok-4', name: 'Grok 4', provider: 'xai', inputPricePerMillion: 3.0, outputPricePerMillion: 15.0 },
  { id: 'grok-4.1-fast', name: 'Grok 4.1 Fast', provider: 'xai', inputPricePerMillion: 0.20, outputPricePerMillion: 0.50 },
  // Mistral
  { id: 'mistral-medium-3', name: 'Mistral Medium 3', provider: 'mistral', inputPricePerMillion: 0.4, outputPricePerMillion: 2.0 },
  // Meta
  { id: 'llama-3.2-70b', name: 'Llama 3.2 70B', provider: 'meta', inputPricePerMillion: 0.9, outputPricePerMillion: 0.9 },
  // Moonshot
  { id: 'kimi-k2.5', name: 'Kimi K2.5', provider: 'moonshot', inputPricePerMillion: 0.60, outputPricePerMillion: 2.50 },
  // MiniMax
  { id: 'minimax-m2.5', name: 'MiniMax M2.5', provider: 'minimax', inputPricePerMillion: 0.30, outputPricePerMillion: 1.20 },
  // Zhipu
  { id: 'glm-4.7', name: 'GLM-4.7', provider: 'zhipu', inputPricePerMillion: 0.60, outputPricePerMillion: 2.20 },
];

export const DEFAULT_MODELS = ['claude-opus-4.6', 'gpt-5.3-codex', 'minimax-m2.5', 'grok-4'];

export const PRESETS = {
  flagships: ['claude-opus-4.6', 'claude-sonnet-4.6', 'gpt-5.3-codex', 'grok-4', 'grok-4.1-fast', 'kimi-k2.5', 'minimax-m2.5', 'glm-4.7'],
  budget: ['o3-mini', 'claude-haiku-4.5', 'gemini-2.5-flash', 'gemini-2.0-flash', 'deepseek-v3', 'deepseek-r1', 'mistral-medium-3', 'llama-3.2-70b'],
  all: MODELS.map((m) => m.id),
};
