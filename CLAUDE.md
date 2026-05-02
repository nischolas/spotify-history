## Overview

React + Vite app to visualize and explore a user's Spotify streaming history.

- History item shape: @src/types.ts
- Data aggregation and store: @src/store/useSpotifyStore.ts
- Views wired up in: @src/App.tsx
- Representative view example: @src/components/TopTracks.tsx

## Adding a New View

To add a new view/section, you need to touch 4 files:
1. Create `src/components/YourView.tsx`
2. Import and add `<YourView />` to the `.sections` div in `src/App.tsx`
3. Add i18n keys to `src/i18n/locales/en.json`
4. Add i18n keys to `src/i18n/locales/de.json`

## Data Sources

Always pick the right store slice:

- **`filteredRawData`** — individual play events, filtered by the current date range. Use this when you need per-event analysis (e.g. skip detection, monthly bucketing, counting occurrences). Automatically updates when the date range slider changes.
- **`aggregatedData`** — tracks grouped by URI with summed `ms_played` and `count`. Use this for ranking by total playtime or total play count. Also respects the date range filter.
- **`rawData`** — unfiltered raw events. Avoid in views; used internally by `DateRangeFilter`.

Get them from the store: `const { filteredRawData, aggregatedData } = useSpotifyStore()`

## Component Patterns

All views follow the same structure — mirror `src/components/SkippedTracks.tsx` (the cleanest example):

- Props: `{ limit?: number; isModal?: boolean }`
- Compute the list in a `useMemo` dependent on `filteredRawData` or `aggregatedData`
- Outer wrapper: `<div className="table-container your-view-name">`
- Header: `<div className="header-row"><div className="title"><h3>...</h3><p>...</p></div> {!isModal && <button className="reset-btn">Show More</button>}</div>`
- Table with `#`, title, artist columns. Scores/metrics right-aligned with `style={{ textAlign: "right" }}` and `className="monospace"` on the `<td>`
- Muted secondary text: `<span className="muted">...</span>`
- Clickable rows: `onClick={() => openPlayer(uri, trackName, artistName)}` with `style={{ cursor: "pointer" }}` and `title={t("table.statsAndPreview")}`
- Show More modal: `<Modal isOpen={showMoreModal} onClose={...}><YourView limit={100} isModal /></Modal>`

## Hooks

- `usePreviewPlayer()` → `{ openPlayer(uri, trackName, artistName), closePlayer, trackUri, trackName, artistName }` — opens the Spotify preview drawer on row click
- `useTranslation()` → `{ t, i18n }` — always use for all user-facing strings

## i18n

- Two locales: `src/i18n/locales/en.json` and `src/i18n/locales/de.json`
- Namespace per component: `yourView.title`, `yourView.subtitle`, `yourView.unknownTrack`, etc.
- Shared keys you can reuse: `table.headerTitle`, `table.headerArtist`, `table.headerPlayCount`, `table.headerTimePlayed`, `table.skipRate`, `table.statsAndPreview`, `common.showMore`, `common.close`, `common.or`
- Interpolation: `t("key", { variable: value })`

## Utilities

- `src/utils/formatTime.ts` — `formatMsPlain(ms)` returns `{ hours, minutes }` for displaying playtime
- `src/utils/aggregateTracks.ts` — groups raw items by URI, used internally by the store
- `src/utils/trackAnalytics.ts` — skip profiles, context profiles, lifetime curves per track

## SpotifyHistoryItem key fields

- `ts` — ISO timestamp string; `item.ts.slice(0, 7)` gives `"YYYY-MM"` for monthly bucketing
- `ms_played` — milliseconds played in that single event
- `spotify_track_uri` — unique track identifier (can be null, always guard)
- `master_metadata_track_name` / `master_metadata_album_artist_name` — track and artist name (can be null)
- `count` — only present on aggregated items (total plays)
- `platform`, `shuffle`, `reason_start`, `reason_end` — available on raw items
