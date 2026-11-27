# Development status

## Implemented

CONT-001 introduced the welcome screen, the atlas route, a linear year coordinate across the BCE/CE boundary, and automated checks.

CONT-002 gives the timeline a shared dating model. A solid bar represents a period of work. Hatching represents the possible date range of one event. Discrete candidate years have separate markers. An approximate event keeps a single year anchor, and each boundary of a period can independently be marked approximate. Selecting a mark exposes its date in text.

The demonstration uses synthetic fixtures. Domain tests cover matching numeric bounds with different meanings, approximate dates, invalid inputs, and historical year formatting. Run `npm ci` and `npm run check` on Node.js 22.16.0 to reproduce the repository checks.

CONT-003 adds a gallery card with one local axis for two explicitly linked records. Its extent fits their dates. Both views use the same mark renderer and dating model. The card opens at the selected atlas record and keeps subsequent selections local. On desktop it is centered. On small screens it sits at the bottom.

Browser checks against the production build covered 320, 390, and 1200 px, touch and keyboard selection, dismissal, focus restoration, unchanged page scroll and atlas ruler, and reopening from the active atlas mark.

## Next task — CONT-004: Pan and zoom the atlas

Give the global atlas a movable year range and smooth zoom anchored to the pointer. Keep the ruler and marks aligned to the same linear coordinate. Verify that a reader can navigate to a non-default range, inspect a building, and return to the same range and selection on desktop and mobile.

Source attribution for competing dates, open-ended construction periods, and publication of a reviewed Airtable dataset remain open before importing real records.
