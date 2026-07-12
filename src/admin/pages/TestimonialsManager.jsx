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

const TestimonialsManager = () => {
  const { t } = useTranslation();

  const defaultItem = { name: '', title: '', content: '', rating: 5, imageUrl: '', isActive: true };

  const fields = [
    { key: 'name', label: t('admin.manager.testimonial.name', 'Name') },
    { key: 'title', label: t('admin.manager.testimonial.title', 'Title') },
    { key: 'content', label: t('admin.manager.testimonial.content', 'Content'), multiline: true, rows: 3 },
    { key: 'rating', label: t('admin.manager.testimonial.rating', 'Rating (1-5)'), type: 'number' },
  ];
  return (
    <AdminCrudPage
      title={t('admin.testimonials.title')}
      fields={fields}
      defaultItem={defaultItem}
      fetchData={async () => {
        try { return await apiWithAuth.get('/admin/testimonials'); } catch { return []; }
      }}
      createItem={async (data) => {
        const r = await apiWithAuth.post('/admin/testimonials', data);
        if (!r) throw new Error('Failed to create testimonial');
      }}
      updateItem={async (data) => {
        const r = await apiWithAuth.put(`/admin/testimonials/${data.id}`, data);
        if (!r) throw new Error('Failed to update testimonial');
      }}
      deleteItem={async (item) => {
        await apiWithAuth.del(`/admin/testimonials/${item.id}`);
      }}
    />
  );
};

export default TestimonialsManager;
