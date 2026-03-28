import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  useTheme,
  Alert,
  Snackbar,
  InputAdornment,
  Card,
  CardContent,
  useMediaQuery,
  alpha,
  Fade,
  Slide,
  Zoom,
  Stack,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import { 
  LocationOn as LocationOnIcon, 
  Phone as PhoneIcon, 
  EmailOutlined as EmailIcon, 
  Schedule as ScheduleIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Church as ChurchIcon,
  AccessTime,
  People,
  Map,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  ArrowForward,
  Star,
  Language,
  Public
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

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
  minHeight: '60vh',
  background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
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
    background: 'url(/images/banner/contact-banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.2,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(46, 125, 50, 0.3) 0%, transparent 50%)',
    zIndex: 2,
  },
}));

const ContactCard = styled(Paper)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(46, 125, 50, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(4),
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2E7D32, #1B5E20)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(46, 125, 50, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .contact-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(46, 125, 50, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(46, 125, 50, 0.15)',
    backgroundColor: alpha('#2E7D32', 0.05),
  },
}));

const SocialButton = styled(IconButton)(({ theme, color }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: color || '#2E7D32',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 8px 25px ${alpha(color || '#2E7D32', 0.4)}`,
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2E7D32 0%, #1B5E20 100%)',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 16,
  border: `1px solid ${alpha('#1B5E20', 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px -5px rgba(46, 125, 50, 0.4)',
  },
}));

const ProfessionalContactPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
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
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        console.error('Error:', error);
        setErrors(prev => ({ 
          ...prev, 
          submit: 'Failed to send message. Please try again.' 
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactInfo = [
    {
      title: 'Visit Us',
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      content: '900 S Thacker Ave\nKissimmee, FL 34741',
      color: '#2E7D32'
    },
    {
      title: 'Call Us',
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      content: '(407) 123-4567\n(407) 123-4568',
      color: '#1976D2'
    },
    {
      title: 'Email Us',
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      content: 'info@fhbck.org\npasteur@fhbck.org',
      color: '#F57C00'
    },
    {
      title: 'Service Times',
      icon: <ScheduleIcon sx={{ fontSize: 32 }} />,
      content: 'Sunday: 9:30 AM & 11:30 AM\nWednesday: 7:00 PM',
      color: '#7B1FA2'
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, url: '#', color: '#1877F2' },
    { icon: <Twitter />, url: '#', color: '#1DA1F2' },
    { icon: <Instagram />, url: '#', color: '#E4405F' },
    { icon: <YouTube />, url: '#', color: '#FF0000' }
  ];

  const stats = [
    { number: '35+', label: 'Years of Ministry', icon: <ChurchIcon /> },
    { number: '500+', label: 'Church Members', icon: <People /> },
    { number: '7', label: 'Weekly Services', icon: <ScheduleIcon /> },
    { number: '24/7', label: 'Prayer Support', icon: <Star /> }
  ];

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
                Get in Touch
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
                "Therefore encourage one another and build each other up, just as in fact you are doing."
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontStyle: 'italic', opacity: 0.85, mb: 6 }}
              >
                1 Thessalonians 5:11
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={3} sx={{ mb: 6 }}>
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

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Contact Information */}
        <Box mb={10} ref={(el) => (sectionRefs.current[0] = el)}>
          <Slide direction="up" in={visibleSections.has(0)} timeout={600}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 5,
                  textAlign: 'center',
                  color: '#2E7D32',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Ways to Connect
              </Typography>
              <Grid container spacing={4}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ContactCard index={index} elevation={6}>
                      <Box className="contact-icon" sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 3,
                        transition: 'transform 0.3s ease',
                      }}>
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            backgroundColor: alpha(info.color, 0.1),
                            color: info.color,
                          }}
                        >
                          {info.icon}
                        </Avatar>
                      </Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        textAlign: 'center',
                        color: '#2E7D32' 
                      }}>
                        {info.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          textAlign: 'center',
                          whiteSpace: 'pre-line',
                          lineHeight: 1.6 
                        }}
                      >
                        {info.content}
                      </Typography>
                    </ContactCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Contact Form and Map */}
        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Grid container spacing={6}>
                {/* Contact Form */}
                <Grid item xs={12} md={7}>
                  <ContactCard index={0} elevation={6}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 600, 
                      mb: 4, 
                      color: '#2E7D32',
                      textAlign: 'center'
                    }}>
                      Send Us a Message
                    </Typography>
                    
                    {errors.submit && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {errors.submit}
                      </Alert>
                    )}
                    
                    <Box component="form" onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Your Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Your Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon sx={{ color: '#2E7D32' }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
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
                            required
                            multiline
                            rows={5}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            endIcon={<SendIcon />}
                            sx={{
                              px: 4,
                              py: 2,
                              background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
                              },
                            }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </ContactCard>
                </Grid>

                {/* Map and Additional Info */}
                <Grid item xs={12} md={5}>
                  <Stack spacing={4}>
                    {/* Interactive Map */}
                    <ContactCard index={1} elevation={6}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        mb: 3, 
                        color: '#2E7D32',
                        textAlign: 'center'
                      }}>
                        Find Us
                      </Typography>
                      <Box sx={{ position: 'relative' }}>
                        <iframe
                          src="https://maps.google.com/?q=900+S+Thacker+Ave,Kissimmee,FL&output=embed"
                          width="100%"
                          height="250"
                          style={{ border: 0, borderRadius: 8 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Church Location Map"
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: 2,
                            px: 2,
                            py: 1,
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#2E7D32' }}>
                            900 S Thacker Ave
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Directions Button */}
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          href="https://www.google.com/maps/dir/?api=1&destination=900+S+Thacker+Ave,Kissimmee,FL+34741"
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<Map />}
                          sx={{
                            borderColor: '#2E7D32',
                            color: '#2E7D32',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: '#2E7D32',
                              color: 'white',
                            },
                          }}
                        >
                          Get Directions
                        </Button>
                      </Box>
                    </ContactCard>

                    {/* Social Media */}
                    <ContactCard index={2} elevation={6}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        mb: 3, 
                        color: '#2E7D32',
                        textAlign: 'center'
                      }}>
                        Follow Us
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        {socialLinks.map((social, index) => (
                          <SocialButton
                            key={index}
                            color={social.color}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {social.icon}
                          </SocialButton>
                        ))}
                      </Box>
                    </ContactCard>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Call to Action */}
        <Box
          ref={(el) => (sectionRefs.current[2] = el)}
          sx={{
            py: 8,
            background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
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
              background: 'url(/images/banner/contact-banner.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(2)} timeout={1000}>
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
                  Join Our Church Family
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
                  We'd love to have you join us for worship and become part of our growing family. 
                  Come experience God's love and find your place in our community.
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
                    href="/events"
                    endIcon={<ArrowForward />}
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
                        color: '#2E7D32',
                      },
                    }}
                  >
                    View Events
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    href="/sermons"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                      color: '#2E7D32',
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
                    Watch Sermons
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Container>
        </Box>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setIsSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Message sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfessionalContactPage;
