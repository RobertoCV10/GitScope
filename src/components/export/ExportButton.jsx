import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const ExportButton = ({
  format,
  onClick,
  disabled = false,
  loading = false,
  showProgress = false,
  progress = 0,
}) => {
  const { t } = useLanguage();
  const formatConfig = {
    csv: {
      icon: I.chartBar,
      label: "CSV",
      description: t("exportCsvDesc") || "Data for Excel",
    },
    json: {
      icon: I.link,
      label: "JSON",
      description: t("exportJsonDesc") || "Complete data",
    },
    pdf: {
      icon: I.fileDocument,
      label: "PDF",
      description: t("exportPdfDesc") || "Visual report",
    },
  };
  const config = formatConfig[format] || formatConfig.csv;
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-[24px] transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-md-surface-container shadow-md-sm hover:shadow-md-md"
    >
      {" "}
      {loading && showProgress && (
        <div className="absolute inset-0 flex items-center justify-center">
          {" "}
          <svg className="w-16 h-16 animate-spin" viewBox="0 0 36 36">
            {" "}
            <circle
              className="opacity-25"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />{" "}
            <circle
              className="opacity-75"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />{" "}
          </svg>{" "}
        </div>
      )}{" "}
      <div
        className={`text-2xl sm:text-3xl mb-1.5 sm:mb-2 transition-transform duration-300 group-hover:scale-110 ${loading ? "opacity-50" : ""}`}
      >
        {" "}
        {loading ? <Icon icon="mdi:timer-sand" className="animate-pulse" /> : <Icon icon={config.icon} />}{" "}
      </div>{" "}
      <span className="font-bold text-sm sm:text-base mb-1 text-md-on-surface">
        {" "}
        {config.label}{" "}
      </span>{" "}
      <span className="text-xs text-center hidden sm:block text-md-on-surface-variant">
        {" "}
        {config.description}{" "}
      </span>{" "}
      {loading && showProgress && (
        <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-md-surface-container-low rounded-b-[24px] overflow-hidden">
          {" "}
          <div
            className="h-full bg-md-primary/50 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />{" "}
        </div>
      )}{" "}
    </button>
  );
};
export default ExportButton;
