import { useMemo } from 'react';
import {
  calculateHeatmapData,
  getMaxCount,
  getTotalCommits,
  getPeakActivity,
  getMostActiveDay,
  getMostActiveHour
} from '../utils/heatmapUtils';

const countActiveCells = (matrix) => {
  let count = 0;
  matrix.forEach(row => {
    row.forEach(val => {
      if (val > 0) count++;
    });
  });
  return count;
};

const useContributionsHeatmap = (events = []) => {
  const safeEvents = Array.isArray(events) ? events : [];

  const matrix = useMemo(() => {
    return calculateHeatmapData(safeEvents);
  }, [safeEvents]);

  const stats = useMemo(() => {
    const maxCount = getMaxCount(matrix);
    const totalCommits = getTotalCommits(matrix);
    const peakActivity = getPeakActivity(matrix);
    const mostActiveDay = getMostActiveDay(matrix);
    const mostActiveHour = getMostActiveHour(matrix);
    return {
      maxCount,
      totalCommits,
      peakActivity,
      mostActiveDay,
      mostActiveHour,
      averagePerCell: maxCount > 0 ? Math.round((totalCommits / countActiveCells(matrix)) * 10) / 10 : 0
    };
  }, [matrix]);

  return {
    matrix,
    stats,
    hasData: stats.totalCommits > 0,
    getCellCount: (day, hour) => {
      if (day < 0 || day > 6 || hour < 0 || hour > 23) return 0;
      return matrix[day]?.[hour] || 0;
    }
  };
};

export default useContributionsHeatmap;
