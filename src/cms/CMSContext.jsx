import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import storage from './storage';
import { pageDefaults } from './defaults';
import { getPublishedContent as fetchApiContent, invalidateCache } from '../services/cmsApi';

const CMSContext = createContext();

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}

const apiContentCache = {};

export function CMSProvider({ children }) {
  const [pages, setPages] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiLoaded, setApiLoaded] = useState({});
  const loadedRef = useRef({});

  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
    setPages(storage.getAllPages());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Populate API cache on mount
  useEffect(() => {
    const pageKeys = Object.keys(pageDefaults);
    pageKeys.forEach(async (key) => {
      try {
        const content = await fetchApiContent(key);
        if (content) {
          apiContentCache[key] = content;
          if (!loadedRef.current[key]) {
            loadedRef.current[key] = true;
            setApiLoaded(prev => ({ ...prev, [key]: true }));
          }
        }
      } catch {}
    });
  }, [refreshKey]);

  // Listen for content saved events (e.g. from PageEditor)
  useEffect(() => {
    const handler = (e) => {
      const key = e.detail?.pageKey;
      if (key) {
        fetchApiContent(key).then(content => {
          if (content) {
            apiContentCache[key] = content;
            loadedRef.current[key] = true;
            setApiLoaded(prev => ({ ...prev, [key]: true }));
            setRefreshKey(k => k + 1);
          }
        });
      } else {
        // Refresh all
        setRefreshKey(k => k + 1);
      }
    };
    window.addEventListener('cms-content-saved', handler);
    return () => window.removeEventListener('cms-content-saved', handler);
  }, []);

  const getPublishedContent = useCallback((pageKey) => {
    if (apiContentCache[pageKey]) {
      return apiContentCache[pageKey];
    }
    return storage.getPublished(pageKey) || pageDefaults[pageKey] || null;
  }, []);

  const getDraftContent = useCallback((pageKey) => {
    return storage.getDraft(pageKey);
  }, []);

  const getEffectiveContent = useCallback((pageKey) => {
    return getPublishedContent(pageKey) || storage.getDraft(pageKey) || pageDefaults[pageKey] || null;
  }, [getPublishedContent]);

  const saveDraft = useCallback((pageKey, data) => {
    storage.saveDraft(pageKey, data);
    invalidateCache(pageKey);
    refresh();
  }, [refresh]);

  const publish = useCallback((pageKey) => {
    const ok = storage.publish(pageKey);
    invalidateCache(pageKey);
    refresh();
    return ok;
  }, [refresh]);

  const unpublish = useCallback((pageKey) => {
    storage.unpublish(pageKey);
    invalidateCache(pageKey);
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
      apiLoaded,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export default CMSContext;
