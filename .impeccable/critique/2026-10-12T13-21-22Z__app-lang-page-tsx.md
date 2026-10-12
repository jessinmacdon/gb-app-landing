---
target: landing page
total_score: 20
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 3
target_identity: "file:/home/claude/gb-app-landing/app/[lang]/page.tsx"
target_fingerprint: "sha256:beb2f87c3fe8a8b11808675ee0bb11bdd849a478f20b23e63ab0477a93fbdefd"
target_path: /home/claude/gb-app-landing/app/[lang]/page.tsx
timestamp: 2026-10-12T13-21-22Z
slug: app-lang-page-tsx
---
Method: dual-agent (A: design review subagent · B: detector + browser subagent)

# Critique: GlobalBuy landing page (app/[lang]/page.tsx)

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Switching EN/FR resets scroll to the top (measured 3623 → 0) |
| 2 | Match System / Real World | 3 | Native FCFA/MoMo/cities; the original store price is never shown; French punctuation spacing missing |
| 3 | User Control and Freedom | 2 | No mobile nav menu on a 12,133px page; the language switch loses your place |
| 4 | Consistency and Standards | 2 | Three different selection controls; tabs lack arrow keys; nav "Get the app" scrolls instead of opening the store |
| 5 | Error Prevention | 2 | Invented ratings, delivery times and testimonials shown as fact; store badges link to store home pages |
| 6 | Recognition Rather Than Recall | 3 | Consistent quote row labels |
| 7 | Flexibility and Efficiency | n/a | Single-page Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | Stores listed 3×, Nike quote 2×, the "quote you see" claim 4+×; visible placeholder labels |
| 9 | Error Recovery | 2 | Refund link "#", WhatsApp link without a number, unlinked "Still unsure? WhatsApp" |
| 10 | Help and Documentation | 2 | FAQ misses lost items, refunds, customs overruns, cost of the app; no support contact |
| Total | | 20/36 | Acceptable (56%) |

## Design Specificity Verdict
Surface specific (palette, MTN/Orange tiles, FCFA receipt in the hero phone); structure generic: 9 of 11 sections use the same eyebrow + big H2 + grid template. The core story (reseller markup, €0.50 brush sold for €5) is absent: no comparison of the store price, the GlobalBuy price and the local price. The "What we ship" curated, ranked catalogue argues against "paste any link". Detector (URL scan, CSS loaded): 24–26 findings per view. kicker-above-heading ×8; low-contrast: eyebrow 3.0–3.4:1, pick rank 2.1:1, muted grey 4.4:1 ×5; undersized-ui-text 10px badge top (globals.css:206); radial-spotlight-glow ×2 (hero, CTA); overused-font (Instrument Sans 63%); cream-palette; aphoristic-cadence. False positives: stripes and slot labels (missing photos), occlusion and nested cards in the aria-hidden phone mockup, flat-type-hierarchy from the prerendered-HTML scan (CSS didn't load). The TSX CLI scan returned [] (it can't parse JSX).

## Priority Issues
- [P0] Invented proof presented as real: placeholder testimonials rendered, invented ratings and delivery chips, "Top rated"/"Fastest" ranking fiction. Fix: hide placeholder testimonials, remove rating chips and the quality/delivery modes, label totals as estimates, add verifiable commitments. /impeccable distill
- [P1] Transparency is never demonstrated: no store price vs GlobalBuy price vs local resale price; the receipt lacks the original currency price; Pricing repeats the hero quote. Fix: a "same item, three prices" module, the original price on the receipt, a different Pricing example. /impeccable shape
- [P1] Placeholder scaffolding ships as design: striped boxes and labels everywhere; the mobile page ends on an empty 340px block. Fix: collapse layouts when there's no image, store monograms for thumbnails. /impeccable layout
- [P1] Too long and heavy for slow networks, with a weak download path: 12,133px mobile page, ~483KB JS, 3 font families (~170KB), no sticky download button, nav CTA scrolls, desktop badges below the fold. Fix: drop the mono font, shrink or remove the category browser, merge Why into How, nav CTA to the store, sticky mobile download bar. /impeccable optimize
- [P2] Mobile and a11y defects: contrast (eyebrow, grey), 10px badge text, touch targets under 44px (lang toggle 28, quote tabs 40, nav CTA 38, footer links 19, social icons 42), rank-by wraps at 390px, default pill clipped, no arrow keys on tabs, language switch resets scroll, hard-coded English aria-label (CategoryBrowser.tsx:66), French punctuation spacing. /impeccable adapt, then /impeccable harden

## Persona Red Flags
- Jordan: mockup pay buttons look tappable; "Popular picks… Get the app to order" implies a catalogue; unclear whether the app is free or what a pickup point is; circular Why copy.
- Riley: "quote you see is what you pay" vs "illustrative/estimated"; "listed above" sits above the list; service fee 7.5% vs 5.2% with no rule; dead links; FR FAQ title not equivalent to EN.
- Casey: ~650px of mockup on mobile; no sticky download or nav; hidden selected pill; broken-looking rank-by; font reflow; ~480KB JS before interaction.
- Douala reseller: no bulk or landed-cost or commercial-customs information; no forwarder comparison; no company identity, pickup address, hours or loss guarantee; invented ratings undermine everything.

## Minor Observations
Step-card titles misaligned on desktop and gaps on mobile; "Customs cleared" chip covers the Orange Money button on mobile; "Orange / Orange Money" redundant; "Live in" vs "Disponible à" not equivalent; prohibited-items text duplicated; no contact details in the footer.

## Questions to Consider
1. Why does the page show no price except GlobalBuy's own?
2. Should "What we ship" exist, or become a simulated paste-a-link field?
3. Is the page less persuasive without the invented elements, or just more honest?
4. Would three screens with one thumb-reachable store button beat 14?
