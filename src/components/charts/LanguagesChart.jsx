import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const LanguagesChart = ({ languages = [] }) => {
  const { t } = useLanguage();
  if (!languages.length) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-scale-in">
        {" "}
        <h3 className="text-lg sm:text-xl font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.languages} className="inline-block mr-2" />{t("languagesTitle")}{" "}
        </h3>{" "}
        <div className="h-64 sm:h-72 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("noData")}{" "}
        </div>{" "}
      </div>
    );
  }
  const data = languages.map((lang) => ({
    name: lang.name,
    value: lang.count,
    color: lang.color,
  }));
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-4 rounded-[24px] shadow-md-md border border-md-outline/20 bg-md-surface-container animate-scale-in">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ backgroundColor: data.color }}
            ></div>{" "}
            <p className="font-bold text-md-on-surface">{data.name}</p>{" "}
          </div>{" "}
          <p className="text-sm mt-1 text-md-on-surface-variant">
            {" "}
            {data.value} {t("repositories")}{" "}
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
          <Icon icon={I.languages} className="inline-block mr-2" />{t("languagesTitle")}{" "}
        </h3>{" "}
        <div className="h-64 sm:h-72">
          {" "}
          <ResponsiveContainer width="100%" height="100%">
            {" "}
            <PieChart>
            {" "}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {" "}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                  style={{ filter: `drop-shadow(0 0 8px ${entry.color}50)` }}
                />
              ))}{" "}
            </Pie>{" "}
            <Tooltip content={<CustomTooltip />} />{" "}
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-sm text-md-on-surface-variant">
                  {" "}
                  {value}{" "}
                </span>
              )}
            />{" "}
          </PieChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};
export default LanguagesChart;
