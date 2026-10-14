# GlobalBuy24 landing page

GlobalBuy24 marketing site: Next.js 16 (App Router) + TypeScript, built from the Claude
Design handoff. Bilingual (EN/FR), statically prerendered, with every dynamic section
driven by content files. Deployed on Netlify (see `netlify.toml`).

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /fr
npm test           # ranking, formatting, language detection, content validation
npm run lint       # type-check
npm run build      # fails if content is invalid
```

## Legal pages and old URLs

The privacy policy and terms live at `/en/privacy`, `/fr/privacy`, `/en/terms` and
`/fr/terms`. Their text is in `content/legal/*.json` (both languages, validated like the
rest of the content); company address, phone and email come from `content/site.json`.

`proxy.ts` sends language-less and old static-site URLs to the visitor's language:
`/privacy.html` and `/terms-of-service.html` to the legal pages, `/how-it-works.html`
and `/contact.html` to the home page's How it works and FAQ sections.

## Editing content

All content lives in `content/`. Every user-facing string is `{ "en": "…", "fr": "…" }`.
Money is integer XAF and is displayed as `96 800 FCFA`.

| File | Drives |
| --- | --- |
| `categories.json` | **What we ship**: categories and products (image, price, rating, delivery days, `active`) |
| `ranking-modes.json` | Rank-by control labels and descriptions (`price`, `quality`, `delivery`, `variety`) |
| `example-quotes.json` | The **Pricing** section's paste-a-link demo and example pills. The quote with `isHeroPhoneExample: true` fills the hero phone, and Pricing opens on a different one. `originalPrice` (`{ amount, currency }`) shows the listing price in the store's currency, and the exchange rate shown is derived from it and `breakdownXAF.product`. `sampleUrl` is each example's demo link |
| `faq.json` | **FAQ** accordion; `defaultOpen` marks the item open on load. Answers support `[link text](https://…)` |
| `testimonials.json` | Customer quotes and avatars. Entries with `placeholder: true` are never shown, and the section stays hidden until at least one real testimonial exists |
| `site.json` | Stores strip, cities (`live`), payment methods, app/social/legal links, company name and support email, How-it-works steps, Why features, lifestyle photos, What-we-ship defaults. Set a social or legal link to `null` to hide it until it exists. `whatWeShip.sampleData: true` labels the picks as examples ("Example items people order") and hides the delivery-day chips and the "Fastest" ranking, since sample data has no real delivery times; set it to `false` once the products are real |
| `i18n/en.json`, `i18n/fr.json` | Static UI copy (both files must have the same keys) |

Content is checked by `lib/content/validate.ts` on every build and test run. Missing
translations, duplicate ids, bad numbers, a missing hero quote or mismatched i18n
keys fail with a readable list of problems.

**Images.** Any `imageUrl`, `avatarUrl`, `logoUrl` or `site.images.*.url` can be a
path under `public/` (e.g. `/images/products/jbl-flip-6.jpg`) or an absolute URL. For
remote hosts, list them in the `IMAGE_HOSTS` env var (comma-separated) so Next can
optimize them. Missing or broken images never show an empty frame: product and
quote thumbnails fall back to a store monogram, avatars to initials, and the hero,
Why and final-CTA photos collapse (the CTA becomes a single column).
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
