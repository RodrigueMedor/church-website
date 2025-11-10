import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  CardActions,
  alpha
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
} from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Styled components
const HeroBanner = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(15, 0),
  textAlign: 'center',
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ModalImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 300,
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));

// Sample data - replace with actual API call
const events = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: '2025-11-05',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly worship service featuring inspiring music, prayer, and a powerful message from our pastor. All are welcome to experience God\'s presence and connect with our church family.',
    image: '/images/church-event.jpg',
    category: 'Worship',
    group: 'All Ages'
  },
  {
    id: 2,
    title: 'Youth Group Night',
    date: '2025-11-07',
    time: '6:30 PM',
    location: 'Youth Center',
    description: 'A dynamic evening for teens (13-18) with games, worship, and relevant Bible teaching. Connect with peers and grow in your faith journey.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80',
    category: 'Youth',
    group: 'Youth'
  },
  {
    id: 3,
    title: 'Community Outreach Day',
    date: '2025-11-12',
    time: '9:00 AM',
    location: 'Local Park',
    description: 'Be the hands and feet of Jesus as we serve our local community. Various service opportunities available for all ages and abilities.',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    category: 'Outreach',
    group: 'All Ages'
  },
  {
    id: 4,
    title: 'Men\'s Bible Study',
    date: '2025-11-08',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description: 'Join other men as we study God\'s Word and encourage one another in our walk with Christ. Coffee and snacks provided.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Bible Study',
    group: 'Adults'
  },
  {
    id: 5,
    title: 'Women\'s Fellowship',
    date: '2025-11-10',
    time: '6:30 PM',
    location: 'Room 201',
    description: 'A time of worship, prayer, and Bible study designed specifically for women of all ages and stages of life.',
    image: 'https://images.unsplash.com/photo-1517454334062-f89810d29bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Fellowship',
    group: 'Adults'
  },
  {
    id: 6,
    title: 'Children\'s Sunday School',
    date: '2025-11-12',
    time: '9:30 AM',
    location: 'Children\'s Wing',
    description: 'Engaging Bible lessons and activities for children ages 3-12. Help your kids build a strong foundation of faith in a fun, safe environment.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba780c3bfe72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Children',
    group: 'Children'
  }
];

const categories = ['All', 'Worship', 'Bible Study', 'Fellowship', 'Outreach', 'Youth', 'Children'];
const groups = [
  { id: 'all', name: 'All Groups', icon: <Group /> },
  { id: 'youth', name: 'Youth', icon: <School /> },
  { id: 'adults', name: 'Adults', icon: <Group /> },
  { id: 'children', name: 'Children', icon: <FamilyRestroom /> },
  { id: 'worship', name: 'Worship', icon: <Church /> }
];

const EventsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  const handleGroupChange = (groupId) => {
    setSelectedGroup(groupId);
    // Reset category when changing groups
    setSelectedCategory('All');
  }; 
  
  const getGroupEvents = (groupId) => {
    if (groupId === 'all') return events;
    return events.filter(event => event.group.toLowerCase() === groupId || 
                               (groupId === 'worship' && event.category === 'Worship') ||
                               (groupId === 'youth' && event.category === 'Youth') ||
                               (groupId === 'children' && event.category === 'Children') ||
                               (groupId === 'adults' && (event.category === 'Bible Study' || event.category === 'Fellowship')));
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const groupEvents = getGroupEvents(selectedGroup);
  const filteredEvents = selectedCategory === 'All' 
    ? groupEvents 
    : groupEvents.filter(event => event.category === selectedCategory);

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f4f8',
      backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    }}>
      {/* Hero Banner */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1541557435984-1c79685a082b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f5f5f5',
          color: 'white',
          padding: theme.spacing(15, 0),
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Church Events
          </Typography>
          <Divider 
            sx={{ 
              width: 80, 
              height: 4, 
              backgroundColor: theme.palette.primary.main, 
              margin: '0 auto 24px',
              border: 'none'
            }} 
          />
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: 400,
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Join us for worship, fellowship, and spiritual growth through our church events and activities.
          </Typography>
        </Container>
      </Box>

      {/* Group Navigation */}
      <Box sx={{ bgcolor: 'grey.50', py: 4, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
            Browse by Ministry
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: 2,
            '& .MuiButton-root': {
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: theme.shadows[3]
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
                  color: selectedGroup === group.id ? 'inherit' : 'action'
                })}
                sx={{
                  bgcolor: selectedGroup === group.id ? 'primary.main' : 'background.paper',
                  color: selectedGroup === group.id ? 'white' : 'text.primary',
                  borderColor: selectedGroup === group.id ? 'primary.main' : 'divider',
                  '&:hover': {
                    bgcolor: selectedGroup === group.id ? 'primary.dark' : 'action.hover',
                    borderColor: selectedGroup === group.id ? 'primary.dark' : 'text.secondary',
                  },
                  minWidth: isMobile ? '100%' : 'auto',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  whiteSpace: 'nowrap'
                }}
              >
                {group.name}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Events Section */}
      <Section sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Box mb={6} textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedGroup === 'all' ? 'Upcoming Events' : `${groups.find(g => g.id === selectedGroup)?.name} Events`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {selectedGroup === 'all' 
                ? 'Explore our upcoming events and join us in worship, fellowship, and service.'
                : `Discover events and activities for ${groups.find(g => g.id === selectedGroup)?.name.toLowerCase()}.`}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: 4,
              '& .MuiTabs-indicator': {
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 'auto',
                px: 2,
                mx: 1,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                },
              }
            }}>
              <Tabs
                value={selectedCategory}
                onChange={handleCategoryChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="event categories"
                sx={{
                  '& .MuiTabs-flexContainer': {
                    gap: 1,
                  }
                }}
              >
                {categories.map((category) => (
                  <Tab 
                    key={category} 
                    label={category} 
                    value={category} 
                    sx={{
                      borderRadius: '20px',
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  />
                ))}
              </Tabs>
            </Box>
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
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4],
                        borderColor: 'primary.light',
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.03)',
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
                        label={event.category} 
                        size="small" 
                        color="primary" 
                        variant="contained"
                        sx={{ 
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          fontWeight: 600, 
                          fontSize: '0.7rem',
                          height: 24,
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
                        {event.title}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: 'text.secondary',
                        mb: 2.5,
                        '& svg': { 
                          fontSize: '1rem', 
                          mr: 1,
                          color: 'primary.main'
                        }
                      }}>
                        <LocationOn fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ 
                      px: 3,
                      pb: 2,
                      pt: 0,
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
                        View Details
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
                No events found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                There are currently no events scheduled for this category.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedGroup('all');
                }}
              >
                View All Events
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
                label={selectedEvent?.category}
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
                {selectedEvent?.title}
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
                  Event Details
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: 'text.secondary' }}>
                  {selectedEvent?.description || 'No description available.'}
                </Typography>
                
                {/* Additional Details Section */}
                <Box sx={{ 
                  bgcolor: 'grey.50', 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <InfoOutlined sx={{ mr: 1, color: 'primary.main' }} />
                    Additional Information
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Join us for an inspiring time of worship and teaching. This event is open to all age groups and includes:
                  </Typography>
                  <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleOutline sx={{ color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary="Inspiring worship music" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleOutline sx={{ color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary="Engaging biblical teaching" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleOutline sx={{ color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary="Fellowship with other believers" />
                    </ListItem>
                  </List>
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
                  Date & Time
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
                    Add to Calendar
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
                  Location
                </Typography>
                <Box sx={{ pl: 3 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {selectedEvent?.location}
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
                    View on Map
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
                  Share This Event
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

              {/* Register Button */}
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                startIcon={<HowToReg />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Register Now
              </Button>

              {/* Contact Info */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Questions? Contact us at
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  events@church.org
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventsPage;
