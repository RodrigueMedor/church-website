import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Groups, 
  Church, 
  CalendarToday, 
  AccessTime,
  LocationOn,
  Person,
  Star,
  Favorite,
  Lightbulb,
  Book,
  People,
  VolunteerActivism,
  ChildCare,
  School,
  EmojiEvents
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ChildrenMinistryPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const childrenLeaders = [
    {
      name: t('children.leader1.name'),
      role: t('children.leader1.role'),
      description: t('children.leader1.description')
    },
    {
      name: t('children.leader2.name'), 
      role: t('children.leader2.role'),
      description: t('children.leader2.description')
    }
  ];

  const activities = [
    {
      icon: <School color="primary" />,
      title: t('children.sundaySchool.title'),
      description: t('children.sundaySchool.description')
    },
    {
      icon: <ChildCare color="primary" />,
      title: t('children.nursery.title'),
      description: t('children.nursery.description')
    },
    {
      icon: <EmojiEvents color="primary" />,
      title: t('children.vbs.title'),
      description: t('children.vbs.description')
    },
    {
      icon: <Book color="primary" />,
      title: t('children.bibleClub.title'),
      description: t('children.bibleClub.description')
    }
  ];

  const schedule = [
    {
      day: t('children.sunday.day'),
      time: t('children.sunday.time'),
      activity: t('children.sunday.activity'),
      description: t('children.sunday.description')
    },
    {
      day: t('children.wednesday.day'),
      time: t('children.wednesday.time'), 
      activity: t('children.wednesday.activity'),
      description: t('children.wednesday.description')
    }
  ];

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, md: 400 },
          backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.7), rgba(26, 54, 93, 0.7)), url(/images/banner/children-banner.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            {t('children.title')}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            {t('children.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 3,
              color: 'primary.main'
            }}
          >
            {t('children.welcome')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: 'text.secondary'
            }}
          >
            {t('children.welcomeDescription')}
          </Typography>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              textAlign: 'center',
              color: 'primary.main'
            }}
          >
            {t('children.mission')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1.1rem',
              textAlign: 'center',
              mb: 4,
              color: 'text.secondary'
            }}
          >
            {t('children.missionDescription1')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1.1rem',
              textAlign: 'center',
              mb: 4,
              color: 'text.secondary'
            }}
          >
            {t('children.missionDescription2')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              fontWeight: 600,
              color: 'primary.main',
              fontStyle: 'italic'
            }}
          >
            {t('children.everyoneWelcome')}
          </Typography>
        </Box>

        {/* Activities Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              textAlign: 'center',
              color: 'primary.main'
            }}
          >
            {t('children.whatWeDo')}
          </Typography>
          <Grid container spacing={4}>
            {activities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {activity.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Schedule Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              textAlign: 'center',
              color: 'primary.main'
            }}
          >
            {t('children.whenWeMeet')}
          </Typography>
          <Grid container spacing={4}>
            {schedule.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  sx={{ 
                    p: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.day}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.time}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.activity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Leaders Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              textAlign: 'center',
              color: 'primary.main'
            }}
          >
            {t('children.ourLeaders')}
          </Typography>
          <Grid container spacing={4}>
            {childrenLeaders.map((leader, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ p: 3, textAlign: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: 'auto', 
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '2rem'
                    }}
                  >
                    {leader.name.split(' ')[1][0]}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {leader.name}
                  </Typography>
                  <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>
                    {leader.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {leader.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center',
            p: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            {t('children.readyToJoin')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {t('children.readyToJoinDescription')}
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            {t('children.getConnected')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ChildrenMinistryPage;
