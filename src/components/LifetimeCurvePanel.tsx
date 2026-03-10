import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { LifetimeCurve } from "@/utils/trackAnalytics";
import { isMobile } from "@/utils/isMobile";

const PRIMARY = "#1db954";
const TEXT_SECONDARY = "#b3b3b3";
const BORDER = "#333333";

interface Props {
  data: LifetimeCurve;
  totalPlays: number;
  skipRate: number;
}

export const LifetimeCurvePanel: React.FC<Props> = ({ data, totalPlays, skipRate }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(!isMobile);

  const { curve, firstPlay, lastPlay, peakYear, totalHours } = data;

  if (curve.length === 0) return null;

  const fmtHours = (h: number) => (h >= 1 ? `${h.toFixed(1)}h` : `${Math.round(h * 60)}m`);
  const fmtDate = (d: Date) => d.toLocaleDateString(i18n.language, { year: "numeric", month: "short" });

  // Thin out the curve for performance if very long
  const displayCurve = curve.length > 200 ? curve.filter((_, i) => i % Math.ceil(curve.length / 200) === 0 || i === curve.length - 1) : curve;

  // One tick per year (first month of each year that appears in the data)
  const yearTicks = [...new Set(displayCurve.map((p) => p.date.slice(0, 4)))].map(
    (yr) => displayCurve.find((p) => p.date.startsWith(yr))!.date
  );

  return (
    <div className="insight-panel">
      <button className="insight-panel-header" onClick={() => setOpen((o) => !o)}>
        <span>{t("trackInsights.lifetime.title")}</span>
        <span className={`chevron ${open ? "open" : ""}`}>›</span>
      </button>
      {open && (
        <div className="insight-panel-body">
          <div className="kpi-cards">
            <div className="kpi-card">
              <div className="kpi-value">{totalPlays}</div>
              <div className="kpi-label">{t("trackInsights.skipBehavior.totalPlays")}</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-value">{fmtHours(totalHours)}</div>
              <div className="kpi-label">{t("trackInsights.lifetime.totalHours")}</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-value" style={{ color: skipRate > 0.5 ? "#e25c5c" : PRIMARY }}>
                {Math.round(skipRate * 100)}%
              </div>
              <div className="kpi-label">{t("trackInsights.skipBehavior.skipRate")}</div>
            </div>
            {firstPlay && (
              <div className="kpi-card">
                <div className="kpi-value">{fmtDate(firstPlay)}</div>
                <div className="kpi-label">{t("trackInsights.lifetime.firstPlay")}</div>
              </div>
            )}
            {lastPlay && (
              <div className="kpi-card">
                <div className="kpi-value">{fmtDate(lastPlay)}</div>
                <div className="kpi-label">{t("trackInsights.lifetime.lastPlay")}</div>
              </div>
            )}
            {peakYear && (
              <div className="kpi-card">
                <div className="kpi-value">{peakYear}</div>
                <div className="kpi-label">{t("trackInsights.lifetime.peakYear")}</div>
              </div>
            )}
          </div>

          <div className="chart-block">
            <ResponsiveContainer width="100%" height={100}>
              <ComposedChart data={displayCurve} margin={{ top: 8, right: -24, left: -16, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fill: TEXT_SECONDARY, fontSize: 10 }} axisLine={{ stroke: BORDER }} tickLine={false} ticks={yearTicks} tickFormatter={(v) => v.slice(0, 4)} />
                <YAxis yAxisId="hours" tick={{ fill: TEXT_SECONDARY, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtHours} />
                <YAxis yAxisId="plays" orientation="right" tick={{ fill: TEXT_SECONDARY, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v, name) => {
                    if (name === "cumulativeHours") return [fmtHours(typeof v === "number" ? v : 0), t("trackInsights.lifetime.cumulativeHours")];
                    return [v, t("trackInsights.lifetime.playsPerMonth")];
                  }}
                  labelFormatter={(label) => new Date(`${label}-01`).toLocaleDateString(i18n.language, { year: "numeric", month: "short" })}
                  contentStyle={{ background: "#1e1e1e", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 12 }}
                  labelStyle={{ color: TEXT_SECONDARY }}
                />
<Bar yAxisId="plays" dataKey="monthlyPlays" fill="#148e3fff" opacity={0.35} isAnimationActive={false} />
                <Line
                  yAxisId="hours"
                  type="monotone"
                  dataKey="cumulativeHours"
                  stroke={PRIMARY}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: PRIMARY }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
