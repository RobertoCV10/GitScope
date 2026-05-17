import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const RateLimitChart = ({ data, t }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-4 text-md-on-surface-variant">
        {" "}
        {t("rateLimitNoHistory")}{" "}
      </div>
    );
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="px-3 py-2 rounded-[16px] border border-md-outline/20 shadow-md-sm bg-md-surface-container">
          {" "}
          <p className="text-xs font-medium text-md-on-surface-variant">
            {" "}
            {label}{" "}
          </p>{" "}
          <p className="text-sm font-bold font-display text-md-on-surface">
            {" "}
            {data.remaining} / {data.limit}{" "}
          </p>{" "}
          <p className="text-xs text-md-on-surface-variant">
            {" "}
            {data.remainingPercentage}% remaining{" "}
          </p>{" "}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="w-full h-32">
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        {" "}
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
        >
          {" "}
          <defs>
            {" "}
            <linearGradient id="remainingGradient" x1="0" y1="0" x2="0" y2="1">
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
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "var(--md-on-surface-variant)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />{" "}
          <YAxis
            tick={{ fontSize: 10, fill: "var(--md-on-surface-variant)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
          />{" "}
          <Tooltip content={<CustomTooltip />} />{" "}
          <Area
            type="monotone"
            dataKey="remaining"
            stroke="var(--md-primary)"
            strokeWidth={2}
            fill="url(#remainingGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--md-primary)" }}
          />{" "}
        </AreaChart>{" "}
      </ResponsiveContainer>{" "}
    </div>
  );
};
export default RateLimitChart;


