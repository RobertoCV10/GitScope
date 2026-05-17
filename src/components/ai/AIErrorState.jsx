import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const AIErrorState = ({
  message = "Error al generar insights",
  onRetry,
  type = "generic",
}) => {
  const { t } = useLanguage();
  const errorConfig = {
    profile: {
      icon: I.magnify,
      title: t("aiProfileErrorTitle") || "Profile Analysis Error",
      description: message,
    },
    jobmarket: {
      icon: I.briefcase,
      title: t("aiJobMarketErrorTitle") || "Job Market Insights Error",
      description: message,
    },
    config: {
      icon: "mdi:cog",
      title: t("aiNotConfiguredTitle") || "AI Insights Not Configured",
      description:
        t("aiNotConfiguredDesc") ||
        "Set VITE_GEMINI_API_KEY in your .env file to enable AI-powered insights.",
    },
    generic: {
      icon: I.ai,
      title: t("aiGenericErrorTitle") || "AI Insights Unavailable",
      description: message,
    },
  };
  const config = errorConfig[type] || errorConfig.generic;
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm animate-fade-in">
      {" "}
      <div className="flex flex-col items-center text-center gap-4 py-4">
        {" "}
        <div className="w-16 h-16 rounded-[16px] flex items-center justify-center text-3xl bg-md-surface-container-low">
          {" "}
          <Icon icon={config.icon} className="text-3xl" />{" "}
        </div>{" "}
        <h3 className="text-lg font-bold font-display text-md-on-surface">
          {" "}
          {config.title}{" "}
        </h3>{" "}
        <p className="text-sm max-w-md text-md-on-surface-variant">
          {" "}
          {config.description}{" "}
        </p>{" "}
        {onRetry && type !== "config" && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 text-md-primary hover:bg-md-primary/10"
          >
            {" "}
            <Icon icon={I.refresh} /> <span>{t("retry") || "Retry"}</span>{" "}
          </button>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default AIErrorState;
