import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VolunteerForm from '../forms/VolunteerForm';
import { 
  Group as GroupIcon,
  MusicNote as MusicNoteIcon,
  ChildCare as ChildCareIcon,
  People as PeopleIcon,
  Restaurant as RestaurantIcon,
  Wifi as WifiIcon,
  Build as BuildIcon,
  Favorite as FavoriteIcon,
  Public as PublicIcon,
  ContactMail as ContactIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const GetInvolvedPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const serviceAreas = [
    {
      title: 'Worship Team',
      description: 'Join our worship team as a vocalist, musician, or audio/visual technician.',
      icon: <MusicNoteIcon color="primary" fontSize="large" />,
      contact: 'worship@churchname.com'
    },
    {
      title: 'Children\'s Ministry',
      description: 'Make a difference in the lives of children by helping with Sunday School or childcare.',
      icon: <ChildCareIcon color="primary" fontSize="large" />,
      contact: 'children@churchname.com'
    },
    {
      title: 'Youth Ministry',
      description: 'Mentor and guide teenagers through their spiritual journey.',
      icon: <PeopleIcon color="primary" fontSize="large" />,
      contact: 'youth@churchname.com'
    },
    {
      title: 'Hospitality Team',
      description: 'Welcome visitors, serve refreshments, and help with special events.',
      icon: <RestaurantIcon color="primary" fontSize="large" />,
      contact: 'hospitality@churchname.com'
    },
    {
      title: 'Tech Team',
      description: 'Help with live streaming, sound, and video production.',
      icon: <WifiIcon color="primary" fontSize="large" />,
      contact: 'tech@churchname.com'
    },
    {
      title: 'Facilities Team',
      description: 'Assist with building maintenance, cleaning, and groundskeeping.',
      icon: <BuildIcon color="primary" fontSize="large" />,
      contact: 'facilities@churchname.com'
    },
    {
      title: 'Prayer Team',
      description: 'Join our prayer warriors in interceding for the church and community.',
      icon: <FavoriteIcon color="primary" fontSize="large" />,
    },
    {
      title: 'Outreach & Missions',
      description: 'Participate in local and international mission opportunities.',
      icon: <PublicIcon color="primary" fontSize="large" />,
      contact: 'missions@churchname.com'
    }
  ];

  return (
    <Box sx={{ width: '100%', pt: '0' }}>
      {/* Banner Section - Full Width */}
      <Box
        component="section"
        sx={{
          width: '100%',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          py: 8,
          marginTop: '0',
          textAlign: 'center',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant={isMobile ? 'h4' : 'h3'}
            component="h2"
            sx={{ 
              color: 'white', 
              fontWeight: 700,
              mb: 3,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Join Us in God's Work
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            Join our team of dedicated volunteers and use your God-given talents to serve others and grow in faith.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenModal}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: 3,
              mt: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Join Our Team Today
          </Button>
        </Container>
      </Box>

      <Container 
        component="main" 
        maxWidth={false}
        sx={{ 
          px: { xs: 2, sm: 3, md: 4 },
          py: 6,
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Service Areas Section */}
          <Box sx={{ mt: 8, mb: 6, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main'
              }}
            >
              Ways to Get Involved
            </Typography>
            <Typography 
              variant="h6" 
              color="textSecondary" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 4
              }}
            >
              Discover how you can use your gifts and talents to serve our church community.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {serviceAreas.map((area, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <Box 
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3
                      }}
                    >
                      {React.cloneElement(area.icon, { 
                        sx: { color: 'white', fontSize: '2rem' } 
                      })}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mt: 1
                      }}
                    >
                      {area.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="textSecondary"
                      sx={{ 
                        mb: 3,
                        minHeight: 60
                      }}
                    >
                      {area.description}
                    </Typography>
                    {area.contact && (
                      <Button
                        variant="text"
                        color="primary"
                        startIcon={<ContactIcon />}
                        href={`mailto:${area.contact}`}
                        sx={{ 
                          textTransform: 'none',
                          fontWeight: 500,
                          pl: 0,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Contact Team Leader
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Next Steps Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              textAlign: 'center',
              my: 8
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 3
              }}
            >
              Ready to Take the Next Step?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                mb: 4,
                opacity: 0.9
              }}
            >
              Fill out our volunteer form and we'll help you find the perfect place to serve.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleOpenModal}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Volunteer Now
            </Button>
          </Paper>
          
          {/* Volunteer Form Modal */}
          <Dialog
            open={isModalOpen}
            onClose={handleCloseModal}
            maxWidth="md"
            fullWidth
            scroll="paper"
            aria-labelledby="volunteer-form-dialog"
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                Volunteer Application
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <VolunteerForm onSuccess={handleCloseModal} />
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </Box>
  );
};

export default GetInvolvedPage;
