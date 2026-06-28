import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack
} from '@mui/material';
import {
  School as SchoolIcon,
  Groups as GroupIcon,
  SportsSoccer as SportsIcon,
  MenuBook as BibleIcon,
  VolunteerActivism as VolunteerIcon,
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Handyman as HandymanIcon,
  ChildCare as ChildCareIcon,
  Star as StarIcon,
  Lightbulb as LightbulbIcon,
  Church as ChurchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { styled, keyframes } from '@mui/material/styles';
import { usePageContent } from '../../cms';

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

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #c9a84c 100%)',
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
    background: 'url(/images/banner/pastor-sermon_1.JPG)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.15,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(201, 168, 76, 0.3) 0%, transparent 50%)',
    zIndex: 2,
  },
}));

const MinistryCard = styled(Card, { shouldForwardProp: (prop) => prop !== 'index' })(({ theme, index }) => ({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: 20,
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
    background: 'linear-gradient(90deg, #1a365d, #2c5282, #c9a84c)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .ministry-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
    '& .ministry-overlay': {
      opacity: 1,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  transition: 'all 0.3s ease',
  boxShadow: `0 10px 25px -5px ${alpha(color, 0.3)}`,
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 15px 35px -5px ${alpha(color, 0.4)}`,
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1a365d 0%, #2c5282 100%)',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 16,
  border: `1px solid ${alpha('#c9a84c', 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px -5px rgba(26, 54, 93, 0.4)',
  },
}));

const ministries = [
  {
    id: 1,
    title: "Children's Ministry",
    subtitle: 'Nurturing Young Faith',
    description: 'A safe, engaging environment where children learn about God\'s love through Bible-based teaching, worship, and fun activities designed just for them.',
    icon: <ChildCareIcon sx={{ fontSize: 36, color: 'white' }} />,
    color: '#4CAF50',
    image: '/images/banner/children-banner.JPG',
    meetingTime: 'Sundays at 9:30 AM & Wednesdays at 7:00 PM',
    link: '/children-ministry',
    stats: { members: '45+', ageRange: '4-12 years', activities: 'Weekly' },
    features: ['Bible Stories', 'Fun Activities', 'Safe Environment', 'Dedicated Teachers']
  },
  {
    id: 2,
    title: 'Youth Ministry',
    subtitle: 'Building Future Leaders',
    description: 'A dynamic community for teenagers to grow in their faith, build meaningful relationships, and discover their purpose in Christ.',
    icon: <GroupIcon sx={{ fontSize: 36, color: 'white' }} />,
    color: '#2196F3',
    image: '/images/banner/youth-banner.jpg',
    meetingTime: 'Saturdays at 5:00 PM & Sundays at 11:30 AM',
    link: '/youth-ministry',
    stats: { members: '60+', ageRange: '13-18 years', activities: 'Bi-weekly' },
    features: ['Bible Studies', 'Fellowship', 'Community Service', 'Leadership Training']
  },
  {
    id: 3,
    title: "Men's Ministry",
    subtitle: 'Strong Men of Faith',
    description: 'Building strong men of faith through fellowship, Bible study, service opportunities, and recreational activities.',
    icon: <HandymanIcon sx={{ fontSize: 36, color: 'white' }} />,
    color: '#FF9800',
    image: '/images/banner/men-banner.JPG',
    meetingTime: 'Wednesdays at 7:00 PM & Saturdays at 10:00 AM',
    link: '/men-ministry',
    stats: { members: '30+', ageRange: '18+', activities: 'Weekly' },
    features: ['Bible Study', 'Service Projects', 'Fellowship', 'Mentorship']
  },
  {
    id: 4,
    title: "Women's Ministry",
    subtitle: 'Sisters in Christ',
    description: 'A supportive community for women to grow in faith, build lasting friendships, and serve together in Christ\'s love.',
    icon: <FavoriteIcon sx={{ fontSize: 36, color: 'white' }} />,
    color: '#9C27B0',
    image: '/images/banner/women-banner.jpg',
    meetingTime: 'Tuesdays at 7:00 PM & Saturdays at 10:00 AM',
    link: '/women-ministry',
    stats: { members: '50+', ageRange: '18+', activities: 'Weekly' },
    features: ['Prayer Groups', 'Bible Studies', 'Fellowship', 'Outreach']
  },
  {
    id: 5,
    title: 'Young Couples Ministry',
    subtitle: 'Strengthening Marriages',
    description: 'Strengthening marriages and building Christ-centered relationships through fellowship, Bible study, and shared experiences.',
    icon: <FamilyRestroomIcon sx={{ fontSize: 36, color: 'white' }} />,
    color: '#F44336',
    image: '/images/banner/ycm-banner.jpg',
    meetingTime: 'Fridays at 7:30 PM & Saturdays at 6:00 PM',
    link: '/young-couples-ministry',
    stats: { members: '25+', ageRange: '20-35 years', activities: 'Bi-weekly' },
    features: ['Marriage Enrichment', 'Couples Fellowship', 'Parenting Support', 'Date Nights']
  }
];

const ProfessionalMinistriesPage = () => {
  const { t } = useTranslation();
  const content = usePageContent('ministries');
  const activeMinistries = content.ministries?.length
    ? content.ministries.map((m, i) => ({
        ...(ministries.find(d => String(d.id) === String(m.id)) || ministries[i % ministries.length]),
        ...m,
      }))
    : ministries;
  const theme = useTheme();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index));
              }, index * 150);
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
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                {content.hero?.title || 'Our Ministries'}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                {content.hero?.subtitle || `"Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms."`}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: 'italic',
                  opacity: 0.8,
                  mb: 4,
                }}
              >
                {content.scripture || '1 Peter 4:10'}
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard elevation={0}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      5
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Active Ministries
                    </Typography>
                  </StatsCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard elevation={0}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      210+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Members Engaged
                    </Typography>
                  </StatsCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard elevation={0}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      15+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Weekly Activities
                    </Typography>
                  </StatsCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard elevation={0}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      All
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Ages Welcome
                    </Typography>
                  </StatsCard>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </HeroBanner>

      {/* Ministries Grid Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8}>
          <Fade in timeout={1200}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#1a365d',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {content.tagline || 'Explore Our Ministries'}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '700px', mx: 'auto', lineHeight: 1.6 }}
              >
                Discover how you can get involved and grow in your faith through our various ministries. 
                We have opportunities for all ages and interests, each designed to help you deepen your relationship with God.
              </Typography>
            </Box>
          </Fade>
        </Box>

        <Grid container spacing={4}>
          {activeMinistries.map((ministry, index) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={ministry.id}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <Slide
                direction="up"
                in={visibleCards.has(index)}
                timeout={600}
                style={{ transformOrigin: 'bottom' }}
              >
                <MinistryCard index={index} elevation={8}>
                  {/* Card Header with Image Overlay */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: 200,
                      background: `linear-gradient(135deg, ${alpha(ministry.color, 0.9)}, ${alpha(ministry.color, 0.7)}), url(${ministry.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      className="ministry-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.4)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ChurchIcon sx={{ fontSize: 80, color: 'white', opacity: 0.3 }} />
                    </Box>
                    
                    <IconWrapper color={ministry.color} className="ministry-icon">
                      {ministry.icon}
                    </IconWrapper>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    {/* Ministry Title */}
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: '#1a365d',
                        textAlign: 'center',
                      }}
                    >
                      {ministry.title}
                    </Typography>
                    
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        textAlign: 'center',
                        mb: 3,
                        fontWeight: 600,
                      }}
                    >
                      {ministry.subtitle}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        textAlign: 'center',
                      }}
                    >
                      {ministry.description}
                    </Typography>

                    {/* Quick Stats */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mb: 3,
                        py: 2,
                        backgroundColor: alpha(ministry.color, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ fontWeight: 700, color: ministry.color }}>
                          {ministry.stats.members}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Members
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ fontWeight: 700, color: ministry.color }}>
                          {ministry.stats.ageRange}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Age Range
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ fontWeight: 700, color: ministry.color }}>
                          {ministry.stats.activities}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Activities
                        </Typography>
                      </Box>
                    </Box>

                    {/* Meeting Time */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        p: 2,
                        backgroundColor: alpha('#1a365d', 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <AccessTimeIcon sx={{ mr: 2, color: '#1a365d' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {ministry.meetingTime}
                      </Typography>
                    </Box>

                    {/* Features */}
                    <Box sx={{ mb: 3 }}>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {ministry.features.map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              backgroundColor: alpha(ministry.color, 0.1),
                              color: ministry.color,
                              fontWeight: 500,
                              fontSize: '0.75rem',
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* CTA Button */}
                    <Button
                      component={RouterLink}
                      to={ministry.link}
                      variant="contained"
                      fullWidth
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        py: 1.5,
                        background: `linear-gradient(135deg, ${ministry.color}, ${alpha(ministry.color, 0.8)})`,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderRadius: 3,
                        boxShadow: `0 4px 15px ${alpha(ministry.color, 0.3)}`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 25px ${alpha(ministry.color, 0.4)}`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </MinistryCard>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Get Involved Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(/images/banner/pastor-sermon_1.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center">
            <Fade in timeout={1500}>
              <Box>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  Ready to Get Involved?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  Join a community that will support you in your faith journey and help you discover your God-given purpose.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    component={RouterLink}
                    to="/contact"
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
                        color: '#1a365d',
                        borderColor: 'white',
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/events"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #c9a84c, #f4e4bc)',
                      color: '#1a365d',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(201, 168, 76, 0.4)',
                      },
                    }}
                  >
                    View Events
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfessionalMinistriesPage;
