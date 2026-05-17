import { useState, useRef } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import useContributionsHeatmap from "../../hooks/useContributionsHeatmap";
import { Icon, I } from "../../utils/icons";
import {
  formatHour,
  getDayAbbreviation,
  getNormalizedIntensity,
} from "../../utils/heatmapUtils";
const ContributionsHeatmap = ({ events = [] }) => {
  const { t, language } = useLanguage();
  const { matrix, stats, hasData } = useContributionsHeatmap(events);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const daysEs = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const daysEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const days = language === "es" ? daysEs : daysEn;
  const getCellColor = (count) => {
    const intensity = getNormalizedIntensity(count, stats.maxCount);
    if (intensity === 0) return "var(--md-surface-container-low)";
    if (intensity < 0.15) return "var(--md-primary-container)";
    if (intensity < 0.3) return "var(--md-primary)";
    if (intensity < 0.5) return "var(--md-primary)";
    if (intensity < 0.7) return "var(--md-primary)";
    if (intensity < 0.85) return "var(--md-primary)";
    return "var(--md-primary)";
  };
  const getCellOpacity = (count) => {
    const intensity = getNormalizedIntensity(count, stats.maxCount);
    if (intensity === 0) return 1;
    if (intensity < 0.15) return 0.3;
    if (intensity < 0.3) return 0.45;
    if (intensity < 0.5) return 0.6;
    if (intensity < 0.7) return 0.75;
    if (intensity < 0.85) return 0.88;
    return 1;
  };
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top - 10,
      });
    }
  };
  if (!hasData) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
        {" "}
        <h3 className="text-lg sm:text-xl font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.chartBar} className="inline-block mr-2" /> {" "}{t("heatmapTitle") || "Contribution Heatmap"}{" "}
        </h3>{" "}
        <div className="h-56 sm:h-64 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const avgPerCell =
    stats.totalCommits / (matrix.flat().filter((v) => v > 0).length || 1);
  const busiestHours = matrix[0]
    .map((_, hourIdx) => {
      const total = matrix.reduce((sum, row) => sum + row[hourIdx], 0);
      return { hour: hourIdx, count: total };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
  return (
    <div
      ref={containerRef}
      className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300"
      onMouseMove={handleMouseMove}
    >
      {" "}
      <div className="flex items-center justify-between mb-4">
        {" "}
        <h3 className="text-lg sm:text-xl font-bold font-display text-md-on-surface">
          {" "}
          <Icon icon={I.chartBar} className="inline-block mr-2" />{" "}{t("heatmapTitle") || "Contribution Heatmap"}{" "}
        </h3>{" "}
        <span className="text-sm px-3 py-1 rounded-full bg-md-surface-container-low text-md-on-surface-variant">
          {" "}
          {stats.totalCommits} {t("events")}{" "}
        </span>{" "}
      </div>{" "}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {" "}
        <div className="p-3 rounded-full bg-md-surface-container-low">
          {" "}
          <p className="text-xs text-md-on-surface-variant">
            {" "}
            {t("peakDay") || "Peak Day"}{" "}
          </p>{" "}
          <p className="font-bold mt-1 text-md-on-surface">
            {" "}
            {days[stats.peakActivity.day]}{" "}
          </p>{" "}
        </div>{" "}
        <div className="p-3 rounded-full bg-md-surface-container-low">
          {" "}
          <p className="text-xs text-md-on-surface-variant">
            {" "}
            {t("peakHour") || "Peak Hour"}{" "}
          </p>{" "}
          <p className="font-bold mt-1 text-md-on-surface">
            {" "}
            {formatHour(stats.peakActivity.hour)}{" "}
          </p>{" "}
        </div>{" "}
        <div className="p-3 rounded-full bg-md-surface-container-low">
          {" "}
          <p className="text-xs text-md-on-surface-variant"> Avg/Cell </p>{" "}
          <p className="font-bold mt-1 text-md-on-surface">
            {" "}
            {avgPerCell.toFixed(1)}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-4">
        {" "}
        <div className="overflow-x-auto">
          {" "}
          <div className="min-w-[600px]">
            {" "}
            <div className="flex mb-2 ml-12 sm:ml-14">
              {" "}
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 text-center text-[9px] sm:text-xs text-md-on-surface-variant"
                >
                  {" "}
                  {i % 3 === 0 ? formatHour(i).split(" ")[0] : ""}{" "}
                </div>
              ))}{" "}
            </div>{" "}
            {matrix.map((row, dayIndex) => (
              <div key={dayIndex} className="flex items-center mb-1">
                {" "}
                <div className="w-12 sm:w-14 text-right pr-3 sm:pr-4 text-xs font-medium text-md-on-surface-variant">
                  {" "}
                  {getDayAbbreviation(dayIndex, language)}{" "}
                </div>{" "}
                <div className="flex flex-1 gap-[2px] sm:gap-1 relative">
                  {" "}
                  {row.map((count, hourIndex) => (
                    <div
                      key={hourIndex}
                      className="flex-1 h-6 sm:h-8 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:z-20 relative"
                      style={{
                        backgroundColor: getCellColor(count),
                        opacity: getCellOpacity(count),
                      }}
                      onMouseEnter={() =>
                        setHoveredCell({
                          day: dayIndex,
                          hour: hourIndex,
                          count,
                        })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center justify-end gap-2">
          {" "}
          <span className="text-xs text-md-on-surface-variant">
            {" "}
            {t("lessActivity") || "Less"}{" "}
          </span>{" "}
          <div className="flex gap-[2px]">
            {" "}
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: "var(--md-surface-container-low)" }}
            />{" "}
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: "var(--md-primary)", opacity: 0.3 }}
            />{" "}
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: "var(--md-primary)", opacity: 0.5 }}
            />{" "}
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: "var(--md-primary)", opacity: 0.7 }}
            />{" "}
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: "var(--md-primary)", opacity: 0.88 }}
            />{" "}
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: "var(--md-primary)", opacity: 1 }}
            />{" "}
          </div>{" "}
          <span className="text-xs text-md-on-surface-variant">
            {" "}
            {t("moreActivity") || "More"}{" "}
          </span>{" "}
        </div>{" "}
        <div className="mt-4 p-4 rounded-full bg-md-surface-container-low">
          {" "}
          <p className="text-xs font-semibold mb-3 text-md-on-surface-variant">
            {" "}
            <Icon icon={I.fire} className="inline-block mr-1" />{language === "es" ? "Horas más activas" : "Busiest Hours"}
          </p>{" "}
          <div className="flex gap-4 justify-center">
            {" "}
            {busiestHours.map((item, idx) => (
              <div key={idx} className="text-center">
                {" "}
                <div className="text-lg font-bold text-md-on-surface">
                  {" "}
                  {formatHour(item.hour)}{" "}
                </div>{" "}
                <div className="text-xs text-md-on-surface-variant">
                  {" "}
                  {item.count} {t("events")}{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {hoveredCell && (
        <div
          className="fixed z-50 p-4 rounded-[24px] shadow-md-xl border border-md-outline/20 bg-md-surface-container animate-scale-in pointer-events-none"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          {" "}
          <p className="text-sm font-bold text-md-on-surface">
            {" "}
            {days[hoveredCell.day]} - {formatHour(hoveredCell.hour)}{" "}
          </p>{" "}
          <p className="text-2xl font-bold mt-2 text-md-primary">
            {" "}
            {hoveredCell.count}{" "}
            {hoveredCell.count === 1
              ? t("commit") || "commit"
              : t("commits") || "commits"}{" "}
          </p>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default ContributionsHeatmap;

