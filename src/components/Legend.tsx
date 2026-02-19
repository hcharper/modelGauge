'use client';

import { PROVIDERS } from '@/data/models';
import type { ProviderId } from '@/types';

export function Legend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-3 text-xs text-neutral-500">
      {(Object.keys(PROVIDERS) as ProviderId[]).map((id) => {
        const p = PROVIDERS[id];
        return (
          <div key={id} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span>{p.label}</span>
          </div>
        );
      })}
    </div>
  );
}
