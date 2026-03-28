import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, Button, Paper, Avatar, useTheme, alpha,
  Fade, Slide, Chip, Divider, Stack, IconButton
} from '@mui/material';
import { 
  Groups, Church, CalendarToday, AccessTime, LocationOn, Person, Star, Favorite,
  Lightbulb, ArrowForward, Email, Phone, Event, FamilyRestroom, Home
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled, keyframes } from '@mui/material/styles';

const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh',
  background: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'url(/images/banner/ycm-banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    opacity: 0.2,
    zIndex: 1,
  },
}));

const ActivityCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(244, 67, 54, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(244, 67, 54, 0.25)',
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 70, height: 70, borderRadius: '50%',
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  margin: '0 auto 20px',
  boxShadow: `0 8px 20px -5px ${alpha(color, 0.3)}`,
}));

const ProfessionalYoungCouplesMinistryPage = () => {
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
      title: 'Bible Studies',
      description: 'Explore God\'s design for marriage and relationships through relevant biblical teaching.',
      features: ['Marriage Principles', 'Biblical Teaching', 'Group Discussion']
    },
    {
      icon: <Favorite color="primary" sx={{ fontSize: 32 }} />,
      title: 'Date Nights',
      description: 'Romantic evenings designed to strengthen your connection and create lasting memories.',
      features: ['Themed Events', 'Romantic Dinners', 'Quality Time']
    },
    {
      icon: <FamilyRestroom color="primary" sx={{ fontSize: 32 }} />,
      title: 'Parenting Support',
      description: 'Navigate the journey of parenthood with guidance from experienced couples and biblical wisdom.',
      features: ['Parenting Classes', 'Family Activities', 'Childcare Support']
    },
    {
      icon: <Home color="primary" sx={{ fontSize: 32 }} />,
      title: 'Home Building',
      description: 'Practical workshops on creating a Christ-centered home that honors God.',
      features: ['Financial Planning', 'Home Management', 'Spiritual Leadership']
    }
  ];

  const schedule = [
    {
      day: 'Friday',
      time: '7:30 PM',
      activity: 'Couples Fellowship',
      description: 'Weekly gathering for Bible study, discussion, and fellowship',
      color: '#F44336'
    },
    {
      day: 'Saturday',
      time: '6:00 PM',
      activity: 'Date Night Events',
      description: 'Monthly themed date nights and special couples events',
      color: '#D32F2F'
    }
  ];

  const leaders = [
    {
      name: 'Brother & Sister Jean',
      role: 'Young Couples Leaders',
      description: 'Passionate about helping couples build strong, Christ-centered marriages that last a lifetime.',
      avatar: 'JJ',
      experience: '8 years',
      email: 'jean@church.org'
    },
    {
      name: 'Brother & Sister Marie',
      role: 'Marriage Mentors',
      description: 'Dedicated to walking alongside couples through the joys and challenges of married life.',
      avatar: 'JM',
      experience: '12 years',
      email: 'marie@church.org'
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
                Young Couples Ministry
              </Typography>
              <Typography variant="h4" sx={{
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                mb: 4, opacity: 0.95, maxWidth: '800px', mx: 'auto',
              }}>
                "Though one may be overpowered, two can defend themselves. 
                A cord of three strands is not quickly broken."
              </Typography>
              <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.85, mb: 6 }}>
                Ecclesiastes 4:12
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
                fontWeight: 700, mb: 3, color: '#D32F2F',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                Welcome to Young Couples Ministry
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{
                maxWidth: '800px', mx: 'auto', lineHeight: 1.7, mb: 4,
              }}>
                We're building strong marriages and Christ-centered relationships through fellowship, 
                Bible study, and shared experiences. Join us as we grow together in love and faith.
              </Typography>
            </Box>
          </Slide>
        </Box>

        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Typography variant="h3" component="h2" sx={{
                fontWeight: 700, mb: 5, textAlign: 'center', color: '#D32F2F',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                What We Do
              </Typography>
              <Grid container spacing={4}>
                {activities.map((activity, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ActivityCard index={index} elevation={6}>
                      <CardContent sx={{ p: 4 }}>
                        <IconWrapper color="#F44336">
                          {activity.icon}
                        </IconWrapper>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#D32F2F' }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, textAlign: 'center' }}>
                          {activity.description}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center">
                            {activity.features.map((feature, idx) => (
                              <Chip key={idx} label={feature} size="small" sx={{
                                backgroundColor: alpha('#F44336', 0.1), color: '#D32F2F', fontWeight: 500,
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
                fontWeight: 700, mb: 5, textAlign: 'center', color: '#D32F2F',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                When We Meet
              </Typography>
              <Grid container spacing={4}>
                {schedule.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={4} sx={{
                      p: 3, background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                      border: '1px solid rgba(244, 67, 54, 0.1)', borderRadius: 16,
                      '&:hover': { transform: 'translateY(-4px)' }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <CalendarToday sx={{ mr: 2, color: '#F44336', fontSize: 28 }} />
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#D32F2F' }}>
                          {item.day}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTime sx={{ mr: 2, color: '#F44336' }} />
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
                fontWeight: 700, mb: 5, textAlign: 'center', color: '#D32F2F',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}>
                Our Leaders
              </Typography>
              <Grid container spacing={4}>
                {leaders.map((leader, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card elevation={6} sx={{
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(244, 67, 54, 0.1)', borderRadius: 16,
                      '&:hover': { transform: 'translateY(-6px)' }
                    }}>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Avatar sx={{ 
                          width: 100, height: 100, mx: 'auto', mb: 3,
                          background: 'linear-gradient(135deg, #F44336, #D32F2F)',
                          fontSize: '2.5rem', fontWeight: 700, color: 'white',
                        }}>
                          {leader.avatar}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#D32F2F' }}>
                          {leader.name}
                        </Typography>
                        <Typography variant="body2" color="#F44336" sx={{ mb: 2, fontWeight: 600 }}>
                          {leader.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                          {leader.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                          <Chip label={leader.email} size="small" sx={{
                            backgroundColor: alpha('#F44336', 0.1), color: '#D32F2F', fontWeight: 500,
                          }} />
                          <Chip label={`${leader.experience} experience`} size="small" sx={{
                            backgroundColor: alpha('#F44336', 0.1), color: '#D32F2F', fontWeight: 500,
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
          py: 8, background: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)', borderRadius: 4,
        }}>
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(4)} timeout={1400}>
              <Box textAlign="center" color="white">
                <Typography variant="h4" component="h2" sx={{
                  fontWeight: 700, mb: 3, fontSize: { xs: '1.8rem', md: '2.2rem' },
                }}>
                  Join Our Couples Community!
                </Typography>
                <Typography variant="h6" sx={{
                  mb: 6, maxWidth: '600px', mx: 'auto', lineHeight: 1.6, opacity: 0.95,
                }}>
                  Build a stronger marriage and connect with other couples who share your values and faith.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                  <Button variant="outlined" size="large" sx={{
                    px: 4, py: 2, borderColor: 'white', color: 'white',
                    '&:hover': { backgroundColor: 'white', color: '#D32F2F' },
                  }}>
                    Learn More
                  </Button>
                  <Button variant="contained" size="large" endIcon={<ArrowForward />} sx={{
                    px: 4, py: 2, background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                    color: '#D32F2F', fontWeight: 700,
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}>
                    Join Couples Group
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

export default ProfessionalYoungCouplesMinistryPage;
