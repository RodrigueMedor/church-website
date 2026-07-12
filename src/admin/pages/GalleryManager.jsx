import React from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AdminCrudPage from '../components/common/AdminCrudPage';

const apiWithAuth = {
  get: (path, params) => api.get(path, params, true),
  post: (path, body) => api.post(path, body, true),
  put: (path, body) => api.put(path, body, true),
  del: (path) => api.delete(path, true),
};

const GalleryManager = () => {
  const { t } = useTranslation();

  const defaultItem = { title: '', description: '', imageUrl: '', category: 'general', isActive: true };

  const fields = [
    { key: 'title', label: t('admin.field.title', 'Title') },
    { key: 'description', label: t('admin.field.description', 'Description'), multiline: true, rows: 2 },
    { key: 'imageUrl', label: t('admin.manager.gallery.imageUrl', 'Image URL') },
    { key: 'category', label: t('admin.manager.gallery.category', 'Category') },
  ];
  return (
    <AdminCrudPage
      title={t('admin.gallery.title')}
      fields={fields}
      defaultItem={defaultItem}
      fetchData={async () => {
        try { return await apiWithAuth.get('/admin/gallery'); } catch { return []; }
      }}
      createItem={async (data) => {
        const r = await apiWithAuth.post('/admin/gallery', data);
        if (!r) throw new Error('Failed to create gallery item');
      }}
      updateItem={async (data) => {
        const r = await apiWithAuth.put(`/admin/gallery/${data.id}`, data);
        if (!r) throw new Error('Failed to update gallery item');
      }}
      deleteItem={async (item) => {
        await apiWithAuth.del(`/admin/gallery/${item.id}`);
      }}
    />
  );
};

export default GalleryManager;
