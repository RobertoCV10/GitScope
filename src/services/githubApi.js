import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const MAX_USERNAME_LENGTH = 39;
const USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

const CACHE_DURATION = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES_PER_PREFIX = 50;

const apiClient = axios.create({
  baseURL: BASE_URL,
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
    const prefix = key.split('_')[0] + '_';
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(prefix)) {
        const cached = JSON.parse(localStorage.getItem(k) || '{}');
        if (Date.now() - cached.timestamp > CACHE_DURATION) {
          keysToRemove.push(k);
        }
      }
    }
    while (keysToRemove.length > MAX_CACHE_ENTRIES_PER_PREFIX) {
      const removed = keysToRemove.shift();
      localStorage.removeItem(removed);
    }
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    /* silently fail */
  }
};





export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username is required' };
  }
  const trimmed = username.trim();
  if (trimmed.length > MAX_USERNAME_LENGTH) {
    return { valid: false, error: `Username must be ${MAX_USERNAME_LENGTH} characters or less` };
  }
  if (!USERNAME_REGEX.test(trimmed)) {
    return { valid: false, error: 'Invalid GitHub username format' };
  }
  return { valid: true, username: trimmed.toLowerCase() };
};

export const getUser = async (username) => {
  const validation = validateUsername(username);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const cacheKey = `user_${validation.username}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await apiClient.get(`/users/${validation.username}`);
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    if (error.response?.status === 403) {
      throw new Error('Rate limit exceeded. Try again later.');
    }
    throw new Error(error.response?.data?.message || 'Error fetching user');
  }
};

export const getAllUserRepos = async (username) => {
  const validation = validateUsername(username);
  if (!validation.valid) return [];

  const cacheKey = `repos_${validation.username}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await apiClient.get(`/users/${validation.username}/repos`, {
        params: {
          per_page: 100,
          page: page,
          sort: 'updated',
          direction: 'desc'
        }
      });

      allRepos = allRepos.concat(response.data);
      hasMore = response.data.length === 100;
      page++;
    }

    setCache(cacheKey, allRepos);
    return allRepos;
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
};

export const getUserEvents = async (username) => {
  const validation = validateUsername(username);
  if (!validation.valid) return [];

  const cacheKey = `events_${validation.username}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await apiClient.get(`/users/${validation.username}/events`, {
      params: { per_page: 100 }
    });
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

