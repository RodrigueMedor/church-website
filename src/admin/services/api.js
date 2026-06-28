import { storage, pageDefaults } from '../../cms';

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
  list: () => {
    const images = storage.get('media_images') || [];
    return images;
  },

  add: (imageData) => {
    const images = storage.get('media_images') || [];
    images.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      ...imageData,
      uploadedAt: new Date().toISOString(),
    });
    storage.set('media_images', images);
    return images;
  },

  delete: (id) => {
    let images = storage.get('media_images') || [];
    images = images.filter(img => img.id !== id);
    storage.set('media_images', images);
    return images;
  },

  update: (id, data) => {
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
  get: () => {
    return storage.get('settings') || {};
  },
  update: (data) => {
    return storage.set('settings', data);
  },
};

export default { contentService, mediaService, settingsService };
