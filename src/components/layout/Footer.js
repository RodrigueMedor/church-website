import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Ministries', path: '/ministries' },
    { text: 'Events', path: '/events' },
    { text: 'Sermons', path: '/sermons' },
  ];

  const contactInfo = [
    { text: '123 Church Street, City, State 12345' },
    { text: 'Phone: (123) 456-7890' },
    { text: 'Email: info@churchname.com' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com' },
  ];

  return (
    <Box
      component="footer"
      id="services-section"
      sx={{
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.text.secondary,
        py: 6,
        mt: 'auto',
        scrollMarginTop: '100px', // Add some space when scrolled to this section
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              First Haitian Baptist Church of Kissimmee
            </Typography>
            <Typography variant="body2" paragraph>
              A welcoming community of faith, hope, and love. Join us as we grow together in Christ's love and serve our community.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  sx={{
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {social.icon}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box component="nav">
              {quickLinks.map((link, index) => (
                <Box key={index} mb={1}>
                  <Link
                    component={RouterLink}
                    to={link.path}
                    color="inherit"
                    underline="hover"
                    sx={{
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            {contactInfo.map((info, index) => (
              <Typography key={index} variant="body2" paragraph sx={{ mb: 1 }}>
                {info.text}
              </Typography>
            ))}
            <Typography variant="body2" sx={{ mt: 2 }}>
              Service Times:
            </Typography>
            <Typography variant="body2">Sunday: 9:00 AM & 11:00 AM</Typography>
            <Typography variant="body2">Wednesday: 7:00 PM</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'divider' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: isMobile ? 'center' : 'inherit',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} First Haitian Baptist Church of Kissimmee. All rights reserved.
          </Typography>
          <Box sx={{ mt: isMobile ? 2 : 0 }}>
            <Link
              component={RouterLink}
              to="/privacy"
              variant="body2"
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mr: 2,
                '&:hover': {
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                }
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              variant="body2"
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                }
              }}
            >
              Terms of Use
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
