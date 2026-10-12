import type { KeyboardEvent } from 'react';

/**
 * Arrow-key navigation for a tablist or radiogroup: Left/Right (and Up/Down)
 * move to the previous or next option, Home/End jump to the ends. The focused
 * option is activated, as for native radios. Pair with tabIndex={selected ? 0 : -1}.
 */
export function onRovingKeyDown(e: KeyboardEvent<HTMLElement>) {
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"],[role="radio"]'));
  const current = items.indexOf(document.activeElement as HTMLElement);
  if (current < 0) return;
  let next = current;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % items.length;
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + items.length) % items.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = items.length - 1;
  else return;
  e.preventDefault();
  items[next].focus();
  items[next].click();
}
