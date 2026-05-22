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

// Prices are USD per 1M tokens, verified against official provider pricing
// pages in May 2026. Re-check the providers' pricing docs before relying on
// these figures — model lineups and rates change frequently.
export const MODELS: ModelDef[] = [
  // OpenAI — platform.openai.com/docs/pricing
  { id: 'gpt-5.5', name: 'GPT-5.5', provider: 'openai', inputPricePerMillion: 5.0, outputPricePerMillion: 30.0 },
  { id: 'gpt-5.4', name: 'GPT-5.4', provider: 'openai', inputPricePerMillion: 2.5, outputPricePerMillion: 15.0 },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 mini', provider: 'openai', inputPricePerMillion: 0.75, outputPricePerMillion: 4.5 },
  { id: 'gpt-5.4-nano', name: 'GPT-5.4 nano', provider: 'openai', inputPricePerMillion: 0.20, outputPricePerMillion: 1.25 },
  { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex', provider: 'openai', inputPricePerMillion: 1.75, outputPricePerMillion: 14.0 },
  // Anthropic — anthropic.com/pricing
  { id: 'claude-opus-4.7', name: 'Claude Opus 4.7', provider: 'anthropic', inputPricePerMillion: 5.0, outputPricePerMillion: 25.0 },
  { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6', provider: 'anthropic', inputPricePerMillion: 3.0, outputPricePerMillion: 15.0 },
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', provider: 'anthropic', inputPricePerMillion: 1.0, outputPricePerMillion: 5.0 },
  // Google — ai.google.dev/gemini-api/docs/pricing (Pro shown at the <=200K-token tier)
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', provider: 'google', inputPricePerMillion: 1.5, outputPricePerMillion: 9.0 },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro', provider: 'google', inputPricePerMillion: 2.0, outputPricePerMillion: 12.0 },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', provider: 'google', inputPricePerMillion: 0.25, outputPricePerMillion: 1.5 },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'google', inputPricePerMillion: 0.3, outputPricePerMillion: 2.5 },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite', provider: 'google', inputPricePerMillion: 0.1, outputPricePerMillion: 0.4 },
  // DeepSeek — api-docs.deepseek.com (V4 Pro shown at standard, post-promo rate)
  { id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash', provider: 'deepseek', inputPricePerMillion: 0.14, outputPricePerMillion: 0.28 },
  { id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', provider: 'deepseek', inputPricePerMillion: 1.74, outputPricePerMillion: 3.48 },
  // xAI — docs.x.ai/docs/models
  { id: 'grok-4.3', name: 'Grok 4.3', provider: 'xai', inputPricePerMillion: 1.25, outputPricePerMillion: 2.5 },
  // Mistral — mistral.ai/pricing
  { id: 'mistral-large-3', name: 'Mistral Large 3', provider: 'mistral', inputPricePerMillion: 0.5, outputPricePerMillion: 1.5 },
  { id: 'mistral-medium-3.5', name: 'Mistral Medium 3.5', provider: 'mistral', inputPricePerMillion: 1.5, outputPricePerMillion: 7.5 },
  { id: 'mistral-small-4', name: 'Mistral Small 4', provider: 'mistral', inputPricePerMillion: 0.15, outputPricePerMillion: 0.6 },
  // Meta (Llama) — hosted rates via groq.com/pricing
  { id: 'llama-4-scout', name: 'Llama 4 Scout', provider: 'meta', inputPricePerMillion: 0.11, outputPricePerMillion: 0.34 },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'meta', inputPricePerMillion: 0.59, outputPricePerMillion: 0.79 },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', provider: 'meta', inputPricePerMillion: 0.05, outputPricePerMillion: 0.08 },
  // Moonshot — platform.kimi.ai/docs/pricing (cache-miss input rate)
  { id: 'kimi-k2.6', name: 'Kimi K2.6', provider: 'moonshot', inputPricePerMillion: 0.95, outputPricePerMillion: 4.0 },
  { id: 'kimi-k2', name: 'Kimi K2', provider: 'moonshot', inputPricePerMillion: 0.60, outputPricePerMillion: 2.5 },
  // MiniMax — platform.minimax.io/docs/guides/pricing-paygo
  { id: 'minimax-m2.7', name: 'MiniMax M2.7', provider: 'minimax', inputPricePerMillion: 0.30, outputPricePerMillion: 1.20 },
  // Zhipu (GLM / Z.ai) — docs.z.ai/guides/overview/pricing
  { id: 'glm-4.7', name: 'GLM-4.7', provider: 'zhipu', inputPricePerMillion: 0.60, outputPricePerMillion: 2.20 },
  { id: 'glm-5', name: 'GLM-5', provider: 'zhipu', inputPricePerMillion: 1.0, outputPricePerMillion: 3.2 },
];

export const DEFAULT_MODELS = ['claude-opus-4.7', 'gpt-5.5', 'gemini-3.1-pro', 'grok-4.3'];

export const PRESETS = {
  flagships: ['gpt-5.5', 'claude-opus-4.7', 'claude-sonnet-4.6', 'gemini-3.1-pro', 'gemini-3.5-flash', 'grok-4.3', 'gpt-5.3-codex', 'glm-5', 'kimi-k2.6', 'mistral-large-3'],
  budget: ['gpt-5.4-nano', 'claude-haiku-4.5', 'gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-3.1-flash-lite', 'deepseek-v4-flash', 'llama-3.1-8b', 'llama-4-scout', 'mistral-small-4', 'minimax-m2.7', 'glm-4.7'],
  all: MODELS.map((m) => m.id),
};
