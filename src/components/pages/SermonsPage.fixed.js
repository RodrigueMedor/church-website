import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField, 
  InputAdornment, 
  Chip, 
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CardActionArea,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search, PlayArrow, Share, Download, FilterList, DateRange, Person, Category, YouTube } from '@mui/icons-material';
import { motion } from 'framer-motion';

// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';
const MAX_RESULTS = 50; // Increased to get more videos for filtering

// Function to fetch YouTube videos
const fetchYouTubeVideos = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
    );
    const data = await response.json();
    
    // Transform YouTube data to match our sermon format
    return (data.items || []).map((item, index) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      speaker: item.snippet.channelTitle,
      date: item.snippet.publishedAt,
      duration: 'N/A', // YouTube API v3 requires a separate call to get duration
      image: item.snippet.thumbnails.high.url,
      video: `https://www.youtube.com/embed/${item.id.videoId}`,
      category: 'Sermon',
      series: item.snippet.channelTitle,
      description: item.snippet.description,
      youtubeData: item // Keep original YouTube data
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const SermonCard = ({ sermon, variant = 'grid', onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  if (variant === 'list') {
    return (
      <Card 
        onClick={onClick}
        sx={{ 
          mb: 2, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 180, sm: 'auto' } }}
          image={sermon.image}
          alt={sermon.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {sermon.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              {sermon.speaker} • {new Date(sermon.date).toLocaleDateString()} • {sermon.duration}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip size="small" label={sermon.category} variant="outlined" />
              {sermon.series && <Chip size="small" label={sermon.series} color="primary" variant="outlined" />}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {sermon.description?.substring(0, 150)}...
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
            <Button size="small" startIcon={<PlayArrow />} sx={{ mr: 1 }}>
              Play
            </Button>
            <Button size="small" startIcon={<Download />} sx={{ mr: 1 }}>
              Download
            </Button>
            <IconButton size="small" sx={{ ml: 'auto' }}>
              <Share fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <StyledCard onClick={onClick}>
      <CardActionArea>
        <Box sx={{ position: 'relative', pt: '56.25%' }}>
          <CardMedia
            component="img"
            image={sermon.image}
            alt={sermon.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <IconButton
              size="large"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <PlayArrow fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {sermon.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {sermon.speaker}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {new Date(sermon.date).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {sermon.duration}
            </Typography>
          </Box>
          {sermon.series && (
            <Chip
              size="small"
              label={sermon.series}
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

const SermonsPage = () => {
  const [tabValue, setTabValue] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Fetch YouTube videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchYouTubeVideos();
        setFilteredSermons(videos);
        if (videos.length > 0) {
          setSelectedVideo(videos[0]);
        }
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = filteredSermons.filter(sermon =>
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sermon.speaker && sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sermon.description && sermon.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredSermons(filtered);
    }
  }, [searchQuery]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // In a real app, you would filter sermons based on the selected tab
  };

  // Set document title and meta description
  useEffect(() => {
    document.title = `Sermons | ${process.env.REACT_APP_CHURCH_NAME || 'Church Name'}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch or listen to our latest sermons and teachings.');
    }
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://source.unsplash.com/random/1920x1080?church,sermon)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Sermons & Teachings
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
              Explore our library of biblical teachings and grow in your faith journey.
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search sermons by title, speaker, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="error" gutterBottom>{error}</Typography>
            <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Box>
        ) : (
          <>
            {selectedVideo && (
              <Box sx={{ mb: 6, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                  />
                </div>
                <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {selectedVideo.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      {new Date(selectedVideo.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedVideo.speaker}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {selectedVideo.description?.substring(0, 200)}{selectedVideo.description?.length > 200 ? '...' : ''}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 4 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? 'scrollable' : 'standard'}
                scrollButtons={isMobile ? 'auto' : false}
                allowScrollButtonsMobile
                sx={{
                  mb: 3,
                  '& .MuiTabs-indicator': {
                    height: 4,
                  },
                }}
              >
                <Tab value="recent" label="Recent Sermons" />
                <Tab value="popular" label="Popular" />
                <Tab value="series" label="Series" />
                <Tab value="speakers" label="Speakers" />
                <Tab value="topics" label="Topics" />
              </Tabs>
            </Box>

            {/* Video List */}
            <Box sx={{ mt: 8, mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Latest Videos
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={<YouTube />}
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Channel
                </Button>
              </Box>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {filteredSermons.slice(0, 5).map((sermon, index) => (
                  <React.Fragment key={sermon.id}>
                    <SermonCard 
                      sermon={sermon} 
                      variant="list" 
                      onClick={() => setSelectedVideo(sermon)}
                    />
                    {index < Math.min(4, filteredSermons.length - 1) && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              {filteredSermons.length > 5 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => {
                      // In a real app, you would load more videos here
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    View More Videos
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>

      {/* Newsletter Signup */}
      <Box sx={{ bgcolor: 'primary.main', py: 8, color: 'white' }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
                Never Miss a Message
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Subscribe to our newsletter and get the latest sermons, events, and updates delivered to your inbox.
              </Typography>
              <Box component="form" sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  placeholder="Your email address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)', 
                p: 3, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Listen on the go</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    startIcon={<PlayArrow />}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    Apple Podcasts
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<PlayArrow />}
                    sx={{
                      bgcolor: '#1DB954',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#1ed760',
                      },
                    }}
                  >
                    Spotify
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<PlayArrow />}
                    sx={{
                      bgcolor: '#4285F4',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#3367d6',
                      },
                    }}
                  >
                    Google Podcasts
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SermonsPage;
