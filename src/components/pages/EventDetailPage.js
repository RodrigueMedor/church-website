import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Button, Paper, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import CMS_API from '../../services/cmsApi';

const EventDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    CMS_API.fetchEventById(id).then(data => {
      if (!cancelled) {
        setEvent(data);
        setLoading(false);
      }
    }).catch(() => {
      if (!cancelled) {
        setEvent(null);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>{t('event.notFound')}</Typography>
        <Button component={RouterLink} to="/" variant="contained" color="primary" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          {t('common.backToHome')}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button
        component={RouterLink}
        to="/events"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4, textTransform: 'none' }}
      >
        {t('common.back')}
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{
          height: isMobile ? '250px' : '400px',
          backgroundImage: `url(${event.imageUrl || event.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          }
        }}>
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 4,
            color: 'white',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          }}>
            <Typography variant="overline" sx={{
              display: 'inline-block',
              bgcolor: 'primary.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              mb: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {event.category || event.eventType || ''}
            </Typography>
            <Typography variant="h3" component="h1" sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {event.title}
            </Typography>
            <Typography variant="h6" sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 400,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}>
              {event.date || event.eventDate || ''}{event.location ? ` • ${event.location}` : ''}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: isMobile ? 3 : 6 }}>
          <Typography variant="body1" paragraph sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mb: 4,
            whiteSpace: 'pre-line'
          }}>
            {event.fullDescription || event.description || ''}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {event.registrationUrl ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 4, py: 1.5, borderRadius: '30px', textTransform: 'none', fontWeight: 600,
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {t('event.registerNow')}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  px: 4, py: 1.5, borderRadius: '30px', textTransform: 'none', fontWeight: 600,
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {t('event.noRegistrationRequired')}
              </Button>
            )}

            <Button
              variant="text"
              color="primary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                px: 4, py: 1.5, borderRadius: '30px', textTransform: 'none', fontWeight: 600,
                '&:hover': { backgroundColor: 'primary.light', color: 'white' },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {t('event.askQuestion')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EventDetailPage;
