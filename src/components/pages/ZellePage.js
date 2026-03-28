import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  Fade,
  Slide,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

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

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '60vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  position: 'relative',
  padding: theme.spacing(8, 2),
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #c9a84c 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726353b3a32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
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
    background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.9) 0%, rgba(44, 82, 130, 0.8) 50%, rgba(201, 168, 76, 0.7) 100%)',
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
  },
}));

const ZellePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const zellePhone = '+1 (407) 218-0827';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(zellePhone);
    setCopied(true);
  };

  const banks = [
    {
      name: 'Bank of America',
      hasZelle: true,
      instructions: 'Open your Bank of America app, tap "Transfer/Zelle", select "Send", enter our phone number and amount.'
    },
    {
      name: 'Wells Fargo',
      hasZelle: true,
      instructions: 'In Wells Fargo app, go to "Transfer", select "Zelle", choose "Send", and enter our phone number.'
    },
    {
      name: 'Chase',
      hasZelle: true,
      instructions: 'Open Chase app, tap "Pay & Transfer", select "Zelle", then "Send" with our phone number.'
    },
    {
      name: 'Capital One',
      hasZelle: true,
      instructions: 'In Capital One app, go to "Payments", select "Zelle", and send to our phone number.'
    },
    {
      name: 'US Bank',
      hasZelle: true,
      instructions: 'Open US Bank app, navigate to "Move Money", select "Zelle", and send to our phone number.'
    },
    {
      name: 'PNC Bank',
      hasZelle: true,
      instructions: 'In PNC app, go to "Pay Bills", select "Zelle", and enter our phone number to send money.'
    },
  ];

  const steps = [
    {
      title: 'Open Your Banking App',
      description: 'Launch your mobile banking app or visit your bank\'s website. Look for Zelle® option.',
      icon: <PhoneAndroidIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Select Zelle®',
      description: 'Find Zelle® in your app\'s transfer or payment section. It\'s usually labeled "Zelle®" or "Send Money with Zelle®".',
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Enter Our Phone Number',
      description: `Send to: ${zellePhone}`,
      icon: <ContentCopyIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Enter Amount & Send',
      description: 'Enter your donation amount, review the details, and confirm the transfer. It arrives instantly!',
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Box>
              <Box sx={{ mb: 4 }}>
                <AccountBalanceIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: '#c9a84c',
                    animation: `${pulse} 3s ease-in-out infinite`,
                  }} 
                />
              </Box>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 4,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  lineHeight: 1.1,
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.5px',
                }}
              >
                Give with Zelle®
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  maxWidth: '800px',
                  margin: '0 auto',
                  fontWeight: 300,
                  opacity: 0.95,
                  textShadow: '0 2px 3px rgba(0,0,0,0.3)',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  lineHeight: 1.6,
                }}
              >
                Zelle® is a payment service built into your banking app. Use your own bank's app to give securely and instantly to our church.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Zelle Email Box */}
      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="md">
          <Slide direction="up" in timeout={1200}>
            <Box sx={{ 
              p: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '2px solid rgba(26, 54, 93, 0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a365d', mb: 2 }}>
                Our Zelle® Recipient Phone Number
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                Use this phone number when sending money through Zelle® in your banking app
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 2,
                mb: 3,
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: 'monospace',
                    color: '#1a365d',
                    fontWeight: 600,
                    backgroundColor: 'rgba(26, 54, 93, 0.05)',
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    border: '1px dashed rgba(26, 54, 93, 0.2)',
                  }}
                >
                  {zellePhone}
                </Typography>
                <IconButton 
                  onClick={handleCopyPhone}
                  sx={{ 
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    }
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Click to copy our phone number for use in your banking app
              </Typography>
            </Box>
          </Slide>
        </Container>
      </Box>

      {/* Step-by-Step Instructions */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              How to Give with Zelle®
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Follow these simple steps to send your donation securely through Zelle®
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Slide direction="up" in timeout={1400 + index * 200}>
                  <StyledCard>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'linear-gradient(135deg, #1a365d, #2c5282)',
                        color: 'white',
                        mx: 'auto',
                        mb: 3,
                      }}>
                        {step.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {step.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Supported Banks */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Zelle® Supported Banks
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Zelle® is available in most major US banking apps. Check if your bank supports Zelle® below.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {banks.map((bank, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Slide direction="up" in timeout={1600 + index * 100}>
                  <Card sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip 
                          label="Zelle® Available"
                          size="small"
                          sx={{ 
                            backgroundColor: 'success.light',
                            color: 'success.contrastText',
                            fontWeight: 600,
                            mr: 2,
                          }}
                        />
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {bank.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        {bank.instructions}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't see your bank? Zelle® is available in hundreds of banking apps. Check your app or visit zellepay.com for a complete list.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Why Give with Zelle®?
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Slide direction="up" in timeout={1800}>
                <Box sx={{ textAlign: 'center' }}>
                  <SecurityIcon sx={{ fontSize: 60, color: '#1a365d', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Bank-Level Security
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Protected by your bank's security systems and fraud protection.
                  </Typography>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={4}>
              <Slide direction="up" in timeout={2000}>
                <Box sx={{ textAlign: 'center' }}>
                  <TrendingUpIcon sx={{ fontSize: 60, color: '#c9a84c', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    100% Fee-Free
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No fees for you or our church. Your full donation goes to our mission.
                  </Typography>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={4}>
              <Slide direction="up" in timeout={2200}>
                <Box sx={{ textAlign: 'center' }}>
                  <VolunteerActivismIcon sx={{ fontSize: 60, color: '#2c5282', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Instant Delivery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your donation arrives immediately, ready to support our work.
                  </Typography>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Frequently Asked Questions
            </Typography>
          </Box>
          
          {[
            {
              question: 'Is my donation tax-deductible?',
              answer: 'Yes, First Haitian Baptist Church of Kissimmee is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the full extent allowed by law.',
            },
            {
              question: 'Will I receive a receipt?',
              answer: 'Yes, you will receive an email receipt for your tax records. Please keep your Zelle® transaction confirmation as well.',
            },
            {
              question: 'What if my bank doesn\'t have Zelle®?',
              answer: 'You can still use Zelle® by downloading the Zelle® app and enrolling with your debit card. Most major banks support Zelle®.',
            },
            {
              question: 'Are there limits on how much I can give?',
              answer: 'Zelle® has sending limits set by your bank. Most banks allow transfers up to $1,000-$5,000 per day for enrolled users.',
            },
          ].map((faq, index) => (
            <Slide direction="up" in timeout={2400 + index * 100} key={index}>
              <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Slide>
          ))}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Give with Zelle®?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Open your banking app now and send your donation to +1 (407) 218-0827
          </Typography>
          <Button 
            variant="contained"
            size="large"
            onClick={() => navigate('/give')}
            sx={{
              px: 6,
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
              mr: 2,
            }}
          >
            Back to Giving
          </Button>
        </Container>
      </Box>

      {/* Copy Notification */}
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setCopied(false)}>
          Phone number copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ZellePage;
