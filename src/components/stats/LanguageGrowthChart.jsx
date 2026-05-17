import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { formatNumber } from "../../utils/languagesStatsUtils";
import { Icon, I } from "../../utils/icons";
const colors = [
  "#6750A4",
  "#D0BCFF",
  "#7D5260",
  "#E8DEF8",
  "#4F378B",
  "#381E72",
  "#EFB8C8",
  "#633B48",
];
const LanguageGrowthChart = ({ data = [] }) => {
  const { t } = useLanguage();
  if (!data.length) {
    return (
      <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.chartLine} className="inline-block mr-2" />{t("langGrowthChart") || "Language Growth"}{" "}
        </h3>{" "}
        <div className="h-64 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const combinedData = (() => {
    if (!data[0]?.history) return [];
    const months = data[0].history.length;
    const result = [];
    for (let i = 0; i < months; i++) {
      const dataPoint = { month: data[0].history[i].month };
      data.forEach((lang) => {
        if (lang.history && lang.history[i]) {
          dataPoint[lang.name] = lang.history[i].value;
        }
      });
      result.push(dataPoint);
    }
    return result;
  })();
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 rounded-[24px] shadow-md-md border border-md-outline/20 bg-md-surface-container animate-scale-in">
          {" "}
          <p className="font-bold mb-2 text-md-on-surface"> {label} </p>{" "}
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              {" "}
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>{" "}
              <span className="text-sm text-md-on-surface-variant">
                {" "}
                {entry.name}:{" "}
              </span>{" "}
              <span className="text-sm font-medium text-md-on-surface">
                {" "}
                {formatNumber(entry.value)}{" "}
              </span>{" "}
            </div>
          ))}{" "}
        </div>
      );
    }
    return null;
  };
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {" "}
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-md-surface-container-low"
          >
            {" "}
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>{" "}
            <span className="text-md-on-surface-variant">
              {" "}
              {entry.value}{" "}
            </span>{" "}
          </div>
        ))}{" "}
      </div>
    );
  };
  return (
    <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
      {" "}
      <div className="flex justify-between items-center mb-4">
        {" "}
        <h3 className="text-lg font-bold font-display text-md-on-surface">
          {" "}
          <Icon icon={I.chartLine} className="inline-block mr-2" />{t("langGrowthChart") || "Language Growth"}{" "}
        </h3>{" "}
        <div className="flex gap-2">
          {" "}
          {data.slice(0, 4).map((lang, i) => (
            <div key={lang.name} className="flex items-center gap-1.5">
              {" "}
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              ></div>{" "}
              <span className="text-xs text-md-on-surface-variant">
                {" "}
                {lang.name}{" "}
              </span>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="h-64">
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          {" "}
          <LineChart
            data={combinedData}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            {" "}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--md-outline)"
              opacity={0.3}
              vertical={false}
            />{" "}
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />{" "}
            <YAxis
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => formatNumber(value)}
            />{" "}
            <Tooltip content={<CustomTooltip />} />{" "}
            <Legend content={<CustomLegend />} />{" "}
            {data.slice(0, 6).map((lang, index) => (
              <Line
                key={lang.name}
                type="monotone"
                dataKey={lang.name}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{
                  fill: colors[index % colors.length],
                  strokeWidth: 0,
                  r: 3,
                }}
                activeDot={{ r: 5, strokeWidth: 2 }}
                animationDuration={1000}
              />
            ))}{" "}
          </LineChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default LanguageGrowthChart;


