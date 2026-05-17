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
  Clojure: '#db5855'
};

const getLanguageColor = (language) => {
  return LANGUAGE_COLORS[language] || '#8b949e';
};

export const calculateLanguages = (repos) => {
  const languageStats = {};
  repos.forEach(repo => {
    if (repo.language) {
      if (!languageStats[repo.language]) {
        languageStats[repo.language] = {
          name: repo.language,
          color: getLanguageColor(repo.language),
          count: 0,
          stars: 0
        };
      }
      languageStats[repo.language].count += 1;
      languageStats[repo.language].stars += repo.stargazers_count || 0;
    }
  });
  return Object.values(languageStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

export const calculateTopRepos = (repos, limit = 5) => {
  return [...repos]
    .filter(repo => repo.stargazers_count > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit)
    .map(repo => ({
      name: repo.name.length > 20 ? repo.name.substring(0, 17) + '...' : repo.name,
      fullName: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url
    }));
};

export const calculateActivityTimeline = (repos, language = 'es') => {
  const timeline = {};
  repos.forEach(repo => {
    if (repo.created_at) {
      const date = new Date(repo.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      timeline[key] = (timeline[key] || 0) + 1;
    }
  });
  const result = [];
  const now = new Date();
  const locale = language === 'en' ? 'en-US' : 'es-ES';
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleString(locale, { month: 'short' });
    result.push({
      month: monthName,
      year: date.getFullYear(),
      count: timeline[key] || 0
    });
  }
  return result;
};

export const calculateWeekdayActivity = (events) => {
  const weekdays = Array(7).fill(0);
  events.forEach(event => {
    if (event.created_at) {
      const day = new Date(event.created_at).getDay();
      weekdays[day]++;
    }
  });
  return weekdays.map((count, index) => ({ day: index, count }));
};

export const generateInsights = (repos = [], events = [], language, languages = []) => {
  const insights = [];
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const topRepo = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
  const mainLanguage = languages[0]?.name || '—';
  const totalCommits = events.filter(e => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);
  const lastEvent = [...events].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
  const reposThisYear = repos.filter(r => {
    const year = new Date(r.created_at).getFullYear();
    return year === new Date().getFullYear();
  }).length;

  if (totalStars > 0) insights.push({
    titleKey: 'totalStars', icon: 'mdi:star', value: totalStars.toLocaleString(),
    description: `${repos.length} repos`
  });
  if (totalForks > 0) insights.push({
    titleKey: 'totalForks', icon: 'mdi:source-fork', value: totalForks.toLocaleString(),
    description: `${repos.length} repos`
  });
  if (topRepo) insights.push({
    titleKey: 'topRepo', icon: 'mdi:trophy', value: topRepo.name.length > 15 ? topRepo.name.substring(0, 12) + '...' : topRepo.name,
    description: `${topRepo.stargazers_count} stars`
  });
  if (mainLanguage !== '—') insights.push({
    titleKey: 'mainLanguage', icon: 'mdi:code-tags', value: mainLanguage,
    description: `${languages[0]?.count || 0} repos`
  });
  if (totalCommits > 0) insights.push({
    titleKey: 'recentCommits', icon: 'mdi:hammer-wrench', value: totalCommits.toLocaleString(),
    description: `${events.length} total events`
  });
  if (lastEvent) insights.push({
    titleKey: 'lastActivity', icon: 'mdi:calendar-month', value: new Date(lastEvent.created_at).toLocaleDateString(),
    description: lastEvent.repo?.name || ''
  });
  if (reposThisYear > 0) insights.push({
    titleKey: 'reposThisYear', icon: 'mdi:rocket-launch', value: reposThisYear.toString(),
    description: `${new Date().getFullYear()}`
  });
  return insights;
};
