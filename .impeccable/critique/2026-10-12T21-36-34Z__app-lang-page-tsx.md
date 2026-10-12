---
target: landing page
total_score: 26
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:/home/claude/gb-app-landing/app/[lang]/page.tsx"
target_fingerprint: "sha256:d0a8a5943412c7183ad8a8ca1cccb8cb209412a818439b95118ef76cfaefcac8"
target_path: /home/claude/gb-app-landing/app/[lang]/page.tsx
timestamp: 2026-10-12T21-36-34Z
slug: app-lang-page-tsx
---
Method: dual-agent (A: design review subagent · B: detector + browser subagent)

## Design health score: 26/36 (Good)

| # | Heuristic | Score |
|---|---|---|
| 1 | Visibility of system status | 3 |
| 2 | Match with the real world | 3 |
| 3 | User control and freedom | 3 |
| 4 | Consistency and standards | 3 |
| 5 | Error prevention | 3 |
| 6 | Recognition over recall | 3 |
| 7 | Flexibility and efficiency | n/a |
| 8 | Aesthetic and minimalist design | 3 |
| 9 | Error recovery | 3 |
| 10 | Help and documentation | 2 |

Cognitive load: moderate (2 failures: 9 category pills; 14 stores plus an unchunked FAQ).

## Detector
/en 14 · /fr 15 · /en@390 15. Same rule set as runs 1–3. All findings are pinned style or intentional: kicker-above-heading ×7, radial glow ×2, overused font, cream palette, nested cards and text occlusion inside the aria-hidden phone mockup, decorative step numbers at 2.1:1.

## Priority issues
- [P1] Demo result off-screen on mobile: after a quote the receipt starts near y=712/844, the sticky download bar covers it and the total sits below the fold; the bar also shows over the open menu. Fix: scroll the total into view on phones; hide StickyDownload while #pricing or the menu is open. → /impeccable adapt
- [P1] Testable trust claims: "100% authentic" sits beside AliExpress/SHEIN/eBay/Etsy examples; example fees range 5.2%–17.6% with no stated rule; "Example items people order" implies order history. Fix: scope the authenticity claim, rename to "Example items you could order", add a fee line once confirmed. → /impeccable clarify
- [P2] Loading copy overstates and has a grammar bug ("reads the product page" before a substituted example; "Here's a Amazon example"). → /impeccable harden
- [P2] FAQ silent on delivery time, pickup addresses, price changes, app size. Needs facts. → /impeccable onboard
- [P2] Mobile length and density: 9,518px page, tall step cards, rank-by grid leaves "Variety" alone on a row. → /impeccable distill / layout

## Minor
Footer email link 20px tall; aria-live wraps the whole receipt; FR "iPad 10.9" 64 GB" not localized; FR final CTA wraps to 5 lines on mobile; payment card gap on desktop; h1 at 1280px orphans "world." (pinned).

## Strengths
Honest handling of gaps (examples labelled, no invented facts); forgiving link parser; solid mobile mechanics (sticky nav, menu, sticky download, scroll restore).

## Questions
- Claim "no markup on the exchange rate" (€1 = 656 is the official peg)?
- Add a reseller section?
- Should the demo stop substituting examples for unknown links?
- Should the final CTA bring back the visitor's last receipt?

## Merge verdict
No P0 design blockers. Merge blocker remains: placeholder store and social links.
