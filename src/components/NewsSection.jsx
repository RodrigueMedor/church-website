import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS } from '../graphql/queries';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NewsSection = () => {
  const { data, loading, error } = useQuery(GET_NEWS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div>Loading news...</div>;
  if (error) {
    console.error('Error fetching news:', error);
    return <div>Error loading news. Please try again later.</div>;
  }

  const news = data?.contentsByType?.filter(item => item.isActive) || [];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Latest News
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center" paragraph>
          Stay updated with our latest news and announcements
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {news.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" color="textSecondary">
                No news available at the moment. Please check back later.
              </Typography>
            </Grid>
          ) : (
            news.map((item) => (
              <Grid item key={item.key} xs={12} md={6} lg={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {item.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.imageUrl}
                      alt={item.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {item.description || item.body?.substring(0, 150) + '...'}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0, textAlign: 'right' }}>
                    <Link to={`/news/${item.key}`} style={{ textDecoration: 'none' }}>
                      <Typography color="primary" variant="button">
                        Read More
                      </Typography>
                    </Link>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        
        {news.length > 0 && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Link to="/news" style={{ textDecoration: 'none' }}>
              <Typography color="primary" variant="button">
                View All News
              </Typography>
            </Link>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewsSection;
