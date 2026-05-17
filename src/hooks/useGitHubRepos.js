import { useState, useCallback, useEffect } from "react";
import { getAllUserRepos, getUserEvents } from "../services/githubApi";

const useGitHubRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async (user) => {
    if (!user?.login) return;
    setLoading(true);
    setError(null);
    try {
      const [reposData, eventsData] = await Promise.all([
        getAllUserRepos(user.login),
        getUserEvents(user.login),
      ]);
      setRepos(reposData);
      setEvents(eventsData);
    } catch (err) {
      setError(err.message);
      setRepos([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username?.login) {
      fetchRepos(username);
    }
  }, [username, fetchRepos]);

  return {
    repos,
    events,
    loading,
    error,
    refetch: () => fetchRepos(username),
  };
};

export default useGitHubRepos;
