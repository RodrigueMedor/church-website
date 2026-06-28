import React, { useState, useEffect, useCallback } from 'react';
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
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [renameDialog, setRenameDialog] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [imageDialog, setImageDialog] = useState(null);

  const loadMedia = useCallback(() => {
    setLoading(true);
    try {
      const items = mediaService.list();
      setMedia(items);
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
          setSnackbar({ open: true, message: `${file.name} exceeds 2MB limit. Try compressing it.`, severity: 'warning' });
          continue;
        }
        const dataUrl = await toDataUrl(file);
        mediaService.add({
          filename: file.name,
          dataUrl,
          size: file.size,
          type: file.type,
          label: file.name.replace(/\.[^/.]+$/, ''),
        });
      }
      loadMedia();
      setSnackbar({ open: true, message: 'Upload complete!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setUploading(false);
    }
  }, [loadMedia]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: true,
  });

  const handleDelete = () => {
    if (!deleteDialog) return;
    mediaService.delete(deleteDialog.id);
    setMedia(prev => prev.filter(m => m.id !== deleteDialog.id));
    setDeleteDialog(null);
    setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
  };

  const handleRename = () => {
    if (!renameDialog) return;
    mediaService.update(renameDialog.id, { label: renameValue });
    loadMedia();
    setRenameDialog(null);
    setSnackbar({ open: true, message: 'Renamed successfully', severity: 'success' });
  };

  const copyUrl = (dataUrl) => {
    navigator.clipboard.writeText(dataUrl);
    setSnackbar({ open: true, message: 'Image data URL copied!', severity: 'success' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          <ImageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Media Library
        </Typography>
        <Chip label={`${media.length} files`} color="primary" variant="outlined" />
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
          {isDragActive ? 'Drop files here...' : 'Drag & drop images here, or click to select'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Supported: JPG, PNG, GIF, WebP (max 2MB per image for browser storage)
        </Typography>
      </Box>

      {uploading && <LinearProgress sx={{ mb: 2 }} />}

      {loading ? (
        <LinearProgress />
      ) : media.length === 0 ? (
        <Typography color="textSecondary" textAlign="center" py={8}>
          No images uploaded yet. Drop images above to get started.
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
                subtitle={formatSize(item.size)}
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
                Size: {formatSize(imageDialog.size)} | Type: {imageDialog.type}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => copyUrl(imageDialog.dataUrl)} startIcon={<LinkIcon />}>Copy URL</Button>
              <Button onClick={() => setImageDialog(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{deleteDialog?.label || deleteDialog?.filename}"?</Typography>
          <Typography variant="caption" color="error">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Rename dialog */}
      <Dialog open={!!renameDialog} onClose={() => setRenameDialog(null)}>
        <DialogTitle>Rename Image</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Label" value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)} sx={{ mt: 1 }} autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialog(null)}>Cancel</Button>
          <Button onClick={handleRename} variant="contained">Rename</Button>
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
