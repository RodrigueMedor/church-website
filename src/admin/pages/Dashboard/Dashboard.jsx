import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Article as ContentIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Image as MediaIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Comment as CommentIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useContent } from '../../context/ContentContext';

const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
  <Card 
    sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            p: 1,
            borderRadius: '50%',
            backgroundColor: `${color}.light`,
            color: `${color}.dark`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
          }}
        >
          <Icon />
        </Box>
      </Box>
      <Typography variant="h4" component="h2">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const RecentActivityItem = ({ icon: Icon, primary, secondary, time, color = 'primary' }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
        <Icon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={primary}
      secondary={
        <>
          {secondary}
          <Typography component="span" variant="caption" color="textSecondary" display="block">
            {time}
          </Typography>
        </>
      }
      primaryTypographyProps={{
        variant: 'subtitle2',
      }}
    />
  </ListItem>
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { contents, loading, getContentsByType } = useContent();
  const [stats, setStats] = useState({
    totalContents: 0,
    activeContents: 0,
    recentContents: [],
    upcomingEvents: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load homepage content
        const homepageContents = await getContentsByType('HOME');
        
        // Calculate stats
        const activeContents = homepageContents.filter(c => c.isActive).length;
        const recentContents = [...homepageContents]
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 3);
        
        // Mock data for demo purposes
        const upcomingEvents = [
          { id: 1, title: 'Sunday Service', date: '2023-11-05T10:00:00Z' },
          { id: 2, title: 'Bible Study', date: '2023-11-07T19:00:00Z' },
          { id: 3, title: 'Prayer Meeting', date: '2023-11-09T18:30:00Z' },
        ];

        setStats({
          totalContents: homepageContents.length,
          activeContents,
          recentContents,
          upcomingEvents,
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box width="100%">
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1">
            <DashboardIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/content/new')}
          >
            Add New Content
          </Button>
        </Box>
        <Typography color="textSecondary">
          Welcome back! Here's what's happening with your website today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Contents"
            value={stats.totalContents}
            icon={ContentIcon}
            color="primary"
            onClick={() => navigate('/admin/content/homepage')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Contents"
            value={stats.activeContents}
            icon={ContentIcon}
            color="success"
            onClick={() => navigate('/admin/content/homepage?filter=active')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents.length}
            icon={EventIcon}
            color="warning"
            onClick={() => navigate('/admin/events')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Media Files"
            value="24"
            icon={MediaIcon}
            color="info"
            onClick={() => navigate('/admin/media')}
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Recent Contents */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Recent Contents</Typography>
              <Button
                size="small"
                color="primary"
                endIcon={<ChevronRightIcon />}
                onClick={() => navigate('/admin/content/homepage')}
              >
                View All
              </Button>
            </Box>
            <List sx={{ width: '100%' }}>
              {stats.recentContents.length > 0 ? (
                stats.recentContents.map((content) => (
                  <React.Fragment key={content.id}>
                    <ListItem 
                      button 
                      onClick={() => navigate(`/admin/content/edit/${content.key}`)}
                      sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                          <ContentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={content.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                              sx={{ display: 'block' }}
                            >
                              {content.description || 'No description'}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="textSecondary"
                            >
                              Updated {formatDate(content.updatedAt)}
                            </Typography>
                          </>
                        }
                        primaryTypographyProps={{
                          variant: 'subtitle2',
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/content/edit/${content.key}`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
                  No recent content found. Create your first content!
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Events & Quick Actions */}
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={3}>
            {/* Upcoming Events */}
            <Grid item>
              <Paper sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6">Upcoming Events</Typography>
                  <Button
                    size="small"
                    color="primary"
                    endIcon={<ChevronRightIcon />}
                    onClick={() => navigate('/admin/events')}
                  >
                    View All
                  </Button>
                </Box>
                <List sx={{ width: '100%' }}>
                  {stats.upcomingEvents.map((event) => (
                    <RecentActivityItem
                      key={event.id}
                      icon={CalendarIcon}
                      primary={event.title}
                      secondary={formatDate(event.date)}
                      time="Upcoming"
                      color="warning"
                    />
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Quick Actions */}
            <Grid item>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => navigate('/admin/content/new')}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      New Content
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<EventIcon />}
                      onClick={() => navigate('/admin/events/new')}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Add Event
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<MediaIcon />}
                      onClick={() => navigate('/admin/media/upload')}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Upload Media
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<PeopleIcon />}
                      onClick={() => navigate('/admin/users')}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Manage Users
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
