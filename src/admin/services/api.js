import { storage, pageDefaults } from '../../cms';
import api from '../../services/api';

const apiWithAuth = {
  get: (path, params) => api.get(path, params, true),
  post: (path, body) => api.post(path, body, true),
  put: (path, body) => api.put(path, body, true),
  patch: (path, body) => api.patch(path, body, true),
  del: (path) => api.delete(path, true),
};

export const contentService = {
  get: (pageKey) => {
    return storage.getPublished(pageKey) || pageDefaults[pageKey] || {};
  },

  update: (pageKey, data) => {
    return storage.saveDraft(pageKey, data);
  },

  publish: (pageKey) => {
    return storage.publish(pageKey);
  },

  unpublish: (pageKey) => {
    storage.unpublish(pageKey);
  },

  getDraft: (pageKey) => {
    return storage.getDraft(pageKey);
  },

  list: () => {
    return storage.getAllPages();
  },

  getStatus: (pageKey) => {
    return storage.getStatus(pageKey);
  },
};

export const mediaService = {
  async list() {
    try {
      const r = await apiWithAuth.get('/admin/media');
      if (Array.isArray(r)) return r;
    } catch {}
    const images = storage.get('media_images') || [];
    return images;
  },

  async add(imageData) {
    try {
      const r = await api.upload(imageData.file, imageData.altText || '');
      if (r) return [r];
    } catch {}
    const images = storage.get('media_images') || [];
    images.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      ...imageData,
      uploadedAt: new Date().toISOString(),
    });
    storage.set('media_images', images);
    return images;
  },

  async delete(id) {
    try { await apiWithAuth.del(`/admin/media/${id}`); return; } catch {}
    let images = storage.get('media_images') || [];
    images = images.filter(img => img.id !== id);
    storage.set('media_images', images);
  },

  async update(id, data) {
    try {
      const r = await apiWithAuth.put(`/admin/media/${id}`, data);
      if (r) return r;
    } catch {}
    const images = storage.get('media_images') || [];
    const idx = images.findIndex(img => img.id === id);
    if (idx !== -1) {
      images[idx] = { ...images[idx], ...data };
      storage.set('media_images', images);
    }
    return images;
  },
};

export const settingsService = {
  async get() {
    try {
      const r = await apiWithAuth.get('/admin/settings');
      if (r) return r;
    } catch {}
    return storage.get('settings') || {};
  },
  async update(data) {
    try {
      await apiWithAuth.put('/admin/settings', data);
      return data;
    } catch {}
    return storage.set('settings', data);
  },
};

export default { contentService, mediaService, settingsService };
