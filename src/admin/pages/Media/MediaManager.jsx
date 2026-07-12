import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import {
  Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent,
  CardActions, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert, LinearProgress, Chip, Paper,
} from '@mui/material';
import {
  CloudUpload as UploadIcon, Delete as DeleteIcon, Image as ImageIcon,
  Link as LinkIcon, CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { mediaService } from '../../services/api';

const MediaManager = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await mediaService.list();
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMedia(); }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        await mediaService.upload(file);
      }
      await loadMedia();
      setSnackbar({ open: true, message: t('admin.mediaManager.uploadSuccess'), severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setUploading(false);
    }
  }, [t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: true,
  });

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try {
      await mediaService.delete(deleteDialog.filename);
      setMedia(prev => prev.filter(m => m.filename !== deleteDialog.filename));
      setSnackbar({ open: true, message: t('admin.mediaManager.deleted'), severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
    setDeleteDialog(null);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setSnackbar({ open: true, message: t('admin.mediaManager.urlCopied'), severity: 'success' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" mb={4}>
        <ImageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        {t('admin.mediaManager.title')}
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 4, mb: 4, border: '2px dashed', borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 2, textAlign: 'center', cursor: 'pointer', bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6">
          {isDragActive ? t('admin.mediaManager.dragActive') : t('admin.mediaManager.dragDrop')}
        </Typography>
        <Typography variant="body2" color="textSecondary">{t('admin.mediaManager.supported')}</Typography>
      </Paper>

      {uploading && <LinearProgress sx={{ mb: 2 }} />}

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}><LinearProgress sx={{ width: '100%' }} /></Box>
      ) : (
        <Grid container spacing={2}>
          {media.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.filename}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.url}
                  alt={item.filename}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                  <Typography variant="caption" noWrap display="block">{item.filename}</Typography>
                </CardContent>
                <CardActions sx={{ p: 1, pt: 0 }}>
                  <IconButton size="small" onClick={() => copyUrl(item.url)}><LinkIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteDialog(item)}><DeleteIcon fontSize="small" /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {media.length === 0 && !loading && (
            <Grid item xs={12}>
              <Typography color="textSecondary" textAlign="center" py={8}>{t('admin.mediaManager.noItems')}</Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>{t('admin.mediaManager.deleteTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('admin.mediaManager.deleteConfirm', { name: deleteDialog?.filename })}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>{t('admin.mediaManager.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">{t('admin.mediaManager.delete')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default MediaManager;
