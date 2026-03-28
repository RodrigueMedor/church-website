import React, { useState } from 'react';
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
  CardContent
} from '@mui/material';
import { 
  LocationOn as LocationOnIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon, 
  Schedule as ScheduleIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const ContactPageSimple = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      newErrors.name = t('contact.form.nameRequired');
    }
    
    if (!formData.email) {
      newErrors.email = t('contact.form.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.emailInvalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.messageRequired');
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
          message: ''
        });
      } catch (error) {
        console.error('Error:', error);
        // Show error message to user
        setErrors(prev => ({
          ...prev,
          submit: t('contact.form.sendFailed')
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleCloseSnackbar = () => {
    setIsSuccess(false);
  };
  
  if (isSubmitting) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="info">
          {t('contact.page.sending')}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: 'background.default',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '400px', md: '500px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src="/images/banner/contact-banner.jpg"
          alt="Contact Banner"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
            zIndex: 2,
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            {/* Icon with animation */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  mb: 3,
                  animation: 'pulse 2s infinite ease-in-out',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', opacity: 0.9 },
                    '50%': { transform: 'scale(1.05)', opacity: 1 },
                    '100%': { transform: 'scale(1)', opacity: 0.9 }
                  }
                }}
              >
                <LocationOnIcon sx={{ fontSize: 48, color: 'white' }} />
              </Box>
            </Box>
            
            {/* Main title with enhanced styling */}
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
                lineHeight: 1.2,
                fontSize: { xs: '2.2rem', md: '3rem' },
                letterSpacing: '-0.02em',
                textTransform: 'none',
                color: 'white',
                filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))'
              }}
            >
              {t('contact.page.title')}
            </Typography>
            
            {/* Subtitle with elegant styling */}
            <Typography 
              variant="h6" 
              component="p"
              sx={{ 
                maxWidth: '600px', 
                mx: 'auto',
                mb: 6,
                lineHeight: 1.7,
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.95)',
                fontStyle: 'italic'
              }}
            >
              {t('contact.page.subtitle')}
            </Typography>
            {/* Professional action buttons */}
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
              <Button
                variant="outlined"
                size="large"
                href="tel:(407)218-0827"
                startIcon={<PhoneIcon />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.8)',
                  color: 'white',
                  backdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderWidth: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.6s ease-in-out'
                  },
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                    '&::before': {
                      left: '100%'
                    }
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(0.98)'
                  }
                }}
              >
                (407) 218-0827
              </Button>
              <Button
                variant="contained"
                size="large"
                href="mailto:info@fbckissimmee.com"
                startIcon={<EmailIcon />}
                sx={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.6s ease-in-out'
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
                    borderColor: 'rgba(255,255,255,0.5)',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                    '&::before': {
                      left: '100%'
                    }
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(0.98)'
                  }
                }}
              >
                info@fbckissimmee.com
              </Button>
            </Box>
            
            {/* Additional contact info */}
            <Typography 
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                mt: 2
              }}
            >
              900 S Thacker Ave, Kissimmee, FL 34741
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  {t('contact.page.formTitle')}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ maxWidth: '500px', mx: 'auto' }}
                >
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </Typography>
              </Box>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.page.yourName')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderRadius: 1,
                                p: 1,
                                mr: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <LocationOnIcon sx={{ fontSize: 18 }} />
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.page.emailAddress')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderRadius: 1,
                                p: 1,
                                mr: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <EmailIcon sx={{ fontSize: 18 }} />
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.page.yourMessage')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      variant="outlined"
                      multiline
                      rows={5}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ mt: -2, alignItems: 'flex-start' }}>
                            <Box 
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderRadius: 1,
                                p: 1,
                                mr: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 2
                              }}
                            >
                              <SendIcon sx={{ fontSize: 18 }} />
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={<SendIcon />}
                      sx={{
                        py: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                          transform: 'translateY(-2px)',
                          boxShadow: 4
                        },
                        '&:disabled': {
                          background: theme.palette.action.disabled,
                          color: theme.palette.action.disabled
                        }
                      }}
                    >
                      {isSubmitting ? t('contact.page.sending') : t('contact.page.sendMessage')}
                    </Button>
                    {errors.submit && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                          {errors.submit}
                        </Alert>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information Cards */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  mb: 3,
                  textAlign: 'center'
                }}
              >
                Get in Touch
              </Typography>
              <Grid container spacing={3}>
                {/* Physical Address */}
                <Grid item xs={12}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box 
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 2,
                            p: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <LocationOnIcon sx={{ fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                            {t('contact.info.ourLocation')}
                          </Typography>
                          <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                            900 S Thacker Ave<br />
                            Kissimmee, FL 34741
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Office Hours */}
                <Grid item xs={12}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box 
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 2,
                            p: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <ScheduleIcon sx={{ fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                            {t('contact.info.serviceTimes')}
                          </Typography>
                          <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                            Monday - Thursday: 9:00am to 4:00pm
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Phone */}
                <Grid item xs={12}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box 
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 2,
                            p: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <PhoneIcon sx={{ fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                            {t('contact.info.phoneNumber')}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              lineHeight: 1.6, 
                              color: 'text.secondary',
                              textDecoration: 'none',
                              '&:hover': { color: 'primary.main' }
                            }}
                            component="a"
                            href="tel:(407)218-0827"
                          >
                            (407) 218-0827
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      },
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box 
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 2,
                            p: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <EmailIcon sx={{ fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                            {t('contact.info.emailUs')}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              lineHeight: 1.6, 
                              color: 'text.secondary',
                              textDecoration: 'none',
                              '&:hover': { color: 'primary.main' }
                            }}
                            component="a"
                            href="mailto:info@fbckissimmee.com"
                          >
                            info@fbckissimmee.com
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box 
        sx={{ 
          py: 8,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                mb: 2
              }}
            >
              {t('contact.map.title')}
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
            >
              Visit us at our convenient location in Kissimmee. We're easily accessible and ready to welcome you.
            </Typography>
          </Box>
          
          <Paper 
            elevation={4} 
            sx={{ 
              overflow: 'hidden',
              borderRadius: 3,
              height: { xs: '350px', md: '500px' },
              border: '2px solid',
              borderColor: 'primary.main',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
              <iframe
                src="https://maps.google.com/?q=900+S+Thacker+Ave,Kissimmee,FL&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="First Baptist Church of Kissimmee Location"
              />
            </Box>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="https://www.google.com/maps/search/?api=1&query=900+S+Thacker+Ave+Kissimmee+FL+34741"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LocationOnIcon />}
              sx={{
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                px: 5,
                py: 2,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              {t('contact.map.getDirections')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
          icon={<CheckCircleIcon />}
        >
          {t('contact.form.sendSuccess')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPageSimple;
