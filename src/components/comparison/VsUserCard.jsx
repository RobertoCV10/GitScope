import { useLanguage } from "../../hooks/useLanguage";
import { formatNumber } from "../../utils/comparisonUtils";
import { Icon, I } from "../../utils/icons";
const VsUserCard = ({
  user,
  metrics,
  isWinner,
  _position = "left",
  loading = false,
}) => {
  useLanguage();
  if (loading) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] animate-pulse bg-md-surface-container shadow-md-sm">
        {" "}
        <div className="flex items-center gap-4">
          {" "}
          <div className="w-20 h-20 rounded-[16px] bg-md-surface-container-low"></div>{" "}
          <div className="flex-1 space-y-3">
            {" "}
            <div className="h-6 w-32 rounded bg-md-surface-container-low"></div>{" "}
            <div className="h-4 w-24 rounded bg-md-surface-container-low/70"></div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  if (!user) return null;
  return (
    <div
      className={`relative p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-slide-up ${isWinner ? "ring-2 ring-md-primary shadow-md-md" : ""}`}
    >
      {" "}
      {isWinner && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-md-tertiary text-md-on-tertiary text-sm font-bold rounded-full shadow-md-md z-10 animate-bounce-soft">
          {" "}
          <Icon icon={I.trophy} className="inline-block mr-1" /> Winner{" "}
        </div>
      )}{" "}
      <div className="flex flex-col items-center text-center pt-2">
        {" "}
        <div className="relative mb-4">
          {" "}
          <img
            src={user.avatar_url}
            alt={user.login}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[16px] border-2 border-md-outline/30 shadow-md-md transition-transform duration-300 hover:scale-105"
          />{" "}
        </div>{" "}
        <h3 className="text-xl sm:text-2xl font-bold font-display text-md-on-surface">
          {" "}
          {user.name || user.login}{" "}
        </h3>{" "}
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-md-primary hover:text-md-primary/80 transition-colors"
        >
          {" "}
          @{user.login}{" "}
        </a>{" "}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
          {" "}
          {[
            { icon: I.users, value: formatNumber(metrics?.followers || 0) },
            { icon: I.star, value: formatNumber(metrics?.totalStars || 0) },
            { icon: I.package, value: formatNumber(metrics?.publicRepos || 0) },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-md-surface-container-low transition-all duration-300 hover:bg-md-primary/10 hover:scale-105"
            >
              {" "}
              <Icon icon={stat.icon} className="text-base sm:text-lg" />{" "}
              <span className="font-bold font-display text-sm sm:text-base text-md-on-surface">
                {" "}
                {stat.value}{" "}
              </span>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        {metrics?.topLanguage && (
          <div className="mt-3 px-4 py-1.5 rounded-full text-sm font-medium bg-md-primary-container text-md-on-primary-container transition-all duration-300 hover:scale-105">
            {" "}
            <Icon icon={I.languages} className="inline-block mr-1" /> {metrics.topLanguage}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default VsUserCard;



