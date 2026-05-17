import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const GlobalLanguagesChart = ({ languages = [], title = "" }) => {
  const { t } = useLanguage();
  if (!languages.length) {
    return (
      <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
          {" "}
          {title}{" "}
        </h3>{" "}
        <div className="h-64 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const chartData = languages.map((lang) => ({
    name: lang.name,
    repositories: lang.repositories,
    formattedRepos: lang.formattedRepos,
    color: lang.color,
    rank: lang.rank,
  }));
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-4 rounded-[24px] shadow-md-md border border-md-outline/20 bg-md-surface-container animate-scale-in">
          {" "}
          <div className="flex items-center gap-2 mb-2">
            {" "}
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            ></div>{" "}
            <p className="font-bold text-md-on-surface"> {data.name} </p>{" "}
            <span className="text-xs px-2 py-0.5 rounded-full bg-md-surface-container-low text-md-on-surface-variant">
              {" "}
              #{data.rank}{" "}
            </span>{" "}
          </div>{" "}
          <p className="text-sm text-md-on-surface-variant">
            {" "}
            {data.formattedRepos} {t("repositories")}{" "}
          </p>{" "}
          <p className="text-xs mt-1 text-md-on-surface-variant/60">
            {" "}
            {data.repositories.toLocaleString()} total{" "}
          </p>{" "}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
      {" "}
      <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
        {" "}
        <Icon icon={I.chartBar} className="inline-block mr-2" />{title}{" "}
        </h3>{" "}
        <div className="h-72">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            {" "}
            <BarChart
              data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {" "}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--md-outline)"
              opacity={0.3}
              horizontal={false}
            />{" "}
            <XAxis
              type="number"
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 11 }}
              tickFormatter={(value) => {
                if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
                if (value >= 1000) return (value / 1000).toFixed(0) + "K";
                return value;
              }}
            />{" "}
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 11 }}
              width={60}
            />{" "}
            <Tooltip content={<CustomTooltip />} />{" "}
            <Bar
              dataKey="repositories"
              radius={[0, 6, 6, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {" "}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{ filter: `drop-shadow(0 0 6px ${entry.color}60)` }}
                />
              ))}{" "}
            </Bar>{" "}
          </BarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default GlobalLanguagesChart;
