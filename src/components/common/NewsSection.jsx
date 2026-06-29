import React, { useState } from 'react';
import { Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  alpha
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const NewsSection = () => {
  const { t } = useTranslation();

  const churchImages = [
    { primary: '/images/easter/worship-team.jpg', fallback: '/images/banner/pastor-sermon_1.JPG' },
    { primary: '/images/easter/pastor-bible-study.jpg', fallback: '/images/church-event.jpg' },
    { primary: '/images/easter/bridge-photo.jpg', fallback: '/images/contact-image.jpg' }
  ];

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
    <Box>
      <Box textAlign="center" mb={4}>
        <Typography
          component="span"
          sx={{
            color: 'secondary.main',
            fontWeight: 700,
            letterSpacing: '4px',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            mb: 1.5,
            display: 'block'
          }}
        >
          {t('home.latestNews')}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: 'primary.dark',
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #1a365d, #c9a84c)',
              borderRadius: '2px'
            }
          }}
        >
          {t('home.latestNews')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: '700px',
            mx: 'auto',
            mt: 3,
            fontSize: '1.05rem',
            lineHeight: 1.8
          }}
        >
          Stay updated with our latest church activities, events, and opportunities for spiritual growth and community service.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {news.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
              No news available at the moment. Please check back later.
            </Typography>
          </Grid>
        ) : (
          news.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
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
                    '& .news-image': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                {item.imageUrl && (
                  <Box sx={{
                    position: 'relative',
                    height: '220px',
                    overflow: 'hidden',
                  }}>
                    <CardMedia
                      className="news-image"
                      component="img"
                      height="220"
                      image={item.imageUrl}
                      alt={item.title}
                      sx={{
                        objectPosition: 'center 20%',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onError={(e) => {
                        if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                          e.target.src = item.fallbackImage;
                        }
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 26, 48, 0.6) 0%, rgba(10, 26, 48, 0.05) 60%)',
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      bgcolor: alpha('#1a365d', 0.85),
                      color: '#fff',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      backdropFilter: 'blur(4px)',
                    }}>
                      {formatDate(item.createdAt)}
                    </Box>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'primary.dark',
                      lineHeight: 1.3,
                      mb: 1.5,
                      fontFamily: '"Playfair Display", serif',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'primary.light',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      flexGrow: 1,
                    }}
                  >
                    {getExcerpt(item)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default NewsSection;
