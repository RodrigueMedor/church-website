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

const PastorsManager = () => {
  const { t } = useTranslation();

  const defaultItem = { name: '', title: '', bio: '', email: '', imageUrl: '', orderIndex: 0 };

  const fields = [
    { key: 'name', label: t('admin.manager.pastor.name', 'Name') },
    { key: 'title', label: t('admin.manager.pastor.title', 'Title') },
    { key: 'email', label: t('admin.manager.pastor.email', 'Email') },
  ];
  return (
    <AdminCrudPage
      title={t('admin.pastors.title')}
      fields={fields}
      defaultItem={defaultItem}
      fetchData={async () => {
        try { return await apiWithAuth.get('/admin/pastors'); } catch { return []; }
      }}
      createItem={async (data) => {
        const r = await apiWithAuth.post('/admin/pastors', data);
        if (!r) throw new Error('Failed to create pastor');
      }}
      updateItem={async (data) => {
        const r = await apiWithAuth.put(`/admin/pastors/${data.id}`, data);
        if (!r) throw new Error('Failed to update pastor');
      }}
      deleteItem={async (item) => {
        await apiWithAuth.del(`/admin/pastors/${item.id}`);
      }}
    />
  );
};

export default PastorsManager;
