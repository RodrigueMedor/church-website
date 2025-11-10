import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventBoxes from '../common/EventBoxes';
import LatestSermon from '../common/LatestSermon';
import NewsSection from '../common/NewsSection';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/banner/pastor-sermon_1.JPG')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center 20%',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundBlendMode: 'lighten',
  padding: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0),
  },
}));

const HomePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('appBar');
      if (header) {  // Add null check
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="md">
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'none',
                letterSpacing: '1px',
                mb: 2,
                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                [theme.breakpoints.up('md')]: {
                  fontSize: '4rem',
                  lineHeight: 1.1,
                  letterSpacing: '1.5px',
                  fontWeight: 600
                },
                '& span': {
                  display: 'block',
                  '&:first-child': {
                    fontSize: '0.8em',
                    fontWeight: 400,
                    letterSpacing: '3px',
                    marginBottom: theme.spacing(1)
                  },
                  '&:last-child': {
                    fontSize: '0.6em',
                    fontWeight: 300,
                    letterSpacing: '2px',
                    marginTop: theme.spacing(1)
                  }
                }
              }}
            >
              <span>{t('home.welcome')}</span>
              First Haitian Baptist Church of Kissimmee
              <span>{t('home.welcomeSubtitle')}</span>
            </Typography>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 400,
                color: '#fff',
                maxWidth: '800px',
                mb: 4,
                [theme.breakpoints.up('md')]: {
                  fontSize: '1.5rem',
                  lineHeight: 1.6
                }
              }}
            >
              {t('home.welcomeSubtitle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderWidth: 2,
                  borderRadius: '50px',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(0)',
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  },
                  '&:focus': {
                    outline: 'none',
                    boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                {t('home.joinUs')}
              </Button>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/sermons?autoplay=recent"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '50px',
                  backgroundColor: '#2e7d32',
                  '&:hover': {
                    backgroundColor: '#1b5e20',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  },
                  '&:active': {
                    backgroundColor: '#1b5e20',
                    boxShadow: 'none',
                    transform: 'translateY(0)'
                  },
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(0)'
                }}
              >
                {t('home.watchLive')}
              </Button>
            </Box>
          </Container>
        </HeroSection>

        {/* About Section */}
        <Section sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={8}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #4a6fa5, #6b8cce)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.ourCommunity')}
              </Typography>
              <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto" mb={6}>
                {t('home.communityDescription')}
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 3, md: 4 },
                mt: 6
              }}>
                {[
                  {
                    icon: 'groups',
                    title: t('home.communityLife.title'),
                    description: t('home.communityLife.description'),
                    color: '#4a6fa5',
                    bgColor: 'rgba(74, 111, 165, 0.1)',
                    hoverColor: 'rgba(74, 111, 165, 0.9)'
                  },
                  {
                    icon: 'volunteer_activism',
                    title: t('home.serviceAndSupport.title'),
                    description: t('home.serviceAndSupport.volunteerPrograms'),
                    color: '#2e7d32',
                    bgColor: 'rgba(46, 125, 50, 0.1)',
                    hoverColor: 'rgba(46, 125, 50, 0.9)'
                  },
                  {
                    icon: 'school',
                    title: t('home.spiritualGrowth.title'),
                    description: t('home.spiritualGrowth.description'),
                    color: '#6a1b9a',
                    bgColor: 'rgba(106, 27, 154, 0.1)',
                    hoverColor: 'rgba(106, 27, 154, 0.9)'
                  }
                ].map((item, index) => (
                  <Box 
                    key={index}
                    sx={{
                      p: { xs: 3, md: 3.5 },
                      borderRadius: '16px',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px -10px ${item.color}33`,
                        borderColor: 'transparent',
                        '&::before': {
                          opacity: 0.05,
                          transform: 'scale(1.5)'
                        },
                        '& .icon-wrapper': {
                          transform: 'translateY(-5px) scale(1.1)',
                          '&::after': {
                            opacity: 0.2,
                            transform: 'scale(1.2)'
                          }
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`,
                        opacity: 0,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 0
                      }
                    }}
                  >
                    <Box 
                      className="icon-wrapper"
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '24px',
                        bgcolor: item.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        mx: 'auto',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: '24px',
                          background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`,
                          opacity: 0,
                          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          zIndex: -1
                        },
                        '& .material-icons': {
                          fontSize: '2.75rem',
                          color: item.color,
                          transition: 'all 0.3s ease',
                          background: `linear-gradient(135deg, ${item.color}, ${item.hoverColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textFillColor: 'transparent'
                        },
                        '&:hover .material-icons': {
                          transform: 'scale(1.15) rotate(5deg)'
                        }
                      }}
                    >
                      <span className="material-icons">{item.icon}</span>
                    </Box>
                    <Box sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          textAlign: 'center', 
                          fontWeight: 700,
                          mb: 1.5,
                          background: `linear-gradient(135deg, ${item.color}, ${item.hoverColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          fontSize: { xs: '1.35rem', md: '1.6rem' },
                          position: 'relative',
                          display: 'inline-block',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '50px',
                            height: '3px',
                            background: `linear-gradient(90deg, ${item.color}, ${item.hoverColor})`,
                            borderRadius: '3px',
                            opacity: 0.8,
                            transition: 'all 0.3s ease'
                          },
                          '&:hover::after': {
                            width: '70px',
                            opacity: 1
                          }
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        textAlign: 'center',
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        mt: 'auto',
                        pt: 1,
                        position: 'relative',
                        zIndex: 1,
                        fontSize: '1.05rem',
                        '&::first-letter': {
                          fontSize: '1.2em',
                          fontWeight: 700,
                          color: item.color,
                          paddingRight: '2px'
                        }
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ 
                mt: 8, 
                textAlign: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(74, 111, 165, 0.1) 0%, rgba(255,255,255,0) 70%)',
                  borderRadius: '50%',
                  opacity: 0,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                },
                '&:hover::before': {
                  opacity: 1,
                  width: '300px',
                  height: '300px'
                }
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/about"
                  endIcon={
                    <Box 
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ml: 1,
                        transition: 'all 0.3s ease',
                        '& svg': {
                          transition: 'transform 0.3s ease'
                        }
                      }}
                    >
                      <ArrowForwardIcon />
                    </Box>
                  }
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 1,
                    background: 'linear-gradient(135deg, #4a6fa5, #6b8cce)',
                    boxShadow: '0 4px 15px rgba(74, 111, 165, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(74, 111, 165, 0.4)',
                      '& .MuiButton-endIcon': {
                        transform: 'translateX(4px)'
                      },
                      '&::before': {
                        opacity: 1
                      }
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 10px rgba(74, 111, 165, 0.4)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, #6b8cce, #4a6fa5)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      zIndex: -1
                    }
                  }}
                >
                  {t('home.learnMoreAboutChurch')}
                </Button>
              </Box>
            </Box>
          </Container>
        </Section>

        {/* Ministries & Events Section */}
        <Section sx={{
          backgroundImage: `
            linear-gradient(
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            ),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E"
          `,
          backgroundAttachment: 'fixed',
          py: 8,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(90deg, #4a6fa5, #6b8cce, #4a6fa5)',
            opacity: 0.8
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(90deg, #4a6fa5, #6b8cce, #4a6fa5)',
            opacity: 0.8
          }
        }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{
                  color: 'primary.main',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #4a6fa5, #6b8cce)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.ministriesAndEvents')}
              </Typography>
              <EventBoxes />
            </Box>
          </Container>
        </Section>

        {/* Latest News */}
        <Section sx={{ bgcolor: 'background.paper', py: 8, position: 'relative' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #4a6fa5, #6b8cce)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.latestNews')}
              </Typography>
              <NewsSection />
            </Box>
          </Container>
        </Section>

        {/* Upcoming Events */}
        <Section sx={{ bgcolor: 'background.paper', py: 8, position: 'relative' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #4a6fa5, #6b8cce)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.upcomingEvents')}
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                maxWidth="800px" 
                mx="auto" 
                mt={3}
                mb={1}
              >
                {t('home.upcomingEventsSubtitle')}
              </Typography>
            </Box>
            
            <EventBoxes />
            
            <Box textAlign="center" mt={6}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component={RouterLink}
                to="/events"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '30px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  }
                }}
              >
                Voir tous les événements
              </Button>
            </Box>
          </Container>
        </Section>

        {/* Latest Sermon Section */}
        <Section sx={{ bgcolor: 'background.paper', py: 4 }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #4a6fa5, #6b8cce)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.latestSermonTitle')}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" maxWidth="800px" mx="auto" sx={{ mt: 2, mb: 1 }}>
                Écoutez nos derniers enseignements bibliques
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
              <LatestSermon />
            </Box>
          </Container>
        </Section>
      </Box>
    </Box>
  );
};

export default HomePage;
