import { useMemo } from 'react';
import {
  calculateUserPosition,
  generateComparisonData,
  generateLanguageInsights,
  getLanguageColor,
  formatNumber
} from '../utils/languagesStatsUtils';

const useUserLanguagePosition = (userLanguages = [], globalLanguages = [], language = 'es') => {
  const position = useMemo(() => {
    if (!userLanguages?.length || !globalLanguages?.length) {
      return null;
    }
    return calculateUserPosition(userLanguages, globalLanguages);
  }, [userLanguages, globalLanguages]);

  const insights = useMemo(() => {
    return generateLanguageInsights(userLanguages, globalLanguages, language);
  }, [userLanguages, globalLanguages, language]);

  const processedUserLanguages = useMemo(() => {
    if (!userLanguages?.length) return [];
    const total = userLanguages.reduce((sum, lang) => sum + lang.count, 0);
    return userLanguages.map(lang => ({
      name: lang.name,
      color: getLanguageColor(lang.name),
      count: lang.count,
      stars: lang.stars || 0,
      percentage: total > 0 ? ((lang.count / total) * 100).toFixed(1) : 0,
      formattedCount: formatNumber(lang.count),
      formattedStars: formatNumber(lang.stars || 0)
    }));
  }, [userLanguages]);

  const comparisonData = useMemo(() => {
    if (!processedUserLanguages?.length || !globalLanguages?.length) {
      return [];
    }
    return generateComparisonData(processedUserLanguages, globalLanguages);
  }, [processedUserLanguages, globalLanguages]);

  const communitySize = useMemo(() => {
    if (!userLanguages?.length) return [];
    return processedUserLanguages.map(lang => ({
      name: lang.name,
      color: lang.color,
      followers: lang.stars,
      tier: lang.stars > 10000 ? 'large' : lang.stars > 1000 ? 'medium' : 'small'
    })).sort((a, b) => b.followers - a.followers);
  }, [processedUserLanguages]);

  const growthComparison = useMemo(() => {
    if (!processedUserLanguages?.length || !globalLanguages?.length) return [];
    return processedUserLanguages.slice(0, 5).map(userLang => {
      const globalLang = globalLanguages.find(
        gl => gl.name.toLowerCase() === userLang.name.toLowerCase()
      );
      if (!globalLang) return null;
      const globalGrowth = globalLang.growth365d || 0;
      return {
        name: userLang.name,
        color: userLang.color,
        userGrowth: 0,
        globalGrowth,
        comparison: globalGrowth > 10 ? 'hot' : globalGrowth > 5 ? 'growing' : 'stable'
      };
    }).filter(Boolean);
  }, [processedUserLanguages, globalLanguages]);

  return {
    position,
    comparisonData,
    insights,
    processedUserLanguages,
    communitySize,
    growthComparison,
    hasUserData: userLanguages?.length > 0,
    hasGlobalData: globalLanguages?.length > 0
  };
};

export default useUserLanguagePosition;
