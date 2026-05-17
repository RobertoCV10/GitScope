import { useState, useEffect, useCallback, useRef } from "react";
import { fetchRateLimit } from "../services/rateLimitService";
import {
  getStatusLevel,
  getSecondsUntilReset,
  calculateUsagePercentage,
  calculateRemainingPercentage,
  predictLimitHit,
  calculateRequestsPerHour,
} from "../utils/rateLimitUtils";

const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;

const useRateLimit = () => {
  const [rateLimitData, setRateLimitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [secondsUntilReset, setSecondsUntilReset] = useState(0);
  const intervalRef = useRef(null);
  const countdownRef = useRef(null);

  const doFetch = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      const data = await fetchRateLimit();
      setRateLimitData(data);
      setLastUpdated(new Date());
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch rate limit');
      return null;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    return doFetch(true);
  }, [doFetch]);

  useEffect(() => {
    doFetch(true);
    intervalRef.current = setInterval(() => {
      doFetch(false);
    }, AUTO_REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [doFetch]);

  useEffect(() => {
    if (!rateLimitData?.reset) return;
    const updateCountdown = () => {
      const seconds = getSecondsUntilReset(rateLimitData.reset);
      setSecondsUntilReset(seconds);
      if (seconds === 0) {
        doFetch(true);
      }
    };
    updateCountdown();
    countdownRef.current = setInterval(updateCountdown, 1000);
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [rateLimitData?.reset, doFetch]);

  const status = rateLimitData ? getStatusLevel(rateLimitData.remaining, rateLimitData.limit) : 'good';
  const remainingPercentage = rateLimitData
    ? calculateRemainingPercentage(rateLimitData.remaining, rateLimitData.limit)
    : 0;
  const usagePercentage = rateLimitData
    ? calculateUsagePercentage(rateLimitData.used, rateLimitData.limit)
    : 0;
  const predictedHit = rateLimitData
    ? predictLimitHit(rateLimitData.used, rateLimitData.remaining, rateLimitData.reset)
    : null;
  const requestsPerHour = rateLimitData
    ? calculateRequestsPerHour(rateLimitData.used, rateLimitData.reset)
    : 0;

  return {
    rateLimitData: rateLimitData ? {
      ...rateLimitData,
      status,
      remainingPercentage,
      usagePercentage,
      predictedHit,
      requestsPerHour
    } : null,
    loading,
    error,
    refresh,
    lastUpdated,
    secondsUntilReset
  };
};

export default useRateLimit;
