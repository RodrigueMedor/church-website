import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  useTheme,
  IconButton,
  Stack,
  alpha,
  TextField,
  Button,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  ArrowForward,
  Send,
} from '@mui/icons-material';
import { pageDefaults } from '../../cms/defaults';
import CMS_API from '../../services/cmsApi';

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [footerData, setFooterData] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  useEffect(() => {
    CMS_API.fetchFooter().then(data => {
      if (data) setFooterData(data);
    });
  }, []);

  const fd = footerData || pageDefaults.footer || {};
  const settings = footerData || {};
  const logoUrl = settings.siteLogo || '/images/logo/logo-blog1.png';
  const socialLinks = (fd.socialLinks || pageDefaults.footer?.socialLinks || []).map(s => ({
    icon: s.platform === 'Facebook' ? <FacebookIcon /> : s.platform === 'Instagram' ? <InstagramIcon /> : <YouTubeIcon />,
    url: s.url || '#',
    label: s.platform || '',
  }));
  const quickLinks = pageDefaults.footer?.quickLinks || [];
  const ministryLinks = pageDefaults.footer?.ministryLinks || [];
  const address = fd.address || '900 S Thacker Ave\nKissimmee, FL 34741';
  const phone = fd.phone || '(407) 218-0827';
  const email = fd.email || 'info@fhbck.org';
  const st = fd.serviceTimes || {};

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#0A1020' : '#0C1829',
        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.85)',
        pt: { xs: 6, md: 8 },
        pb: 0,
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #0F4C81, #C9A227, #0F4C81)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '2px solid rgba(201, 162, 39, 0.4)',
                    p: '3px',
                    flexShrink: 0,
                    transition: 'border-color 0.3s ease',
                    '&:hover': { borderColor: 'secondary.main' },
                  }}
                >
                  <Box
                    component="img"
                    src={logoUrl}
                    alt={t('footer.churchLogoAlt')}
                    sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: '#fff',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t('footer.brandName')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.68rem',
                      color: alpha(theme.palette.secondary.main, 0.7),
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      mt: 0.3,
                    }}
                  >
                    {t('footer.brandSubtitle')}
                  </Typography>
                </Box>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.9,
                  maxWidth: 340,
                  fontSize: '0.88rem',
                }}
              >
                {t('footer.description')}
              </Typography>

              <Stack direction="row" spacing={1.2}>
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        color: 'rgba(255,255,255,0.45)',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        width: 42,
                        height: 42,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.secondary.main, 0.15),
                          color: theme.palette.secondary.light,
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '1.2px',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
              }}
            >
              {t('footer.quickLinks')}
            </Typography>
            <Stack spacing={1.8}>
              {quickLinks.map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.86rem',
                    '&:hover': {
                      color: theme.palette.secondary.light,
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ArrowForward sx={{ fontSize: '0.6rem', opacity: 0.5 }} />
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '1.2px',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
              }}
            >
              {t('footer.ourMinistries')}
            </Typography>
            <Stack spacing={1.8}>
              {ministryLinks.map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.86rem',
                    '&:hover': {
                      color: theme.palette.secondary.light,
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ArrowForward sx={{ fontSize: '0.6rem', opacity: 0.5 }} />
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '1.2px',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
              }}
            >
              Stay Connected
            </Typography>

            <Box sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              borderRadius: 4,
              p: 2.5,
              mb: 3,
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1.5, fontSize: '0.82rem', lineHeight: 1.6 }}>
                Subscribe to our newsletter for updates and announcements.
              </Typography>
              {newsletterSubmitted ? (
                <Typography variant="body2" sx={{ color: theme.palette.secondary.main, fontWeight: 600, fontSize: '0.82rem' }}>
                  Thank you for subscribing!
                </Typography>
              ) : (
                <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    type="email"
                    placeholder="Your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.05)',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        color: '#fff',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                        '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'rgba(255,255,255,0.3)',
                        opacity: 1,
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      minWidth: 'auto',
                      px: 2,
                      bgcolor: 'secondary.main',
                      color: '#0C1829',
                      borderRadius: '10px',
                      '&:hover': { bgcolor: 'secondary.light' },
                    }}
                  >
                    <Send sx={{ fontSize: '1rem' }} />
                  </Button>
                </Box>
              )}
            </Box>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <LocationOn sx={{ fontSize: '1.05rem', color: alpha(theme.palette.secondary.main, 0.6), mt: 0.2, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', whiteSpace: 'pre-line', fontSize: '0.82rem' }}>
                  {address}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Phone sx={{ fontSize: '1.05rem', color: alpha(theme.palette.secondary.main, 0.6), flexShrink: 0 }} />
                <Link href={`tel:${phone}`} sx={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.82rem', '&:hover': { color: 'secondary.light' } }}>
                  {phone}
                </Link>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Email sx={{ fontSize: '1.05rem', color: alpha(theme.palette.secondary.main, 0.6), flexShrink: 0 }} />
                <Link href={`mailto:${email}`} sx={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.82rem', '&:hover': { color: 'secondary.light' } }}>
                  {email}
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{
          mt: 5,
          py: 3,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime sx={{ fontSize: '0.95rem', color: alpha(theme.palette.secondary.main, 0.5) }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>Sunday:</Box> {st.sunday || '9:00 AM & 11:00 AM'}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime sx={{ fontSize: '0.95rem', color: alpha(theme.palette.secondary.main, 0.5) }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>Wednesday:</Box> {st.wednesday || '7:00 PM'}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn sx={{ fontSize: '0.95rem', color: alpha(theme.palette.secondary.main, 0.5) }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                Kissimmee, FL
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>

      <Box sx={{ mt: 0, py: 2.5, bgcolor: 'rgba(0,0,0,0.3)' }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link
                component={RouterLink}
                to="/privacy"
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: theme.palette.secondary.light },
                }}
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                component={RouterLink}
                to="/terms"
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: theme.palette.secondary.light },
                }}
              >
                {t('footer.termsOfUse')}
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
