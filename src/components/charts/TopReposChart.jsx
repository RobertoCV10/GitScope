import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const TopReposChart = ({ repos = [] }) => {
  const { t } = useLanguage();
  if (!repos.length) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
        {" "}
        <h3 className="text-lg sm:text-xl font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.star} className="inline-block mr-2" />{t("topReposTitle")}{" "}
        </h3>{" "}
        <div className="h-64 sm:h-72 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const data = repos.map((repo) => ({
    name:
      repo.name.length > 18 ? repo.name.substring(0, 15) + "..." : repo.name,
    fullName: repo.fullName,
    stars: repo.stars,
    forks: repo.forks,
    language: repo.language,
    url: repo.url,
  }));
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-4 rounded-[24px] shadow-md-md border border-md-outline/20 bg-md-surface-container animate-scale-in">
          {" "}
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline block transition-colors text-md-primary"
          >
            {" "}
            {data.fullName}{" "}
          </a>{" "}
          <div className="mt-2 text-sm space-y-1 text-md-on-surface-variant">
            {" "}
            <p>
              <Icon icon={I.star} className="inline-block mr-1" /> {data.stars?.toLocaleString()} {t("stars")}
            </p>{" "}
            <p>
              <Icon icon={I.fork} className="inline-block mr-1" /> {data.forks?.toLocaleString()} {t("forks")}
            </p>{" "}
            {data.language && <p><Icon icon={I.languages} className="inline-block mr-1" /> {data.language}</p>}{" "}
          </div>{" "}
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
          <Icon icon={I.star} className="inline-block mr-2" />{t("topReposTitle")}{" "}
        </h3>{" "}
        <div className="h-64 sm:h-72">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            {" "}
            <BarChart
              data={data}
            layout="vertical"
            margin={{ top: 5, right: 15, left: 70, bottom: 5 }}
          >
            {" "}
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 11 }}
              allowDecimals={false}
            />{" "}
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--md-on-surface-variant)", fontSize: 11 }}
              width={65}
            />{" "}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--md-primary)", opacity: 0.1 }}
            />{" "}
            <Bar
              dataKey="stars"
              fill="var(--md-primary)"
              radius={[0, 8, 8, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            />{" "}
          </BarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default TopReposChart;
