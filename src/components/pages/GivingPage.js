import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';

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
    backgroundImage: 'url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
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
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
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
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('one-time');
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      savePayment: false,
      comments: '',
    },
  });

  const amountOptions = [25, 50, 100, 250, 500, 1000];

  const handleAmountClick = (value) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      setAmount('');
    }
  };

  const handleOpenModal = (option) => {
    setSelectedOption(option);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOption(null);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', { 
      ...data, 
      amount: amount || customAmount,
      type: activeTab 
    });
    
    // Reset form
    reset();
    setAmount('');
    setCustomAmount('');
    handleCloseModal();
  };

  const givingOptions = [
    {
      title: 'One-Time Gift',
      description: 'Make a single donation to support our church.',
      icon: <CreditCardIcon fontSize="large" color="primary" />,
      value: 'one-time',
    },
    {
      title: 'Recurring Gift',
      description: 'Set up automatic recurring giving on a schedule that works for you.',
      icon: <AccountBalanceIcon fontSize="large" color="primary" />,
      value: 'recurring',
    },
    {
      title: 'Text to Give',
      description: 'Text a keyword to our number to give quickly and easily.',
      icon: <PhoneIphoneIcon fontSize="large" color="primary" />,
      value: 'text',
    },
  ];

  const renderForm = () => {
    if (!selectedOption) return null;
    
    const isRecurring = selectedOption.value === 'recurring';
    
    // Text to Give has a different UI
    if (selectedOption.value === 'text') {
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            {selectedOption.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {selectedOption.description}
          </Typography>
          
          <Box sx={{ 
            backgroundColor: theme.palette.grey[50], 
            p: 3, 
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="h5" gutterBottom align="center">
              Text <strong>GIVE</strong> to (123) 456-7890
            </Typography>
            
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              You'll receive a text with a secure link to complete your donation.
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 2,
              mt: 4
            }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component="a"
                href="sms:1234567890&body=GIVE"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                Open Text Message
              </Button>
              
              <Typography variant="body2" color="text.secondary" align="center">
                Standard messaging rates may apply. Reply STOP to opt-out.
              </Typography>
              
              <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="subtitle2" gutterBottom>
                  How it works:
                </Typography>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Text <strong>GIVE</strong> to (123) 456-7890</li>
                  <li>Click the secure link you receive</li>
                  <li>Enter your donation amount and payment info</li>
                  <li>Complete your gift in just a few taps</li>
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
    
    // Regular donation form for One-Time and Recurring gifts
    return (
      <Box>
        <Box sx={{ mb: 3, pb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {isRecurring ? 'Set Up Recurring Gift' : 'Make a One-Time Gift'}
          </Typography>
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            backgroundColor: isRecurring ? 'rgba(25, 118, 210, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            color: isRecurring ? theme.palette.primary.main : 'text.primary',
            px: 2, 
            py: 1, 
            borderRadius: 1,
            mb: 2
          }}>
            {isRecurring ? (
              <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
            ) : (
              <CreditCardIcon color="action" sx={{ mr: 1 }} />
            )}
            <Typography variant="subtitle2">
              {isRecurring ? 'Recurring Donation' : 'One-Time Donation'}
            </Typography>
          </Box>
          {isRecurring && (
            <Typography variant="body2" color="text.secondary">
              Your card will be charged automatically according to the frequency you select below.
            </Typography>
          )}
        </Box>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Donation Amount Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Donation Amount
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {amountOptions.map((value) => (
                  <Button
                    key={value}
                    variant={amount === value.toString() ? 'contained' : 'outlined'}
                    onClick={() => handleAmountClick(value)}
                    sx={{ minWidth: '80px' }}
                  >
                    ${value}
                  </Button>
                ))}
              </Box>
              <TextField
                fullWidth
                label="Or enter a custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="0.00"
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <Typography sx={{ mr: 1, fontWeight: 'medium' }}>$</Typography>
                  ),
                }}
              />
            </Grid>

            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Billing Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom mt={2}>
                Billing Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Street Address"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                rules={{ required: 'City is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="City"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="state"
                control={control}
                rules={{ required: 'State is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="State/Province"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="zip"
                control={control}
                rules={{
                  required: 'ZIP/Postal code is required',
                  pattern: {
                    value: /^[0-9\-]+$/,
                    message: 'Invalid ZIP/Postal code',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="ZIP/Postal Code"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Payment Method */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom mt={2}>
                Payment Method
              </Typography>
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="payment-method-label">Select Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    id="payment-method"
                    label="Select Payment Method"
                    defaultValue="credit-card"
                  >
                    <MenuItem value="credit-card">Credit/Debit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                    <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Credit Card Fields (shown by default) */}
              <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="cardNumber"
                      control={control}
                      rules={{
                        required: 'Card number is required',
                        pattern: {
                          value: /^[0-9\s]{13,19}$/,
                          message: 'Invalid card number',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="expiryDate"
                      control={control}
                      rules={{
                        required: 'Expiry date is required',
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: 'Invalid expiry date (MM/YY)',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Expiry Date"
                          placeholder="MM/YY"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="cvv"
                      control={control}
                      rules={{
                        required: 'CVV is required',
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: 'Invalid CVV',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="CVV"
                          placeholder="123"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Recurring Donation Option */}
              {selectedOption.value === 'recurring' && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Recurring Donation
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="frequency-label"
                      id="frequency"
                      label="Frequency"
                      defaultValue="monthly"
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="bi-weekly">Bi-Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="quarterly">Quarterly</MenuItem>
                      <MenuItem value="annually">Annually</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Comments */}
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="comments"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Special Instructions or Comments (Optional)"
                      multiline
                      rows={3}
                    />
                  )}
                />
              </Box>

              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Controller
                    name="termsAccepted"
                    control={control}
                    rules={{ required: 'You must accept the terms and conditions' }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        color="primary"
                        checked={field.value}
                      />
                    )}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="/terms" color="primary" target="_blank" rel="noopener noreferrer">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" color="primary" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                sx={{ 
                  mt: 2, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  '& .MuiButton-endIcon': { ml: 1 }
                }}
                endIcon={isRecurring ? <AccountBalanceIcon /> : <CreditCardIcon />}
              >
                {isRecurring ? 'Set Up ' : 'Donate '}
                {amount || customAmount ? ` $${amount || customAmount}` : ''}
                {isRecurring ? ' Monthly' : ' Now'}
              </Button>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Secure payment processing powered by{' '}
                  <span style={{ fontWeight: 'bold' }}>Stripe</span>
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" 
                    alt="Visa" 
                    style={{ height: 24, filter: 'grayscale(100%) opacity(0.7)' }} 
                  />
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" 
                    alt="Mastercard" 
                    style={{ height: 24, filter: 'grayscale(100%) opacity(0.7)' }} 
                  />
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" 
                    alt="Apple Pay" 
                    style={{ height: 24, filter: 'grayscale(100%) opacity(0.7)' }} 
                  />
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
                    alt="Google Pay" 
                    style={{ height: 24, filter: 'grayscale(100%) opacity(0.7)' }} 
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              className="animate__animated animate__fadeInDown"
              sx={{ 
                fontWeight: 800, 
                mb: 4,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                lineHeight: 1.1,
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.5px',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  background: theme.palette.secondary.main,
                  margin: '20px auto',
                  borderRadius: '2px'
                }
              }}
            >
              Invest in Our Mission
            </Typography>
            <Typography 
              variant="h5" 
              className="animate__animated animate__fadeInUp animate__delay-1s"
              sx={{ 
                mb: 5, 
                maxWidth: '800px',
                margin: '0 auto',
                fontWeight: 300,
                opacity: 0.95,
                textShadow: '0 2px 3px rgba(0,0,0,0.3)',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}
            >
              Your generous support enables us to expand our outreach, strengthen our community, and bring hope to those in need. Every contribution makes a lasting impact.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {givingOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={option.icon}
                  onClick={() => handleOpenModal(option)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {option.title}
                </Button>
              ))}
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* FAQ Section */}
      <Section sx={{ backgroundColor: 'background.default' }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
              Find answers to common questions about giving to our church.
            </Typography>
          </Box>
          
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {[
              {
                question: 'Is my donation tax-deductible?',
                answer: 'Yes, [Church Name] is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the full extent allowed by law.'
              },
              {
                question: 'Will I receive a receipt for my donation?',
                answer: 'Yes, you will receive an email receipt immediately after your donation is processed. For recurring donations, you will receive a receipt each time a donation is processed.'
              },
              {
                question: 'How do I update my payment information?',
                answer: 'You can update your payment information by logging into your account on our giving portal or by contacting our finance team.'
              },
              {
                question: 'Can I make a one-time donation?',
                answer: 'Yes, you can make a one-time donation using any of our giving methods. Simply select the "One-Time Gift" option when making your donation.'
              },
              {
                question: 'How do I set up a recurring donation?',
                answer: 'To set up a recurring donation, select the "Recurring Gift" option when making your donation. You can choose the frequency (weekly, bi-weekly, or monthly) and the amount you would like to give.'
              },
            ].map((faq, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                  {faq.question}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
                {index < 4 && <Divider sx={{ my: 3 }} />}
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section sx={{ 
        py: { xs: 6, md: 8 },
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Box 
            sx={({ 
              p: { xs: 4, md: 6 },
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease-in-out',
              transform: 'translateY(0)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                borderColor: 'primary.light',
                '& .pulse': {
                  animation: 'pulse 2s infinite',
                }
              },
              '&:active': {
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              },
              '@keyframes pulse': {
                '0%': {
                  boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.4)',
                },
                '70%': {
                  boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)',
                },
                '100%': {
                  boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)',
                },
              },
            })}
            className="pulse"
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '2px',
                  backgroundColor: 'primary.main',
                }
              }}
            >
              Have Questions About Giving?
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 5, 
                maxWidth: '700px', 
                mx: 'auto', 
                color: 'text.secondary',
                fontSize: '1.15rem',
                lineHeight: 1.8,
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  color: 'text.primary',
                },
              }}
            >
              Our team is here to help you with any questions you may have about giving to [Church Name].
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
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
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
                  '&::after': {
                    opacity: 1,
                    transform: 'scale(1.5)',
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  background: 'rgba(255, 255, 255, 0.2)',
                  opacity: 0,
                  transform: 'scale(0.8)',
                  transition: 'all 0.5s ease',
                  borderRadius: '50px',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Section>

      {/* Modal for Giving Form */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Make a Donation</span>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {renderForm()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GivingPage;
