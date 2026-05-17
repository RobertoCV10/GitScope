import { useState, useEffect, useCallback } from "react";
import {
  getGlobalLanguages,
  getLanguagesByCategory,
} from "../services/languagesStatsService";
const useLanguagesStats = () => {
  const [globalLanguages, setGlobalLanguages] = useState([]);
  const [categories, setCategories] = useState({
    trending: [],
    emerging: [],
    stable: [],
    declining: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchGlobalLanguages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [languages, categoriesData] = await Promise.all([
        getGlobalLanguages(),
        getLanguagesByCategory(),
      ]);
      setGlobalLanguages(languages);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || "Error loading language statistics");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchGlobalLanguages();
  }, [fetchGlobalLanguages]);
  const refresh = useCallback(() => {
    fetchGlobalLanguages();
  }, [fetchGlobalLanguages]);
  return { globalLanguages, categories, loading, error, refresh };
};
export default useLanguagesStats;
