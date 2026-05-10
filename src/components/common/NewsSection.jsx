import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Container,
  Button,
  styled
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NewsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const NewsSection = () => {
  const { t } = useTranslation();

  // Current church-themed image paths with fallbacks
  const churchImages = [
    { primary: '/images/easter/worship-team.jpg', fallback: '/images/banner/pastor-sermon_1.JPG' },
    { primary: '/images/easter/pastor-bible-study.jpg', fallback: '/images/church-event.jpg' },
    { primary: '/images/easter/bridge-photo.jpg', fallback: '/images/contact-image.jpg' }
  ];
  
  // Static news data
  const [news] = useState([
    {
      id: '1',
      title: t('news.weeklyService.title', 'Sunday Worship Services'),
      description: t('news.weeklyService.description', 'Join us for inspiring worship, biblical teaching, and warm fellowship every Sunday.'),
      body: t('news.weeklyService.body', 'Experience the presence of God through uplifting worship, prayer, and relevant biblical teaching. Our services provide an opportunity to connect with God and our church family. We offer both English and Haitian Creole services to serve our diverse community.'),
      isActive: true,
      imageUrl: churchImages[0].primary,
      fallbackImage: churchImages[0].fallback,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: t('news.bibleStudy.title', 'Weekly Bible Study & Prayer'),
      description: t('news.bibleStudy.description', 'Grow in your faith through our mid-week Bible study and prayer meetings.'),
      body: t('news.bibleStudy.body', 'Deepen your understanding of Scripture and strengthen your prayer life in our weekly Bible study groups. We explore the Bible together, share insights, and pray for one another and our community. Join us for spiritual growth and meaningful fellowship.'),
      isActive: true,
      imageUrl: churchImages[1].primary,
      fallbackImage: churchImages[1].fallback,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: t('news.communityOutreach.title', 'Community Outreach & Service'),
      description: t('news.communityOutreach.description', 'Serving our community through various outreach programs and volunteer opportunities.'),
      body: t('news.communityOutreach.body', 'We are committed to being the hands and feet of Christ in our community. Through food drives, youth programs, and partnership with local organizations, we make a positive impact. Discover how you can get involved and serve others with us.'),
      isActive: true,
      imageUrl: churchImages[2].primary,
      fallbackImage: churchImages[2].fallback,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const getExcerpt = (item, maxLength = 100) => {
    const text = item.description || item.body || '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ pt: 0, pb: 2, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={2}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '80px',
                height: '4px',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
              },
            }}
          >
            Latest News
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            maxWidth="700px"
            mx="auto"
          >
            Stay updated with our latest church activities, events, and opportunities for spiritual growth and community service.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {news.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" color="textSecondary">
                No news available at the moment. Please check back later.
              </Typography>
            </Grid>
          ) : (
            news.map((item) => (
              <Grid item key={item.key} xs={12} sm={6} md={4}>
                <NewsCard>
                  {item.imageUrl && (
                    <CardMedia
                      component="img"
                      height="300"
                      image={item.imageUrl}
                      alt={item.title}
                      sx={{
                        objectPosition: 'center 20%'
                      }}
                      onError={(e) => {
                        // Fallback to backup image if primary image fails to load
                        if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                          e.target.src = item.fallbackImage;
                        }
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{
                        display: 'block',
                        mb: 1,
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {formatDate(item.createdAt)}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        mb: 2,
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {getExcerpt(item)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={`/news/${item.key}`}
                      endIcon={<ArrowForwardIcon />}
                      size="small"
                      sx={{
                        mt: 'auto',
                        alignSelf: 'flex-start',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </NewsCard>
              </Grid>
            ))
          )}
        </Grid>

        {news.length > 0 && (
          <Box textAlign="center" mt={6}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/news"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: '#fff',
                },
              }}
            >
              View All News
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewsSection;
