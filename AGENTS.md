# CONTINUUM — repository instructions

Before work read README.md, docs/architecture.md and docs/next.md. Inspect current branch, recent changes and open tasks; do not assume a prior chat is available. Work on one coherent, reversible change; use a branch and PR, not direct pushes to main. Do not touch ARTEMIS or the existing site prototype unless explicitly requested.

## Product invariants
- One shared linear time coordinate; no year zero in human labels. Dates, events, active construction intervals and existence are different concepts. Never infer a historical event from an interval boundary.
- Semantic vertical: domain → context/style → object/type → changes → selected object's detail. Collision tracks are layout, not historical data. No permanent country rows. Do not shift a historical date to resolve a collision.
- Visual First: visualize meaningful structures; nested timelines reuse the same temporal model and have independent viewport state. Semantic Zoom reveals detail, not fabricated precision. A style selection highlights, not filters, by default.
- Black, restrained, readable first-level UI. No account, editing, raw code, mandatory manual links or technical provenance panels in the default reader experience. Keep material uncertainty visible; accessible detail/source links remain available. Keyboard/touch, reduced motion and responsive layout matter.
- Stable shared object IDs; claims are distinct from entities and evidence. Unknown, disputed and ongoing are distinct; no invented bounds, facts, confidence scores or media permissions. Do not equate co-occurrence with causal influence.
- Airtable is editorial; application consumes validated versioned read-only exports. Never expose credentials to the browser or mutate shared schemas without a reviewed migration. No hardcoded layout coordinates in historical data.

## Engineering workflow
- Prefer small modules, pure domain logic and SVG/HTML initially; introduce infrastructure only after a demonstrated need.
- Preserve compatibility with published data; check referential integrity, schema versions and source provenance. Synthetic fixtures must be labeled and never presented as real historical facts.
- Run existing tests before and after changes. Add meaningful tests for changed behavior, not speculative test volume. Add lint/typecheck/build once application dependencies exist; report checks not run honestly.
- Keep secrets out of Git. Do not deploy, change billing, change repository visibility, or modify production data without permission. Do not bypass failed checks.
- Update docs/next.md with completed work, verified checks, decisions, unresolved risks and exactly one recommended next task. Summarize PR in Russian: what changed, user-visible effect, test results and next action. Avoid unnecessary technical details in user-facing summaries.
