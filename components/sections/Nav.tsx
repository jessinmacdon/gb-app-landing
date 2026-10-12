import { GetAppLink } from '@/components/GetAppLink';
import { LangToggle } from '@/components/LangToggle';
import { Logo } from '@/components/sections/Logo';
import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function Nav({ lang, t, appLinks }: { lang: Locale; t: Dictionary; appLinks: SiteContent['appLinks'] }) {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Logo />
        <nav className="nav__links" aria-label={t.navLabel}>
          <a href="#how">{t.nav.how}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="#why">{t.nav.why}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>
        <div className="nav__actions">
          <LangToggle lang={lang} label={t.langLabel} />
          <GetAppLink className="nav__cta" links={appLinks} section="nav">
            {t.nav.download}
          </GetAppLink>
        </div>
      </div>
    </header>
  );
}
