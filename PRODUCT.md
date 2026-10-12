# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Cameroon who want products from international online stores that won't ship to them or won't take their payment methods:

- **Individual shoppers** buying for themselves or their family: fashion, phones, beauty, baby goods.
- **Small businesses and resellers** sourcing stock or tools from abroad.
- **Diaspora** ordering for relatives, who collect locally.
- **Students and professionals** buying laptops, books, equipment or parts they can't find locally.

## Product Purpose

GlobalBuy is a mobile app that lets anyone in Cameroon buy from any online store in the world. The user pastes a product link, gets one all-in quote, and pays with mobile money. GlobalBuy buys the item, ships it, clears customs, and holds it at a pickup point in the user's city.

It exists to serve an underserved market by removing three barriers:

1. **Shipping:** most online shops and marketplaces don't ship directly to Africa. Cameroon is the starting market.
2. **Payment:** those shops don't accept the payment methods the everyday African actually has.
3. **Opacity:** people who can reach global marketplaces resell to everyone else at steep markups (for example, a paint brush that costs €0.50 on Amazon sells for €5 locally). GlobalBuy shows the real price instead.

The landing page's main goal is app downloads (Google Play and App Store).

## Positioning

GlobalBuy gives direct, transparent access to the world's prices: one quote, broken down into what the item costs and what getting it home costs. This replaces the middlemen who profit because buyers can't see the original price.

It is meant to beat what people do today:

- asking someone abroad to buy and carry it;
- using freight forwarders, who leave customs and fees to the customer;
- paying more at local markets or on Jumia, with less choice and uncertain authenticity;
- not buying at all, because there's no international card.

## Operating Context

- **How an order works:**
  1. Paste a product link into the app.
  2. Get a quote covering product price, international shipping, customs and GlobalBuy's service fee.
  3. Pay with MTN Mobile Money or Orange Money.
  4. GlobalBuy handles shipping and customs and notifies the user when the order reaches their city's pickup point.
- **Ordering from abroad:** someone abroad can order and pay in the app for a relative, who collects in Cameroon.
- **Collecting:** the person collecting brings an ID.
- **Pickup cities live today:** Douala, Yaoundé, Buea, Limbe. More cities are planned.
- **Support:** in French and English. There's live chat in the app for customers with an active order (on the order confirmation page), and a GlobalBuy community, including support, opens on launch day. There's no WhatsApp support number yet; don't link or promise one.
- **Stores:** any online store with a product URL, including Amazon, eBay, SHEIN, Zalando, About You, Etsy, ASOS, Nike, AliExpress, Walmart, H&M, Sephora, Adidas and Jumia.

## Capabilities and Constraints

- **The app is free to download.**
- **Payments:** MTN Mobile Money and Orange Money. No international card is required. Bank card payments are coming soon.
- **Languages:** the site and app are bilingual, English and French.
- **Prohibited items:** GlobalBuy does not ship weapons, counterfeits, narcotics, hazardous materials, or items banned under Cameroonian import law.
- **Authenticity:** GlobalBuy buys only from official retailers and authorised sellers.
- **Tracking:** every stage, from purchase through customs to the pickup notification, is visible in the app.
- **Site stack:** Next.js 16 + TypeScript on Netlify. Dynamic content comes from JSON in `content/`.
- **Refund policy:** in progress. Don't link to it or describe its terms until it's published.
- **Undecided:** whether the quote breakdown (product + shipping + customs + service fee) is a permanent, fixed structure. Don't present it as a guarantee beyond "the quote you see is what you pay".

## Brand Commitments

- **Names:** the product name on the site is **GlobalBuy**. The company, domain and email addresses stay **GlobalBuy24** (globalbuy24.com, contact@globalbuy24.com, support@globalbuy24.com).
- **Bilingual parity:** French and English get equal standing. The current French copy is machine-written and needs a native review.

## Evidence on Hand

- **Missing evidence:** there are no confirmed real customer numbers, reviews, testimonials or order statistics yet.
- **Placeholders:** the testimonials, product prices, ratings, delivery times and example quotes in `content/` are invented placeholders, and future work must not present them as real.
- **Assets:** there is no photography and no official store badge or MTN/Orange logo artwork in the repo yet.
- **Resale prices:** there's no research on local resale prices, so don't show markup comparisons with invented local prices.
- **Logo:** an earlier site referenced `img/logo/logo_primary.png`, but the file isn't in the repo.

## Product Principles

1. **Show the real price.** Transparency is the product. Every price shown says what it includes, and nothing hides a markup.
2. **Work with what people already have:** mobile money, an Android phone, a local pickup point. Don't assume a card, a fast connection or a home address.
3. **Built for Cameroon, without condescension.** Global access is a right GlobalBuy restores, not a favour.
4. **Equal in French and English.** Neither language is the translation.
5. **Never fake trust.** Proof stays out until it's real.

## Accessibility & Inclusion

- **Devices and data:** most visitors are on Android phones with slow or expensive mobile data. Page weight, image size, font payload and JavaScript are product constraints, not polish.
- **Mobile first:** layouts start at phone width, with touch targets at least 44px.
- **Language:** EN/FR on every surface, with the visitor's language detected and remembered.
