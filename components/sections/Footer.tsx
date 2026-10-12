import { socialMeta } from '@/components/Icons';
import { Logo } from '@/components/sections/Logo';
import type { Dictionary } from '@/lib/content';
import type { SiteContent, SocialNetwork } from '@/lib/content/types';

const SOCIAL_ORDER: SocialNetwork[] = ['instagram', 'facebook', 'x', 'whatsapp', 'tiktok'];

export function Footer({ t, site }: { t: Dictionary; site: SiteContent }) {
  const liveCities = site.cities.filter((c) => c.live).map((c) => c.name);
  return (
    <footer className="container footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Logo />
          <p className="footer__tag">{t.footTag}</p>
        </div>
        <div className="footer__cols">
          <nav className="footer__col" aria-labelledby="foot-legal">
            <h2 className="footer__col-title" id="foot-legal">
              {t.footLegal}
            </h2>
            <ul className="footer__links">
              <li>
                <a href={site.legal.privacy}>{t.legal.privacy}</a>
              </li>
              <li>
                <a href={site.legal.terms}>{t.legal.terms}</a>
              </li>
              <li>
                <a href={site.legal.refund}>{t.legal.refund}</a>
              </li>
            </ul>
          </nav>
          <div className="footer__col">
            <h2 className="footer__col-title" id="foot-follow">
              {t.footFollow}
            </h2>
            <ul className="social" aria-labelledby="foot-follow">
              {SOCIAL_ORDER.filter((k) => site.social[k]).map((k) => (
                <li key={k}>
                  <a
                    className="social__link"
                    href={site.social[k]}
                    aria-label={socialMeta[k].label}
                    target="_blank"
                    rel="noopener"
                  >
                    {socialMeta[k].icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 GlobalBuy. {t.rights}</span>
        <span>{liveCities.join(' · ')}</span>
      </div>
    </footer>
  );
}
