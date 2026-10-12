'use client';

import { useEffect, useRef, useState } from 'react';

/** The page's one easing: a confident deceleration, no bounce. */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts from 0 to `value` when `runKey` changes (not on first render, so the
 * server-rendered figure is what people see by default). Reduced motion shows
 * the final value straight away.
 */
export function useCountUp(value: number, runKey: number, durationMs = 650) {
  const [shown, setShown] = useState(value);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setShown(value);
      return;
    }
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, runKey, durationMs]);

  return shown;
}
