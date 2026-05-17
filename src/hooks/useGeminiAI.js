import { useState, useEffect, useCallback, useRef } from "react";
import {
  analyzeGitHubProfile,
  generateJobMarketInsights,
  isGeminiConfigured,
} from "../services/geminiService";

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = 'ai_';
const MAX_CACHE_ENTRIES = 30;

const getCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCache = (key, data) => {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(CACHE_PREFIX)) {
        keys.push(k);
      }
    }
    if (keys.length >= MAX_CACHE_ENTRIES) {
      const sortedKeys = keys.sort((a, b) => {
        const ta = JSON.parse(localStorage.getItem(a) || '{}').timestamp || 0;
        const tb = JSON.parse(localStorage.getItem(b) || '{}').timestamp || 0;
        return ta - tb;
      });
      const toRemove = sortedKeys.slice(0, keys.length - MAX_CACHE_ENTRIES + 1);
      toRemove.forEach(k => localStorage.removeItem(k));
    }
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    /* silently fail */
  }
};

const getCacheKey = (username, type, language = 'en') => {
  return `${CACHE_PREFIX}${type}_${username}_${language}`;
};

const useGeminiAI = (user, repos, analytics, language = 'en') => {
  const [profileAnalysis, setProfileAnalysis] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [jobMarketInsights, setJobMarketInsights] = useState(null);
  const [jobMarketLoading, setJobMarketLoading] = useState(false);
  const [jobMarketError, setJobMarketError] = useState(null);
  const [configured, setConfigured] = useState(false);
  const fetchedRef = useRef(null);

  useEffect(() => {
    setConfigured(isGeminiConfigured());
  }, []);

  const fetchProfileAnalysis = useCallback(async () => {
    if (!user?.login) return;
    const key = getCacheKey(user.login, 'profile', language);
    const dedupKey = `profile_${user.login}_${language}`;

    if (fetchedRef.current === dedupKey && profileAnalysis) return;
    fetchedRef.current = dedupKey;

    const cached = getCache(key);
    if (cached) {
      setProfileAnalysis(cached);
      return;
    }

    setProfileLoading(true);
    setProfileError(null);
    try {
      const result = await analyzeGitHubProfile(user, repos, language);
      setProfileAnalysis(result);
      setCache(key, result);
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setProfileLoading(false);
    }
  }, [user, repos, language, profileAnalysis]);

  const fetchJobMarketInsights = useCallback(async () => {
    if (!user?.login) return;
    const key = getCacheKey(user.login, 'jobmarket', language);
    const dedupKey = `jobmarket_${user.login}_${language}`;

    if (fetchedRef.current === dedupKey && jobMarketInsights) return;
    fetchedRef.current = dedupKey;

    const cached = getCache(key);
    if (cached) {
      setJobMarketInsights(cached);
      return;
    }

    setJobMarketLoading(true);
    setJobMarketError(null);
    try {
      const result = await generateJobMarketInsights(user, repos, analytics, language);
      setJobMarketInsights(result);
      setCache(key, result);
    } catch (err) {
      setJobMarketError(err.message);
    } finally {
      setJobMarketLoading(false);
    }
  }, [user, repos, analytics, language, jobMarketInsights]);

  useEffect(() => {
    setProfileAnalysis(null);
    setJobMarketInsights(null);
    setProfileError(null);
    setJobMarketError(null);
  }, [user?.login, language]);

  useEffect(() => {
    if (!user?.login || !configured) return;
    const timer = setTimeout(() => {
      fetchProfileAnalysis();
    }, 500);
    return () => clearTimeout(timer);
  }, [user?.login, language, configured, fetchProfileAnalysis]);

  useEffect(() => {
    if (!user?.login || !configured || !profileAnalysis) return;
    const timer = setTimeout(() => {
      fetchJobMarketInsights();
    }, 500);
    return () => clearTimeout(timer);
  }, [user?.login, language, configured, profileAnalysis, fetchJobMarketInsights]);

  return {
    profileAnalysis,
    profileLoading,
    profileError,
    retryProfileAnalysis: fetchProfileAnalysis,
    jobMarketInsights,
    jobMarketLoading,
    jobMarketError,
    retryJobMarket: fetchJobMarketInsights,
    configured
  };
};

export default useGeminiAI;
