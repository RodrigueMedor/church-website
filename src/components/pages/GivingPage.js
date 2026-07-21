import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Container, Typography, Button, Grid, TextField, useTheme, useMediaQuery,
  Stack, Chip, CircularProgress, Alert, alpha, Divider, Avatar, Card, CardContent, Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe, isStripeConfigured } from '../../services/stripe/stripeConfig';
import { createPaymentIntent, confirmDonation } from '../../services/stripe/donationService';
import {
  Lock, CheckCircle, Security, Favorite, CreditCard, VolunteerActivism,
  Church, Groups, Handshake, Shield, ArrowForward, AutoAwesome,
  TrendingUp, Public, Payments, AccountBalance,
} from '@mui/icons-material';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, SectionLabel, Counter } from '../common/animations';

const PRESET_AMOUNTS = [
  { value: 25, label: '$25', impact: 'Provides meals for a family' },
  { value: 50, label: '$50', impact: 'Supports a youth program' },
  { value: 100, label: '$100', impact: 'Funds community outreach' },
  { value: 250, label: '$250', impact: 'Sponsors a ministry event' },
  { value: 500, label: '$500', impact: 'Transforms lives through missions' },
];

const GivingForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const stripe = useStripe();
  const elements = useElements();

  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;
  const selectedPreset = PRESET_AMOUNTS.find(a => a.value === selectedAmount);

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setSelectedAmount(0);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (effectiveAmount < 1) {
      setError('Please enter a valid amount of at least $1.');
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const paymentData = await createPaymentIntent({
        amount: effectiveAmount,
        currency: 'usd',
        donorEmail,
        donorName,
      });
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: donorName || undefined,
              email: donorEmail || undefined,
            },
          },
        }
      );
      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }
      if (paymentIntent.status === 'succeeded') {
        await confirmDonation(paymentIntent.id).catch(() => {});
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Box textAlign="center" py={6}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: alpha('#4CAF50', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <CheckCircle sx={{ fontSize: 56, color: '#4CAF50' }} />
            </Box>
          </motion.div>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            Thank You for Your Generosity!
          </Typography>
          <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 600, mb: 1 }}>
            ${effectiveAmount.toFixed(2)} donation received
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            A confirmation has been sent to <strong>{donorEmail || 'your email'}</strong>.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontStyle: 'italic' }}>
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSuccess(false);
              setSelectedAmount(100);
              setCustomAmount('');
              setIsCustom(false);
              setDonorName('');
              setDonorEmail('');
              setStep(1);
            }}
            sx={{ borderRadius: 12, px: 5, py: 1.5, fontWeight: 700, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Give Again
          </Button>
        </Box>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ maxWidth: 540, mx: 'auto' }}>
        {/* Step 1: Amount */}
        <Box mb={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: step >= 1 ? 'primary.main' : alpha(theme.palette.primary.main, 0.1), color: step >= 1 ? '#fff' : 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.3s ease' }}>1</Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Select Amount</Typography>
          </Box>

          <Grid container spacing={1.5} sx={{ mb: 2 }}>
            {PRESET_AMOUNTS.map((item) => (
              <Grid item xs={4} sm key={item.value}>
                <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    fullWidth
                    onClick={() => { handlePresetClick(item.value); setStep(2); }}
                    sx={{
                      py: 2, borderRadius: 4, flexDirection: 'column', textTransform: 'none',
                      border: `2px solid ${!isCustom && selectedAmount === item.value ? theme.palette.secondary.main : alpha(theme.palette.divider, 0.3)}`,
                      bgcolor: !isCustom && selectedAmount === item.value ? alpha(theme.palette.secondary.main, 0.08) : 'background.paper',
                      color: !isCustom && selectedAmount === item.value ? theme.palette.secondary.dark : 'text.primary',
                      transition: 'all 0.3s ease',
                      '&:hover': { borderColor: 'secondary.main', bgcolor: alpha(theme.palette.secondary.main, 0.05) },
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.3 }}>{item.label}</Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', lineHeight: 1.3 }}>{item.impact}</Typography>
                  </Button>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div whileHover={{ y: -2 }}>
            <Button
              fullWidth
              onClick={handleCustomClick}
              sx={{
                py: 2, borderRadius: 4, textTransform: 'none', mt: 1,
                border: `2px dashed ${isCustom ? theme.palette.secondary.main : alpha(theme.palette.divider, 0.3)}`,
                bgcolor: isCustom ? alpha(theme.palette.secondary.main, 0.05) : 'transparent',
                color: isCustom ? theme.palette.secondary.dark : 'text.secondary',
                fontWeight: isCustom ? 700 : 500,
                '&:hover': { borderColor: 'secondary.main', bgcolor: alpha(theme.palette.secondary.main, 0.03) },
              }}
            >
              {isCustom ? 'Custom Amount Selected' : 'Enter Custom Amount'}
            </Button>
          </motion.div>

          <AnimatePresence>
            {isCustom && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setError(null); }}
                  inputProps={{ min: 1, step: 0.01 }}
                  sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 4, fontSize: '1.3rem', fontWeight: 700 } }}
                  InputProps={{
                    startAdornment: <Typography sx={{ fontWeight: 800, color: 'secondary.main', mr: 1, fontSize: '1.3rem' }}>$</Typography>,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Step 2: Donor Info */}
        <Box mb={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: step >= 2 ? 'primary.main' : alpha(theme.palette.primary.main, 0.1), color: step >= 2 ? '#fff' : 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.3s ease' }}>2</Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Your Information</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>(optional)</Typography>
          </Box>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth placeholder="Full Name" value={donorName} onChange={(e) => setDonorName(e.target.value)} size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="email" placeholder="Email for receipt" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
            </Grid>
          </Grid>
        </Box>

        {/* Step 3: Card Details */}
        <Box mb={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>3</Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Card Details</Typography>
          </Box>
          <Box sx={{
            p: 2.5, border: '2px solid', borderColor: alpha(theme.palette.divider, 0.3), borderRadius: 4,
            bgcolor: 'background.paper', transition: 'all 0.3s ease',
            '& .StripeElement--focus': { borderColor: theme.palette.secondary.main, boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.1)}` },
            '& .StripeElement--invalid': { borderColor: theme.palette.error.main },
          }}>
            <CardElement
              options={{
                style: {
                  base: { fontSize: '16px', color: theme.palette.text.primary, fontFamily: '"Inter", sans-serif', '::placeholder': { color: theme.palette.text.secondary }, padding: '8px 0' },
                  invalid: { color: '#EF4444' },
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1.5 }}>
            <Lock sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">256-bit SSL encrypted &middot; PCI compliant</Typography>
          </Box>
        </Box>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>
          </motion.div>
        )}

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={!stripe || processing || effectiveAmount < 1}
            startIcon={processing ? <CircularProgress size={22} color="inherit" /> : <Lock sx={{ fontSize: 20 }} />}
            sx={{
              py: 2.2, borderRadius: 4, fontSize: '1.15rem', fontWeight: 800, textTransform: 'none',
              bgcolor: 'secondary.main', color: '#fff',
              boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.35)}`,
              '&:hover': { bgcolor: 'secondary.dark', boxShadow: `0 12px 40px ${alpha(theme.palette.secondary.main, 0.45)}`, transform: 'translateY(-2px)' },
              '&:disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled', boxShadow: 'none' },
              transition: 'all 0.3s ease',
            }}
          >
            {processing ? 'Processing...' : `Give $${effectiveAmount.toFixed(2)}`}
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          {[
            { icon: <Shield sx={{ fontSize: 16 }} />, label: 'Stripe Secured' },
            { icon: <Lock sx={{ fontSize: 16 }} />, label: 'Encrypted' },
            { icon: <CheckCircle sx={{ fontSize: 16 }} />, label: 'PCI Compliant' },
          ].map((badge, i) => (
            <Stack key={i} direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
              {badge.icon}
              <Typography variant="caption" sx={{ fontWeight: 500 }}>{badge.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </form>
  );
};

const GivingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const stripeConfigured = isStripeConfigured();

  const stripeOptions = {
    appearance: {
      theme: 'stripe',
      variables: { colorPrimary: '#C9A227', colorBackground: theme.palette.background.paper, colorText: theme.palette.text.primary, borderRadius: '12px', fontFamily: '"Inter", sans-serif' },
    },
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0A3560 0%, #0F4C81 40%, #C9A227 100%)',
        color: '#fff', py: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/easter/offering-photo.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, filter: 'saturate(0.5)' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(201, 162, 39, 0.2) 0%, transparent 50%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <Box textAlign="center" maxWidth="700px" mx="auto">
              <SectionLabel sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', mb: 3 }}>Give</SectionLabel>
              <Typography variant="h1" component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.5rem' }, mb: 2, lineHeight: 1.1 }}>
                Give Online
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, color: 'rgba(255,255,255,0.85)', maxWidth: 550, mx: 'auto', lineHeight: 1.8, mb: 3 }}>
                Your generous giving supports our ministry and helps us serve our community. Every gift makes a difference.
              </Typography>
              <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
                {[
                  { icon: <Lock sx={{ fontSize: 16 }} />, label: 'Secure Payment' },
                  { icon: <CheckCircle sx={{ fontSize: 16 }} />, label: 'Instant Receipt' },
                  { icon: <Security sx={{ fontSize: 16 }} />, label: 'Stripe Protected' },
                ].map((item, i) => (
                  <Stack key={i} direction="row" spacing={0.8} alignItems="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {item.icon}
                    <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.78rem' }}>{item.label}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      {/* Main: Form + Impact */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="flex-start">
            {/* Form */}
            <Grid item xs={12} md={7}>
              <FadeIn>
                <Card sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.06)}`, overflow: 'visible' }}>
                  <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                    {stripeConfigured ? (
                      <Elements stripe={getStripe()} options={stripeOptions}>
                        <GivingForm />
                      </Elements>
                    ) : (
                      <Box textAlign="center" py={6}>
                        <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                          <CreditCard sx={{ fontSize: 40, color: 'primary.main' }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                          Online Giving Coming Soon
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 380, mx: 'auto', lineHeight: 1.8 }}>
                          Credit card giving is being set up. In the meantime, you can give via Zelle — fast, free, and secure.
                        </Typography>
                        <Button variant="contained" component={RouterLink} to="/zelle" endIcon={<ArrowForward />}
                          sx={{ borderRadius: 4, px: 5, py: 1.5, fontWeight: 700, bgcolor: 'secondary.main', color: '#fff', '&:hover': { bgcolor: 'secondary.dark' } }}>
                          Give via Zelle
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            </Grid>

            {/* Impact Sidebar */}
            <Grid item xs={12} md={5}>
              <FadeIn delay={0.2}>
                <Stack spacing={4}>
                  {/* Impact Stats */}
                  <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                    <Box sx={{ background: 'linear-gradient(135deg, #0F4C81, #0A3560)', p: 4, color: '#fff' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Your Impact</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, color: 'rgba(255,255,255,0.7)' }}>See how your gift transforms lives</Typography>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3}>
                        {[
                          { icon: <Groups sx={{ color: '#0F4C81' }} />, stat: '500+', label: 'Members Served', color: '#0F4C81' },
                          { icon: <VolunteerActivism sx={{ color: '#C9A227' }} />, stat: '50', label: 'Outreach Programs', color: '#C9A227', suffix: '+' },
                          { icon: <Church sx={{ color: '#4CAF50' }} />, stat: '5', label: 'Active Ministries', color: '#4CAF50' },
                          { icon: <Handshake sx={{ color: '#F57C00' }} />, stat: '1000', label: 'Families Helped', color: '#F57C00', suffix: '+' },
                        ].map((item, i) => (
                          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 44, height: 44, bgcolor: alpha(item.color, 0.08), color: item.color }}>
                              {item.icon}
                            </Avatar>
                            <Box>
                              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                                <Counter end={parseInt(item.stat)} suffix={item.suffix || ''} duration={2} />
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{item.label}</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Why Give */}
                  <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Why Your Gift Matters</Typography>
                      <Stack spacing={3}>
                        {[
                          { icon: <VolunteerActivism sx={{ color: '#0F4C81' }} />, title: 'Support Ministry', desc: 'Fund worship, Bible studies, and spiritual programs.' },
                          { icon: <Handshake sx={{ color: '#C9A227' }} />, title: 'Serve the Community', desc: 'Help families through our food pantry and outreach.' },
                          { icon: <CheckCircle sx={{ color: '#4CAF50' }} />, title: '100% Tax Deductible', desc: 'FHBCK is a registered 501(c)(3) organization.' },
                        ].map((item, i) => (
                          <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                            <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(item.icon.props.sx.color, 0.08), color: item.icon.props.sx.color, flexShrink: 0 }}>
                              {React.cloneElement(item.icon, { sx: { fontSize: 22, color: item.icon.props.sx.color } })}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.3 }}>{item.title}</Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>{item.desc}</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Other Ways to Give */}
                  <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', background: `linear-gradient(135deg, ${alpha('#C9A227', 0.04)}, ${alpha('#0F4C81', 0.04)})` }}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <AccountBalance sx={{ fontSize: 36, color: 'secondary.main', mb: 1.5 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Other Ways to Give</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                        Prefer to give through your bank? Zelle is fast, free, and secure.
                      </Typography>
                      <Button variant="outlined" component={RouterLink} to="/zelle" endIcon={<ArrowForward />}
                        sx={{ borderRadius: 12, fontWeight: 600, borderColor: alpha(theme.palette.secondary.main, 0.4), color: 'secondary.main', '&:hover': { bgcolor: 'secondary.main', color: '#fff', borderColor: 'secondary.main' } }}>
                        Give via Zelle
                      </Button>
                    </CardContent>
                  </Card>
                </Stack>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Scripture Banner */}
      <FadeIn>
        <Box sx={{ py: 8, bgcolor: 'background.paper', textAlign: 'center' }}>
          <Container maxWidth="md">
            <AutoAwesome sx={{ fontSize: 36, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, fontStyle: 'italic', lineHeight: 1.8 }}>
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </Typography>
            <Typography variant="body1" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              — 2 Corinthians 9:7
            </Typography>
          </Container>
        </Box>
      </FadeIn>
    </Box>
  );
};

export default GivingPage;
