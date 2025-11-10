import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Event as EventIcon,
  MenuBook as SermonIcon,
  Image as MediaIcon,
  Description as PageIcon,
  People as UserIcon,
  Category as CategoryIcon,
  ListAlt as FormIcon,
  Notifications as NotificationIcon,
  BarChart as StatsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StatCard = ({ title, value, icon: Icon, color = 'primary', trend, trendText }) => {
  const TrendIcon = trend === 'up' ? 
    <Box component="span" sx={{ color: 'success.main', display: 'flex', alignItems: 'center' }}>↑</Box> : 
    <Box component="span" sx={{ color: 'error.main', display: 'flex', alignItems: 'center' }}>↓</Box>;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}.light`,
            color: `${color}.main`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon fontSize="medium" />
        </Box>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {TrendIcon}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              {trendText}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Paper>
  );
};

const QuickAction = ({ icon: Icon, title, description, color = 'primary' }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3,
        borderColor: `${color}.main`,
      },
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: `${color}.light`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        color: `${color}.main`,
      }}
    >
      <Icon />
    </Box>
    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Pages', value: '24', icon: PageIcon, color: 'primary', trend: 'up', trendText: '12%' },
    { title: 'Upcoming Events', value: '8', icon: EventIcon, color: 'secondary', trend: 'down', trendText: '5%' },
    { title: 'Sermons', value: '45', icon: SermonIcon, color: 'success', trend: 'up', trendText: '23%' },
    { title: 'Media Files', value: '128', icon: MediaIcon, color: 'warning', trend: 'up', trendText: '8%' },
  ];

  const quickActions = [
    { 
      title: 'Add New Page', 
      description: 'Create a new page for your website', 
      icon: PageIcon, 
      color: 'primary' 
    },
    { 
      title: 'Schedule Event', 
      description: 'Add a new event to the calendar', 
      icon: EventIcon, 
      color: 'secondary' 
    },
    { 
      title: 'Upload Media', 
      description: 'Add images, videos, or documents', 
      icon: MediaIcon, 
      color: 'success' 
    },
    { 
      title: 'View Analytics', 
      description: 'Check website performance', 
      icon: StatsIcon, 
      color: 'info' 
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your church website today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <QuickAction {...action} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <NotificationIcon color="action" />
            </Box>
            {/* Activity list would go here */}
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Typography>No recent activity</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Quick Stats
            </Typography>
            {/* Stats would go here */}
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Typography>Stats will appear here</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
