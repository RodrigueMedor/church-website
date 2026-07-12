import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, IconButton, Toolbar, Typography, Box, Avatar, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import { deepOrange } from '@mui/material/colors';
import { useThemeMode } from '../../../theme/ThemeModeContext';

const AdminHeader = ({ drawerWidth, handleDrawerToggle }) => {
  const { t, i18n } = useTranslation();
  const { mode, toggleMode } = useThemeMode();

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<LanguageIcon />}
            label={i18n.language === 'en' ? 'EN' : 'FR'}
            variant="outlined"
            size="small"
            onClick={toggleLanguage}
            sx={{ cursor: 'pointer', fontWeight: 600 }}
          />
          <IconButton color="inherit" onClick={toggleMode} aria-label="toggle theme">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}>A</Avatar>
            <Typography variant="body1" color="text.primary">
              {t('admin.sidebar.admin')}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
