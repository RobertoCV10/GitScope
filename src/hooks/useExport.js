import { useState, useCallback } from 'react';

const CACHE_KEY = 'export_last';

const loadState = () => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } catch {
    /* silently fail */
  }
};

const useExport = (data, language = 'en') => {
  const [exportState, setExportState] = useState({
    isExporting: false,
    progress: 0,
    currentFormat: null,
    error: null,
    lastExport: loadState()
  });

  const updateExport = useCallback((updates) => {
    setExportState(prev => ({ ...prev, ...updates }));
  }, []);

  const exportToCSV = useCallback(async () => {
    updateExport({ isExporting: true, progress: 0, currentFormat: 'csv', error: null });
    try {
      const { exportToCSV } = await import('../utils/csvExport');
      await exportToCSV(data);
      const exportInfo = { type: 'csv', size: `${data?.repos?.length || 0} repos`, timestamp: Date.now() };
      saveState(exportInfo);
      updateExport({ isExporting: false, progress: 100, lastExport: exportInfo });
    } catch (err) {
      updateExport({ isExporting: false, error: err.message });
    }
  }, [data, updateExport]);

  const exportToJSON = useCallback(async () => {
    updateExport({ isExporting: true, progress: 0, currentFormat: 'json', error: null });
    try {
      const { exportToJSON } = await import('../utils/jsonExport');
      await exportToJSON(data);
      const exportInfo = { type: 'json', size: `${Object.keys(data).length} datasets`, timestamp: Date.now() };
      saveState(exportInfo);
      updateExport({ isExporting: false, progress: 100, lastExport: exportInfo });
    } catch (err) {
      updateExport({ isExporting: false, error: err.message });
    }
  }, [data, updateExport]);

  const exportToPDF = useCallback(async () => {
    updateExport({ isExporting: true, progress: 0, currentFormat: 'pdf', error: null });
    try {
      const { exportToPDF } = await import('../utils/pdfExport');
      await exportToPDF(data, language);
      const exportInfo = { type: 'pdf', size: '~2MB', timestamp: Date.now() };
      saveState(exportInfo);
      updateExport({ isExporting: false, progress: 100, lastExport: exportInfo });
    } catch (err) {
      updateExport({ isExporting: false, error: err.message });
    }
  }, [data, language, updateExport]);

  return { exportState, exportToCSV, exportToJSON, exportToPDF };
};

export default useExport;
