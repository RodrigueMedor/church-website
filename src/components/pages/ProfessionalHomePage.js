import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box, Container, Typography, Button, useTheme, useMediaQuery, Grid, Card,
  CardContent, Avatar, alpha, Fade, Stack, IconButton, Chip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Church as ChurchIcon,
  Groups as GroupsIcon,
  VolunteerActivism as VolunteerIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  LocationOn,
  PlayArrow,
  FormatQuote,
  ChevronLeft,
  ChevronRight,
  Favorite,
  ChildCare,
  Phone,
} from '@mui/icons-material';
import EventBoxes from '../common/EventBoxes';
import LatestSermon from '../common/LatestSermon';
import NewsSection from '../common/NewsSection';
import ScrollReveal from '../common/ScrollReveal';
import { usePageContent } from '../../cms';
import { pageDefaults } from '../../cms/defaults';
import CMS_API, { slugToPageKey } from '../../services/cmsApi';

const iconMap = {
  Church: <ChurchIcon />,
  Groups: <GroupsIcon />,
  VolunteerActivism: <VolunteerIcon />,
  School: <SchoolIcon />,
  MenuBook: <MenuBookIcon />,
  ChildCare: <ChildCare />,
};

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0) translateX(-50%); }
  50% { transform: translateY(8px) translateX(-50%); }
`;

const kenBurnsZoomIn = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.12); }
`;

const kenBurnsPanLeft = keyframes`
  0% { transform: scale(1.08) translateX(0); }
  100% { transform: scale(1.08) translateX(-3%); }
`;

const kenBurnsPanRight = keyframes`
  0% { transform: scale(1.08) translateX(0); }
  100% { transform: scale(1.08) translateX(3%); }
`;

const kenBurnsPanUp = keyframes`
  0% { transform: scale(1.08) translateY(0); }
  100% { transform: scale(1.08) translateY(-3%); }
`;

const kenBurnsEffects = [kenBurnsZoomIn, kenBurnsPanLeft, kenBurnsPanRight, kenBurnsPanUp];

const progressBar = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

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
  overflow: 'hidden',
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  borderRadius: 20,
  border: '1px solid',
  borderColor: theme.palette.divider,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    transition: 'height 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px -12px rgba(26, 54, 93, 0.18)',
    '&::before': {
      height: '6px',
    },
    '& .service-icon': {
      transform: 'scale(1.1)',
    },
  },
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  borderRadius: 20,
  padding: theme.spacing(4),
  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.divider,
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 32px -8px rgba(26, 54, 93, 0.12)',
  },
}));

const ProfessionalHomePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const content = usePageContent('homepage');

  const heroSlides = content.hero?.slides?.length
    ? content.hero.slides
    : [
        {
          image: `${process.env.PUBLIC_URL}/images/banner/pastor-sermon_1.JPG`,
          title: 'First Haitian Baptist Church of Kissimmee',
          subtitle: 'Join us for a life-changing worship experience every Sunday. All are welcome in God\'s house.',
          buttonText: 'Plan Your Visit',
          buttonLink: '/contact',
          secondaryText: 'Watch Online',
          secondaryLink: '/sermons',
        },
        {
          image: `${process.env.PUBLIC_URL}/images/banner/DSC_2131.jpg`,
          title: 'Grow in Faith Together',
          subtitle: 'Discover ministries for every age and stage of life. There is a place for you and your family.',
          buttonText: 'Our Ministries',
          buttonLink: '/ministries',
        },
        {
          image: `${process.env.PUBLIC_URL}/images/banner/DSC_2088.jpg`,
          title: 'Experience God\'s Love',
          subtitle: 'Whether it\'s your first time or you\'re looking for a church home, we would love to welcome you.',
          buttonText: 'Get Directions',
          buttonLink: 'https://maps.google.com/?q=900+S+Thacker+Ave+Kissimmee+FL+34741',
        },
      ];
  const heroBannerImages = heroSlides.map(s => s.image);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideTimerRef = useRef(null);
  const [ministries, setMinistries] = useState([]);
  const [pastors, setPastors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialTimerRef = useRef(null);

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
    if (heroSlides.length <= 1) return undefined;
    slideTimerRef.current = window.setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 200);
    }, 4000);
    return () => window.clearInterval(slideTimerRef.current);
  }, [heroSlides.length]);

  const goToSlide = useCallback((index) => {
    window.clearInterval(slideTimerRef.current);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentBannerIndex(index);
      setIsTransitioning(false);
    }, 150);
    if (heroSlides.length > 1) {
      slideTimerRef.current = window.setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentBannerIndex((prev) => (prev + 1) % heroSlides.length);
          setIsTransitioning(false);
        }, 200);
      }, 4000);
    }
  }, [heroSlides.length]);

  const goToPrev = useCallback(() => {
    goToSlide((currentBannerIndex - 1 + heroSlides.length) % heroSlides.length);
  }, [currentBannerIndex, heroSlides.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentBannerIndex + 1) % heroSlides.length);
  }, [currentBannerIndex, heroSlides.length, goToSlide]);

  useEffect(() => {
    CMS_API.fetchMinistries().then(data => {
      if (data && data.length > 0) setMinistries(data.slice(0, 6));
    }).catch(() => {});
    CMS_API.fetchPastors().then(data => {
      if (data && data.length > 0) setPastors(data);
    }).catch(() => {});
    CMS_API.fetchTestimonials().then(data => {
      if (data && data.length > 0) setTestimonials(data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimerRef.current);
  }, [testimonials.length]);

  const handleNextTestimonial = useCallback(() => {
    clearInterval(testimonialTimerRef.current);
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrevTestimonial = useCallback(() => {
    clearInterval(testimonialTimerRef.current);
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const pastor = pastors[0] || null;
  const serviceTimesCards = content.serviceTimesCards || [];
  const defaultMinistries = pageDefaults.ministries?.ministries || [];
  const ministeriesFromApi = ministries.length > 0
    ? ministries.map((m, i) => {
        const fallback = defaultMinistries[i] || defaultMinistries.find(d => d.title === m.name || d.id === m.id) || {};
        return { ...fallback, ...m, image: m.imageUrl || m.image || fallback.image || fallback.imageUrl };
      })
    : defaultMinistries;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1 }}>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1: HERO SLIDESHOW
        ═══════════════════════════════════════════════════════════════════ */}
        <HeroSection>
          {heroSlides.map((slide, index) => {
            const isActive = index === currentBannerIndex;
            const animation = kenBurnsEffects[index % kenBurnsEffects.length];
            return (
              <Box
                key={slide.image + index}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: '-5%',
                    backgroundImage: `url('${slide.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 20%',
                    backgroundRepeat: 'no-repeat',
                    ...(isActive ? {
                      animation: `${animation} 8s ease-in-out forwards`,
                    } : {}),
                  }}
                />
              </Box>
            );
          })}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,36,64,0.7) 0%, rgba(15,36,64,0.45) 40%, rgba(15,36,64,0.75) 100%)',
            zIndex: 2,
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: `linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`,
            zIndex: 4,
            pointerEvents: 'none',
          }} />
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 5, pt: 8 }}>
            <Fade in={!isTransitioning} timeout={600}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    mb: 2,
                  }}
                >
                  {content.hero?.welcome || t('home.welcome')}
                </Typography>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: '#fff',
                    fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4.2rem', lg: '5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    textShadow: '0px 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {heroSlides[currentBannerIndex]?.title || content.hero?.title || 'First Haitian Baptist Church of Kissimmee'}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.85)',
                    maxWidth: '680px',
                    mx: 'auto',
                    mb: 5,
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                  }}
                >
                  {heroSlides[currentBannerIndex]?.subtitle || content.hero?.subtitle || t('home.welcomeSubtitle')}
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                  sx={{ mb: 6 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to={heroSlides[currentBannerIndex]?.buttonLink || '/contact'}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 5,
                      py: 1.8,
                      fontSize: '1.05rem',
                      borderRadius: '60px',
                      bgcolor: '#c9a84c',
                      color: '#0f2440',
                      fontWeight: 700,
                      boxShadow: '0 8px 32px rgba(201, 168, 76, 0.4)',
                      '&:hover': {
                        bgcolor: '#dbb95c',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 40px rgba(201, 168, 76, 0.5)',
                      },
                    }}
                  >
                    {heroSlides[currentBannerIndex]?.buttonText || 'Plan Your Visit'}
                  </Button>
                  {heroSlides[currentBannerIndex]?.secondaryText && (
                    <Button
                      variant="outlined"
                      size="large"
                      component={RouterLink}
                      to={heroSlides[currentBannerIndex]?.secondaryLink || '/sermons'}
                      startIcon={<PlayArrow />}
                      sx={{
                        px: 5,
                        py: 1.8,
                        fontSize: '1.05rem',
                        borderRadius: '60px',
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,0.4)',
                        color: '#fff',
                        fontWeight: 600,
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: '#fff',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      {heroSlides[currentBannerIndex]?.secondaryText}
                    </Button>
                  )}
                </Stack>
              </Box>
            </Fade>
          </Container>

          {heroSlides.length > 1 && (
            <>
              <IconButton
                onClick={goToPrev}
                aria-label="Previous slide"
                sx={{
                  position: 'absolute',
                  left: { xs: 12, md: 30 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 6,
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  width: { xs: 40, md: 50 },
                  height: { xs: 40, md: 50 },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={goToNext}
                aria-label="Next slide"
                sx={{
                  position: 'absolute',
                  right: { xs: 12, md: 30 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 6,
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  width: { xs: 40, md: 50 },
                  height: { xs: 40, md: 50 },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ChevronRight />
              </IconButton>

              <Box sx={{
                position: 'absolute',
                bottom: { xs: 40, md: 50 },
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                zIndex: 6,
              }}>
                {heroSlides.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    sx={{
                      width: idx === currentBannerIndex ? 32 : 10,
                      height: 10,
                      borderRadius: 5,
                      bgcolor: idx === currentBannerIndex ? '#c9a84c' : 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        bgcolor: idx === currentBannerIndex ? '#dbb95c' : 'rgba(255,255,255,0.7)',
                      },
                    }}
                  >
                    {idx === currentBannerIndex && (
                      <Box sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: '#fff',
                        opacity: 0.4,
                        animation: `${progressBar} 4s linear forwards`,
                      }} />
                    )}
                  </Box>
                ))}
              </Box>

              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                bgcolor: 'rgba(255,255,255,0.1)',
                zIndex: 6,
              }}>
                <Box key={currentBannerIndex} sx={{
                  height: '100%',
                  bgcolor: '#c9a84c',
                  animation: `${progressBar} 4s linear forwards`,
                  borderRadius: '0 2px 2px 0',
                }} />
              </Box>
            </>
          )}

          <Box sx={{
            position: 'absolute',
            bottom: -60,
            left: '50%',
            animation: `${scrollBounce} 2s ease-in-out infinite`,
            zIndex: 5,
          }}>
            <IconButton
              sx={{
                color: 'rgba(26,54,93,0.4)',
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(4px)',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)', color: 'primary.main' },
              }}
              aria-label="Scroll down"
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </HeroSection>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: WELCOME
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{ bgcolor: 'background.default', pt: { xs: 10, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <ScrollReveal>
                  <Box>
                    <Chip
                      label="About Us"
                      sx={{
                        mb: 2,
                        bgcolor: alpha('#c9a84c', 0.1),
                        color: '#c9a84c',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    />
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: '2rem', md: '2.8rem' },
                        lineHeight: 1.15,
                      }}
                    >
                      {content.welcome?.title || 'A Place to Call Home'}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        mb: 3,
                        fontSize: '1.1rem',
                      }}
                    >
                      {content.welcome?.description || 'First Haitian Baptist Church of Kissimmee is a Christ-centered community where faith comes alive. We are a diverse, multicultural congregation united by God\'s love.'}
                    </Typography>
                    {content.welcome?.mission && (
                      <Box sx={{
                        pl: 3,
                        borderLeft: '4px solid #c9a84c',
                        mb: 4,
                      }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontStyle: 'italic',
                            color: 'text.primary',
                            fontWeight: 500,
                            lineHeight: 1.7,
                          }}
                        >
                          {content.welcome.mission}
                        </Typography>
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={content.welcome?.buttonLink || '/about'}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '50px',
                        fontWeight: 600,
                      }}
                    >
                      {content.welcome?.buttonText || 'Learn More About Us'}
                    </Button>
                  </Box>
                </ScrollReveal>
              </Grid>
              <Grid item xs={12} md={6}>
                <ScrollReveal direction="right" delay={0.2}>
                  <Box sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px -15px rgba(26, 54, 93, 0.2)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -20,
                      right: -20,
                      width: '60%',
                      height: '60%',
                      border: '3px solid',
                      borderColor: 'secondary.main',
                      borderRadius: 4,
                      opacity: 0.3,
                      zIndex: -1,
                    },
                  }}>
                    <Box
                      component="img"
                      src={content.welcome?.image || '/images/banner/church-building-new.png'}
                      alt="FHBCK Church"
                      sx={{
                        width: '100%',
                        height: { xs: 300, md: 420 },
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                </ScrollReveal>
              </Grid>
            </Grid>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3: SERVICE TIMES
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{ bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <ScrollReveal>
              <Box textAlign="center" mb={6}>
                <Chip
                  label="Join Us"
                  sx={{
                    mb: 2,
                    bgcolor: alpha('#1a365d', 0.08),
                    color: 'text.primary',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                  Service Times
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
                  We have a variety of services and programs designed to help you connect with God and grow in your faith.
                </Typography>
              </Box>
            </ScrollReveal>
            <Grid container spacing={3}>
              {serviceTimesCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ScrollReveal delay={index * 0.1}>
                    <ServiceCard>
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        bgcolor: card.color || '#1a365d',
                      }} />
                      <CardContent sx={{ p: 4, pt: 5 }}>
                        <Box
                          className="service-icon"
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '16px',
                            bgcolor: alpha(card.color || '#1a365d', 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            transition: 'transform 0.3s ease',
                            '& .MuiSvgIcon-root': {
                              color: card.color || '#1a365d',
                              fontSize: '1.6rem',
                            },
                          }}
                        >
                          {iconMap[card.icon] || <ChurchIcon />}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.15rem' }}>
                          {card.title}
                        </Typography>
                        <Typography variant="body2" sx={{
                          color: card.color || '#c9a84c',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          mb: 1.5,
                        }}>
                          {card.time}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                          {card.description}
                        </Typography>
                      </CardContent>
                    </ServiceCard>
                  </ScrollReveal>
                </Grid>
              ))}
            </Grid>
            <Box textAlign="center" mt={5}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/events"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(26, 54, 93, 0.2)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                View Full Schedule
              </Button>
            </Box>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: MINISTRIES
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{ bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <ScrollReveal>
              <Box textAlign="center" mb={6}>
                <Chip
                  label="Our Ministries"
                  sx={{
                    mb: 2,
                    bgcolor: alpha('#c9a84c', 0.1),
                    color: '#c9a84c',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                  Get Involved
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
                  Discover a ministry that fits your passion and gifts. There's a place for everyone at FHBCK.
                </Typography>
              </Box>
            </ScrollReveal>
            <Grid container spacing={3}>
              {ministeriesFromApi.map((ministry, index) => (
                <Grid item xs={12} sm={6} md={4} key={ministry.id || index}>
                  <ScrollReveal delay={index * 0.1}>
                    <Card sx={{
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: 4,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px -12px rgba(26, 54, 93, 0.18)',
                        '& .ministry-img': {
                          transform: 'scale(1.08)',
                        },
                      },
                    }}>
                      <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                        <Box
                          className="ministry-img"
                          sx={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${ministry.imageUrl || ministry.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                        <Box sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(15,36,64,0.7) 0%, transparent 60%)',
                        }} />
                        <Typography sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 20,
                          right: 20,
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '1.15rem',
                          fontFamily: '"Playfair Display", serif',
                        }}>
                          {ministry.name || ministry.title}
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, minHeight: 48 }}>
                          {ministry.tagline || ministry.description || ''}
                        </Typography>
                        <Button
                          component={RouterLink}
                          to={`/${slugToPageKey[ministry.slug] || ministry.slug || ministry.link || 'ministries'}`}
                          size="small"
                          endIcon={<ArrowForwardIcon sx={{ fontSize: '0.85rem' }} />}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            color: 'primary.main',
                            p: 0,
                            '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
                          }}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                </Grid>
              ))}
            </Grid>
            <Box textAlign="center" mt={5}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/ministries"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(26, 54, 93, 0.2)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                View All Ministries
              </Button>
            </Box>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: UPCOMING EVENTS
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{ bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <ScrollReveal>
              <Box textAlign="center" mb={5}>
                <Chip
                  label="Events"
                  sx={{
                    mb: 2,
                    bgcolor: alpha('#1a365d', 0.08),
                    color: 'text.primary',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                  {content.upcomingGatherings?.title || 'Upcoming Events'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
                  {content.upcomingGatherings?.subtitle || 'Join us for our upcoming gatherings and activities.'}
                </Typography>
              </Box>
            </ScrollReveal>
            <EventBoxes />
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/events"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(26, 54, 93, 0.2)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                View All Events
              </Button>
            </Box>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: LATEST SERMONS
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{ bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <ScrollReveal>
              <Box textAlign="center" mb={5}>
                <Chip
                  label="Sermons"
                  sx={{
                    mb: 2,
                    bgcolor: alpha('#c9a84c', 0.1),
                    color: '#c9a84c',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                  {content.latestSermons?.title || 'Recent Messages'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
                  {content.latestSermons?.subtitle || 'Watch or listen to our latest sermons and be encouraged in your faith journey.'}
                </Typography>
              </Box>
            </ScrollReveal>
            <ScrollReveal>
              <LatestSermon />
            </ScrollReveal>
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/sermons"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'rgba(26, 54, 93, 0.2)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                View All Sermons
              </Button>
            </Box>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7: MEET OUR PASTOR
        ═══════════════════════════════════════════════════════════════════ */}
        {pastor && (
          <Section sx={{ bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={5}>
                  <ScrollReveal>
                    <Box sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px -15px rgba(26, 54, 93, 0.2)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        width: '50%',
                        height: '50%',
                        border: '3px solid',
                        borderColor: 'secondary.main',
                        borderRadius: 4,
                        opacity: 0.3,
                        zIndex: -1,
                      },
                    }}>
                      <Box
                        component="img"
                        src={pastor.imageUrl || pastor.image || '/images/staff/pastor-fritzner-brouard.jpg'}
                        alt={pastor.name}
                        sx={{
                          width: '100%',
                          height: { xs: 350, md: 450 },
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </ScrollReveal>
                </Grid>
                <Grid item xs={12} md={7}>
                  <ScrollReveal direction="right" delay={0.2}>
                    <Box>
                      <Chip
                        label="Our Leadership"
                        sx={{
                          mb: 2,
                          bgcolor: alpha('#c9a84c', 0.1),
                          color: '#c9a84c',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }}
                      />
                      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                        {content.meetPastor?.title || 'Meet Our Pastor'}
                      </Typography>
                      <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 600, mb: 3 }}>
                        {pastor.title || 'Senior Pastor'}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
                        {pastor.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4 }}>
                        {pastor.bio || content.meetPastor?.subtitle || 'Leading with faith, wisdom, and a heart for God\'s people.'}
                      </Typography>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/about"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          fontWeight: 600,
                        }}
                      >
                        Meet Our Leadership
                      </Button>
                    </Box>
                  </ScrollReveal>
                </Grid>
              </Grid>
            </Container>
          </Section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 8: PLAN YOUR VISIT
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{
          background: 'linear-gradient(135deg, #0f2440 0%, #1a365d 50%, #2c5282 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Box sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/banner/pastor-sermon_1.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.06,
            filter: 'saturate(0.5)',
          }} />
          <Box sx={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <ScrollReveal>
              <Typography variant="h2" sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontFamily: '"Playfair Display", serif',
              }}>
                {content.planYourVisit?.title || 'Plan Your Visit'}
              </Typography>
              <Typography variant="body1" sx={{
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem',
              }}>
                {content.planYourVisit?.description || 'We would love to welcome you and your family to our church. Whether this is your first time or you\'re looking for a new church home, we have a place for you.'}
              </Typography>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 4,
                bgcolor: 'rgba(255,255,255,0.1)',
                px: 3,
                py: 1.5,
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
              }}>
                <LocationOn sx={{ color: 'secondary.main' }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {content.planYourVisit?.address || '900 S Thacker Ave, Kissimmee, FL 34741'}
                </Typography>
              </Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  href={content.planYourVisit?.buttonLink || 'https://maps.google.com/?q=900+S+Thacker+Ave+Kissimmee+FL+34741'}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LocationOn />}
                  sx={{
                    px: 4,
                    py: 1.8,
                    borderRadius: '50px',
                    bgcolor: '#c9a84c',
                    color: '#0f2440',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
                    '&:hover': {
                      bgcolor: '#dbb95c',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 40px rgba(201,168,76,0.5)',
                    },
                  }}
                >
                  {content.planYourVisit?.buttonText || 'Get Directions'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to={content.planYourVisit?.contactLink || '/contact'}
                  startIcon={<Phone />}
                  sx={{
                    px: 4,
                    py: 1.8,
                    borderRadius: '50px',
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: '#fff',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {content.planYourVisit?.contactText || 'Contact Us'}
                </Button>
              </Stack>
            </ScrollReveal>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9: TESTIMONIALS
        ═══════════════════════════════════════════════════════════════════ */}
        {testimonials.length > 0 && (
          <Section sx={{ bgcolor: 'background.default' }}>
            <Container maxWidth="md">
              <ScrollReveal>
                <Box textAlign="center" mb={5}>
                  <Chip
                    label="Testimonials"
                    sx={{
                      mb: 2,
                      bgcolor: alpha('#c9a84c', 0.1),
                      color: '#c9a84c',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  />
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                    {content.testimonials?.title || 'What Our Members Say'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
                    {content.testimonials?.subtitle || 'Hear from the people who call FHBCK home.'}
                  </Typography>
                </Box>
              </ScrollReveal>
              <Box sx={{ position: 'relative' }}>
                <Fade in key={currentTestimonial} timeout={500}>
                  <TestimonialCard>
                    <FormatQuote sx={{
                      fontSize: 48,
                      color: alpha('#c9a84c', 0.2),
                      position: 'absolute',
                      top: 16,
                      left: 20,
                    }} />
                    <Typography variant="body1" sx={{
                      fontStyle: 'italic',
                      lineHeight: 1.8,
                      mb: 3,
                      fontSize: '1.1rem',
                      color: 'text.primary',
                      position: 'relative',
                      zIndex: 1,
                      pt: 2,
                    }}>
                      "{testimonials[currentTestimonial]?.content || testimonials[currentTestimonial]?.text || ''}"
                    </Typography>
                    <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'primary.main',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                      }}>
                        {(testimonials[currentTestimonial]?.name || 'M')[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {testimonials[currentTestimonial]?.name || ''}
                        </Typography>
                        {testimonials[currentTestimonial]?.title && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {testimonials[currentTestimonial].title}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TestimonialCard>
                </Fade>
                {testimonials.length > 1 && (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mt: 3,
                  }}>
                    <IconButton
                      onClick={handlePrevTestimonial}
                      size="small"
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main' },
                      }}
                    >
                      <ChevronLeft fontSize="small" />
                    </IconButton>
                    {testimonials.map((_, idx) => (
                      <Box
                        key={idx}
                        onClick={() => { clearInterval(testimonialTimerRef.current); setCurrentTestimonial(idx); }}
                        sx={{
                          width: idx === currentTestimonial ? 24 : 8,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: idx === currentTestimonial ? 'primary.main' : 'divider',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                    <IconButton
                      onClick={handleNextTestimonial}
                      size="small"
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main' },
                      }}
                    >
                      <ChevronRight fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Container>
          </Section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 10: GIVE ONLINE
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{
          background: 'linear-gradient(135deg, #1a365d 0%, #0f2440 100%)',
          color: '#fff',
          textAlign: 'center',
        }}>
          <Container maxWidth="md">
            <ScrollReveal>
              <Box sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                bgcolor: alpha('#c9a84c', 0.15),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}>
                <Favorite sx={{ fontSize: 36, color: '#c9a84c' }} />
              </Box>
              <Typography variant="h2" sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontFamily: '"Playfair Display", serif',
              }}>
                {content.giveOnline?.title || 'Give Online'}
              </Typography>
              <Typography variant="body1" sx={{
                mb: 4,
                maxWidth: 550,
                mx: 'auto',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem',
              }}>
                {content.giveOnline?.description || 'Your generous giving supports our ministry and helps us serve our community. Every gift makes a difference.'}
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to={content.giveOnline?.buttonLink || '/giving'}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: '60px',
                  bgcolor: '#c9a84c',
                  color: '#0f2440',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
                  '&:hover': {
                    bgcolor: '#dbb95c',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(201,168,76,0.5)',
                  },
                }}
              >
                {content.giveOnline?.buttonText || 'Give Now'}
              </Button>
            </ScrollReveal>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 11: NEWS
        ═══════════════════════════════════════════════════════════════════ */}
        <Section sx={{ bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <ScrollReveal>
              <Box textAlign="center" mb={5}>
                <Chip
                  label="News"
                  sx={{
                    mb: 2,
                    bgcolor: alpha('#1a365d', 0.08),
                    color: 'text.primary',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                />
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                  {content.latestNews?.title || 'Latest News & Updates'}
                </Typography>
                {content.latestNews?.subtitle && (
                  <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
                    {content.latestNews.subtitle}
                  </Typography>
                )}
              </Box>
            </ScrollReveal>
            <ScrollReveal>
              <NewsSection />
            </ScrollReveal>
          </Container>
        </Section>
      </Box>
    </Box>
  );
};

export default ProfessionalHomePage;
