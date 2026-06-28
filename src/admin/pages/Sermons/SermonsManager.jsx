import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Card, CardContent, CardActions, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar,
  Alert, CircularProgress, Chip,
} from '@mui/material';
import { MenuBook as SermonIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { contentService } from '../../services/api';

const SermonsManager = () => {
  const navigate = useNavigate();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ title: '', speaker: '', date: '', description: '', videoUrl: '', audioUrl: '', imageUrl: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadSermons(); }, []);

  const loadSermons = async () => {
    setLoading(true);
    try {
      const data = await contentService.get('sermons');
      setSermons(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditIdx(null);
    setForm({ title: '', speaker: '', date: '', description: '', videoUrl: '', audioUrl: '', imageUrl: '' });
    setDialog(true);
  };

  const openEdit = (idx) => {
    setEditIdx(idx);
    setForm({ ...sermons[idx] });
    setDialog(true);
  };

  const save = async () => {
    let items;
    if (editIdx !== null) {
      items = sermons.map((s, i) => i === editIdx ? form : s);
    } else {
      items = [...sermons, form];
    }
    try {
      await contentService.update('sermons', { hero: { title: 'Sermons', subtitle: 'Listen to our latest sermons' }, items });
      await loadSermons();
      setDialog(false);
      setSnackbar({ open: true, message: editIdx !== null ? 'Sermon updated!' : 'Sermon added!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const remove = async (idx) => {
    const items = sermons.filter((_, i) => i !== idx);
    try {
      await contentService.update('sermons', { hero: { title: 'Sermons', subtitle: 'Listen to our latest sermons' }, items });
      await loadSermons();
      setSnackbar({ open: true, message: 'Sermon deleted', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          <SermonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Sermons
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>Add Sermon</Button>
      </Box>

      <Grid container spacing={3}>
        {sermons.map((sermon, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{sermon.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {sermon.speaker} &bull; {sermon.date}
                </Typography>
                {sermon.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>{sermon.description}</Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => openEdit(idx)}>Edit</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => remove(idx)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {sermons.length === 0 && (
          <Grid item xs={12}><Typography color="textSecondary" textAlign="center" py={8}>No sermons yet.</Typography></Grid>
        )}
      </Grid>

      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editIdx !== null ? 'Edit Sermon' : 'Add Sermon'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField fullWidth label="Title" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Speaker" value={form.speaker} onChange={(e) => setForm(p => ({ ...p, speaker: e.target.value }))} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Date" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Description" multiline rows={3} value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Video URL" value={form.videoUrl} onChange={(e) => setForm(p => ({ ...p, videoUrl: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Audio URL" value={form.audioUrl} onChange={(e) => setForm(p => ({ ...p, audioUrl: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Image URL" value={form.imageUrl} onChange={(e) => setForm(p => ({ ...p, imageUrl: e.target.value }))} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button onClick={save} variant="contained">{editIdx !== null ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default SermonsManager;
