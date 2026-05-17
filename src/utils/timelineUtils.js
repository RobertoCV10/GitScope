export const EVENT_TYPES = {
  ACCOUNT_ANNIVERSARY: {
    id: 'account_anniversary',
    icon: 'mdi:party-popper',
    color: '#6750A4',
    gradient: 'from-md-primary to-md-tertiary',
    label: 'accountAnniversary',
    isMilestone: true
  },
  FIRST_REPO: {
    id: 'first_repo',
    icon: 'mdi:package-variant-closed',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    label: 'firstRepo',
    isMilestone: true
  },
  MILESTONE_STARS: {
    id: 'milestone_stars',
    icon: 'mdi:star',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    label: 'milestoneStars',
    isMilestone: true
  },
  MILESTONE_FOLLOWERS: {
    id: 'milestone_followers',
    icon: 'mdi:trophy',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    label: 'milestoneFollowers',
    isMilestone: true
  },
  FIRST_CONTRIBUTION: {
    id: 'first_contribution',
    icon: 'mdi:sparkles',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    label: 'firstContribution',
    isMilestone: true
  },
  TRENDING_REPO: {
    id: 'trending_repo',
    icon: 'mdi:fire',
    color: '#ef4444',
    gradient: 'from-red-500 to-pink-600',
    label: 'trendingRepo',
    isMilestone: true
  },
  POPULAR_PR: {
    id: 'popular_pr',
    icon: 'mdi:shuffle-variant',
    color: '#fca311',
    gradient: 'from-primary-500 to-primary-600',
    label: 'popularPR',
    isMilestone: false
  },
  FORK_MILESTONE: {
    id: 'fork_milestone',
    icon: 'mdi:source-fork',
    color: '#14b8a6',
    gradient: 'from-teal-500 to-cyan-600',
    label: 'forkMilestone',
    isMilestone: true
  },
  REPO_CREATED: {
    id: 'repo_created',
    icon: 'mdi:folder-open',
    color: '#64748b',
    gradient: 'from-slate-500 to-gray-600',
    label: 'repoCreated',
    isMilestone: false
  },
  ORGANIZATION_JOIN: {
    id: 'org_join',
    icon: 'mdi:office-building',
    color: '#0ea5e9',
    gradient: 'from-sky-500 to-blue-600',
    label: 'orgJoin',
    isMilestone: true
  },
  YEAR_IN_REVIEW: {
    id: 'year_review',
    icon: 'mdi:chart-bar',
    color: '#6750A4',
    gradient: 'from-primary-500 to-primary-600',
    label: 'yearReview',
    isMilestone: false
  }
};

const STAR_MILESTONES = [10, 50, 100, 500, 1000, 5000, 10000, 50000];
const FORK_MILESTONES = [10, 50, 100, 500, 1000, 5000];
const FOLLOWER_MILESTONES = [10, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 50000];

export const calculateAccountAge = (createdAt) => {
  if (!createdAt) return 0;
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears * 10) / 10;
};

export const formatDate = (dateString, language = 'es') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', options);
};

export const formatRelativeTime = (dateString, language = 'es') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  const isEnglish = language === 'en';
  if (diffDays === 0) return isEnglish ? 'Today' : 'Hoy';
  if (diffDays === 1) return isEnglish ? 'Yesterday' : 'Ayer';
  if (diffDays < 7) return isEnglish ? `${diffDays} days ago` : `hace ${diffDays} días`;
  if (diffDays < 30) return isEnglish ? `${Math.floor(diffDays / 7)} weeks ago` : `hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return isEnglish ? `${diffMonths} months ago` : `hace ${diffMonths} meses`;
  return isEnglish ? `${diffYears} years ago` : `hace ${diffYears} años`;
};

export const generateTimelineEvents = (user, repos, events, language = 'es') => {
  if (!user) return [];
  const timelineEvents = [];
  const createdAt = user.created_at;
  const accountAge = calculateAccountAge(createdAt);

  if (createdAt && accountAge >= 1) {
    const years = Math.floor(accountAge);
    for (let year = 1; year <= Math.min(years, 5); year++) {
      const anniversaryDate = new Date(createdAt);
      anniversaryDate.setFullYear(anniversaryDate.getFullYear() + year);
      timelineEvents.push({
        id: `anniversary-${year}`,
        type: EVENT_TYPES.ACCOUNT_ANNIVERSARY,
        date: anniversaryDate.toISOString(),
        year: anniversaryDate.getFullYear(),
        title: language === 'en'
          ? `${year} Year${year > 1 ? 's' : ''} on GitHub`
          : `${year} año${year > 1 ? 's' : ''} en GitHub`,
        description: language === 'en'
          ? `Joined GitHub on ${formatDate(createdAt, language)}`
          : `Se unió a GitHub el ${formatDate(createdAt, language)}`,
        metadata: { year },
        isMilestone: true,
        animationDelay: year * 100
      });
    }
  }

  if (repos?.length > 0) {
    const sortedRepos = [...repos].sort((a, b) =>
      new Date(a.created_at) - new Date(b.created_at)
    );
    const firstRepo = sortedRepos[0];
    timelineEvents.push({
      id: 'first-repo',
      type: EVENT_TYPES.FIRST_REPO,
      date: firstRepo.created_at,
      year: new Date(firstRepo.created_at).getFullYear(),
      title: firstRepo.name,
      description: language === 'en' ? 'Created first repository' : 'Creó su primer repositorio',
      metadata: { repo: firstRepo.name, stars: firstRepo.stargazers_count },
      isMilestone: true,
      animationDelay: 600
    });
  }

  if (events?.length > 0) {
    const sortedEvents = [...events].sort((a, b) =>
      new Date(a.created_at) - new Date(b.created_at)
    );
    const firstEvent = sortedEvents[0];
    timelineEvents.push({
      id: 'first-contribution',
      type: EVENT_TYPES.FIRST_CONTRIBUTION,
      date: firstEvent.created_at,
      year: new Date(firstEvent.created_at).getFullYear(),
      title: language === 'en' ? 'First Contribution' : 'Primera Contribución',
      description: language === 'en'
        ? 'Started contributing on GitHub'
        : 'Comenzó a contribuir en GitHub',
      metadata: { eventType: firstEvent.type },
      isMilestone: true,
      animationDelay: 700
    });
  }

  if (repos?.length > 1) {
    const sortedRepos = [...repos]
      .filter(r => r.stargazers_count > 10)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(0, 5);
    sortedRepos.forEach((repo, index) => {
      if (index > 0) {
        timelineEvents.push({
          id: `repo-${repo.name}`,
          type: EVENT_TYPES.REPO_CREATED,
          date: repo.created_at,
          year: new Date(repo.created_at).getFullYear(),
          title: repo.name,
          description: language === 'en' ? 'Created new repository' : 'Creó un nuevo repositorio',
          metadata: { repo: repo.name, stars: repo.stargazers_count, forks: repo.forks_count },
          isMilestone: false,
          animationDelay: 800 + (index * 50)
        });
      }
    });
  }

  if (repos?.length > 0) {
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    for (const threshold of STAR_MILESTONES) {
      if (totalStars >= threshold) {
        timelineEvents.push({
          id: `stars-${threshold}`,
          type: EVENT_TYPES.MILESTONE_STARS,
          date: user.created_at || new Date().toISOString(),
          year: new Date().getFullYear(),
          title: `${threshold} Stars`,
          description: language === 'en'
            ? `Reached ${threshold} total stars across all repositories`
            : `Alcanzó ${threshold} estrellas totales en todos los repositorios`,
          metadata: { threshold, total: totalStars },
          isMilestone: true,
          animationDelay: 2000
        });
        break;
      }
    }
  }

  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  for (const threshold of FORK_MILESTONES) {
    if (totalForks >= threshold) {
      timelineEvents.push({
        id: `forks-${threshold}`,
        type: EVENT_TYPES.FORK_MILESTONE,
        date: user.created_at || new Date().toISOString(),
        year: new Date().getFullYear(),
        title: `${threshold} Forks`,
        description: `Reached ${threshold} total forks`,
        metadata: { threshold, total: totalForks },
        isMilestone: true,
        animationDelay: 1600
      });
      break;
    }
  }

  if (repos?.length > 0) {
    const topRepo = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
    if (topRepo && topRepo.stargazers_count > 50) {
      timelineEvents.push({
        id: 'trending',
        type: EVENT_TYPES.TRENDING_REPO,
        date: topRepo.updated_at || topRepo.created_at,
        year: new Date(topRepo.updated_at || topRepo.created_at).getFullYear(),
        title: topRepo.name,
        description: language === 'en'
          ? `Trending repository with ${topRepo.stargazers_count} stars`
          : `Repositorio en tendencia con ${topRepo.stargazers_count} estrellas`,
        metadata: { repo: topRepo.name, stars: topRepo.stargazers_count },
        isMilestone: true,
        animationDelay: 1800
      });
    }
  }

  if (user?.followers >= FOLLOWER_MILESTONES[0]) {
    for (const threshold of FOLLOWER_MILESTONES) {
      if (user.followers >= threshold) {
        timelineEvents.push({
          id: `followers-${threshold}`,
          type: EVENT_TYPES.MILESTONE_FOLLOWERS,
          date: user.created_at || new Date().toISOString(),
          year: new Date().getFullYear(),
          title: `${threshold} Followers`,
          description: language === 'en'
            ? `Reached ${threshold} followers`
            : `Alcanzó ${threshold} seguidores`,
          metadata: { threshold, total: user.followers },
          isMilestone: true,
          animationDelay: 1400
        });
        break;
      }
    }
  }

  timelineEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  return timelineEvents;
};

export const groupEventsByYear = (events) => {
  if (!events?.length) return [];
  const grouped = {};
  events.forEach(event => {
    const year = event.year || new Date(event.date).getFullYear();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(event);
  });
  return Object.entries(grouped)
    .map(([year, events]) => ({ year: parseInt(year), events }))
    .sort((a, b) => b.year - a.year);
};

export const calculateTimelineStats = (events, user) => {
  if (!events?.length) {
    return { totalEvents: 0, milestones: 0, accountAge: 0 };
  }
  const milestones = events.filter(e => e.isMilestone).length;
  const accountAge = Math.floor(calculateAccountAge(user?.created_at));
  return {
    totalEvents: events.length,
    milestones,
    accountAge
  };
};
