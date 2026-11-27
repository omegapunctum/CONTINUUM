# Development status

## Implemented

CONT-001 introduced the welcome screen, the atlas route, a linear year coordinate across the BCE/CE boundary, and automated checks.

CONT-002 gives the timeline a shared dating model. A solid bar represents a period of work. Hatching represents the possible date range of one event. Discrete candidate years have separate markers. An approximate event keeps a single year anchor, and each boundary of a period can independently be marked approximate. Selecting a mark exposes its date in text.

The demonstration uses synthetic fixtures. Domain tests cover matching numeric bounds with different meanings, approximate dates, invalid inputs, and historical year formatting. Run `npm ci` and `npm run check` on Node.js 22.16.0 to reproduce the repository checks.

## Next task — CONT-003: A compact timeline inside an object card

Use one synthetic building with a construction phase and a separately dated event. Render both using the same dating types as the atlas. Keep the card's selection and viewport independent from the global timeline.

Acceptance: opening the card, selecting a phase, and returning to the atlas preserves the global selection and date range. The phase and event remain individually selectable with a keyboard and at mobile widths.

Source attribution for competing dates, open-ended construction periods, and publication of a reviewed Airtable dataset remain open before importing real records.
