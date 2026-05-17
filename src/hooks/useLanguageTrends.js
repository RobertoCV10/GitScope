import { useState, useEffect, useCallback } from "react";
import {
  getTrendingLanguages,
  getLanguageGrowthData,
} from "../services/languagesStatsService";
const useLanguageTrends = (initialPeriod = "30d") => {
  const [period, setPeriod] = useState(initialPeriod);
  const [trendingLanguages, setTrendingLanguages] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchTrends = useCallback(async (selectedPeriod) => {
    setLoading(true);
    setError(null);
    try {
      const [trending, growth] = await Promise.all([
        getTrendingLanguages(selectedPeriod),
        getLanguageGrowthData(selectedPeriod),
      ]);
      setTrendingLanguages(trending);
      setGrowthData(growth);
    } catch (err) {
      setError(err.message || "Error loading language trends");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchTrends(period);
  }, [period, fetchTrends]);
  const changePeriod = useCallback(
    (newPeriod) => {
      if (newPeriod !== period) {
        setPeriod(newPeriod);
      }
    },
    [period],
  );
  const getPeriodLabel = useCallback((p) => {
    switch (p) {
      case "30d":
        return "30 Days";
      case "90d":
        return "90 Days";
      case "365d":
        return "1 Year";
      default:
        return p;
    }
  }, []);
  return {
    period,
    trendingLanguages,
    growthData,
    loading,
    error,
    changePeriod,
    getPeriodLabel,
    refresh: () => fetchTrends(period),
  };
};
export default useLanguageTrends;
