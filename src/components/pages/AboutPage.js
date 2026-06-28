import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Paper, 
  Card,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  useMediaQuery as useMuiMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Church as ChurchIcon, 
  Visibility as VisionIcon, 
  Favorite as MissionIcon,
  Group as GroupIcon,
  Book as BookIcon,
  MusicNote as MusicIcon,
  Favorite as HeartIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

// Styled Components
const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0),
  },
}));

const ValueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  height: '100%',
  borderRadius: 12,
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    borderColor: 'transparent',
    boxShadow: theme.shadows[8],
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

// Component will use translations from i18n instead of hardcoded content

const AboutPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const fullScreen = useMuiMediaQuery(theme.breakpoints.down('md'));
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Build staff and values arrays from translations
  const [staffData, setStaffData] = useState([]);
  const [valuesData, setValuesData] = useState([]);

  useEffect(() => {
    // Build staff data from translations
    const staff = [
      {
        name: t('about.staff.pastor.name'),
        role: t('about.staff.pastor.role'),
        bio: t('about.staff.pastor.bio'),
        email: 'pasteur@fhbck.org',
        phone: '(407) 123-4567',
        photo: `${process.env.PUBLIC_URL}/images/staff/pastor-fritzner-brouard.jpg`
      },
      {
        name: t('about.staff.deacon.name'),
        role: t('about.staff.deacon.role'),
        bio: t('about.staff.deacon.bio'),
        email: 'culte@fhbck.org',
        phone: '(407) 123-4568',
        photo: `${process.env.PUBLIC_URL}/images/staff/deacon-pierre.jpg`
      },
      {
        name: t('about.staff.deaconess.name'),
        role: t('about.staff.deaconess.role'),
        bio: t('about.staff.deaconess.bio'),
        email: 'femmes@fhbck.org',
        phone: '(407) 123-4569',
        photo: `${process.env.PUBLIC_URL}/images/staff/deaconess-joseph.jpg`
      },
    ];
    setStaffData(staff);

    // Build values data from translations
    const values = [
      {
        title: t('about.values.biblicalFoundation.title'),
        description: t('about.values.biblicalFoundation.description'),
        icon: <BookIcon fontSize="large" color="primary" />,
        color: '#1a365d',
      },
      {
        title: t('about.values.passionateWorship.title'),
        description: t('about.values.passionateWorship.description'),
        icon: <MusicIcon fontSize="large" color="primary" />,
        color: '#d32f2f',
      },
      {
        title: t('about.values.unitedCommunity.title'),
        description: t('about.values.unitedCommunity.description'),
        icon: <GroupIcon fontSize="large" color="primary" />,
        color: '#2e7d32',
      },
      {
        title: t('about.values.integralMission.title'),
        description: t('about.values.integralMission.description'),
        icon: <HeartIcon fontSize="large" color="primary" />,
        color: '#ed6c02',
      },
    ];
    setValuesData(values);
  }, [t]);

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTimeout(() => setSelectedMember(null), 300); // Wait for animation to complete
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${process.env.PUBLIC_URL}/images/banner/pastor-sermon_1.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(15, 36, 64, 0.3) 0%, rgba(26, 54, 93, 0.7) 100%)',
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent 0%, #f8f9fa 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 12, textAlign: 'center' }}>
          <Chip 
            label={t('about.ourHistoryTagline')}
            color="primary"
            sx={{ 
              mb: 3, 
              px: 2, 
              py: 1, 
              fontSize: isMobile ? '0.9rem' : '1.2rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: isMobile ? '90%' : '100%',
              whiteSpace: 'normal',
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                padding: '8px 0',
              }
            }} 
          />
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              color: 'white',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              '& span': {
                color: '#ffd700',
                display: 'inline-block',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '5px',
                  left: '5%',
                  width: '90%',
                  height: '8px',
                  backgroundColor: 'rgba(255, 215, 0, 0.3)',
                  zIndex: -1,
                  borderRadius: '4px'
                }
              }
            }}
          >
            First Haitian <span>Baptist Church</span> of Kissimmee
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            component="div"
            sx={{ 
              maxWidth: '900px', 
              mx: 'auto',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,0.95)',
              fontStyle: 'italic',
              fontWeight: 500,
              mb: 2,
              fontSize: isMobile ? '1.25rem' : '1.75rem',
              lineHeight: 1.4
            }}
          >
            {t('about.ourHistoryTagline')}
          </Typography>
          <Divider sx={{ 
            width: '100px', 
            height: '4px', 
            bgcolor: '#ffd700', 
            my: 4,
            mx: 'auto',
            border: 'none'
          }} />
          <Typography 
            variant="subtitle1"
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: isMobile ? '1rem' : '1.25rem',
              lineHeight: 1.6,
              mb: 4
            }}
          >
            {t('about.ourHistoryDescription')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={(e) => {
                e.preventDefault();
                const footer = document.getElementById('services-section');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              href="#services-section"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #1a365d 30%, #0f2440 90%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ transform: 'translateY(-2px)' }}>
                {t('about.ourServices')}
              </Box>
            </Button>
              <Button 
              variant="outlined" 
              color="inherit"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                px: 4,
                py: 1.5,
                borderWidth: '2px',
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderWidth: '2px',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ transform: 'translateY(-2px)' }}>
                {t('contactUs')}
              </Box>
            </Button>
          </Box>
        </Container>
      </Box>

      {/* History Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, mt: -8, mb: 8 }}>
        <Card
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 15px 35px -5px rgba(0,0,0,0.15)',
            },
          }}
        >
          <Grid container>
            <Grid item xs={12} md={4} sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              [theme.breakpoints.down('md')]: {
                py: 6
              }
            }}>
              <Typography variant="h1" component="div" sx={{ 
                fontSize: { xs: '3.5rem', md: '4.5rem' }, 
                fontWeight: 700, 
                lineHeight: 1,
                textAlign: { xs: 'center', md: 'left' }
              }}>
                {t('about.historyYear')}
              </Typography>
              <Typography variant="h4" sx={{ 
                mt: 2, 
                fontWeight: 600,
                textAlign: { xs: 'center', md: 'left' }
              }}>
                {t('about.historyTitle')}
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <ChurchIcon sx={{ fontSize: 60, opacity: 0.2 }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} sx={{ 
              p: { xs: 4, md: 6 }, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              bgcolor: 'background.paper'
            }}>
              <Typography variant="h4" component="h2" sx={{ 
                mb: 3, 
                fontWeight: 700, 
                color: 'primary.main',
                fontSize: { xs: '1.75rem', md: '2rem' }
              }}>
                {t('about.ourHistory')}
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                mb: 4,
                color: 'text.secondary'
              }}>
                {t('about.ourHistoryDescription')}
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<ArrowForwardIcon />}
                    component={RouterLink}
                    to="/contact"
                    size="large"
                    sx={{ 
                      borderRadius: '4px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(45deg, #1a365d 30%, #0f2440 90%)',
                      border: 'none'
                    }}
                  >
                    {t('about.visitUs')}
                  </Button>
                  <Button 
                    variant="outlined"
                    color="inherit"
                    component={RouterLink}
                    to="/ministries"
                    size="large"
                    sx={{ 
                      borderRadius: '4px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderWidth: '2px',
                      '&:hover': {
                        borderWidth: '2px',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {t('about.ourServices')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* Mission & Vision */}
        <Section>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <ValueCard elevation={0}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'rgba(74, 111, 165, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    flexShrink: 0
                  }}>
                    <MissionIcon color="primary" sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {t('about.ourMission')}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' }}>
                  {t('about.mission')}
                </Typography>
              </ValueCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <ValueCard elevation={0}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'rgba(74, 111, 165, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    flexShrink: 0
                  }}>
                    <VisionIcon color="primary" sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {t('about.ourVision')}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' }}>
                  {t('about.vision')}
                </Typography>
              </ValueCard>
            </Grid>
          </Grid>
        </Section>

        {/* Core Values */}
        <Section sx={{ bgcolor: 'background.paper', borderRadius: 4, p: { xs: 3, md: 6 }, mb: 8 }}>
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #2c5282, #1a365d)',
                  borderRadius: '2px'
                }
              }}
            >
              {t('about.coreValues')}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto', mt: 2 }}>
              {t('about.coreValuesSubtitle')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {valuesData.map((value, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 30px -5px ${value.color}33`,
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <Box 
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      bgcolor: `${value.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.4s ease',
                      '& .MuiSvgIcon-root': {
                        color: value.color,
                        transition: 'all 0.3s ease',
                      },
                      '&:hover .MuiSvgIcon-root': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Pastoral Team */}
        <Section sx={{ bgcolor: 'background.paper', py: 8, position: 'relative', overflow: 'hidden' }}>
          {/* Decorative elements */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(74, 111, 165, 0.1) 0%, rgba(255,255,255,0) 70%)',
              transform: 'translate(30%, -30%)',
              zIndex: 0,
            }}
          />
          
          <Container maxWidth="lg">
            <Box textAlign="center" mb={8} position="relative" zIndex={1}>
              <Chip 
                label={t('about.ourTeamLabel')}
                color="primary"
                size="medium"
                sx={{ 
                  mb: 2, 
                  px: 2, 
                  py: 1, 
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)',
                  color: 'white',
                  '& .MuiChip-label': {
                    px: 1,
                  }
                }}
              />
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  background: 'linear-gradient(90deg, #1a365d 0%, #2c5282 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                {t('about.meetOurPastors')}
              </Typography>
              <Typography 
                variant="h6" 
                color="textSecondary" 
                sx={{ 
                  maxWidth: '700px', 
                  mx: 'auto', 
                  mt: 2,
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                {t('about.meetOurPastorsSubtitle')}
              </Typography>
            </Box>

            {/* Carousel Container */}
            <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', px: 2 }}>
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                centerMode={true}
                centerPadding="0"
                autoplay={true}
                autoplaySpeed={5000}
                arrows={true}
                responsive={[
                  {
                    breakpoint: 960,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerMode: false
                    }
                  }
                ]}
                sx={{
                  '& .slick-dots li button:before': {
                    color: theme.palette.primary.main,
                  },
                  '& .slick-dots li.slick-active button:before': {
                    color: theme.palette.primary.main,
                  },
                  '& .slick-prev:before, & .slick-next:before': {
                    color: theme.palette.primary.main,
                  }
                }}
              >
                {staffData.map((member, index) => (
                  <Box key={index} sx={{ px: 2, outline: 'none' }}>
                    <Box 
                      sx={{
                        bgcolor: 'background.default',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease-in-out',
                        height: '100%',
                        display: 'flex!important',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Member Photo */}
                      <Box 
                        sx={{
                          width: '100%',
                          height: 300,
                          overflow: 'hidden',
                          position: 'relative',
                          '&:hover img': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={member.photo}
                          alt={member.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center 15%',
                            transition: 'all 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.03)',
                              objectPosition: 'center 20%',
                            }
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder-profile.jpg';
                          }}
                        />
                      </Box>
                      
                      {/* Member Info */}
                      <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box flexGrow={1}>
                          <Typography 
                            variant="h5" 
                            component="h3" 
                            sx={{ 
                              fontWeight: 700, 
                              mb: 1,
                              color: 'text.primary',
                              textAlign: 'center'
                            }}
                          >
                            {member.name}
                          </Typography>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              color: 'primary.main', 
                              fontWeight: 600, 
                              mb: 2,
                              textAlign: 'center',
                              fontStyle: 'italic'
                            }}
                          >
                            {member.role}
                          </Typography>
                          <Divider sx={{ my: 2, borderColor: 'divider' }} />
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ 
                              lineHeight: 1.7,
                              mb: 3,
                              fontSize: '0.95rem',
                              textAlign: 'center'
                            }}
                          >
                            {member.bio}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ 
                          textAlign: 'center', 
                          mt: 'auto',
                          pt: 2
                        }}>
                          <Button 
                            variant="outlined"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => handleOpenModal(member)}
                            sx={{
                              minWidth: 180,
                              borderRadius: '50px',
                              px: 3,
                              py: 1,
                              textTransform: 'none',
                              fontWeight: 500,
                              borderWidth: 1.5,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(26, 75, 140, 0.2)',
                                '& .MuiButton-endIcon': {
                                  transform: 'translateX(4px)'
                                }
                              },
                              '& .MuiButton-endIcon': {
                                transition: 'transform 0.3s ease',
                              }
                            }}
                          >
                            {t('about.learnMore')}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
            
            <Box textAlign="center" mt={6}>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                component={RouterLink}
                to="/notre-equipe"
                endIcon={<GroupIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: '0 5px 15px rgba(74, 111, 165, 0.3)'
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('about.viewFullTeam')}
              </Button>
            </Box>
          </Container>
        </Section>

        {/* Call to Action */}
        <Section>
          <Box 
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              textAlign: 'center',
              backgroundImage: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                opacity: 0.6,
              }
            }}
          >
            <Container maxWidth="md">
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    backgroundColor: 'white',
                    borderRadius: '2px'
                  }
                }}
              >
                {t('about.readyToJoinUs')}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 5, 
                  opacity: 0.9, 
                  maxWidth: '700px', 
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                {t('about.readyToJoinUsSubtitle')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={RouterLink}
                  to="/contact"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    minWidth: '200px'
                  }}
                >
                  {t('contactUs')}
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  component={RouterLink}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    minWidth: '200px'
                  }}
                >
                  {t('about.viewEvents')}
                </Button>
              </Box>
            </Container>
          </Box>
        </Section>
      </Container>
      
      {/* Simple Footer */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 4,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            color="text.secondary"
            align="center"
          >
            {t('about.copyRight', { year: new Date().getFullYear() })}
          </Typography>
        </Container>
      </Box>

      {/* Team Member Details Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          },
        }}
      >
        {selectedMember && (
          <>
            <Box
              sx={{
                position: 'relative',
                height: fullScreen ? 200 : 350,
                backgroundColor: 'grey.100',
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                },
              }}
            >
              <Box
                component="img"
                src={selectedMember.photo}
                alt={selectedMember.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/placeholder-profile.jpg';
                }}
              />
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                  {selectedMember.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    mb: 3,
                    fontStyle: 'italic',
                  }}
                >
                  {selectedMember.role}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {selectedMember.bio}
                </Typography>

                <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EmailIcon />}
                    href={`mailto:${selectedMember.email}`}
                    sx={{ textTransform: 'none' }}
                  >
                    Envoyer un email
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PhoneIcon />}
                    href={`tel:${selectedMember.phone}`}
                    sx={{ textTransform: 'none' }}
                  >
                    {selectedMember.phone}
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AboutPage;
