import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: 100, 
              color: 'error.main',
              mb: 3,
              opacity: 0.8
            }} 
          />
          
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            {t('notFound.title')}
          </Typography>
          
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            color="text.secondary" 
            paragraph
            sx={{ 
              mb: 4,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            {t('notFound.subtitle')}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ 
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            {t('notFound.description')}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              justifyContent: 'center',
              mb: 6,
              '& .MuiButton-root': {
                minWidth: '160px',
                py: 1.5,
              }
            }}
          >
            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/"
              size="large"
            >
              {t('notFound.goToHomepage')}
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/about"
              size="large"
            >
              {t('notFound.aboutUs')}
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/events"
              size="large"
            >
              {t('notFound.events')}
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/contact"
              size="large"
            >
              {t('notFound.contactUs')}
            </Button>
          </Box>
          
          <Box 
            sx={{ 
              width: '100%',
              maxWidth: '600px',
              height: '300px',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              mb: 6,
              '& iframe': {
                width: '100%',
                height: '100%',
                border: 0,
              }
            }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209056537!2d-73.9878446845938!3d40.75798597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
              allowFullScreen="" 
              loading="lazy"
              title={t('notFound.mapTitle')}
            ></iframe>
          </Box>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {t('notFound.stillCantFind')}
          </Typography>
          
          <Button 
            variant="text" 
            component={RouterLink} 
            to="/contact"
            endIcon={<span>→</span>}
            sx={{ 
              textTransform: 'none',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              }
            }}
          >
            {t('notFound.contactSupport')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
