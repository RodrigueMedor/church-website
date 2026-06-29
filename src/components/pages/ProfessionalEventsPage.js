import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
  Slide,
  Zoom,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  Schedule,
  Close,
  Group,
  FamilyRestroom,
  School,
  Church,
  Description as DescriptionIcon,
  InfoOutlined,
  CheckCircleOutline,
  EventAvailable,
  MapOutlined,
  Share,
  Facebook,
  Twitter,
  EmailOutlined as EmailIcon,
  Link as LinkIcon,
  HowToReg,
  Language,
  ArrowForward,
  AccessTime,
  Star,
  People,
  VolunteerActivism
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import { usePageContent } from '../../cms';

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
  background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/images/banner/DSC_2131.jpg) center / cover no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const EventCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(107, 70, 193, 0.1)',
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
    background: 'linear-gradient(90deg, #6B46C1, #9333EA)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(107, 70, 193, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .event-image': {
      transform: 'scale(1.05)',
    },
    '& .event-overlay': {
      opacity: 1,
    },
  },
}));

const CategoryCard = styled(Paper)(({ theme, category }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(107, 70, 193, 0.1)',
  borderRadius: 12,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(107, 70, 193, 0.15)',
    backgroundColor: alpha('#6B46C1', 0.05),
  },
  '&.active': {
    backgroundColor: alpha('#6B46C1', 0.1),
    borderColor: '#6B46C1',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  background: alpha('#fff', 0.08),
  backdropFilter: 'blur(12px)',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 12,
  border: `1px solid ${alpha('#C9A84C', 0.15)}`,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
    opacity: 0.6,
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 30px ${alpha('#000', 0.25)}`,
    borderColor: alpha('#C9A84C', 0.4),
    '&::before': {
      opacity: 1,
      left: '10%',
      right: '10%',
    },
  },
}));

const ProfessionalEventsPage = () => {
  const { t } = useTranslation();
  const content = usePageContent('events');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const events = content.items || [
    {
      id: 1,
      title: 'Sunday Worship Service',
      description: 'Join us for our weekly worship service with inspiring music, biblical teaching, and community fellowship.',
      date: 'Every Sunday',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      category: 'worship',
      image: '/images/banner/pastor-sermon_1.JPG',
      attendees: '200+',
      features: ['Live Worship', 'Biblical Teaching', 'Children\'s Church', 'Fellowship'],
      color: '#6B46C1'
    },
    {
      id: 2,
      title: 'Youth Night',
      description: 'An exciting evening for teenagers with games, worship, and relevant messages about faith and life.',
      date: 'Every Friday',
      time: '7:00 PM',
      location: 'Youth Center',
      category: 'youth',
      image: '/images/banner/youth-banner.jpg',
      attendees: '45+',
      features: ['Games', 'Worship', 'Bible Study', 'Snacks'],
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Women\'s Bible Study',
      description: 'A time for women to gather, study God\'s Word, and build meaningful relationships.',
      date: 'Every Tuesday',
      time: '7:00 PM',
      location: 'Fellowship Hall',
      category: 'women',
      image: '/images/banner/women-banner.jpg',
      attendees: '30+',
      features: ['Bible Study', 'Prayer', 'Fellowship', 'Refreshments'],
      color: '#9C27B0'
    },
    {
      id: 4,
      title: 'Men\'s Breakfast',
      description: 'Monthly gathering for men to enjoy breakfast, fellowship, and spiritual encouragement.',
      date: 'First Saturday',
      time: '8:00 AM',
      location: 'Fellowship Hall',
      category: 'men',
      image: '/images/banner/men-banner.JPG',
      attendees: '25+',
      features: ['Breakfast', 'Fellowship', 'Testimony', 'Prayer'],
      color: '#FF9800'
    },
    {
      id: 5,
      title: 'Family Fun Day',
      description: 'A fun-filled day for the whole family with games, food, and activities for all ages.',
      date: 'Monthly',
      time: '2:00 PM',
      location: 'Church Grounds',
      category: 'family',
      image: '/images/banner/children-banner.JPG',
      attendees: '100+',
      features: ['Games', 'Food', 'Activities', 'Prizes'],
      color: '#4CAF50'
    },
    {
      id: 6,
      title: 'Prayer Meeting',
      description: 'Join us for a powerful time of prayer and intercession for our church and community.',
      date: 'Every Wednesday',
      time: '6:30 PM',
      location: 'Prayer Room',
      category: 'prayer',
      image: '/images/easter/DSC_2261_proper.jpg',
      attendees: '20+',
      features: ['Corporate Prayer', 'Testimonies', 'Worship', 'Fellowship'],
      color: '#F44336'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', icon: <EventAvailable />, color: '#6B46C1' },
    { id: 'worship', name: 'Worship', icon: <Church />, color: '#6B46C1' },
    { id: 'youth', name: 'Youth', icon: <Group />, color: '#2196F3' },
    { id: 'women', name: 'Women', icon: <FamilyRestroom />, color: '#9C27B0' },
    { id: 'men', name: 'Men', icon: <People />, color: '#FF9800' },
    { id: 'family', name: 'Family', icon: <VolunteerActivism />, color: '#4CAF50' },
    { id: 'prayer', name: 'Prayer', icon: <DescriptionIcon />, color: '#F44336' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const stats = content.stats || [
    { number: '15+', label: 'Monthly Events', icon: <CalendarToday /> },
    { number: '500+', label: 'Monthly Attendees', icon: <People /> },
    { number: '7', label: 'Event Categories', icon: <EventAvailable /> },
    { number: '100%', label: 'Christ-Centered', icon: <Church /> }
  ];

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTimeout(() => setSelectedEvent(null), 300);
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
                {content.hero?.title || 'Church Events'}
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
                {content.hero?.subtitle || '"Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another—and all the more as you see the Day approaching."'}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontStyle: 'italic', opacity: 0.85, mb: 4 }}
              >
                Hebrews 10:25
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={2.5} sx={{ mt: 14, mb: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatsCard elevation={0}>
                      <Box sx={{ color: alpha('#C9A84C', 0.8), mb: 1.5, '& .MuiSvgIcon-root': { fontSize: 28 } }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, color: '#C9A84C', fontFamily: '"Playfair Display", serif' }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.85rem' }}>
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

      {/* Categories Section */}
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
                  color: '#6B46C1',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Event Categories
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.7, mb: 4 }}
              >
                Browse our events by category to find the perfect gathering for you and your family.
              </Typography>
            </Box>
          </Slide>
        </Box>

        {/* Category Cards */}
        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Grid container spacing={3}>
                {categories.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                    <CategoryCard
                      elevation={3}
                      className={selectedCategory === category.id ? 'active' : ''}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Box sx={{ color: category.color, mb: 1 }}>
                        {category.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        {category.name}
                      </Typography>
                    </CategoryCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Events Grid */}
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
                  color: '#6B46C1',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Upcoming Events
              </Typography>
              <Grid container spacing={3}>
                {filteredEvents.map((event, index) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id} sx={{ display: 'flex' }}>
                    <EventCard index={index} elevation={6}>
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={event.image}
                          alt={event.title}
                          className="event-image"
                          sx={{
                            transition: 'transform 0.5s ease',
                          }}
                        />
                        <Box
                          className="event-overlay"
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(107, 70, 193, 0.8)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => handleOpenModal(event)}
                            sx={{
                              backgroundColor: 'white',
                              color: '#6B46C1',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#6B46C1' }}>
                          {event.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                          {event.description}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CalendarToday sx={{ fontSize: 18, color: '#6B46C1' }} />
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {event.date}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <AccessTime sx={{ fontSize: 18, color: '#6B46C1' }} />
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {event.time}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOn sx={{ fontSize: 18, color: '#6B46C1' }} />
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {event.location}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <People sx={{ fontSize: 18, color: '#6B46C1' }} />
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {event.attendees} attending
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            {event.features.map((feature, idx) => (
                              <Chip
                                key={idx}
                                label={feature}
                                size="small"
                                sx={{
                                  backgroundColor: alpha(event.color, 0.1),
                                  color: event.color,
                                  fontWeight: 500,
                                  fontSize: '0.75rem',
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>

                        <Box sx={{ mt: 'auto' }}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleOpenModal(event)}
                            endIcon={<ArrowForward />}
                            sx={{
                              borderColor: '#6B46C1',
                              color: '#6B46C1',
                              textTransform: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                backgroundColor: '#6B46C1',
                                color: 'white',
                              },
                            }}
                          >
                            Learn More
                          </Button>
                        </Box>
                      </CardContent>
                    </EventCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Call to Action */}
        <Box
          ref={(el) => (sectionRefs.current[3] = el)}
          sx={{
            py: 5,
            background: 'linear-gradient(135deg, #6B46C1 0%, #9333EA 100%)',
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
              background: 'url(/images/banner/DSC_2131.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(3)} timeout={1200}>
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
                  Join Our Next Event!
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
                  We'd love to see you at our upcoming events. Come worship with us, build relationships, 
                  and grow in your faith alongside our church family.
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
                        color: '#6B46C1',
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/ministries"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                      color: '#6B46C1',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                      },
                    }}
                  >
                    Explore Ministries
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Container>
        </Box>
      </Container>

      {/* Event Details Modal */}
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
        {selectedEvent && (
          <>
            <Box
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #6B46C1 0%, #9333EA 100%)',
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
                <Close />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {selectedEvent.title}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {selectedEvent.date} at {selectedEvent.time}
              </Typography>
            </Box>
            <DialogContent sx={{ p: 4 }}>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                {selectedEvent.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B46C1' }}>
                  Event Details
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarToday sx={{ color: '#6B46C1' }} />
                    <Typography variant="body2">{selectedEvent.date}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccessTime sx={{ color: '#6B46C1' }} />
                    <Typography variant="body2">{selectedEvent.time}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOn sx={{ color: '#6B46C1' }} />
                    <Typography variant="body2">{selectedEvent.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <People sx={{ color: '#6B46C1' }} />
                    <Typography variant="body2">{selectedEvent.attendees} attending</Typography>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6B46C1' }}>
                  What to Expect
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {selectedEvent.features.map((feature, idx) => (
                    <Chip
                      key={idx}
                      label={feature}
                      size="small"
                      sx={{
                        backgroundColor: alpha(selectedEvent.color, 0.1),
                        color: selectedEvent.color,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 4, pt: 0 }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{
                  borderColor: '#6B46C1',
                  color: '#6B46C1',
                  '&:hover': {
                    backgroundColor: '#6B46C1',
                    color: 'white',
                  },
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/contact"
                sx={{
                  backgroundColor: '#6B46C1',
                  '&:hover': {
                    backgroundColor: '#9333EA',
                  },
                }}
              >
                Register for Event
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProfessionalEventsPage;
