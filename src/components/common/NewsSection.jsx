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
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Static news data
  const [news] = useState([
    {
      id: '1',
      title: 'Welcome to Our New Website',
      description: 'We are excited to launch our new church website with updated information and resources.',
      body: 'Our new website features a fresh design, easy navigation, and all the latest information about our church community, events, and ministries. Stay connected with us online!',
      isActive: true,
      imageUrl: '/images/church-event.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Upcoming Community Service',
      description: 'Join us for our annual community service event this weekend.',
      body: 'We invite everyone to participate in our annual community service day. Together we can make a difference in our neighborhood.',
      isActive: true,
      imageUrl: '/images/church-event.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Sunday Worship Services',
      description: 'Join us every Sunday for worship and fellowship.',
      body: 'Our Sunday services are a time of worship, prayer, and teaching from God\'s Word. We have services at 9:00 AM and 11:00 AM.',
      isActive: true,
      imageUrl: '/images/church-event.jpg',
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
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
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
            Stay updated with the latest news and announcements from our church community.
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
                      height="200"
                      image={item.imageUrl}
                      alt={item.title}
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
