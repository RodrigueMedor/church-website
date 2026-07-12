import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
  DialogTitle, DialogContent, Grid, TextField, Typography, FormControlLabel, Switch,
  Snackbar, Alert, CircularProgress,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../../services/api';

const apiWithAuth = {
  get: (path, params) => api.get(path, params, true),
  post: (path, body) => api.post(path, body, true),
  put: (path, body) => api.put(path, body, true),
  del: (path) => api.delete(path, true),
};

const defaultItem = { title: '', excerpt: '', content: '', imageUrl: '', author: '', featured: false, active: true };

const NewsManagement = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ ...defaultItem });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await apiWithAuth.get('/admin/news', { page: 0, size: 100 });
      setItems(data?.content || []);
    } catch { setItems([]); }
    setLoading(false);
  };

  const showSnack = (msg, s = 'success') => setSnackbar({ open: true, message: msg, severity: s });

  const handleAdd = () => { setForm({ ...defaultItem }); setIsEditMode(false); setDialog(true); };
  const handleEdit = (item) => { setForm({ ...item }); setIsEditMode(true); setDialog(true); };
  const handleClose = () => { setDialog(false); setForm({ ...defaultItem }); };

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try { await apiWithAuth.del(`/admin/news/${deleteDialog.id}`); showSnack(t('admin.newsManagement.deleted')); loadItems(); }
    catch (e) { showSnack(e.message, 'error'); }
    setDeleteDialog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) { showSnack(t('admin.newsManagement.titleRequired'), 'error'); return; }
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await apiWithAuth.put(`/admin/news/${form.id}`, form);
        showSnack(t('admin.newsManagement.updated'));
      } else {
        await apiWithAuth.post('/admin/news', form);
        showSnack(t('admin.newsManagement.created'));
      }
      handleClose(); loadItems();
    } catch (e) { showSnack(e.message, 'error'); }
    setIsSubmitting(false);
  };

  const formatDate = (d) => { if (!d) return ''; try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">{t('admin.newsManagement.title')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>{t('admin.newsManagement.add')}</Button>
      </Box>

      <Grid container spacing={3}>
        {items.length === 0 && (
          <Grid item xs={12}>
            <Card><CardContent><Typography color="text.secondary" textAlign="center">{t('admin.newsManagement.noItems')}</Typography></CardContent></Card>
          </Grid>
        )}
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.imageUrl && <CardMedia component="img" height="140" image={item.imageUrl} alt={item.title} />}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {(item.excerpt || item.content || '').length > 100 ? `${(item.excerpt || item.content).substring(0, 100)}...` : (item.excerpt || item.content)}
                </Typography>
                <Typography variant="caption" color="text.secondary">{formatDate(item.createdAt)}</Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(item)}>{t('admin.newsManagement.edit')}</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteDialog(item)}>{t('admin.newsManagement.delete')}</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialog} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditMode ? t('admin.newsManagement.editTitle') : t('admin.newsManagement.addTitle')}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}><TextField fullWidth label={t('admin.newsManagement.titleField')} value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label={t('admin.newsManagement.excerpt')} value={form.excerpt || ''} onChange={(e) => setForm(p => ({ ...p, excerpt: e.target.value }))} multiline rows={2} /></Grid>
              <Grid item xs={12}><TextField fullWidth label={t('admin.newsManagement.content')} value={form.content || ''} onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))} multiline rows={6} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.newsManagement.imageUrl')} value={form.imageUrl || ''} onChange={(e) => setForm(p => ({ ...p, imageUrl: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.newsManagement.author')} value={form.author || ''} onChange={(e) => setForm(p => ({ ...p, author: e.target.value }))} /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Switch checked={form.featured} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))} />} label={t('admin.newsManagement.featured')} /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Switch checked={form.active !== false} onChange={(e) => setForm(p => ({ ...p, active: e.target.checked }))} />} label={t('admin.newsManagement.active')} /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('admin.newsManagement.cancel')}</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={20} /> : (isEditMode ? t('admin.newsManagement.update') : t('admin.newsManagement.create'))}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>{t('admin.newsManagement.confirmDelete')}</DialogTitle>
        <DialogContent><Typography>{t('admin.newsManagement.deleteConfirm', { title: deleteDialog?.title })}</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>{t('admin.newsManagement.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">{t('admin.newsManagement.delete')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsManagement;
