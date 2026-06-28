import React from 'react';
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
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Pages', icon: <PageIcon />, path: '/admin/pages' },
  { text: 'Homepage', icon: <PageIcon />, path: '/admin/pages/homepage' },
  { text: 'About', icon: <PageIcon />, path: '/admin/pages/about' },
  { text: 'Ministries', icon: <PageIcon />, path: '/admin/pages/ministries' },
  { text: 'Events', icon: <EventIcon />, path: '/admin/pages/events' },
  { text: 'Sermons', icon: <SermonIcon />, path: '/admin/pages/sermons' },
  { text: 'Contact', icon: <PageIcon />, path: '/admin/pages/contact' },
  { text: 'News', icon: <NewsIcon />, path: '/admin/news' },
  { text: 'Media', icon: <MediaIcon />, path: '/admin/media' },
];

const AdminSidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            Admin
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <StyledNavItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname.startsWith(item.path)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
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
          <ListItemText primary="Settings" />
        </StyledNavItem>
        <StyledNavItem button onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
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
