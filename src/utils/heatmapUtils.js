/**
 * Utility functions for calculating GitHub contributions heatmap data
 * Groups commit events by day of week and hour of day
 */

/**
 * Groups commits by day of week (0=Sunday, 6=Saturday) and hour (0-23)
 * @param {Array} events - Array of GitHub event objects
 * @returns {number[][]} 7x24 matrix of commit counts
 */
export const calculateHeatmapData = (events = []) => {
  const matrix = Array(7).fill(null).map(() => Array(24).fill(0));
  if (!events || !Array.isArray(events) || events.length === 0) {
    return matrix;
  }
  events.forEach(event => {
    const dateStr = event.created_at;
    if (!dateStr) return;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return;
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
    if (event.type === 'PushEvent') {
      const commitCount = event.payload?.commits?.length || 0;
      matrix[dayOfWeek][hour] += commitCount;
    } else {
      matrix[dayOfWeek][hour] += 1;
    }
  });
  return matrix;
};

/**
 * Gets the maximum commit count in the heatmap
 * @param {number[][]} matrix - 7x24 matrix of commit counts
 * @returns {number} Maximum count
 */
export const getMaxCount = (matrix) => {
  let max = 0;
  matrix.forEach(row => {
    row.forEach(count => {
      if (count > max) max = count;
    });
  });
  return max;
};

/**
 * Gets the total number of commits in the heatmap
 * @param {number[][]} matrix - 7x24 matrix of commit counts
 * @returns {number} Total commits
 */
export const getTotalCommits = (matrix) => {
  let total = 0;
  matrix.forEach(row => {
    row.forEach(count => {
      total += count;
    });
  });
  return total;
};

/**
 * Gets the peak activity time (most commits)
 * @param {number[][]} matrix - 7x24 matrix of commit counts
 * @returns {{ day: number, hour: number, count: number }} Peak time info
 */
export const getPeakActivity = (matrix) => {
  let peak = { day: 0, hour: 0, count: 0 };
  matrix.forEach((row, dayIndex) => {
    row.forEach((count, hourIndex) => {
      if (count > peak.count) {
        peak = { day: dayIndex, hour: hourIndex, count };
      }
    });
  });
  return peak;
};

/**
 * Gets the most active day of the week
 * @param {number[][]} matrix - 7x24 matrix of commit counts
 * @returns {{ day: number, count: number }} Most active day
 */
export const getMostActiveDay = (matrix) => {
  const dayTotals = matrix.map((row, index) => ({
    day: index,
    count: row.reduce((sum, val) => sum + val, 0)
  }));
  return dayTotals.reduce((max, current) =>
    current.count > max.count ? current : max
  , { day: 0, count: 0 });
};

/**
 * Gets the most active hour of the day
 * @param {number[][]} matrix - 7x24 matrix of commit counts
 * @returns {{ hour: number, count: number }} Most active hour
 */
export const getMostActiveHour = (matrix) => {
  const hourTotals = Array(24).fill(0);
  matrix.forEach(row => {
    row.forEach((count, hour) => {
      hourTotals[hour] += count;
    });
  });
  const maxHour = hourTotals.indexOf(Math.max(...hourTotals));
  return { hour: maxHour, count: hourTotals[maxHour] };
};

/**
 * Calculates a normalized intensity value (0-1) for coloring
 * @param {number} count - Number of commits
 * @param {number} maxCount - Maximum commit count
 * @returns {number} Normalized intensity (0-1)
 */
export const getNormalizedIntensity = (count, maxCount) => {
  if (maxCount === 0) return 0;
  return count / maxCount;
};

/**
 * Formats hour for display (12-hour format)
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {string} Formatted hour string
 */
export const formatHour = (hour) => {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
};

/**
 * Gets day abbreviation by index
 * @param {number} index - Day index (0=Sunday)
 * @param {string} lang - Language code ('en' or 'es')
 * @returns {string} Day abbreviation
 */
export const getDayAbbreviation = (index, lang = 'es') => {
  const days = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };
  return days[lang]?.[index] || days.es[index];
};
