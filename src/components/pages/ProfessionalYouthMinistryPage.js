import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, Button, Paper, Avatar, useTheme, alpha,
  Fade, Slide, Chip, Divider, Stack, IconButton
} from '@mui/material';
import { 
  Groups, Church, CalendarToday, AccessTime, LocationOn, Person, Star, Favorite,
  Lightbulb, ArrowForward, Email, Phone, Event, EscalatorWarning
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled, keyframes } from '@mui/material/styles';

const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh',
  background: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'url(/images/banner/youth-banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    opacity: 0.2,
    zIndex: 1,
  },
}));

const ActivityCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(33, 150, 243, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(33, 150, 243, 0.25)',
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 70, height: 70, borderRadius: '50%',
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  margin: '0 auto 20px',
  boxShadow: `0 8px 20px -5px ${alpha(color, 0.3)}`,
}));

const ProfessionalYouthMinistryPage = () => {
  const { t } = useTranslation();
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

  const activities = [
    {
      icon: <Church color="primary" sx={{ fontSize: 32 }} />,
      title: 'Bible Discussions',
      description: 'Deep dive into Scripture with relevant topics that matter to teens today.',
      features: ['Interactive Discussions', 'Real Topics', 'Life Applications']
    },
    {
      icon: <Groups color="primary" sx={{ fontSize: 32 }} />,
      title: 'Fellowship & Fun',
      description: 'Build lasting friendships through games, activities, and authentic community.',
      features: ['Team Building', 'Social Events', 'Friendship Circles']
    },
    {
      icon: <Star color="primary" sx={{ fontSize: 32 }} />,
      title: 'Worship Night',
      description: 'Passionate worship experiences designed for and led by youth.',
      features: ['Live Worship', 'Youth Band', 'Creative Arts']
    },
    {
      icon: <Favorite color="primary" sx={{ fontSize: 32 }} />,
      title: 'Community Service',
      description: 'Make a difference through service projects that impact our community.',
      features: ['Local Outreach', 'Mission Trips', 'Service Hours']
    }
  ];

  const schedule = [
    {
      day: 'Saturday',
      time: '5:00 PM',
      activity: 'Youth Service & Fellowship',
      description: 'Weekly gathering with worship, message, games, and dinner',
      color: '#2196F3'
    },
    {
      day: 'Sunday',
      time: '11:30 AM',
      activity: 'Sunday School Class',
      description: 'Age-specific Bible study and discussion for teens',
      color: '#1565C0'
    }
  ];

  const leaders = [
    {
      name: 'Brother Vlad',
      role: 'Youth Pastor',
      description: 'Passionate about helping teens discover their identity in Christ and develop leadership skills.',
      avatar: 'BV',
      experience: '10 years',
      email: 'vlad@church.org'
    },
    {
      name: 'Brother Wisly',
      role: 'Youth Leader',
      description: 'Dedicated to mentoring teens and creating engaging environments for spiritual growth.',
      avatar: 'BW',
      experience: '6 years',
      email: 'wisly@church.org'
    }
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
                Youth Ministry
              </Typography>
              <Typography variant="h4" sx={{
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                mb: 4, opacity: 0.95, maxWidth: '800px', mx: 'auto',
              }}>
                "Don\'t let anyone look down on you because you are young, 
                but set an example for the believers in speech, conduct, love, faith and purity."
              </Typography>
              <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.85, mb: 6 }}>
                1 Timothy 4:12
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
                fontWeight: 700, mb: 3, color: '#1565C0',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                Welcome to Youth Ministry
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{
                maxWidth: '800px', mx: 'auto', lineHeight: 1.7, mb: 4,
              }}>
                We're a community where teens can be themselves, ask tough questions, 
                and discover the amazing plans God has for their lives.
              </Typography>
            </Box>
          </Slide>
        </Box>

        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Typography variant="h3" component="h2" sx={{
                fontWeight: 700, mb: 5, textAlign: 'center', color: '#1565C0',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                What We Do
              </Typography>
              <Grid container spacing={4}>
                {activities.map((activity, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ActivityCard index={index} elevation={6}>
                      <CardContent sx={{ p: 4 }}>
                        <IconWrapper color="#2196F3">
                          {activity.icon}
                        </IconWrapper>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#1565C0' }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, textAlign: 'center' }}>
                          {activity.description}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center">
                            {activity.features.map((feature, idx) => (
                              <Chip key={idx} label={feature} size="small" sx={{
                                backgroundColor: alpha('#2196F3', 0.1), color: '#1565C0', fontWeight: 500,
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
                fontWeight: 700, mb: 5, textAlign: 'center', color: '#1565C0',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                When We Meet
              </Typography>
              <Grid container spacing={4}>
                {schedule.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={4} sx={{
                      p: 3, background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                      border: '1px solid rgba(33, 150, 243, 0.1)', borderRadius: 16,
                      '&:hover': { transform: 'translateY(-4px)' }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <CalendarToday sx={{ mr: 2, color: '#2196F3', fontSize: 28 }} />
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1565C0' }}>
                          {item.day}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTime sx={{ mr: 2, color: '#2196F3' }} />
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
                fontWeight: 700, mb: 5, textAlign: 'center', color: '#1565C0',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                Our Leaders
              </Typography>
              <Grid container spacing={4}>
                {leaders.map((leader, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card elevation={6} sx={{
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(33, 150, 243, 0.1)', borderRadius: 16,
                      '&:hover': { transform: 'translateY(-6px)' }
                    }}>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Avatar sx={{ 
                          width: 100, height: 100, mx: 'auto', mb: 3,
                          background: 'linear-gradient(135deg, #2196F3, #1565C0)',
                          fontSize: '2.5rem', fontWeight: 700, color: 'white',
                        }}>
                          {leader.avatar}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#1565C0' }}>
                          {leader.name}
                        </Typography>
                        <Typography variant="body2" color="#2196F3" sx={{ mb: 2, fontWeight: 600 }}>
                          {leader.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                          {leader.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                          <Chip label={leader.email} size="small" sx={{
                            backgroundColor: alpha('#2196F3', 0.1), color: '#1565C0', fontWeight: 500,
                          }} />
                          <Chip label={`${leader.experience} experience`} size="small" sx={{
                            backgroundColor: alpha('#2196F3', 0.1), color: '#1565C0', fontWeight: 500,
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
          py: 8, background: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)', borderRadius: 4,
        }}>
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(4)} timeout={1400}>
              <Box textAlign="center" color="white">
                <Typography variant="h4" component="h2" sx={{
                  fontWeight: 700, mb: 3, fontSize: { xs: '1.8rem', md: '2.2rem' },
                }}>
                  Join Our Youth Community!
                </Typography>
                <Typography variant="h6" sx={{
                  mb: 6, maxWidth: '600px', mx: 'auto', lineHeight: 1.6, opacity: 0.95,
                }}>
                  Come be part of something amazing! Make friends, grow in faith, and discover your purpose.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                  <Button variant="outlined" size="large" sx={{
                    px: 4, py: 2, borderColor: 'white', color: 'white',
                    '&:hover': { backgroundColor: 'white', color: '#1565C0' },
                  }}>
                    Learn More
                  </Button>
                  <Button variant="contained" size="large" endIcon={<ArrowForward />} sx={{
                    px: 4, py: 2, background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                    color: '#1565C0', fontWeight: 700,
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}>
                    Join Youth Group
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

export default ProfessionalYouthMinistryPage;
