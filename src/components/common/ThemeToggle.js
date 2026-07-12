import React from 'react';
import { useThemeMode } from '../../theme/ThemeModeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  return (
    <IconButton
      onClick={toggleMode}
      size="small"
      aria-label="toggle theme"
      sx={{
        color: 'text.primary',
        borderRadius: '50%',
        transition: 'all 0.25s ease',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
    </IconButton>
  );
};

export default ThemeToggle;
