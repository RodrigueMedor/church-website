import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  CardActions,
  alpha,
  Fab
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
  Email, 
  Link as LinkIcon, 
  HowToReg,
  Language
} from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Styled components

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));

// Sample data inspired by FBC Kissimmee and Waterstone Church - replace with actual API call
const getEventsData = (t) => [
  {
    id: 1,
    titleKey: 'event.sampleEvents.easterWorship',
    title: t('event.sampleEvents.easterWorship'),
    date: '2026-04-05',
    time: 'Various Times',
    locationKey: 'event.locations.mainSanctuary',
    location: t('event.locations.mainSanctuary'),
    descriptionKey: 'event.descriptions.easterWorship',
    description: t('event.descriptions.easterWorship'),
    image: '/images/church-event.jpg',
    categoryKey: 'event.categories.worship',
    category: t('event.categories.worship'),
    group: 'All Ages',
    registrationUrl: null,
    registrationStatus: 'open',
    featured: true,
    capacity: 500,
    spotsAvailable: null
  },
  {
    id: 2,
    titleKey: 'event.sampleEvents.harvestEvent',
    title: t('event.sampleEvents.harvestEvent'),
    date: '2026-05-15',
    time: '4:00 PM',
    locationKey: 'event.locations.fellowshipHall',
    location: t('event.locations.fellowshipHall'),
    descriptionKey: 'event.descriptions.harvestEvent',
    description: t('event.descriptions.harvestEvent'),
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.fellowship',
    category: t('event.categories.harvest'),
    group: 'All Ages',
    registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=HARVEST2026',
    registrationStatus: 'open',
    featured: true,
    capacity: 200,
    spotsAvailable: 45,
    price: 'Free'
  },
  {
    id: 3,
    titleKey: 'event.sampleEvents.equipCourse',
    title: t('event.sampleEvents.equipCourse'),
    date: '2026-04-01',
    time: '7:00 PM',
    locationKey: 'event.locations.room201',
    location: t('event.locations.room201'),
    descriptionKey: 'event.descriptions.equipCourse',
    description: t('event.descriptions.equipCourse'),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.bibleStudy',
    category: t('event.categories.bibleStudy'),
    group: 'Adults',
    registrationUrl: null,
    registrationStatus: 'open',
    featured: true,
    capacity: 25,
    spotsAvailable: 12,
    price: '$15',
    duration: '8 weeks'
  },
  {
    id: 4,
    titleKey: 'event.sampleEvents.youthGroup',
    title: t('event.sampleEvents.youthGroup'),
    date: '2026-03-28',
    time: '6:30 PM',
    locationKey: 'event.locations.youthCenter',
    location: t('event.locations.youthCenter'),
    descriptionKey: 'event.descriptions.youthGroup',
    description: t('event.descriptions.youthGroup'),
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.youth',
    category: t('event.categories.youth'),
    group: 'Youth',
    registrationUrl: null,
    registrationStatus: 'open',
    featured: false,
    capacity: 50,
    spotsAvailable: 23,
    price: 'Free'
  },
  {
    id: 5,
    titleKey: 'event.sampleEvents.childrensEvent',
    title: t('event.sampleEvents.childrensEvent'),
    date: '2026-04-05',
    time: '9:00 AM',
    locationKey: 'event.locations.childrensWing',
    location: t('event.locations.childrensWing'),
    descriptionKey: 'event.descriptions.childrensEvent',
    description: t('event.descriptions.childrensEvent'),
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.children',
    category: t('event.categories.children'),
    group: 'Children',
    registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=ZDdhZDM0ZTMtN2RkOS00NmU1LThiZWMtYjM5ODAxNjYwYmEz',
    registrationStatus: 'open',
    featured: false,
    capacity: 40,
    spotsAvailable: 15,
    price: 'Free',
    ageRange: 'Ages 4-11'
  },
  {
    id: 6,
    titleKey: 'event.sampleEvents.communityOutreach',
    title: t('event.sampleEvents.communityOutreach'),
    date: '2026-03-30',
    time: '9:00 AM',
    locationKey: 'event.locations.localPark',
    location: t('event.locations.localPark'),
    descriptionKey: 'event.descriptions.communityOutreach',
    description: t('event.descriptions.communityOutreach'),
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.outreach',
    category: t('event.categories.outreach'),
    group: 'All Ages',
    registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=OTJjOTZhNzEtZDgzNy00YWRlLTk1OTQtYjNmNDAxMzVjYjQ2',
    registrationStatus: 'open',
    featured: false,
    capacity: 30,
    spotsAvailable: 8,
    price: 'Free'
  },
  {
    id: 7,
    titleKey: 'event.sampleEvents.meetAndGreet',
    title: t('event.sampleEvents.meetAndGreet'),
    date: '2026-03-30',
    time: '12:00 PM',
    locationKey: 'event.locations.fellowshipHall',
    location: t('event.locations.fellowshipHall'),
    descriptionKey: 'event.descriptions.meetAndGreet',
    description: t('event.descriptions.meetAndGreet'),
    image: 'https://images.unsplash.com/photo-1517454334062-f89810d29bdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.fellowship',
    category: t('event.categories.fellowship'),
    group: 'All Ages',
    registrationUrl: null,
    registrationStatus: 'open',
    featured: false,
    capacity: 50,
    spotsAvailable: null,
    price: 'Free'
  },
  {
    id: 8,
    titleKey: 'event.sampleEvents.serveTeam',
    title: t('event.sampleEvents.serveTeam'),
    date: '2026-04-06',
    time: '6:00 PM',
    locationKey: 'event.locations.mainSanctuary',
    location: t('event.locations.mainSanctuary'),
    descriptionKey: 'event.descriptions.serveTeam',
    description: t('event.descriptions.serveTeam'),
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryKey: 'event.categories.service',
    category: t('event.categories.service'),
    group: 'Adults',
    registrationUrl: null,
    registrationStatus: 'open',
    featured: false,
    capacity: 40,
    spotsAvailable: 22,
    price: 'Free'
  }
];

const EventsPage = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Get events data with translations
  const events = getEventsData(t);
  
  // Church color scheme
  const churchColors = {
    navy: '#1a365d',
    gold: '#d4af37',
    cream: '#faf8f3',
    lightGold: '#f4e4c1'
  };
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  const groups = [
    { id: 'all', nameKey: 'event.groups.all', icon: <Group /> },
    { id: 'youth', nameKey: 'event.groups.youth', icon: <School /> },
    { id: 'adults', nameKey: 'event.groups.adults', icon: <Group /> },
    { id: 'children', nameKey: 'event.groups.children', icon: <FamilyRestroom /> },
    { id: 'worship', nameKey: 'event.groups.worship', icon: <Church /> },
    { id: 'serve', nameKey: 'event.groups.serve', icon: <HowToReg /> },
    { id: 'connection', nameKey: 'event.groups.connection', icon: <EventAvailable /> }
  ];
  
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  const handleGroupChange = (groupId) => {
    setSelectedGroup(groupId);
  }; 
  
  const getGroupEvents = (groupId) => {
    if (groupId === 'all') return events;
    return events.filter(event => {
      const category = event.category || t(event.categoryKey);
      return event.group.toLowerCase() === groupId || 
             (groupId === 'worship' && category === t('event.categories.worship')) ||
             (groupId === 'youth' && category === t('event.categories.youth')) ||
             (groupId === 'children' && category === t('event.categories.children')) ||
             (groupId === 'adults' && (category === t('event.categories.bibleStudy') || category === t('event.categories.service'))) ||
             (groupId === 'serve' && category === t('event.categories.service')) ||
             (groupId === 'connection' && category === t('event.categories.fellowship'));
    });
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredEvents = getGroupEvents(selectedGroup);

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f4f8',
      backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    }}>
      {/* Hero Banner - Inspired by FBC Kissimmee */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #2d3748 100%)',
          color: 'white',
          padding: theme.spacing(12, 0),
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1541557435984-1c79685a082b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.1,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              position: 'relative'
            }}
          >
            {t('event.page.title')}
          </Typography>
          <Box 
            sx={{
              width: 80,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              margin: '0 auto 32px',
              borderRadius: 2
            }} 
          />
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              maxWidth: '700px', 
              mx: 'auto',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 4
            }}
          >
            Join our First Haitian Baptist Church family for worship, fellowship, and spiritual growth in Christ.
          </Typography>
          
          {/* Quick Stats */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            mb: 4,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              p: 2, 
              borderRadius: 2,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>30+</Typography>
              <Typography variant="body2">{t('event.stats.yearsOfMinistry')}</Typography>
            </Box>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              p: 2, 
              borderRadius: 2,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>500+</Typography>
              <Typography variant="body2">{t('event.stats.familiesServed')}</Typography>
            </Box>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              p: 2, 
              borderRadius: 2,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>3</Typography>
              <Typography variant="body2">{t('event.stats.weeklyServices')}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Group Navigation - Enhanced Design */}
      <Box sx={{ 
        bgcolor: 'background.paper',
        py: 5, 
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}>
              Browse by Ministry
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
              Find events and activities that match your interests and stage of life
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: 2.5,
            '& .MuiButton-root': {
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              py: 2,
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid transparent',
              minWidth: 140,
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: theme.shadows[4],
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            }
          }}>
            {groups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup === group.id ? 'contained' : 'outlined'}
                color={selectedGroup === group.id ? 'primary' : 'inherit'}
                onClick={() => handleGroupChange(group.id)}
                startIcon={React.cloneElement(group.icon, {
                  color: selectedGroup === group.id ? 'inherit' : 'primary.main',
                  fontSize: '1.2rem'
                })}
                sx={{
                  bgcolor: selectedGroup === group.id ? 'primary.main' : 'background.paper',
                  color: selectedGroup === group.id ? 'white' : 'text.primary',
                  borderColor: selectedGroup === group.id ? 'primary.main' : 'divider',
                  '&:hover': {
                    bgcolor: selectedGroup === group.id ? 'primary.dark' : alpha(theme.palette.primary.main, 0.1),
                    borderColor: selectedGroup === group.id ? 'primary.dark' : 'primary.main',
                  },
                  minWidth: isMobile ? '100%' : 'auto',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  whiteSpace: 'nowrap'
                }}
              >
                {t(group.nameKey)}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Events Section with Special Headers */}
      <Section sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          
              
          {/* Featured Events Section - Inspired by Waterstone Church */}
          {filteredEvents.filter(event => event.featured).length > 0 && (
            <Box mb={6}>
              <Box sx={{ 
                textAlign: 'center', 
                mb: 4,
                position: 'relative'
              }}>
                <Typography variant="h4" component="h2" sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  mb: 1,
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  Featured Events
                </Typography>
                <Box sx={{ 
                  width: 100, 
                  height: 3, 
                  backgroundColor: theme.palette.primary.main, 
                  margin: '8px auto 0',
                  borderRadius: 2
                }} />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Don't miss out on these special opportunities to connect and grow!
                </Typography>
              </Box>
            </Box>
          )}

          <Box mb={6} textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedGroup === 'all' ? t('event.page.upcomingEvents') : `${t(groups.find(g => g.id === selectedGroup)?.nameKey)} Events`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {selectedGroup === 'all' 
                ? t('event.page.upcomingEventsSubtitle')
                : `${t('event.page.upcomingEventsSubtitle').replace('our upcoming events and', `events and activities for ${t(groups.find(g => g.id === selectedGroup)?.nameKey).toLowerCase()}.`)}`}
            </Typography>
          </Box>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <Grid container spacing={3}>
              {filteredEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: `1px solid ${alpha(churchColors.gold, 0.2)}`,
                      borderColor: 'divider',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        borderColor: churchColors.gold,
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.05)',
                        }
                      },
                    }}
                  >
                    <Box sx={{ 
                      overflow: 'hidden', 
                      height: 180,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
                      }
                    }}>
                      <CardMedia
                        component="img"
                        image={event.image}
                        alt={event.title}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.8s ease',
                        }}
                      />
                      <Chip 
                        label={t(event.categoryKey)} 
                        size="small" 
                        variant="contained"
                        sx={{ 
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          fontWeight: 600, 
                          fontSize: '0.7rem',
                          height: 24,
                          bgcolor: churchColors.gold,
                          color: churchColors.navy,
                          '&:hover': {
                            bgcolor: churchColors.lightGold,
                          },
                          '& .MuiChip-label': {
                            px: 1.5,
                          },
                          boxShadow: theme.shadows[2],
                          zIndex: 1
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3, pt: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday fontSize="inherit" sx={{ mr: 0.75, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Schedule fontSize="inherit" sx={{ mr: 0.75, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.time}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 1.5,
                          minHeight: '2.8em',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.4
                        }}
                      >
                        {event.title || t(event.titleKey)}
                      </Typography>
                      
                      {/* Event Description */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minHeight: '4.2em'
                        }}
                      >
                        {event.description || t(event.descriptionKey)}
                      </Typography>
                    </CardContent>
                    
                    <CardActions sx={{ 
                      px: 3,
                      pb: 2,
                      pt: 0,
                      display: 'flex',
                      gap: 1,
                      '& .MuiButton-root': {
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '6px',
                        px: 2.5,
                        py: 0.75,
                        fontSize: '0.875rem',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: theme.shadows[2]
                        },
                        transition: 'all 0.2s ease'
                      }
                    }}>
                      <Button 
                        variant="contained"
                        color="primary"
                        size="small" 
                        onClick={() => handleOpenModal(event)}
                        fullWidth
                        sx={{
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }}
                      >
                        View details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: theme.shadows[1]
            }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('event.page.noEventsFound')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('event.page.noEventsDescription')}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setSelectedGroup('all');
                }}
              >
                {t('event.page.viewAllEvents')}
              </Button>
            </Box>
          )}
          
        </Container>
      </Section>

      {/* Event Details Modal */}
      <Dialog 
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: '900px',
            width: '90%',
            maxHeight: '90vh',
            m: 2
          }
        }}
      >
        {/* Header with Close Button */}
        <DialogTitle sx={{ 
          p: 0,
          position: 'relative',
          '& .MuiIconButton-root': {
            position: 'absolute',
            right: 16,
            top: 16,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,1)'
            }
          }
        }}>
          <Box 
            sx={{
              height: 200,
              backgroundImage: `url(${selectedEvent?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
              }
            }}
          >
            <Box sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              p: 4,
              color: 'white',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <Chip 
                label={selectedEvent ? t(selectedEvent.categoryKey) : ''}
                color="primary"
                size="small"
                sx={{ 
                  mb: 1.5,
                  color: 'white',
                  fontWeight: 600,
                  bgcolor: theme.palette.primary.main,
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.5
                  }
                }}
              />
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 700,
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {selectedEvent ? t(selectedEvent.titleKey) : ''}
              </Typography>
            </Box>
            <IconButton 
              onClick={handleCloseModal}
              size="large"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'rgba(255,255,255,0.95)'
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Grid container spacing={0}>
            {/* Main Content */}
            <Grid item xs={12} md={8} sx={{ p: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                  {t('event.page.eventDetails')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: 'text.secondary' }}>
                  {selectedEvent ? t(selectedEvent.descriptionKey) : 'No description available.'}
                </Typography>
                
                {/* Additional Details Section */}
                <Box sx={{ 
                  bgcolor: 'grey.50', 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  {selectedEvent?.title === 'La Moisson (Harvest Event)' ? (
                    <>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <InfoOutlined sx={{ mr: 1, color: 'primary.main' }} />
                        Upcoming Event: La Moisson (Harvest Event)
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        A spiritual gathering focused on evangelism, growth, and community outreach.
                      </Typography>
                      <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Evangelism & Outreach Program" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Community Gathering" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Worship & Praise Session" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Guest Speaker / Special Message" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Prayer for Souls & Growth" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Fellowship & Refreshments" />
                        </ListItem>
                      </List>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <InfoOutlined sx={{ mr: 1, color: 'primary.main' }} />
                        Easter Worship Week Services
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        Join us for a week of special services celebrating the resurrection of Jesus Christ.
                      </Typography>
                      <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Easter Worship Week (Semaine de Pâques)" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Holy Week Prayer Services" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Good Friday Service" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Easter Vigil (optional)" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Easter Sunday Celebration (Dimanche de Pâques)" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Special Worship & Resurrection Message" />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary="Family Gathering & Fellowship" />
                        </ListItem>
                      </List>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4} sx={{ 
              bgcolor: 'grey.50',
              p: 4,
              borderLeft: { md: '1px solid' },
              borderTop: { xs: '1px solid', md: 'none' },
              borderColor: 'divider'
            }}>
              
              {/* Date & Time */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                  {t('event.page.dateTime')}
                </Typography>
                <Box sx={{ pl: 3, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {selectedEvent && new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {selectedEvent?.time}
                  </Typography>
                  <Button 
                    size="small" 
                    startIcon={<EventAvailable />}
                    sx={{ 
                      textTransform: 'none',
                      color: 'primary.main',
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {t('event.page.addToCalendar')}
                  </Button>
                </Box>
              </Box>

              {/* Location */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  {t('event.page.location')}
                </Typography>
                <Box sx={{ pl: 3 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {selectedEvent ? t(selectedEvent.locationKey) : ''}
                  </Typography>
                  <Button 
                    size="small" 
                    startIcon={<MapOutlined />}
                    sx={{ 
                      textTransform: 'none',
                      color: 'primary.main',
                      p: 0,
                      mt: 0.5,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {t('event.page.viewOnMap')}
                  </Button>
                </Box>
              </Box>

              {/* Share */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Share sx={{ mr: 1, color: 'primary.main' }} />
                  {t('event.page.shareThisEvent')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, pl: 3 }}>
                  <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.200' } }}>
                    <Facebook color="primary" />
                  </IconButton>
                  <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.200' } }}>
                    <Twitter color="primary" />
                  </IconButton>
                  <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.200' } }}>
                    <Email color="primary" />
                  </IconButton>
                  <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.200' } }}>
                    <LinkIcon color="primary" />
                  </IconButton>
                </Box>
              </Box>

              {/* No Registration Info */}
              <Box sx={{ 
                textAlign: 'center',
                py: 2,
                px: 3,
                bgcolor: 'grey.100',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.300'
              }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {t('event.page.noRegistrationRequired')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {t('event.page.joinUsDirectly')}
                </Typography>
              </Box>

              {/* Contact Info */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  {t('event.page.questionsContact')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  events@church.org
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Language Toggle Button */}
      <Fab
        color="primary"
        size="medium"
        onClick={() => changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          bgcolor: churchColors.gold,
          color: churchColors.navy,
          '&:hover': {
            bgcolor: churchColors.lightGold,
            transform: 'scale(1.05)'
          },
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <Language />
      </Fab>
    </Box>
  );
};

export default EventsPage;
