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
  VolunteerActivism as VolunteerActivismIcon,
  MusicNote as MusicNoteIcon
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
  },
  {
    id: 6,
    title: 'Worship & Music Ministry',
    subtitle: 'Leading People to His Presence',
    description: 'Leading the congregation in heartfelt worship through music, song, and creative arts to glorify God and usher in His presence.',
    icon: <MusicNoteIcon />,
    color: '#C9A84C',
    image: '/images/banner/banner-sermont.jpg',
    meetingTime: 'Wednesdays at 7:00 PM & Sundays at 9:00 AM',
    link: '/worship-ministry',
    stats: { members: '40+', ageRange: 'Ages 14+' },
    features: ['Choir', 'Praise Team', 'Instrumental', 'Sound & Media']
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
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/images/banner/pastor-sermon_1.JPG) center 10% / cover no-repeat`,
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 14, md: 20 },
          pb: { xs: 12, md: 18 },
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
              { value: '6', label: 'Active Ministries', icon: <ChurchIcon /> },
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

      <Box sx={{ bgcolor: '#f8f6f0', py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={5}>
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
              {content.tagline || 'Explore Our Ministries'}
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
              {content.tagline || 'Explore Our Ministries'}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '650px',
                mx: 'auto',
                mt: 3,
                lineHeight: 1.7,
                fontSize: '1.05rem'
              }}
            >
              Discover how you can get involved and grow in your faith through our various ministries.
              We have opportunities for all ages and interests.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {activeMinistries.map((ministry) => (
              <Grid item xs={12} md={6} key={ministry.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'rgba(26, 54, 93, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      boxShadow: `0 16px 40px ${alpha(theme.palette.primary.dark, 0.1)}`,
                      transform: 'translateY(-4px)',
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 220 },
                      minHeight: { xs: 140, sm: 'auto' },
                      flexShrink: 0,
                      background: `linear-gradient(rgba(10, 26, 48, 0.5), rgba(10, 26, 48, 0.5)), url(${ministry.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        background: `linear-gradient(rgba(10, 26, 48, 0.3), rgba(10, 26, 48, 0.3)), url(${ministry.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: alpha('#fff', 0.2),
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        '& svg': { fontSize: 30 },
                        transition: 'all 0.3s ease',
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
                      p: 2.5,
                      '&:last-child': { pb: 2.5 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.dark',
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.1rem',
                        mb: 0.3,
                      }}
                    >
                      {ministry.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.7rem',
                        mb: 1.5,
                      }}
                    >
                      {ministry.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1.5,
                        lineHeight: 1.6,
                        flexGrow: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      {ministry.description}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1.5,
                        p: 1.2,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        borderRadius: '8px',
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.78rem' }}>
                        {ministry.meetingTime}
                      </Typography>
                    </Box>

                    <Stack direction="row" flexWrap="wrap" gap={0.6} mb={1.5}>
                      {ministry.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.68rem',
                            height: 24,
                            bgcolor: alpha(theme.palette.primary.main, 0.06),
                            color: 'primary.main',
                            borderRadius: '6px',
                          }}
                        />
                      ))}
                    </Stack>
                    <Button
                      component={RouterLink}
                      to={ministry.link}
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: '0.85rem' }} />}
                      sx={{
                        alignSelf: 'flex-start',
                        fontWeight: 600,
                        px: 2.5,
                        py: 0.7,
                        fontSize: '0.8rem',
                        borderRadius: '50px',
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'primary.main',
                          color: '#fff',
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



