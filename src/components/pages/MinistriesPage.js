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
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${process.env.PUBLIC_URL}/images/banner/pastor-sermon_1.JPG')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center 20%',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  color: theme.palette.common.white,
  padding: theme.spacing(20, 0),
  textAlign: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(15, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 0),
    backgroundPosition: 'center',
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

// Enhanced Ministry Card Component with professional styling
const MinistryCard = ({ ministry }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
        },
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      {/* Image with overlay */}
      <Box
        sx={{
          position: 'relative',
          height: isMobile ? 160 : 180,
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${ministry.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 2,
          color: 'common.white',
        }}
      >
        <Box 
          sx={{
            bgcolor: 'primary.main',
            width: 60,
            height: 60,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: theme.shadows[4],
          }}
        >
          {React.cloneElement(ministry.icon, { 
            sx: { 
              fontSize: '2rem',
              color: 'primary.contrastText',
            } 
          })}
        </Box>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 600, 
            textAlign: 'center',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            mb: 0.5,
          }}
        >
          {ministry.title}
        </Typography>
      </Box>
      
      {/* Content */}
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 3,
          '&:last-child': {
            pb: 3,
          }
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2.5,
            flexGrow: 1,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {ministry.description}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 'auto',
            pt: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <AccessTimeIcon 
            color="action" 
            fontSize="small" 
            sx={{ 
              mr: 1,
              color: 'text.secondary',
              fontSize: '1rem',
            }} 
          />
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            {ministry.meetingTime}
          </Typography>
          
          <Button 
            size="small" 
            color="primary" 
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              ml: 'auto',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.8rem',
              '& .MuiButton-endIcon': {
                ml: 0.5,
              },
              '&:hover': {
                bgcolor: 'transparent',
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Ministries Grid Component
const MinistriesGrid = () => {
  const theme = useTheme();
  
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
      
      <Grid 
        container 
        spacing={4}
        sx={{
          [theme.breakpoints.up('xs')]: {
            justifyContent: 'center',
          },
        }}
      >
        {ministries.map((ministry) => (
          <Grid 
            item 
            key={ministry.id} 
            xs={12} 
            sm={6} 
            md={6}
            lg={5.8}
            sx={{
              maxWidth: 'calc(50% - 32px)',
              flexBasis: 'calc(50% - 32px)',
              [theme.breakpoints.down('sm')]: {
                maxWidth: '100%',
                flexBasis: '100%',
              },
            }}
          >
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
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                Our Ministries
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              A welcoming community of faith, growing together in Christ's love and serving our neighbors with compassion.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton color="primary" aria-label="Facebook" component="a" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter" component="a" href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram" component="a" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="YouTube" component="a" href="https://youtube.com">
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              <Link href="mailto:info@churchname.com" color="inherit" underline="hover">
                info@churchname.com
              </Link>
            </Typography>
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

// Main Component - Footer is provided by the App layout
const MinistriesPage = () => {
  return (
    <Box 
      component="main" 
      sx={{ 
        backgroundColor: '#ffffff',
        minHeight: 'calc(100vh - 64px)' // Adjust based on header height
      }}
    >
      <Banner />
      <MinistriesGrid />
    </Box>
  );
};

export default MinistriesPage;
