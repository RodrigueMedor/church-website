import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import adminTheme from '../../theme/adminTheme';
import { PageLoading } from '../common/Loading';

// Check if user is authenticated
const isAuthenticated = () => {
  // Check for token in localStorage
  return !!localStorage.getItem('token');
};

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if user is authenticated
  if (!isAuthenticated() && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For login page, we don't want to show the layout
  if (location.pathname === '/login') {
    return (
      <ThemeProvider theme={adminTheme}>
        <CssBaseline />
        <React.Suspense fallback={<PageLoading />}>
          <Outlet />
        </React.Suspense>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AdminHeader 
          drawerWidth={drawerWidth} 
          handleDrawerToggle={handleDrawerToggle} 
        />
        <AdminSidebar 
          drawerWidth={drawerWidth} 
          mobileOpen={mobileOpen} 
          handleDrawerToggle={handleDrawerToggle} 
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: 'background.default',
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: { sm: `${drawerWidth}px` },
            mt: '64px', // Height of the header
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <React.Suspense fallback={<PageLoading />}>
            <Box sx={{ width: '100%' }}>
              <Outlet />
            </Box>
          </React.Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
