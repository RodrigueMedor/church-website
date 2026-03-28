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
  FamilyRestroom,
  Heart,
  Home
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const YoungCouplesMinistryPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const couplesLeaders = [
    {
      name: t('youngCouples.leader1.name'),
      role: t('youngCouples.leader1.role'),
      description: t('youngCouples.leader1.description')
    },
    {
      name: t('youngCouples.leader2.name'), 
      role: t('youngCouples.leader2.role'),
      description: t('youngCouples.leader2.description')
    }
  ];

  const activities = [
    {
      icon: <Book color="primary" />,
      title: t('youngCouples.bibleStudy.title'),
      description: t('youngCouples.bibleStudy.description')
    },
    {
      icon: <Favorite color="primary" />,
      title: t('youngCouples.fellowship.title'),
      description: t('youngCouples.fellowship.description')
    },
    {
      icon: <People color="primary" />,
      title: t('youngCouples.outreach.title'),
      description: t('youngCouples.outreach.description')
    },
    {
      icon: <Church color="primary" />,
      title: t('youngCouples.worship.title'),
      description: t('youngCouples.worship.description')
    }
  ];

  const schedule = [
    {
      day: t('youngCouples.friday.day'),
      time: t('youngCouples.friday.time'),
      activity: t('youngCouples.friday.activity'),
      description: t('youngCouples.friday.description')
    },
    {
      day: t('youngCouples.saturday.day'),
      time: t('youngCouples.saturday.time'), 
      activity: t('youngCouples.saturday.activity'),
      description: t('youngCouples.saturday.description')
    }
  ];

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, md: 400 },
          backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.7), rgba(26, 54, 93, 0.7)), url(/images/banner/ycm-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
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
            {t('youngCouples.title')}
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
            {t('youngCouples.subtitle')}
          </Typography>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontStyle: 'italic',
                opacity: 0.8,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              {t('youngCouples.verse')}
            </Typography>
          </Box>
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
            {t('youngCouples.welcome')}
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
            {t('youngCouples.welcomeDescription')}
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
            {t('youngCouples.mission')}
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
            {t('youngCouples.missionDescription')}
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
            {t('youngCouples.whatWeDo')}
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
            {t('youngCouples.whenWeMeet')}
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
            {t('youngCouples.ourLeaders')}
          </Typography>
          <Grid container spacing={4}>
            {couplesLeaders.map((leader, index) => (
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
            {t('youngCouples.readyToJoin')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {t('youngCouples.readyToJoinDescription')}
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
            {t('youngCouples.getConnected')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default YoungCouplesMinistryPage;
