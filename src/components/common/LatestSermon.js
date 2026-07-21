import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  useTheme, 
  useMediaQuery, 
  Modal,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const decodeHtml = (html) => {
  if (!html) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const extractVideoId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const FALLBACK_SERMON = {
  id: 'welcome',
  title: 'Welcome to Our Church Services',
  speaker: 'FHBCK Ministry',
  date: new Date().toISOString(),
  thumbnail: '/images/banner/pastor-sermon_1.JPG',
  videoUrl: '',
  description: 'Join us for our weekly church service with inspiring worship, biblical teaching, and warm fellowship. All are welcome in God\'s house.',
};

const fetchLatestFromYouTube = async () => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
  if (!API_KEY || API_KEY === 'YOUR_YOUTUBE_API_KEY' || !CHANNEL_ID || CHANNEL_ID === 'YOUR_YOUTUBE_CHANNEL_ID') {
    return null;
  }
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1&type=video`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.items || data.items.length === 0) return null;
    const item = data.items[0];
    const videoId = item.id.videoId;
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=contentDetails,snippet`
    );
    let duration = '';
    if (detailsRes.ok) {
      const details = await detailsRes.json();
      duration = details.items?.[0]?.contentDetails?.duration || '';
    }
    return {
      id: videoId,
      title: decodeHtml(item.snippet.title),
      speaker: decodeHtml(item.snippet.channelTitle),
      date: item.snippet.publishedAt,
      duration,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || '',
      videoUrl: `https://www.youtube.com/embed/${videoId}`,
      description: decodeHtml(item.snippet.description || ''),
    };
  } catch {
    return null;
  }
};

const LatestSermon = () => {
    const { t } = useTranslation();
    const [sermon, setSermon] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    useEffect(() => {
        fetchLatestFromYouTube().then(ytSermon => {
            setSermon(ytSermon || FALLBACK_SERMON);
        }).catch(() => {
            setSermon(FALLBACK_SERMON);
        });
    }, []);

    if (!sermon) {
        return null;
    }

    const videoId = extractVideoId(sermon.videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : sermon.videoUrl;
    
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
        paddingBottom: '56.25%',
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
                        {videoId && (
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
                        )}
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
                            {sermon.speaker || 'FHBCK'}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(sermon.datePreached || sermon.date)}
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
                        {(sermon.description || '').split('\n')[0]}
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
                        minWidth: 0,
                    }
                }}>
                    <Button 
                        component="a"
                        href={videoId ? `https://www.youtube.com/watch?v=${videoId}` : sermon.videoUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        color="primary"
                        size={isMobile ? 'medium' : 'large'}
                        disabled={!videoId && !sermon.videoUrl}
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
                            src={`${embedUrl}?autoplay=1&rel=0&modestbranding=1`}
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
