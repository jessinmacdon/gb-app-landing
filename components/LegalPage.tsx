import { InlineLinks } from '@/components/InlineLinks';
import { ScrollRestorer } from '@/components/ScrollRestorer';
import { Footer } from '@/components/sections/Footer';
import { Nav } from '@/components/sections/Nav';
import type { Dictionary } from '@/lib/content';
import type { LegalBlock, LegalDoc, SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

type Props = { lang: Locale; t: Dictionary; site: SiteContent; doc: LegalDoc };

function Block({ block, lang }: { block: LegalBlock; lang: Locale }) {
  switch (block.type) {
    case 'h3':
      return <h3 className="legal__h3">{block.text[lang]}</h3>;
    case 'note':
      return (
        <p className="legal__note">
          <InlineLinks text={block.text[lang]} />
        </p>
      );
    case 'table':
      return (
        <div className="legal__table-wrap">
          <table className="legal__table">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">
                    {h[lang]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <InlineLinks text={cell[lang]} />
                      </th>
                    ) : (
                      <td key={j}>
                        <InlineLinks text={cell[lang]} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'list':
      return (
        <ul className={`legal__list${block.plain ? ' legal__list--plain' : ''}`}>
          {block.items.map((item, i) => (
            <li key={i}>
              {item.term ? <strong>{item.term[lang]}</strong> : null}
              {item.term ? (lang === 'fr' ? '\u202f: ' : ': ') : null}
              <InlineLinks text={item.text[lang]} />
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p>
          <InlineLinks text={block.text[lang]} />
        </p>
      );
  }
}

/** Privacy policy and terms: the landing page's nav and footer around readable long-form text. */
export function LegalPage({ lang, t, site, doc }: Props) {
  const home = `/${lang}`;
  const { company } = site;
  const l = t.legalPage;
  return (
    <div className="page">
      <ScrollRestorer lang={lang} />
      <Nav lang={lang} t={t} appLinks={site.appLinks} home={home} />
      <main>
        <header className="legal-head">
          <div className="container legal-head__inner">
            <span className="eyebrow eyebrow--dark-bg">{l.eyebrow}</span>
            <h1 className="legal-head__title">{doc.title[lang]}</h1>
            {doc.effective ? <p className="legal-head__meta">{doc.effective[lang]}</p> : null}
          </div>
        </header>

        <div className="container legal">
          <nav className="legal__toc" aria-labelledby="legal-toc">
            <h2 className="legal__toc-title" id="legal-toc">
              {l.contents}
            </h2>
            <ol>
              {doc.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#s${i + 1}`}>{s.heading[lang]}</a>
                </li>
              ))}
              {doc.contact ? (
                <li>
                  <a href="#contact">{l.contactTitle}</a>
                </li>
              ) : null}
            </ol>
          </nav>

          <article className="legal__body">
            {doc.intro.map((p, i) => (
              <p key={i} className="legal__intro">
                <InlineLinks text={p[lang]} />
              </p>
            ))}
            {doc.sections.map((s, i) => (
              <section key={i} id={`s${i + 1}`} className="legal__section">
                <h2 className="legal__h2">
                  <span className="legal__num">{i + 1}</span>
                  {s.heading[lang]}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} lang={lang} />
                ))}
              </section>
            ))}
            {doc.contact ? (
              <section id="contact" className="legal__section">
                <h2 className="legal__h2">
                  <span className="legal__num">{doc.sections.length + 1}</span>
                  {l.contactTitle}
                </h2>
                <p>{doc.contact[lang]}</p>
                <dl className="legal__contact">
                  {company.supportEmail ? (
                    <div>
                      <dt>{l.email}</dt>
                      <dd>
                        <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
                      </dd>
                    </div>
                  ) : null}
                  {company.phone ? (
                    <div>
                      <dt>{l.phone}</dt>
                      <dd>
                        <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>{l.address}</dt>
                    <dd>
                      {company.legalName}, {company.address[lang]}
                    </dd>
                  </div>
                </dl>
              </section>
            ) : null}
            {doc.outro?.map((p, i) => (
              <p key={i} className="legal__outro">
                <InlineLinks text={p[lang]} />
              </p>
            ))}
          </article>
        </div>
      </main>
      <Footer lang={lang} t={t} site={site} home={home} />
    </div>
  );
}
