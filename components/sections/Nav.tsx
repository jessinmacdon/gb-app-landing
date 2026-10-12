import { GetAppLink } from '@/components/GetAppLink';
import { LangToggle } from '@/components/LangToggle';
import { MobileMenu } from '@/components/MobileMenu';
import { Logo } from '@/components/sections/Logo';
import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

type Props = {
  lang: Locale;
  t: Dictionary;
  appLinks: SiteContent['appLinks'];
  /** Set on pages other than the landing page, so section links lead back to it. */
  home?: string;
};

export function Nav({ lang, t, appLinks, home }: Props) {
  const base = home ?? '';
  const links = [
    { href: `${base}#how`, label: t.nav.how },
    { href: `${base}#pricing`, label: t.nav.pricing },
    { href: `${base}#why`, label: t.nav.why },
    { href: `${base}#faq`, label: t.nav.faq },
  ];
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Logo href={home} />
        <nav className="nav__links" aria-label={t.navLabel}>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <LangToggle lang={lang} label={t.langLabel} />
          {/* Phones get the floating download bar instead (StickyDownload). */}
          <GetAppLink className="nav__cta" links={appLinks} section="nav">
            {t.nav.download}
          </GetAppLink>
          <MobileMenu links={links} labels={{ open: t.menuOpen, close: t.menuClose }} />
        </div>
      </div>
    </header>
  );
}
