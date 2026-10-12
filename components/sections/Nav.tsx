import { LangToggle } from '@/components/LangToggle';
import { Logo } from '@/components/sections/Logo';
import type { Dictionary } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

export function Nav({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Logo />
        <nav className="nav__links" aria-label={t.navLabel}>
          <a href="#how">{t.nav.how}</a>
          <a href="#why">{t.nav.why}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>
        <div className="nav__actions">
          <LangToggle lang={lang} label={t.langLabel} />
          <a className="nav__cta" href="#download">
            {t.nav.download}
          </a>
        </div>
      </div>
    </header>
  );
}
