import React, { createContext, useContext, useState, useCallback } from 'react';
import { contentService } from '../services/api';

const ContentContext = createContext();

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};

export const ContentProvider = ({ children }) => {
  const [contents, setContents] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  const getContentsByType = useCallback(async (pageKey) => {
    setLoading(true);
    setError(null);
    try {
      const data = contentService.get(pageKey);
      const arr = Array.isArray(data) ? data : data.items || data.sections || [];
      setContents(prev => ({ ...prev, [pageKey]: data }));
      return arr;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPage = useCallback(async (pageKey) => {
    setPageLoading(true);
    setError(null);
    try {
      const data = contentService.get(pageKey);
      setCurrentPage(data);
      return data;
    } catch (err) {
      setError(err.message);
      setCurrentPage(null);
      return null;
    } finally {
      setPageLoading(false);
    }
  }, []);

  const savePage = useCallback(async (pageKey, data) => {
    setPageLoading(true);
    setError(null);
    try {
      contentService.update(pageKey, data);
      setCurrentPage(data);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setPageLoading(false);
    }
  }, []);

  const publishPage = useCallback(async (pageKey) => {
    return contentService.publish(pageKey);
  }, []);

  const createContent = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      contentService.update(data.key || data.pageKey, data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContent = useCallback(async (key, data) => {
    setLoading(true);
    setError(null);
    try {
      contentService.update(key, data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ContentContext.Provider value={{
      contents, loading, error, currentPage, pageLoading,
      getContentsByType, createContent, updateContent,
      loadPage, savePage, publishPage, setCurrentPage,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
