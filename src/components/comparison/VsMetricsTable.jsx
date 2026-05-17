import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
import { formatNumber } from "../../utils/comparisonUtils";
const VsMetricsTable = ({ comparison }) => {
  const { t } = useLanguage();
  const getLabel = (key) => {
    const labels = {
      followers: t("followers") || "Followers",
      totalStars: t("totalStars") || "Total Stars",
      totalForks: t("totalForks") || "Total Forks",
      publicRepos: t("repos") || "Public Repos",
      avgStarsPerRepo: t("vsAvgStars") || "Avg Stars/Repo",
      uniqueLanguages: t("vsLanguages") || "Languages",
      accountAgeDays: t("vsAccountAge") || "Account Age",
      totalEvents: t("vsTotalEvents") || "Total Events",
    };
    return labels[key] || key;
  };
  const formatValue = (key, value) => {
    if (key === "accountAgeDays") {
      const years = Math.floor(value / 365);
      const days = value % 365;
      if (years > 0) return `${years}y ${days}d`;
      return `${days}d`;
    }
    return formatNumber(value);
  };
  const getWinnerBadge = (winner, position) => {
    if (winner === "tie") return null;
    const isUser1Winner = winner === "user1";
    const showBadge = position === "left" ? isUser1Winner : !isUser1Winner;
    if (showBadge) {
      return <Icon icon={I.trophy} className="text-xs" />;
    }
    return null;
  };
  return (
    <div className="p-6 rounded-[24px] bg-md-surface-container shadow-md-sm">
      {" "}
      <h3 className="text-xl font-bold font-display mb-4 text-md-on-surface">
        {" "}
        <Icon icon={I.chartBar} className="inline-block mr-2" />{t("vsMetrics") || "Comparison Metrics"}{" "}
      </h3>{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="w-full">
          {" "}
          <thead>
            {" "}
            <tr className="border-b border-md-outline/20">
              {" "}
              <th className="text-left py-3 px-2 text-md-on-surface-variant">
                {" "}
                Metric{" "}
              </th>{" "}
              <th className="text-right py-3 px-2 text-md-primary">
                {" "}
                User 1{" "}
              </th>{" "}
              <th className="text-center py-3 px-2 text-md-on-surface-variant">
                {" "}
                vs{" "}
              </th>{" "}
              <th className="text-left py-3 px-2 text-md-tertiary">
                {" "}
                User 2{" "}
              </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {comparison.map((comp, index) => (
              <tr
                key={comp.key}
                className={`border-b border-md-outline/20 ${index % 2 === 0 ? "bg-md-surface-container-low/50" : ""}`}
              >
                {" "}
                <td className="py-3 px-2 font-medium text-md-on-surface">
                  {" "}
                  {getLabel(comp.key)}{" "}
                </td>{" "}
                <td
                  className={`py-3 px-2 text-right flex items-center justify-end gap-2 ${comp.winner === "user1" ? "text-md-primary" : "text-md-on-surface-variant"}`}
                >
                  {" "}
                  {formatValue(comp.key, comp.user1Value)}{" "}
                  {getWinnerBadge(comp.winner, "left")}{" "}
                </td>{" "}
                <td className="py-3 px-2 text-center text-md-on-surface-variant">
                  {" "}
                  {comp.winner === "tie"
                    ? "mdi:handshake"
                    : comp.winner === "user1"
                      ? "←"
                      : "→"}{" "}
                </td>{" "}
                <td
                  className={`py-3 px-2 flex items-center gap-2 ${comp.winner === "user2" ? "text-md-tertiary" : "text-md-on-surface-variant"}`}
                >
                  {" "}
                  {getWinnerBadge(comp.winner, "right")}{" "}
                  {formatValue(comp.key, comp.user2Value)}{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
};
export default VsMetricsTable;

