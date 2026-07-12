import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import {
  Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent,
  CardActions, Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert, LinearProgress, TextField, IconButton, Chip,
  ImageList, ImageListItem, ImageListItemBar,
} from '@mui/material';
import {
  CloudUpload as UploadIcon, Delete as DeleteIcon, Image as ImageIcon,
  Link as LinkIcon, Edit as EditIcon,
} from '@mui/icons-material';
import { mediaService } from '../../services/api';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB limit for localStorage

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const MediaLibrary = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [renameDialog, setRenameDialog] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [imageDialog, setImageDialog] = useState(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const items = await mediaService.list();
      setMedia(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        if (file.size > MAX_IMAGE_SIZE) {
          setSnackbar({ open: true, message: t('admin.mediaLibrary.exceedsLimit', { name: file.name }), severity: 'warning' });
          continue;
        }
        const dataUrl = await toDataUrl(file);
        await mediaService.add({
          filename: file.name,
          dataUrl,
          size: file.size,
          type: file.type,
          label: file.name.replace(/\.[^/.]+$/, ''),
        });
      }
      await loadMedia();
      setSnackbar({ open: true, message: t('admin.mediaLibrary.uploadSuccess'), severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setUploading(false);
    }
  }, [loadMedia, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: true,
  });

  const handleDelete = async () => {
    if (!deleteDialog) return;
    await mediaService.delete(deleteDialog.id);
    setMedia(prev => prev.filter(m => m.id !== deleteDialog.id));
    setDeleteDialog(null);
    setSnackbar({ open: true, message: t('admin.mediaLibrary.deleted'), severity: 'success' });
  };

  const handleRename = async () => {
    if (!renameDialog) return;
    await mediaService.update(renameDialog.id, { label: renameValue });
    await loadMedia();
    setRenameDialog(null);
    setSnackbar({ open: true, message: t('admin.mediaLibrary.renamed'), severity: 'success' });
  };

  const copyUrl = (dataUrl) => {
    navigator.clipboard.writeText(dataUrl);
    setSnackbar({ open: true, message: t('admin.mediaLibrary.urlCopied'), severity: 'success' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          <ImageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          {t('admin.mediaLibrary.title')}
        </Typography>
        <Chip label={t('admin.mediaLibrary.files', { count: media.length })} color="primary" variant="outlined" />
      </Box>

      <Box
        {...getRootProps()}
        sx={{
          p: 4, mb: 4, border: '2px dashed', borderRadius: 2, textAlign: 'center',
          cursor: 'pointer', transition: 'all 0.2s',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6">
          {isDragActive ? t('admin.mediaLibrary.dragActive') : t('admin.mediaLibrary.dragDrop')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('admin.mediaLibrary.supported')}
        </Typography>
      </Box>

      {uploading && <LinearProgress sx={{ mb: 2 }} />}

      {loading ? (
        <LinearProgress />
      ) : media.length === 0 ? (
        <Typography color="textSecondary" textAlign="center" py={8}>
          {t('admin.mediaLibrary.noItems')}
        </Typography>
      ) : (
        <ImageList cols={4} gap={16}>
          {media.map((item) => (
            <ImageListItem key={item.id}>
              <Box
                component="img"
                src={item.dataUrl}
                alt={item.label}
                sx={{
                  width: '100%', height: 180, objectFit: 'cover', borderRadius: 1,
                  cursor: 'pointer', '&:hover': { opacity: 0.9 },
                }}
                onClick={() => setImageDialog(item)}
              />
              <ImageListItemBar
                title={item.label || item.filename}
                subtitle={t('admin.mediaLibrary.size', { size: formatSize(item.size), type: item.type })}
                actionIcon={
                  <Box sx={{ display: 'flex', mr: 1 }}>
                    <IconButton size="small" sx={{ color: 'white' }}
                      onClick={(e) => { e.stopPropagation(); setRenameDialog(item); setRenameValue(item.label || ''); }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}
                      onClick={(e) => { e.stopPropagation(); copyUrl(item.dataUrl); }}>
                      <LinkIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}
                      onClick={(e) => { e.stopPropagation(); setDeleteDialog(item); }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* Full preview dialog */}
      <Dialog open={!!imageDialog} onClose={() => setImageDialog(null)} maxWidth="md">
        {imageDialog && (
          <>
            <DialogTitle>{imageDialog.label || imageDialog.filename}</DialogTitle>
            <DialogContent>
              <Box component="img" src={imageDialog.dataUrl} sx={{ maxWidth: '100%', maxHeight: '70vh' }} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {t('admin.mediaLibrary.size', { size: formatSize(imageDialog.size), type: imageDialog.type })}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => copyUrl(imageDialog.dataUrl)} startIcon={<LinkIcon />}>{t('admin.mediaLibrary.copyUrl')}</Button>
              <Button onClick={() => setImageDialog(null)}>{t('admin.mediaLibrary.close')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>{t('admin.mediaLibrary.deleteTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('admin.mediaLibrary.deleteConfirm', { name: deleteDialog?.label || deleteDialog?.filename })}</Typography>
          <Typography variant="caption" color="error">{t('admin.mediaLibrary.undoWarning')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>{t('admin.mediaLibrary.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">{t('admin.mediaLibrary.delete')}</Button>
        </DialogActions>
      </Dialog>

      {/* Rename dialog */}
      <Dialog open={!!renameDialog} onClose={() => setRenameDialog(null)}>
        <DialogTitle>{t('admin.mediaLibrary.renameTitle')}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Label" value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)} sx={{ mt: 1 }} autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialog(null)}>{t('admin.mediaLibrary.cancel')}</Button>
          <Button onClick={handleRename} variant="contained">{t('admin.mediaLibrary.rename')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MediaLibrary;
