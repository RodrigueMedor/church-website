import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Paper, Typography, Button, Card, CardContent,
  useTheme, useMediaQuery, LinearProgress,
  List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon, Article as ContentIcon, Event as EventIcon,
  Image as MediaIcon, ChevronRight as ChevronRightIcon, Add as AddIcon,
  Edit as EditIcon, CalendarToday as CalendarIcon, CheckCircle as PublishedIcon,
  Edit as DraftIcon,
} from '@mui/icons-material';
import { storage } from '../../../cms';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalPages: 0, publishedPages: 0, draftPages: 0, mediaCount: 0 });

  useEffect(() => {
    const pages = storage.getAllPages();
    const media = storage.get('media_images') || [];
    setStats({
      totalPages: pages.length,
      publishedPages: pages.filter(p => p.status === 'published').length,
      draftPages: pages.filter(p => p.hasDraft).length,
      mediaCount: media.length,
    });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          <DashboardIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Dashboard
        </Typography>
        <Typography color="textSecondary">Welcome to the Content Management System.</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Pages" value={stats.totalPages} icon={ContentIcon} color="primary" onClick={() => navigate('/admin/pages')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Published" value={stats.publishedPages} icon={PublishedIcon} color="success" onClick={() => navigate('/admin/pages')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Drafts" value={stats.draftPages} icon={DraftIcon} color="warning" onClick={() => navigate('/admin/pages')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Media Files" value={stats.mediaCount} icon={MediaIcon} color="info" onClick={() => navigate('/admin/media')} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<AddIcon />}
                  onClick={() => navigate('/admin/pages')} sx={{ justifyContent: 'flex-start' }}>
                  Edit Pages
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<EventIcon />}
                  onClick={() => navigate('/admin/pages/events')} sx={{ justifyContent: 'flex-start' }}>
                  Edit Events
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<MediaIcon />}
                  onClick={() => navigate('/admin/media')} sx={{ justifyContent: 'flex-start' }}>
                  Media Library
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<ContentIcon />}
                  onClick={() => navigate('/admin/pages/homepage')} sx={{ justifyContent: 'flex-start' }}>
                  Edit Homepage
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
