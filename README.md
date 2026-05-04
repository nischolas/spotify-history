# Spotify Streaming History Visualized

A privacy-first web application that lets you import your Spotify Extended Streaming History data, and discover your true listening habits processed locally in your browser.

![Project preview](https://raw.githubusercontent.com/nischolas/antigravity-spotify/main/public/og.png)

## How to Use

### 1. Get Your Spotify Data

1. Go to [Spotify Privacy Settings](https://www.spotify.com/account/privacy/)
2. Request your **Extended Streaming History**
3. Wait for Spotify to email you (can take up to 30 days, but it's usually much faster)
4. Download the ZIP file from the email

### 2. Import Your Data

- **Option A**: Import the entire ZIP file directly
- **Option B**: Extract the ZIP and import individual `Streaming_History_Audio_*.json` files

### 3. View your aggregated listening data

---

## Features

**Top Tracks** — Your most played tracks, ranked by total playtime or play count.

**Top Track by Year** — Your most played track for each year (or month) of your history.

**Top Artists** — Artists ranked by accumulated playtime across all their tracks.

**Most Skipped Tracks** — Tracks you skipped before playing for more than 5 seconds, ranked by skip count.

**Your Favorites** — Tracks you started manually most often — a reliable signal for what you actually love.

**Once is not enough** — Tracks you started over again, because one listen just wasn't enough.

**Companion Tracks** — Songs that have been a recurring presence across your entire listening history.

**One Hit Wonders** — Artists you only ever listened to one unique track from.

**Date Range Filter** — Filter all views to a custom time window to explore any period of your history.

**General Stats** — Your total listening time, unique songs, and artists at a glance.

**Platforms** — See which devices and apps you use most to listen to Spotify.

**Search by Artist** — Find and browse all tracks you've played by a specific artist.

**Single Track Stats** — Click any row to see detailed skip behavior, listening context, and lifetime statistics for that track.

**Track Preview Player** — Play a 30-second Spotify preview directly in the app without leaving the page.

---

## Ideas / Todos

- Let users try the app with sample/dummy data
- Drag full date range slider, not just the handles
- Make artists in all views click- and browsable
- Mobile tables first column numbers cut after one digit

---

- ✓ ~Add all features to landingpage and readme~
- ✓ ~Transition to data view when loaded~
- ✓ ~More performant data handling~
  - ~Strip unnecessary keys~
  - ~Pre-aggregate~
  - ~Loading strategy (current can break weaker devices with large datasets)~
- ✓ ~Click on artist / search artists to show top tracks by artist~
- ✓ ~Service worker for full offline functionality~
- ✓ ~Single track statistics from preview player drawer~
- ✗ ~Add a table as playlist in Spotify~ (won't do, will need a backend for auth)

## Development Notes

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nischolas/antigravity-spotify.git
   cd antigravity-spotify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized build will be available in the `dist/` directory.
