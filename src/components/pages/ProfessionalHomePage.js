import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, Typography, Button, useTheme, useMediaQuery, Paper, Grid, Card, CardContent, Avatar, alpha, Fade, Slide, Zoom, Stack, Divider, Dialog, DialogContent, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { 
  Church as ChurchIcon,
  Groups as GroupsIcon,
  VolunteerActivism as VolunteerIcon,
  School as SchoolIcon,
  CalendarToday,
  AccessTime,
  LocationOn,
  Star,
  TrendingUp,
  People,
  Schedule,
  PlayArrow
} from '@mui/icons-material';
import EventBoxes from '../common/EventBoxes';
import LatestSermon from '../common/LatestSermon';
import NewsSection from '../common/NewsSection';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
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
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const FeatureCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(26, 54, 93, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(4),
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1a365d, #2c5282)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(26, 54, 93, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const ProfessionalHomePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Preserve existing slideshow functionality
  const heroBannerImages = [
    `${process.env.PUBLIC_URL}/images/banner/pastor-sermon_1.JPG`,
    `${process.env.PUBLIC_URL}/images/banner/DSC_2131.jpg`,
    `${process.env.PUBLIC_URL}/images/banner/DSC_2088.jpg`,
  ];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [latestVideo, setLatestVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('appBar');
      if (header) {
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

  // YouTube API Configuration
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
  const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';

  // Function to fetch latest video from YouTube
  const fetchLatestVideo = async () => {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
      console.warn('YouTube API key not configured');
      return null;
    }

    if (!CHANNEL_ID || CHANNEL_ID === 'YOUR_YOUTUBE_CHANNEL_ID') {
      console.warn('YouTube channel ID not configured');
      return null;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1&type=video`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        return {
          id: video.id.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnail: video.snippet.thumbnails.high.url,
          videoUrl: `https://www.youtube.com/embed/${video.id.videoId}`
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching latest video:', error);
      return null;
    }
  };

  // Handle Watch Live button click
  const handleWatchLive = async () => {
    setLoadingVideo(true);
    try {
      const video = await fetchLatestVideo();
      if (video) {
        setLatestVideo(video);
        setVideoModalOpen(true);
      } else {
        // Fallback to sermons page if no video found
        window.open('/sermons', '_blank');
      }
    } catch (error) {
      console.error('Error loading video:', error);
      // Fallback to sermons page
      window.open('/sermons', '_blank');
    } finally {
      setLoadingVideo(false);
    }
  };

  // Close video modal
  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
  };

  const features = [
    {
      icon: <GroupsIcon />,
      title: t('home.communityLife.title') || 'Community Life',
      description: t('home.communityLife.description') || 'Join our warm and welcoming church family where everyone belongs and grows together in faith.',
      color: '#1a365d'
    },
    {
      icon: <VolunteerIcon />,
      title: t('home.serviceAndSupport.title') || 'Service & Support',
      description: t('home.serviceAndSupport.volunteerPrograms') || 'Make a difference through our various outreach programs and volunteer opportunities.',
      color: '#2c5282'
    },
    {
      icon: <SchoolIcon />,
      title: t('home.spiritualGrowth.title') || 'Spiritual Growth',
      description: t('home.spiritualGrowth.description') || 'Deepen your faith through biblical teaching, discipleship, and spiritual development programs.',
      color: '#c9a84c'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero Section - PRESERVING EXISTING SLIDESHOW */}
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
            <Fade in timeout={1000}>
              <Box>
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
                    onClick={handleWatchLive}
                    disabled={loadingVideo}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #c9a84c, #f4e4bc)',
                      color: '#1a365d',
                      fontWeight: 700,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #f4e4bc, #c9a84c)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(201, 168, 76, 0.4)'
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: 'none'
                      },
                      transition: 'all 0.3s ease-in-out',
                      transform: 'translateY(0)'
                    }}
                  >
                    {loadingVideo ? 'Loading...' : t('home.watchLive')}
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Container>
        </HeroSection>

        {/* Features Section */}
        <Section sx={{ bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={8}>
              <Slide direction="up" in timeout={600}>
                <Box>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: '#1a365d',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    {t('home.ourCommunity') || 'Welcome to Our Church Family'}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    maxWidth="800px"
                    mx="auto"
                    lineHeight={1.7}
                    mb={4}
                  >
                    {t('home.communityDescription') || 'We are a diverse community of believers committed to worshiping God, growing together in faith, and serving others with love and compassion.'}
                  </Typography>
                </Box>
              </Slide>
            </Box>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Slide direction="up" in timeout={800 + index * 200}>
                    <FeatureCard index={index} elevation={6}>
                      <Box className="feature-icon" sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 3,
                        transition: 'transform 0.3s ease',
                      }}>
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            backgroundColor: alpha(feature.color, 0.1),
                            color: feature.color,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                      </Box>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        textAlign: 'center',
                        color: '#1a365d' 
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          textAlign: 'center',
                          lineHeight: 1.7,
                          mb: 3
                        }}
                      >
                        {feature.description}
                      </Typography>
                      <Box sx={{ textAlign: 'center' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          component={RouterLink}
                          to="/about"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            borderColor: feature.color,
                            color: feature.color,
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: feature.color,
                              color: 'white',
                            },
                          }}
                        >
                          {t('learnMore', 'Learn More')}
                        </Button>
                      </Box>
                    </FeatureCard>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Section>

        {/* Upcoming Events - PRESERVING EXISTING COMPONENT */}
        <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 0, position: 'relative' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#1a365d',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                {t('upcomingGatherings', 'Join us for our upcoming gatherings and activities')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                maxWidth="800px"
                mx="auto"
                lineHeight={1.7}
                mb={4}
              >
                {t('upcomingGatheringsSubtitle', 'Discover our ministries, fellowship opportunities, and community activities designed to help you grow in faith and connect with others.')}
              </Typography>
            </Box>

            <EventBoxes />

            <Box textAlign="center" mt={4}>
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
                {t('viewAllEvents', 'View All Events')}
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Latest News - PRESERVING EXISTING COMPONENT */}
        <Box sx={{ bgcolor: 'background.paper', py: 4, position: 'relative' }}>
          <Container maxWidth="lg">
            <Box textAlign="center">
              <NewsSection />
            </Box>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            py: 8,
            background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url(/images/banner/pastor-sermon_1.JPG)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in timeout={1000}>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  {t('joinUsThisSunday', 'Join Us This Sunday')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 6,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  {t('joinUsDescription', 'Experience God\'s presence, connect with our community, and grow in your faith. We\'d love to see you at our worship service!')}
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/contact"
                    sx={{
                      px: 4,
                      py: 2,
                      borderColor: 'white',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#1a365d',
                      },
                    }}
                  >
                    {t('getDirections', 'Get Directions')}
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/events"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #c9a84c, #f4e4bc)',
                      color: '#1a365d',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(201, 168, 76, 0.4)',
                      },
                    }}
                  >
                    {t('viewServiceTimes', 'View Service Times')}
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Container>
        </Box>
      </Box>

      {/* Video Modal */}
      <Dialog
        open={videoModalOpen}
        onClose={handleCloseVideoModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
            maxHeight: '90vh',
          }
        }}
      >
        {latestVideo && (
          <>
            <DialogTitle
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {t('latestSermon', 'Latest Sermon')}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {latestVideo.title}
                </Typography>
              </Box>
              <IconButton onClick={handleCloseVideoModal} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                <iframe
                  src={latestVideo.videoUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allowFullScreen
                  title={latestVideo.title}
                />
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3 }}>
              <Button
                variant="outlined"
                onClick={handleCloseVideoModal}
                sx={{
                  borderColor: '#1a365d',
                  color: '#1a365d',
                  '&:hover': {
                    backgroundColor: '#1a365d',
                    color: 'white',
                  },
                }}
              >
                {t('close', 'Close')}
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/sermons"
                sx={{
                  backgroundColor: '#1a365d',
                  '&:hover': {
                    backgroundColor: '#2c5282',
                  },
                }}
              >
                {t('watchMoreSermons', 'Watch More Sermons')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProfessionalHomePage;
