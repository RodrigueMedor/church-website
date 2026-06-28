import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Button, 
  TextField, 
  InputAdornment, 
  Chip, 
  CircularProgress,
  useMediaQuery,
  useTheme,
  styled,
  Tabs,
  Tab,
  Modal,
  IconButton,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Search, PlayArrow } from '@mui/icons-material';

// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';
const MAX_RESULTS = 12;

// Fallback mock data for when API fails
const FALLBACK_SERMONS = [
  {
    id: 'fallback1',
    title: 'Welcome to Our Church Services',
    speaker: 'Church Ministry',
    date: new Date().toISOString(),
    duration: 'PT45M30S',
    image: '/images/hero-bg.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Join us for our weekly church service and spiritual guidance.'
  },
  {
    id: 'fallback2',
    title: 'Sunday Morning Worship',
    speaker: 'Pastor John',
    date: new Date(Date.now() - 86400000).toISOString(),
    duration: 'PT1H15M00S',
    image: '/images/hero-bg.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A powerful Sunday morning worship service with inspiring messages.'
  },
  {
    id: 'fallback3',
    title: 'Finding Peace in Troubled Times',
    speaker: 'Pastor Sarah',
    date: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString(), // 30 days ago
    duration: 'PT55M20S',
    image: '/images/hero-bg.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A message about finding inner peace through faith and prayer during difficult times.'
  },
  {
    id: 'fallback4',
    title: 'The Power of Community',
    speaker: 'Pastor Michael',
    date: new Date(Date.now() - (60 * 24 * 60 * 60 * 1000)).toISOString(), // 60 days ago
    duration: 'PT1H05M00S',
    image: '/images/hero-bg.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Exploring the importance of Christian community and fellowship in our spiritual journey.'
  },
  {
    id: 'fallback5',
    title: 'Easter Sunday Celebration',
    speaker: 'Church Ministry',
    date: new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)).toISOString(), // 90 days ago
    duration: 'PT1H30M00S',
    image: '/images/hero-bg.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A special Easter service celebrating the resurrection and hope found in Christ.'
  }
];

// Function to fetch YouTube videos with duration
const fetchYouTubeVideos = async () => {
  // Check if API key is configured
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
    console.warn('YouTube API key not configured, using fallback data');
    return FALLBACK_SERMONS;
  }

  // Check if channel ID is configured
  if (!CHANNEL_ID || CHANNEL_ID === 'YOUR_YOUTUBE_CHANNEL_ID') {
    console.warn('YouTube channel ID not configured, using fallback data');
    return FALLBACK_SERMONS;
  }

  try {
    // First, get the list of videos
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
    );
    
    // Check if response is OK
    if (!searchResponse.ok) {
      if (searchResponse.status === 403) {
        console.error('YouTube API 403 Forbidden: Check API key permissions and quota');
        throw new Error('API_ACCESS_DENIED');
      } else if (searchResponse.status === 404) {
        console.error('YouTube API 404: Check channel ID');
        throw new Error('CHANNEL_NOT_FOUND');
      }
      throw new Error(`HTTP ${searchResponse.status}: ${searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      console.warn('No videos found in YouTube channel, using fallback data');
      return FALLBACK_SERMONS;
    }

    // Get video IDs for duration lookup
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    // Get video details including duration
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`
    );
    
    if (!detailsResponse.ok) {
      console.warn('Failed to fetch video details, using basic data');
      // Return basic data without duration
      return searchData.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        speaker: item.snippet.channelTitle,
        date: item.snippet.publishedAt,
        duration: 'N/A',
        image: item.snippet.thumbnails.high.url,
        video: `https://www.youtube.com/embed/${item.id.videoId}`,
        description: item.snippet.description,
      }));
    }
    
    const detailsData = await detailsResponse.json();

    // Create a map of video ID to duration
    const durationMap = {};
    if (detailsData.items) {
      detailsData.items.forEach(video => {
        durationMap[video.id] = video.contentDetails.duration;
      });
    }

    // Combine the data
    return searchData.items.map((item) => {
      const videoId = item.id.videoId;
      return {
        id: videoId,
        title: item.snippet.title,
        speaker: item.snippet.channelTitle,
        date: item.snippet.publishedAt,
        duration: durationMap[videoId] || 'N/A',
        image: item.snippet.thumbnails.high.url,
        video: `https://www.youtube.com/embed/${videoId}`,
        description: item.snippet.description,
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    // Return fallback data for API errors
    if (error.message === 'API_ACCESS_DENIED' || error.message === 'CHANNEL_NOT_FOUND') {
      console.warn('Using fallback data due to API error');
      return FALLBACK_SERMONS;
    }
    
    throw error;
  }
};

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  '&.selected': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const Thumbnail = styled('div')({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
  overflow: 'hidden',
});

const ThumbnailImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const DurationBadge = styled('div')({
  position: 'absolute',
  bottom: 8,
  right: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: '0.75rem',
});

const PlayButtonOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  opacity: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
  },
}));

const VideoInfo = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const VideoTitle = styled(Typography)({
  fontWeight: 500,
  marginBottom: 8,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const VideoMeta = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
  marginBottom: 8,
});

const ViewButton = styled(Button)(({ theme }) => ({
  marginTop: 8,
  width: '100%',
  fontSize: '0.8rem',
  padding: '4px 8px',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const WatchButton = styled(Button)(({ theme }) => ({
  marginTop: 16,
  width: '100%',
}));

const VideoListContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 24,
  marginTop: 32,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const SearchBar = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));


const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("/images/banner/banner-sermont.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center 35%',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  color: 'white',
  padding: theme.spacing(16, 0, 14),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 100%)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(12, 0, 10),
    minHeight: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 0, 8),
    minHeight: '300px',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  textShadow: '0 4px 12px rgba(0,0,0,0.5)',
  fontSize: { xs: '2.5rem', md: '3.5rem' },
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  fontSize: { xs: '1.1rem', md: '1.3rem' },
  lineHeight: 1.7,
  fontWeight: 400,
  opacity: 1,
  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.95)',
  fontStyle: 'italic',
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 5),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '50px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(255,255,255,0.3)',
  color: 'white',
  letterSpacing: '0.02em',
  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.6s ease-in-out'
  },
  '&:hover': {
    background: 'rgba(255,255,255,0.25)',
    borderColor: 'rgba(255,255,255,0.5)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    '&::before': {
      left: '100%'
    }
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.98)'
  }
}));

const RootContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const formatDuration = (duration) => {
  if (!duration || duration === 'N/A') return 'N/A';
  
  // Parse ISO 8601 duration format (e.g., PT1H23M45S)
  const match = duration.match(/PT(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/);
  if (!match) return 'N/A';
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  
  const parts = [];
  if (hours > 0) parts.push(hours);
  parts.push(minutes.toString().padStart(hours > 0 ? 2 : 1, '0'));
  parts.push(seconds.toString().padStart(2, '0'));
  
  return parts.join(':');
};

const SermonsPage = () => {
  const { t } = useTranslation();
  // State declarations at the top of the component
  const [searchQuery, setSearchQuery] = useState('');
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('recent');
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Define tab menu items
  const menuItems = [
    { id: 'recent', labelKey: 'sermons.tabs.recent' },
    { id: 'older', labelKey: 'sermons.tabs.older' }
  ];
  
  // Function to check if a video is recent (published within last 2 weeks)
  const isRecentVideo = (videoDate) => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    return new Date(videoDate) > twoWeeksAgo;
  };
  
  // Filter videos based on search query and active tab
  useEffect(() => {
    const filtered = sermons.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.speaker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSermons(filtered);
  }, [searchQuery, sermons]);

  // Separate videos into recent and older based on the filtered list
  const recentVideos = filteredSermons.filter(video => isRecentVideo(video.date));
  const olderVideos = filteredSermons.filter(video => !isRecentVideo(video.date));
  
  // Group older videos by month and year
  const groupVideosByMonthYear = (videos) => {
    const groups = {};
    
    videos.forEach(video => {
      const date = new Date(video.date);
      const monthYear = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      
      groups[monthYear].push(video);
    });
    
    return Object.entries(groups).map(([monthYear, videos]) => ({
      monthYear,
      videos: videos.sort((a, b) => new Date(b.date) - new Date(a.date))
    })).sort((a, b) => new Date(b.videos[0].date) - new Date(a.videos[0].date));
  };
  
  const olderVideosByMonth = groupVideosByMonthYear(olderVideos);
  
  // Get videos based on active tab
  const getVideosForActiveTab = () => {
    switch (activeTab) {
      case 'recent':
        return recentVideos;
      case 'older':
        return olderVideos;
      default:
        return filteredSermons;
    }
  };
  
  const currentVideos = getVideosForActiveTab();
  
  // No need for useStyles hook anymore

  const loadVideos = async () => {
    console.log('Starting to load videos...');
    setIsLoading(true);
    try {
      const videos = await fetchYouTubeVideos();
      console.log('Videos fetched:', videos);
      setSermons(videos);
      setFilteredSermons(videos);
      if (videos.length > 0) {
        setSelectedVideo(videos[0]);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading videos:', err);
      console.warn('Using fallback data due to complete API failure');
      setSermons(FALLBACK_SERMONS);
      setFilteredSermons(FALLBACK_SERMONS);
      if (FALLBACK_SERMONS.length > 0) {
        setSelectedVideo(FALLBACK_SERMONS[0]);
      }
      setError(null);
    } finally {
      setIsLoading(false);
      console.log('Video loading completed');
    }
  };

  // Fetch YouTube videos on component mount
  useEffect(() => {
    loadVideos();
  }, []);

  // Filter videos based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = sermons.filter(
        sermon =>
          sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (sermon.description && sermon.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredSermons(filtered);
    } else {
      setFilteredSermons(sermons);
    }
  }, [searchQuery, sermons]);

  // Set document title and meta description
  useEffect(() => {
    document.title = `${t('sermons.page.title')} | ${process.env.REACT_APP_CHURCH_NAME || 'Church Name'}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('sermons.page.subtitle'));
    }
  }, []);

  // Handle URL parameters for autoplay
  useEffect(() => {
    if (recentVideos.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const autoplayParam = params.get('autoplay');
      
      if (autoplayParam === 'recent' && !isModalOpen) {
        // Find the most recent video
        const mostRecentVideo = [...recentVideos].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        )[0];
        
        if (mostRecentVideo) {
          setPreviewVideo(mostRecentVideo);
          setIsModalOpen(true);
          
          // Clean up the URL without reloading the page
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }
      }
    }
  }, [recentVideos, isModalOpen]);

    const handleVideoSelect = (video, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    setPreviewVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewVideo(null);
  }; 

  // Handle click outside modal to close
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  }; 

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={loadVideos}
          sx={{ mt: 2 }}
        >
          {t('sermons.page.tryAgain')}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      minHeight: '100vh',
      py: 4
    }}>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.8rem', md: '4rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              mb: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))'
            }}
          >
            {t('sermons.page.title')}
          </Typography>
          <Typography 
            variant="h5" 
            component="p"
            align="center" 
            sx={{ 
              maxWidth: 800, 
              margin: '0 auto', 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.7,
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,0.95)',
              fontStyle: 'italic',
              mb: 4
            }}
          >
            {t('sermons.page.subtitle')}
          </Typography>
        </Container>
      </HeroSection>

      {/* Tab Navigation */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="sermons navigation tabs"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 'auto',
                px: 3,
                py: 2,
                fontSize: '1rem',
                fontWeight: 500,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            {menuItems.map((item) => (
              <Tab 
                key={item.id} 
                value={item.id} 
                label={t(item.labelKey)} 
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      <RootContainer maxWidth="lg">
        {/* Search Bar */}
        <SearchBar>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('sermons.page.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </SearchBar>

        {/* Videos Section */}
        {activeTab === 'recent' && recentVideos.length > 0 && (
          <Box mb={6} id="recent-sermons">
            <Typography variant="h4" component="h2" gutterBottom>
              {t('sermons.page.recentSermons')}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {t('sermons.page.recentSermonsSubtitle')}
            </Typography>
            <VideoListContainer>
              {recentVideos.map((video) => (
                <StyledCard
                  key={video.id}
                  className={selectedVideo?.id === video.id ? 'selected' : ''}
                  onClick={() => handleVideoSelect(video)}
                >
                  <Thumbnail>
                    <ThumbnailImage src={video.image} alt={video.title} />
                    <DurationBadge>
                      {formatDuration(video.duration)}
                    </DurationBadge>
                    <PlayButtonOverlay>
                      <PlayArrow />
                    </PlayButtonOverlay>
                  </Thumbnail>
                  <VideoInfo>
                    <VideoTitle variant="subtitle1">
                      {video.title}
                    </VideoTitle>
                    <VideoMeta>
                      <Typography variant="body2" color="textSecondary">
                        {video.speaker}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(video.date).toLocaleDateString()}
                      </Typography>
                    </VideoMeta>
                    <ViewButton 
                      variant="outlined" 
                      size="small"
                      color="primary"
                      onClick={(e) => handleVideoSelect(video, e)}
                    >
                      {t('sermons.page.watchNow')}
                    </ViewButton>
                  </VideoInfo>
                </StyledCard>
              ))}
            </VideoListContainer>
          </Box>
        )}

        {/* Older Sermons Section */}
        {activeTab === 'older' && olderVideosByMonth && olderVideosByMonth.length > 0 && (
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              {recentVideos.length > 0 ? t('sermons.page.olderSermons') : t('sermons.page.allSermons')}
            </Typography>
            
            {olderVideosByMonth.map(({ monthYear, videos }) => (
              <Box key={monthYear} mb={6}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.secondary',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                    pb: 1,
                    mb: 3,
                    display: 'inline-block'
                  }}
                >
                  {monthYear}
                </Typography>
                <VideoListContainer>
                  {videos.map((video) => (
                    <StyledCard
                      key={video.id}
                      className={selectedVideo?.id === video.id ? 'selected' : ''}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <Thumbnail>
                        <ThumbnailImage src={video.image} alt={video.title} />
                        <DurationBadge>
                          {formatDuration(video.duration)}
                        </DurationBadge>
                        <PlayButtonOverlay>
                          <PlayArrow />
                        </PlayButtonOverlay>
                      </Thumbnail>
                      <VideoInfo>
                        <VideoTitle variant="subtitle1">
                          {video.title}
                        </VideoTitle>
                        <VideoMeta>
                          <Typography variant="body2" color="textSecondary">
                            {video.speaker}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(video.date).toLocaleDateString()}
                          </Typography>
                        </VideoMeta>
                        <ViewButton 
                          variant="outlined" 
                          size="small"
                          color="primary"
                          onClick={(e) => handleVideoSelect(video, e)}
                        >
                          {t('sermons.page.watchNow')}
                        </ViewButton>
                      </VideoInfo>
                    </StyledCard>
                  ))}
                </VideoListContainer>
              </Box>
            ))}
          </Box>
        )}

        {/* No Results */}
        {currentVideos.length === 0 && filteredSermons.length > 0 && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="textSecondary">
              {t(activeTab === 'recent' ? 'sermons.page.noRecentSermons' : 'sermons.page.noOlderSermons')}
            </Typography>
          </Box>
        )}

        {filteredSermons.length === 0 && !isLoading && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {t('sermons.page.noSermonsFound')}
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => setSearchQuery('')}
              sx={{ mt: 2 }}
            >
              {t('sermons.page.clearSearch')}
            </Button>
          </Box>
        )}
      </RootContainer>

      {/* Video Preview Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="video-preview-modal"
        aria-describedby="video-preview-description"
        onClick={handleBackdropClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            borderRadius: 1,
            overflow: 'hidden',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {previewVideo && (
            <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src={`https://www.youtube.com/embed/${previewVideo.id}?autoplay=1`}
                title={previewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          )}
          
          {previewVideo && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {previewVideo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {previewVideo.speaker} • {new Date(previewVideo.date).toLocaleDateString()}
              </Typography>
              {previewVideo.description && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {previewVideo.description}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default SermonsPage;
