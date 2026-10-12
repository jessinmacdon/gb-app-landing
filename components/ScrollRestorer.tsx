'use client';

import { useEffect } from 'react';

export const SCROLL_KEY = 'gb:restore-scroll';

/**
 * After an EN ⇄ FR switch, returns the visitor to the scroll position they
 * left. The new page may still be laying out when this runs, so it retries for
 * a short while, and gives up as soon as the visitor scrolls on their own.
 */
export function ScrollRestorer({ lang }: { lang: string }) {
  useEffect(() => {
    let target: number | null = null;
    try {
      const raw = sessionStorage.getItem(SCROLL_KEY);
      if (!raw) return;
      sessionStorage.removeItem(SCROLL_KEY);
      // Compare the language, not location.pathname: on a client-side switch
      // the address bar can still show the old path when this runs.
      const saved = JSON.parse(raw) as { lang: string; y: number };
      if (saved.lang === lang && Number.isFinite(saved.y)) target = saved.y;
    } catch {
      // Storage unavailable or malformed: stay at the top.
    }
    if (target === null) return;

    let frame = 0;
    let tries = 0;
    const stop = () => cancelAnimationFrame(frame);
    const attempt = () => {
      window.scrollTo({ top: target!, behavior: 'instant' });
      if (Math.abs(window.scrollY - target!) > 2 && ++tries < 60) frame = requestAnimationFrame(attempt);
    };
    frame = requestAnimationFrame(attempt);
    window.addEventListener('wheel', stop, { once: true, passive: true });
    window.addEventListener('touchstart', stop, { once: true, passive: true });
    return () => {
      stop();
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
    };
  }, [lang]);
  return null;
}
