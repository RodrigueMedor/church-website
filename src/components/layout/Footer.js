import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@mui/icons-material';
import { pageDefaults } from '../../cms/defaults';
import CMS_API from '../../services/cmsApi';

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [footerData, setFooterData] = useState(null);

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
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0a1a30',
        color: 'rgba(255, 255, 255, 0.85)',
        pt: { xs: 6, md: 8 },
        pb: 0,
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1a365d, #c9a84c, #1a365d)',
          opacity: 0.6
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '2px solid rgba(201, 168, 76, 0.5)',
                    p: '3px',
                    flexShrink: 0,
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={logoUrl}
                    alt={t('footer.churchLogoAlt')}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#fff',
                      lineHeight: 1.2,
                    }}
                  >
                    {t('footer.brandName')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      color: 'rgba(201, 168, 76, 0.7)',
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
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.9,
                  maxWidth: 340,
                  fontSize: '0.9rem'
                }}
              >
                {t('footer.description')}
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1.5}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.06)',
                      width: 42,
                      height: 42,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.secondary.main, 0.15),
                        color: theme.palette.secondary.light,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.2)}`,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '1.5px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              {t('footer.quickLinks')}
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.88rem',
                    '&:hover': {
                      color: theme.palette.secondary.light,
                      transform: 'translateX(6px)',
                    },
                    '& .MuiSvgIcon-root': {
                      transition: 'all 0.25s ease',
                    },
                    '&:hover .MuiSvgIcon-root': {
                      color: theme.palette.secondary.main,
                    }
                  }}
                >
                  <ArrowForward sx={{ fontSize: '0.6rem', opacity: 0.6 }} />
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Ministries */}
          <Grid item xs={6} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '1.5px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              {t('footer.ourMinistries')}
            </Typography>
            <Stack spacing={1.5}>
              {ministryLinks.map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.88rem',
                    '&:hover': {
                      color: theme.palette.secondary.light,
                      transform: 'translateX(6px)',
                    },
                    '& .MuiSvgIcon-root': {
                      transition: 'all 0.25s ease',
                    },
                    '&:hover .MuiSvgIcon-root': {
                      color: theme.palette.secondary.main,
                    }
                  }}
                >
                  <ArrowForward sx={{ fontSize: '0.6rem', opacity: 0.6 }} />
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '1.5px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              {t('footer.contactUs')}
            </Typography>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box sx={{ mt: 0.2, flexShrink: 0 }}>
                  <LocationOn sx={{ fontSize: '1.1rem', color: 'rgba(201, 168, 76, 0.7)' }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', whiteSpace: 'pre-line', fontSize: '0.88rem' }}>
                  {address}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Phone sx={{ fontSize: '1.1rem', color: 'rgba(201, 168, 76, 0.7)', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>
                  {phone}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Email sx={{ fontSize: '1.1rem', color: 'rgba(201, 168, 76, 0.7)', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>
                  {email}
                </Typography>
              </Stack>
              <Box sx={{ pt: 0.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <AccessTime sx={{ fontSize: '1.1rem', color: 'rgba(201, 168, 76, 0.7)', mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, mb: 0.5, fontSize: '0.88rem' }}>
                      {t('footer.serviceTimes')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', mb: 0.3 }}>
                      {t('footer.sundayLabel')} {st.sunday || '9:00 AM & 11:00 AM'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                      {t('footer.wednesdayLabel')} {st.wednesday || '7:00 PM'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box
        sx={{
          mt: { xs: 5, md: 7 },
          py: 3,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          bgcolor: 'rgba(0,0,0,0.25)',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link
                component={RouterLink}
                to="/privacy"
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
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
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
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
