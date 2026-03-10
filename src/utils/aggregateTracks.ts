import type { SpotifyHistoryItem } from "@/types";

type AggItem = SpotifyHistoryItem & { _maxTs: string };

export function aggregateTracks(items: SpotifyHistoryItem[]): SpotifyHistoryItem[] {
  // Pass 1: group by URI, tracking the latest ts seen per URI
  const byUri = new Map<string, AggItem>();
  for (const item of items) {
    const uri = item.spotify_track_uri;
    if (!uri) continue;
    const existing = byUri.get(uri);
    if (existing) {
      existing.ms_played += item.ms_played;
      existing.count = (existing.count || 1) + 1;
      if (item.ts > existing._maxTs) existing._maxTs = item.ts;
    } else {
      byUri.set(uri, { ...item, count: 1, _maxTs: item.ts });
    }
  }

  // Pass 2: group by artist+track name to merge same song with different URIs.
  // Canonical URI = the one with the most recent play (best chance of being available in Spotify).
  const byName = new Map<string, AggItem>();
  for (const item of byUri.values()) {
    const artist = item.master_metadata_album_artist_name;
    const track = item.master_metadata_track_name;
    if (!artist || !track) {
      byName.set(item.spotify_track_uri!, { ...item, allUris: [item.spotify_track_uri!] });
      continue;
    }
    const key = `${artist}||${track}`;
    const existing = byName.get(key);
    if (existing) {
      existing.ms_played += item.ms_played;
      existing.count = (existing.count || 0) + (item.count || 0);
      existing.allUris = [...(existing.allUris ?? []), item.spotify_track_uri!];
      if (item._maxTs > existing._maxTs) {
        existing.spotify_track_uri = item.spotify_track_uri;
        existing._maxTs = item._maxTs;
      }
    } else {
      byName.set(key, { ...item, allUris: [item.spotify_track_uri!] });
    }
  }

  return Array.from(byName.values()).map(({ _maxTs: _, ...rest }) => rest);
}
