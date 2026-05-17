import React, { useState, useEffect } from "react";
import {
  formatTimeRemaining,
  getSecondsUntilReset,
} from "../../utils/rateLimitUtils";
import { useLanguage } from "../../hooks/useLanguage";
const RateLimitCountdown = ({ resetTimestamp }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(() =>
    getSecondsUntilReset(resetTimestamp),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = getSecondsUntilReset(resetTimestamp);
      setTimeLeft(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [resetTimestamp]);
  const isUrgent = timeLeft < 60;
  const isWarning = timeLeft < 300;
  return (
    <div className={`text-center ${isUrgent ? "animate-pulse" : ""}`}>
      {" "}
      <div className="text-xs uppercase tracking-wider mb-1 text-md-on-surface-variant">
        {" "}
        {t("rateLimitResetIn")}{" "}
      </div>{" "}
      <div
        className={`text-2xl font-mono font-bold ${isUrgent ? "text-md-error" : isWarning ? "text-amber-500" : "text-md-on-surface"}`}
      >
        {" "}
        {formatTimeRemaining(timeLeft)}{" "}
      </div>{" "}
      {isUrgent && (
        <div className="text-xs mt-1 text-md-error">{t("rateLimitResetImminent")}</div>
      )}{" "}
    </div>
  );
};
export default RateLimitCountdown;

