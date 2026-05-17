import { useState, useEffect, useRef, useCallback } from "react";

const HISTORY_KEY = "rate_limit_history";
const MAX_HISTORY_POINTS = 288;
const SAMPLE_INTERVAL = 5 * 60 * 1000;

const loadHistory = () => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const history = JSON.parse(stored);
      const cutoff = Date.now() - (24 * 60 * 60 * 1000);
      return history.filter(point => point.timestamp > cutoff);
    }
  } catch {
    /* ignore */
  }
  return [];
};

const saveHistory = (history) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* ignore */
  }
};

const useRateLimitHistory = (rateLimitData) => {
  const [history, setHistory] = useState(() => loadHistory());
  const [chartData, setChartData] = useState([]);
  const lastSampleTime = useRef(0);

  const addHistoryPoint = useCallback(() => {
    if (!rateLimitData) return;
    const now = Date.now();
    if (now - lastSampleTime.current < SAMPLE_INTERVAL) return;
    lastSampleTime.current = now;
    const newPoint = {
      timestamp: now,
      remaining: rateLimitData.remaining,
      limit: rateLimitData.limit,
      used: rateLimitData.used,
      remainingPercentage: rateLimitData.remainingPercentage,
      isAuthenticated: rateLimitData.isAuthenticated
    };
    setHistory(prevHistory => {
      const updated = [...prevHistory, newPoint];
      const cutoff = now - (24 * 60 * 60 * 1000);
      const filtered = updated.filter(point => point.timestamp > cutoff);
      const limited = filtered.slice(-MAX_HISTORY_POINTS);
      saveHistory(limited);
      return limited;
    });
  }, [rateLimitData]);

  useEffect(() => {
    addHistoryPoint();
  }, [addHistoryPoint]);

  useEffect(() => {
    if (history.length === 0) {
      setChartData([]);
      return;
    }
    const grouped = {};
    history.forEach(point => {
      const date = new Date(point.timestamp);
      const hourKey = `${date.getHours().toString().padStart(2, '0')}:00`;
      if (!grouped[hourKey]) {
        grouped[hourKey] = {
          time: hourKey,
          remaining: point.remaining,
          limit: point.limit,
          used: point.used,
          remainingPercentage: point.remainingPercentage,
          count: 1
        };
      } else {
        grouped[hourKey].remaining = Math.round(
          (grouped[hourKey].remaining * grouped[hourKey].count + point.remaining) /
          (grouped[hourKey].count + 1)
        );
        grouped[hourKey].used = Math.round(
          (grouped[hourKey].used * grouped[hourKey].count + point.used) /
          (grouped[hourKey].count + 1)
        );
        grouped[hourKey].remainingPercentage = Math.round(
          (grouped[hourKey].remainingPercentage * grouped[hourKey].count + point.remainingPercentage) /
          (grouped[hourKey].count + 1)
        );
        grouped[hourKey].count++;
      }
    });
    const data = Object.values(grouped);
    setChartData(data);
  }, [history]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
    setChartData([]);
  }, []);

  return {
    history,
    chartData,
    clearHistory,
    hasHistory: history.length > 0
  };
};

export default useRateLimitHistory;
