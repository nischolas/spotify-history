import JSZip from "jszip";
import type { SpotifyHistoryItem } from "@/types";

export interface ParseSpotifyZipResult {
  items: SpotifyHistoryItem[];
  ignoredCount: number;
}

export function parseSpotifyJsonText(content: string, filename: string): SpotifyHistoryItem[] {
  const items: SpotifyHistoryItem[] = [];
  try {
    const json = JSON.parse(content);
    if (Array.isArray(json)) {
      for (const item of json) {
        items.push({
          ts: item.ts,
          ms_played: item.ms_played,
          spotify_track_uri: item.spotify_track_uri ?? null,
          master_metadata_track_name: item.master_metadata_track_name ?? null,
          master_metadata_album_artist_name: item.master_metadata_album_artist_name ?? null,
          reason_start: item.reason_start,
          reason_end: item.reason_end,
          shuffle: item.shuffle,
          platform: item.platform,
        });
      }
    }
  } catch (err) {
    console.error(`Error parsing file ${filename}:`, err);
  }
  return items;
}

export async function parseSpotifyZip(blob: Blob): Promise<ParseSpotifyZipResult> {
  const items: SpotifyHistoryItem[] = [];
  let ignoredCount = 0;

  const zip = await JSZip.loadAsync(blob);
  const filePromises: Promise<void>[] = [];

  zip.forEach((relativePath, zipEntry) => {
    if (zipEntry.dir) return;
    const filename = relativePath.split("/").pop() || relativePath;

    if (filename.startsWith("Streaming_History_Audio_") && filename.endsWith(".json")) {
      const p = zipEntry.async("string").then((content) => {
        items.push(...parseSpotifyJsonText(content, filename));
      });
      filePromises.push(p);
    } else {
      ignoredCount++;
    }
  });

  await Promise.all(filePromises);

  return { items, ignoredCount };
}
