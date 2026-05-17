export const toISODate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
};

export const generateFilename = (prefix, extension) => {
  const date = new Date().toISOString().split('T')[0];
  return `${prefix}-${date}.${extension}`;
};

/**
 * Format a number with locale-aware formatting
 * @param {number|string} num - Number to format
 * @param {string} language - Language code ('en' or 'es')
 * @returns {string} - Formatted number
 */
export const formatNumber = (num, language = 'en') => {
  if (num === null || num === undefined) return '0';
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return '0';
  try {
    return n.toLocaleString(language === 'en' ? 'en-US' : 'es-ES');
  } catch {
    return n.toString();
  }
};

/**
 * Format file size in KB/MB
 * @param {number} sizeKB - Size in kilobytes
 * @returns {string} - Formatted size string
 */
export const formatFileSize = (sizeKB) => {
  if (sizeKB < 1024) return `${sizeKB.toFixed(1)} KB`;
  return `${(sizeKB / 1024).toFixed(1)} MB`;
};

/**
 * Format date for export display
 * @param {string} dateStr - ISO date string
 * @param {string} language - Language code
 * @returns {string} - Formatted date
 */
export const formatDateForExport = (dateStr, language = 'en') => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '-';
  }
};
