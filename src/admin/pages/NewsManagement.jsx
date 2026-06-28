import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions,
  DialogTitle, DialogContent, Grid, TextField, Typography, Switch, FormControlLabel,
  Snackbar, Alert, CircularProgress, useMediaQuery, useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Image as ImageIcon } from '@mui/icons-material';
import { contentService } from '../services/api';

const defaultNewsItem = {
  title: '',
  description: '',
  body: '',
  imageUrl: '',
  isActive: true,
};

const NewsManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ ...defaultNewsItem });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadNews(); }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await contentService.get('news');
      setNews(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showSnack = (message, severity = 'success') => setSnackbar({ open: true, message, severity });

  const handleAdd = () => {
    setForm({ ...defaultNewsItem });
    setIsEditMode(false);
    setDialog(true);
  };

  const handleEdit = (item) => {
    setForm({ ...item });
    setIsEditMode(true);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
    setForm({ ...defaultNewsItem });
  };

  const handleDelete = async () => {
    if (!newsToDelete) return;
    const items = news.filter((n) => n.title !== newsToDelete.title);
    try {
      await contentService.update('news', { hero: { title: 'News' }, items });
      setNews(items);
      showSnack('News deleted successfully');
    } catch (err) {
      showSnack(err.message, 'error');
    }
    setDeleteDialog(false);
    setNewsToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let items;
      if (isEditMode) {
        items = news.map((n) => (n.title === form.title ? form : n));
      } else {
        items = [...news, { ...form, createdAt: new Date().toISOString() }];
      }
      await contentService.update('news', { hero: { title: 'News' }, items });
      await loadNews();
      handleClose();
      showSnack(isEditMode ? 'News updated!' : 'News created!');
    } catch (err) {
      showSnack(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return ''; }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">News Management</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>Add News</Button>
      </Box>

      <Grid container spacing={3}>
        {news.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.imageUrl && <CardMedia component="img" height="140" image={item.imageUrl} alt={item.title} />}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.description?.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">{formatDate(item.createdAt)}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(item)}>Edit</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />}
                  onClick={() => { setNewsToDelete(item); setDeleteDialog(true); }}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialog} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditMode ? 'Edit News' : 'Add New News'}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Title" name="title" value={form.title}
                  onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required margin="normal" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" name="description" value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} required multiline rows={3} margin="normal" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Content" name="body" value={form.body}
                  onChange={(e) => setForm(p => ({ ...p, body: e.target.value }))} multiline rows={6} margin="normal" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Image URL" name="imageUrl" value={form.imageUrl}
                  onChange={(e) => setForm(p => ({ ...p, imageUrl: e.target.value }))} margin="normal" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={form.isActive !== false}
                    onChange={(e) => setForm(p => ({ ...p, isActive: e.target.checked }))} color="primary" />}
                  label="Active" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}>
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete "{newsToDelete?.title}"?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsManagement;
