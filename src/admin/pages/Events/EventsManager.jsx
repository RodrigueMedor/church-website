import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
  DialogTitle, DialogContent, Grid, TextField, Typography, FormControlLabel, Switch,
  Snackbar, Alert, CircularProgress,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../../../services/api';

const apiWithAuth = {
  get: (path, params) => api.get(path, params, true),
  post: (path, body) => api.post(path, body, true),
  put: (path, body) => api.put(path, body, true),
  del: (path) => api.delete(path, true),
};

const defaultItem = {
  title: '', description: '', startDate: '', endDate: '', startTime: '', endTime: '',
  location: '', address: '', imageUrl: '', category: 'general', featured: false, active: true,
};

const EventsManager = () => {
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
      const data = await apiWithAuth.get('/admin/events', { page: 0, size: 100 });
      setItems(data?.content || []);
    } catch { setItems([]); }
    setLoading(false);
  };

  const showSnack = (msg, s = 'success') => setSnackbar({ open: true, message: msg, severity: s });

  const handleAdd = () => { setForm({ ...defaultItem }); setIsEditMode(false); setDialog(true); };
  const handleEdit = (item) => {
    setForm({
      ...defaultItem, ...item,
      startDate: item.startDate ? item.startDate.substring(0, 10) : '',
      endDate: item.endDate ? item.endDate.substring(0, 10) : '',
    });
    setIsEditMode(true);
    setDialog(true);
  };
  const handleClose = () => { setDialog(false); setForm({ ...defaultItem }); };

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try { await apiWithAuth.del(`/admin/events/${deleteDialog.id}`); showSnack(t('admin.eventsManager.deleted')); loadItems(); }
    catch (e) { showSnack(e.message, 'error'); }
    setDeleteDialog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) { showSnack(t('admin.eventsManager.titleRequired'), 'error'); return; }
    setIsSubmitting(true);
    try {
      const payload = { ...form };
      if (isEditMode) {
        await apiWithAuth.put(`/admin/events/${form.id}`, payload);
        showSnack(t('admin.eventsManager.updated'));
      } else {
        await apiWithAuth.post('/admin/events', payload);
        showSnack(t('admin.eventsManager.created'));
      }
      handleClose(); loadItems();
    } catch (e) { showSnack(e.message, 'error'); }
    setIsSubmitting(false);
  };

  const formatDate = (d) => { if (!d) return ''; try { return new Date(d).toLocaleDateString(); } catch { return d; } };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">{t('admin.eventsManager.title')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>{t('admin.eventsManager.add')}</Button>
      </Box>

      <Grid container spacing={3}>
        {items.length === 0 && (
          <Grid item xs={12}>
            <Card><CardContent><Typography color="text.secondary" textAlign="center">{t('admin.eventsManager.noItems')}</Typography></CardContent></Card>
          </Grid>
        )}
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.imageUrl && <CardMedia component="img" height="140" image={item.imageUrl} alt={item.title} />}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {formatDate(item.startDate)}{item.startTime ? ` ${item.startTime}` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.location}{item.category ? ` · ${item.category}` : ''}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(item)}>{t('admin.eventsManager.edit')}</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteDialog(item)}>{t('admin.eventsManager.delete')}</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialog} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditMode ? t('admin.eventsManager.editTitle') : t('admin.eventsManager.addTitle')}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}><TextField fullWidth label={t('admin.field.title', 'Title')} value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label={t('admin.field.description', 'Description')} value={form.description || ''} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} multiline rows={3} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.event.startDate', 'Start Date')} type="date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.event.endDate', 'End Date')} type="date" InputLabelProps={{ shrink: true }} value={form.endDate || ''} onChange={(e) => setForm(p => ({ ...p, endDate: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.event.startTime', 'Start Time')} value={form.startTime || ''} onChange={(e) => setForm(p => ({ ...p, startTime: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.event.endTime', 'End Time')} value={form.endTime || ''} onChange={(e) => setForm(p => ({ ...p, endTime: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.event.location', 'Location')} value={form.location || ''} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.event.category', 'Category')} value={form.category || ''} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} /></Grid>
              <Grid item xs={12}><TextField fullWidth label={t('admin.manager.event.address', 'Address')} value={form.address || ''} onChange={(e) => setForm(p => ({ ...p, address: e.target.value }))} /></Grid>
              <Grid item xs={12}><TextField fullWidth label={t('admin.manager.event.imageUrl', 'Image URL')} value={form.imageUrl || ''} onChange={(e) => setForm(p => ({ ...p, imageUrl: e.target.value }))} /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Switch checked={form.featured} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))} />} label={t('admin.manager.event.featured', 'Featured')} /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Switch checked={form.active !== false} onChange={(e) => setForm(p => ({ ...p, active: e.target.checked }))} />} label={t('admin.manager.event.active', 'Active')} /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('admin.eventsManager.cancel')}</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={20} /> : (isEditMode ? t('admin.eventsManager.update') : t('admin.eventsManager.create'))}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>{t('admin.eventsManager.confirmDelete')}</DialogTitle>
        <DialogContent><Typography>{t('admin.eventsManager.deleteConfirm', { title: deleteDialog?.title })}</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>{t('admin.eventsManager.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">{t('admin.eventsManager.delete')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EventsManager;
