import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box, Container, Typography, Button, Paper, TextField, Grid, IconButton,
  Divider, Chip, Alert, Snackbar, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, Accordion, AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Save as SaveIcon, ArrowBack as ArrowBackIcon,
  Add as AddIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';
import CMS_API, { notifyContentSaved } from '../../../services/cmsApi';
import { pageDefaults } from '../../../cms/defaults';

const sectionDefinitions = {
  homepage: [
    { key: 'hero', label: 'Hero Banner', type: 'object', fields: [
      { key: 'welcome', label: 'Welcome Text' },
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'backgroundImages', label: 'Background Images (one per line)', type: 'array' },
      { key: 'slides', label: 'Slides (per-slide content)', type: 'array', itemLabel: 'title', fields: [
        { key: 'image', label: 'Image URL' },
        { key: 'title', label: 'Slide Title' },
        { key: 'subtitle', label: 'Slide Subtitle', multiline: true },
        { key: 'buttonText', label: 'Button Text' },
        { key: 'buttonLink', label: 'Button Link' },
        { key: 'secondaryText', label: 'Secondary Button Text (optional)' },
        { key: 'secondaryLink', label: 'Secondary Button Link (optional)' },
      ]},
    ]},
    { key: 'welcome', label: 'Welcome Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'mission', label: 'Mission Statement', multiline: true },
      { key: 'image', label: 'Image URL' },
      { key: 'buttonText', label: 'Button Text' },
      { key: 'buttonLink', label: 'Button Link' },
    ]},
    { key: 'serviceTimes', label: 'Service Times (Bar)', type: 'object', fields: [
      { key: 'sunday', label: 'Sunday' },
      { key: 'wednesday', label: 'Wednesday' },
      { key: 'location', label: 'Location' },
    ]},
    { key: 'serviceTimesCards', label: 'Service Times Cards', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'time', label: 'Time' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'icon', label: 'Icon (Church, School, MenuBook, etc.)' },
      { key: 'color', label: 'Color (hex)' },
    ]},
    { key: 'features', label: 'Features', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'image', label: 'Image URL' },
      { key: 'color', label: 'Color (hex)' },
    ]},
    { key: 'communitySection', label: 'Our Community Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'image', label: 'Background Image URL' },
    ]},
    { key: 'upcomingGatherings', label: 'Upcoming Events Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle', multiline: true },
      { key: 'image', label: 'Background Image URL' },
    ]},
    { key: 'latestSermons', label: 'Latest Sermons Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle', multiline: true },
    ]},
    { key: 'meetPastor', label: 'Meet Our Pastor Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle', multiline: true },
    ]},
    { key: 'planYourVisit', label: 'Plan Your Visit Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'address', label: 'Address' },
      { key: 'buttonText', label: 'Button Text' },
      { key: 'buttonLink', label: 'Button Link (Google Maps URL)' },
      { key: 'contactText', label: 'Contact Button Text' },
      { key: 'contactLink', label: 'Contact Button Link' },
    ]},
    { key: 'testimonials', label: 'Testimonials Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle', multiline: true },
    ]},
    { key: 'giveOnline', label: 'Give Online Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'buttonText', label: 'Button Text' },
      { key: 'buttonLink', label: 'Button Link' },
    ]},
    { key: 'latestNews', label: 'Latest News Section', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle', multiline: true },
      { key: 'image', label: 'Background Image URL' },
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
    { key: 'staffData', label: 'Staff / Pastoral Team', type: 'array', itemLabel: 'name', fields: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'bio', label: 'Bio', multiline: true },
      { key: 'fullBio', label: 'Full Bio', multiline: true },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'experience', label: 'Experience (e.g. "20+ years")' },
      { key: 'image', label: 'Image URL (e.g. /images/staff/photo.jpg)' },
    ]},
    { key: 'otherLeaders', label: 'Other Church Leaders', type: 'array', itemLabel: 'name', fields: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'bio', label: 'Bio', multiline: true },
      { key: 'email', label: 'Email' },
      { key: 'image', label: 'Image URL (e.g. /images/staff/photo.jpg)' },
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
      { key: 'image', label: 'Image URL' },
      { key: 'date', label: 'Date' },
      { key: 'time', label: 'Time' },
      { key: 'location', label: 'Location' },
      { key: 'category', label: 'Category' },
      { key: 'attendees', label: 'Attendees (e.g. 200+)' },
      { key: 'color', label: 'Accent Color (hex)' },
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

const ministryPageKeys = {
  'children': 'children-ministry',
  'youth': 'youth-ministry',
  'women': 'women-ministry',
  'men': 'men-ministry',
  'couples': 'young-couples-ministry',
  'worship': 'worship-ministry',
};
Object.entries(ministryPageKeys).forEach(([shortKey, pageKey]) => {
  sectionDefinitions[pageKey] = [
    { key: 'name', label: 'Ministry Name', type: 'value' },
    { key: 'description', label: 'Description', type: 'value', multiline: true },
    { key: 'hero', label: 'Hero', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'verse', label: 'Verse' },
      { key: 'heroImagePosition', label: 'Image Position (e.g. center, top)' },
    ]},
    { key: 'heroStats', label: 'Hero Stats', type: 'array', itemLabel: 'label', fields: [
      { key: 'number', label: 'Number' },
      { key: 'label', label: 'Label' },
    ]},
    { key: 'activities', label: 'What We Do', type: 'array', itemLabel: 'title', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'icon', label: 'Icon name (e.g. Heart, School, Group)' },
      { key: 'schedule', label: 'Schedule (e.g. Sundays 9:30 AM)' },
    ]},
    { key: 'leaders', label: 'Leaders', type: 'array', itemLabel: 'name', fields: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'image', label: 'Image URL' },
      { key: 'email', label: 'Email' },
      { key: 'experience', label: 'Experience (e.g. 10+ years)' },
    ]},
    { key: 'cta', label: 'Call to Action', type: 'object', fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'buttonText', label: 'Button Text' },
      { key: 'buttonLink', label: 'Button Link (e.g. /contact)' },
    ]},
  ];
});

const shortToKebab = {
  children: 'children-ministry',
  youth: 'youth-ministry',
  women: 'women-ministry',
  men: 'men-ministry',
  couples: 'young-couples-ministry',
  worship: 'worship-ministry',
};

const PageEditor = () => {
  const { pageKey: rawKey } = useParams();
  const navigate = useNavigate();
  const pageKey = shortToKebab[rawKey] || rawKey;

  useEffect(() => {
    if (shortToKebab[rawKey]) {
      navigate(`/admin/pages/${pageKey}`, { replace: true });
    }
  }, [rawKey, pageKey, navigate]);
  const { t } = useTranslation();
  const [pageData, setPageData] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [resetDialog, setResetDialog] = useState(false);

  const sections = sectionDefinitions[pageKey] || [];
  const pageName = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);

  useEffect(() => {
    setLoading(true);
    const defaults = pageDefaults[pageKey] || {};
    setDefaultData(defaults);

    CMS_API.fetchPageContentFull(pageKey).then(data => {
      if (data && typeof data === 'object' && Object.keys(data).length > 1) {
        const merged = { ...defaults, ...data };
        if (data.leaders && defaults.leaders) {
          merged.leaders = data.leaders.map((l, i) => ({ ...(defaults.leaders?.[i] || {}), ...l }));
        }
        setPageData(merged);
        setSaved(true);
      } else {
        setPageData({ ...defaults });
        setSaved(false);
      }
      setLoading(false);
    }).catch(() => {
      setPageData({ ...defaults });
      setSaved(false);
      setLoading(false);
    });
  }, [pageKey]);

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

  const handleSave = async () => {
    setSaving(true);
    try {
      await CMS_API.savePageContentFull(pageKey, pageData);
      setSaved(true);
      notifyContentSaved(pageKey);
      setSnackbar({ open: true, message: t('admin.pageEditor.savedSuccess'), severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPageData({ ...defaultData });
    setSaved(false);
    setResetDialog(false);
    setSnackbar({ open: true, message: t('admin.pageEditor.resetSuccess'), severity: 'info' });
  };

  const renderField = (section, field, value, onChange) => {
    return (
      <TextField
        fullWidth label={field.label}
        value={value !== undefined && value !== null ? String(value) : ''}
        onChange={(e) => onChange(section, field.key, e.target.value)}
        multiline={field.multiline} rows={field.multiline ? 3 : 1} size="small"
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
    return (
      <TextField
        fullWidth label={section.label}
        value={String(pageData?.[section.key] ?? '')}
        onChange={(e) => updateValue('_root', section.key, e.target.value)}
        multiline={section.multiline} rows={section.multiline ? 4 : 1}
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
                      fullWidth label={field.label}
                      value={String(item[field.key] ?? '')}
                      onChange={(e) => updateArrayItem(section.key, idx, field.key, e.target.value)}
                      multiline={field.multiline} rows={field.multiline ? 3 : 1} size="small"
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => addArrayItem(section.key)} variant="outlined" size="small" sx={{ mt: 1 }}>
          {t('admin.pageEditor.add', { label: section.label })}
        </Button>
      </>
    );
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={() => navigate('/admin/pages')}><ArrowBackIcon /></IconButton>
            <Box>
              <Typography variant="h5" component="h1">{pageName}</Typography>
              <Box display="flex" gap={1} mt={0.5}>
                <Chip label={`/admin/pages/${pageKey}`} size="small" variant="outlined" />
                <Chip label={saved ? t('admin.pageEditor.savedApi') : t('admin.pageEditor.defaults')} size="small" color={saved ? 'success' : 'warning'} />
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button variant="outlined" color="warning" startIcon={<UndoIcon />}
              onClick={() => setResetDialog(true)} size="small">{t('admin.pageEditor.reset')}</Button>
            <Button variant="contained" startIcon={<SaveIcon />}
              onClick={handleSave} disabled={saving}>
              {saving ? <CircularProgress size={20} /> : t('admin.pageEditor.save')}
            </Button>
          </Box>
        </Box>
      </Paper>

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
          <Typography color="textSecondary">{t('admin.pageEditor.noSections')}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 2, position: 'sticky', bottom: 0, zIndex: 10, bgcolor: 'background.paper' }}>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : t('admin.pageEditor.saveChanges')}
          </Button>
        </Box>
      </Paper>

      <Dialog open={resetDialog} onClose={() => setResetDialog(false)}>
        <DialogTitle>{t('admin.pageEditor.resetConfirm')}</DialogTitle>
        <DialogContent><Typography>{t('admin.pageEditor.resetMessage')}</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialog(false)}>{t('admin.crud.cancel')}</Button>
          <Button onClick={handleReset} color="warning" variant="contained">{t('admin.pageEditor.reset')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default PageEditor;
