import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
  Chip,
  Fade,
  Slide,
  Zoom,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import QrCodeIcon from '@mui/icons-material/QrCode';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  position: 'relative',
  padding: theme.spacing(15, 2),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/images/easter/offering-photo.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
    zIndex: 2,
  },
  '& > *': {
    position: 'relative',
    zIndex: 3,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: 16,
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
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
    borderColor: theme.palette.primary.main,
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .card-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const ImpactCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: 16,
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(26, 54, 93, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.05) 0%, rgba(201, 168, 76, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px -12px rgba(26, 54, 93, 0.15)',
    '&::before': {
      opacity: 1,
    },
    '& .impact-number': {
      color: theme.palette.primary.main,
      transform: 'scale(1.1)',
    },
    '& .impact-icon': {
      transform: 'scale(1.2) rotate(10deg)',
    },
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  fontWeight: 700,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const GivingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const impactStats = [
    {
      number: '500+',
      label: 'Families Helped',
      icon: <PeopleIcon className="impact-icon" />,
      color: '#1a365d',
    },
    {
      number: '50+',
      label: 'Community Programs',
      icon: <VolunteerActivismIcon className="impact-icon" />,
      color: '#2c5282',
    },
    {
      number: '100%',
      label: 'Goes to Mission',
      icon: <TrendingUpIcon className="impact-icon" />,
      color: '#c9a84c',
    },
    {
      number: '15+',
      label: 'Years of Service',
      icon: <FavoriteIcon className="impact-icon" />,
      color: '#1a365d',
    },
  ];

  const testimonials = [
    {
      name: 'Marie Dupont',
      role: 'Church Member',
      content: 'Giving through Zelle has been so convenient. I can give directly from my banking app and know it arrives instantly and securely.',
      avatar: 'MD',
      rating: 5,
    },
    {
      name: 'Jean Pierre',
      role: 'Volunteer',
      content: 'The Zelle option makes it so easy to support the mission. No fees, instant transfer, and I can give from anywhere using my phone.',
      avatar: 'JP',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Community Partner',
      content: 'This church truly makes a difference. Zelle giving is secure and fast - perfect for supporting their amazing work in our community.',
      avatar: 'SJ',
      rating: 5,
    },
  ];


  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Fade in timeout={1000}>
              <Box>
                <Box sx={{ mb: 4 }}>
                  <VolunteerActivismIcon 
                    sx={{ 
                      fontSize: 80, 
                      color: '#c9a84c',
                      animation: `${float} 3s ease-in-out infinite`,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 4,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.5px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Invest in Our Mission
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: 300,
                    opacity: 0.95,
                    textShadow: '0 2px 3px rgba(0,0,0,0.3)',
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  Your generous support enables us to expand our outreach, strengthen our community, and bring hope to those in need. Every contribution makes a lasting impact.
                </Typography>
              </Box>
            </Fade>
            
            {/* Direct Zelle CTA */}
            <Box sx={{ mt: 8 }}>
              <Button 
                variant="contained"
                size="large"
                onClick={() => navigate('/zelle')}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  background: 'linear-gradient(135deg, #c9a84c, #f4e4bc)',
                  color: '#1a365d',
                  boxShadow: '0 8px 30px rgba(201, 168, 76, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(201, 168, 76, 0.6)',
                    background: 'linear-gradient(135deg, #f4e4bc, #c9a84c)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <AccountBalanceIcon sx={{ mr: 2, fontSize: 28 }} />
                Open Zelle Now
              </Button>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ mt: 2, textAlign: 'center' }}>
                Learn how to give using your own banking app with Zelle®
              </Typography>
            </Box>

            {/* Impact Statistics */}
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Our Impact Together
              </Typography>
              <Grid container spacing={3}>
                {impactStats.map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Slide direction="up" in timeout={1400 + index * 200}>
                      <StyledCard>
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                          <Box sx={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(26, 54, 93, 0.1)',
                            mb: 2,
                          }}>
                            {stat.icon}
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 1 }}>
                            {stat.number}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </StyledCard>
                    </Slide>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Community Photos Section */}
            <Box sx={{ mt: 5, mb: 8 }}>
              <Container maxWidth="lg">
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                  Our Community in Action
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2,
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      height: 300,
                    }}>
                      <Box
                        component="img"
                        src="/images/easter/DSC_2307.jpg"
                        alt="Church Service"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2,
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      height: 300,
                    }}>
                      <Box
                        component="img"
                        src="/images/easter/DSC_2306.jpg"
                        alt="Church Community"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Enhanced Zelle Giving Section */}
      <Section sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderTop: '1px solid #e2e8f0',
      }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Give Securely with Zelle
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
              Zelle is a payment service built into your banking app. Use your own bank's app to give securely and instantly to our church.
            </Typography>
          </Box>
          
          <Slide direction="up" in timeout={1800}>
            <Box sx={{ 
              p: { xs: 4, md: 6 },
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(26, 54, 93, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1a365d, #2c5282, #c9a84c)',
              },
            }}>
              {/* Main Content */}
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'linear-gradient(135deg, #1a365d, #2c5282)',
                      mb: 3,
                    }}>
                      <AccountBalanceIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1a365d' }}>
                      Zelle Giving
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      Give quickly and securely through Zelle<sup>&reg;</sup> - the payment service built into your banking app. No fees, instant delivery, and complete security.
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      {['Fee-free transfers', 'Bank-level security', 'Instant delivery', 'Mobile & desktop'].map((feature, idx) => (
                        <Chip 
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{ 
                            mr: 1, 
                            mb: 1,
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3,
                    backgroundColor: 'linear-gradient(135deg, rgba(26, 54, 93, 0.05) 0%, rgba(201, 168, 76, 0.05) 100%)',
                    borderRadius: 3,
                    border: '1px solid rgba(26,54,93,0.1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                      How to Give with Zelle
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {[
                        'Open your banking app and select Zelle',
                        'Send to: +1 (407) 218-0827',
                        'Enter your donation amount',
                        'Complete secure transfer'
                      ].map((step, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ 
                            minWidth: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: '#1a365d',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            mr: 2,
                            mt: 0.5,
                          }}>
                            {index + 1}
                          </Box>
                          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                            {step}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    
                    <Box sx={{ 
                      p: 2,
                      backgroundColor: 'rgba(26, 54, 93, 0.05)',
                      borderRadius: 2,
                      border: '1px dashed rgba(26, 54, 93, 0.2)',
                      mb: 3,
                      textAlign: 'center'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a365d', mb: 1 }}>
                        Zelle Recipient
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#1a365d' }}>
                        church@fhbckissimmee.org
                      </Typography>
                    </Box>
                    
                    <Button 
                      variant="contained"
                      size="large"
                      fullWidth
                      component={RouterLink}
                      to="/zelle"
                      sx={{
                        py: 2,
                        borderRadius: '50px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, #c9a84c, #f4e4bc)',
                        color: '#1a365d',
                        boxShadow: '0 4px 20px rgba(201, 168, 76, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(201, 168, 76, 0.5)',
                          background: 'linear-gradient(135deg, #f4e4bc, #c9a84c)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Open Zelle Now
                    </Button>
                    
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
                      Available in most US banking apps. Check with your bank for Zelle availability.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              {/* Security Badge */}
              <Box sx={{ 
                mt: 4,
                pt: 3,
                borderTop: '1px solid rgba(26, 54, 93, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}>
                <SecurityIcon sx={{ color: '#1a365d', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Bank-Level Security & Fraud Protection
                </Typography>
              </Box>
            </Box>
          </Slide>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderTop: '1px solid #e2e8f0',
      }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              What Our Givers Say
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Hear from members of our community who have experienced the joy of giving and making a difference.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide direction="up" in timeout={2000 + index * 200}>
                  <Box sx={{ 
                    p: 3,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    },
                  }}>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: 16, color: '#c9a84c' }} />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ 
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}>
                      "{testimonial.content}"
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Enhanced FAQ Section */}
      <Section sx={{ backgroundColor: 'background.default' }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
              Find answers to common questions about giving to our church and how your donations make a difference.
            </Typography>
          </Box>
          
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {[
              {
                question: 'Is my donation tax-deductible?',
                answer: 'Yes, First Haitian Baptist Church of Kissimmee is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the full extent allowed by law. You will receive an annual tax statement for your records.',
                icon: <SecurityIcon />,
              },
              {
                question: 'Will I receive a receipt for my donation?',
                answer: 'Yes, you will receive an email receipt immediately after your donation is processed. The receipt will include your donation amount and tax information for your records.',
                icon: <CheckCircleIcon />,
              },
              {
                question: 'How does Zelle giving work?',
                answer: 'Simply open your banking app, select Zelle, and send money to church@fhbckissimmee.org. The transfer is instant and fee-free. Most major US banks offer Zelle in their mobile apps.',
                icon: <AccountBalanceIcon />,
              },
              {
                question: 'Is Zelle secure?',
                answer: 'Absolutely! Zelle uses bank-level security and encryption to protect your transactions. It\'s the same trusted technology your bank uses for other transfers, with fraud protection included.',
                icon: <SecurityIcon />,
              },
              {
                question: 'Are there any fees for giving with Zelle?',
                answer: 'No! Zelle is completely fee-free for both you and our church. 100% of your donation goes directly to support our mission work.',
                icon: <TrendingUpIcon />,
              },
            ].map((faq, index) => (
              <Slide direction="up" in timeout={2200 + index * 100} key={index}>
                <Accordion sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&.Mui-expanded': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}>
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: 'primary.light',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'primary.contrastText',
                        mr: 2,
                      }}>
                        {faq.icon}
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Slide>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Enhanced Contact Section */}
      <Section sx={{ 
        py: { xs: 8, md: 10 },
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
        },
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Box sx={{ 
            p: { xs: 4, md: 6 },
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            },
          }}>
            <PublicIcon sx={{ fontSize: 60, color: '#c9a84c', mb: 3 }} />
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{
                fontWeight: 600,
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#c9a84c',
                }
              }}
            >
              Have Questions About Giving?
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                maxWidth: '700px', 
                mx: 'auto', 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                lineHeight: 1.8,
              }}
            >
              Our team is here to help you with any questions you may have about giving to First Haitian Baptist Church of Kissimmee. We're happy to assist you in finding the best way to support our mission.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
              alignItems="center"
            >
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #c9a84c, #f4e4bc)',
                  color: '#1a365d',
                  boxShadow: '0 4px 20px rgba(201, 168, 76, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(201, 168, 76, 0.5)',
                    background: 'linear-gradient(135deg, #f4e4bc, #c9a84c)',
                  },
                }}
              >
                Contact Us
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Call (407) 218-0827
              </Button>
            </Stack>
          </Box>
        </Container>
      </Section>

      </Box>
  );
};

export default GivingPage;
