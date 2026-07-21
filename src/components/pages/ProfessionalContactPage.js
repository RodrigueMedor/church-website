import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import {
  Box, Container, Typography, Grid, TextField, Button, Paper, useTheme, Alert, Snackbar,
  InputAdornment, Card, CardContent, alpha, Stack, Avatar, IconButton
} from '@mui/material';
import {
  LocationOn as LocationOnIcon, Phone as PhoneIcon, EmailOutlined as EmailIcon,
  Schedule as ScheduleIcon, Send as SendIcon, CheckCircle as CheckCircleIcon,
  Church as ChurchIcon, People, Map, Facebook, Twitter, Instagram, YouTube, Language
} from '@mui/icons-material';
import { usePageContent } from '../../cms';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, SectionLabel, Counter } from '../common/animations';

const ProfessionalContactPage = () => {
  const { t } = useTranslation();
  const content = usePageContent('contact');
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.nameRequired', 'Name is required');
    if (!formData.email) newErrors.email = t('contact.form.emailRequired', 'Email is required');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contact.form.emailInvalid', 'Please enter a valid email');
    if (!formData.subject.trim()) newErrors.subject = t('contact.form.subjectRequired', 'Subject is required');
    if (!formData.message.trim()) newErrors.message = t('contact.form.messageRequired', 'Message is required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await api.post('/public/contact', formData);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (error) {
        setErrors(prev => ({ ...prev, submit: 'Failed to send message. Please try again.' }));
      } finally { setIsSubmitting(false); }
    }
  };

  const contactInfo = [
    { title: 'Visit Us', icon: <LocationOnIcon sx={{ fontSize: 28 }} />, content: content.address || '900 S Thacker Ave\nKissimmee, FL 34741', color: '#0F4C81' },
    { title: 'Call Us', icon: <PhoneIcon sx={{ fontSize: 28 }} />, content: content.phone || '(407) 123-4567\n(407) 123-4568', color: '#C9A227' },
    { title: 'Email Us', icon: <EmailIcon sx={{ fontSize: 28 }} />, content: content.email || 'info@fhbck.org\npasteur@fhbck.org', color: '#4CAF50' },
    { title: 'Service Times', icon: <ScheduleIcon sx={{ fontSize: 28 }} />, content: content.serviceTimes?.length ? content.serviceTimes.map(st => `${st.day}: ${st.time}`).join('\n') : 'Sunday: 9:30 AM & 11:30 AM\nWednesday: 7:00 PM', color: '#F57C00' },
  ];

  const platformIcons = { facebook: <Facebook />, twitter: <Twitter />, instagram: <Instagram />, youtube: <YouTube /> };
  const socialLinks = content.socialLinks?.length
    ? content.socialLinks.map(s => ({ icon: platformIcons[s.platform?.toLowerCase()] || <Language />, url: s.url || '#', color: s.color || '#0F4C81' }))
    : [{ icon: <Facebook />, url: '#', color: '#1877F2' }, { icon: <Twitter />, url: '#', color: '#1DA1F2' }, { icon: <Instagram />, url: '#', color: '#E4405F' }, { icon: <YouTube />, url: '#', color: '#FF0000' }];

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, rgba(10,53,96,0.85), rgba(15,76,129,0.85)), url(/images/banner/contact-banner.jpg) center / cover no-repeat',
        color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 12, md: 18 }, position: 'relative',
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <Box textAlign="center" maxWidth="800px" mx="auto">
              <SectionLabel sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }}>Contact</SectionLabel>
              <Typography variant="h1" component="h1" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                {content.hero?.title || 'Get in Touch'}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.7, mb: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                {content.hero?.subtitle || '"Therefore encourage one another and build each other up."'}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', opacity: 0.7, color: '#C9A227', fontWeight: 500 }}>1 Thessalonians 5:11</Typography>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {/* Contact Info Cards */}
        <FadeIn>
          <Box textAlign="center" mb={6}>
            <SectionLabel>Connect</SectionLabel>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
              Ways to Connect
            </Typography>
          </Box>
        </FadeIn>
        <StaggerContainer stagger={0.1} sx={{ mb: 8 }}>
          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StaggerItem>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card sx={{ height: '100%', borderRadius: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center', p: 4, transition: 'all 0.35s ease', '&:hover': { boxShadow: `0 20px 40px ${alpha(info.color, 0.12)}`, borderColor: alpha(info.color, 0.2) } }}>
                      <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: alpha(info.color, 0.08), color: info.color, border: `2px solid ${alpha(info.color, 0.15)}` }}>
                        {info.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>{info.title}</Typography>
                      <Box sx={{ width: 24, height: 2, bgcolor: info.color, mx: 'auto', mb: 1.5, borderRadius: 1 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, fontSize: '0.85rem' }}>{info.content}</Typography>
                    </Card>
                  </motion.div>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>

        {/* Form + Map */}
        <FadeIn>
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', p: { xs: 3, md: 5 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: 'text.primary', textAlign: 'center' }}>Send Us a Message</Typography>
                {errors.submit && <Alert severity="error" sx={{ mb: 3 }}>{errors.submit}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={t('contact.page.yourName', 'Your Name')} name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={t('contact.page.emailAddress', 'Email Address')} name="email" type="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={t('contact.info.phoneNumber', 'Phone Number')} name="phone" value={formData.phone} onChange={handleChange}
                        InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: 'text.secondary' }} /></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={t('contact.page.purpose', 'Purpose')} name="subject" value={formData.subject} onChange={handleChange} error={!!errors.subject} helperText={errors.subject} required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label={t('contact.page.yourMessage', 'Your Message')} name="message" value={formData.message} onChange={handleChange} error={!!errors.message} helperText={errors.message} required multiline rows={5} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" size="large" disabled={isSubmitting} endIcon={<SendIcon />}
                        sx={{ px: 5, py: 1.8, fontWeight: 700, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                  <Box sx={{ p: 3, pb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center', mb: 2 }}>Find Us</Typography>
                  </Box>
                  <Box sx={{ px: 3, pb: 3 }}>
                    <iframe src="https://maps.google.com/?q=900+S+Thacker+Ave,Kissimmee,FL&output=embed" width="100%" height="220" style={{ border: 0, borderRadius: 12 }} allowFullScreen="" loading="lazy" title="Church Location Map" />
                    <Button variant="outlined" size="small" fullWidth href="https://www.google.com/maps/dir/?api=1&destination=900+S+Thacker+Ave,Kissimmee,FL+34741" target="_blank" rel="noopener noreferrer" startIcon={<Map />} sx={{ mt: 2, borderColor: 'primary.main', color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.main', color: '#fff' } }}>
                      Get Directions
                    </Button>
                  </Box>
                </Card>
                <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>Follow Us</Typography>
                  <Stack direction="row" spacing={1.5} justifyContent="center">
                    {socialLinks.map((social, i) => (
                      <motion.div key={i} whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <IconButton href={social.url} target="_blank" rel="noopener noreferrer" sx={{ bgcolor: alpha(social.color, 0.1), color: social.color, '&:hover': { bgcolor: social.color, color: '#fff' } }}>
                          {social.icon}
                        </IconButton>
                      </motion.div>
                    ))}
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <Box sx={{ mt: 10, py: 6, background: 'linear-gradient(135deg, #0F4C81, #0A3560)', borderRadius: 6, textAlign: 'center', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', inset: 0, background: 'url(/images/banner/contact-banner.jpg)', backgroundSize: 'cover', opacity: 0.08 } }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 2, color: '#fff', fontSize: { xs: '1.6rem', md: '2rem' } }}>Join Our Church Family</Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
                We'd love to have you join us for worship and become part of our growing family.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
                <Button variant="outlined" onClick={() => navigate('/events')} sx={{ borderColor: '#fff', color: '#fff', fontWeight: 600, px: 4, '&:hover': { bgcolor: '#fff', color: '#0F4C81' } }}>View Events</Button>
                <Button variant="contained" onClick={() => navigate('/sermons')} sx={{ bgcolor: 'secondary.main', color: '#fff', fontWeight: 700, px: 4, '&:hover': { bgcolor: 'secondary.dark' } }}>Watch Sermons</Button>
              </Stack>
            </Container>
          </Box>
        </FadeIn>
      </Container>

      <Snackbar open={isSuccess} autoHideDuration={6000} onClose={() => setIsSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setIsSuccess(false)} severity="success" sx={{ width: '100%' }}>Message sent successfully! We'll get back to you soon.</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfessionalContactPage;
