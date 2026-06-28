import { useCMS } from './CMSContext';
import { pageDefaults } from './defaults';

/** Get a specific field from CMS or defaults using dot notation path */
export function useCMSText(pageKey, path, defaultValue) {
  const cms = useCMS();
  const published = cms.getPublishedContent(pageKey) || pageDefaults[pageKey] || {};
  const keys = path.split('.');
  let value = published;
  for (const key of keys) {
    if (value && typeof value === 'object') value = value[key];
    else return defaultValue;
  }
  return value !== undefined && value !== null ? value : defaultValue;
}

/** Get full page content from CMS (published) or defaults */
export function usePageContent(pageKey) {
  const cms = useCMS();
  return cms.getPublishedContent(pageKey) || pageDefaults[pageKey] || {};
}

/** Get a section from CMS page content */
export function usePageSection(pageKey, sectionKey) {
  const content = usePageContent(pageKey);
  return content[sectionKey] || pageDefaults[pageKey]?.[sectionKey] || null;
}

/** Get publish status info for a page */
export function usePageStatus(pageKey) {
  const cms = useCMS();
  const draft = cms.getDraftContent(pageKey);
  const published = cms.getPublishedContent(pageKey);
  const defaults = pageDefaults[pageKey];
  return {
    hasDraft: !!draft,
    hasPublished: !!published,
    isModified: draft && published && JSON.stringify(draft) !== JSON.stringify(published),
    isDefault: !draft && !published,
    status: cms.getStatus(pageKey),
  };
}

export default usePageContent;
