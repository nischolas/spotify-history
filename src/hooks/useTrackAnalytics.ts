import { useMemo } from "react";
import { useSpotifyStore } from "@/store/useSpotifyStore";
import { computeSkipProfile, computeContextProfile, computeLifetimeCurve } from "@/utils/trackAnalytics";

export function useTrackAnalytics(trackUri: string | null) {
  const rawData = useSpotifyStore((s) => s.rawData);
  const aggregatedData = useSpotifyStore((s) => s.aggregatedData);
  return useMemo(() => {
    if (!trackUri || rawData.length === 0) return null;
    const aggItem = aggregatedData.find(
      (i) => i.spotify_track_uri === trackUri || i.allUris?.includes(trackUri),
    );
    const urisToSearch = new Set(aggItem?.allUris ?? [trackUri]);
    const entries = rawData.filter((e) => e.spotify_track_uri && urisToSearch.has(e.spotify_track_uri));
    if (entries.length === 0) return null;
    return {
      skip: computeSkipProfile(entries),
      context: computeContextProfile(entries),
      lifetime: computeLifetimeCurve(entries),
      entries,
    };
  }, [trackUri, rawData, aggregatedData]);
}
