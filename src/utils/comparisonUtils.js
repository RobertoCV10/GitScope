export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const calculateAvgStars = (repos) => {
  if (!repos?.length) return 0;
  const total = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  return Math.round(total / repos.length);
};

export const countUniqueLanguages = (repos) => {
  const languages = new Set();
  repos?.forEach(repo => {
    if (repo.language) languages.add(repo.language);
  });
  return languages.size;
};

export const calculateDaysSinceCreation = (createdAt) => {
  if (!createdAt) return 0;
  const created = new Date(createdAt);
  const now = new Date();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
};

export const getLanguageDistribution = (repos) => {
  const langCount = {};
  repos?.forEach(repo => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });
  return langCount;
};

export const calculateMetrics = (user, repos, events = []) => {
  if (!user) return null;
  return {
    totalStars: repos?.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) || 0,
    totalForks: repos?.reduce((sum, r) => sum + (r.forks_count || 0), 0) || 0,
    followers: user.followers || 0,
    following: user.following || 0,
    publicRepos: user.public_repos || 0,
    avgStarsPerRepo: calculateAvgStars(repos),
    uniqueLanguages: countUniqueLanguages(repos),
    accountAgeDays: calculateDaysSinceCreation(user.created_at),
    totalEvents: events?.length || 0,
    languageDistribution: getLanguageDistribution(repos),
    topLanguage: getTopLanguage(repos),
    hasTopics: repos?.some(r => r.topics?.length > 0) || false,
    topicsCount: repos?.reduce((sum, r) => sum + (r.topics?.length || 0), 0) || 0
  };
};

const getTopLanguage = (repos) => {
  const dist = getLanguageDistribution(repos);
  if (Object.keys(dist).length === 0) return null;
  return Object.entries(dist).sort((a, b) => b[1] - a[1])[0][0];
};

export const compareMetrics = (metrics1, metrics2) => {
  const comparisons = [
    { key: 'followers', label: 'followers', higher: true },
    { key: 'totalStars', label: 'totalStars', higher: true },
    { key: 'totalForks', label: 'totalForks', higher: true },
    { key: 'publicRepos', label: 'publicRepos', higher: true },
    { key: 'avgStarsPerRepo', label: 'avgStarsPerRepo', higher: true },
    { key: 'uniqueLanguages', label: 'uniqueLanguages', higher: true },
    { key: 'accountAgeDays', label: 'accountAgeDays', higher: true },
    { key: 'totalEvents', label: 'totalEvents', higher: true }
  ];
  const results = comparisons.map(comp => {
    const val1 = metrics1[comp.key];
    const val2 = metrics2[comp.key];
    let winner = 'tie';
    if (val1 > val2) winner = 'user1';
    if (val2 > val1) winner = 'user2';
    return {
      key: comp.key,
      label: comp.label,
      user1Value: val1,
      user2Value: val2,
      winner
    };
  });
  return results;
};

export const calculateHead2HeadScore = (comparison) => {
  const wins = comparison.filter(c => c.winner !== 'tie').length;
  const user1Wins = comparison.filter(c => c.winner === 'user1').length;
  const user2Wins = comparison.filter(c => c.winner === 'user2').length;
  const totalDecisive = user1Wins + user2Wins;
  return {
    user1Score: totalDecisive > 0 ? Math.round((user1Wins / totalDecisive) * 100) : 50,
    user2Score: totalDecisive > 0 ? Math.round((user2Wins / totalDecisive) * 100) : 50,
    user1Wins,
    user2Wins,
    ties: wins - totalDecisive
  };
};

export const findCommonLanguages = (repos1, repos2) => {
  const langs1 = new Set();
  const langs2 = new Set();
  repos1?.forEach(r => { if (r.language) langs1.add(r.language); });
  repos2?.forEach(r => { if (r.language) langs2.add(r.language); });
  return [...langs1].filter(l => langs2.has(l));
};

export const findUniqueLanguages = (userRepos, otherRepos) => {
  const userLangs = new Set();
  const otherLangs = new Set();
  userRepos?.forEach(r => { if (r.language) userLangs.add(r.language); });
  otherRepos?.forEach(r => { if (r.language) otherLangs.add(r.language); });
  return [...userLangs].filter(l => !otherLangs.has(l));
};

export const RADAR_LABELS = [
  { key: 'followers', name: 'Followers' },
  { key: 'totalStars', name: 'Stars' },
  { key: 'totalForks', name: 'Forks' },
  { key: 'publicRepos', name: 'Repos' },
  { key: 'avgStarsPerRepo', name: 'Avg Stars' },
  { key: 'uniqueLanguages', name: 'Languages' }
];

export const generateRadarData = (metrics1, metrics2, labels = RADAR_LABELS) => {
  const maxValues = {
    followers: Math.max(metrics1.followers, metrics2.followers, 1),
    totalStars: Math.max(metrics1.totalStars, metrics2.totalStars, 1),
    totalForks: Math.max(metrics1.totalForks, metrics2.totalForks, 1),
    publicRepos: Math.max(metrics1.publicRepos, metrics2.publicRepos, 1),
    avgStarsPerRepo: Math.max(metrics1.avgStarsPerRepo, metrics2.avgStarsPerRepo, 1),
    uniqueLanguages: Math.max(metrics1.uniqueLanguages, metrics2.uniqueLanguages, 1)
  };
  return labels.map(label => {
    const key = label.key;
    return {
      subject: label.name,
      user1: Math.round((metrics1[key] / maxValues[key]) * 100),
      user2: Math.round((metrics2[key] / maxValues[key]) * 100),
      fullMark: 100
    };
  });
};

export const generateComparisonInsights = (user1, user2, comparison, metrics1, metrics2) => {
  const insights = [];
  const isEnglish = document.documentElement.lang === 'en';

  if (metrics1.followers !== metrics2.followers) {
    const ratio = Math.max(metrics1.followers, metrics2.followers) / Math.min(metrics1.followers, metrics2.followers);
    const winner = metrics1.followers > metrics2.followers ? user1 : user2;
    if (ratio >= 2) {
      insights.push(isEnglish
        ? `${winner.login} is ${Math.round(ratio)}x more popular`
        : `${winner.login} es ${Math.round(ratio)}x más popular`);
    }
  }

  if (metrics1.totalStars !== metrics2.totalStars) {
    const winner = metrics1.totalStars > metrics2.totalStars ? user1 : user2;
    insights.push(isEnglish
      ? `${winner.login} has more stars across all repos`
      : `${winner.login} tiene más estrellas en todos sus repos`);
  }

  if (metrics1.accountAgeDays !== metrics2.accountAgeDays) {
    const older = metrics1.accountAgeDays > metrics2.accountAgeDays ? user1 : user2;
    insights.push(isEnglish
      ? `${older.login} has been on GitHub longer`
      : `${older.login} está en GitHub hace más tiempo`);
  }

  if (metrics1.topLanguage && metrics2.topLanguage && metrics1.topLanguage !== metrics2.topLanguage) {
    insights.push(isEnglish
      ? `${user1.login} prefers ${metrics1.topLanguage} while ${user2.login} favors ${metrics2.topLanguage}`
      : `${user1.login} prefiere ${metrics1.topLanguage} mientras que ${user2.login} favorece ${metrics2.topLanguage}`);
  }

  if (metrics1.publicRepos !== metrics2.publicRepos) {
    const winner = metrics1.publicRepos > metrics2.publicRepos ? user1 : user2;
    insights.push(isEnglish
      ? `${winner.login} is more prolific with more public repos`
      : `${winner.login} es más prolífico con más repos públicos`);
  }

  return insights;
};
