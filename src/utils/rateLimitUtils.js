export const STATUS_THRESHOLDS = {
  GOOD: 0.5,
  WARNING: 0.25,
  CRITICAL: 0.1,
  DANGER: 0
};

export const getStatusLevel = (remaining, limit) => {
  if (limit === 0) return 'danger';
  const percentage = remaining / limit;
  if (percentage > STATUS_THRESHOLDS.GOOD) return 'good';
  if (percentage > STATUS_THRESHOLDS.WARNING) return 'warning';
  if (percentage > STATUS_THRESHOLDS.CRITICAL) return 'critical';
  return 'danger';
};

export const getSecondsUntilReset = (resetTimestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const seconds = resetTimestamp - now;
  return Math.max(0, seconds);
};

export const formatTimeRemaining = (seconds) => {
  if (seconds <= 0) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
};

export const calculateUsagePercentage = (used, limit) => {
  if (limit === 0) return 100;
  return Math.round((used / limit) * 100);
};

export const calculateRemainingPercentage = (remaining, limit) => {
  if (limit === 0) return 0;
  return Math.round((remaining / limit) * 100);
};

export const predictLimitHit = (used, remaining, resetTimestamp, periodSeconds = 3600) => {
  const timeElapsed = periodSeconds - getSecondsUntilReset(Date.now() / 1000 + periodSeconds);
  if (timeElapsed <= 0) return null;
  const usageRate = used / timeElapsed;
  if (usageRate <= 0) return null;
  const secondsUntilHit = remaining / usageRate;
  if (secondsUntilHit > 86400) return null;
  return Math.round(secondsUntilHit);
};

export const calculateRequestsPerHour = (used, resetTimestamp) => {
  const secondsUntilReset = getSecondsUntilReset(resetTimestamp);
  const hoursElapsed = 1 - (secondsUntilReset / 3600);
  const hours = Math.max(0.1, hoursElapsed);
  return Math.round(used / hours);
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const getStatusColor = (status, isDarkMode = true) => {
  const colors = {
    good: isDarkMode ? '#10b981' : '#059669',
    warning: isDarkMode ? '#f59e0b' : '#d97706',
    critical: isDarkMode ? '#f97316' : '#ea580c',
    danger: isDarkMode ? '#ef4444' : '#dc2626'
  };
  return colors[status] || colors.good;
};

export const getProgressGradient = (status) => {
  const gradients = {
    good: [
      { offset: '0%', color: '#10b981' },
      { offset: '100%', color: '#34d399' }
    ],
    warning: [
      { offset: '0%', color: '#f59e0b' },
      { offset: '100%', color: '#fbbf24' }
    ],
    critical: [
      { offset: '0%', color: '#f97316' },
      { offset: '100%', color: '#fb923c' }
    ],
    danger: [
      { offset: '0%', color: '#ef4444' },
      { offset: '100%', color: '#f87171' }
    ]
  };
  return gradients[status] || gradients.good;
};

export const shouldAutoRefresh = (resetTimestamp) => {
  const secondsUntilReset = getSecondsUntilReset(resetTimestamp);
  return secondsUntilReset <= 30;
};

export const getAlertMessage = (status, t) => {
  const messages = {
    warning: t ? t('rateLimitWarning') : 'Approaching rate limit',
    critical: t ? t('rateLimitCritical') : 'Critical: Rate limit almost reached',
    danger: t ? t('rateLimitDanger') : 'Danger: Rate limit will reset soon'
  };
  return messages[status] || null;
};
