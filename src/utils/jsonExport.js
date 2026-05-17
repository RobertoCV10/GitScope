export const exportToJSON = (data) => {
  return new Promise((resolve, reject) => {
    try {
      if (!data) {
        reject(new Error('No data to export'));
        return;
      }
      const exportData = {
        exportedAt: new Date().toISOString(),
        user: data.user ? {
          login: data.user.login,
          name: data.user.name,
          bio: data.user.bio,
          avatar: data.user.avatar_url,
          followers: data.user.followers,
          following: data.user.following,
          publicRepos: data.user.public_repos,
          createdAt: data.user.created_at
        } : null,
        repos: data.repos?.map(repo => ({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at
        })) || [],
        events: data.events?.slice(0, 1000).map(event => ({
          type: event.type,
          createdAt: event.created_at,
          repo: event.repo?.name
        })) || [],
        analytics: {
          totalStars: data.analytics?.totalStars,
          totalForks: data.analytics?.totalForks,
          languages: data.analytics?.languages
        }
      };
      const json = JSON.stringify(exportData, null, 2);
      downloadJSON(json, `${data.user?.login || 'github'}-data.json`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const downloadJSON = (content, fileName) => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
