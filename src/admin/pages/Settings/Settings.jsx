import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Container, Typography, Button, Paper, TextField, Grid, Divider,
  Snackbar, Alert, CircularProgress,
} from '@mui/material';
import { Save as SaveIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { settingsService } from '../../services/api';

const Settings = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    siteName: 'First Haitian Baptist Church of Kissimmee',
    siteDescription: 'A community of faith, hope, and love',
    adminEmail: 'admin@fhbck.org',
    defaultLanguage: 'en',
    siteLogo: '/images/logo/logo-blog1.png',
    enableBlog: true,
    enableEvents: true,
    enableSermons: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    (async () => {
      const res = await settingsService.get();
      if (res && Object.keys(res).length) setData(prev => ({ ...prev, ...res }));
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsService.update(data);
      setSnackbar({ open: true, message: t('admin.settings.saved'), severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  if (loading) {
    return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" mb={4}>
        <SettingsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        {t('admin.settings.title')}
      </Typography>

      <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>{t('admin.settings.general')}</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label={t('admin.settings.siteName')} value={data.siteName}
                onChange={(e) => update('siteName', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label={t('admin.settings.siteDescription')} multiline rows={2} value={data.siteDescription}
                onChange={(e) => update('siteDescription', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t('admin.settings.adminEmail')} value={data.adminEmail}
                onChange={(e) => update('adminEmail', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t('admin.settings.defaultLanguage')} value={data.defaultLanguage}
                onChange={(e) => update('defaultLanguage', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>{t('admin.settings.siteLogo')}</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  component="img"
                  src={data.siteLogo}
                  alt={t('admin.settings.logoPreview')}
                  sx={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '1px solid', borderColor: 'divider' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <TextField fullWidth label={t('admin.settings.logoUrl')} value={data.siteLogo}
                  onChange={(e) => update('siteLogo', e.target.value)}
                  helperText={t('admin.settings.logoHelper')} />
              </Box>
            </Grid>
          </Grid>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button variant="contained" size="large" startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            onClick={handleSave} disabled={saving}>
            {t('admin.settings.save')}
          </Button>
        </Box>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
