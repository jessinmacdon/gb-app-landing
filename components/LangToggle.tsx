'use client';

import { useRouter } from 'next/navigation';
import { LOCALE_COOKIE, locales, type Locale } from '@/lib/i18n';
import { SCROLL_KEY } from '@/components/ScrollRestorer';
import { track } from '@/lib/track';

export function LangToggle({ lang, label }: { lang: Locale; label: string }) {
  const router = useRouter();

  const choose = (next: Locale) => {
    if (next === lang) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    track({ event: 'language_switch', to: next });
    // The other language is a separate page; ScrollRestorer puts the visitor
    // back where they were once it renders.
    try {
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ lang: next, y: window.scrollY }));
    } catch {
      // Storage unavailable (private mode): the switch still works, from the top.
    }
    router.push(`/${next}`, { scroll: false });
  };

  return (
    <div className="lang-toggle" role="group" aria-label={label}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          className="lang-toggle__opt"
          aria-current={l === lang}
          lang={l}
          onClick={() => choose(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
