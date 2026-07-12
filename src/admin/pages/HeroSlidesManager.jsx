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

const HeroSlidesManager = () => {
  const { t } = useTranslation();

  const defaultItem = { title: '', subtitle: '', ctaText: '', ctaLink: '', imageUrl: '', page: 'homepage', isActive: true, orderIndex: 0 };

  const fields = [
    { key: 'title', label: t('admin.field.title', 'Title') },
    { key: 'subtitle', label: t('admin.manager.heroSlide.subtitle', 'Subtitle') },
    { key: 'page', label: t('admin.manager.heroSlide.page', 'Page (e.g. homepage, about)') },
    { key: 'ctaText', label: t('admin.manager.heroSlide.ctaText', 'CTA Button Text') },
    { key: 'ctaLink', label: t('admin.manager.heroSlide.ctaLink', 'CTA Button Link') },
    { key: 'imageUrl', label: t('admin.manager.heroSlide.imageUrl', 'Image URL') },
    { key: 'orderIndex', label: t('admin.manager.heroSlide.order', 'Order'), type: 'number' },
  ];
  return (
    <AdminCrudPage
      title={t('admin.heroSlides.title')}
      fields={fields}
      defaultItem={defaultItem}
      fetchData={async () => {
        try { return await apiWithAuth.get('/admin/hero-slides'); } catch { return []; }
      }}
      createItem={async (data) => {
        const r = await apiWithAuth.post('/admin/hero-slides', data);
        if (!r) throw new Error('Failed to create hero slide');
      }}
      updateItem={async (data) => {
        const r = await apiWithAuth.put(`/admin/hero-slides/${data.id}`, data);
        if (!r) throw new Error('Failed to update hero slide');
      }}
      deleteItem={async (item) => {
        await apiWithAuth.del(`/admin/hero-slides/${item.id}`);
      }}
    />
  );
};

export default HeroSlidesManager;
