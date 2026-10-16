'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  links: { href: string; label: string }[];
  labels: { open: string; close: string };
  /** Shown under the links on phones (the language switch). */
  footer?: React.ReactNode;
};

/**
 * Section links for screens where the inline nav is hidden. Closes on link
 * tap, Escape (returning focus to the button) or a tap outside the panel.
 */
export function MobileMenu({ links, labels, footer }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // The phone download bar steps aside while the menu is open.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('gb:menu', { detail: open }));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div className="menu" ref={root}>
      <button
        ref={button}
        type="button"
        className="menu__btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* Three lines that fold into an X (CSS, keyed on aria-expanded). */}
          <path className="menu__line menu__line--top" d="M3 6h14" />
          <path className="menu__line menu__line--mid" d="M3 10h14" />
          <path className="menu__line menu__line--bot" d="M3 14h14" />
        </svg>
      </button>
      <nav id="mobile-menu" className="menu__panel" data-open={open} inert={!open} aria-label={labels.open}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {footer}
      </nav>
    </div>
  );
}
