'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { MODELS, PROVIDERS, PRESETS } from '@/data/models';
import type { ProviderId } from '@/types';
import { MIN_SELECTED_MODELS } from '@/lib/constants';

interface ModelSelectorProps {
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
}

export function ModelSelector({ selected, onChange }: ModelSelectorProps) {
  const [expanded, setExpanded] = useState(false);

  const grouped = MODELS.reduce(
    (acc, model) => {
      if (!acc[model.provider]) acc[model.provider] = [];
      acc[model.provider].push(model);
      return acc;
    },
    {} as Record<ProviderId, typeof MODELS>
  );

  const toggleModel = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(next);
  };

  const toggleProvider = (provider: ProviderId) => {
    const providerModels = grouped[provider].map((m) => m.id);
    const allSelected = providerModels.every((id) => selected.has(id));
    const next = new Set(selected);

    if (allSelected) {
      providerModels.forEach((id) => next.delete(id));
    } else {
      providerModels.forEach((id) => next.add(id));
    }
    onChange(next);
  };

  const applyPreset = (preset: string[]) => {
    onChange(new Set(preset));
  };

  const tooFew = selected.size < MIN_SELECTED_MODELS;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
        >
          Models ({selected.size} selected)
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <div className="flex flex-wrap gap-2">
          <PresetButton label="Flagships" onClick={() => applyPreset(PRESETS.flagships)} />
          <PresetButton label="Budget" onClick={() => applyPreset(PRESETS.budget)} />
          <PresetButton label="All" onClick={() => applyPreset(PRESETS.all)} />
          <PresetButton label="Clear" onClick={() => onChange(new Set())} />
        </div>
      </div>

      {tooFew && (
        <p className="text-xs text-amber-400 mb-2">Select at least {MIN_SELECTED_MODELS} models to start</p>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {(Object.keys(grouped) as ProviderId[]).map((provider) => {
                const meta = PROVIDERS[provider];
                const models = grouped[provider];
                const allChecked = models.every((m) => selected.has(m.id));
                const someChecked = models.some((m) => selected.has(m.id));

                return (
                  <div key={provider}>
                    <button
                      onClick={() => toggleProvider(provider)}
                      className={`text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${meta.textClass} hover:opacity-80`}
                    >
                      {meta.label}
                      <span className="ml-1.5 text-neutral-500">
                        {someChecked && !allChecked ? '(some)' : allChecked ? '(all)' : ''}
                      </span>
                    </button>
                    <div className="flex flex-wrap gap-1.5">
                      {models.map((model) => {
                        const isSelected = selected.has(model.id);
                        return (
                          <button
                            key={model.id}
                            onClick={() => toggleModel(model.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                              isSelected
                                ? `${meta.bgClass} bg-opacity-20 ${meta.borderClass} text-white`
                                : 'border-[var(--color-border)] text-neutral-400 hover:text-neutral-200 hover:border-neutral-500'
                            }`}
                            style={
                              isSelected
                                ? { backgroundColor: `${meta.color}20`, borderColor: meta.color }
                                : undefined
                            }
                          >
                            {model.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs rounded-md bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-neutral-400 hover:text-white hover:border-neutral-500 transition-all"
    >
      {label}
    </button>
  );
}
