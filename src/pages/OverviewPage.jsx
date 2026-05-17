import { useLanguage } from "../hooks/useLanguage";
import UserCard from "../components/user/UserCard";
import { Icon, I } from "../utils/icons";
const OverviewPage = ({
  user,
  analytics,
  loading,
  darkMode,
  exportData,
  exportState,
  onExportCSV,
  onExportJSON,
  onExportPDF,
}) => {
  const { t } = useLanguage();
  const { isExporting, error, lastExport } = exportState || {};
  if (loading) {
    return (
      <div
        className="space-y-6 animate-fade-in"
        role="status"
        aria-label="Loading"
      >
        {" "}
        <div className="p-6 rounded-[24px] animate-pulse bg-md-surface-container">
          {" "}
          <div className="flex items-start gap-5">
            {" "}
            <div className="w-28 h-28 rounded-[16px] bg-md-surface-container-low" />{" "}
            <div className="flex-1 space-y-3">
              {" "}
              <div className="h-7 w-48 rounded-lg bg-md-surface-container-low" />{" "}
              <div className="h-4 w-32 rounded-lg bg-md-surface-container-low/70" />{" "}
              <div className="h-4 w-64 rounded-lg bg-md-surface-container-low/70" />{" "}
              <div className="flex gap-3 mt-4">
                {" "}
                <div className="h-8 w-20 rounded-lg bg-md-surface-container-low/70" />{" "}
                <div className="h-8 w-20 rounded-lg bg-md-surface-container-low/70" />{" "}
                <div className="h-8 w-20 rounded-lg bg-md-surface-container-low/70" />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {" "}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-[24px] animate-pulse bg-md-surface-container"
            >
              {" "}
              <div className="h-8 w-8 rounded-lg bg-md-surface-container-low mb-3" />{" "}
              <div className="h-9 w-20 rounded-lg bg-md-surface-container-low mb-2" />{" "}
              <div className="h-3 w-28 rounded bg-md-surface-container-low/70" />{" "}
            </div>
          ))}{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {" "}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-[24px] animate-pulse bg-md-surface-container"
            >
              {" "}
              <div className="h-6 w-6 rounded-lg bg-md-surface-container-low mb-2" />{" "}
              <div className="h-6 w-24 rounded-lg bg-md-surface-container-low mb-1" />{" "}
              <div className="h-3 w-32 rounded bg-md-surface-container-low/70" />{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>
    );
  }
  if (!user) return null;
  const { insights } = analytics;
  const heroInsights = insights.slice(0, 4);
  const secondaryInsights = insights.slice(4, 7);
  const hasExportData = exportData?.repos?.length > 0;
  const exportFormats = [
    { key: "csv", icon: I.chartBar, label: "CSV", onClick: onExportCSV },
    { key: "json", icon: I.link, label: "JSON", onClick: onExportJSON },
    { key: "pdf", icon: I.fileDocument, label: "PDF", onClick: onExportPDF },
  ];
  const handleExport = (fmt) => {
    if (isExporting) return;
    fmt.onClick();
  };
  return (
    <div className="space-y-6 animate-fade-in">
      {" "}
      <div className="animate-slide-up">
        {" "}
        <UserCard user={user} darkMode={darkMode} />{" "}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {" "}
          <div className="flex gap-1.5">
            {" "}
            {exportFormats.map((fmt) => (
              <button
                key={fmt.key}
                onClick={() => handleExport(fmt)}
                disabled={isExporting || !hasExportData}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 bg-md-surface-container-low text-md-on-surface-variant hover:bg-md-primary/10 hover:text-md-primary"
              >
                {" "}
                <Icon icon={fmt.icon} className="text-lg" />{" "}
                <span className="font-semibold">{fmt.label}</span>{" "}
              </button>
            ))}{" "}
          </div>{" "}
          {lastExport && !isExporting && (
            <span className="text-xs text-md-on-surface-variant/60">
              {" "}
              <Icon icon={I.check} className="text-emerald-500" /> {t("lastExport") || "Last"}: {lastExport.type.toUpperCase()} (
              {lastExport.size}){" "}
            </span>
          )}{" "}
          {error && (
            <span className="text-xs text-md-error"><Icon icon={I.alert} /> {error}</span>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {heroInsights.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {" "}
          {heroInsights.map((insight, i) => (
            <div
              key={insight.titleKey}
              className="group relative p-5 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.02] hover:shadow-md-md cursor-pointer animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {" "}
              <div className="flex items-center gap-3 mb-2">
                {" "}
                <Icon icon={insight.icon} className="text-3xl filter group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-md-on-surface-variant">
                  {" "}
                  {t(insight.titleKey)}{" "}
                </span>{" "}
              </div>{" "}
              <p className="text-3xl font-bold mb-0.5 text-md-on-surface">
                {" "}
                {insight.value}{" "}
              </p>{" "}
              <p className="text-xs text-md-on-surface-variant">
                {" "}
                {insight.description}{" "}
              </p>{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
      {secondaryInsights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {" "}
          {secondaryInsights.map((insight, i) => (
            <div
              key={insight.titleKey}
              className="group p-4 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.01] hover:shadow-md-md cursor-pointer animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {" "}
              <div className="flex items-center gap-2.5 mb-1.5">
                {" "}
                <Icon icon={insight.icon} className="text-xl filter group-hover:scale-110 transition-transform duration-300" />{" "}
                <span className="text-[11px] font-semibold uppercase tracking-wider text-md-on-surface-variant">
                  {" "}
                  {t(insight.titleKey)}{" "}
                </span>{" "}
              </div>{" "}
              <p className="text-xl font-bold mb-0.5 text-md-on-surface">
                {" "}
                {insight.value}{" "}
              </p>{" "}
              <p className="text-xs text-md-on-surface-variant">
                {" "}
                {insight.description}{" "}
              </p>{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default OverviewPage;
