'use client';

import { useState } from 'react';

// Module scope survives client-side navigation, so switching EN ⇄ FR keeps the
// visitor's selected category, ranking, quote and open FAQ. A full reload
// starts from the content defaults, as on first visit.
const memory = new Map<string, unknown>();

export function useStickyState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => (memory.has(key) ? (memory.get(key) as T) : initial));
  const set = (next: T) => {
    memory.set(key, next);
    setValue(next);
  };
  return [value, set] as const;
}
