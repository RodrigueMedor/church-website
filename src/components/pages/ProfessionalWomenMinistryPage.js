import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, Button, Paper, Avatar, useTheme, alpha,
  Fade, Slide, Chip, Divider, Stack, IconButton
} from '@mui/material';
import { 
  Groups, Church, CalendarToday, AccessTime, LocationOn, Person, Star, Favorite,
  Lightbulb, ArrowForward, Email, Phone, Event, VolunteerActivism
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled, keyframes } from '@mui/material/styles';
import { usePageContent } from '../../cms';

const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh',
  background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'url(/images/banner/women-banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    opacity: 0.2,
    zIndex: 1,
  },
}));

const ActivityCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(156, 39, 176, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(156, 39, 176, 0.25)',
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 70, height: 70, borderRadius: '50%',
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  margin: '0 auto 20px',
  boxShadow: `0 8px 20px -5px ${alpha(color, 0.3)}`,
}));

const ProfessionalWomenMinistryPage = () => {
  const { t } = useTranslation();
  const content = usePageContent('women');
  const theme = useTheme();
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

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

  const activityIcons = [
    <Church color="primary" sx={{ fontSize: 32 }} />,
    <Favorite color="primary" sx={{ fontSize: 32 }} />,
    <VolunteerActivism color="primary" sx={{ fontSize: 32 }} />,
    <Star color="primary" sx={{ fontSize: 32 }} />
  ];

  const fallbackActivities = [
    {
      title: 'Bible Study',
      description: 'Deep dive into God\'s Word with discussions relevant to women\'s lives and spiritual journeys.',
      features: ['Bible Discussion', 'Life Applications', 'Prayer Circles']
    },
    {
      title: 'Fellowship Events',
      description: 'Build authentic friendships through gatherings designed for connection and support.',
      features: ['Tea Time', 'Social Events', 'Support Groups']
    },
    {
      title: 'Outreach Ministry',
      description: 'Serve together in love through projects that impact our community and beyond.',
      features: ['Community Service', 'Mission Projects', 'Care Ministries']
    },
    {
      title: 'Spiritual Growth',
      description: 'Grow deeper in faith through retreats, workshops, and discipleship opportunities.',
      features: ['Retreats', 'Workshops', 'Mentoring']
    }
  ];

  const activities = (content.activities && content.activities.length > 0
    ? content.activities
    : fallbackActivities
  ).map((item, i) => ({
    icon: activityIcons[i % activityIcons.length],
    ...item,
    features: item.features || []
  }));

  const schedule = content.schedule && content.schedule.length > 0
    ? content.schedule
    : [
        { day: 'Tuesday', time: '7:00 PM', activity: 'Women\'s Bible Study', description: 'Weekly gathering for Bible study, prayer, and fellowship', color: '#1a365d' },
        { day: 'Saturday', time: '10:00 AM', activity: 'Women\'s Fellowship', description: 'Monthly brunch, service projects, or special events', color: '#2c5282' }
      ];

  const leaders = content.leaders && content.leaders.length > 0
    ? content.leaders
    : [
        { name: 'Sister Marie', role: 'Women\'s Ministry Director', description: 'Passionate about empowering women to discover their God-given purpose and grow in spiritual maturity.', avatar: 'SM', experience: '15 years', email: 'marie@church.org' },
        { name: 'Sister Josette', role: 'Fellowship Coordinator', description: 'Dedicated to creating warm, welcoming environments where women can build lasting friendships.', avatar: 'SJ', experience: '10 years', email: 'josette@church.org' }
      ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa' }}>
      <HeroBanner>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Fade in timeout={1000}>
            <Box textAlign="center" color="white">
              <Typography variant="h1" component="h1" sx={{
                fontSize: { xs: '3rem', md: '4rem' },
                fontWeight: 800, mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}>
                {content.hero?.title || "Women's Ministry"}
              </Typography>
              <Typography variant="h4" sx={{
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                mb: 4, opacity: 0.95, maxWidth: '800px', mx: 'auto',
              }}>
                {content.hero?.subtitle || "\"She is clothed with strength and dignity; she can laugh at the days to come.\""}
              </Typography>
              <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.85, mb: 6 }}>
                Proverbs 31:25
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroBanner>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8} ref={(el) => (sectionRefs.current[0] = el)}>
          <Slide direction="up" in={visibleSections.has(0)} timeout={600}>
            <Box>
              <Typography variant="h3" component="h2" sx={{
                fontWeight: 700, mb: 3, color: '#2c5282',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                Welcome to Women's Ministry
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{
                maxWidth: '800px', mx: 'auto', lineHeight: 1.7, mb: 4,
              }}>
                We're a community of women supporting each other in faith, growing together in God's love, 
                and making a difference in our world. Join us as we discover the amazing plans God has for our lives.
              </Typography>
            </Box>
          </Slide>
        </Box>

        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Typography variant="h3" component="h2" sx={{
                fontWeight: 700, mb: 3, textAlign: 'center', color: '#2c5282',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                What We Do
              </Typography>
              <Grid container spacing={3}>
                {activities.map((activity, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ActivityCard index={index} elevation={6}>
                      <CardContent sx={{ p: 4 }}>
                        <IconWrapper color="#1a365d">
                          {activity.icon}
                        </IconWrapper>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#2c5282' }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, textAlign: 'center' }}>
                          {activity.description}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center">
                            {activity.features.map((feature, idx) => (
                              <Chip key={idx} label={feature} size="small" sx={{
                                backgroundColor: alpha('#1a365d', 0.1), color: '#2c5282', fontWeight: 500,
                              }} />
                            ))}
                          </Stack>
                        </Box>
                      </CardContent>
                    </ActivityCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        <Box mb={10} ref={(el) => (sectionRefs.current[2] = el)}>
          <Slide direction="up" in={visibleSections.has(2)} timeout={1000}>
            <Box>
              <Typography variant="h3" component="h2" sx={{
                fontWeight: 700, mb: 3, textAlign: 'center', color: '#2c5282',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                When We Meet
              </Typography>
              <Grid container spacing={3}>
                {schedule.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={4} sx={{
                      p: 3, background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                      border: '1px solid rgba(156, 39, 176, 0.1)', borderRadius: 16,
                      '&:hover': { transform: 'translateY(-4px)' }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <CalendarToday sx={{ mr: 2, color: '#1a365d', fontSize: 28 }} />
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c5282' }}>
                          {item.day}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTime sx={{ mr: 2, color: '#1a365d' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.time}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: item.color }}>
                        {item.activity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        <Box mb={10} ref={(el) => (sectionRefs.current[3] = el)}>
          <Slide direction="up" in={visibleSections.has(3)} timeout={1200}>
            <Box>
              <Typography variant="h3" component="h2" sx={{
                fontWeight: 700, mb: 3, textAlign: 'center', color: '#2c5282',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                Our Leaders
              </Typography>
              <Grid container spacing={3}>
                {leaders.map((leader, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card elevation={6} sx={{
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(156, 39, 176, 0.1)', borderRadius: 16,
                      '&:hover': { transform: 'translateY(-6px)' }
                    }}>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Avatar sx={{ 
                          width: 100, height: 100, mx: 'auto', mb: 3,
                          background: 'linear-gradient(135deg, #1a365d, #2c5282)',
                          fontSize: '2.5rem', fontWeight: 700, color: 'white',
                        }}>
                          {leader.avatar}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#2c5282' }}>
                          {leader.name}
                        </Typography>
                        <Typography variant="body2" color="#1a365d" sx={{ mb: 2, fontWeight: 600 }}>
                          {leader.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                          {leader.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                          <Chip label={leader.email} size="small" sx={{
                            backgroundColor: alpha('#1a365d', 0.1), color: '#2c5282', fontWeight: 500,
                          }} />
                          <Chip label={`${leader.experience} experience`} size="small" sx={{
                            backgroundColor: alpha('#1a365d', 0.1), color: '#2c5282', fontWeight: 500,
                          }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        <Box ref={(el) => (sectionRefs.current[4] = el)} sx={{
          py: 5, background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)', borderRadius: 4,
        }}>
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(4)} timeout={1400}>
              <Box textAlign="center" color="white">
                <Typography variant="h4" component="h2" sx={{
                  fontWeight: 700, mb: 3, fontSize: { xs: '1.8rem', md: '2.2rem' },
                }}>
                  Join Our Sisterhood!
                </Typography>
                <Typography variant="h6" sx={{
                  mb: 4, maxWidth: '600px', mx: 'auto', lineHeight: 1.6, opacity: 0.95,
                }}>
                  Be part of a loving community where women grow together in faith, friendship, and purpose.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                  <Button variant="outlined" size="large" sx={{
                    px: 4, py: 2, borderColor: 'white', color: 'white',
                    '&:hover': { backgroundColor: 'white', color: '#2c5282' },
                  }}>
                    Learn More
                  </Button>
                  <Button variant="contained" size="large" endIcon={<ArrowForward />} sx={{
                    px: 4, py: 2, background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                    color: '#2c5282', fontWeight: 700,
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}>
                    Join Women's Group
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfessionalWomenMinistryPage;
