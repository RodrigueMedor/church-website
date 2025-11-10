import React from 'react';
import { 
  AppBar, Toolbar, Button, Container, Typography, Box, 
  Grid, Card, CardContent, CardMedia, CardActionArea, 
  CardActions, IconButton, Link, Divider, Stack, useTheme,
  useMediaQuery, Paper, alpha, styled, Fade
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Groups as GroupIcon,
  AttachMoney as GiveIcon,
  ContactMail as ContactIcon,
  School as SchoolIcon,
  MusicNote as MusicIcon,
  SportsSoccer as SportsIcon,
  MenuBook as BibleIcon,
  VolunteerActivism as VolunteerIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon,
  Church as ChurchIcon
} from '@mui/icons-material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledBanner = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/ministry-banner.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(15, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  marginBottom: theme.spacing(6),
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '60px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '2px',
  },
}));

// Ministries data
const ministries = [
  {
    id: 1,
    title: "Children's Ministry",
    description: 'A safe, engaging environment where children learn about God\'s love through Bible-based teaching, worship, and fun activities designed just for them.',
    icon: <SchoolIcon fontSize="large" />,
    image: '/images/children-ministry.jpg',
    meetingTime: 'Sundays at 9:30 AM',
    color: '#4CAF50' // Green
  },
  {
    id: 2,
    title: 'Youth Group',
    description: 'A dynamic community for teenagers to grow in their faith, build meaningful relationships, and discover their purpose in Christ.',
    icon: <GroupIcon fontSize="large" />,
    image: '/images/youth-group.jpg',
    meetingTime: 'Fridays at 7:00 PM',
    color: '#2196F3' // Blue
  },
  {
    id: 3,
    title: 'Worship Team',
    description: 'Leading the congregation in authentic worship through music and creative expressions of praise to glorify God.',
    icon: <MusicIcon fontSize="large" />,
    image: '/images/worship.jpg',
    meetingTime: 'Thursdays at 6:30 PM',
    color: '#9C27B0' // Purple
  },
  {
    id: 4,
    title: 'Bible Study',
    description: 'In-depth exploration of Scripture in a welcoming small group environment where questions are encouraged and faith grows.',
    icon: <BibleIcon fontSize="large" />,
    image: '/images/bible-study.jpg',
    meetingTime: 'Wednesdays at 7:00 PM',
    color: '#FF9800' // Orange
  },
  {
    id: 5,
    title: 'Outreach Ministry',
    description: 'Extending Christ\'s love to our community through service projects, missions, and acts of kindness that make a real difference.',
    icon: <VolunteerIcon fontSize="large" />,
    image: '/images/outreach.jpg',
    meetingTime: 'Monthly events',
    color: '#F44336' // Red
  },
  {
    id: 6,
    title: 'Sports Ministry',
    description: 'Building Christ-centered relationships through sports, fitness, and recreational activities for all ages and skill levels.',
    icon: <SportsIcon fontSize="large" />,
    image: '/images/sports.jpg',
    meetingTime: 'Saturdays at 10:00 AM',
    color: '#00BCD4' // Cyan
  }
];

// Header Component
const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ChurchIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/"
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              FHBCK
            </Typography>
          </Box>
          
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                component={RouterLink} 
                to="/" 
                startIcon={<HomeIcon />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Home
              </Button>
              <Button 
                component={RouterLink} 
                to="/about" 
                startIcon={<InfoIcon />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                About
              </Button>
              <Button 
                component={RouterLink} 
                to="/ministries" 
                variant="contained" 
                startIcon={<GroupIcon />}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                Ministries
              </Button>
              <Button 
                component={RouterLink} 
                to="/give" 
                startIcon={<GiveIcon />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Give
              </Button>
              <Button 
                component={RouterLink} 
                to="/contact" 
                startIcon={<ContactIcon />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Contact
              </Button>
            </Box>
          ) : (
            <IconButton color="inherit" sx={{ ml: 'auto' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Banner Component
const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <StyledBanner>
      <Fade in={true} timeout={1000}>
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.2
            }}
          >
            Our Ministries
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            sx={{ 
              mb: 3, 
              fontWeight: 400,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.4
            }}
          >
            "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms."
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontStyle: 'italic',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            1 Peter 4:10
          </Typography>
        </Container>
      </Fade>
    </StyledBanner>
  );
};

// Ministry Card Component
const MinistryCard = ({ ministry }) => {
  return (
    <StyledCard elevation={3}>
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%', // 16:9 aspect ratio
          position: 'relative',
          backgroundColor: ministry.color || 'rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${ministry.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8,
          }}
        />
        <Box sx={{ 
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          p: 2,
        }}>
          {React.cloneElement(ministry.icon, { 
            sx: { 
              fontSize: '3.5rem',
              mb: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            } 
          })}
          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {ministry.title}
          </Typography>
        </Box>
      </CardMedia>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {ministry.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          <AccessTimeIcon color="action" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {ministry.meetingTime}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          size="small" 
          color="primary" 
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </StyledCard>
  );
};

// Ministries Grid Component
const MinistriesGrid = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <SectionTitle variant="h3" component="h2">
          Explore Our Ministries
        </SectionTitle>
        <Typography variant="subtitle1" color="text.secondary" maxWidth="700px" mx="auto">
          Discover how you can get involved and grow in your faith through our various ministries. 
          We have opportunities for all ages and interests.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {ministries.map((ministry) => (
          <Grid item key={ministry.id} xs={12} sm={6} lg={4}>
            <MinistryCard ministry={ministry} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Footer Component
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ChurchIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                FHBCK
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              A welcoming community of faith, growing together in Christ's love and serving our neighbors with compassion.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link component={RouterLink} to="/about" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link component={RouterLink} to="/ministries" color="text.primary" underline="hover" fontWeight={500}>
                Ministries
              </Link>
              <Link component={RouterLink} to="/events" color="text.secondary" underline="hover">
                Events
              </Link>
              <Link component={RouterLink} to="/give" color="text.secondary" underline="hover">
                Give
              </Link>
              <Link component={RouterLink} to="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOnIcon color="primary" sx={{ mr: 1, mt: '2px' }} />
                <Typography variant="body2" color="text.secondary">
                  123 Faith Avenue<br />
                  Brooklyn, NY 11201
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon color="primary" sx={{ mr: 1 }} />
                <Link href="tel:+15551234567" color="text.secondary" underline="hover">
                  (555) 123-4567
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon color="primary" sx={{ mr: 1 }} />
                <Link href="mailto:info@fhbck.org" color="text.secondary" underline="hover">
                  info@fhbck.org
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Sunday Service: 10:30 AM
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', 
                  justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'} mb={isMobile ? 2 : 0}>
            © {new Date().getFullYear()} Faith Hope Baptist Church. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/privacy" variant="body2" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
            <Link href="/terms" variant="body2" color="text.secondary" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Main Component
const NewMinistriesPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Banner />
        <MinistriesGrid />
      </Box>
      <Footer />
    </Box>
  );
};

export default NewMinistriesPage;
