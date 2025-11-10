import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert
} from '@mui/material';
import { ContentPaste as ContentIcon, Edit as EditIcon } from '@mui/icons-material';

const HomepageContent = () => {
  const { 
    contents, 
    loading, 
    error,
    getContentsByType,
    createContent,
    updateContent
  } = useContent();
  
  const navigate = useNavigate();
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    key: '',
    title: '',
    description: '',
    body: '',
    type: 'HOME',
    isActive: true
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      await getContentsByType('HOME');
    } catch (err) {
      showSnackbar('Failed to load content', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContent) {
        await updateContent(editingContent.key, formData);
        showSnackbar('Content updated successfully');
      } else {
        await createContent({
          ...formData,
          key: formData.key.toLowerCase().replace(/\s+/g, '-')
        });
        showSnackbar('Content created successfully');
      }
      resetForm();
      loadContents();
    } catch (err) {
      showSnackbar(err.message || 'An error occurred', 'error');
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      key: content.key,
      title: content.title,
      description: content.description || '',
      body: content.body || '',
      type: content.type,
      isActive: content.isActive
    });
  };

  const resetForm = () => {
    setEditingContent(null);
    setFormData({
      key: '',
      title: '',
      description: '',
      body: '',
      type: 'HOME',
      isActive: true
    });
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  if (loading && !contents.length) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" my={4}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box my={4}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            <ContentIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Homepage Content
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/admin/content/new')}
          >
            Add New Content
          </Button>
        </Box>

        {/* Content Form */}
        <Box component="form" onSubmit={handleSubmit} mb={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {editingContent ? 'Edit Content' : 'Add New Content'}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Key"
                    name="key"
                    value={formData.key}
                    onChange={handleInputChange}
                    required
                    disabled={!!editingContent}
                    helperText="A unique identifier for this content (e.g., home-hero)"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      label="Type"
                      required
                    >
                      <MenuItem value="HOME">Homepage</MenuItem>
                      <MenuItem value="HERO">Hero Section</MenuItem>
                      <MenuItem value="FEATURE">Feature</MenuItem>
                      <MenuItem value="TESTIMONIAL">Testimonial</MenuItem>
                    </Select>
                    <FormHelperText>Select the content type</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Body Content"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              {editingContent && (
                <Button onClick={resetForm} color="inherit">
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {editingContent ? 'Update' : 'Create'} Content
              </Button>
            </CardActions>
          </Card>
        </Box>

        {/* Content List */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Existing Content
          </Typography>
          <Grid container spacing={3}>
            {contents.map((content) => (
              <Grid item xs={12} md={6} key={content.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6" component="h3">
                          {content.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Key: {content.key} | Type: {content.type}
                        </Typography>
                        {content.description && (
                          <Typography variant="body1" paragraph>
                            {content.description}
                          </Typography>
                        )}
                      </Box>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(content)}
                      >
                        Edit
                      </Button>
                    </Box>
                    {content.body && (
                      <Box 
                        mt={2} 
                        p={2} 
                        bgcolor="action.hover" 
                        borderRadius={1}
                        maxHeight={150}
                        overflow="auto"
                      >
                        <Typography variant="body2" component="div">
                          <div dangerouslySetInnerHTML={{ __html: content.body }} />
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HomepageContent;
