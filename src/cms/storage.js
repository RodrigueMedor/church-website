const CMS_PREFIX = 'cms_';

export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(CMS_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  set(key, data) {
    try {
      localStorage.setItem(CMS_PREFIX + key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('CMS storage error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(CMS_PREFIX + key);
  },

  keys() {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(CMS_PREFIX))
      .map(k => k.slice(CMS_PREFIX.length));
  },

  getAllByPrefix(prefix) {
    const result = {};
    for (const key of this.keys()) {
      if (key.startsWith(prefix)) {
        result[key] = this.get(key);
      }
    }
    return result;
  },

  /** Get published content for a page key */
  getPublished(pageKey) {
    return this.get(`page_${pageKey}_published`);
  },

  /** Get draft content for a page key */
  getDraft(pageKey) {
    return this.get(`page_${pageKey}_draft`);
  },

  /** Save draft for a page */
  saveDraft(pageKey, data) {
    return this.set(`page_${pageKey}_draft`, data);
  },

  /** Publish: copy draft to published */
  publish(pageKey) {
    const draft = this.getDraft(pageKey);
    if (draft) {
      this.set(`page_${pageKey}_published`, draft);
      this.set(`page_${pageKey}_status`, 'published');
      return true;
    }
    return false;
  },

  /** Unpublish: remove published version */
  unpublish(pageKey) {
    this.remove(`page_${pageKey}_published`);
    this.set(`page_${pageKey}_status`, 'draft');
  },

  /** Get publish status */
  getStatus(pageKey) {
    return this.get(`page_${pageKey}_status`) || (this.getPublished(pageKey) ? 'published' : 'draft');
  },

  /** Get all pages with their status */
  getAllPages() {
    const keys = this.keys();
    const pageKeys = new Set();
    for (const k of keys) {
      const match = k.match(/^page_(.+?)_(published|draft|status)$/);
      if (match) pageKeys.add(match[1]);
    }
    return Array.from(pageKeys).map(key => ({
      key,
      status: this.getStatus(key),
      hasDraft: !!this.getDraft(key),
      hasPublished: !!this.getPublished(key),
    }));
  },
};

export default storage;
