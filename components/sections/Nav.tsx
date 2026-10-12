import { GetAppLink } from '@/components/GetAppLink';
import { LangToggle } from '@/components/LangToggle';
import { MobileMenu } from '@/components/MobileMenu';
import { Logo } from '@/components/sections/Logo';
import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function Nav({ lang, t, appLinks }: { lang: Locale; t: Dictionary; appLinks: SiteContent['appLinks'] }) {
  const links = [
    { href: '#how', label: t.nav.how },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#why', label: t.nav.why },
    { href: '#faq', label: t.nav.faq },
  ];
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Logo />
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
