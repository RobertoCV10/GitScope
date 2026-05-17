import { I } from "../../utils/icons";
const RateLimitStatus = ({ status, t }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "good":
        return {
          color: "bg-emerald-500",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          icon: I.check,
          label: t("rateLimitStatusGood"),
          pulse: false,
        };
      case "warning":
        return {
          color: "bg-amber-500",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/30",
          icon: I.warning,
          label: t("rateLimitStatusWarning"),
          pulse: false,
        };
      case "critical":
        return {
          color: "bg-orange-500",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/30",
          icon: I.lightning,
          label: t("rateLimitStatusCritical"),
          pulse: true,
        };
      case "danger":
        return {
          color: "bg-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          icon: I.alertOctagon,
          label: t("rateLimitStatusDanger"),
          pulse: true,
        };
      default:
        return {
          color: "bg-gray-500",
          bgColor: "bg-gray-500/10",
          borderColor: "border-gray-500/30",
          icon: "mdi:help-circle-outline",
          label: t("rateLimitStatusUnknown"),
          pulse: false,
        };
    }
  };
  const config = getStatusConfig();
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}
    >
      {" "}
      <span className={`relative flex h-2 w-2`}>
        {" "}
        {config.pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.color}`}
          ></span>
        )}{" "}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}
        ></span>{" "}
      </span>{" "}
      <span className="text-sm font-medium">{config.label}</span>{" "}
    </div>
  );
};
export default RateLimitStatus;
