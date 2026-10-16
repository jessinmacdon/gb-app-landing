'use client';

import { useLayoutEffect } from 'react';

/** The page's one easing: a confident deceleration, no bounce. */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Strong ease-in-out for things moving across the screen (re-ranking). */
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

/**
 * Counts `ref`'s text from 0 to `value` when `runKey` changes (not on first
 * render, so the server-rendered figure is what people see by default). Writes
 * straight to the DOM: no React re-render per frame. React keeps rendering the
 * final value, which is what the count lands on. Reduced motion skips it.
 */
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  value: number,
  runKey: number,
  format: (n: number) => string,
  { delayMs = 0, durationMs = 600 } = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!runKey || !el || prefersReducedMotion()) return;
    let frame = 0;
    let start = 0;
    el.textContent = format(0);
    const tick = (now: number) => {
      start ||= now + delayMs;
      const t = Math.min(1, Math.max(0, (now - start) / durationMs));
      el.textContent = format(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
    // format is a stable module function in practice; runKey drives replays.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, runKey, delayMs, durationMs]);
}
