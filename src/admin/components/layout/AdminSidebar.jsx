import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  Typography,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  MenuBook as SermonIcon,
  Image as MediaIcon,
  Description as PageIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  ListAlt as FormIcon,
  Article as NewsIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useNotifications } from '../../context/NotificationContext';

const drawerWidth = 240;

const StyledNavItem = styled(ListItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    borderRight: `4px solid ${theme.palette.primary.main}`,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  padding: theme.spacing(1, 3),
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
}));

const AdminSidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { unreadCount } = useNotifications();
  const { t } = useTranslation();

  const menuItems = [
    { text: t('admin.sidebar.dashboard'), icon: <DashboardIcon />, path: '/admin' },
    { text: t('admin.sidebar.pages'), icon: <PageIcon />, path: '/admin/pages' },
    { text: t('admin.sidebar.homepage'), icon: <PageIcon />, path: '/admin/pages/homepage' },
    { text: t('admin.sidebar.about'), icon: <PageIcon />, path: '/admin/pages/about' },
    { text: t('admin.sidebar.ministries'), icon: <PageIcon />, path: '/admin/pages/ministries' },
    { text: t('admin.sidebar.ministriesCrud'), icon: <FormIcon />, path: '/admin/ministries-manager' },
    { text: t('admin.sidebar.events'), icon: <EventIcon />, path: '/admin/pages/events' },
    { text: t('admin.sidebar.sermons'), icon: <SermonIcon />, path: '/admin/pages/sermons' },
    { text: t('admin.sidebar.contact'), icon: <PageIcon />, path: '/admin/pages/contact' },
    { text: t('admin.sidebar.news'), icon: <NewsIcon />, path: '/admin/news' },
    { text: t('admin.sidebar.pastors'), icon: <PeopleIcon />, path: '/admin/pastors' },
    { text: t('admin.sidebar.testimonials'), icon: <FormIcon />, path: '/admin/testimonials' },
    { text: t('admin.sidebar.heroSlides'), icon: <MediaIcon />, path: '/admin/hero-slides' },
    { text: t('admin.sidebar.gallery'), icon: <MediaIcon />, path: '/admin/gallery' },
    { text: t('admin.sidebar.contactMessages'), icon: <EmailIcon />, path: '/admin/contact-messages' },
    { text: t('admin.sidebar.media'), icon: <MediaIcon />, path: '/admin/media' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Box 
            component="img"
            src="/logo.png" 
            alt="Logo" 
            sx={{ 
              height: 40, 
              width: 'auto',
              mr: 1
            }} 
          />
          <Typography variant="h6" noWrap>
            {t('admin.sidebar.admin')}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <StyledNavItem
            button
            key={item.path}
            component={RouterLink}
            to={item.path}
            selected={location.pathname.startsWith(item.path)}
          >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {item.path === '/admin/contact-messages' ? (
              <Badge badgeContent={unreadCount} color="warning">{item.icon}</Badge>
            ) : item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          </StyledNavItem>
        ))}
      </List>
      <Divider />
      <List sx={{ p: 2, mt: 'auto' }}>
        <StyledNavItem button component={RouterLink} to="/admin/settings">
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={t('admin.sidebar.settings')} />
        </StyledNavItem>
        <StyledNavItem button onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t('admin.sidebar.logout')} />
        </StyledNavItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="admin menu"
    >
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          },
          '& .MuiListItemIcon-root': {
            minWidth: '40px',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminSidebar;
