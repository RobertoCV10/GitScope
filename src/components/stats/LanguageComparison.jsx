import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const LanguageComparison = ({ comparisonData = [] }) => {
  const { t } = useLanguage();
  if (!comparisonData.length) {
    return (
      <div className="p-6 rounded-[24px] bg-md-surface-container text-center">
        {" "}
        <Icon icon={I.scale} className="text-4xl mb-4 block mx-auto" />{" "}
        <h3 className="text-lg font-bold mb-2 font-display text-md-on-surface">
          {" "}
          {t("langNoComparison") || "No comparison data"}{" "}
        </h3>{" "}
        <p className="text-sm text-md-on-surface-variant">
          {" "}
          {t("langNoComparisonDesc") ||
            "Search for a user to compare your languages with global stats"}{" "}
        </p>{" "}
      </div>
    );
  }
  const chartData = comparisonData.map((item) => ({
    name: item.name,
    user: parseFloat(item.userPercentage),
    global: parseFloat(item.globalPercentage),
    difference: parseFloat(item.difference),
    color: item.color,
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
          </div>{" "}
          <div className="space-y-1">
            {" "}
            <p className="text-sm text-md-primary"> Your: {data.user}% </p>{" "}
            <p className="text-sm text-md-on-surface-variant">
              {" "}
              Global: {data.global}%{" "}
            </p>{" "}
            <p
              className={`text-xs font-medium ${data.difference > 0 ? "text-emerald-500" : data.difference < 0 ? "text-md-error" : "text-md-on-surface-variant"}`}
            >
              {" "}
              {data.difference > 0 ? "+" : ""}
              {data.difference}% vs global{" "}
            </p>{" "}
          </div>{" "}
        </div>
      );
    }
    return null;
  };
  const CustomLegend = () => (
    <div className="flex justify-center gap-6 mt-4">
      {" "}
      <div className="flex items-center gap-2">
        {" "}
        <div className="w-3 h-3 rounded-full bg-md-primary"></div>{" "}
        <span className="text-sm text-md-on-surface-variant">
          {" "}
          {t("langYourUsage") || "Your Usage"}{" "}
        </span>{" "}
      </div>{" "}
      <div className="flex items-center gap-2">
        {" "}
        <div className="w-3 h-3 rounded-full bg-md-on-surface-variant/40"></div>{" "}
        <span className="text-sm text-md-on-surface-variant">
          {" "}
          {t("langGlobalAvg") || "Global Average"}{" "}
        </span>{" "}
      </div>{" "}
    </div>
  );
  return (
    <div className="space-y-6">
      {" "}
      <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.scale} className="inline-block mr-2" />{t("langCompareGlobal") || "Your Languages vs Global Average"}{" "}
        </h3>{" "}
        <div className="h-72">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            {" "}
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              {" "}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--md-outline)"
                vertical={false}
              />{" "}
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--md-on-surface-variant)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />{" "}
              <YAxis
                tick={{ fill: "var(--md-on-surface-variant)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />{" "}
              <Tooltip content={<CustomTooltip />} />{" "}
              <Legend content={<CustomLegend />} />{" "}
              <Bar
                dataKey="user"
                name={t("langYourUsage") || "Your Usage"}
                fill="var(--md-primary)"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />{" "}
              <Bar
                dataKey="global"
                name={t("langGlobalAvg") || "Global Average"}
                fill="var(--md-on-surface-variant)"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />{" "}
            </BarChart>{" "}
          </ResponsiveContainer>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {" "}
        {comparisonData.map((item) => (
          <div
            key={item.name}
            className="p-4 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.02] hover:shadow-md-md"
          >
            {" "}
            <div className="flex items-center justify-between mb-3">
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>{" "}
                <span className="font-bold text-md-on-surface">
                  {" "}
                  {item.name}{" "}
                </span>{" "}
              </div>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${item.comparison === "above" ? "bg-emerald-500/20 text-emerald-500" : item.comparison === "below" ? "bg-md-error/20 text-md-error" : "bg-md-surface-container-low text-md-on-surface-variant"}`}
              >
                {" "}
                {item.comparison === "above"
                  ? t("langAbove") || "Above"
                  : item.comparison === "below"
                    ? t("langBelow") || "Below"
                    : t("langAverage") || "Average"}{" "}
              </span>{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <div className="flex justify-between text-sm">
                {" "}
                <span className="text-md-on-surface-variant">
                  {" "}
                  {t("langYou") || "You"}:{" "}
                </span>{" "}
                <span className="font-medium text-md-primary">
                  {" "}
                  {item.userPercentage}%{" "}
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between text-sm">
                {" "}
                <span className="text-md-on-surface-variant">
                  {" "}
                  {t("langGlobal") || "Global"}:{" "}
                </span>{" "}
                <span className="font-medium text-md-on-surface-variant">
                  {" "}
                  {item.globalPercentage}%{" "}
                </span>{" "}
              </div>{" "}
              <div className="pt-2 border-t border-md-outline/20">
                {" "}
                <div className="flex justify-between text-sm">
                  {" "}
                  <span className="text-md-on-surface-variant">
                    {" "}
                    {t("langDifference") || "Difference"}:{" "}
                  </span>{" "}
                  <span
                    className={`font-bold ${parseFloat(item.difference) > 0 ? "text-emerald-500" : parseFloat(item.difference) < 0 ? "text-md-error" : "text-md-on-surface-variant"}`}
                  >
                    {" "}
                    {parseFloat(item.difference) > 0 ? "+" : ""}
                    {item.difference}%{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default LanguageComparison;
