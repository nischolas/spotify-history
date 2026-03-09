export type ReasonStartType =
  | "trackdone"
  | "fwdbtn"
  | "clickrow"
  | "appload"
  | "backbtn"
  | "playbtn"
  | "remote"
  | "popup"
  | "unknown"
  | "trackerror"
  | "persisted"
  | "reconnect"
  | "switched-to-audio"
  | "clickside"
  | "click-row";

export interface SpotifyHistoryItem {
  ts: string;
  ms_played: number;
  count?: number;
  spotify_track_uri: string | null;
  master_metadata_track_name: string | null;
  master_metadata_album_artist_name: string | null;
  reason_start?: ReasonStartType;
  reason_end?: string;
  shuffle?: boolean;
  platform?: string;
}
