import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Home,
  Info,
  Groups,
  Event,
  VolumeUp,
  ContactMail,
  VolunteerActivism,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Container,
  Stack,
  Fade,
  Divider,
  Slide,
  useScrollTrigger,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
  ListItemIcon
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import LanguageSwitcher from '../common/LanguageSwitcher';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease-in-out',
  '&.scrolled': {
    backgroundColor: alpha(theme.palette.background.default, 0.9),
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: theme.spacing(1, 0)
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateY(-2px)'
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 4,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
      height: 2,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 2
    }
  }
}));

const DonateButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  padding: theme.spacing(1, 3),
  borderRadius: 50,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  transition: 'all 0.3s ease-in-out'
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    padding: theme.spacing(2)
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4)
  }
}));

const navItems = [
  { text: 'header.home', path: '/', icon: 'home' },
  { text: 'header.about', path: '/about', icon: 'info' },
  { 
    text: 'header.ministries', 
    path: '/ministries',
    icon: 'groups',
    subItems: [
      { text: 'header.youth', path: '/ministries/youth' },
      { text: 'header.women', path: '/ministries/women' },
      { text: 'header.men', path: '/ministries/men' },
      { text: 'header.children', path: '/ministries/children' },
    ]
  },
  { text: 'header.events', path: '/events', icon: 'event' },
  { text: 'header.sermons', path: '/sermons', icon: 'volume_up' },
  { text: 'header.contact', path: '/contact', icon: 'contact_mail' },
  { 
    text: 'header.give', 
    path: '/giving', 
    isButton: true,
    icon: 'volunteer_activism'
  },
];

const getIcon = (iconName) => {
  const icons = {
    home: <Home fontSize="small" sx={{ mr: 1 }} />,
    info: <Info fontSize="small" sx={{ mr: 1 }} />,
    groups: <Groups fontSize="small" sx={{ mr: 1 }} />,
    event: <Event fontSize="small" sx={{ mr: 1 }} />,
    volume_up: <VolumeUp fontSize="small" sx={{ mr: 1 }} />,
    contact_mail: <ContactMail fontSize="small" sx={{ mr: 1 }} />,
    volunteer_activism: <VolunteerActivism fontSize="small" sx={{ mr: 1 }} />
  };
  return icons[iconName] || null;
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuClick = (itemText) => {
    setOpenSubMenu(openSubMenu === itemText ? null : itemText);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderNavItem = (item) => (
    <NavButton
      key={item.text}
      component={RouterLink}
      to={item.path}
      className={isActive(item.path) ? 'active' : ''}
      startIcon={getIcon(item.icon)}
    >
      {t(item.text)}
      {item.subItems && <ExpandMoreIcon sx={{ ml: 0.5 }} />}
    </NavButton>
  );

  const renderMobileNavItem = (item) => (
    <React.Fragment key={item.text}>
      <ListItemButton
        component={item.subItems ? 'div' : RouterLink}
        to={!item.subItems ? item.path : null}
        onClick={item.subItems ? () => handleSubMenuClick(item.text) : handleDrawerToggle}
        sx={{
          borderRadius: 1,
          mb: 0.5,
          backgroundColor: isActive(item.path) 
            ? alpha(theme.palette.primary.main, 0.1) 
            : 'transparent',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          {getIcon(item.icon)}
        </ListItemIcon>
        <ListItemText 
          primary={t(item.text)} 
          primaryTypographyProps={{
            fontWeight: isActive(item.path) ? 600 : 'normal',
            color: isActive(item.path) 
              ? theme.palette.primary.main 
              : theme.palette.text.primary,
          }} 
        />
        {item.subItems && (
          openSubMenu === item.text ? <ExpandLessIcon /> : <ExpandMoreIcon />
        )}
      </ListItemButton>
      
      {item.subItems && (
        <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem) => (
              <ListItemButton
                key={subItem.text}
                component={RouterLink}
                to={subItem.path}
                onClick={handleDrawerToggle}
                sx={{
                  pl: 6,
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <ListItemText 
                  primary={t(subItem.text)}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: isActive(subItem.path) 
                      ? theme.palette.primary.main 
                      : theme.palette.text.secondary,
                    fontWeight: isActive(subItem.path) ? 600 : 'normal',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  return (
    <>
      <StyledAppBar position="fixed" className={scrolled ? 'scrolled' : ''}>
        <Container maxWidth="xl">
          <StyledToolbar disableGutters>
            {/* Logo and Brand */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  '& .logo-img': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                },
              }}
            >
              <Box
                className="logo-img"
                component="img"
                src="/images/logo/logo-blog1.png"
                alt="Church Logo"
                sx={{
                  height: 60,
                  width: 'auto',
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.primary.main}`,
                  marginRight: 2,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 30%, #d4af37 70%, #f9e0a0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto',
                    lineHeight: 1.2,
                    '&:hover': {
                      backgroundPosition: 'right center',
                    },
                    transition: 'all 0.5s ease',
                  }}
                >
                  First Haitian Baptist Church
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'text.secondary',
                    lineHeight: 1.2,
                  }}
                >
                  Kissimmee, FL
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                {navItems.map((item) =>
                  item.isButton ? (
                    <DonateButton
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      variant="contained"
                      color="primary"
                      startIcon={getIcon(item.icon)}
                    >
                      {t(item.text)}
                    </DonateButton>
                  ) : (
                    <Tooltip key={item.text} title={t(item.text)} arrow>
                      {renderNavItem(item)}
                    </Tooltip>
                  )
                )}
                <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                  <LanguageSwitcher />
                </Box>
              </Stack>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <LanguageSwitcher />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <StyledDrawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 2, pt: 2 }}>
          {navItems.map((item) => renderMobileNavItem(item))}
        </List>
      </StyledDrawer>

      {/* Spacer to account for fixed header */}
      <Toolbar />
    </>
  );
};

export default Header;
