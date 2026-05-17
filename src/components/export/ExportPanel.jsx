import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
import ExportButton from "./ExportButton";
import ExportProgress from "./ExportProgress";
const ExportPanel = ({
  data,
  exportState,
  onExportCSV,
  onExportJSON,
  onExportPDF,
  showProgress = true,
}) => {
  const { t } = useLanguage();
  const { isExporting, progress, currentFormat, error, lastExport } =
    exportState;
  const handleExport = (format) => {
    if (isExporting) return;
    switch (format) {
      case "csv":
        onExportCSV();
        break;
      case "json":
        onExportJSON();
        break;
      case "pdf":
        onExportPDF();
        break;
      default:
        break;
    }
  };
  return (
    <>
      {" "}
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-slide-up">
        {" "}
        <div className="flex items-center gap-3 mb-5">
          {" "}
          <div className="w-12 h-12 rounded-[16px] flex items-center justify-center text-2xl shadow-md-sm bg-md-primary text-md-on-primary">
            {" "}
            <Icon icon={I.package} size="1.5em" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3 className="text-lg sm:text-xl font-bold font-display text-md-on-surface">
              {" "}
              {t("exportData") || "Export Data"}{" "}
            </h3>{" "}
            <p className="text-sm text-md-on-surface-variant">
              {" "}
              {t("exportDataDesc") ||
                "Download your profile in different formats"}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
          {" "}
          <ExportButton
            format="csv"
            onClick={() => handleExport("csv")}
            disabled={!data?.repos?.length || isExporting}
            loading={isExporting && currentFormat === "csv"}
            progress={currentFormat === "csv" ? progress : 0}
            showProgress={showProgress}
          />{" "}
          <ExportButton
            format="json"
            onClick={() => handleExport("json")}
            disabled={!data?.user || isExporting}
            loading={isExporting && currentFormat === "json"}
            progress={currentFormat === "json" ? progress : 0}
            showProgress={showProgress}
          />{" "}
          <ExportButton
            format="pdf"
            onClick={() => handleExport("pdf")}
            disabled={!data?.user || isExporting}
            loading={isExporting && currentFormat === "pdf"}
            progress={currentFormat === "pdf" ? progress : 0}
            showProgress={showProgress}
          />{" "}
        </div>{" "}
        {lastExport && !isExporting && (
          <div className="p-3 sm:p-4 rounded-full bg-md-surface-container-low animate-slide-up">
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <Icon icon={I.check} className="text-lg text-emerald-500" />{" "}
              <span className="text-xs sm:text-sm text-md-on-surface-variant">
                {" "}
                {document.documentElement.lang === "es"
                  ? `Último export: ${lastExport.type.toUpperCase()} (${lastExport.size})`
                  : `Last export: ${lastExport.type.toUpperCase()} (${lastExport.size})`}{" "}
              </span>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {error && (
          <div className="p-4 rounded-full bg-md-error/10 border border-md-error/30">
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <Icon icon={I.warning} className="text-lg" />{" "}
              <span className="text-sm text-md-error">{error}</span>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
      {showProgress && (
        <ExportProgress
          isExporting={isExporting}
          progress={progress}
          format={currentFormat}
          onComplete={() => {}}
        />
      )}{" "}
    </>
  );
};
export default ExportPanel;
