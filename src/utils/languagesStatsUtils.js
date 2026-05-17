const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Scala: '#c22d40',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Shell: '#89e051',
  Lua: '#000080',
  R: '#198ce7',
  Dart: '#00B4AB',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Clojure: '#db5855',
  'Objective-C': '#438eff',
  Perl: '#0298c3',
  Julia: '#a270ba',
  MATLAB: '#e16737',
  'F#': '#b845fc',
  PowerShell: '#012456'
};

export const getLanguageColor = (language) => {
  return LANGUAGE_COLORS[language] || '#8b949e';
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

export const calculateRank = (value, array, ascending = false) => {
  const sorted = [...array].sort((a, b) => ascending ? a - b : b - a);
  return sorted.findIndex(item => item === value) + 1;
};

export const getTrendDirection = (growth) => {
  if (growth > 5) return 'up';
  if (growth < -5) return 'down';
  return 'stable';
};

export const calculateUserPosition = (userLanguages, globalLanguages) => {
  if (!userLanguages?.length || !globalLanguages?.length) return null;
  const userTotal = userLanguages.reduce((sum, l) => sum + l.count, 0);
  const aboveCount = globalLanguages.filter(l => l.repositories > userTotal).length;
  const rank = aboveCount + 1;
  const percentile = globalLanguages.length > 0
    ? Math.round(((globalLanguages.length - rank) / globalLanguages.length) * 100)
    : 0;
  let label = 'Beginner';
  if (percentile > 90) label = 'Elite';
  else if (percentile > 75) label = 'Advanced';
  else if (percentile > 50) label = 'Intermediate';
  else if (percentile > 25) label = 'Developing';
  return { rank, percentile, label, totalLanguages: userLanguages.length };
};

export const generateComparisonData = (processedUserLanguages, globalLanguages) => {
  if (!processedUserLanguages?.length || !globalLanguages?.length) return [];
  return processedUserLanguages.slice(0, 6).map(userLang => {
    const globalLang = globalLanguages.find(
      g => g.name.toLowerCase() === userLang.name.toLowerCase()
    );
    if (!globalLang) return null;

    const userPercentage = parseFloat(userLang.percentage);
    const globalPercentage = globalLang.repositories > 0
      ? parseFloat(((globalLang.repositories / globalLanguages.reduce((s, l) => s + l.repositories, 0)) * 100).toFixed(1))
      : 0;
    const difference = (userPercentage - globalPercentage).toFixed(1);
    const comparison = parseFloat(difference) > 1 ? 'above' : parseFloat(difference) < -1 ? 'below' : 'average';
    return {
      name: userLang.name,
      color: userLang.color,
      userPercentage,
      globalPercentage,
      difference,
      comparison
    };
  }).filter(Boolean);
};

export const generateLanguageInsights = (userLanguages, globalLanguages, language = 'es') => {
  const insights = [];
  const topUserLang = userLanguages[0]?.name;
  const topGlobalLang = globalLanguages[0]?.name;
  if (topUserLang && topGlobalLang && topUserLang === topGlobalLang) {
    insights.push({
      icon: 'mdi:chart-bar',
      title: language === 'es' ? 'Elección Popular' : 'Popular Choice',
      description: language === 'es'
        ? `${topUserLang} es también el lenguaje más popular en GitHub globalmente`
        : `${topUserLang} is also the most popular language on GitHub globally`
    });
  }
  if (userLanguages.length >= 5) {
    insights.push({
      icon: 'mdi:web',
      title: language === 'es' ? 'Desarrollador Políglota' : 'Polyglot Developer',
      description: language === 'es'
        ? `Usas ${userLanguages.length} lenguajes diferentes, mostrando gran versatilidad`
        : `You use ${userLanguages.length} different languages, showing great versatility`
    });
  }
  if (userLanguages.length <= 2 && userLanguages.length > 0) {
    insights.push({
      icon: 'mdi:target',
      title: language === 'es' ? 'Enfoque Especializado' : 'Specialized Focus',
      description: language === 'es'
        ? 'Te enfocas en pocos lenguajes, lo que sugiere especialización profunda'
        : 'You focus on few languages, suggesting deep specialization'
    });
  }
  return insights;
};

