import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { 
  GET_NEWS,
  GET_SINGLE_NEWS,
  CREATE_NEWS, 
  UPDATE_NEWS, 
  DELETE_NEWS 
} from '../../graphql/newsQueries';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
  LinearProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Image as ImageIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { PageLoading } from '../components/common/Loading';
import { format } from 'date-fns';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../utils/fileUpload';

// Constants
const NEWS_TYPE = 'NEWS';
const MAX_DESCRIPTION_LENGTH = 200;
const MAX_TITLE_LENGTH = 100;

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

const NewsManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const client = useApolloClient();
  
  // State for news list and UI
  const [news, setNews] = useState([]);
  const [currentNews, setCurrentNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formData, setFormData] = useState({ ...defaultNewsItem });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Check authentication state
  const isAuthenticated = !!localStorage.getItem('token');
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Dropzone configuration for image upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setImageFile(file);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        
        // Upload the file
        try {
          setIsUploading(true);
          const uploadResponse = await uploadFile(file, (progress) => {
            setUploadProgress(progress);
          });
          
          setFormData(prev => ({
            ...prev,
            imageUrl: uploadResponse.url
          }));
          
          setSnackbar({
            open: true,
            message: 'Image uploaded successfully!',
            severity: 'success'
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          setSnackbar({
            open: true,
            message: 'Failed to upload image. Please try again.',
            severity: 'error'
          });
        } finally {
          setIsUploading(false);
          setUploadProgress(0);
        }
      }
    }
  });
  
  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  
  // GraphQL hooks
  const { loading: loadingNews, error: newsError, data: newsData, refetch } = useQuery(GET_NEWS, {
    fetchPolicy: 'network-only',
    skip: !isAuthenticated,
    onCompleted: (data) => {
      setNews(data?.contentsByType || []);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching news:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load news. Please try again.',
        severity: 'error',
      });
      
      if (error.message.includes('Not authenticated') || error.message.includes('Unauthorized')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      setIsLoading(false);
    },
  });

  // Create news mutation
  const [createNews] = useMutation(CREATE_NEWS, {
    onCompleted: (data) => {
      const newNews = data.createContent;
      setNews(prev => [newNews, ...prev]);
      setSnackbar({
        open: true,
        message: 'News created successfully!',
        severity: 'success',
      });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Error creating news:', error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error',
      });
      
      if (error.message.includes('Not authenticated') || error.message.includes('Unauthorized')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    },
    update: (cache, { data: { createContent } }) => {
      const existingNews = cache.readQuery({ query: GET_NEWS });
      cache.writeQuery({
        query: GET_NEWS,
        data: {
          contentsByType: [createContent, ...(existingNews?.contentsByType || [])],
        },
      });
    },
  });
  
  // Update news mutation
  const [updateNews] = useMutation(UPDATE_NEWS, {
    onCompleted: (data) => {
      const updatedNews = data.updateContent;
      setNews(prev => 
        prev.map(item => 
          item.key === updatedNews.key ? updatedNews : item
        )
      );
      setSnackbar({
        open: true,
        message: 'News updated successfully!',
        severity: 'success',
      });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Error updating news:', error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error',
      });
    },
    update: (cache, { data: { updateContent } }) => {
      const existingNews = cache.readQuery({ query: GET_NEWS });
      cache.writeQuery({
        query: GET_NEWS,
        data: {
          contentsByType: (existingNews?.contentsByType || []).map(item => 
            item.key === updateContent.key ? updateContent : item
          ),
        },
      });
    },
  });
  
  // Delete news mutation
  const [deleteNews] = useMutation(DELETE_NEWS, {
    onCompleted: () => {
      setNews(prev => prev.filter(item => item.key !== newsToDelete));
      setSnackbar({
        open: true,
        message: 'News deleted successfully!',
        severity: 'success',
      });
      setDeleteDialogOpen(false);
      setNewsToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting news:', error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error',
      });
    },
    update: (cache) => {
      const existingNews = cache.readQuery({ query: GET_NEWS });
      cache.writeQuery({
        query: GET_NEWS,
        data: {
          contentsByType: (existingNews?.contentsByType || []).filter(
            item => item.key !== newsToDelete
          ),
        },
      });
    },
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        key: generateKey(value)
      }));
    }
  };
  
  // Handle rich text editor changes
  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      body: content
    }));
  };
  
  // Open dialog for creating a new news item
  const handleOpenCreateDialog = () => {
    setFormData({ ...defaultNewsItem });
    setCurrentNews(null);
    setIsEditMode(false);
    setImagePreview('');
    setImageFile(null);
    setOpenDialog(true);
  };
  
  // Open dialog for editing an existing news item
  const handleOpenEditDialog = async (newsItem) => {
    try {
      setIsLoading(true);
      setCurrentNews(newsItem);
      setIsEditMode(true);
      
      if (newsItem.key) {
        const { data } = await client.query({
          query: GET_SINGLE_NEWS,
          variables: { key: newsItem.key },
          fetchPolicy: 'network-only',
        });
        
        if (data?.content) {
          setFormData({
            title: data.content.title,
            description: data.content.description,
            body: data.content.body,
            imageUrl: data.content.imageUrl,
            isActive: data.content.isActive,
            metadata: data.content.metadata || {},
            key: data.content.key
          });
          
          if (data.content.imageUrl) {
            setImagePreview(data.content.imageUrl);
          }
        }
      } else {
        setFormData({
          title: newsItem.title,
          description: newsItem.description,
          body: newsItem.body,
          imageUrl: newsItem.imageUrl,
          isActive: newsItem.isActive,
          metadata: newsItem.metadata || {},
          key: newsItem.key || generateKey(newsItem.title)
        });
        
        if (newsItem.imageUrl) {
          setImagePreview(newsItem.imageUrl);
        }
      }
      
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching news details:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load news details. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Close dialog and reset form
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ ...defaultNewsItem });
    setCurrentNews(null);
    setImagePreview('');
    setImageFile(null);
    setIsEditMode(false);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a title',
        severity: 'error',
      });
      return;
    }
    
    if (!formData.description.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a description',
        severity: 'error',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Prepare the input data
      const input = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        body: formData.body || '',
        imageUrl: formData.imageUrl || '',
        isActive: formData.isActive,
        type: NEWS_TYPE,
        metadata: formData.metadata || {},
        key: formData.key || generateKey(formData.title)
      };
      
      if (isEditMode && currentNews?.key) {
        // Update existing news
        await updateNews({
          variables: {
            key: currentNews.key,
            input
          }
        });
      } else {
        // Create new news
        await createNews({
          variables: {
            input: {
              ...input,
              key: generateKey(formData.title)
            }
          }
        });
      }
    } catch (error) {
      console.error('Error saving news:', error);
      setSnackbar({
        open: true,
        message: `Failed to save news: ${error.message}`,
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle delete confirmation
  const handleDeleteClick = (newsKey) => {
    setNewsToDelete(newsKey);
    setDeleteDialogOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!newsToDelete) return;
    
    try {
      await deleteNews({
        variables: {
          key: newsToDelete
        }
      });
    } catch (error) {
      console.error('Error deleting news:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete news. Please try again.',
        severity: 'error',
      });
    }
  };
  
  // Handle cancel delete
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setNewsToDelete(null);
  };
  
  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };
  
  // Truncate text for preview
  const truncateText = (text, length = 100) => {
    if (!text) return '';
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (loadingNews && !newsData) {
    return <PageLoading />;
  }
  
  if (newsError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading news: {newsError.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'stretch' : 'center', 
        mb: 3,
        gap: 2
      }}>
        <Typography variant="h4" component="h1">News Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
          fullWidth={isMobile}
          size={isMobile ? 'large' : 'medium'}
        >
          Add News
        </Button>
      </Box>

      {/* News List */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : news.length > 0 ? (
        <Grid container spacing={3}>
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                {item.imageUrl && (
                  <Box sx={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.imageUrl}
                      alt={item.title}
                      sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    {!item.isActive && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          px: 1,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                      >
                        DRAFT
                      </Box>
                    )}
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h2"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '3.2em',
                      lineHeight: '1.6',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '4.5em',
                      mb: 1,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      mt: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    {formatDate(item.updatedAt || item.createdAt)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Tooltip title="Edit">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleOpenEditDialog(item)}
                      aria-label="Edit news"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteClick(item.key)}
                      aria-label="Delete news"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Box flexGrow={1} />
                  <Button 
                    size="small" 
                    onClick={() => window.open(`/news/${item.key}`, '_blank')}
                    sx={{ ml: 'auto' }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No news articles found
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Get started by adding your first news article.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
            sx={{ mt: 2 }}
          >
            Add News
          </Button>
        </Paper>
      )}

      {/* Add/Edit News Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 1,
            pb: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}>
            {isEditMode ? 'Edit News Article' : 'Create New News Article'}
            <IconButton 
              onClick={handleCloseDialog}
              size="small"
              sx={{ ml: 1 }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent sx={{ pt: 3, '& > * + *': { mt: 2 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={imagePreview ? 8 : 12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  inputProps={{ maxLength: MAX_TITLE_LENGTH }}
                  helperText={`${formData.title.length}/${MAX_TITLE_LENGTH} characters`}
                />
                
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  margin="normal"
                  inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
                  helperText={`${formData.description.length}/${MAX_DESCRIPTION_LENGTH} characters`}
                />
                
                <Box sx={{ mt: 2, mb: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Content
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    value={formData.body}
                    onChange={(e) => handleInputChange({
                      target: { name: 'body', value: e.target.value }
                    })}
                    placeholder="Write your news content here..."
                  />
                </Box>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      name="isActive"
                      color="primary"
                    />
                  }
                  label={formData.isActive ? 'Published' : 'Draft'}
                  sx={{ mt: 2 }}
                />
              </Grid>
              
              {/* Image Upload Section */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Featured Image
                </Typography>
                
                {imagePreview ? (
                  <Box 
                    sx={{
                      position: 'relative',
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 1,
                      mb: 2,
                    }}
                  >
                    <Box 
                      sx={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '75%', // 4:3 aspect ratio
                        overflow: 'hidden',
                        borderRadius: 1,
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <Tooltip title="Change image">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => {
                              setImagePreview('');
                              setImageFile(null);
                            }}
                            sx={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                            }}
                          >
                            <ImageIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove image">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => {
                              setImagePreview('');
                              setImageFile(null);
                              setFormData(prev => ({
                                ...prev,
                                imageUrl: ''
                              }));
                            }}
                            sx={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    {isUploading && (
                      <Box sx={{ width: '100%', mt: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          Uploading... {Math.round(uploadProgress)}%
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: '2px dashed',
                      borderColor: isDragActive ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <input {...getInputProps()} />
                    <ImageIcon 
                      color="action" 
                      sx={{ fontSize: 48, mb: 1, opacity: 0.6 }} 
                    />
                    <Typography variant="body2" color="textSecondary">
                      {isDragActive 
                        ? 'Drop the image here' 
                        : 'Drag & drop an image here, or click to select'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                      Recommended size: 1200×630px (2:1 aspect ratio)
                    </Typography>
                  </Box>
                )}
                
                {!imagePreview && !isUploading && (
                  <TextField
                    fullWidth
                    label="Or enter image URL"
                    name="imageUrl"
                    value={formData.imageUrl || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    InputProps={{
                      endAdornment: formData.imageUrl && (
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              imageUrl: ''
                            }));
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      ),
                    }}
                  />
                )}
                
                {formData.imageUrl && !imagePreview && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => setImagePreview(formData.imageUrl)}
                  >
                    Use this image
                  </Button>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ 
            p: 2, 
            borderTop: '1px solid',
            borderColor: 'divider',
            justifyContent: 'space-between',
          }}>
            <div>
              {isEditMode && (
                <Button 
                  color="error" 
                  onClick={() => handleDeleteClick(formData.key)}
                  disabled={isSubmitting}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              )}
            </div>
            <Box>
              <Button 
                onClick={handleCloseDialog} 
                disabled={isSubmitting}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                color="primary" 
                variant="contained"
                disabled={isSubmitting || isUploading}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting 
                  ? (isEditMode ? 'Updating...' : 'Creating...')
                  : (isEditMode ? 'Update' : 'Create')}
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete News Article</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this news article? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsManagement;
