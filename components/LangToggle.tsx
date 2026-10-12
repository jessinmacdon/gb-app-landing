'use client';

import { useRouter } from 'next/navigation';
import { LOCALE_COOKIE, locales, type Locale } from '@/lib/i18n';
import { track } from '@/lib/track';

export function LangToggle({ lang, label }: { lang: Locale; label: string }) {
  const router = useRouter();

  const choose = (next: Locale) => {
    if (next === lang) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    track({ event: 'language_switch', to: next });
    // Stay where the visitor is on the page.
    router.push(`/${next}${window.location.hash}`, { scroll: false });
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
