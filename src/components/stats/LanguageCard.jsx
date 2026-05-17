import { getTrendDirection } from "../../utils/languagesStatsUtils";
const LanguageCard = ({ language, rank, compact = false }) => {
  const {
    name,
    color,
    
    
    growth30d = 0,
    growth90d = 0,
    growth365d = 0,
    formattedRepos = "0",
    formattedStars = "0",
  } = language;
  const trendDirection = getTrendDirection(growth365d);
  if (compact) {
    return (
      <div className="flex items-center justify-between p-2.5 rounded-full bg-md-surface-container-low transition-all duration-300 hover:bg-md-primary/10 hover:scale-[1.01] cursor-pointer">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${rank <= 3 ? (rank === 1 ? "bg-md-primary text-md-on-primary" : rank === 2 ? "bg-md-surface-container text-md-on-surface-variant" : "bg-amber-500/20 text-amber-500") : "bg-md-surface-container text-md-on-surface-variant"}`}
          >
            {" "}
            {rank}{" "}
          </span>{" "}
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          ></div>{" "}
          <span className="font-medium text-sm text-md-on-surface">
            {" "}
            {name}{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <span className="text-xs text-md-on-surface-variant">
            {" "}
            {formattedRepos}{" "}
          </span>{" "}
          <span
            className={`px-1.5 py-0.5 rounded text-xs font-medium ${trendDirection === "up" ? "text-emerald-500" : trendDirection === "down" ? "text-md-error" : "text-md-on-surface-variant"}`}
          >
            {" "}
            {growth365d > 0 ? "+" : ""}
            {growth365d}%{" "}
          </span>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="p-4 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.02] hover:shadow-md-md cursor-pointer">
      {" "}
      <div className="flex items-start justify-between mb-3">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div
            className="w-4 h-4 rounded-lg"
            style={{ backgroundColor: color }}
          ></div>{" "}
          <div>
            {" "}
            <h4 className="font-bold text-md-on-surface"> {name} </h4>{" "}
            <span className="text-xs text-md-on-surface-variant">
              {" "}
              #{rank} global{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {" "}
        <div className="p-2 rounded-full bg-md-surface-container-low">
          {" "}
          <p className="text-xs text-md-on-surface-variant">
            {" "}
            Repositories{" "}
          </p>{" "}
          <p className="text-lg font-bold text-md-on-surface">
            {" "}
            {formattedRepos}{" "}
          </p>{" "}
        </div>{" "}
        <div className="p-2 rounded-full bg-md-surface-container-low">
          {" "}
          <p className="text-xs text-md-on-surface-variant"> Stars </p>{" "}
          <p className="text-lg font-bold text-md-on-surface">
            {" "}
            {formattedStars}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex flex-wrap gap-2">
        {" "}
        <div className="flex-1 min-w-[60px] p-2 rounded-full bg-md-surface-container-low text-center">
          {" "}
          <p className="text-xs text-md-on-surface-variant">30D</p>{" "}
          <span
            className={`text-sm font-bold ${growth30d > 0 ? "text-emerald-500" : growth30d < 0 ? "text-md-error" : "text-md-on-surface-variant"}`}
          >
            {" "}
            {growth30d > 0 ? "+" : ""}
            {growth30d}%{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex-1 min-w-[60px] p-2 rounded-full bg-md-surface-container-low text-center">
          {" "}
          <p className="text-xs text-md-on-surface-variant">90D</p>{" "}
          <span
            className={`text-sm font-bold ${growth90d > 0 ? "text-emerald-500" : growth90d < 0 ? "text-md-error" : "text-md-on-surface-variant"}`}
          >
            {" "}
            {growth90d > 0 ? "+" : ""}
            {growth90d}%{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex-1 min-w-[60px] p-2 rounded-full bg-md-surface-container-low text-center">
          {" "}
          <p className="text-xs text-md-on-surface-variant">1Y</p>{" "}
          <span
            className={`text-sm font-bold ${growth365d > 0 ? "text-emerald-500" : growth365d < 0 ? "text-md-error" : "text-md-on-surface-variant"}`}
          >
            {" "}
            {growth365d > 0 ? "+" : ""}
            {growth365d}%{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default LanguageCard;



