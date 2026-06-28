import React, { useState, useEffect, useCallback } from 'react';
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
      setSnackbar({ open: true, message: 'Upload successful!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: true,
  });

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try {
      await mediaService.delete(deleteDialog.filename);
      setMedia(prev => prev.filter(m => m.filename !== deleteDialog.filename));
      setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
    setDeleteDialog(null);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setSnackbar({ open: true, message: 'URL copied to clipboard!', severity: 'success' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" mb={4}>
        <ImageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Media Manager
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
          {isDragActive ? 'Drop files here...' : 'Drag & drop images here, or click to select'}
        </Typography>
        <Typography variant="body2" color="textSecondary">Supported: JPG, PNG, GIF, WebP, SVG (max 10MB)</Typography>
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
              <Typography color="textSecondary" textAlign="center" py={8}>No media uploaded yet.</Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Delete Media</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{deleteDialog?.filename}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default MediaManager;
