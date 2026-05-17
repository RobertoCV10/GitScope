import Papa from 'papaparse';

export const exportToCSV = (data) => {
  return new Promise((resolve, reject) => {
    try {
      if (!data?.repos?.length) {
        reject(new Error('No repository data to export'));
        return;
      }

      const reposData = data.repos.map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || '',
        language: repo.language || '',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        open_issues: repo.open_issues_count || 0,
        watchers: repo.watchers_count || 0,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        url: repo.html_url
      }));

      if (data.user) {
        const userData = [{
          section: 'USER INFO',
          login: data.user.login,
          name: data.user.name || '',
          followers: data.user.followers || 0,
          following: data.user.following || 0,
          repos: data.user.public_repos || 0,
          created_at: data.user.created_at
        }];
        const csv = Papa.unparse(userData);
        const csvRepos = Papa.unparse(reposData);
        const fullCsv = csv + '\n\nREPOSITORIES\n' + csvRepos;
        downloadBlob(fullCsv, `${data.user.login}-github-data.csv`, 'text/csv;charset=utf-8;');
      } else {
        const csv = Papa.unparse(reposData);
        downloadBlob(csv, 'github-repos.csv', 'text/csv;charset=utf-8;');
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const downloadBlob = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
