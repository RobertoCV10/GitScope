import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { formatNumber } from "../../utils/languagesStatsUtils";
import { Icon, I } from "../../utils/icons";
const TrendingLanguages = ({ languages = [], period = "30d" }) => {
  const { t } = useLanguage();
  if (!languages.length) {
    return (
      <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.fire} className="inline-block mr-2" />{t("langTrending") || "Trending Languages"}{" "}
        </h3>{" "}
        <div className="h-64 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const getGrowthKey = () => {
    switch (period) {
      case "30d":
        return "growth30d";
      case "90d":
        return "growth90d";
      case "365d":
        return "growth365d";
      default:
        return "growth30d";
    }
  };
  const growthKey = getGrowthKey();
  const generateHistory = (baseValue, growthRate, months) => {
    const history = [];
    let value = baseValue * (1 - Math.abs(growthRate) / 100);
    const monthlyGrowth = growthRate / months;
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString("en", { month: "short" });
      value = value * (1 + monthlyGrowth / 100);
      history.push({ month, value: Math.round(value) });
    }
    return history;
  };
  const chartData = languages[0]?.name
    ? (() => {
        const months = period === "30d" ? 1 : period === "90d" ? 3 : 12;
        const baseLang = languages[0];
        const growth = baseLang[growthKey];
        return generateHistory(baseLang.repositories, growth, months);
      })()
    : [];
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-4 rounded-[24px] shadow-md-md border border-md-outline/20 bg-md-surface-container animate-scale-in">
          {" "}
          <p className="font-medium text-md-on-surface"> {data.month} </p>{" "}
          <p className="text-lg font-bold text-md-primary">
            {" "}
            {formatNumber(data.value)} repos{" "}
          </p>{" "}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
      {" "}
      <div className="flex justify-between items-center mb-4">
        {" "}
        <h3 className="text-lg font-bold font-display text-md-on-surface">
          {" "}
          <Icon icon={I.fire} className="inline-block mr-2" />{t("langTrending") || "Trending Languages"}{" "}
        </h3>{" "}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${period === "365d" ? "bg-emerald-500/20 text-emerald-500" : period === "90d" ? "bg-amber-500/20 text-amber-500" : "bg-md-primary/20 text-md-primary"}`}
        >
          {" "}
          {period === "30d" ? "30D" : period === "90d" ? "90D" : "1Y"}{" "}
        </span>{" "}
      </div>{" "}
      <div className="space-y-2 mb-6">
        {" "}
        {languages.slice(0, 5).map((lang, index) => (
          <div
            key={lang.name}
            className="flex items-center justify-between p-3 rounded-full bg-md-surface-container-low transition-all duration-300 hover:scale-[1.01] hover:bg-md-primary/10 cursor-pointer"
          >
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? "bg-md-primary text-md-on-primary" : index === 1 ? "bg-md-surface-container text-md-on-surface-variant" : index === 2 ? "bg-amber-500/20 text-amber-500" : "bg-md-surface-container text-md-on-surface-variant"}`}
              >
                {" "}
                {index + 1}{" "}
              </span>{" "}
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              ></div>{" "}
              <span className="font-medium text-md-on-surface">
                {" "}
                {lang.name}{" "}
              </span>{" "}
            </div>{" "}
            <div className="flex items-center gap-4">
              {" "}
              <span className="text-sm text-md-on-surface-variant">
                {" "}
                {lang.formattedRepos}{" "}
              </span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${lang[growthKey] > 0 ? "bg-emerald-500/20 text-emerald-500" : "bg-md-error/20 text-md-error"}              `}
              >
                {" "}
                {lang[growthKey] > 0 ? "+" : ""}
                {lang[growthKey]}%{" "}
              </span>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="h-48">
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          {" "}
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {" "}
            <defs>
              {" "}
              <linearGradient id="trendingGradient" x1="0" y1="0" x2="0" y2="1">
                {" "}
                <stop
                  offset="5%"
                  stopColor="var(--md-primary)"
                  stopOpacity={0.4}
                />{" "}
                <stop
                  offset="95%"
                  stopColor="var(--md-primary)"
                  stopOpacity={0}
                />{" "}
              </linearGradient>{" "}
            </defs>{" "}
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
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--md-primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#trendingGradient)"
              animationDuration={1000}
            />{" "}
          </AreaChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default TrendingLanguages;
