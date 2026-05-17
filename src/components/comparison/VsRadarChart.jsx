import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const VsRadarChart = ({ radarData }) => {
  const { t, language } = useLanguage();
  const getLabels = () => {
    const labelsEs = {
      Followers: "Seguidores",
      Stars: "Estrellas",
      Forks: "Forks",
      Repos: "Repos",
      "Avg Stars": "Prom. Estrellas",
      Languages: "Lenguajes",
    };
    const labelsEn = {
      Followers: "Followers",
      Stars: "Stars",
      Forks: "Forks",
      Repos: "Repos",
      "Avg Stars": "Avg Stars",
      Languages: "Languages",
    };
    return language === "es" ? labelsEs : labelsEn;
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-[16px] shadow-md-md border border-md-outline/20 bg-md-surface-container">
          {" "}
          <p className="font-semibold text-md-on-surface">
            {" "}
            {payload[0]?.payload?.subject}{" "}
          </p>{" "}
          <div className="text-sm space-y-1 mt-1">
            {" "}
            {payload.map((entry, i) => (
              <p key={i} style={{ color: entry.color }}>
                {" "}
                {entry.name}: {entry.value}%{" "}
              </p>
            ))}{" "}
          </div>{" "}
        </div>
      );
    }
    return null;
  };
  const labels = getLabels();
  const formattedData = radarData?.map((item) => ({
    ...item,
    subject: labels[item.subject] || item.subject,
  }));
  if (!radarData?.length) {
    return (
      <div className="p-6 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <h3 className="text-xl font-bold font-display mb-4 text-md-on-surface">
          {" "}
          <Icon icon={I.target} className="inline-block mr-2" />{t("vsRadar") || "Skills Comparison"}{" "}
        </h3>{" "}
        <div className="h-64 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="p-6 rounded-[24px] bg-md-surface-container shadow-md-sm">
      {" "}
      <h3 className="text-xl font-bold font-display mb-4 text-md-on-surface">
        {" "}
          <Icon icon={I.target} className="inline-block mr-2" />{t("vsRadar") || "Skills Comparison"}{" "}
        </h3>{" "}
        <div className="h-80">
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          {" "}
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
            {" "}
            <PolarGrid stroke="var(--md-outline)" opacity={0.3} />{" "}
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 12 }}
            />{" "}
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 10 }}
            />{" "}
            <Radar
              name="User 1"
              dataKey="user1"
              stroke="var(--md-primary)"
              fill="var(--md-primary)"
              fillOpacity={0.3}
              strokeWidth={2}
            />{" "}
            <Radar
              name="User 2"
              dataKey="user2"
              stroke="var(--md-tertiary)"
              fill="var(--md-tertiary)"
              fillOpacity={0.3}
              strokeWidth={2}
            />{" "}
            <Legend
              formatter={(value) => (
                <span className="text-md-on-surface-variant"> {value} </span>
              )}
            />{" "}
            <Tooltip content={<CustomTooltip />} />{" "}
          </RadarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default VsRadarChart;
