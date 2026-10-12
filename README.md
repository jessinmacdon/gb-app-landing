# GlobalBuy landing page

GlobalBuy marketing site: Next.js 16 (App Router) + TypeScript, built from the Claude
Design handoff. Bilingual (EN/FR), statically prerendered, with every dynamic section
driven by content files. Deployed on Netlify (see `netlify.toml`).

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /fr
npm test           # ranking, formatting, language detection, content validation
npm run lint       # type-check
npm run build      # fails if content is invalid
```

## Legacy pages

The pages from the previous static site live in `public/` and are served unchanged at
their old URLs: `/how-it-works.html`, `/contact.html`, `/privacy.html`,
`/terms-of-service.html` (with their `styles/` and `app.js`). `/index.html` redirects
to the new home page. They still use the old GlobalBuy24 look; port them to the new
design when ready.

## Editing content

All content lives in `content/`. Every user-facing string is `{ "en": "…", "fr": "…" }`.
Money is integer XAF and is displayed as `96 800 FCFA`.

| File | Drives |
| --- | --- |
| `categories.json` | **What we ship**: categories and products (image, price, rating, delivery days, `active`) |
| `ranking-modes.json` | Rank-by control labels and descriptions (`price`, `quality`, `delivery`, `variety`) |
| `example-quotes.json` | **Pricing** quote pills and receipt; the one with `isHeroPhoneExample: true` also fills the hero phone |
| `faq.json` | **FAQ** accordion; `defaultOpen` marks the item open on load. Answers support `[link text](https://…)` |
| `testimonials.json` | Customer quotes and avatars |
| `site.json` | Stores strip, cities (`live`), payment methods, app/social/legal links, How-it-works steps, Why features, lifestyle photos, What-we-ship defaults |
| `i18n/en.json`, `i18n/fr.json` | Static UI copy (both files must have the same keys) |

Content is checked by `lib/content/validate.ts` on every build and test run. Missing
translations, duplicate ids, bad numbers, a missing hero quote or mismatched i18n
keys fail with a readable list of problems.

**Images.** Any `imageUrl`, `avatarUrl`, `logoUrl` or `site.images.*.url` can be a
path under `public/` (e.g. `/images/products/jbl-flip-6.jpg`) or an absolute URL. For
remote hosts, list them in the `IMAGE_HOSTS` env var (comma-separated) so Next can
optimize them. A missing or broken image falls back to the design's striped placeholder.
Product thumbnails should be square and at least 256×256.

**Quote totals** are always computed from the breakdown; there is no total field to keep in sync.

## Moving to a CMS or API

Components only talk to `lib/content/index.ts` (`getCategories()`, `getExampleQuotes()`,
`getFaq()`, …). Replace those function bodies with fetches that return the types in
`lib/content/types.ts`, keep the `validateContent` call, and nothing else changes.
The What-we-ship browser already sits in a `<Suspense>` boundary with a 6-row loading
skeleton. Ranking (`lib/ranking.ts`) is a pure function that can move server-side as is.

## How it is built

- `app/[lang]/`: one statically generated page per language; `<html lang>` follows the route.
- `proxy.ts`: `/` redirects to the saved language (`lang` cookie), then to `Accept-Language`, then to English.
- `components/sections/*`: server components, one per page section.
- `components/{CategoryBrowser,QuoteExplorer,FaqAccordion,LangToggle,StoreBadges}.tsx`: the interactive client parts.
- `app/globals.css`: design tokens and styles, values taken 1:1 from the prototype.
  Breakpoints: category pills become a swipe row below 720px, and the nav links show from 960px.
- `lib/track.ts`: download clicks, category/ranking/quote selection, FAQ opens and
  language switches are pushed to `window.dataLayer` and dispatched as a
  `globalbuy:track` DOM event. Wire up your analytics there.

Switching language keeps the visitor's scroll position, category, ranking, quote and open FAQ item.

## Before launch

- Replace placeholder data: all products, prices, ratings and delivery times, the example
  quotes and the testimonials (`placeholder: true`) are invented.
- Add photography: hero, Why, final CTA, product thumbnails, testimonial avatars and the hero phone product.
- Swap the approximated Google Play / App Store badges for the official artwork (EN and FR), and the
  MTN / Orange typographic tiles for official logos (`payments[].logoUrl`).
- Set real social and legal links in `site.json`.
- Get the French copy reviewed by a native speaker.
