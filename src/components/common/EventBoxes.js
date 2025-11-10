import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    useTheme, 
    useMediaQuery, 
    Modal,
    IconButton,
    styled
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

const EventBoxes = () => {
    const { t } = useTranslation();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            title: t('home.sundayService'),
            date: t('home.serviceTimes.sundayService'),
            location: t('home.locations.mainHall'),
            description: t('home.serviceDescriptions.sundayService'),
            image: 'https://source.unsplash.com/random/400x300?worship',
            category: t('common.worship')
        },
        {
            id: 2,
            title: t('home.bibleStudy'),
            date: t('home.serviceTimes.bibleStudy'),
            location: t('home.locations.meetingRoom'),
            description: t('home.serviceDescriptions.bibleStudy'),
            image: 'https://source.unsplash.com/random/400x300?bible',
            category: t('common.study')
        },
        {
            id: 3,
            title: t('home.communityPrayer'),
            date: t('home.serviceTimes.communityPrayer'),
            location: t('home.locations.prayerRoom'),
            description: t('home.serviceDescriptions.communityPrayer'),
            image: 'https://source.unsplash.com/random/400x300?prayer',
            category: t('common.prayer')
        }
    ];

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 4
        }}>
            {events.map((event) => (
                <Card 
                    key={event.id}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 3
                        },
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <Box 
                        sx={{
                            height: '160px',
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
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                            }
                        }}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {event.category}
                        </Box>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            {event.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                            <EventIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2">{event.date}</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                            <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2">{event.location}</Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                            {event.description}
                        </Typography>
                        
                        <Button
                            onClick={() => handleOpen(event)}
                            variant="outlined"
                            size="small"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                alignSelf: 'flex-start',
                                mt: 'auto',
                                textTransform: 'none',
                                borderRadius: '20px',
                                px: 2,
                                py: 0.8,
                                fontSize: '0.8125rem',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    borderColor: 'primary.main',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.2s ease-in-out',
                                minWidth: '120px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {t('about.learnMore')}
                        </Button>
                    </CardContent>
                </Card>
            ))}
            
            {/* Event Preview Modal */}
            <EventPreviewModal 
                open={open} 
                onClose={handleClose} 
                event={selectedEvent} 
                t={t} 
            />
        </Box>
    );
};

// Styled components for the modal
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
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        padding: theme.spacing(2),
    },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
}));

const EventPreviewModal = ({ open, onClose, event, t }) => {
    if (!event) return null;
    
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="event-preview-title"
            aria-describedby="event-preview-description"
        >
            <ModalContent>
                <CloseButton 
                    aria-label="close" 
                    onClick={onClose}
                    size="large"
                >
                    <CloseIcon />
                </CloseButton>
                
                <Typography id="event-preview-title" variant="h5" component="h2" gutterBottom>
                    {event.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                    <EventIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.date}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, color: 'text.secondary' }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.location}</Typography>
                </Box>
                
                <Typography id="event-preview-description" variant="body1" paragraph>
                    {event.description}
                </Typography>
                
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    mt: 3,
                    pt: 2,
                    borderTop: `1px solid`,
                    borderColor: 'divider'
                }}>
                    <Button 
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none' }}
                    >
                        {t('common.close')}
                    </Button>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default EventBoxes;
