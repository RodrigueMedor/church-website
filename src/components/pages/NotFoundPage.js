import React from 'react';
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
            404 - Page Not Found
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
            Oops! The page you're looking for doesn't exist or has been moved.
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
            Don't worry, let's get you back on track. You can return to the homepage or check out some of our popular pages below.
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
              Go to Homepage
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/about"
              size="large"
            >
              About Us
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/events"
              size="large"
            >
              Events
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/contact"
              size="large"
            >
              Contact Us
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
              title="Church Location"
            ></iframe>
          </Box>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Still can't find what you're looking for?
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
            Contact our support team
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
