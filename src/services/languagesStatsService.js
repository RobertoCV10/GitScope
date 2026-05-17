import axios from "axios";
import { getLanguageColor, formatNumber } from "../utils/languagesStatsUtils";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 20;

const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(TOKEN && { 'Authorization': `token ${TOKEN}` })
  }
});

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
    if (localStorage.length > MAX_CACHE_ENTRIES * 2) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('langstats_')) {
          const { timestamp } = JSON.parse(localStorage.getItem(key) || '{}');
          if (Date.now() - timestamp > CACHE_DURATION) {
            keysToRemove.push(key);
          }
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    /* Silently fail */
  }
};

const GLOBAL_LANGUAGES_DATA = [
  { name: 'JavaScript', repositories: 21000000, stars: 45000000, growth30d: 0.8, growth90d: 2.5, growth365d: 12.3 },
  { name: 'Python', repositories: 18000000, stars: 42000000, growth30d: 1.2, growth90d: 3.8, growth365d: 15.7 },
  { name: 'Java', repositories: 15000000, stars: 28000000, growth30d: 0.3, growth90d: 1.1, growth365d: 5.2 },
  { name: 'TypeScript', repositories: 14000000, stars: 38000000, growth30d: 1.5, growth90d: 4.2, growth365d: 18.9 },
  { name: 'C#', repositories: 9000000, stars: 15000000, growth30d: 0.4, growth90d: 1.2, growth365d: 4.8 },
  { name: 'C++', repositories: 8000000, stars: 18000000, growth30d: 0.5, growth90d: 1.5, growth365d: 6.1 },
  { name: 'PHP', repositories: 7500000, stars: 10000000, growth30d: -0.2, growth90d: -0.5, growth365d: -2.1 },
  { name: 'Go', repositories: 6000000, stars: 22000000, growth30d: 1.1, growth90d: 3.2, growth365d: 14.5 },
  { name: 'Ruby', repositories: 5500000, stars: 12000000, growth30d: 0.1, growth90d: 0.3, growth365d: 1.2 },
  { name: 'Rust', repositories: 4000000, stars: 25000000, growth30d: 2.1, growth90d: 6.5, growth365d: 28.3 },
  { name: 'Swift', repositories: 3500000, stars: 14000000, growth30d: 0.6, growth90d: 1.8, growth365d: 7.5 },
  { name: 'Kotlin', repositories: 3000000, stars: 12000000, growth30d: 0.9, growth90d: 2.8, growth365d: 12.1 },
  { name: 'Dart', repositories: 2500000, stars: 8000000, growth30d: 1.8, growth90d: 5.2, growth365d: 22.4 },
  { name: 'Lua', repositories: 2000000, stars: 6000000, growth30d: 0.7, growth90d: 2.1, growth365d: 8.9 },
  { name: 'Shell', repositories: 1800000, stars: 5000000, growth30d: 0.2, growth90d: 0.6, growth365d: 2.5 },
  { name: 'Scala', repositories: 1200000, stars: 4000000, growth30d: 0.1, growth90d: 0.3, growth365d: 1.8 },
  { name: 'Haskell', repositories: 800000, stars: 3000000, growth30d: 0.0, growth90d: 0.1, growth365d: 0.5 },
  { name: 'Elixir', repositories: 600000, stars: 2500000, growth30d: 0.5, growth90d: 1.5, growth365d: 6.8 },
  { name: 'Clojure', repositories: 400000, stars: 1500000, growth30d: -0.1, growth90d: -0.3, growth365d: -1.2 },
  { name: 'Erlang', repositories: 300000, stars: 1000000, growth30d: -0.2, growth90d: -0.5, growth365d: -2.0 },
  { name: 'Objective-C', repositories: 2800000, stars: 8000000, growth30d: -0.3, growth90d: -0.8, growth365d: -3.5 },
  { name: 'Perl', repositories: 500000, stars: 1200000, growth30d: -0.1, growth90d: -0.3, growth365d: -1.5 },
  { name: 'R', repositories: 1500000, stars: 3500000, growth30d: 0.3, growth90d: 0.9, growth365d: 3.8 },
  { name: 'Assembly', repositories: 700000, stars: 2000000, growth30d: 0.4, growth90d: 1.1, growth365d: 4.5 }
];

const enrichLanguageData = (lang) => {
  const color = getLanguageColor(lang.name);
  return {
    ...lang,
    color,
    rank: 0,
    formattedRepos: formatNumber(lang.repositories),
    formattedStars: formatNumber(lang.stars),
    trending: lang.growth365d > 10,
    emerging: lang.growth365d > 15 && lang.repositories < 5000000,
    declining: lang.growth365d < 0
  };
};

const updateRanks = (languages) => {
  return languages
    .sort((a, b) => b.repositories - a.repositories)
    .map((lang, index) => ({ ...lang, rank: index + 1 }));
};

export const getGlobalLanguages = async (forceRefresh = false) => {
  const cacheKey = 'langstats_global';
  if (!forceRefresh) {
    const cached = getCache(cacheKey);
    if (cached) return cached;
  }

  const enriched = GLOBAL_LANGUAGES_DATA.map(enrichLanguageData);
  const withRanks = updateRanks(enriched);
  setCache(cacheKey, withRanks);
  return withRanks;
};

export const getLanguagesByCategory = async (forceRefresh = false) => {
  const cacheKey = 'langstats_categories';
  if (!forceRefresh) {
    const cached = getCache(cacheKey);
    if (cached) return cached;
  }

  const globalData = await getGlobalLanguages(forceRefresh);
  const categories = {
    trending: globalData.filter(l => l.trending).sort((a, b) => b.growth365d - a.growth365d),
    emerging: globalData.filter(l => l.emerging).sort((a, b) => b.growth30d - a.growth30d),
    stable: globalData.filter(l => !l.trending && !l.emerging && !l.declining),
    declining: globalData.filter(l => l.declining).sort((a, b) => a.growth365d - b.growth365d)
  };
  setCache(cacheKey, categories);
  return categories;
};

export const fetchLanguageSearchData = async (query) => {
  try {
    const response = await apiClient.get(`/search/repositories?q=language:${encodeURIComponent(query)}&per_page=1`);
    return {
      total_count: response.data.total_count,
      query
    };
  } catch (error) {
    console.error('Error fetching language data:', error);
    return null;
  }
};
