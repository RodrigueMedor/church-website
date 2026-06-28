import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Paper, TextField, Grid, IconButton,
  Divider, Chip, Alert, Snackbar, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, Tooltip, Accordion, AccordionSummary,
  AccordionDetails, Tabs, Tab,
} from '@mui/material';
import {
  Save as SaveIcon, Publish as PublishIcon, ArrowBack as ArrowBackIcon,
  Add as AddIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon,
  Image as ImageIcon, Preview as PreviewIcon, Undo as UndoIcon,
  Visibility, Edit,
} from '@mui/icons-material';
import { useCMS } from '../../../cms';
import { contentService } from '../../services/api';
import { pageDefaults } from '../../../cms/defaults';

const sectionDefinitions = {
  homepage: [
    { key: 'hero', label: 'Hero Banner', type: 'object', fields: [
      { key: 'welcome', label: 'Welcome Text' },
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'backgroundImages', label: 'Background Images (one per line)', type: 'array' },
    ]},
    { key: 'serviceTimes', label: 'Service Times', type: 'object', fields: [
      { key: 'sunday', label: 'Sunday' },
      { key: 'wednesday', label: 'Wednesday' },
      { key: 'location', label: 'Location' },
    ]},
    { key: 'features', label: 'Features', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'color', label: 'Color (hex)' },
    ]},
    { key: 'cta', label: 'Call to Action', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
    ]},
  ],
  about: [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
    ]},
    { key: 'mission', label: 'Mission', type: 'value', multiline: true },
    { key: 'vision', label: 'Vision', type: 'value', multiline: true },
    { key: 'coreValues', label: 'Core Values', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'color', label: 'Color' },
    ]},
    { key: 'stats', label: 'Statistics', type: 'array', itemLabel: 'label', fields: [
      { key: 'number', label: 'Number' },
      { key: 'label', label: 'Label' },
    ]},
  ],
  contact: [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
    ]},
    { key: 'address', label: 'Address', type: 'value', multiline: true },
    { key: 'phone', label: 'Phone', type: 'value' },
    { key: 'email', label: 'Email', type: 'value' },
    { key: 'serviceTimes', label: 'Service Times', type: 'array', itemLabel: 'day', fields: [
      { key: 'day', label: 'Day' },
      { key: 'time', label: 'Time' },
    ]},
    { key: 'socialLinks', label: 'Social Links', type: 'array', itemLabel: 'platform', fields: [
      { key: 'platform', label: 'Platform' },
      { key: 'url', label: 'URL' },
    ]},
  ],
  ministries: [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
    ]},
    { key: 'tagline', label: 'Tagline', type: 'value', multiline: true },
    { key: 'scripture', label: 'Scripture Reference', type: 'value' },
    { key: 'ministries', label: 'Ministry List', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'color', label: 'Color' },
      { key: 'meetingTime', label: 'Meeting Time' },
      { key: 'link', label: 'Link Path' },
    ]},
  ],
  sermons: [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
    ]},
    { key: 'stats', label: 'Statistics', type: 'array', itemLabel: 'label', fields: [
      { key: 'number', label: 'Number' },
      { key: 'label', label: 'Label' },
    ]},
  ],
  events: [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
    ]},
    { key: 'items', label: 'Events', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'date', label: 'Date' },
      { key: 'time', label: 'Time' },
      { key: 'location', label: 'Location' },
      { key: 'category', label: 'Category' },
    ]},
    { key: 'stats', label: 'Statistics', type: 'array', itemLabel: 'label', fields: [
      { key: 'number', label: 'Number' },
      { key: 'label', label: 'Label' },
    ]},
  ],
  footer: [
    { key: 'address', label: 'Address', type: 'value', multiline: true },
    { key: 'phone', label: 'Phone', type: 'value' },
    { key: 'email', label: 'Email', type: 'value' },
    { key: 'serviceTimes', label: 'Service Times', type: 'object', fields: [
      { key: 'sunday', label: 'Sunday' },
      { key: 'wednesday', label: 'Wednesday' },
    ]},
    { key: 'socialLinks', label: 'Social Links', type: 'array', itemLabel: 'platform', fields: [
      { key: 'platform', label: 'Platform' },
      { key: 'url', label: 'URL' },
    ]},
  ],
  news: [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
    ]},
  ],
};

const childPages = ['children', 'youth', 'women', 'men', 'couples'];
childPages.forEach(key => {
  sectionDefinitions[key] = [
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
    ]},
    { key: 'activities', label: 'Activities', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
    ]},
    { key: 'schedule', label: 'Schedule', type: 'array', itemLabel: 'day', fields: [
      { key: 'day', label: 'Day' },
      { key: 'time', label: 'Time' },
      { key: 'activity', label: 'Activity' },
    ]},
    { key: 'leaders', label: 'Leaders', type: 'array', itemLabel: 'name', fields: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'email', label: 'Email' },
    ]},
  ];
});

const PageEditor = () => {
  const { pageKey } = useParams();
  const navigate = useNavigate();
  const cms = useCMS();
  const [pageData, setPageData] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [resetDialog, setResetDialog] = useState(false);

  const sections = sectionDefinitions[pageKey] || [];
  const pageName = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);
  const status = contentService.getStatus(pageKey);
  const hasDraft = !!contentService.getDraft(pageKey);

  useEffect(() => {
    setLoading(true);
    const data = cms.getEffectiveContent(pageKey) || {};
    const defaults = pageDefaults[pageKey] || {};
    setDefaultData(defaults);
    setPageData({ ...data });
    setLoading(false);
  }, [pageKey, cms.refreshKey]);

  const updateValue = useCallback((section, field, value) => {
    setPageData(prev => {
      if (!prev) return prev;
      const updated = { ...prev };

      if (section === '_root') {
        updated[field] = value;
      } else if (Array.isArray(prev[section])) {
        updated[section] = value;
      } else if (typeof prev[section] === 'object' && prev[section] !== null) {
        updated[section] = { ...prev[section], [field]: value };
      } else {
        updated[section] = value;
      }
      return updated;
    });
  }, []);

  const updateArrayItem = useCallback((section, index, field, value) => {
    setPageData(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      const arr = [...(updated[section] || [])];
      arr[index] = { ...arr[index], [field]: value };
      updated[section] = arr;
      return updated;
    });
  }, []);

  const addArrayItem = useCallback((section) => {
    setPageData(prev => {
      if (!prev) return prev;
      const def = sections.find(s => s.key === section);
      const empty = {};
      if (def?.fields) def.fields.forEach(f => { empty[f.key] = ''; });
      return { ...prev, [section]: [...(prev[section] || []), empty] };
    });
  }, [sections]);

  const removeArrayItem = useCallback((section, index) => {
    setPageData(prev => {
      if (!prev) return prev;
      const arr = [...(prev[section] || [])];
      arr.splice(index, 1);
      return { ...prev, [section]: arr };
    });
  }, []);

  const moveArrayItem = useCallback((section, from, to) => {
    setPageData(prev => {
      if (!prev) return prev;
      const arr = [...(prev[section] || [])];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return { ...prev, [section]: arr };
    });
  }, []);

  const handleSaveDraft = () => {
    setSaving(true);
    try {
      cms.saveDraft(pageKey, pageData);
      setSnackbar({ open: true, message: 'Draft saved!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = () => {
    setSaving(true);
    try {
      cms.saveDraft(pageKey, pageData);
      cms.publish(pageKey);
      setSnackbar({ open: true, message: 'Published! Changes are now live.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPageData({ ...defaultData });
    cms.saveDraft(pageKey, defaultData);
    setResetDialog(false);
    setSnackbar({ open: true, message: 'Reset to defaults', severity: 'info' });
  };

  const renderField = (section, field, value, onChange) => {
    const isMultiline = field.multiline;
    const valueStr = value !== undefined && value !== null ? String(value) : '';

    return (
      <TextField
        fullWidth
        label={field.label}
        value={valueStr}
        onChange={(e) => onChange(section, field.key, e.target.value)}
        multiline={isMultiline}
        rows={isMultiline ? 3 : 1}
        size="small"
      />
    );
  };

  const renderSectionObject = (section) => {
    const data = pageData?.[section.key] || {};
    return (
      <Grid container spacing={2}>
        {section.fields.map(field => (
          <Grid item xs={12} sm={field.multiline ? 12 : 6} key={field.key}>
            {renderField(section.key, field, data[field.key], updateValue)}
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSectionValue = (section) => {
    const value = pageData?.[section.key] ?? '';
    return (
      <TextField
        fullWidth
        label={section.label}
        value={String(value)}
        onChange={(e) => updateValue('_root', section.key, e.target.value)}
        multiline={section.multiline}
        rows={section.multiline ? 4 : 1}
      />
    );
  };

  const renderSectionArray = (section) => {
    const items = pageData?.[section.key] || [];
    return (
      <>
        {items.map((item, idx) => (
          <Accordion key={idx} defaultExpanded={items.length <= 3} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle2">{item[section.itemLabel] || `${section.label} #${idx + 1}`}</Typography>
                <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); removeArrayItem(section.key, idx); }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {section.fields.map(field => (
                  <Grid item xs={12} sm={field.multiline ? 12 : 6} key={field.key}>
                    <TextField
                      fullWidth
                      label={field.label}
                      value={String(item[field.key] ?? '')}
                      onChange={(e) => updateArrayItem(section.key, idx, field.key, e.target.value)}
                      multiline={field.multiline}
                      rows={field.multiline ? 3 : 1}
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => addArrayItem(section.key)} variant="outlined" size="small" sx={{ mt: 1 }}>
          Add {section.label}
        </Button>
      </>
    );
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={() => navigate('/admin/pages')}><ArrowBackIcon /></IconButton>
            <Box>
              <Typography variant="h5" component="h1">{pageName}</Typography>
              <Box display="flex" gap={1} mt={0.5}>
                <Chip label={`/admin/pages/${pageKey}`} size="small" variant="outlined" />
                <Chip label={status === 'published' ? 'Published' : 'Draft'}
                  size="small" color={status === 'published' ? 'success' : 'warning'} />
                {hasDraft && <Chip label="Has Draft" size="small" color="info" />}
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button variant="outlined" color="warning" startIcon={<UndoIcon />}
              onClick={() => setResetDialog(true)} size="small">
              Reset
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />}
              onClick={handleSaveDraft} disabled={saving}>
              Save Draft
            </Button>
            <Button variant="contained" color="success" startIcon={<PublishIcon />}
              onClick={handlePublish} disabled={saving}>
              Publish
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Sections */}
      {sections.map(section => (
        <Paper key={section.key} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>{section.label}</Typography>
          <Divider sx={{ mb: 2 }} />
          {section.type === 'object' && renderSectionObject(section)}
          {section.type === 'value' && renderSectionValue(section)}
          {section.type === 'array' && renderSectionArray(section)}
        </Paper>
      ))}

      {sections.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="textSecondary">
            This page doesn't have editable sections defined yet.
          </Typography>
        </Paper>
      )}

      {/* Footer save bar */}
      <Paper sx={{ p: 2, position: 'sticky', bottom: 0, zIndex: 10, bgcolor: 'background.paper' }}>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSaveDraft} disabled={saving}>
            Save Draft
          </Button>
          <Button variant="contained" color="success" startIcon={<PublishIcon />} onClick={handlePublish} disabled={saving}>
            Publish Now
          </Button>
        </Box>
      </Paper>

      {/* Reset dialog */}
      <Dialog open={resetDialog} onClose={() => setResetDialog(false)}>
        <DialogTitle>Reset to Defaults?</DialogTitle>
        <DialogContent>
          <Typography>This will discard all your changes and reset to factory defaults.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialog(false)}>Cancel</Button>
          <Button onClick={handleReset} color="warning" variant="contained">Reset</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PageEditor;
