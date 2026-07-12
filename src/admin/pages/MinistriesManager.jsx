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

const MinistriesManager = () => {
  const { t } = useTranslation();

  const defaultItem = { name: '', slug: '', tagline: '', description: '', longDescription: '', imageUrl: '', heroImagePosition: 'center', meetingTime: '', meetingLocation: '', contactEmail: '', contactPhone: '', isActive: true };

  const fields = [
    { key: 'name', label: t('admin.manager.ministry.name', 'Name') },
    { key: 'slug', label: t('admin.manager.ministry.slug', 'URL Slug (e.g. youth)') },
    { key: 'tagline', label: t('admin.manager.ministry.tagline', 'Tagline'), multiline: true, rows: 2 },
    { key: 'description', label: t('admin.manager.ministry.shortDescription', 'Short Description'), multiline: true, rows: 3 },
    { key: 'longDescription', label: t('admin.manager.ministry.longDescription', 'Long Description'), multiline: true, rows: 5 },
    { key: 'imageUrl', label: t('admin.manager.ministry.imageUrl', 'Image URL') },
    { key: 'meetingTime', label: t('admin.manager.ministry.meetingTime', 'Meeting Time') },
    { key: 'meetingLocation', label: t('admin.manager.ministry.meetingLocation', 'Meeting Location') },
    { key: 'contactEmail', label: t('admin.manager.ministry.contactEmail', 'Contact Email') },
    { key: 'contactPhone', label: t('admin.manager.ministry.contactPhone', 'Contact Phone') },
  ];
  return (
    <AdminCrudPage
      title={t('admin.ministries.title')}
      fields={fields}
      defaultItem={defaultItem}
      fetchData={async () => {
        try { return await apiWithAuth.get('/admin/ministries'); } catch { return []; }
      }}
      createItem={async (data) => {
        const r = await apiWithAuth.post('/admin/ministries', data);
        if (!r) throw new Error('Failed to create ministry');
      }}
      updateItem={async (data) => {
        const r = await apiWithAuth.put(`/admin/ministries/${data.id}`, data);
        if (!r) throw new Error('Failed to update ministry');
      }}
      deleteItem={async (item) => {
        await apiWithAuth.del(`/admin/ministries/${item.id}`);
      }}
    />
  );
};

export default MinistriesManager;
