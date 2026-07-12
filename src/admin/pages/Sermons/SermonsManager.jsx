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
  title: '', description: '', speaker: '', series: '', datePreached: '',
  bibleVerse: '', content: '', videoUrl: '', audioUrl: '', imageUrl: '', duration: '', active: true,
};

const SermonsManager = () => {
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
      const data = await apiWithAuth.get('/admin/sermons', { page: 0, size: 100 });
      setItems(data?.content || []);
    } catch { setItems([]); }
    setLoading(false);
  };

  const showSnack = (msg, s = 'success') => setSnackbar({ open: true, message: msg, severity: s });

  const handleAdd = () => { setForm({ ...defaultItem }); setIsEditMode(false); setDialog(true); };
  const handleEdit = (item) => {
    setForm({ ...defaultItem, ...item, datePreached: item.datePreached ? item.datePreached.substring(0, 10) : '' });
    setIsEditMode(true);
    setDialog(true);
  };
  const handleClose = () => { setDialog(false); setForm({ ...defaultItem }); };

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try { await apiWithAuth.del(`/admin/sermons/${deleteDialog.id}`); showSnack(t('admin.sermonsManager.deleted')); loadItems(); }
    catch (e) { showSnack(e.message, 'error'); }
    setDeleteDialog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) { showSnack(t('admin.sermonsManager.titleRequired'), 'error'); return; }
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await apiWithAuth.put(`/admin/sermons/${form.id}`, form);
        showSnack(t('admin.sermonsManager.updated'));
      } else {
        await apiWithAuth.post('/admin/sermons', form);
        showSnack(t('admin.sermonsManager.created'));
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
        <Typography variant="h4" fontWeight="bold">{t('admin.sermonsManager.title')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>{t('admin.sermonsManager.add')}</Button>
      </Box>

      <Grid container spacing={3}>
        {items.length === 0 && (
          <Grid item xs={12}>
            <Card><CardContent><Typography color="text.secondary" textAlign="center">{t('admin.sermonsManager.noItems')}</Typography></CardContent></Card>
          </Grid>
        )}
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.imageUrl && <CardMedia component="img" height="140" image={item.imageUrl} alt={item.title} />}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.speaker}{item.datePreached ? ` · ${formatDate(item.datePreached)}` : ''}</Typography>
                {item.series && <Typography variant="caption" color="text.secondary">Series: {item.series}</Typography>}
              </CardContent>
              <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(item)}>{t('admin.sermonsManager.edit')}</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteDialog(item)}>{t('admin.sermonsManager.delete')}</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialog} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditMode ? t('admin.sermonsManager.editTitle') : t('admin.sermonsManager.addTitle')}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}><TextField fullWidth label={t('admin.field.title', 'Title')} value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label={t('admin.field.description', 'Description')} value={form.description || ''} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} multiline rows={3} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.sermon.speaker', 'Speaker')} value={form.speaker || ''} onChange={(e) => setForm(p => ({ ...p, speaker: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.sermon.series', 'Series')} value={form.series || ''} onChange={(e) => setForm(p => ({ ...p, series: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.sermon.datePreached', 'Date Preached')} type="date" InputLabelProps={{ shrink: true }} value={form.datePreached} onChange={(e) => setForm(p => ({ ...p, datePreached: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label={t('admin.manager.sermon.bibleVerse', 'Bible Verse')} value={form.bibleVerse || ''} onChange={(e) => setForm(p => ({ ...p, bibleVerse: e.target.value }))} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Content" value={form.content || ''} onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))} multiline rows={6} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Video URL" value={form.videoUrl || ''} onChange={(e) => setForm(p => ({ ...p, videoUrl: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Audio URL" value={form.audioUrl || ''} onChange={(e) => setForm(p => ({ ...p, audioUrl: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Image URL" value={form.imageUrl || ''} onChange={(e) => setForm(p => ({ ...p, imageUrl: e.target.value }))} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Duration" value={form.duration || ''} onChange={(e) => setForm(p => ({ ...p, duration: e.target.value }))} /></Grid>
              <Grid item xs={12}><FormControlLabel control={<Switch checked={form.active !== false} onChange={(e) => setForm(p => ({ ...p, active: e.target.checked }))} />} label="Active" /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('admin.sermonsManager.cancel')}</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={20} /> : (isEditMode ? t('admin.sermonsManager.update') : t('admin.sermonsManager.create'))}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>{t('admin.sermonsManager.confirmDelete')}</DialogTitle>
        <DialogContent><Typography>{t('admin.sermonsManager.deleteConfirm', { title: deleteDialog?.title })}</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>{t('admin.sermonsManager.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">{t('admin.sermonsManager.delete')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SermonsManager;
