import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Home,
  Info,
  Groups,
  Event,
  VolumeUp,
  ContactMail,
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown,
  ChurchOutlined,
  FamilyRestroom,
  EscalatorWarning,
  ManOutlined,
  Favorite,
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
  ListItemButton,
  ListItemText,
  useTheme,
  Box,
  Container,
  Divider,
  Collapse,
  ListItemIcon,
  Paper,
  Fade,
  Chip,
} from '@mui/material';
import { styled, alpha, keyframes } from '@mui/material/styles';
import LanguageSwitcher from '../common/LanguageSwitcher';

// ─── Animations ────────────────────────────────────────────────────────────────
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ─── Styled Components ─────────────────────────────────────────────────────────
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  color: theme.palette.text.primary,
  boxShadow: `0 1px 0 ${alpha(theme.palette.divider, 0.14)}`,
  transition: 'all 0.35s ease',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  backdropFilter: 'saturate(180%) blur(10px)',
  WebkitBackdropFilter: 'saturate(180%) blur(10px)',
  '&.scrolled': {
    backgroundColor: alpha(theme.palette.background.paper, 0.92),
    boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.10)}`,
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  padding: theme.spacing(0, 2),
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    minHeight: 80,
    padding: theme.spacing(0, 3),
  },
}));

const NavItem = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const NavButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0.75, 1.4),
  borderRadius: '10px',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  color: theme.palette.text.primary,
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap',
  minWidth: 'unset',
  transition: 'all 0.25s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 5,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40%',
      height: '2.5px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '2px',
    },
  },
}));

const GiveButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.85, 2.2),
  borderRadius: '30px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '0.88rem',
  letterSpacing: '0.6px',
  color: '#fff',
  background: 'linear-gradient(135deg, #2e7d32, #43a047, #1b5e20)',
  backgroundSize: '200% 200%',
  boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.35)}`,
  whiteSpace: 'nowrap',
  transition: 'all 0.3s ease',
  animation: `${shimmer} 4s ease infinite`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha('#2e7d32', 0.45)}`,
    color: '#fff',
  },
  '&:active': { transform: 'translateY(0)' },
}));

const DropdownPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: 220,
  borderRadius: 14,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.14)}`,
  boxShadow: `0 16px 48px ${alpha(theme.palette.common.black, 0.15)}`,
  animation: `${slideDown} 0.2s ease`,
  zIndex: 1400,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -6,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: 12,
    height: 12,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.14)}`,
    borderRight: 'none',
    borderBottom: 'none',
    zIndex: 1,
  },
}));

const DropdownItem = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.1, 2.2),
  borderRadius: 0,
  textTransform: 'none',
  fontSize: '0.88rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  gap: theme.spacing(1.2),
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(3),
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 300,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    boxShadow: '-4px 0 30px rgba(0,0,0,0.12)',
  },
}));

// ─── Nav Data ──────────────────────────────────────────────────────────────────
const ministrySubItems = [
  { text: 'header.youth',    path: '/youth-ministry',    icon: <EscalatorWarning fontSize="small" /> },
  { text: 'header.women',    path: '/women-ministry',    icon: <FamilyRestroom fontSize="small" /> },
  { text: 'header.men',      path: '/men-ministry',      icon: <ManOutlined fontSize="small" /> },
  { text: 'header.children', path: '/children-ministry', icon: <ChurchOutlined fontSize="small" /> },
  { text: 'header.youngCouples', path: '/young-couples-ministry', icon: <Favorite fontSize="small" /> },
];

const navItems = [
  { text: 'header.home',       path: '/',          icon: <Home fontSize="small" /> },
  { text: 'header.about',      path: '/about',     icon: <Info fontSize="small" /> },
  { text: 'header.ministries', path: '/ministries', icon: <Groups fontSize="small" />, subItems: ministrySubItems },
  { text: 'header.events',     path: '/events',    icon: <Event fontSize="small" /> },
  { text: 'header.sermons',    path: '/sermons',   icon: <VolumeUp fontSize="small" /> },
  { text: 'header.contact',    path: '/contact',   icon: <ContactMail fontSize="small" /> },
  { text: 'header.give',       path: '/giving',    icon: <Favorite fontSize="small" />, isButton: true },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const Header = () => {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [openSubMenu, setOpenSubMenu]   = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef                     = useRef(null);
  const { t }                           = useTranslation();
  const theme                           = useTheme();
  const location                        = useLocation();

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // ── Desktop Nav Item ──────────────────────────────────────────────────────
  const renderDesktopItem = (item) => {
    if (item.isButton) {
      return (
        <GiveButton
          key={item.text}
          component={RouterLink}
          to={item.path}
          startIcon={item.icon}
        >
          {t(item.text)}
        </GiveButton>
      );
    }

    if (item.subItems) {
      const open = dropdownOpen === item.text;
      return (
        <NavItem key={item.text} ref={open ? dropdownRef : null}>
          <NavButton
            className={isActive(item.path) ? 'active' : ''}
            component={RouterLink}
            to={item.path}
            onClick={() => setDropdownOpen(open ? null : item.text)}
            endIcon={
              <KeyboardArrowDown
                sx={{
                  fontSize: '1rem !important',
                  transition: 'transform 0.25s ease',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            }
          >
            {t(item.text)}
          </NavButton>
          <Fade in={open}>
            <DropdownPaper ref={dropdownRef} elevation={0}>
              {item.subItems.map((sub) => (
                <DropdownItem
                  key={sub.text}
                  component={RouterLink}
                  to={sub.path}
                  onClick={() => setDropdownOpen(null)}
                  startIcon={
                    <Box sx={{ color: isActive(sub.path) ? 'primary.main' : 'text.secondary' }}>
                      {sub.icon}
                    </Box>
                  }
                  sx={{
                    fontWeight: isActive(sub.path) ? 700 : 500,
                    color: isActive(sub.path) ? 'primary.main' : 'text.primary',
                  }}
                >
                  {t(sub.text)}
                </DropdownItem>
              ))}
            </DropdownPaper>
          </Fade>
        </NavItem>
      );
    }

    return (
      <NavButton
        key={item.text}
        component={RouterLink}
        to={item.path}
        className={isActive(item.path) ? 'active' : ''}
      >
        {t(item.text)}
      </NavButton>
    );
  };

  // ── Mobile Nav Item ──────────────────────────────────────────────────────
  const renderMobileItem = (item) => (
    <React.Fragment key={item.text}>
      <ListItemButton
        component={RouterLink}
        to={item.path}
        onClick={item.subItems ? (e) => {
          e.preventDefault();
          setOpenSubMenu(openSubMenu === item.text ? null : item.text);
        } : undefined}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          px: 2,
          py: 1,
          backgroundColor: isActive(item.path) && !item.subItems
            ? alpha(theme.palette.primary.main, 0.1)
            : 'transparent',
          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.07) },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? 'primary.main' : 'text.secondary' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={t(item.text)}
          primaryTypographyProps={{
            fontWeight: isActive(item.path) ? 700 : 500,
            fontSize: '0.95rem',
            color: isActive(item.path) && !item.subItems ? 'primary.main' : 'text.primary',
          }}
        />
        {item.subItems && (
          <KeyboardArrowDown
            sx={{
              fontSize: '1.1rem',
              color: 'text.secondary',
              transition: 'transform 0.25s ease',
              transform: openSubMenu === item.text ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
        {item.isButton && (
          <Chip
            label="❤️"
            size="small"
            sx={{ ml: 1, bgcolor: alpha('#2e7d32', 0.12), color: '#2e7d32', fontWeight: 700, fontSize: '0.75rem' }}
          />
        )}
      </ListItemButton>

      {item.subItems && (
        <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1 }}>
            {item.subItems.map((sub) => (
              <ListItemButton
                key={sub.text}
                component={RouterLink}
                to={sub.path}
                sx={{
                  pl: 5,
                  borderRadius: 2,
                  mb: 0.25,
                  py: 0.75,
                  backgroundColor: isActive(sub.path)
                    ? alpha(theme.palette.primary.main, 0.08)
                    : 'transparent',
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.06) },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30, color: isActive(sub.path) ? 'primary.main' : 'text.disabled' }}>
                  {sub.icon}
                </ListItemIcon>
                <ListItemText
                  primary={t(sub.text)}
                  primaryTypographyProps={{
                    fontSize: '0.87rem',
                    fontWeight: isActive(sub.path) ? 700 : 400,
                    color: isActive(sub.path) ? 'primary.main' : 'text.secondary',
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
      <StyledAppBar position="fixed" elevation={0} className={scrolled ? 'scrolled' : ''}>
        <Container maxWidth="xl" disableGutters>
          <StyledToolbar>
            {/* ── Logo ── */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1.4,
                flexShrink: 0,
                '&:hover .logo-ring': { borderColor: 'primary.main', transform: 'rotate(8deg) scale(1.06)' },
                '&:hover .brand-name': { color: 'primary.main' },
              }}
            >
              <Box
                className="logo-ring"
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
                  p: '3px',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  flexShrink: 0,
                  [theme.breakpoints.up('md')]: { width: 62, height: 62 },
                }}
              >
                <Box
                  component="img"
                  src="/images/logo/logo-blog1.png"
                  alt="Church Logo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  className="brand-name"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: { sm: '0.95rem', md: '1.05rem' },
                    background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 40%, #c9a84c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.25,
                    transition: 'color 0.3s ease',
                  }}
                >
                  First Haitian Baptist Church
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'text.disabled',
                    fontSize: '0.7rem',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Kissimmee, FL
                </Typography>
              </Box>
            </Box>

            {/* ── Desktop Nav ── */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                gap: 0.5,
                mx: 2,
              }}
            >
              {navItems.map(renderDesktopItem)}
            </Box>

            {/* ── Right Side Actions ── */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexShrink: 0 }}>
              <LanguageSwitcher />
            </Box>

            {/* ── Mobile Right ── */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1, ml: 'auto' }}>
              <LanguageSwitcher />
              <IconButton
                aria-label="open drawer"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{
                  color: 'text.primary',
                  borderRadius: '10px',
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  p: '7px',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    borderColor: 'primary.main',
                  },
                }}
              >
                {mobileOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
              </IconButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* ── Mobile Drawer ── */}
      <StyledDrawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            px: 2.5,
            pt: 2.5,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Box
              component="img"
              src="/images/logo/logo-blog1.png"
              alt="Church Logo"
              sx={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}
            />
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '0.88rem',
                background: 'linear-gradient(135deg, #1a365d, #c9a84c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.3,
              }}
            >
              FHBCK
            </Typography>
          </Box>
          <IconButton
            onClick={() => setMobileOpen(false)}
            size="small"
            sx={{
              borderRadius: '8px',
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.08), color: 'error.main' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Nav Items */}
        <List sx={{ px: 1.5, pt: 1.5, pb: 2 }}>
          {navItems.map(renderMobileItem)}
        </List>

        {/* Drawer Footer */}
        <Box sx={{ mt: 'auto', px: 2.5, pb: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <GiveButton
            fullWidth
            component={RouterLink}
            to="/giving"
            startIcon={<Favorite fontSize="small" />}
            sx={{ py: 1.2, fontSize: '0.95rem' }}
          >
            {t('header.give')}
          </GiveButton>
        </Box>
      </StyledDrawer>

      {/* Spacer */}
      <Toolbar sx={{ minHeight: { xs: 72, md: 80 } }} />
    </>
  );
};

export default Header;
