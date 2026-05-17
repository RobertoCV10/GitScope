import axios from 'axios';

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(TOKEN && { 'Authorization': `token ${TOKEN}` })
  }
});

export const hasGitHubToken = () => !!TOKEN;

export const fetchRateLimit = async () => {
  try {
    const response = await apiClient.get('/rate_limit');
    const { rate, resources } = response.data;
    const core = resources?.core || rate;
    const remaining = core.remaining;
    const limit = core.limit;
    const reset = core.reset;
    const used = limit - remaining;
    const remainingPercentage = limit > 0 ? Math.round((remaining / limit) * 100) : 0;

    let status = 'good';
    if (remainingPercentage <= 10) status = 'danger';
    else if (remainingPercentage <= 25) status = 'critical';
    else if (remainingPercentage <= 50) status = 'warning';

    return { remaining, limit, used, reset, remainingPercentage, status };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching rate limit');
  }
};
