import React, { useState, useEffect } from 'react';
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
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Search, PlayArrow } from '@mui/icons-material';

// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';
const MAX_RESULTS = 12;

// Function to fetch YouTube videos with duration
const fetchYouTubeVideos = async () => {
  try {
    // First, get the list of videos
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
    );
    const searchData = await searchResponse.json();

    if (!searchData.items) {
      throw new Error('No videos found');
    }

    // Get video IDs for duration lookup
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    // Get video details including duration
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`
    );
    const detailsData = await detailsResponse.json();

    // Create a map of video ID to duration
    const durationMap = {};
    detailsData.items.forEach(video => {
      durationMap[video.id] = video.contentDetails.duration;
    });

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
  background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
  color: 'white',
  padding: theme.spacing(16, 0, 14),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
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
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 0, 8),
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.2rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: '700px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  fontSize: '1.2rem',
  lineHeight: 1.6,
  opacity: 0.95,
  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '50px',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
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
    { id: 'recent', label: 'Recent Sermons' },
    { id: 'older', label: 'Older Sermons' },
    { id: 'series', label: 'Sermon Series' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'topics', label: 'Topics' }
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
      case 'series':
      case 'speakers':
      case 'topics':
        return []; // These would be filtered based on the selected tab in a real implementation
      default:
        return filteredSermons;
    }
  };
  
  const currentVideos = getVideosForActiveTab();
  
  // No need for useStyles hook anymore

  // Fetch YouTube videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchYouTubeVideos();
        setSermons(videos);
        setFilteredSermons(videos);
        if (videos.length > 0) {
          setSelectedVideo(videos[0]);
        }
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error loading videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

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
    document.title = `Sermons | ${process.env.REACT_APP_CHURCH_NAME || 'Church Name'}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch or listen to our latest sermons and teachings.');
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
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Try Again
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
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
            Sermons & Teachings
          </Typography>
          <Typography variant="h6" align="center" sx={{ maxWidth: 700, margin: '0 auto', opacity: 0.9 }}>
            Watch and listen to our latest sermons and biblical teachings to grow in your faith journey.
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
                label={item.label} 
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
            placeholder="Search sermons by title, speaker, or description..."
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
              Recent Sermons
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Latest messages from the past two weeks
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
                      Watch Now
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
              {recentVideos.length > 0 ? 'Older Sermons' : 'All Sermons'}
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
                          Watch Now
                        </ViewButton>
                      </VideoInfo>
                    </StyledCard>
                  ))}
                </VideoListContainer>
              </Box>
            ))}
          </Box>
        )}

        {/* Empty State for Other Tabs */}
        {['series', 'speakers', 'topics'].includes(activeTab) && (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" gutterBottom>
              {menuItems.find(item => item.id === activeTab)?.label}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              {`This section will show ${activeTab.toLowerCase()} when available.`}
            </Typography>
          </Box>
        )}

        {/* No Results */}
        {currentVideos.length === 0 && filteredSermons.length > 0 && activeTab !== 'series' && activeTab !== 'speakers' && activeTab !== 'topics' && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="textSecondary">
              No {activeTab === 'recent' ? 'recent' : 'older'} sermons found.
            </Typography>
          </Box>
        )}

        {filteredSermons.length === 0 && !isLoading && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No sermons found matching your search.
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => setSearchQuery('')}
              sx={{ mt: 2 }}
            >
              Clear Search
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
