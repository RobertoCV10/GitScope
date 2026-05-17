import { useState, useCallback } from 'react';
import { getUser, getAllUserRepos, getUserEvents } from '../services/githubApi';
import {
  calculateMetrics,
  compareMetrics,
  calculateHead2HeadScore,
  findCommonLanguages,
  findUniqueLanguages,
  generateRadarData,
  generateComparisonInsights
} from '../utils/comparisonUtils';

const useVsComparison = () => {
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser1, setLoadingUser1] = useState(false);
  const [loadingUser2, setLoadingUser2] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async (username, userNum) => {
    try {
      const [user, repos, events] = await Promise.all([
        getUser(username),
        getAllUserRepos(username),
        getUserEvents(username).catch(() => [])
      ]);
      return { user, repos, events };
    } catch (err) {
      const errorMsg = err.message || (userNum === 1 ? 'User 1' : 'User 2') + ' not found';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const compare = useCallback(async (username1, username2) => {
    setError(null);
    setLoading(true);
    setLoadingUser1(true);
    setLoadingUser2(true);
    try {
      const [data1, data2] = await Promise.all([
        fetchUserData(username1, 1),
        fetchUserData(username2, 2)
      ]);
      setUser1(data1.user);
      setUser2(data2.user);
      const metrics1 = calculateMetrics(data1.user, data1.repos, data1.events);
      const metrics2 = calculateMetrics(data2.user, data2.repos, data2.events);
      const comparison = compareMetrics(metrics1, metrics2);
      const scores = calculateHead2HeadScore(comparison);
      const commonLanguages = findCommonLanguages(data1.repos, data2.repos);
      const uniqueLangs1 = findUniqueLanguages(data1.repos, data2.repos);
      const uniqueLangs2 = findUniqueLanguages(data2.repos, data1.repos);
      const radarData = generateRadarData(metrics1, metrics2);
      const insights = generateComparisonInsights(data1.user, data2.user, comparison, metrics1, metrics2);
      return {
        user1: data1.user,
        user2: data2.user,
        metrics1,
        metrics2,
        comparison,
        scores,
        commonLanguages,
        uniqueLangs1,
        uniqueLangs2,
        radarData,
        insights
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      setLoadingUser1(false);
      setLoadingUser2(false);
    }
  }, [fetchUserData]);

  const clearComparison = useCallback(() => {
    setUser1(null);
    setUser2(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    user1,
    user2,
    loading,
    loadingUser1,
    loadingUser2,
    error,
    compare,
    clearComparison
  };
};

export default useVsComparison;
