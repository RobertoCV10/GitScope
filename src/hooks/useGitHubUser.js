import { useState, useCallback } from 'react';
import { getUser } from '../services/githubApi';

const useGitHubUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async (username) => {
    if (!username?.trim()) return;
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const userData = await getUser(username);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setError(null);
    setLoading(false);
  }, []);

  return { user, loading, error, fetchUser, clearUser };
};

export default useGitHubUser;
