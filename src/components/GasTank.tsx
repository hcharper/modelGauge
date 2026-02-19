'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TankFluid } from './TankFluid';
import { PROVIDERS } from '@/data/models';
import type { ModelDef, TankState, UsageMode } from '@/types';
import { BUDGET, USAGE_PROFILES } from '@/lib/constants';
import { formatDollars } from '@/lib/calculations';

interface GasTankProps {
  model: ModelDef;
  state: TankState;
  mode: UsageMode;
}

export function GasTank({ model, state, mode }: GasTankProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const provider = PROVIDERS[model.provider];
  const fillPercent = (state.remaining / BUDGET) * 100;
  const profile = USAGE_PROFILES[mode];

  const glowClass =
    state.isEmpty ? 'glow-red' : fillPercent < 25 ? 'glow-amber' : fillPercent > 75 ? 'glow-green' : '';

  const shakeClass = state.isEmpty ? 'animate-shake' : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Model name */}
      <div className="text-center">
        <p className={`text-xs font-semibold ${provider.textClass}`}>{model.name}</p>
      </div>

      {/* Tank container */}
      <div className="relative">
        <div
          className={`relative w-16 h-40 rounded-lg border-2 overflow-hidden ${glowClass} ${shakeClass}`}
          style={{ borderColor: `${provider.color}60`, backgroundColor: '#0d0d15' }}
        >
          {/* Graduation marks */}
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 border-t border-white/5"
              style={{ bottom: `${mark}%` }}
            />
          ))}

          <TankFluid fillPercent={fillPercent} color={provider.color} />

          {/* Cap on top */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-t-sm"
            style={{ backgroundColor: `${provider.color}40` }}
          />
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-3 rounded-lg bg-neutral-900 border border-[var(--color-border)] shadow-xl text-xs"
            >
              <p className="font-semibold text-white mb-2">{model.name}</p>
              <div className="space-y-1 text-neutral-400">
                <p>Input: ${model.inputPricePerMillion}/M tokens</p>
                <p>Output: ${model.outputPricePerMillion}/M tokens</p>
                <div className="border-t border-[var(--color-border)] my-1.5" />
                <p>
                  Mode: {profile.label} ({profile.inputTokensPerMessage} in / {profile.outputTokensPerMessage} out)
                </p>
                <p>Cost/msg: {formatDollars(state.costPerMessage)}</p>
                <p>Total msgs/$100: {state.totalMessages.toLocaleString()}</p>
              </div>
              {/* Arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45 bg-neutral-900 border-r border-b border-[var(--color-border)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats below tank */}
      <div className="text-center">
        <p className={`text-sm font-mono font-bold ${state.isEmpty ? 'text-red-400' : 'text-white'}`}>
          {formatDollars(state.remaining)}
        </p>
        <p className="text-[10px] text-neutral-500">
          {state.messagesUsed.toLocaleString()} msgs
        </p>
      </div>
    </motion.div>
  );
}
