import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

const EventDetailPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Mock event data inspired by FBC Kissimmee - in a real app, this would come from an API
    const event = {
        1: {
            title: t('home.sundayService'),
            date: t('home.serviceTimes.sundayService'),
            location: t('home.locations.mainHall'),
            description: t('home.serviceDescriptions.sundayService'),
            fullDescription: t('home.serviceDescriptions.sundayService') + ' ' + 
                'Join us for our weekly Sunday service where we gather as a community to worship, pray, and study God\'s word together. All are welcome!',
            image: 'https://source.unsplash.com/random/1200x600?worship',
            category: t('common.worship'),
            registrationUrl: null, // No registration needed for regular services
            registrationStatus: 'open'
        },
        2: {
            title: 'Spring Care Groups',
            date: 'Wednesdays 6:30 PM',
            location: t('home.locations.meetingRoom'),
            description: 'Join our small group ministry for fellowship, prayer, and biblical community. These groups meet weekly to support one another in faith and life.',
            fullDescription: 'Our Care Groups are the heart of our church community. These small groups meet weekly in homes or at the church to build meaningful relationships, study Scripture together, pray for one another, and support each other through life\'s challenges. Whether you\'re new to the faith or have been walking with Christ for years, there\'s a group for you.',
            image: 'https://source.unsplash.com/random/1200x600?community',
            category: 'Care Groups',
            registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=N2Y4NmNiNzctOTVlMC00MjE3LWFjOGEtYjNjYTAxNWU2MGRl',
            registrationStatus: 'open'
        },
        3: {
            title: 'EQUIP Course: Biblical Foundations',
            date: 'Starting April 1, 7:00 PM',
            location: 'Room 201',
            description: 'Deepen your understanding of Scripture in this comprehensive EQUIP course.',
            fullDescription: 'This 8-week EQUIP course covers the foundations of Christian faith, including biblical interpretation, Old and New Testament overview, and practical application of Scripture in daily life. Perfect for new believers and those wanting to strengthen their biblical knowledge.',
            image: 'https://source.unsplash.com/random/1200x600?bible',
            category: 'EQUIP Courses',
            registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=ODkyZjg4MjEtYzZkYy00ZDQyLTg3NjctYjNhZjAxNWYxM2Zk',
            registrationStatus: 'open'
        }
    }[id];

    if (!event) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    {t('event.notFound')}
                </Typography>
                <Button 
                    component={RouterLink} 
                    to="/" 
                    variant="contained" 
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mt: 2 }}
                >
                    {t('common.backToHome')}
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Button
                component={RouterLink}
                to="/"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 4, textTransform: 'none' }}
            >
                {t('common.back')}
            </Button>

            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ 
                    height: isMobile ? '250px' : '400px',
                    backgroundImage: `url(${event.image})`,
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
                            {event.category}
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
                            {event.date} • {event.location}
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
                        {event.fullDescription}
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
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 3
                                    },
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
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 3
                                    },
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
                                px: 4,
                                py: 1.5,
                                borderRadius: '30px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white'
                                },
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
