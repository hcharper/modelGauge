'use client';

import { useRef, useCallback, useEffect } from 'react';
import type { PlayState, SpeedMultiplier } from '@/types';
import { MESSAGES_PER_SECOND_BASE } from '@/lib/constants';

interface AnimationEngineOptions {
  playState: PlayState;
  speed: SpeedMultiplier;
  onTick: (elapsedMessages: number) => void;
  maxMessages: number;
}

export function useAnimationEngine({ playState, speed, onTick, maxMessages }: AnimationEngineOptions) {
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const tick = useCallback(
    (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const increment = delta * MESSAGES_PER_SECOND_BASE * speed;
      elapsedRef.current = Math.min(elapsedRef.current + increment, maxMessages);

      onTick(elapsedRef.current);

      if (elapsedRef.current < maxMessages) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [speed, onTick, maxMessages]
  );

  useEffect(() => {
    if (playState === 'playing') {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [playState, tick]);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    onTick(0);
  }, [onTick]);

  return { reset, elapsedMessages: elapsedRef };
}
