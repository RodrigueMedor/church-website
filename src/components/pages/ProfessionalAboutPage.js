import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Paper, 
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  alpha,
  Fade,
  Slide,
  Zoom,
  Stack
} from '@mui/material';
import { 
  Close as CloseIcon,
  Church as ChurchIcon, 
  Visibility as VisionIcon, 
  Favorite as MissionIcon,
  Group as GroupIcon,
  Book as BookIcon,
  MusicNote as MusicIcon,
  Favorite as HeartIcon,
  ArrowForward as ArrowForwardIcon,
  EmailOutlined as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday,
  AccessTime,
  LocationOn,
  Star,
  Lightbulb,
  History,
  People,
  VolunteerActivism
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import { usePageContent } from '../../cms';
import { pageDefaults } from '../../cms/defaults';

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
const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh',
  background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #c9a84c 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
    backgroundPosition: 'center 20%',
    opacity: 0.15,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(201, 168, 76, 0.3) 0%, transparent 50%)',
    zIndex: 2,
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1a365d 0%, #2c5282 100%)',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 16,
  border: `1px solid ${alpha('#c9a84c', 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px -5px rgba(26, 54, 93, 0.4)',
  },
}));

const ValueCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(26, 54, 93, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1a365d, #2c5282, #c9a84c)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(26, 54, 93, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .value-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  transition: 'all 0.3s ease',
  boxShadow: `0 10px 25px -5px ${alpha(color, 0.3)}`,
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 15px 35px -5px ${alpha(color, 0.4)}`,
  },
}));

const TeamCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(26, 54, 93, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 15px 35px rgba(26, 54, 93, 0.2)',
  },
}));

const ProfessionalAboutPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const content = usePageContent('about');
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSections(prev => new Set(prev).add(index)), index * 200);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(observer => observer?.disconnect());
  }, []);

  const staffData = (content.staffData || []).length
    ? content.staffData.map(s => ({
        name: s.name,
        role: s.role,
        bio: s.bio,
        fullBio: s.fullBio || s.bio,
        email: s.email || '',
        phone: s.phone || '',
        experience: s.experience || '',
        avatar: (s.name || '').split(' ').map(n => n[0]).join('').toUpperCase() || '?',
        image: s.image || '',
      }))
    : [
        {
          name: t('about.staff.pastor.name'),
          role: t('about.staff.pastor.role'),
          bio: t('about.staff.pastor.bio'),
          fullBio: t('about.staff.pastor.fullBio'),
          email: 'pasteur@fhbck.org',
          phone: '(407) 123-4567',
          experience: '20+ years',
          avatar: 'FB',
          image: '/images/staff/pastor-charles.jpg'
        },
        {
          name: t('about.staff.deacon.name'),
          role: t('about.staff.deacon.role'),
          bio: t('about.staff.deacon.bio'),
          email: 'culte@fhbck.org',
          phone: '(407) 123-4568',
          experience: '15+ years',
          avatar: 'DP',
          image: '/images/staff/deacon-pierre.jpg'
        },
        {
          name: t('about.staff.deaconess.name'),
          role: t('about.staff.deaconess.role'),
          bio: t('about.staff.deaconess.bio'),
          email: 'femmes@fhbck.org',
          phone: '(407) 123-4569',
          experience: '12+ years',
          avatar: 'DM',
          image: '/images/staff/deaconess-joseph.jpg'
        }
      ];

  const defaultLeaders = pageDefaults.about?.otherLeaders || [];
  const leadersSource = (content.otherLeaders || []).length ? content.otherLeaders : defaultLeaders;
  const otherLeadersData = leadersSource.map(s => ({
    name: s.name,
    role: s.role,
    bio: s.bio || '',
    email: s.email || '',
    image: s.image || '',
  }));

  const iconMap = {
    Book: <BookIcon sx={{ fontSize: 36, color: 'white' }} />,
    Music: <MusicIcon sx={{ fontSize: 36, color: 'white' }} />,
    Group: <GroupIcon sx={{ fontSize: 36, color: 'white' }} />,
    Heart: <HeartIcon sx={{ fontSize: 36, color: 'white' }} />,
  };

  const coreValues = (content.coreValues || []).length
    ? content.coreValues.map((cv, i) => {
        const validColor = cv.color && /^#/.test(cv.color) ? cv.color : ['#1a4b8c', '#d32f2f', '#2e7d32', '#ed6c02'][i] || '#1a4b8c';
        return {
          title: cv.title,
          description: cv.description,
          icon: iconMap[cv.icon] || <Star sx={{ fontSize: 36, color: 'white' }} />,
          color: validColor,
          features: cv.features || [],
        };
      })
    : [
        {
          title: t('professionalAbout.coreValuesList.biblicalFoundation.title'),
          description: t('professionalAbout.coreValuesList.biblicalFoundation.description'),
          icon: <BookIcon sx={{ fontSize: 36, color: 'white' }} />,
          color: '#1a4b8c',
          features: t('professionalAbout.coreValuesList.biblicalFoundation.features', { returnObjects: true })
        },
        {
          title: t('professionalAbout.coreValuesList.passionateWorship.title'),
          description: t('professionalAbout.coreValuesList.passionateWorship.description'),
          icon: <MusicIcon sx={{ fontSize: 36, color: 'white' }} />,
          color: '#d32f2f',
          features: t('professionalAbout.coreValuesList.passionateWorship.features', { returnObjects: true })
        },
        {
          title: t('professionalAbout.coreValuesList.unitedCommunity.title'),
          description: t('professionalAbout.coreValuesList.unitedCommunity.description'),
          icon: <GroupIcon sx={{ fontSize: 36, color: 'white' }} />,
          color: '#2e7d32',
          features: t('professionalAbout.coreValuesList.unitedCommunity.features', { returnObjects: true })
        },
        {
          title: t('professionalAbout.coreValuesList.missionDriven.title'),
          description: t('professionalAbout.coreValuesList.missionDriven.description'),
          icon: <HeartIcon sx={{ fontSize: 36, color: 'white' }} />,
          color: '#ed6c02',
          features: t('professionalAbout.coreValuesList.missionDriven.features', { returnObjects: true })
        }
      ];

  const stats = (content.stats || []).length
    ? content.stats.map(s => ({
        number: s.number,
        label: s.label,
        icon: s.icon,
      }))
    : [
        { number: '1985', label: t('professionalAbout.stats.founded'), icon: 'History' },
        { number: '500+', label: t('professionalAbout.stats.members'), icon: 'People' },
        { number: '5', label: t('professionalAbout.stats.ministries'), icon: 'VolunteerActivism' },
        { number: '3', label: t('professionalAbout.stats.services'), icon: 'Church' }
      ];

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <HeroBanner>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Fade in timeout={1000}>
            <Box textAlign="center" color="white">
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                {content.hero?.title || t('professionalAbout.title')}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  mb: 4,
                  opacity: 0.95,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                {content.hero?.subtitle || t('professionalAbout.subtitle')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                "{t('professionalAbout.tagline')}"
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatsCard elevation={0}>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {stat.label}
                      </Typography>
                    </StatsCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </HeroBanner>

      {/* Welcome Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8} ref={(el) => (sectionRefs.current[0] = el)}>
          <Slide direction="up" in={visibleSections.has(0)} timeout={600}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#1a365d',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {t('professionalAbout.welcomeTitle')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.7, mb: 4 }}
              >
                {t('professionalAbout.welcomeDescription')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#c9a84c',
                  mb: 4,
                }}
              >
                {t('professionalAbout.missionStatement')}
              </Typography>
            </Box>
          </Slide>
        </Box>

        {/* Mission & Vision */}
        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ValueCard index={0} elevation={6}>
                    <CardContent sx={{ p: 4 }}>
                      <IconWrapper color="#1a4b8c">
                        <MissionIcon sx={{ fontSize: 36, color: 'white' }} />
                      </IconWrapper>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#1a365d' }}>
                        {t('professionalAbout.ourMission')}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, textAlign: 'center' }}>
                        {content.mission || t('professionalAbout.missionDescription')}
                      </Typography>
                    </CardContent>
                  </ValueCard>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ValueCard index={1} elevation={6}>
                    <CardContent sx={{ p: 4 }}>
                      <IconWrapper color="#c9a84c">
                        <VisionIcon sx={{ fontSize: 36, color: 'white' }} />
                      </IconWrapper>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#1a365d' }}>
                        {t('professionalAbout.ourVision')}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, textAlign: 'center' }}>
                        {content.vision || t('professionalAbout.visionDescription')}
                      </Typography>
                    </CardContent>
                  </ValueCard>
                </Grid>
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Core Values */}
        <Box mb={10} ref={(el) => (sectionRefs.current[2] = el)}>
          <Slide direction="up" in={visibleSections.has(2)} timeout={1000}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  color: '#1a365d',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {t('professionalAbout.coreValues')}
              </Typography>
              <Grid container spacing={3}>
                {coreValues.map((value, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ValueCard index={index + 2} elevation={6}>
                      <CardContent sx={{ p: 4 }}>
                        <IconWrapper color={value.color} className="value-icon">
                          {value.icon}
                        </IconWrapper>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#1a365d' }}>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, textAlign: 'center' }}>
                          {value.description}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center">
                            {value.features.map((feature, idx) => (
                              <Chip
                                key={idx}
                                label={feature}
                                size="small"
                                sx={{
                                  backgroundColor: alpha(value.color, 0.1),
                                  color: value.color,
                                  fontWeight: 500,
                                  fontSize: '0.75rem',
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </CardContent>
                    </ValueCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Pastoral Team */}
        <Box mb={10} ref={(el) => (sectionRefs.current[3] = el)}>
          <Slide direction="up" in={visibleSections.has(3)} timeout={1200}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  color: '#1a365d',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {t('professionalAbout.meetOurTeam')}
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {staffData.map((member, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <TeamCard elevation={6}>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Avatar
                          src={member.image || undefined}
                          imgProps={{ style: { objectPosition: 'top center' } }}
                          sx={{
                            width: 320,
                            height: 320,
                            mx: 'auto',
                            mb: 3,
                            border: '4px solid #c9a84c',
                            boxShadow: '0 8px 25px rgba(26, 54, 93, 0.25)',
                            transition: 'transform 0.3s ease',
                            bgcolor: 'primary.main',
                            fontSize: '3rem',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            },
                          }}
                        >
                          {(member.name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#1a365d' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="#c9a84c" sx={{ mb: 2, fontWeight: 600 }}>
                          {member.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                          {member.bio}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                          <Chip
                            icon={<EmailIcon sx={{ fontSize: 16 }} />}
                            label={member.email}
                            size="small"
                            sx={{
                              backgroundColor: alpha('#1a365d', 0.1),
                              color: '#1a365d',
                              fontWeight: 500,
                            }}
                          />
                          <Chip
                            label={`${member.experience} experience`}
                            size="small"
                            sx={{
                              backgroundColor: alpha('#c9a84c', 0.1),
                              color: '#c9a84c',
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                        
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenModal(member)}
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            borderColor: '#1a365d',
                            color: '#1a365d',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: '#1a365d',
                              color: 'white',
                            },
                          }}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </TeamCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Other Church Leaders */}
        {otherLeadersData.length > 0 && (
          <Box mb={10} ref={(el) => (sectionRefs.current[4] = el)}>
            <Slide direction="up" in={visibleSections.has(4)} timeout={1300}>
              <Box>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    textAlign: 'center',
                    color: '#1a365d',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  {t('professionalAbout.otherLeaders')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 5, textAlign: 'center', maxWidth: '700px', mx: 'auto' }}
                >
                  {t('professionalAbout.otherLeadersSubtitle')}
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  {otherLeadersData.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <TeamCard elevation={6}>
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                          <Avatar
                            src={member.image || undefined}
                            imgProps={{ style: { objectPosition: 'top center' } }}
                            sx={{
                              width: 160,
                              height: 160,
                              mx: 'auto',
                              mb: 3,
                              border: '4px solid #c9a84c',
                              boxShadow: '0 8px 25px rgba(26, 54, 93, 0.25)',
                              bgcolor: 'primary.main',
                              fontSize: '1.5rem',
                            }}
                          >
                            {(member.name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                          </Avatar>
                          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#1a365d' }}>
                            {member.name}
                          </Typography>
                          <Typography variant="body2" color="#c9a84c" sx={{ mb: 2, fontWeight: 600 }}>
                            {member.role}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                            {member.bio}
                          </Typography>
                          {member.email && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EmailIcon />}
                              href={`mailto:${member.email}`}
                              sx={{
                                borderColor: '#1a365d',
                                color: '#1a365d',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                  backgroundColor: '#1a365d',
                                  color: 'white',
                                },
                              }}
                            >
                              {member.email}
                            </Button>
                          )}
                        </CardContent>
                      </TeamCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Slide>
          </Box>
        )}

        {/* Call to Action */}
        <Box
          ref={(el) => (sectionRefs.current[5] = el)}
          sx={{
            py: 5,
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
            <Slide direction="up" in={visibleSections.has(5)} timeout={1500}>
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
                  {t('professionalAbout.joinOurFamily')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  {t('professionalAbout.joinDescription')}
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
                    {t('contactUs')}
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
                    {t('about.visitUs')}
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Container>
        </Box>
      </Container>

      {/* Team Member Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedMember && (
            <Box>
              <Box
                sx={{
                  p: 4,
                  background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
                  color: 'white',
                  position: 'relative',
                }}
              >
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'white',
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Avatar
                  src={selectedMember.image || undefined}
                  imgProps={{ style: { objectPosition: 'top center' } }}
                  sx={{
                    width: 280,
                    height: 280,
                    mx: 'auto',
                    mb: 3,
                    border: '4px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    fontSize: '3rem',
                  }}
                >
                  {(selectedMember.name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                  {selectedMember.name}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9, mb: 2 }}>
                  {selectedMember.role}
                </Typography>
              </Box>
              <Box sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                  {selectedMember.fullBio || selectedMember.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    href={`mailto:${selectedMember.email}`}
                    sx={{
                      borderColor: '#1a365d',
                      color: '#1a365d',
                      '&:hover': {
                        backgroundColor: '#1a365d',
                        color: 'white',
                      },
                    }}
                  >
                    {selectedMember.email}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    href={`tel:${selectedMember.phone}`}
                    sx={{
                      borderColor: '#c9a84c',
                      color: '#c9a84c',
                      '&:hover': {
                        backgroundColor: '#c9a84c',
                        color: '#1a365d',
                      },
                    }}
                  >
                    {selectedMember.phone}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfessionalAboutPage;
