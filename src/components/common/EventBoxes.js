import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Modal,
    IconButton,
    styled,
    alpha
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EventBoxes = () => {
    const { t } = useTranslation();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const events = [
        {
            id: 1,
            title: t('events.multimedia.title', 'Multimedia Ministry'),
            date: t('events.multimedia.date', 'Sunday, 10:00 AM - 12:00 PM'),
            location: t('events.multimedia.location', 'Main Sanctuary'),
            description: t('events.multimedia.description', 'The Multimedia Ministry is dedicated to using technology and creativity to support and enhance worship experience. Through sound, visuals, and digital media, we help communicate the message of the Gospel clearly and effectively to both in-person and online audiences. "Go into all the world and preach the gospel to all creation." — Mark 16:15'),
            image: '/images/easter/multimedia-photo.jpg',
            category: t('events.multimedia.category', 'Technology & Worship'),
            registrationUrl: null
        },
        {
            id: 2,
            title: t('events.fellowship.title', 'Community Fellowship Gathering'),
            date: t('events.fellowship.date', 'Wednesdays 6:30 PM'),
            location: t('events.fellowship.location', 'Fellowship Hall'),
            description: t('events.fellowship.description', 'Connect with our church family through meaningful fellowship, prayer, and building lasting relationships in Christ.'),
            image: '/images/easter/worship-photo.jpg',
            category: t('events.fellowship.category', 'Fellowship'),
            registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=N2Y4NmNiNzctOTVlMC00MjE3LWFjOGEtYjNjYTAxNWU2MGRl'
        },
        {
            id: 3,
            title: t('events.bridge.title', 'Bridge Ministry'),
            date: t('events.bridge.date', 'Starting April 1'),
            location: t('events.bridge.location', 'Education Wing'),
            description: t('events.bridge.description', 'Connecting youth to God, the church, and one another. We serve as a welcoming pathway for new visitors and the surrounding community by building meaningful relationships and providing support where needed most. "Therefore welcome one another as Christ has welcomed you, for the glory of God." — Romans 15:7'),
            image: '/images/easter/bridge-ministry-photo.jpg',
            category: t('events.bridge.category', 'Youth & Community'),
            registrationUrl: 'https://onrealm.org/fbckissimmee/PublicRegistrations/Event?linkString=N2Y4NmNiNzctOTVlMC00MjE3LWFjOGEtYjNjYTAxNWU2MGRl'
        },
    ];

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
        }}>
            {events.map((event) => (
                <Card
                    key={event.id}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'rgba(26, 54, 93, 0.08)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 16px 40px rgba(26, 54, 93, 0.12)',
                            borderColor: 'transparent',
                            '& .event-image': {
                                transform: 'scale(1.05)'
                            },
                            '& .event-overlay': {
                                opacity: 1
                            }
                        }
                    }}
                >
                    <Box sx={{
                        position: 'relative',
                        height: '220px',
                        overflow: 'hidden',
                    }}>
                        <Box
                            className="event-image"
                            sx={{
                                height: '100%',
                                backgroundImage: `url(${event.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center top',
                                backgroundRepeat: 'no-repeat',
                                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(10, 26, 48, 0.7) 0%, rgba(10, 26, 48, 0.05) 60%)',
                        }} />
                        <Box className="event-overlay" sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(10, 26, 48, 0.5) 0%, rgba(10, 26, 48, 0.2) 100%)',
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                        }} />
                        <Box sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: alpha('#c9a84c', 0.9),
                            color: '#1a365d',
                            px: 1.5,
                            py: 0.6,
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            backdropFilter: 'blur(4px)',
                        }}>
                            {event.category}
                        </Box>
                    </Box>

                    <CardContent sx={{
                        flexGrow: 1,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                    }}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                color: 'primary.dark',
                                lineHeight: 1.3,
                                fontFamily: '"Playfair Display", serif'
                            }}
                        >
                            {event.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                            <EventIcon sx={{ fontSize: '0.95rem', color: 'secondary.main', flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{event.date}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                            <LocationOnIcon sx={{ fontSize: '0.95rem', color: 'secondary.main', flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{event.location}</Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.88rem',
                                lineHeight: 1.7,
                                flexGrow: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {event.description}
                        </Typography>

                        <Box sx={{ pt: 1 }}>
                            <Button
                                onClick={() => handleOpen(event)}
                                variant="outlined"
                                size="small"
                                endIcon={<ArrowForwardIcon sx={{ fontSize: '0.85rem' }} />}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '50px',
                                    px: 2.5,
                                    py: 0.8,
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    borderColor: 'rgba(26, 54, 93, 0.2)',
                                    color: 'primary.main',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        backgroundColor: 'primary.main',
                                        color: '#fff',
                                        boxShadow: '0 4px 12px rgba(26, 54, 93, 0.2)',
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                            >
                                {t('about.learnMore')}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <EventPreviewModal
                open={open}
                onClose={handleClose}
                event={selectedEvent}
                t={t}
            />
        </Box>
    );
};

const ModalContent = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
    borderRadius: '20px',
    outline: 'none',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        padding: theme.spacing(2.5),
    },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1.5),
    top: theme.spacing(1.5),
    color: theme.palette.grey[400],
    transition: 'all 0.2s ease',
    '&:hover': {
        color: theme.palette.grey[700],
        backgroundColor: alpha(theme.palette.grey[500], 0.1),
    },
}));

const EventPreviewModal = ({ open, onClose, event, t }) => {
    if (!event) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="event-preview-title"
            aria-describedby="event-preview-description"
            sx={{
                backdropFilter: 'blur(4px)',
            }}
        >
            <ModalContent>
                <CloseButton
                    aria-label="close"
                    onClick={onClose}
                    size="large"
                >
                    <CloseIcon />
                </CloseButton>

                <Typography
                    id="event-preview-title"
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        color: 'primary.dark',
                        pr: 4
                    }}
                >
                    {event.title}
                </Typography>

                {event.image && (
                    <Box
                        sx={{
                            width: '100%',
                            height: '200px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            mb: 3,
                            backgroundImage: `url(${event.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
                    <EventIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
                    <Typography variant="body2" color="text.secondary">{event.date}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                    <LocationOnIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
                    <Typography variant="body2" color="text.secondary">{event.location}</Typography>
                </Box>

                <Typography
                    id="event-preview-description"
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        mb: 3
                    }}
                >
                    {event.description}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                        sx={{
                            textTransform: 'none',
                            borderRadius: '50px',
                            px: 3,
                            fontWeight: 600,
                        }}
                    >
                        {t('common.close')}
                    </Button>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default EventBoxes;
