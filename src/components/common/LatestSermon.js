import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  useTheme, 
  useMediaQuery, 
  CircularProgress,
  Modal,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyAo8qWdA_Cp7FVzis4ywrtGBtIrJ3yCHo0';
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'UCPTq5ur5PxzFhoJ0LVRHKhA';
const MAX_RESULTS = 1;

// Format duration from ISO 8601 to HH:MM:SS
const formatDuration = (duration) => {
  if (!duration) return '00:00';
  
  const match = duration.match(/PT(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/);
  if (!match) return '00:00';
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Format date to French format
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const LatestSermon = () => {
    const { t } = useTranslation();
    const [sermon, setSermon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // Fetch latest sermon from YouTube
    useEffect(() => {
        const fetchLatestSermon = async () => {
            try {
                setLoading(true);
                // First, get the list of videos
                const searchResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
                );
                const searchData = await searchResponse.json();

                if (!searchData.items || searchData.items.length === 0) {
                    throw new Error('No videos found');
                }

                // Get video details including duration
                const videoId = searchData.items[0].id.videoId;
                const detailsResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoId}&part=contentDetails,snippet`
                );
                const detailsData = await detailsResponse.json();

                const videoDetails = detailsData.items[0];
                
                // Format the sermon data
                const sermonData = {
                    id: videoId,
                    title: videoDetails.snippet.title,
                    channelTitle: videoDetails.snippet.channelTitle,
                    publishedAt: videoDetails.snippet.publishedAt,
                    description: videoDetails.snippet.description,
                    duration: formatDuration(videoDetails.contentDetails.duration),
                    thumbnail: videoDetails.snippet.thumbnails.high.url,
                    videoUrl: `https://www.youtube.com/embed/${videoId}`
                };

                setSermon(sermonData);
            } catch (err) {
                console.error('Error fetching latest sermon:', err);
                setError('Failed to load the latest sermon. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLatestSermon();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={4} color="error.main">
                {error}
            </Box>
        );
    }

    if (!sermon) {
        return null;
    }
    
    const modalStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        bgcolor: 'transparent',
        boxShadow: 24,
        p: 0,
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        '&:focus-visible': {
            outline: 'none',
        },
    };

    const videoContainerStyle = {
        width: '100%',
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
        },
    };

    return (
        <>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden', boxShadow: 3, maxWidth: 1200, mx: 'auto' }}>
                <Box 
                    sx={{ 
                        width: { xs: '100%', md: '60%' }, 
                        position: 'relative', 
                        bgcolor: 'black',
                        cursor: 'pointer',
                        '&:hover .play-overlay': {
                            opacity: 1,
                        }
                    }}
                    onClick={handleOpenModal}
                >
                    <Box sx={videoContainerStyle}>
                        <img
                            src={sermon.thumbnail}
                            alt={sermon.title}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <Box
                            className="play-overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                opacity: 0.8,
                                transition: 'opacity 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <PlayCircleOutlineIcon 
                                sx={{ 
                                    fontSize: '5rem', 
                                    color: 'white',
                                    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
                                }} 
                            />
                        </Box>
                    </Box>
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', p: 4, overflowY: 'auto', maxHeight: '400px' }}>
                    <Typography 
                        component="h3" 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700, 
                            mb: 2,
                            color: 'primary.main',
                            lineHeight: 1.3
                        }}
                    >
                        {sermon.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {sermon.channelTitle}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(sermon.publishedAt)} • {sermon.duration}
                        </Typography>
                    </Box>
                    
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                            whiteSpace: 'pre-line',
                            fontSize: '0.9rem',
                            lineHeight: 1.6
                        }}
                    >
                        {sermon.description.split('\n')[0]}
                    </Typography>
                </CardContent>
                
                <Box sx={{ 
                    display: 'flex', 
                    p: 2, 
                    gap: 2,
                    bgcolor: 'background.default',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    '& > *': {
                        flex: '1 1 auto',
                        minWidth: 0, // Prevents flex items from overflowing
                    }
                }}>
                    <Button 
                        component="a"
                        href={`https://www.youtube.com/watch?v=${sermon.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        color="primary"
                        size={isMobile ? 'medium' : 'large'}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '4px',
                            px: 2,
                            py: 1.5,
                            fontSize: isMobile ? '0.75rem' : '0.8125rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                backgroundColor: theme.palette.primary.dark,
                            },
                            '& .MuiButton-startIcon': {
                                marginRight: 0.5,
                                '& > *:nth-of-type(1)': {
                                    fontSize: '1.1rem',
                                }
                            },
                            whiteSpace: 'nowrap',
                            overflow: 'visible',
                            minWidth: 0,
                            flex: '1 1 auto',
                            backgroundColor: theme.palette.primary.main,
                        }}
                        startIcon={<PlayCircleOutlineIcon />}
                    >
                        <Box component="span" sx={{
                            display: 'inline-block',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {t('watch on youtube')}
                        </Box>
                    </Button>
                    
                    <Button 
                        component={RouterLink}
                        to="/sermons"
                        variant="outlined"
                        color="primary"
                        size={isMobile ? 'medium' : 'large'}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '4px',
                            px: 2,
                            py: 1.5,
                            fontSize: isMobile ? '0.75rem' : '0.8125rem',
                            borderWidth: '2px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderWidth: '2px',
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                borderColor: theme.palette.primary.dark,
                                color: theme.palette.primary.dark,
                            },
                            '& .MuiButton-startIcon': {
                                marginRight: 0.5,
                                '& > *:nth-of-type(1)': {
                                    fontSize: '1.1rem',
                                }
                            },
                            whiteSpace: 'nowrap',
                            overflow: 'visible',
                            minWidth: 0,
                            flex: '1 1 auto',
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                        }}
                    >
                        <Box component="span" sx={{
                            display: 'inline-block',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {t('all messages')}
                        </Box>
                    </Button>
                </Box>
            </Box>
            </Card>

            {/* Video Modal */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="video-modal-title"
                aria-describedby="video-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    padding: isMobile ? 2 : 4,
                    '&:focus-visible': {
                        outline: 'none',
                    },
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    },
                }}
            >
                <Box sx={modalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={videoContainerStyle}>
                        <iframe
                            src={`${sermon.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                            title={sermon.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default LatestSermon;
