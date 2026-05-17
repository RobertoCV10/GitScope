import React, { useState } from "react";
import useRateLimit from "../../hooks/useRateLimit";
import useRateLimitHistory from "../../hooks/useRateLimitHistory";
import { hasGitHubToken } from "../../services/rateLimitService";
import { formatNumber } from "../../utils/rateLimitUtils";
import RateLimitGauge from "./RateLimitGauge";
import RateLimitStatus from "./RateLimitStatus";
import RateLimitCountdown from "./RateLimitCountdown";
import RateLimitChart from "./RateLimitChart";
import RateLimitAlert from "./RateLimitAlert";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";

const RateLimitTracker = ({
  darkMode = true,
  position = "widget",
  _language = "es",
}) => {
  const { t } = useLanguage();
  const { rateLimitData, loading, error, refresh } = useRateLimit();
  const { chartData, hasHistory } = useRateLimitHistory(rateLimitData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  if (!rateLimitData && !loading) return null;

  const token = hasGitHubToken();
  const limit = rateLimitData?.limit || (token ? 5000 : 60);
  const remaining = rateLimitData?.remaining || 0;
  const used = rateLimitData?.used || 0;
  const remainingPercentage = rateLimitData?.remainingPercentage || 0;
  const status = rateLimitData?.status || "good";
  const requestsPerHour = rateLimitData?.requestsPerHour || 0;
  const predictedHit = rateLimitData?.predictedHit;

  const isWidget = position === "widget";
  const isFullpage = position === "fullpage";
  const isBadge = position === "badge";

  const getStrokeColor = () => {
    switch (status) {
      case "good": return "#10b981";
      case "warning": return "#f59e0b";
      case "critical": return "#f97316";
      case "danger": return "#ef4444";
      default: return "#10b981";
    }
  };

  // === BADGE MODE (compact mobile) ===
  if (isBadge) {
    if (isExpanded) {
      return (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsExpanded(false)}
            aria-hidden="true"
          />
          <div className="fixed bottom-4 right-4 z-50 w-72 max-w-[calc(100vw-2rem)] animate-scale-in origin-bottom-right">
            <div className="rounded-[24px] border border-md-outline/20 bg-md-surface-container shadow-xl backdrop-blur-sm">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setIsExpanded(false)}
              >
                <div className="flex items-center gap-3">
                  <RateLimitGauge
                    percentage={remainingPercentage}
                    status={status}
                    darkMode={darkMode}
                    size="sm"
                  />
                  <div>
                    <div className="font-bold font-display text-md-on-surface">
                      {formatNumber(remaining)} / {formatNumber(limit)}
                    </div>
                    <div className="text-xs text-md-on-surface-variant">
                      {t("rateLimitRemaining")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RateLimitStatus status={status} t={t} />
                  <button className="p-1 rounded-full rotate-180">
                    <Icon icon={I.chevronDown} className="text-md-on-surface-variant" />
                  </button>
                </div>
              </div>
              <div className="px-4 pb-4 space-y-4">
                {!token && (
                  <div className="p-3 rounded-full text-xs bg-amber-500/10 border border-amber-500/30 text-amber-500">
                    <div className="flex items-center gap-2">
                      <Icon icon={I.information} />
                      <span>{t("rateLimitNoToken")}</span>
                    </div>
                  </div>
                )}
                {showAlert && status !== "good" && (
                  <RateLimitAlert
                    remaining={remaining}
                    limit={limit}
                    t={t}
                    onDismiss={() => setShowAlert(false)}
                  />
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-full bg-md-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-md-on-surface-variant">
                      {t("rateLimitUsed")}
                    </div>
                    <div className="text-lg font-bold font-display text-md-on-surface">
                      {formatNumber(used)}
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-md-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-md-on-surface-variant">
                      {t("rateLimitPerHour")}
                    </div>
                    <div className="text-lg font-bold font-display text-md-on-surface">
                      {formatNumber(requestsPerHour)}/h
                    </div>
                  </div>
                  <div className="col-span-2 p-3 rounded-full bg-md-surface-container-low">
                    <RateLimitCountdown resetTimestamp={rateLimitData?.reset || 0} />
                  </div>
                </div>
                {predictedHit && status !== "danger" && (
                  <div className="p-3 rounded-full text-xs bg-md-primary/10 border border-md-primary/30 text-md-primary">
                    <div className="flex items-center gap-2">
                      <Icon icon={I.crystalBall} />
                      <span>
                        {t("rateLimitPredicted")}{" "}
                        {predictedHit < 60
                          ? `${predictedHit}s`
                          : `${Math.round(predictedHit / 60)}min`}{" "}
                        {t("rateLimitUntilLimit")}
                      </span>
                    </div>
                  </div>
                )}
                {hasHistory && (
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-2 text-md-on-surface-variant">
                      {t("rateLimitHistory")}
                    </div>
                    <RateLimitChart data={chartData} darkMode={darkMode} t={t} />
                  </div>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); refresh(); }}
                    disabled={loading}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Icon icon={I.refresh} className="animate-spin" />
                        {t("rateLimitRefreshing")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Icon icon={I.refresh} />
                        {t("rateLimitRefresh")}
                      </span>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="p-3 rounded-full text-xs bg-md-error/10 text-md-error">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-12 h-12 rounded-full bg-md-surface-container border border-md-outline/20 shadow-lg flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform duration-200"
        title={`${remaining} / ${limit} ${t("rateLimitRemaining")}`}
      >
        <svg width="44" height="44" className="transform -rotate-90">
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
            strokeWidth="4"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={Math.PI * 36}
            strokeDashoffset={Math.PI * 36 * (1 - remainingPercentage / 100)}
            className="transition-all duration-500 ease-out"
            style={{ filter: `drop-shadow(0 0 3px ${getStrokeColor()}60)` }}
          />
        </svg>
        <span
          className="absolute text-[9px] font-bold font-display"
          style={{ color: getStrokeColor() }}
        >
          {remaining}
        </span>
      </button>
    );
  }

  // === WIDGET / SIDEBAR / FULLPAGE MODES ===
  const getContainerClasses = () => {
    const base =
      "rounded-[24px] border transition-all duration-300 backdrop-blur-sm border-md-outline/20 bg-md-surface-container shadow-md-sm";
    switch (position) {
      case "sidebar":
        return base;
      case "fullpage":
        return `${base} p-6`;
      case "widget":
      default:
        return base;
    }
  };

  return (
    <div className={getContainerClasses()}>
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${isWidget ? "hover:bg-opacity-80 transition-colors" : ""}`}
        onClick={() => isWidget && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <RateLimitGauge
            percentage={remainingPercentage}
            status={status}
            darkMode={darkMode}
            size={isWidget ? "sm" : "md"}
          />
          <div>
            <div className="font-bold font-display text-md-on-surface">
              {formatNumber(remaining)} / {formatNumber(limit)}
            </div>
            <div className="text-xs text-md-on-surface-variant">
              {t("rateLimitRemaining")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RateLimitStatus status={status} t={t} />
          {isWidget && (
            <button
              className={`p-1 rounded-full transition-transform ${isExpanded ? "rotate-180" : ""}`}
            >
              <Icon icon={I.chevronDown} className="text-md-on-surface-variant" />
            </button>
          )}
        </div>
      </div>
      {(!isWidget || isExpanded) && (
        <div className={`px-4 pb-4 space-y-4 ${isFullpage ? "px-6 pb-6" : ""}`}>
          {!token && (
            <div className="p-3 rounded-full text-xs bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <div className="flex items-center gap-2">
                <Icon icon={I.information} />
                <span>{t("rateLimitNoToken")}</span>
              </div>
            </div>
          )}
          {showAlert && status !== "good" && (
            <RateLimitAlert
              remaining={remaining}
              limit={limit}
              t={t}
              onDismiss={() => setShowAlert(false)}
            />
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-full bg-md-surface-container-low">
              <div className="text-xs uppercase tracking-wider text-md-on-surface-variant">
                {t("rateLimitUsed")}
              </div>
              <div className="text-lg font-bold font-display text-md-on-surface">
                {formatNumber(used)}
              </div>
            </div>
            <div className="p-3 rounded-full bg-md-surface-container-low">
              <div className="text-xs uppercase tracking-wider text-md-on-surface-variant">
                {t("rateLimitPerHour")}
              </div>
              <div className="text-lg font-bold font-display text-md-on-surface">
                {formatNumber(requestsPerHour)}/h
              </div>
            </div>
            <div className="col-span-2 p-3 rounded-full bg-md-surface-container-low">
              <RateLimitCountdown resetTimestamp={rateLimitData?.reset || 0} />
            </div>
          </div>
          {predictedHit && status !== "danger" && (
            <div className="p-3 rounded-full text-xs bg-md-primary/10 border border-md-primary/30 text-md-primary">
              <div className="flex items-center gap-2">
                <Icon icon={I.crystalBall} />
                <span>
                  {t("rateLimitPredicted")}{" "}
                  {predictedHit < 60
                    ? `${predictedHit}s`
                    : `${Math.round(predictedHit / 60)}min`}{" "}
                  {t("rateLimitUntilLimit")}
                </span>
              </div>
            </div>
          )}
          {hasHistory && (
            <div>
              <div className="text-xs uppercase tracking-wider mb-2 text-md-on-surface-variant">
                {t("rateLimitHistory")}
              </div>
              <RateLimitChart data={chartData} darkMode={darkMode} t={t} />
            </div>
          )}
          <div className="flex justify-center">
            <button
              onClick={refresh}
              disabled={loading}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon icon={I.refresh} className="animate-spin" />
                  {t("rateLimitRefreshing")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icon icon={I.refresh} />
                  {t("rateLimitRefresh")}
                </span>
              )}
            </button>
          </div>
          {error && (
            <div className="p-3 rounded-full text-xs bg-md-error/10 text-md-error">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RateLimitTracker;
