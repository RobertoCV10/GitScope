import React, { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const ExportProgress = ({ isExporting, progress, format, onComplete }) => {
  const { t } = useLanguage();
  const [showComplete, setShowComplete] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);
  useEffect(() => {
    if (isExporting) {
      setLocalProgress(0);
      setShowComplete(false);
    }
  }, [isExporting]);
  useEffect(() => {
    if (isExporting && progress > 0) {
      const timer = setTimeout(() => {
        setLocalProgress((prev) => {
          if (prev >= 100) return 100;
          const diff = progress - prev;
          return prev + Math.max(diff * 0.3, 1);
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isExporting, progress]);
  useEffect(() => {
    if (!isExporting && localProgress > 0) {
      setShowComplete(true);
      const timer = setTimeout(() => {
        setShowComplete(false);
        setLocalProgress(0);
        if (onComplete) onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isExporting, localProgress, onComplete]);
  if (!isExporting && !showComplete) return null;
  const formatLabels = {
    csv: t("exportingCsv") || "Exporting CSV...",
    json: t("exportingJson") || "Exporting JSON...",
    pdf: t("exportingPdf") || "Generating PDF...",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      {" "}
      <div className="relative p-8 rounded-[24px] shadow-md-xl animate-scale-in bg-md-surface-container">
        {" "}
        {showComplete ? (
          <div className="flex flex-col items-center">
            {" "}
            <div className="w-20 h-20 mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              {" "}
              <Icon icon={I.check} className="text-4xl animate-bounce text-emerald-500" />{" "}
            </div>{" "}
            <p className="text-lg font-semibold font-display text-md-on-surface">
              {" "}
              {t("exportComplete") || "Export complete!"}{" "}
            </p>{" "}
          </div>
        ) : (
          <>
            {" "}
            <div className="relative w-24 h-24 mb-6">
              {" "}
              <svg className="w-full h-full transform -rotate-90">
                {" "}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="var(--md-surface-container-low)"
                  strokeWidth="3"
                />{" "}
              </svg>{" "}
              <svg className="w-full h-full absolute top-0 left-0 transform -rotate-90">
                {" "}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="var(--md-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${localProgress * 0.628}, 100`}
                  className="transition-all duration-300"
                />{" "}
              </svg>{" "}
              <div className="absolute inset-0 flex items-center justify-center">
                {" "}
                <span className="text-2xl">
                  {" "}
                  <Icon icon={format === "csv" ? I.chartBar : format === "json" ? I.link : I.fileDocument} className="text-2xl" />{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="text-center">
              {" "}
              <p className="text-lg font-semibold font-display mb-2 text-md-on-surface">
                {" "}
                {formatLabels[format] || formatLabels.csv}{" "}
              </p>{" "}
              <div className="w-48 h-2 rounded-full overflow-hidden bg-md-surface-container-low">
                {" "}
                <div
                  className="h-full transition-all duration-300 rounded-full bg-md-primary"
                  style={{ width: `${localProgress}%` }}
                />{" "}
              </div>{" "}
              <p className="mt-2 text-sm text-md-on-surface-variant">
                {" "}
                {Math.round(localProgress)}%{" "}
              </p>{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default ExportProgress;

