import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NEWS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS } from '../../graphql/newsQueries';
import { format } from 'date-fns';
import { useDropzone } from 'react-dropzone';
import {
  Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Typography, Switch, FormControlLabel,
  Snackbar, Alert, CircularProgress, useMediaQuery, useTheme, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Image as ImageIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

// Constants
const NEWS_TYPE = 'NEWS'; // This will be used as a string value, but we'll use it as an enum value in the GraphQL mutation

// Function to generate URL-friendly keys
const generateKey = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-+/g, '-');
};

// Default new news item
const defaultNewsItem = {
  title: '',
  description: '',
  body: '',
  imageUrl: '',
  isActive: true,
  metadata: {}
};


  // Loading and error states moved inside the component

const NewsManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State
  const [news, setNews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...defaultNewsItem });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // GraphQL Queries and Mutations
  const { loading, error, data } = useQuery(GET_NEWS, {
    variables: { type: NEWS_TYPE },
    onCompleted: (data) => {
      if (data?.contentsByType) {
        setNews(data.contentsByType);
      }
    },
    onError: (error) => {
      console.error('Error fetching news:', error);
      showSnackbar('Failed to load news', 'error');
    }
  });

  const [createNews] = useMutation(CREATE_NEWS, {
    refetchQueries: [{ query: GET_NEWS, variables: { type: NEWS_TYPE } }],
    onError: (error) => {
      console.error('Error creating news:', error);
      showSnackbar('Failed to create news', 'error');
    }
  });

  const [updateNews] = useMutation(UPDATE_NEWS, {
    refetchQueries: [{ query: GET_NEWS, variables: { type: NEWS_TYPE } }],
    onError: (error) => {
      console.error('Error updating news:', error);
      showSnackbar('Failed to update news', 'error');
    }
  });

  const [deleteNews] = useMutation(DELETE_NEWS, {
    refetchQueries: [{ query: GET_NEWS, variables: { type: NEWS_TYPE } }],
    onError: (error) => {
      console.error('Error deleting news:', error);
      showSnackbar('Failed to delete news', 'error');
    }
  });

  // Helper function to show snackbar
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Handle add news
  const handleAddNews = () => {
    setFormData({ ...defaultNewsItem });
    setImagePreview('');
    setImageFile(null);
    setIsEditMode(false);
    setOpenDialog(true);
  };

  // Handle edit news
  const handleEditNews = (item) => {
    setFormData(item);
    setImagePreview(item.imageUrl || '');
    setIsEditMode(true);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ ...defaultNewsItem });
    setImagePreview('');
    setImageFile(null);
  };

  // Alias for handleCloseDialog for consistency
  const handleFormClose = handleCloseDialog;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // File upload handling
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      // In a real app, you would upload the file here
      // and update formData.imageUrl with the returned URL
      setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Only include fields that are defined in ContentInput type
        const input = {
          key: formData.key || generateKey(formData.title),
          title: formData.title,
          description: formData.description,
          body: formData.body,
          imageUrl: formData.imageUrl,
          isActive: formData.isActive !== false,
          type: 'NEWS', // This is the enum value from ContentType
          metadata: formData.metadata || {}
        };

        if (isEditMode && formData.id) {
          // For updates, we need to use the key as the identifier
          // and ensure we don't include non-updatable fields
          const { id, createdAt, updatedAt, __typename, ...updateInput } = formData;
          
          await updateNews({ 
            variables: { 
              key: formData.key,
              input: {
                title: updateInput.title,
                description: updateInput.description,
                body: updateInput.body,
                imageUrl: updateInput.imageUrl,
                isActive: updateInput.isActive,
                metadata: updateInput.metadata
              }
            },
            onCompleted: () => {
              showSnackbar('News updated successfully!', 'success');
              handleFormClose();
            },
            onError: (error) => {
              console.error('Update error:', error);
              showSnackbar(`Update failed: ${error.message}`, 'error');
            }
          });
        } else {
          // For new items, include all necessary fields
          await createNews({ 
            variables: { 
              input: {
                title: input.title,
                description: input.description,
                body: input.body,
                imageUrl: input.imageUrl,
                isActive: input.isActive,
                metadata: input.metadata,
                key: input.key || generateKey(input.title)
              }
            },
            onCompleted: () => {
              showSnackbar('News created successfully!', 'success');
              handleFormClose();
            },
            onError: (error) => {
              console.error('Create error:', error);
              showSnackbar(`Creation failed: ${error.message}`, 'error');
            }
          });
        }

        // Response is handled in onCompleted/onError callbacks
      } catch (error) {
        console.error('Error in form submission:', error);
        const errorMessage = error.message.includes('NetworkError') 
          ? 'Network error. Please check your connection.'
          : `Error: ${error.message}`;
        showSnackbar(errorMessage, 'error');
      } finally {
        setIsSubmitting(false);
      }  
    };

    const handleDelete = async () => {
      if (!newsToDelete) return;
      
      try {
        await deleteNews({ 
          variables: { id: newsToDelete.id },
          onCompleted: () => {
            showSnackbar('News deleted successfully', 'success');
            setDeleteDialogOpen(false);
            setNewsToDelete(null);
          },
          onError: (error) => {
            console.error('Error deleting news:', error);
            showSnackbar('Failed to delete news', 'error');
          }
        });
      } catch (error) {
        console.error('Error in delete operation:', error);
        showSnackbar('An error occurred while deleting', 'error');
      }
    };

    // Render loading state
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      );
    }

    // Render error state
    if (error) {
      return (
        <Box p={3}>
          <Alert severity="error">Error loading news. Please try again later.</Alert>
        </Box>
      );
    }

    // Render news list
    return (
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">News Management</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNews}
          >
            Add News
          </Button>
        </Box>

        <Grid container spacing={3}>
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.imageUrl}
                    alt={item.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.description.length > 100 
                      ? `${item.description.substring(0, 100)}...` 
                      : item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(item.createdAt)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<EditIcon />}
                    onClick={() => handleEditNews(item)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setNewsToDelete(item);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditMode ? 'Edit News' : 'Add New News'}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={3}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  multiline
                  rows={6}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                    '&:hover': { backgroundColor: 'action.hover' },
                    mb: 2
                  }}
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px' }} 
                    />
                  ) : (
                    <Box>
                      <ImageIcon color="action" fontSize="large" />
                      <Typography>
                        {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{newsToDelete?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsManagement;
