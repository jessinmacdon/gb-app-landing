---
target: landing page
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:/home/claude/gb-app-landing/app/[lang]/page.tsx"
target_fingerprint: "sha256:17a5ff2ab9d19b822b356371b52d15b6f7d2a273f7fe97a68baaeee09ef1f0aa"
target_path: /home/claude/gb-app-landing/app/[lang]/page.tsx
timestamp: 2026-10-12T17-54-29Z
slug: app-lang-page-tsx
---
Method: dual-agent (A: design review subagent · B: detector + browser subagent)

# Critique (run 3): GlobalBuy landing page (app/[lang]/page.tsx, branch stage)

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | The previous pill stays highlighted while a new example loads |
| 2 | Match System / Real World | 3 | "Popular picks" with ratings and days implies data that doesn't exist; FR closing line misfires |
| 3 | User Control and Freedom | 3 | Language switch keeps place; a stale demo notice can outlive new input |
| 4 | Consistency and Standards | 3 | Five download labels; FR rate formatted "€1" |
| 5 | Error Prevention | 2 | Silently disabled submit; share-sheet text containing a link is rejected |
| 6 | Recognition Rather Than Recall | 3 | Example pills and placeholder |
| 7 | Flexibility and Efficiency | n/a | Single-path page |
| 8 | Aesthetic and Minimalist Design | 3 | Dense catalogue; empty Why column on desktop |
| 9 | Error Recovery | 3 | Clear error, but the old receipt stays beside it |
| 10 | Help and Documentation | 2 | Nothing on app cost, pickup location or ID |
| Total | | 25/36 | Good (69%) |

## Design Specificity Verdict
Mostly authored for GlobalBuy; the Pricing demo is the peak (store price → rate → breakdown → total). The middle is generic (Why, catalogue, numbered steps). Missed: diaspora buyers, a desktop-to-phone handoff (QR code), pickup details, "is the app free". Detector: 13–15 per view, unchanged from run 2 (pinned style plus mockup and step-number false positives).

## Priority Issues
- [P1] Proof buried: the demo is ~6,000px down on mobile, below the catalogue. Fix: move Pricing right after How it works. /impeccable layout
- [P1] "Popular picks" implies non-existent data; delivery-day chips conflict with no confirmed day ranges. Fix: while sampleData, use the "Example items people order" label and hide the day chips and "Fastest" mode. /impeccable clarify
- [P2] Demo rejects share-sheet text with a link; stale notice and receipt on error; the previous pill stays pressed while loading. Fix: extract the URL, clear the notice on error, focus the field on an empty submit. /impeccable harden
- [P2] French parity: "à un lien près" misfires; rate formatting; hard-coded sticky hint. /impeccable clarify
- [P2] Unanswered pre-download questions (cost, size, pickup, diaspora); no desktop-to-phone path. /impeccable onboard (needs facts)

## Persona Red Flags
Jordan: non-tappable picks, "Variety"; cost and pickup unclear. Riley: share text rejected; stale notice; domestic Jumia given an international example. Casey: demo ~6,000px down, mockup 1.3 screens, sticky bar covers the receipt total. Reseller: fee 4,900 vs 12,000 with no rule; customs 12% vs 18% with no basis; nothing on bulk orders.

## Minor Observations
Why collapses poorly on desktop without a photo; large gap before the FAQ on desktop; disabled submit looks muddy; hero phone total not marked as an example; focus visible everywhere.

## Questions to Consider
1. Demo as the hero? 2. What does the catalogue prove that the demo doesn't? 3. State a rough fee rule? 4. Speak to diaspora buyers?
