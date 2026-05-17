import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const WeekdayActivity = ({ data = [] }) => {
  const { t, language } = useLanguage();
  const getDayName = (index) => {
    const daysEs = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return language === "es" ? daysEs[index] : daysEn[index];
  };
  if (!data.length) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
        {" "}
        <h3 className="text-lg sm:text-xl font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.chartBar} className="inline-block mr-2" />{t("weekdayActivityTitle")}{" "}
        </h3>{" "}
        <div className="h-56 sm:h-64 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const chartData = data.map((day, index) => ({
    day: getDayName(index),
    fullDay:
      language === "es"
        ? [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
          ][index]
        : [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][index],
    count: day.count,
  }));
  const maxCount = Math.max(...chartData.map((d) => d.count));
  const getBarOpacity = (count) => {
    if (maxCount === 0) return 0.15;
    const ratio = count / maxCount;
    if (ratio > 0.75) return 1;
    if (ratio > 0.5) return 0.7;
    if (ratio > 0.25) return 0.45;
    return 0.2;
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-4 rounded-[24px] shadow-md-md border border-md-outline/20 bg-md-surface-container animate-scale-in">
          {" "}
          <p className="font-bold text-md-on-surface">{data.fullDay}</p>{" "}
          <p className="text-sm text-md-on-surface-variant">
            {" "}
            {data.count} {t("events")}{" "}
          </p>{" "}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-slide-up">
      {" "}
        <h3 className="text-lg sm:text-xl font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.chartBar} className="inline-block mr-2" />{t("weekdayActivityTitle")}{" "}
        </h3>{" "}
        <div className="h-56 sm:h-64">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            {" "}
            <BarChart
              data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {" "}
            <XAxis
              dataKey="day"
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 12 }}
              axisLine={{ stroke: "var(--md-outline)", opacity: 0.3 }}
              tickLine={false}
            />{" "}
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />{" "}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--md-primary)", opacity: 0.08 }}
            />{" "}
            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {" "}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="var(--md-primary)"
                  fillOpacity={getBarOpacity(entry.count)}
                />
              ))}{" "}
            </Bar>{" "}
          </BarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default WeekdayActivity;
