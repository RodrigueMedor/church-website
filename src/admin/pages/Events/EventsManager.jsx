import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Card, CardContent, CardActions, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar,
  Alert, CircularProgress, Chip,
} from '@mui/material';
import { Event as EventIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { contentService } from '../../services/api';

const EventsManager = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '', imageUrl: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await contentService.get('events');
      setEvents(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditIdx(null);
    setForm({ title: '', date: '', time: '', location: '', description: '', imageUrl: '' });
    setDialog(true);
  };

  const openEdit = (idx) => {
    setEditIdx(idx);
    setForm({ ...events[idx] });
    setDialog(true);
  };

  const save = async () => {
    let items;
    if (editIdx !== null) {
      items = events.map((e, i) => i === editIdx ? form : e);
    } else {
      items = [...events, form];
    }
    try {
      await contentService.update('events', { hero: { title: 'Events', subtitle: 'Stay connected with our church community' }, items });
      await loadEvents();
      setDialog(false);
      setSnackbar({ open: true, message: editIdx !== null ? 'Event updated!' : 'Event added!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const remove = async (idx) => {
    const items = events.filter((_, i) => i !== idx);
    try {
      await contentService.update('events', { hero: { title: 'Events', subtitle: 'Stay connected with our church community' }, items });
      await loadEvents();
      setSnackbar({ open: true, message: 'Event deleted', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Events
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>Add Event</Button>
      </Box>

      <Grid container spacing={3}>
        {events.map((event, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{event.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.date}{event.time ? ` @ ${event.time}` : ''}
                </Typography>
                {event.location && (
                  <Chip label={event.location} size="small" sx={{ mt: 1 }} />
                )}
                {event.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>{event.description}</Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => openEdit(idx)}>Edit</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => remove(idx)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {events.length === 0 && (
          <Grid item xs={12}><Typography color="textSecondary" textAlign="center" py={8}>No events yet.</Typography></Grid>
        )}
      </Grid>

      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editIdx !== null ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField fullWidth label="Title" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Date" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Time" value={form.time} onChange={(e) => setForm(p => ({ ...p, time: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Location" value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Description" multiline rows={3} value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} /></Grid>
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

export default EventsManager;
