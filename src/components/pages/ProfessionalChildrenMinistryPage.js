import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Avatar,
  useTheme,
  alpha,
  Fade,
  Slide,
  Zoom,
  Chip,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton
} from '@mui/material';
import { 
  Groups, 
  Church, 
  CalendarToday, 
  AccessTime,
  LocationOn,
  Person,
  Star,
  Favorite,
  Lightbulb,
  Book,
  People,
  VolunteerActivism,
  ChildCare,
  School,
  EmojiEvents,
  ArrowForward,
  ExpandMore,
  Email,
  Phone,
  Event
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../../cms';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url(/images/banner/children-banner.JPG)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    opacity: 0.2,
    zIndex: 1,
  },
}));

const ActivityCard = styled(Card)(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(76, 175, 80, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1a365d, #2c5282)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px -12px rgba(76, 175, 80, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .activity-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  transition: 'all 0.3s ease',
  boxShadow: `0 8px 20px -5px ${alpha(color, 0.3)}`,
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 12px 30px -5px ${alpha(color, 0.4)}`,
  },
}));

const ScheduleCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
  border: '1px solid rgba(76, 175, 80, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(76, 175, 80, 0.15)',
  },
}));

const LeaderCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(76, 175, 80, 0.1)',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 15px 35px rgba(76, 175, 80, 0.2)',
  },
}));

const ProfessionalChildrenMinistryPage = () => {
  const { t } = useTranslation();
  const content = usePageContent('children');
  const theme = useTheme();
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleSections((prev) => new Set(prev).add(index));
              }, index * 200);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const defaultActivities = [
    {
      icon: <School color="primary" sx={{ fontSize: 32 }} />,
      title: 'Sunday School',
      description: 'Age-appropriate Bible lessons with interactive activities and crafts that make learning about God fun and memorable.',
      features: ['Bible Stories', 'Interactive Learning', 'Creative Crafts', 'Memory Verses']
    },
    {
      icon: <ChildCare color="primary" sx={{ fontSize: 32 }} />,
      title: 'Nursery Care',
      description: 'Safe and loving environment for infants and toddlers during services, allowing parents to worship peacefully.',
      features: ['Safe Environment', 'Trained Staff', 'Age-appropriate Toys', 'Parent Notifications']
    },
    {
      icon: <EmojiEvents color="primary" sx={{ fontSize: 32 }} />,
      title: 'VBS & Events',
      description: 'Exciting vacation Bible school and special events throughout the year with games, music, and learning.',
      features: ['Summer VBS', 'Holiday Events', 'Family Activities', 'Community Outreach']
    },
    {
      icon: <Book color="primary" sx={{ fontSize: 32 }} />,
      title: 'Bible Club',
      description: 'Weekly club where kids dive deeper into God\'s Word through stories, activities, and friendship.',
      features: ['Weekly Meetings', 'Bible Reading', 'Group Activities', 'Character Building']
    }
  ];

  const activities = content.activities?.length
    ? content.activities.map((item, i) => ({ ...(defaultActivities[i] || defaultActivities[0]), ...item }))
    : defaultActivities;

  const schedule = content.schedule?.length ? content.schedule : [
    {
      day: 'Sunday',
      time: '9:30 AM',
      activity: 'Sunday School & Nursery',
      description: 'Age-appropriate classes for all children during main service',
      color: '#1a365d'
    },
    {
      day: 'Wednesday',
      time: '7:00 PM',
      activity: 'Bible Club & Activities',
      description: 'Mid-week program with Bible study, games, and fellowship',
      color: '#2c5282'
    }
  ];

  const leaders = content.leaders?.length ? content.leaders : [
    {
      name: 'Sarah Johnson',
      role: 'Children\'s Ministry Director',
      description: 'Passionate about creating a safe, fun environment where children can discover God\'s love and build lasting faith foundations.',
      avatar: 'SJ',
      experience: '8 years',
      email: 'sarah@church.org'
    },
    {
      name: 'Michael Chen', 
      role: 'Elementary Coordinator',
      description: 'Dedicated to making Bible stories come alive through creative teaching and engaging activities that kids love.',
      avatar: 'MC',
      experience: '5 years',
      email: 'michael@church.org'
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <HeroBanner>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Fade in timeout={1000}>
            <Box textAlign="center" color="white">
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                {content.hero?.title || "Children's Ministry"}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  mb: 4,
                  opacity: 0.95,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                {content.hero?.subtitle || `"Train up a child in the way he should go; even when he is old he will not depart from it."`}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: 'italic',
                  opacity: 0.85,
                  mb: 4,
                }}
              >
                Proverbs 22:6
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      45+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Children Enrolled
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      12
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Dedicated Teachers
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      4-12
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Age Range
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      100%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
                      Safe & Fun
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </HeroBanner>

      {/* Welcome Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8} ref={(el) => (sectionRefs.current[0] = el)}>
          <Slide direction="up" in={visibleSections.has(0)} timeout={600}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#2c5282',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Welcome to Our Children's Ministry
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.7, mb: 4 }}
              >
                We believe every child is precious in God's sight and deserves to experience His love in a safe, 
                fun, and nurturing environment. Our dedicated team creates engaging experiences that help children 
                build strong spiritual foundations while having the time of their lives.
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#1a365d',
                  mb: 2,
                }}
              >
                Every Child is Welcome Here!
              </Typography>
            </Box>
          </Slide>
        </Box>

        {/* Activities Grid */}
        <Box mb={10} ref={(el) => (sectionRefs.current[1] = el)}>
          <Slide direction="up" in={visibleSections.has(1)} timeout={800}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  color: '#2c5282',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                What We Do
              </Typography>
              <Grid container spacing={3}>
                {activities.map((activity, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ActivityCard index={index} elevation={6}>
                      <CardContent sx={{ p: 4 }}>
                        <IconWrapper color="#1a365d" className="activity-icon">
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
                              <Chip
                                key={idx}
                                label={feature}
                                size="small"
                                sx={{
                                  backgroundColor: alpha('#1a365d', 0.1),
                                  color: '#2c5282',
                                  fontWeight: 500,
                                  fontSize: '0.75rem',
                                }}
                              />
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

        {/* Schedule Section */}
        <Box mb={10} ref={(el) => (sectionRefs.current[2] = el)}>
          <Slide direction="up" in={visibleSections.has(2)} timeout={1000}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  color: '#2c5282',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                When We Meet
              </Typography>
              <Grid container spacing={3}>
                {schedule.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ScheduleCard elevation={4}>
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
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </ScheduleCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Leaders Section */}
        <Box mb={10} ref={(el) => (sectionRefs.current[3] = el)}>
          <Slide direction="up" in={visibleSections.has(3)} timeout={1200}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  color: '#2c5282',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Our Dedicated Leaders
              </Typography>
              <Grid container spacing={3}>
                {leaders.map((leader, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <LeaderCard elevation={6}>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 100, 
                            height: 100, 
                            mx: 'auto', 
                            mb: 3,
                            background: 'linear-gradient(135deg, #1a365d, #2c5282)',
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: 'white',
                            boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
                          }}
                        >
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
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                          <Chip 
                            icon={<Email sx={{ fontSize: 16 }} />}
                            label={leader.email}
                            size="small"
                            sx={{
                              backgroundColor: alpha('#1a365d', 0.1),
                              color: '#2c5282',
                              fontWeight: 500,
                            }}
                          />
                          <Chip 
                            label={`${leader.experience} experience`}
                            size="small"
                            sx={{
                              backgroundColor: alpha('#1a365d', 0.1),
                              color: '#2c5282',
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                      </CardContent>
                    </LeaderCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Box>

        {/* Call to Action */}
        <Box
          ref={(el) => (sectionRefs.current[4] = el)}
          sx={{
            py: 5,
            background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url(/images/banner/children-banner.JPG)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Slide direction="up" in={visibleSections.has(4)} timeout={1400}>
              <Box textAlign="center" color="white">
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  Ready to Join Our Family?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  We'd love to have your children join our growing family! 
                  Sign up today and watch them grow in faith while making new friends.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 2,
                      borderColor: 'white',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#2c5282',
                        borderColor: 'white',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
                      color: '#2c5282',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                      },
                    }}
                  >
                    Register Your Child
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

export default ProfessionalChildrenMinistryPage;
