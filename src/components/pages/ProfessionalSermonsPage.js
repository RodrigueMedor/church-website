import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Container, Typography, Card, CardContent, CardMedia, Button, TextField, InputAdornment,
  Chip, CircularProgress, useMediaQuery, useTheme, Dialog, DialogContent, DialogTitle, IconButton,
  Grid, Paper, Stack, alpha, Divider
} from '@mui/material';
import {
  Close as CloseIcon, Search, PlayArrow, CalendarToday, AccessTime, Person, Visibility,
  Share, Book, Lightbulb, ArrowForward, Mic, Star, TrendingUp, Groups, Schedule
} from '@mui/icons-material';
import { usePageContent } from '../../cms';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, SectionLabel } from '../common/animations';

const FALLBACK_SERMONS = [
  { id: 'fallback1', title: 'Welcome to Our Church Services', speaker: 'Church Ministry', date: new Date().toISOString(), duration: 'PT45M30S', thumbnail: '/images/banner/pastor-sermon_1.JPG', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Join us for our weekly church service and spiritual guidance.', category: 'all', views: 100, tags: ['Welcome', 'Service'] }
];

const fetchYouTubeVideos = async () => {
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
  const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'YOUR_YOUTUBE_CHANNEL_ID';
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY' || !CHANNEL_ID || CHANNEL_ID === 'YOUR_YOUTUBE_CHANNEL_ID') {
    return FALLBACK_SERMONS;
  }
  try {
    const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`);
    if (!searchRes.ok) return FALLBACK_SERMONS;
    const searchData = await searchRes.json();
    if (!searchData.items || searchData.items.length === 0) return FALLBACK_SERMONS;
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    const detailsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`);
    const detailsData = await detailsRes.json();
    const durationMap = {};
    if (detailsData.items) detailsData.items.forEach(v => { durationMap[v.id] = v.contentDetails.duration; });
    return searchData.items.map(item => {
      const videoId = item.id.videoId;
      return { id: videoId, title: item.snippet.title, speaker: item.snippet.channelTitle, date: item.snippet.publishedAt, duration: durationMap[videoId] || 'N/A', thumbnail: item.snippet.thumbnails.high.url, videoUrl: `https://www.youtube.com/embed/${videoId}`, description: item.snippet.description, category: 'all', views: 0, tags: [] };
    });
  } catch { return FALLBACK_SERMONS; }
};

const ProfessionalSermonsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const content = usePageContent('sermons');
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const effectiveSermons = (content.sermons || []).length > 0 ? content.sermons : [];

  useEffect(() => {
    const loadSermons = async () => {
      setLoading(true);
      try {
        const yt = await fetchYouTubeVideos();
        if (yt.length <= 1 && effectiveSermons.length > 0) {
          const cms = effectiveSermons.map((s, i) => ({ id: s.id || `cms-${i}`, title: s.title || '', speaker: s.speaker || s.pastor || '', date: s.date || s.sermonDate || new Date().toISOString(), duration: s.duration || 'PT30M', thumbnail: s.imageUrl || '/images/banner/pastor-sermon_1.JPG', videoUrl: s.videoUrl || '', description: s.description || '', category: (s.category || 'all').toLowerCase(), views: s.views || 0, tags: s.tags || [s.category || 'Sermon'].filter(Boolean) }));
          setSermons(cms); setFilteredSermons(cms);
        } else { setSermons(yt); setFilteredSermons(yt); }
      } catch {
        if (effectiveSermons.length > 0) {
          const cms = effectiveSermons.map((s, i) => ({ id: s.id || `cms-${i}`, title: s.title || '', speaker: s.speaker || '', date: s.date || new Date().toISOString(), duration: s.duration || 'PT30M', thumbnail: s.imageUrl || '/images/banner/pastor-sermon_1.JPG', videoUrl: s.videoUrl || '', description: s.description || '', category: (s.category || 'all').toLowerCase(), views: s.views || 0, tags: [] }));
          setSermons(cms); setFilteredSermons(cms);
        } else { setSermons(FALLBACK_SERMONS); setFilteredSermons(FALLBACK_SERMONS); }
      } finally { setLoading(false); }
    };
    loadSermons();
  }, []);

  useEffect(() => {
    let filtered = sermons;
    if (selectedCategory !== 'all') filtered = filtered.filter(s => s.category === selectedCategory);
    if (searchTerm) filtered = filtered.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.speaker.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredSermons(filtered);
  }, [sermons, searchTerm, selectedCategory]);

  const categories = effectiveSermons.length > 0
    ? [{ id: 'all', name: t('sermons.page.allSermons', 'All Sermons') }, ...[...new Set(effectiveSermons.map(s => s.category || '').filter(Boolean))].map(c => ({ id: c.toLowerCase(), name: c }))]
    : [{ id: 'all', name: t('sermons.page.allSermons', 'All Sermons') }, { id: 'hope', name: 'Hope' }, { id: 'prayer', name: 'Prayer' }, { id: 'purpose', name: 'Purpose' }, { id: 'family', name: 'Family' }, { id: 'salvation', name: 'Salvation' }];

  const formatDuration = (d) => { const m = d.match(/PT(\d+H)?(\d+M)?(\d+S)?/); if (!m) return '?'; const h = parseInt(m[1]) || 0; const min = parseInt(m[2]) || 0; return h > 0 ? `${h}h ${min}m` : `${min}m`; };
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const handlePlaySermon = (s) => { setSelectedSermon(s); setVideoModalOpen(true); };
  const handleCloseVideoModal = () => { setVideoModalOpen(false); setTimeout(() => setSelectedSermon(null), 300); };

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, rgba(10,53,96,0.85), rgba(15,76,129,0.85)), url(/images/banner/pastor-sermon_1.JPG) center 0% / cover no-repeat',
        color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 12, md: 18 }, position: 'relative',
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <Box textAlign="left" maxWidth="700px">
              <SectionLabel sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }}>Sermons</SectionLabel>
              <Typography variant="h1" component="h1" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                {content.hero?.title || t('sermons.page.title', 'Sermons')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.7, mb: 2 }}>
                {content.hero?.subtitle || '"Faith comes from hearing the message, and the message is heard through the word about Christ."'}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', opacity: 0.7, color: '#C9A227', fontWeight: 500 }}>Romans 10:17</Typography>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {/* Search + Filter */}
        <FadeIn>
          <Box mb={6}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField fullWidth placeholder={t('sermons.page.searchPlaceholder', 'Search sermons...')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: 'primary.main' }} /></InputAdornment> }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                  {categories.map((cat) => (
                    <Chip key={cat.id} label={cat.name} onClick={() => setSelectedCategory(cat.id)}
                      sx={{ fontWeight: 600, cursor: 'pointer', bgcolor: selectedCategory === cat.id ? 'primary.main' : alpha(theme.palette.primary.main, 0.06), color: selectedCategory === cat.id ? '#fff' : 'primary.main', '&:hover': { bgcolor: selectedCategory === cat.id ? 'primary.dark' : alpha(theme.palette.primary.main, 0.12) } }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </FadeIn>

        {/* Sermons Grid */}
        <FadeIn>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 4, color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.2rem' }, textAlign: 'center' }}>
            {t('sermons.tabs.recent', 'Recent Sermons')}
          </Typography>
        </FadeIn>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress sx={{ color: 'primary.main' }} /></Box>
        ) : filteredSermons.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}><Typography variant="h6" color="text.secondary">{t('sermons.page.noResults', 'No sermons found.')}</Typography></Box>
        ) : (
          <StaggerContainer stagger={0.1}>
            <Grid container spacing={4}>
              {filteredSermons.map((sermon) => (
                <Grid item xs={12} sm={6} md={4} key={sermon.id}>
                  <StaggerItem>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider', transition: 'all 0.35s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 50px rgba(15, 76, 129, 0.12)' } }}>
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia component="img" height="200" image={sermon.thumbnail || '/images/banner/pastor-sermon_1.JPG'} alt={sermon.title} sx={{ transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.05)' } }} />
                        <Box sx={{ position: 'absolute', inset: 0, background: alpha(theme.palette.primary.main, 0.85), opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { opacity: 1 } }}>
                          <IconButton onClick={() => handlePlaySermon(sermon)} sx={{ bgcolor: 'background.paper', color: 'primary.main', width: 56, height: 56, '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.8), transform: 'scale(1.1)' } }}>
                            <PlayArrow sx={{ fontSize: 28 }} />
                          </IconButton>
                        </Box>
                        <Box sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'rgba(0,0,0,0.8)', color: '#fff', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.72rem', fontWeight: 600 }}>
                          {formatDuration(sermon.duration)}
                        </Box>
                      </Box>
                      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary', fontSize: '1rem' }}>{sermon.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, flexGrow: 1 }}>{sermon.description}</Typography>
                        <Stack spacing={1} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Person sx={{ fontSize: 16, color: 'primary.main' }} /><Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>{sermon.speaker}</Typography></Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><CalendarToday sx={{ fontSize: 16, color: 'primary.main' }} /><Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>{formatDate(sermon.date)}</Typography></Box>
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" gap={0.8} mb={2}>
                          {(sermon.tags || ['Sermon']).map((tag, i) => (
                            <Chip key={i} label={tag} size="small" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.06), color: 'primary.main', fontWeight: 500, fontSize: '0.72rem' }} />
                          ))}
                        </Stack>
                        <Button variant="outlined" fullWidth onClick={() => handlePlaySermon(sermon)} startIcon={<PlayArrow />} sx={{ borderColor: 'primary.main', color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.main', color: '#fff' } }}>
                          {t('sermons.page.watchNow', 'Watch Now')}
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        )}

        {/* CTA */}
        <FadeIn>
          <Box sx={{ mt: 10, py: 6, background: 'linear-gradient(135deg, #0F4C81, #0A3560)', borderRadius: 6, textAlign: 'center', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', inset: 0, background: 'url(/images/banner/pastor-sermon_1.JPG)', backgroundSize: 'cover', opacity: 0.08 } }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 2, color: '#fff', fontSize: { xs: '1.6rem', md: '2rem' } }}>{t('sermons.page.shareTitle', 'Share the Word')}</Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
                {t('sermons.page.shareDescription', 'These sermons are meant to be shared. Help spread God\'s word.')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
                <Button variant="outlined" startIcon={<Share />} sx={{ borderColor: '#fff', color: '#fff', fontWeight: 600, px: 4, '&:hover': { bgcolor: '#fff', color: '#0F4C81' } }}>{t('sermons.page.shareSermons', 'Share Sermons')}</Button>
                <Button variant="contained" component={RouterLink} to="/contact" endIcon={<ArrowForward />} sx={{ bgcolor: 'secondary.main', color: '#fff', fontWeight: 700, px: 4, '&:hover': { bgcolor: 'secondary.dark' } }}>{t('sermons.page.requestPrayer', 'Request Prayer')}</Button>
              </Stack>
            </Container>
          </Box>
        </FadeIn>
      </Container>

      {/* Video Dialog */}
      <Dialog open={videoModalOpen} onClose={handleCloseVideoModal} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 5, overflow: 'hidden', maxHeight: '90vh' } }}>
        {selectedSermon && (
          <>
            <DialogTitle sx={{ p: 3, background: 'linear-gradient(135deg, #0F4C81, #0A3560)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{selectedSermon.title}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{selectedSermon.speaker} • {formatDate(selectedSermon.date)}</Typography>
              </Box>
              <IconButton onClick={handleCloseVideoModal} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                <iframe src={selectedSermon.videoUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen title={selectedSermon.title} />
              </Box>
            </DialogContent>
            <DialogContent sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>{selectedSermon.description}</Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                <Chip icon={<Person />} label={selectedSermon.speaker} size="small" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'primary.main' }} />
                <Chip icon={<AccessTime />} label={formatDuration(selectedSermon.duration)} size="small" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'primary.main' }} />
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProfessionalSermonsPage;
