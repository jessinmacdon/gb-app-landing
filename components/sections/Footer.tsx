import { socialMeta } from '@/components/Icons';
import { Logo } from '@/components/sections/Logo';
import type { Dictionary } from '@/lib/content';
import type { SiteContent, SocialNetwork } from '@/lib/content/types';

const SOCIAL_ORDER: SocialNetwork[] = ['instagram', 'facebook', 'x', 'whatsapp', 'tiktok'];

export function Footer({ t, site }: { t: Dictionary; site: SiteContent }) {
  // Links without a real destination yet (e.g. the refund policy) stay hidden.
  const legal = (
    [
      ['privacy', site.legal.privacy, t.legal.privacy],
      ['terms', site.legal.terms, t.legal.terms],
      ['refund', site.legal.refund, t.legal.refund],
    ] as const
  ).filter(([, href]) => href);
  const email = site.company.supportEmail;
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
              {legal.map(([key, href, label]) => (
                <li key={key}>
                  <a href={href ?? undefined}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          {email ? (
            <div className="footer__col">
              <h2 className="footer__col-title">{t.footContact}</h2>
              <ul className="footer__links">
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              </ul>
            </div>
          ) : null}
          <div className="footer__col">
            <h2 className="footer__col-title" id="foot-follow">
              {t.footFollow}
            </h2>
            <ul className="social" aria-labelledby="foot-follow">
              {SOCIAL_ORDER.filter((k) => site.social[k]).map((k) => (
                <li key={k}>
                  <a
                    className="social__link"
                    href={site.social[k] ?? undefined}
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
        <span>
          © 2026 GlobalBuy. {t.rights} {t.footOperator}
        </span>
      </div>
    </footer>
  );
}
