import { Icon, I } from "../../utils/icons";
import {
  getStatusLevel,
  calculateRemainingPercentage,
} from "../../utils/rateLimitUtils";
const RateLimitAlert = ({ remaining, limit, t, onDismiss }) => {
  const percentage = calculateRemainingPercentage(remaining, limit);
  const status = getStatusLevel(remaining, limit);
  if (status === "good") return null;
  const getAlertConfig = () => {
    switch (status) {
      case "warning":
        return {
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/30",
          icon: I.warning,
          title: t("rateLimitWarningTitle"),
          message: t("rateLimitWarningMessage") || `You have used ${100 - percentage}% of your API requests.`,
        };
      case "critical":
        return {
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/30",
          icon: I.alertOctagon,
          title: t("rateLimitCriticalTitle"),
          message: t("rateLimitCriticalMessage") || `Only ${remaining} requests remaining.`,
        };
      case "danger":
        return {
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          icon: I.ban,
          title: t("rateLimitDangerTitle"),
          message: t("rateLimitDangerMessage") || `Critical: ${remaining} requests left.`,
        };
      default:
        return null;
    }
  };
  const config = getAlertConfig();
  if (!config) return null;
  return (
    <div
      className={`px-4 py-3 rounded-full border ${config.bgColor} ${config.borderColor} animate-fade-in`}
    >
      {" "}
      <div className="flex items-start gap-3">
        {" "}
        <Icon icon={config.icon} className="text-xl" />{" "}
        <div className="flex-1">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <h4 className="font-semibold text-sm font-display text-md-on-surface">
              {" "}
              {config.title}{" "}
            </h4>{" "}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-xs text-md-on-surface-variant hover:text-md-on-surface"
              >
                {" "}
                <Icon icon={I.close} />{" "}
              </button>
            )}{" "}
          </div>{" "}
          <p className="text-xs mt-1 text-md-on-surface-variant">
            {" "}
            {config.message}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default RateLimitAlert;
