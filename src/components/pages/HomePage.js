import React, { useEffect, useState } from 'react';
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
  backgroundColor: '#000',
  backgroundSize: 'cover',
  backgroundPosition: 'center 20%',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
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
  padding: theme.spacing(2, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
}));

const HomePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const heroBannerImages = [
    `${process.env.PUBLIC_URL}/images/banner/pastor-sermon_1.JPG`,
    `${process.env.PUBLIC_URL}/images/banner/DSC_2131.jpg`,
    `${process.env.PUBLIC_URL}/images/banner/DSC_2088.jpg`,
  ];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

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

  useEffect(() => {
    if (heroBannerImages.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % heroBannerImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [heroBannerImages.length]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroSection>
          {heroBannerImages.map((image, index) => (
            <Box
              key={image}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                opacity: index === currentBannerIndex ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
                zIndex: 0,
              }}
            />
          ))}
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

        {/* Upcoming Events */}
        <Box sx={{
          py: { xs: 5, md: 6 },
          bgcolor: '#fff',
          position: 'relative',
        }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                component="span"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  display: 'block'
                }}
              >
                {t('home.upcomingEvents')}
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: 'primary.dark',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #1a365d, #c9a84c)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.upcomingEvents')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mt: 3,
                  fontSize: '1.05rem',
                  lineHeight: 1.8
                }}
              >
                {t('home.upcomingEventsSubtitle')}
              </Typography>
            </Box>

            <EventBoxes />

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/events"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4.5,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, #1a365d, #2c5282)',
                  boxShadow: '0 4px 15px rgba(26, 54, 93, 0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(26, 54, 93, 0.35)',
                    '& .MuiButton-endIcon': {
                      transform: 'translateX(4px)'
                    }
                  },
                  '& .MuiButton-endIcon': {
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                Voir tous les événements
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Latest News */}
        <Box sx={{
          py: { xs: 5, md: 6 },
          bgcolor: '#f8f6f0',
          position: 'relative',
        }}>
          <Container maxWidth="lg">
            <NewsSection />
          </Container>
        </Box>

        {/* Ministries & Events Section */}
        <Section sx={{
          backgroundImage: `
            linear-gradient(
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            ),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")
          `,
          backgroundAttachment: 'fixed',
          pt: 1,
          pb: 2,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(90deg, #1a365d, #2c5282, #1a365d)',
            opacity: 0.8
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(90deg, #1a365d, #2c5282, #1a365d)',
            opacity: 0.8
          }
        }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={2}>
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
                    background: 'linear-gradient(90deg, #1a365d, #2c5282)',
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

        {/* Our Community Section */}
        <Box sx={{
          py: { xs: 5, md: 6 },
          bgcolor: '#f8f6f0',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1a365d, #c9a84c, #1a365d)',
            opacity: 0.4
          }
        }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                component="span"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  display: 'block'
                }}
              >
                {t('home.ourCommunity')}
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: 'primary.dark',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #1a365d, #c9a84c)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.ourCommunity')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  mt: 3,
                  fontSize: '1.05rem',
                  lineHeight: 1.8
                }}
              >
                {t('home.communityDescription')}
              </Typography>
            </Box>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 3, md: 4 },
              mb: 4
            }}>
              {[
                {
                  icon: 'groups',
                  title: t('home.communityLife.title'),
                  description: t('home.communityLife.description'),
                  accent: '#1a365d',
                  gradient: 'linear-gradient(135deg, #1a365d, #2c5282)'
                },
                {
                  icon: 'volunteer_activism',
                  title: t('home.serviceAndSupport.title'),
                  description: t('home.serviceAndSupport.volunteerPrograms'),
                  accent: '#2e7d32',
                  gradient: 'linear-gradient(135deg, #2e7d32, #4caf50)'
                },
                {
                  icon: 'school',
                  title: t('home.spiritualGrowth.title'),
                  description: t('home.spiritualGrowth.description'),
                  accent: '#6a1b9a',
                  gradient: 'linear-gradient(135deg, #6a1b9a, #9c27b0)'
                }
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '20px',
                    p: { xs: 3, md: 4 },
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'rgba(26, 54, 93, 0.06)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: item.gradient,
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(26, 54, 93, 0.1)',
                      borderColor: 'transparent',
                      '&::before': {
                        opacity: 1
                      },
                      '& .icon-circle': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box
                    className="icon-circle"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: `${item.accent}0d`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      '& .material-icons': {
                        fontSize: '2.5rem',
                        background: item.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }
                    }}
                  >
                    <span className="material-icons">{item.icon}</span>
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'primary.dark',
                      fontFamily: '"Playfair Display", serif'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.8,
                      fontSize: '0.95rem'
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/about"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4.5,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, #1a365d, #2c5282)',
                  boxShadow: '0 4px 15px rgba(26, 54, 93, 0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(26, 54, 93, 0.35)',
                    '& .MuiButton-endIcon': {
                      transform: 'translateX(4px)'
                    }
                  },
                  '& .MuiButton-endIcon': {
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                {t('home.learnMoreAboutChurch')}
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Latest Sermon Section */}
        <Box sx={{
          py: { xs: 6, md: 8 },
          bgcolor: '#fff',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #1a365d, #c9a84c, #1a365d)',
            opacity: 0.3
          }
        }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={5}>
              <Typography
                component="span"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  display: 'block'
                }}
              >
                {t('home.latestSermonTitle')}
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: 'primary.dark',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #1a365d, #c9a84c)',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('home.latestSermonTitle')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 3, fontSize: '1.05rem' }}
              >
                Écoutez nos derniers enseignements bibliques
              </Typography>
            </Box>
            <LatestSermon />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
