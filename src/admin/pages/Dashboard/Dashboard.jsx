import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box, Container, Grid, Paper, Typography, Button, Card, CardContent,
} from '@mui/material';
import {
  Dashboard as DashboardIcon, Article as ContentIcon, Event as EventIcon,
  Image as MediaIcon, Add as AddIcon,
  CalendarToday as CalendarIcon, CheckCircle as PublishedIcon,
  Edit as DraftIcon, Email as EmailIcon,
} from '@mui/icons-material';
import api from '../../../services/api';
import { useNotifications } from '../../context/NotificationContext';

const apiGet = (path, params) => api.get(path, params, true);

const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
  <Card sx={{
    height: '100%', display: 'flex', flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }, cursor: 'pointer',
  }} onClick={onClick}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography color="textSecondary" gutterBottom>{title}</Typography>
        <Box sx={{ p: 1, borderRadius: '50%', backgroundColor: `${color}.light`, color: `${color}.dark`, display: 'flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
          <Icon />
        </Box>
      </Box>
      <Typography variant="h4" component="h2">{value}</Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { unreadCount } = useNotifications();
  const [stats, setStats] = useState({ totalPages: 0, mediaCount: 0, pageKeys: [] });

  useEffect(() => {
    Promise.all([
      apiGet('/admin/page-content').catch(() => []),
      apiGet('/admin/media').catch(() => []),
    ]).then(([pages, media]) => {
      setStats({
        totalPages: Array.isArray(pages) ? pages.length : 0,
        pageKeys: Array.isArray(pages) ? pages.map(p => p.pageKey) : [],
        mediaCount: Array.isArray(media) ? media.length : 0,
      });
    });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          <DashboardIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          {t('admin.dashboard.title')}
        </Typography>
        <Typography color="textSecondary">{t('admin.dashboard.subtitle')}</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('admin.dashboard.savedPages')} value={stats.totalPages} icon={ContentIcon} color="primary" onClick={() => navigate('/admin/pages')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('admin.dashboard.mediaFiles')} value={stats.mediaCount} icon={MediaIcon} color="info" onClick={() => navigate('/admin/media')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('admin.dashboard.unreadMessages')} value={unreadCount} icon={EmailIcon} color="warning" onClick={() => navigate('/admin/contact-messages')} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>{t('admin.dashboard.quickActions')}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<AddIcon />}
                  onClick={() => navigate('/admin/pages')} sx={{ justifyContent: 'flex-start' }}>
                  {t('admin.dashboard.editPages')}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<EventIcon />}
                  onClick={() => navigate('/admin/pages/events')} sx={{ justifyContent: 'flex-start' }}>
                  {t('admin.dashboard.editEvents')}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<MediaIcon />}
                  onClick={() => navigate('/admin/media')} sx={{ justifyContent: 'flex-start' }}>
                  {t('admin.dashboard.mediaLibrary')}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<ContentIcon />}
                  onClick={() => navigate('/admin/pages/homepage')} sx={{ justifyContent: 'flex-start' }}>
                  {t('admin.dashboard.editHomepage')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
