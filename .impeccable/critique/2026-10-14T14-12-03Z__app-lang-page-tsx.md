---
target: landing page
total_score: 27
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:/home/claude/gb-app-landing/app/[lang]/page.tsx"
target_fingerprint: "sha256:fcf8e98c017222aa5fccd83badc9f8accfe43ebb156ba6981cd7f729fd2811b8"
target_path: /home/claude/gb-app-landing/app/[lang]/page.tsx
timestamp: 2026-10-14T14-12-03Z
slug: app-lang-page-tsx
---
Method: dual-agent (A: design review subagent · B: detector + browser subagent)

## Design health score: 27/36 (Good). n/a: 7, 10 scored.
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
| 10 | Help and documentation | 3 |

## Detector
Static: 0. URL /en 13 · /fr 14 · /en@390 14 · /en/privacy 4. Pinned/known: kicker ×7, glow ×2, overused font, cream, step__n contrast (kept by owner), phone mockup nested-card/occlusion. Real: .legal__note side-tab; legal line length 90–96ch at 1280.

## Priority issues
- [P1] Terms states refund terms (7 days, 10–15 business days) though PRODUCT.md says refund policy is unpublished. → clarify
- [P1] Paying from abroad unexplained: FAQ says family abroad can pay, only MoMo listed, cards coming soon. → clarify (needs facts)
- [P2] Hero phone title hidden by "Ready for pickup" card; FR shows fragment "ande". → polish
- [P2] Demo: invalid-link error leaves previous example receipt fully visible; mobile scroll-to-total puts receipt head under fixed nav. → harden
- [P2] Catalog overload (10 categories + 3 rank modes + 6 products; chips clipped on mobile); quote tabs 40px, lang switch 35px < 44px. → distill / adapt

## Minor
Privacy lacks a "last updated" date; Berlin entity unexplained to Cameroon readers; FR hero note wraps below fold at 1440; hero visual mixes three moments; menu has no Get the app link; FR sticky hint wraps to 2 lines; legal__note side stripe; legal line length.

## Strengths
Honest demo (labelled examples, share-text parsing, fix-it errors); exchange-rate "no markup" line; solid mobile mechanics.
