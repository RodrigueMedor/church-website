import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  LocationOn as LocationOnIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon, 
  Schedule as ScheduleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  VolunteerActivism as VolunteerActivismIcon
} from '@mui/icons-material';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openSchedule, setOpenSchedule] = useState(false);
  const handleOpenSchedule = () => setOpenSchedule(true);
  const handleCloseSchedule = () => setOpenSchedule(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors(prev => ({ ...prev, submit: '' }));
      
      try {
        const response = await fetch('/.netlify/functions/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message');
        }

        console.log('Success:', data);
        
        // Show success message
        setIsSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        console.error('Error:', error);
        // Show error message to user
        setErrors(prev => ({
          ...prev,
          submit: error.message || 'Failed to send message. Please try again later.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleCloseSnackbar = () => {
    setIsSuccess(false);
  };
  
  const contactInfo = [
    {
      icon: <LocationOnIcon color="primary" fontSize="large" />,
      title: 'Our Location',
      description: '900 S Thacker Ave\nKissimmee, FL 34741',
      action: 'Get Directions',
      link: 'https://www.google.com/maps/dir//900+S+Thacker+Ave,+Kissimmee,+FL+34741'
    },
    {
      icon: <PhoneIcon color="primary" fontSize="large" />,
      title: 'Phone Number',
      description: '(555) 123-4567',
      action: 'Call Us',
      link: 'tel:5551234567'
    },
    {
      icon: <EmailIcon color="primary" fontSize="large" />,
      title: 'Email Us',
      description: 'info@churchname.com',
      action: 'Send Email',
      link: 'mailto:info@churchname.com'
    },
    {
      icon: <ScheduleIcon color="primary" fontSize="large" />,
      title: 'Service Times',
      description: 'Sunday: 9:00 AM & 11:00 AM\nWednesday: 7:00 PM',
      action: 'View Full Schedule',
      onClick: handleOpenSchedule
    }
  ];
  
  const socialMedia = [
    { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com' },
    { icon: <YouTubeIcon />, name: 'YouTube', url: 'https://youtube.com' },
  ];
  return (
    <Box sx={{ 
      bgcolor: '#f8f9fa',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
      pt: 4,
      position: 'relative',
      zIndex: 1
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/contact-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          py: { xs: 10, md: 15 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.8) 0%, rgba(13, 71, 161, 0.9) 100%)',
            zIndex: 1,
            opacity: 0.7,
          },
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 2 }}>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
              p: { xs: 3, md: 5 },
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 3,
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              We'd Love to Hear From You
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                opacity: 0.95,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                mb: 0,
                color: 'white',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              Whether you have questions, need prayer, or want to get involved, our team is here to help.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 8, pb: 0, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* Contact Form - Moved to left */}
          <Grid item xs={12} md={7} sx={{ position: 'relative', zIndex: 1 }}>
            <Paper elevation={3} sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main', 
                  mb: 3,
                  fontSize: { xs: '1.75rem', sm: '2rem' }
                }}>
                  Send Us a Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ height: '100%' }}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box color="text.secondary">👤</Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box color="text.secondary">✉️</Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box color="text.secondary">📝</Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      variant="outlined"
                      multiline
                      rows={6}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ mt: -2, alignItems: 'flex-start' }}>
                            <Box color="text.secondary" sx={{ mt: 2 }}>💬</Box>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      sx={{
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    {errors.submit && (
                      <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                        {errors.submit}
                      </Typography>
                    )}
                  </Grid>

                  {/* Quick Links Section */}
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <Box sx={{ 
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid rgba(0, 0, 0, 0.05)'
                    }}>
                      <Typography variant="h6" component="h3" sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        '&:before': {
                          content: '""',
                          display: 'inline-block',
                          width: '4px',
                          height: '20px',
                          backgroundColor: 'primary.main',
                          mr: 1.5,
                          borderRadius: '2px'
                        },
                        fontSize: '1.1rem'
                      }}>
                        Quick Links
                      </Typography>
                      <Grid container spacing={2}>
                        {[
                          { 
                            icon: '🙏', 
                            title: 'Prayer Request', 
                            description: 'Submit your prayer needs',
                            link: '/prayer-request',
                            badge: 'New'
                          },
                          { 
                            icon: '👋', 
                            title: 'New Here?', 
                            description: 'Start your journey with us',
                            link: '/new-here',
                            badge: 'Popular'
                          },
                          { 
                            icon: '📖', 
                            title: 'Bible Reading Plan', 
                            description: 'Daily scripture guide',
                            link: '/bible-plan'
                          },
                          { 
                            icon: '🤝', 
                            title: 'Volunteer', 
                            description: 'Serve in our community',
                            link: '/volunteer'
                          },
                          { 
                            icon: '📚', 
                            title: 'Giving', 
                            description: 'Support our mission',
                            link: '/giving'
                          },
                          { 
                            icon: '📝', 
                            title: 'Events', 
                            description: 'Upcoming events and activities',
                            link: '/events'
                          }
                        ].map((item, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Button
                              component={item.link ? 'a' : 'button'}
                              href={item.link}
                              target={item.target || '_self'}
                              onClick={item.onClick}
                              fullWidth
                              sx={{
                                p: 1.5,
                                textAlign: 'left',
                                textTransform: 'none',
                                color: 'text.primary',
                                justifyContent: 'flex-start',
                                // alignItems: 'center',
                                borderRadius: 1.5,
                                backgroundColor: 'background.paper',
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                  transform: 'translateY(-2px)',
                                  boxShadow: 1
                                },
                                transition: 'all 0.2s ease-in-out',
                                minHeight: '72px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Box sx={{ 
                                fontSize: '1.5rem',
                                mr: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                color: 'primary.main',
                                flexShrink: 0
                              }}>
                                {item.icon}
                              </Box>
                              <Box sx={{ position: 'relative', width: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                                    {item.title}
                                  </Typography>
                                  {item.badge && (
                                    <Box sx={{
                                      ml: 1,
                                      px: 1,
                                      py: 0.3,
                                      bgcolor: 'primary.light',
                                      color: 'primary.contrastText',
                                      borderRadius: 1,
                                      fontSize: '0.6rem',
                                      fontWeight: 'bold',
                                      lineHeight: 1,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}>
                                      {item.badge}
                                    </Box>
                                  )}
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                  {item.description}
                                </Typography>
                              </Box>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                  
                  {/* Quick Links Section */}
                  <Grid item xs={12} sx={{ mt: 4 }}>
                    <Box sx={{ 
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid rgba(0, 0, 0, 0.05)'
                    }}>
                      <Typography variant="h6" component="h3" sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        '&:before': {
                          content: '""',
                          display: 'inline-block',
                          width: '4px',
                          height: '20px',
                          backgroundColor: 'primary.main',
                          mr: 1.5,
                          borderRadius: '2px'
                        },
                        fontSize: '1.1rem'
                      }}>
                        Quick Links
                      </Typography>
                      <Grid container spacing={2}>
                        {[
                          { 
                            icon: '🙏', 
                            title: 'Prayer Request', 
                            description: 'Submit your prayer needs',
                            link: '/prayer-request',
                            badge: 'New'
                          },
                          { 
                            icon: '👋', 
                            title: 'New Here?', 
                            description: 'Start your journey with us',
                            link: '/new-here',
                            badge: 'Popular'
                          },
                          { 
                            icon: '📖', 
                            title: 'Bible Reading Plan', 
                            description: 'Daily scripture guide',
                            link: '/bible-plan'
                          },
                          { 
                            icon: '🤝', 
                            title: 'Volunteer', 
                            description: 'Serve in our community',
                            link: '/volunteer'
                          }
                        ].map((item, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Button
                              component={item.link ? 'a' : 'button'}
                              href={item.link}
                              target={item.target || '_self'}
                              onClick={item.onClick}
                              fullWidth
                              sx={{
                                p: 1.5,
                                textAlign: 'left',
                                textTransform: 'none',
                                color: 'text.primary',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                borderRadius: 1.5,
                                backgroundColor: 'background.paper',
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                  transform: 'translateY(-2px)',
                                  boxShadow: 1
                                },
                                transition: 'all 0.2s ease-in-out',
                                minHeight: '72px',
                                height: '100%',
                                display: 'flex',
                                // alignItems: 'center'
                              }}
                            >
                              <Box sx={{ 
                                fontSize: '1.5rem',
                                mr: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                color: 'primary.main',
                                flexShrink: 0
                              }}>
                                {item.icon}
                              </Box>
                              <Box sx={{ position: 'relative', width: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                                    {item.title}
                                  </Typography>
                                  {item.badge && (
                                    <Box sx={{
                                      ml: 1,
                                      px: 1,
                                      py: 0.3,
                                      bgcolor: 'primary.light',
                                      color: 'primary.contrastText',
                                      borderRadius: 1,
                                      fontSize: '0.6rem',
                                      fontWeight: 'bold',
                                      lineHeight: 1,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}>
                                      {item.badge}
                                    </Box>
                                  )}
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                  {item.description}
                                </Typography>
                              </Box>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
          </Grid>
          
          {/* Contact Information and Map - Moved to right */}
          <Grid item xs={12} md={5} sx={{ position: 'relative', zIndex: 1 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 2, 
                background: 'linear-gradient(145deg, #f5f7ff 0%, #f0f4ff 100%)',
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <Box mb={4} textAlign="center">
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '60px',
                      height: '4px',
                      bottom: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: theme.palette.primary.main,
                      borderRadius: '2px'
                    }
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    mt: 3,
                    fontSize: '1.05rem',
                    lineHeight: 1.7
                  }}
                >
                  We're here to help and answer any questions you may have. 
                  Our team is dedicated to providing you with the best support.
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                {contactInfo.map((item, index) => (
                  <Card 
                    key={index} 
                    elevation={0}
                    sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        boxShadow: theme.shadows[2]
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="flex-start">
                        <Box 
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            mr: 3,
                            flexShrink: 0,
                            '& .MuiSvgIcon-root': {
                              fontSize: '1.75rem'
                            }
                          }}
                        >
                          {React.cloneElement(item.icon, { 
                            fontSize: 'large',
                            color: 'inherit'
                          })}
                        </Box>
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            component="h3" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1,
                              color: 'text.primary',
                              fontSize: '1.1rem'
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ 
                              whiteSpace: 'pre-line', 
                              mb: 2,
                              fontSize: '0.95rem',
                              lineHeight: 1.6
                            }}
                          >
                            {item.description}
                          </Typography>
                          <Button 
                            component={item.onClick ? 'button' : 'a'}
                            href={item.link || undefined}
                            target={item.link ? "_blank" : undefined}
                            rel={item.link ? "noopener noreferrer" : undefined}
                            onClick={item.onClick || undefined}
                            size="small" 
                            variant="outlined"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ 
                              textTransform: 'none',
                              borderRadius: 2,
                              px: 2,
                              py: 0.8,
                              fontWeight: 500,
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'primary.contrastText'
                              }
                            }}
                          >
                            {item.action}
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              
              <Box mt="auto" pt={3}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary"
                  textAlign="center"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:before, &:after': {
                      content: '""',
                      flex: 1,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      mx: 2
                    }
                  }}
                >
                  Follow Us
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                  {socialMedia.map((social, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      sx={{
                        backgroundColor: 'background.paper',
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          transform: 'translateY(-3px)'
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.5rem'
                        }
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
          
        </Grid>

        {/* FAQ Section */}
        <Box mt={8} sx={{ width: '100%' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  What are your service times?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our regular service times are Sundays at 9:00 AM and 11:00 AM, and Wednesdays at 7:00 PM. 
                  We also have various Bible studies and small groups throughout the week.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Do you have programs for children and youth?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Yes! We have age-appropriate programs for children and youth during all our services. 
                  Our children's ministry serves ages 0-12, and our youth ministry is for ages 13-18.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                    How can I get involved in serving?
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    We'd love to have you serve with us! You can indicate your interest by filling out the 
                    contact form above, and our team will get in touch with you about available opportunities.
                  </Typography>
                </Box>
                <Box mt="auto" pt={2}>
                  <Button 
                    variant="contained"
                    color="primary"
                    size="medium"
                    component="a"
                    href="/get-involved"
                    startIcon={<VolunteerActivismIcon />}
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      py: 1,
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    Get Involved
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  How can I join a small group?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We have various small groups meeting throughout the week. You can find more information 
                  about our groups and how to join them on our Small Groups page or by contacting the church office.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Map Section */}
        <Box sx={{ 
          width: '100%',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 3,
          mt: 6, // Add margin top to create space after FAQ section
          mb: 2
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.0371640625!2d-81.4284!3d28.3403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd7f1e8c3b3b3b%3A0x1234567890abcdef!2s900%20S%20Thacker%20Ave%2C%20Kissimmee%2C%20FL%2034741!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Church Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Container>
      
      {/* Success Snackbar */}
      <Snackbar
        open={isSuccess}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ 
            width: '100%',
            boxShadow: 3,
            '& .MuiAlert-message': {
              fontWeight: 500
            }
          }}
        >
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>

      {/* Full Schedule Dialog */}
      <Dialog 
        open={openSchedule} 
        onClose={handleCloseSchedule}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            mr: 1,
            fontSize: '1.5rem'
          }
        }}>
          <ScheduleIcon />
          <span>Weekly Service Schedule</span>
        </DialogTitle>
        <DialogContent sx={{ py: 3, px: 3 }}>
          <List>
            {[
              { day: 'Sunday', times: ['9:00 AM - Sunday School', '11:00 AM - Morning Worship'], isHighlighted: true },
              { day: 'Monday', times: ['Office Hours: 9:00 AM - 5:00 PM'] },
              { day: 'Tuesday', times: ['Office Hours: 9:00 AM - 5:00 PM', '7:00 PM - Prayer Meeting (1st & 3rd Tuesday)'] },
              { day: 'Wednesday', times: ['7:00 PM - Bible Study & Youth Group'], isHighlighted: true },
              { day: 'Thursday', times: ['Office Hours: 9:00 AM - 5:00 PM'] },
              { day: 'Friday', times: ['Office Hours: 9:00 AM - 1:00 PM'] },
              { day: 'Saturday', times: ['Office Closed'] }
            ].map((item, index) => (
              <ListItem 
                key={index} 
                sx={{ 
                  bgcolor: item.isHighlighted ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    bgcolor: item.isHighlighted ? 'rgba(25, 118, 210, 0.08)' : 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.day}
                      </Typography>
                      {item.isHighlighted && (
                        <Chip 
                          label="Service Day" 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          sx={{ height: 24, fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box component="span">
                      {item.times.map((time, i) => (
                        <Typography 
                          key={i} 
                          component="div" 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {time}
                        </Typography>
                      ))}
                    </Box>
                  }
                  primaryTypographyProps={{
                    component: 'div',
                  }}
                  secondaryTypographyProps={{
                    component: 'div',
                  }}
                />
              </ListItem>
            ))}
          </List>
          
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              * Office hours are subject to change. Please call ahead to confirm.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseSchedule} 
            variant="contained" 
            color="primary"
            fullWidth
            size="large"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactPage;
