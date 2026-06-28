import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  alpha,
  Chip,
  Stack
} from '@mui/material';
import {
  Groups as GroupIcon,
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  Favorite as FavoriteIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Handyman as HandymanIcon,
  ChildCare as ChildCareIcon,
  Church as ChurchIcon,
  People as PeopleIcon,
  Event as EventIcon,
  VolunteerActivism as VolunteerActivismIcon
} from '@mui/icons-material';
import { usePageContent } from '../../cms';

const ministries = [
  {
    id: 1,
    title: "Children's Ministry",
    subtitle: 'Nurturing Young Faith',
    description: 'A safe, engaging environment where children learn about God\'s love through Bible-based teaching, worship, and fun activities designed just for them.',
    icon: <ChildCareIcon />,
    color: '#4CAF50',
    image: '/images/banner/children-banner.JPG',
    meetingTime: 'Sundays at 9:30 AM & Wednesdays at 7:00 PM',
    link: '/children-ministry',
    stats: { members: '45+', ageRange: '4-12 years' },
    features: ['Bible Stories', 'Fun Activities', 'Safe Environment', 'Dedicated Teachers']
  },
  {
    id: 2,
    title: 'Youth Ministry',
    subtitle: 'Building Future Leaders',
    description: 'A dynamic community for teenagers to grow in their faith, build meaningful relationships, and discover their purpose in Christ.',
    icon: <GroupIcon />,
    color: '#2196F3',
    image: '/images/banner/youth-banner.jpg',
    meetingTime: 'Saturdays at 5:00 PM & Sundays at 11:30 AM',
    link: '/youth-ministry',
    stats: { members: '60+', ageRange: '13-18 years' },
    features: ['Bible Studies', 'Fellowship', 'Community Service', 'Leadership Training']
  },
  {
    id: 3,
    title: "Men's Ministry",
    subtitle: 'Strong Men of Faith',
    description: 'Building strong men of faith through fellowship, Bible study, service opportunities, and recreational activities.',
    icon: <HandymanIcon />,
    color: '#FF9800',
    image: '/images/banner/men-banner.JPG',
    meetingTime: 'Wednesdays at 7:00 PM & Saturdays at 10:00 AM',
    link: '/men-ministry',
    stats: { members: '30+', ageRange: '18+' },
    features: ['Bible Study', 'Service Projects', 'Fellowship', 'Mentorship']
  },
  {
    id: 4,
    title: "Women's Ministry",
    subtitle: 'Sisters in Christ',
    description: 'A supportive community for women to grow in faith, build lasting friendships, and serve together in Christ\'s love.',
    icon: <FavoriteIcon />,
    color: '#9C27B0',
    image: '/images/banner/women-banner.jpg',
    meetingTime: 'Tuesdays at 7:00 PM & Saturdays at 10:00 AM',
    link: '/women-ministry',
    stats: { members: '50+', ageRange: '18+' },
    features: ['Prayer Groups', 'Bible Studies', 'Fellowship', 'Outreach']
  },
  {
    id: 5,
    title: 'Young Couples Ministry',
    subtitle: 'Strengthening Marriages',
    description: 'Strengthening marriages and building Christ-centered relationships through fellowship, Bible study, and shared experiences.',
    icon: <FamilyRestroomIcon />,
    color: '#F44336',
    image: '/images/banner/ycm-banner.jpg',
    meetingTime: 'Fridays at 7:30 PM & Saturdays at 6:00 PM',
    link: '/young-couples-ministry',
    stats: { members: '25+', ageRange: '20-35 years' },
    features: ['Marriage Enrichment', 'Couples Fellowship', 'Parenting Support', 'Date Nights']
  }
];
const ProfessionalMinistriesPage = () => {

  const content = usePageContent('ministries');
  const theme = useTheme();
  const activeMinistries = content.ministries?.length
    ? content.ministries.map((m, i) => ({
        ...(ministries.find(d => String(d.id) === String(m.id)) || ministries[i % ministries.length]),
        ...m,
      }))
    : ministries;

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/images/banner/pastor-sermon_1.JPG)`,
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center" maxWidth="800px" mx="auto">
            <ChurchIcon sx={{ fontSize: 48, color: theme.palette.secondary.light, mb: 2 }} />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              {content.hero?.title || 'Our Ministries'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                lineHeight: 1.6,
                mb: 3,
                fontSize: { xs: '1rem', md: '1.15rem' },
              }}
            >
              {content.hero?.subtitle || '"Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace in its various forms."'}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                opacity: 0.7,
                color: theme.palette.secondary.light,
                fontWeight: 500,
              }}
            >
              {content.scripture || '1 Peter 4:10'}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: 'common.white',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          py: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {[
              { value: '5', label: 'Active Ministries', icon: <ChurchIcon /> },
              { value: '210+', label: 'Members Engaged', icon: <PeopleIcon /> },
              { value: '15+', label: 'Weekly Activities', icon: <EventIcon /> },
              { value: 'All', label: 'Ages Welcome', icon: <VolunteerActivismIcon /> },
            ].map((stat, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box textAlign="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1.5,
                      color: theme.palette.primary.main,
                      '& .MuiSvgIcon-root': { fontSize: 22 },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.dark, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.dark,
                mb: 2,
              }}
            >
              {content.tagline || 'Explore Our Ministries'}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: '650px', mx: 'auto', lineHeight: 1.7 }}
            >
              Discover how you can get involved and grow in your faith through our various ministries.
              We have opportunities for all ages and interests.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {activeMinistries.map((ministry) => (
              <Grid item xs={12} md={6} key={ministry.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    height: '100%',
                    '&:hover': {
                      boxShadow: `0 12px 40px ${alpha(theme.palette.primary.dark, 0.12)}`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      minHeight: { xs: 160, sm: 'auto' },
                      flexShrink: 0,
                      background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${ministry.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {ministry.icon}
                    </Box>
                  </Box>

                  <CardContent
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      '&:last-child': { pb: 3 },
                    }}
                  >
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {ministry.title}
                    </Typography>
                    <Typography
                      variant="body2"
                    >
                      {ministry.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6, flexGrow: 1 }}
                    >
                      {ministry.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                        p: 1.5,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        borderRadius: 1,
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {ministry.meetingTime}
                      </Typography>
                    </Box>

                    <Stack direction="row" flexWrap="wrap" gap={0.8} mb={2}>
                      {ministry.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.72rem',
                            height: 26,
                          }}
                        />
                      ))}
                    </Stack>
                    <Button
                      component={RouterLink}
                      to={ministry.link}
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        alignSelf: 'flex-start',
                        fontWeight: 600,
                        px: 2.5,
                        '&:hover': {
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: theme.palette.primary.dark,
          color: 'common.white',
          py: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Get Involved?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              opacity: 0.85,
              maxWidth: '560px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Join a community that will support you in your faith journey and help you discover your God-given purpose.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2.5}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: 'common.white',
                color: 'common.white',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'common.white',
                  color: theme.palette.primary.dark,
                  borderColor: 'common.white',
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
                py: 1.5,
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                fontWeight: 700,
                '&:hover': {
                  bgcolor: theme.palette.secondary.dark,
                  color: theme.palette.primary.dark,
                },
              }}
            >
              View Events
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default ProfessionalMinistriesPage;



