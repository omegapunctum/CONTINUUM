# Architecture baseline v0.1 — 2026-11-26

Working proposal derived from the two Space pages linked in README. The current site and Airtable live schema were not independently inspected for this bootstrap. This document is not evidence of an implemented migration.

## Product and data boundaries
CONTINUUM and ARTEMIS remain separate applications/repositories with a shared knowledge contract. Airtable KNOWLEDGE_BASE is the editorial system; publish immutable validated JSON releases with schema version, release ID, digest and source coverage. Each product projects the same objects differently. No shared database service or live browser Airtable requests in the first release.

Canonical KnowledgeObjects contain stable IDs and identity, Claims describe the subject, typed claim payloads express temporal/relation/spatial/classification/property assertions, EvidenceLinks connect individual claims to Sources. A source is a document/edition; an evidence link includes locator, stance and review state. Distinguish editorial review, epistemic status and publication state. Preserve legacy IDs/crosswalk and alternatives; no merging by title alone. Use existing verified UUIDs when 1:1 mapping is established. Taxonomy is not influence. Events and processes may be objects with temporal claims; boundaries alone do not create event objects.

## Time
Internal astronomical integer years: 0 = 1 BCE, -1 = 2 BCE; user labels omit year zero. Preserve original value, calendar and precision. Point means a dated event or assertion (possible date bounds), not duration. Interval means a period with independently uncertain start and end; end state known, unknown or ongoing. Unknown is not ongoing. Never invent numeric bounds for circa. Separate historical time, relation validity and transaction time. Distinguish possible and definite overlap; inclusive year coverage is not exact duration. Missing phases do not establish interruptions. Do not add overlapping phases as independent durations.

The initial `src/domain/time.ts` is intentionally only a small shared year-coordinate utility, not the complete assertion schema or import contract.

## View and renderer
Global horizontal coordinate = time. Y zones: styles/context, objects grouped by type, changes and selected-object details. Regions are facets, not permanent rows. Style hierarchy supports overlap and explicit membership. Global and nested timeline use one time model but separate viewport state. Style focus must not move objects. The date ruler belongs at the bottom of the atlas per recent product feedback; context headings stay at the top. Substyle labels must remain compact under zoom. Never turn technical lanes into historical meaning.

Suggested first stack: TypeScript, React, Vite, HTML + SVG, local JSON data, test runner and CI. Separate domain, import/validation, query, timeline-layout, renderer, navigation. Static deploy only after review; no server/graph DB until necessary. Use canonical data contract rather than hardcoding sample dates into view components. Dark minimal welcome screen and separate atlas route, with shareable viewport/filter state later.

## Acceptance progression
0. Reproducible workspace; domain contract, fixtures, checks.
1. Thin vertical slice: architecture, global timeline, zoom/pan, one selected building with nested timeline, points vs intervals, style context, uncertainty. First use synthetic fixtures explicitly marked as such.
2. Migrate a small source-backed architecture subset from Airtable with audit/crosswalk, then validate on 30–50 records and at least two regions. Do not publish unreviewed data as verified.
3. Add a small philosophy subset without changing core temporal semantics. Test usability and performance before broad expansion.
