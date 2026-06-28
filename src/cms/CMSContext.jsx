import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import storage from './storage';
import { pageDefaults } from './defaults';

const CMSContext = createContext();

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}

export function CMSProvider({ children }) {
  const [pages, setPages] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
    setPages(storage.getAllPages());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const getPublishedContent = useCallback((pageKey) => {
    return storage.getPublished(pageKey) || pageDefaults[pageKey] || null;
  }, []);

  const getDraftContent = useCallback((pageKey) => {
    return storage.getDraft(pageKey);
  }, []);

  const getEffectiveContent = useCallback((pageKey) => {
    return storage.getDraft(pageKey) || storage.getPublished(pageKey) || pageDefaults[pageKey] || null;
  }, []);

  const saveDraft = useCallback((pageKey, data) => {
    storage.saveDraft(pageKey, data);
    refresh();
  }, [refresh]);

  const publish = useCallback((pageKey) => {
    const ok = storage.publish(pageKey);
    refresh();
    return ok;
  }, [refresh]);

  const unpublish = useCallback((pageKey) => {
    storage.unpublish(pageKey);
    refresh();
  }, [refresh]);

  const getStatus = useCallback((pageKey) => {
    return storage.getStatus(pageKey);
  }, []);

  return (
    <CMSContext.Provider value={{
      pages, refreshKey, refresh,
      getPublishedContent, getDraftContent, getEffectiveContent,
      saveDraft, publish, unpublish, getStatus,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export default CMSContext;
