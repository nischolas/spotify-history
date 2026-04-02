import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpotifyStore } from "@/store/useSpotifyStore";

type PlatformBucket = "ios" | "android" | "mac" | "windows" | "webPlayer" | "tv" | "other";

const BUCKET_COLORS: Record<PlatformBucket, string> = {
  ios: "#509bf5",
  android: "#74b43b",
  mac: "#b3b3b3",
  windows: "#1db954",
  webPlayer: "#f59b23",
  tv: "#c685c6",
  other: "#535353",
};

function normalizePlatform(raw: string | undefined | null): PlatformBucket {
  if (!raw) return "other";
  const s = raw.toLowerCase();
  if (s.includes("ios") || s.includes("iphone") || s.includes("applewatch")) return "ios";
  if (s.includes("android")) return "android";
  if (s.includes("osx") || s.includes("os x") || s.includes("macos")) return "mac";
  if (s.includes("windows")) return "windows";
  if (s.includes("web_player") || s.includes("webplayer")) return "webPlayer";
  if (s.includes("cast_tv") || s.includes("webos_tv") || s.includes("chromecast")) return "tv";
  return "other";
}

export const PlatformStats = () => {
  const { filteredRawData } = useSpotifyStore();
  const [showLegend, setShowLegend] = useState(false);
  const { t } = useTranslation();

  const segments = useMemo(() => {
    const counts = new Map<PlatformBucket, number>();
    for (const item of filteredRawData) {
      const bucket = normalizePlatform(item.platform);
      counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
    }
    const total = filteredRawData.length;
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([bucket, count]) => ({
        bucket,
        label: t(`platformStats.${bucket}`),
        count,
        pct: total > 0 ? (count / total) * 100 : 0,
        color: BUCKET_COLORS[bucket],
      }));
  }, [filteredRawData, t]);

  if (filteredRawData.length === 0) return null;

  return (
    <div className="platform-stats section">
      <h3>{t("platformStats.title")}</h3>
      <div className="platform-bar" onClick={() => setShowLegend((prev) => !prev)}>
        {segments.map(({ bucket, label, pct, color }) => (
          <div
            key={bucket}
            className="platform-bar-segment"
            style={{ width: `${pct}%`, backgroundColor: showLegend ? color : undefined }}
            title={`${label}: ${pct.toFixed(1)}%`}
          >
            {!showLegend ? (
              <>
                <span className="platform-legend-label">{label}</span>&nbsp;
                <span className="platform-legend-pct">{pct.toFixed(0)}%</span>
              </>
            ) : (
              <>&nbsp;</>
            )}
          </div>
        ))}
      </div>
      {showLegend && (
        <div className="platform-legend">
          {segments.map(({ bucket, label, pct, color }) => (
            <div key={bucket} className="platform-legend-item">
              <span className="platform-legend-dot" style={{ backgroundColor: color }} />
              <span className="platform-legend-label">{label}</span>
              <span className="platform-legend-pct">{pct.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
