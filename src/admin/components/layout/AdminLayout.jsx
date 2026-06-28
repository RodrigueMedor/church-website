import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, ThemeProvider } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import adminTheme from '../../theme/adminTheme';
import { PageLoading } from '../common/Loading';

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const token = localStorage.getItem('adminToken');

  if (!token && !location.pathname.includes('/login')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (location.pathname === '/admin/login') {
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
        <AdminHeader drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
        <AdminSidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: 'background.default',
            marginLeft: { sm: `${drawerWidth}px` },
            mt: '64px',
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
