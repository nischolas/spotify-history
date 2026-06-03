import React, { useState, useEffect, useRef } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useSpotifyStore } from "@/store/useSpotifyStore";
import { useTranslation } from "react-i18next";

export const DateRangeFilter: React.FC = () => {
  const { rawData, setDateRange } = useSpotifyStore();
  const { i18n } = useTranslation();

  const [minMonthIndex, setMinMonthIndex] = useState<number>(0);
  const [maxMonthIndex, setMaxMonthIndex] = useState<number>(0);
  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(0);
  const [months, setMonths] = useState<Date[]>([]);
  const [monthlyCounts, setMonthlyCounts] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState<"start" | "end" | "bar" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  // Stored as a raw float (percentage space) to avoid the half-step jump that
  // rounding at capture time would cause.
  const dragOffsetRef = useRef<number>(0);
  const DEBOUNCE_TIME = 100;

  // Calculate months from raw data
  useEffect(() => {
    if (rawData.length > 0) {
      const dates = rawData.map((item) => new Date(item.ts));
      const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

      // Create array of first day of each month
      const monthsArray: Date[] = [];
      const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      const end = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

      while (current <= end) {
        monthsArray.push(new Date(current));
        current.setMonth(current.getMonth() + 1);
      }

      const counts = monthsArray.map(
        (m) =>
          rawData.filter((item) => {
            const d = new Date(item.ts);
            return d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth();
          }).length,
      );

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMonths(monthsArray);
      setMonthlyCounts(counts);
      setMinMonthIndex(0);
      setMaxMonthIndex(monthsArray.length - 1);
      setRangeStart(0);
      setRangeEnd(monthsArray.length - 1);
    }
  }, [rawData]);

  // Apply filter when range changes
  useEffect(() => {
    if (months.length > 0) {
      const timer = setTimeout(() => {
        const startDate = months[rangeStart];
        const endMonth = months[rangeEnd];
        // End date is last day of the selected month
        const endDate = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0, 23, 59, 59);

        setDateRange(startDate.toISOString(), endDate.toISOString());
      }, DEBOUNCE_TIME);

      return () => clearTimeout(timer);
    }
  }, [rangeStart, rangeEnd, months, setDateRange]);

  useEffect(() => {
    const onScroll = () => {
      const el = filterRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      const stuck = rect.top <= 1;
      el.classList.toggle("is-stuck", stuck);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "short",
    });
  };

  const handleMouseDown = (handle: "start" | "end") => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(handle);
  };

  const handleTouchDown = (handle: "start" | "end") => (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    e.stopPropagation();
    setIsDragging(handle);
  };

  const beginBarDrag = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    // Store the offset in raw percentage space so no rounding error is baked
    // in at capture time — rounding happens only when updating state.
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const range = maxMonthIndex - minMonthIndex;
    const startPercentage = (rangeStart - minMonthIndex) / range;
    dragOffsetRef.current = percentage - startPercentage;
    setIsDragging("bar");
  };

  const handleBarMouseDown = (e: React.MouseEvent) => {
    // stopPropagation prevents the mousedown from bubbling up to the slider.
    e.stopPropagation();
    beginBarDrag(e.clientX);
  };

  const handleBarTouchDown = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    beginBarDrag(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !sliderRef.current || months.length === 0) return;

      // Prevent scrolling on touch devices while dragging
      if ("touches" in e) {
        e.preventDefault();
      }

      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newIndex = Math.round(percentage * (maxMonthIndex - minMonthIndex) + minMonthIndex);

      if (isDragging === "start") {
        setRangeStart(Math.min(newIndex, rangeEnd));
      } else if (isDragging === "end") {
        setRangeEnd(Math.max(newIndex, rangeStart));
      } else {
        // Bar drag: translate the whole range, clamped to [min, max].
        // The offset was captured in percentage space to avoid rounding jitter.
        const range = maxMonthIndex - minMonthIndex;
        const newStartPercentage = percentage - dragOffsetRef.current;
        const newStart = Math.round(newStartPercentage * range + minMonthIndex);
        const width = rangeEnd - rangeStart;
        const clampedStart = Math.max(minMonthIndex, Math.min(maxMonthIndex - width, newStart));
        setRangeStart(clampedStart);
        setRangeEnd(clampedStart + width);
      }
    };

    const handleEnd = () => {
      window.umami?.track("Interacted with slider");
      // dragOfetRef is reset so stale values can't bleed into future drags.
      dragOffsetRef.current = 0;
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, rangeEnd, rangeStart, maxMonthIndex, minMonthIndex, months.length]);

  if (months.length === 0) return null;

  const startPercentage = ((rangeStart - minMonthIndex) / (maxMonthIndex - minMonthIndex)) * 100;
  const endPercentage = ((rangeEnd - minMonthIndex) / (maxMonthIndex - minMonthIndex)) * 100;

  return (
    <div className="date-range-filter table-container" ref={filterRef}>
      <div className="plays-sparkline">
        <ResponsiveContainer width="100%" height={32}>
          <AreaChart data={months.map((_, i) => ({ value: monthlyCounts[i] }))} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary-color)"
              fill="var(--primary-color)"
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              fillOpacity={0.2}
              strokeOpacity={0.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="range-slider-container">
        <div className="range-slider" ref={sliderRef}>
          <div className="range-track"></div>
          <div
            className={`range-track-active${isDragging === "bar" ? " range-track-active--dragging" : ""}`}
            style={{
              left: `${startPercentage}%`,
              width: `${endPercentage - startPercentage}%`,
            }}
            onMouseDown={handleBarMouseDown}
            onTouchStart={handleBarTouchDown}
          ></div>
          <div
            className="range-handle range-handle-start"
            style={{ left: `${startPercentage}%` }}
            onMouseDown={handleMouseDown("start")}
            onTouchStart={handleTouchDown("start")}
          >
            <div className="range-label">{formatMonthYear(months[rangeStart])}</div>
          </div>
          <div
            className="range-handle range-handle-end"
            style={{ left: `${endPercentage}%` }}
            onMouseDown={handleMouseDown("end")}
            onTouchStart={handleTouchDown("end")}
          >
            <div className="range-label">{formatMonthYear(months[rangeEnd])}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
