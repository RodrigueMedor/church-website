import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogTitle, DialogContent,
  Grid, TextField, Typography, Snackbar, Alert, CircularProgress, useMediaQuery, useTheme,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AdminCrudPage = ({ title, fields, fetchData, createItem, updateItem, deleteItem, defaultItem, formatItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ ...defaultItem });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      setItems(Array.isArray(data) ? data : []);
    } catch { setItems([]); }
    setLoading(false);
  };

  const showSnack = (message, severity = 'success') => setSnackbar({ open: true, message, severity });

  const handleAdd = () => {
    setForm({ ...defaultItem });
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
    setForm({ ...defaultItem });
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteItem(itemToDelete);
      showSnack(`${title} ${t('admin.crud.deleted')}`);
      loadItems();
    } catch (err) {
      showSnack(err.message || `${t('admin.crud.failedDelete')} ${title}`, 'error');
    }
    setDeleteDialog(false);
    setItemToDelete(null);
  };

  const handleSubmit = async () => {
    if (!form.name && !form.title) { showSnack(t('admin.crud.nameRequired'), 'error'); return; }
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateItem(form);
        showSnack(`${title} ${t('admin.crud.updated')}`);
      } else {
        await createItem(form);
        showSnack(`${title} ${t('admin.crud.created')}`);
      }
      handleClose();
      loadItems();
    } catch (err) { showSnack(err.message || `${t('admin.crud.failedSave')} ${title}`, 'error'); }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderField = (field) => {
    if (field.type === 'boolean') {
      return (
        <TextField
          key={field.key}
          select name={field.key} label={field.label} value={form[field.key] || ''}
          onChange={handleChange} fullWidth margin="normal"
          SelectProps={{ native: true }}
        >
          <option value="">{t('admin.crud.select')}</option>
          <option value="true">{t('admin.crud.yes')}</option>
          <option value="false">{t('admin.crud.no')}</option>
        </TextField>
      );
    }
    return (
      <TextField
        key={field.key}
        name={field.key} label={field.label} value={form[field.key] || ''}
        onChange={handleChange} fullWidth margin="normal"
        multiline={field.multiline} rows={field.rows || 1}
        type={field.type || 'text'}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">{title}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          {t('admin.crud.add')} {title.slice(0, -1)}
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
      ) : items.length === 0 ? (
        <Card><CardContent><Typography color="text.secondary" textAlign="center">{t('admin.crud.noItems', { name: title.toLowerCase() })}</Typography></CardContent></Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map(f => <TableCell key={f.key}><strong>{f.label}</strong></TableCell>)}
                <TableCell width={120}><strong>{t('admin.crud.actions')}</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, idx) => (
                <TableRow key={item.id || idx}>
                  {fields.map(f => (
                    <TableCell key={f.key}>
                      {f.render ? f.render(item[f.key], item) : (item[f.key] || '-')}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton color="primary" size="small" onClick={() => handleEdit(item)}><EditIcon /></IconButton>
                    <IconButton color="error" size="small" onClick={() => { setItemToDelete(item); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditMode ? `${t('admin.crud.update')} ${title.slice(0, -1)}` : `${t('admin.crud.add')} ${title.slice(0, -1)}`}</DialogTitle>
        <DialogContent>
          {fields.map(f => renderField(f))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('admin.crud.cancel')}</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={20} /> : (isEditMode ? t('admin.crud.update') : t('admin.crud.create'))}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>{t('admin.crud.confirmDelete')}</DialogTitle>
        <DialogContent>
          <Typography>{t('admin.crud.deleteConfirm', { name: title.slice(0, -1).toLowerCase() })}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>{t('admin.crud.cancel')}</Button>
          <Button onClick={handleDelete} color="error">{t('admin.crud.delete')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminCrudPage;
