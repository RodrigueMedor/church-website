import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Menu, 
  MenuItem, 
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode) => {
    setAnchorEl(null);
    
    // Save the language preference first
    localStorage.setItem('i18nextLng', langCode);
    
    // Change the language
    i18n.changeLanguage(langCode)
      .then(() => {
        // Force a hard reload to ensure all translations are applied
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error changing language:', error);
      });
  };
  
  // Add CheckIcon component for the selected language
  const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.00016 16.17L4.83016 12L3.41016 13.41L9.00016 19L21.0002 7.00003L19.5902 5.59003L9.00016 16.17Z" fill="currentColor"/>
    </svg>
  );

  const languages = [
    { code: 'en', name: t('common.english'), nativeName: 'English' },
    { code: 'fr', name: t('common.french'), nativeName: 'Français' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick}
        size="small"
        color="primary"
        startIcon={<LanguageIcon />}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          textTransform: 'none',
          borderRadius: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          px: 2,
          py: 0.8,
          minWidth: 'auto',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        }}
        aria-label="select language"
      >
        <Typography variant="body2" sx={{ 
          textTransform: 'uppercase',
          fontWeight: 500,
          fontSize: '0.8rem',
          lineHeight: 1.2
        }}>
          {currentLanguage.code}
        </Typography>
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            overflow: 'visible',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((language) => (
          <MenuItem 
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
            sx={{
              py: 1,
              px: 2,
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              },
            }}
          >
            <ListItemText>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {language.nativeName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {language.name !== language.nativeName ? `(${language.name})` : ''}
                </Typography>
              </Box>
            </ListItemText>
            {i18n.language === language.code && (
              <ListItemIcon sx={{ ml: 1, minWidth: 'auto' }}>
                <CheckIcon color="primary" fontSize="small" />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
