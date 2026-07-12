import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      showSnackbar(t('admin.homepage.failedLoad'), 'error');
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
        showSnackbar(t('admin.homepage.updated'));
      } else {
        await createContent({
          ...formData,
          key: formData.key.toLowerCase().replace(/\s+/g, '-')
        });
        showSnackbar(t('admin.homepage.created'));
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
          <Typography>{t('admin.homepage.loading')}</Typography>
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
            {t('admin.homepage.title')}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/admin/content/new')}
          >
            {t('admin.homepage.addNew')}
          </Button>
        </Box>

        {/* Content Form */}
        <Box component="form" onSubmit={handleSubmit} mb={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {editingContent ? t('admin.homepage.editContent') : t('admin.homepage.addNew')}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('admin.homepage.key')}
                    name="key"
                    value={formData.key}
                    onChange={handleInputChange}
                    required
                    disabled={!!editingContent}
                    helperText={t('admin.homepage.keyHelper')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('admin.homepage.type')}</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      label={t('admin.homepage.type')}
                      required
                    >
                      <MenuItem value="HOME">Homepage</MenuItem>
                      <MenuItem value="HERO">Hero Section</MenuItem>
                      <MenuItem value="FEATURE">Feature</MenuItem>
                      <MenuItem value="TESTIMONIAL">Testimonial</MenuItem>
                    </Select>
                    <FormHelperText>{t('admin.homepage.selectType')}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('admin.homepage.titleField')}
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('admin.homepage.description')}
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
                    label={t('admin.homepage.body')}
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
                  {t('admin.homepage.cancel')}
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {editingContent ? t('admin.homepage.updateContent') : t('admin.homepage.createContent')}
              </Button>
            </CardActions>
          </Card>
        </Box>

        {/* Content List */}
        <Box>
          <Typography variant="h6" gutterBottom>
            {t('admin.homepage.existing')}
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
                        {t('admin.homepage.editContent')}
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
