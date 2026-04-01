import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSpotifyStore } from "@/store/useSpotifyStore";

const COLORS = ["#1db954", "#1ed760", "#535353", "#b3b3b3", "#e22134", "#f59b23", "#509bf5", "#c685c6", "#f037a5", "#74b43b"];

export const PlatformStats = () => {
  const { filteredRawData } = useSpotifyStore();
  const { t } = useTranslation();

  const segments = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of filteredRawData) {
      const key = item.platform ?? t("platformStats.unknown");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const total = filteredRawData.length;
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([platform, count], i) => ({
        platform,
        count,
        pct: total > 0 ? (count / total) * 100 : 0,
        color: COLORS[i % COLORS.length],
      }));
  }, [filteredRawData, t]);

  if (filteredRawData.length === 0) return null;

  return (
    <div className="platform-stats section">
      <h2>{t("platformStats.title")}</h2>
      <div className="platform-bar">
        {segments.map(({ platform, pct, color }) => (
          <div
            key={platform}
            className="platform-bar-segment"
            style={{ width: `${pct}%`, backgroundColor: color }}
            title={`${platform}: ${pct.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="platform-legend">
        {segments.map(({ platform, pct, color }) => (
          <div key={platform} className="platform-legend-item">
            <span className="platform-legend-dot" style={{ backgroundColor: color }} />
            <span className="platform-legend-label">{platform}</span>
            <span className="platform-legend-pct">{pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
