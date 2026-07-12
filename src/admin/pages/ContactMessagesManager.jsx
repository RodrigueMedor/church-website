import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogTitle,
  DialogContent, Grid, Typography, Snackbar, Alert, CircularProgress, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon, Visibility as ViewIcon, MarkEmailRead as ReadIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import api from '../../services/api';

const apiWithAuth = {
  get: (path, params) => api.get(path, params, true),
  patch: (path, body) => api.patch(path, body, true),
  del: (path) => api.delete(path, true),
};

const ContactMessagesManager = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDialog, setViewDialog] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await apiWithAuth.get('/admin/contact-messages', { page: 0, size: 100 });
      setMessages(data?.content || []);
    } catch { setMessages([]); }
    setLoading(false);
  };

  const showSnack = (msg, severity = 'success') => setSnackbar({ open: true, message: msg, severity });

  const handleMarkRead = async (msg) => {
    try {
      await apiWithAuth.patch(`/admin/contact-messages/${msg.id}/read`);
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    } catch { showSnack(t('admin.contactMessages.failedRead'), 'error'); }
  };

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try {
      await apiWithAuth.del(`/admin/contact-messages/${deleteDialog.id}`);
      setMessages(prev => prev.filter(m => m.id !== deleteDialog.id));
      showSnack(t('admin.contactMessages.deleted'));
    } catch { showSnack(t('admin.contactMessages.failedDelete'), 'error'); }
    setDeleteDialog(null);
  };

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d).toLocaleString();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">{t('admin.contactMessages.title')}</Typography>
        <Chip
          label={t('admin.contactMessages.unread', { count: messages.filter(m => !m.read).length })}
          color="warning"
          variant="outlined"
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
      ) : messages.length === 0 ? (
        <Card><CardContent><Typography color="text.secondary" textAlign="center">{t('admin.contactMessages.noItems')}</Typography></CardContent></Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={40}></TableCell>
                <TableCell><strong>{t('admin.contactMessages.name')}</strong></TableCell>
                <TableCell><strong>{t('admin.contactMessages.email')}</strong></TableCell>
                <TableCell><strong>{t('admin.contactMessages.subject')}</strong></TableCell>
                <TableCell><strong>{t('admin.contactMessages.date')}</strong></TableCell>
                <TableCell width={160}><strong>{t('admin.contactMessages.actions')}</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id} sx={{ bgcolor: msg.read ? 'transparent' : 'action.hover' }}>
                  <TableCell>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: msg.read ? 'transparent' : 'warning.main' }} />
                  </TableCell>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.subject}</TableCell>
                  <TableCell>{formatDate(msg.createdAt)}</TableCell>
                  <TableCell>
                    <Tooltip title={t('admin.contactMessages.view')}><IconButton size="small" onClick={() => setViewDialog(msg)}><ViewIcon /></IconButton></Tooltip>
                    {!msg.read && (
                      <Tooltip title={t('admin.contactMessages.markRead')}><IconButton size="small" color="warning" onClick={() => handleMarkRead(msg)}><ReadIcon /></IconButton></Tooltip>
                    )}
                    <Tooltip title={`mailto:${msg.email}`}>
                      <IconButton size="small" color="primary" component="a" href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}>
                        <EmailIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('admin.contactMessages.delete')}><IconButton size="small" color="error" onClick={() => setDeleteDialog(msg)}><DeleteIcon /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={!!viewDialog} onClose={() => setViewDialog(null)} maxWidth="sm" fullWidth>
        {viewDialog && (
          <>
            <DialogTitle>{viewDialog.subject}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography variant="caption" color="text.secondary">{t('admin.contactMessages.from')}</Typography><Typography>{viewDialog.name}</Typography></Grid>
                <Grid item xs={6}><Typography variant="caption" color="text.secondary">Email</Typography><Typography>{viewDialog.email}</Typography></Grid>
                {viewDialog.phone && <Grid item xs={6}><Typography variant="caption" color="text.secondary">{t('admin.contactMessages.phone')}</Typography><Typography>{viewDialog.phone}</Typography></Grid>}
                <Grid item xs={6}><Typography variant="caption" color="text.secondary">Date</Typography><Typography>{formatDate(viewDialog.createdAt)}</Typography></Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">{t('admin.contactMessages.message')}</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: 'grey.50', whiteSpace: 'pre-wrap' }}>
                    {viewDialog.message}
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button startIcon={<EmailIcon />} component="a" href={`mailto:${viewDialog.email}?subject=Re: ${viewDialog.subject}`}>{t('admin.contactMessages.reply')}</Button>
              <Button onClick={() => { if (!viewDialog.read) handleMarkRead(viewDialog); setViewDialog(null); }}>{t('admin.contactMessages.close')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>{t('admin.contactMessages.deleteTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('admin.contactMessages.deleteConfirm', { name: deleteDialog?.name })}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>{t('admin.contactMessages.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">{t('admin.contactMessages.delete')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactMessagesManager;
