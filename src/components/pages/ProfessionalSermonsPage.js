import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Button, 
  TextField, 
  InputAdornment, 
  Chip, 
  CircularProgress,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Grid,
  Paper,
  Avatar,
  Stack,
  alpha,
  Fade,
  Slide,
  Zoom,
  Divider
} from '@mui/material';
import { 
  Close as CloseIcon,
  Search, 
  PlayArrow,
  CalendarToday,
  AccessTime,
  Person,
  Visibility,
  Share,
  Download,
  FilterList,
  DateRange,
  Category,
  PlayCircleFilled,
  YouTube,
  Schedule,
  Mic,
  Book,
  Lightbulb,
  ArrowForward,
  Star,
  TrendingUp,
  Groups
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { usePageContent } from '../../cms';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh',
  background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/images/banner/pastor-sermon_1.JPG) center 0% / cover no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const SermonCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(21, 101, 192, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1565C0, #0D47A1)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(21, 101, 192, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .sermon-thumbnail': {
      transform: 'scale(1.05)',
    },
    '& .play-overlay': {
      opacity: 1,
    },
  },
}));

const CategoryChip = styled(Chip)(({ theme, active }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: active ? '#1565C0' : 'transparent',
  color: active ? 'white' : '#1565C0',
  border: '1px solid #1565C0',
  '&:hover': {
    backgroundColor: active ? '#0D47A1' : alpha('#1565C0', 0.1),
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  background: alpha('#fff', 0.08),
  backdropFilter: 'blur(12px)',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 12,
  border: `1px solid ${alpha('#C9A84C', 0.15)}`,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
    opacity: 0.6,
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 30px ${alpha('#000', 0.25)}`,
    borderColor: alpha('#C9A84C', 0.4),
    '&::before': {
      opacity: 1,
      left: '10%',
      right: '10%',
    },
  },
}));

// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';
const MAX_RESULTS = 12;

// Function to fetch YouTube videos with duration
const fetchYouTubeVideos = async () => {
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
    console.warn('YouTube API key not configured, using fallback data');
    return FALLBACK_SERMONS;
  }

  if (!CHANNEL_ID || CHANNEL_ID === 'YOUR_YOUTUBE_CHANNEL_ID') {
    console.warn('YouTube channel ID not configured, using fallback data');
    return FALLBACK_SERMONS;
  }

  try {
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
    );
    
    if (!searchResponse.ok) {
      throw new Error(`HTTP ${searchResponse.status}: ${searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return FALLBACK_SERMONS;
    }

    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`
    );
    
    const detailsData = await detailsResponse.json();
    const durationMap = {};
    if (detailsData.items) {
      detailsData.items.forEach(video => {
        durationMap[video.id] = video.contentDetails.duration;
      });
    }

    return searchData.items.map((item) => {
      const videoId = item.id.videoId;
      return {
        id: videoId,
        title: item.snippet.title,
        speaker: item.snippet.channelTitle,
        date: item.snippet.publishedAt,
        duration: durationMap[videoId] || 'N/A',
        thumbnail: item.snippet.thumbnails.high.url,
        videoUrl: `https://www.youtube.com/embed/${videoId}`,
        description: item.snippet.description,
        category: 'all',
        views: 0,
        tags: []
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return FALLBACK_SERMONS;
  }
};

// Fallback mock data for when API fails
const FALLBACK_SERMONS = [
  {
    id: 'fallback1',
    title: 'Welcome to Our Church Services',
    speaker: 'Church Ministry',
    date: new Date().toISOString(),
    duration: 'PT45M30S',
    thumbnail: '/images/banner/pastor-sermon_1.JPG',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Join us for our weekly church service and spiritual guidance.',
    category: 'all',
    views: 100,
    tags: ['Welcome', 'Service']
  }
];

const ProfessionalSermonsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const content = usePageContent('sermons');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const iconMap = {
    Book: <Book />,
    Visibility: <Visibility />,
    Category: <Category />,
    Schedule: <Schedule />,
  };

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSections(prev => new Set(prev).add(index)), index * 200);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(observer => observer?.disconnect());
  }, []);

  useEffect(() => {
    // Load sermon data from YouTube API
    const loadSermons = async () => {
      setLoading(true);
      try {
        const youtubeSermons = await fetchYouTubeVideos();
        setSermons(youtubeSermons);
        setFilteredSermons(youtubeSermons);
      } catch (error) {
        console.error('Error loading sermons:', error);
        // Use fallback data if API fails
        setSermons(FALLBACK_SERMONS);
        setFilteredSermons(FALLBACK_SERMONS);
      } finally {
        setLoading(false);
      }
    };

    loadSermons();
  }, []);

  useEffect(() => {
    // Filter sermons based on search and category
    let filtered = sermons;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sermon => sermon.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSermons(filtered);
  }, [sermons, searchTerm, selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Sermons', icon: <Book /> },
    { id: 'hope', name: 'Hope', icon: <Lightbulb /> },
    { id: 'prayer', name: 'Prayer', icon: <Mic /> },
    { id: 'purpose', name: 'Purpose', icon: <Star /> },
    { id: 'family', name: 'Family', icon: <Groups /> },
    { id: 'salvation', name: 'Salvation', icon: <TrendingUp /> },
    { id: 'faith', name: 'Faith', icon: <Lightbulb /> }
  ];

  const stats = content.stats?.length > 0
    ? content.stats.map((stat, i) => ({
        number: stat.number,
        label: stat.label,
        icon: iconMap[stat.icon] || [<Book />, <Visibility />, <Category />, <Schedule />][i] || <Book />,
      }))
    : [
        { number: '50+', label: 'Sermons Available', icon: <Book /> },
        { number: '10K+', label: 'Total Views', icon: <Visibility /> },
        { number: '7', label: 'Categories', icon: <Category /> },
        { number: '24/7', label: 'On-Demand', icon: <Schedule /> },
      ];

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 'Unknown';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handlePlaySermon = (sermon) => {
    setSelectedSermon(sermon);
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
    setTimeout(() => setSelectedSermon(null), 300);
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <HeroBanner>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Fade in timeout={1000}>
            <Box textAlign="left" color="white">
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                {content.hero?.title || 'Sermons'}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  mb: 4,
                  opacity: 0.95,
                  maxWidth: '600px',
                  lineHeight: 1.6,
                }}
              >
                {content.hero?.subtitle || '"Faith comes from hearing the message, and the message is heard through the word about Christ."'}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontStyle: 'italic', opacity: 0.85, mb: 4 }}
              >
                Romans 10:17
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={2.5} sx={{ mt: 24, mb: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatsCard elevation={0}>
                      <Box sx={{ color: alpha('#C9A84C', 0.8), mb: 1.5, '& .MuiSvgIcon-root': { fontSize: 28 } }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, color: '#C9A84C', fontFamily: '"Playfair Display", serif' }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.85rem' }}>
                        {stat.label}
                      </Typography>
                    </StatsCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </HeroBanner>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Search and Filter Section */}
        <Box mb={8} ref={(el) => (sectionRefs.current[0] = el)}>
          <Slide direction="up" in={visibleSections.has(0)} timeout={600}>
            <Box>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search sermons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: '#1565C0' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: '#1565C0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1565C0',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {categories.map((category) => (
                        <CategoryChip
                          key={category.id}
                          label={category.name}
                          icon={category.icon}
                          active={selectedCategory === category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          clickable
                        />
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Sermons Grid */}
        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  color: '#1565C0',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Recent Sermons
              </Typography>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                  <CircularProgress sx={{ color: '#1565C0' }} />
                </Box>
              ) : filteredSermons.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" color="text.secondary">
                    No sermons found matching your criteria.
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {filteredSermons.map((sermon, index) => (
                    <Grid item xs={12} sm={6} md={4} key={sermon.id}>
                      <SermonCard index={index} elevation={6}>
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={sermon.thumbnail || '/images/banner/pastor-sermon_1.JPG'}
                            alt={sermon.title}
                            className="sermon-thumbnail"
                            sx={{
                              transition: 'transform 0.5s ease',
                            }}
                          />
                          <Box
                            className="play-overlay"
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(21, 101, 192, 0.8)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconButton
                              onClick={() => handlePlaySermon(sermon)}
                              sx={{
                                backgroundColor: 'white',
                                color: '#1565C0',
                                width: 60,
                                height: 60,
                                '&:hover': {
                                  backgroundColor: '#f8f9fa',
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <PlayArrow sx={{ fontSize: 32 }} />
                            </IconButton>
                          </Box>
                          
                          {/* Duration Badge */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              right: 8,
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                              color: 'white',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.75rem',
                              fontWeight: 500,
                            }}
                          >
                            {formatDuration(sermon.duration)}
                          </Box>
                        </Box>
                        
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1565C0' }}>
                            {sermon.title}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                            {sermon.description}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            <Stack spacing={2}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Person sx={{ fontSize: 18, color: '#1565C0' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {sermon.speaker}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarToday sx={{ fontSize: 18, color: '#1565C0' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {formatDate(sermon.date)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Visibility sx={{ fontSize: 18, color: '#1565C0' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {formatViews(sermon.views)} views
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                              {sermon.tags && sermon.tags.length > 0 ? (
                                sermon.tags.map((tag, idx) => (
                                  <Chip
                                    key={idx}
                                    label={tag}
                                    size="small"
                                    sx={{
                                      backgroundColor: alpha('#1565C0', 0.1),
                                      color: '#1565C0',
                                      fontWeight: 500,
                                      fontSize: '0.75rem',
                                    }}
                                  />
                                ))
                              ) : (
                                <Chip
                                  label="Sermon"
                                  size="small"
                                  sx={{
                                    backgroundColor: alpha('#1565C0', 0.1),
                                    color: '#1565C0',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                  }}
                                />
                              )}
                            </Stack>
                          </Box>

                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handlePlaySermon(sermon)}
                            startIcon={<PlayArrow />}
                            sx={{
                              borderColor: '#1565C0',
                              color: '#1565C0',
                              textTransform: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                backgroundColor: '#1565C0',
                                color: 'white',
                              },
                            }}
                          >
                            Watch Now
                          </Button>
                        </CardContent>
                      </SermonCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Slide>
        </Box>

        {/* Call to Action */}
        <Box
          ref={(el) => (sectionRefs.current[2] = el)}
          sx={{
            py: 5,
            background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url(/images/banner/pastor-sermon_1.JPG)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(2)} timeout={1000}>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  Share the Word
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  These sermons are meant to be shared. Help spread God's word by sharing 
                  these messages with friends, family, and on social media.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Share />}
                    sx={{
                      px: 4,
                      py: 2,
                      borderColor: 'white',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#1565C0',
                      },
                    }}
                  >
                    Share Sermons
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/contact"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                      color: '#1565C0',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                      },
                    }}
                  >
                    Request Prayer
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Container>
        </Box>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={videoModalOpen}
        onClose={handleCloseVideoModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
            maxHeight: '90vh',
          }
        }}
      >
        {selectedSermon && (
          <>
            <DialogTitle
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedSermon.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {selectedSermon.speaker} • {formatDate(selectedSermon.date)}
                </Typography>
              </Box>
              <IconButton onClick={handleCloseVideoModal} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                <iframe
                  src={selectedSermon.videoUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allowFullScreen
                  title={selectedSermon.title}
                />
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                  {selectedSermon.description}
                </Typography>
                
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Chip
                    icon={<Person />}
                    label={selectedSermon.speaker}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#1565C0', 0.1),
                      color: '#1565C0',
                    }}
                  />
                  <Chip
                    icon={<AccessTime />}
                    label={formatDuration(selectedSermon.duration)}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#1565C0', 0.1),
                      color: '#1565C0',
                    }}
                  />
                  <Chip
                    icon={<Visibility />}
                    label={`${formatViews(selectedSermon.views)} views`}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#1565C0', 0.1),
                      color: '#1565C0',
                    }}
                  />
                </Stack>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProfessionalSermonsPage;
