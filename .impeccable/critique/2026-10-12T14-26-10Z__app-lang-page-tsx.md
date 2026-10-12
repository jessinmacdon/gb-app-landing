---
target: landing page
total_score: 24
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 3
target_identity: "file:/home/claude/gb-app-landing/app/[lang]/page.tsx"
target_fingerprint: "sha256:76ca5769bed8f0e53cce6b7d774025737ddadb586ad781b35f7dcaa32c6543b2"
target_path: /home/claude/gb-app-landing/app/[lang]/page.tsx
timestamp: 2026-10-12T14-26-10Z
slug: app-lang-page-tsx
---
Method: dual-agent (A: design review subagent · B: detector + browser subagent)

# Critique (run 2): GlobalBuy landing page (app/[lang]/page.tsx, branch stage)

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Demo progress and choices persist; focus ring invisible on the mango section |
| 2 | Match System / Real World | 3 | "Your quote" above a product the visitor didn't paste |
| 3 | User Control and Freedom | 3 | Language switch keeps place; demo has no reset |
| 4 | Consistency and Standards | 3 | Three different pill styles for one job |
| 5 | Error Prevention | 2 | Links without a scheme rejected; any URL "succeeds" with an unrelated example |
| 6 | Recognition Rather Than Recall | 3 | Example chips and labelled rows |
| 7 | Flexibility and Efficiency | n/a | One-goal Persuade page |
| 8 | Aesthetic and Minimalist Design | 2 | ~13 mobile screens; quote widget twice; promise 4× |
| 9 | Error Recovery | 3 | Specific bilingual error that clears on typing |
| 10 | Help and Documentation | 2 | No delivery time or failure cases; only email before ordering |
| Total | | 24/36 | Good (67%) |

## Design Specificity Verdict
Clearly GlobalBuy's own (MoMo/Orange, FCFA, cities, a working paste-a-link demo); the structure is still a standard template, and the itemised quote is told four times. Biggest miss: process transparency (journey, timing, failure cases). Detector: 13–14 per view (was 24–26). kicker-above-heading ×7, radial-spotlight-glow ×2, overused-font, cream-palette (pinned style); text-occlusion and nested-cards in the aria-hidden mockup (intentional); step__n 2.1:1 (decorative); favicon 404. The design review's touch-target finding is a false positive: the controls have ::after hit areas ≥44px.

## Priority Issues
- [P0 for launch] Download links are store home pages (placeholder appLinks) and social links are network home pages. Fix: real listing URLs or a pre-launch state; null social links without accounts. /impeccable harden (needs URLs)
- [P1] The demo labels an unrelated example as "Your quote" for unlisted stores; scheme-less links rejected. Fix: "Example quote · {store}" and "Example total", show the pasted host, auto-prefix https://. /impeccable clarify
- [P1] No reassurance at payment: no timeline, failure cases or company identity. Fix: a "what happens after you pay" timeline with real day ranges; policy-bound FAQ entries. /impeccable onboard (needs facts)
- [P1] Repetition and length: Pricing duplicates the demo examples; the Why grid repeats; demo at ~3.7 screens. Fix: fold Pricing into the demo; trim Why. /impeccable distill (structural)
- [P2] Focus ring invisible on the mango section. Fix: forest focus ring on mango surfaces. /impeccable polish

## Persona Red Flags
- Jordan: 9 pills plus rank-by confuse whether you shop on the site; "Popular… Examples" raises popular with whom?
- Riley: Target/Jumia link → "Your quote: Nike"; amazon.com/x rejected; invisible focus; Play Store home page.
- Casey: hero ~1.7 screens, demo ~3.7 screens; the sticky bar helps; never reaches the FAQ.
- Douala reseller: exchange rate not shown ($379 → 229 000), so FX markup is suspected; no bulk or timing information; Jumia listed as a world store.

## Minor Observations
Step titles misaligned on desktop; empty space where the photos collapsed (Why left column, CTA right side); the demo's empty state takes ~300px on mobile; FR wording ("Actif", "Sélection populaire" + en, "&"); missing favicon.

## Questions to Consider
1. Should the hero be the paste field? 2. Is "What we ship" selling the app or competing with it? 3. Show the exchange rate on receipts? 4. What makes a first MoMo payment feel safe without proof?
