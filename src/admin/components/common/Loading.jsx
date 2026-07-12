import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message, fullScreen = true }) => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={fullScreen ? '100vh' : '200px'}
      width="100%"
      p={3}
    >
      <CircularProgress 
        size={fullScreen ? 60 : 40} 
        thickness={4}
        color="primary" 
        sx={{ mb: 2 }}
      />
      <Typography 
        variant={fullScreen ? 'h6' : 'body1'}
        color="textSecondary"
        align="center"
      >
        {message || t('admin.loading')}
      </Typography>
    </Box>
  );
};

export const InlineLoading = ({ size = 20, color = 'primary' }) => (
  <Box 
    display="inline-flex" 
    alignItems="center" 
    justifyContent="center"
    width={size}
    height={size}
  >
    <CircularProgress size={size} color={color} />
  </Box>
);

export const PageLoading = () => (
  <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgcolor="background.paper"
    zIndex={1400}
  >
    <CircularProgress size={60} thickness={4} />
  </Box>
);

export const ButtonLoading = ({ size = 24, color = 'inherit' }) => (
  <Box 
    display="inline-flex" 
    alignItems="center" 
    justifyContent="center"
    width={size}
    height={size}
  >
    <CircularProgress 
      size={size} 
      color={color} 
      thickness={4}
      sx={{ color: color === 'inherit' ? 'currentColor' : undefined }}
    />
  </Box>
);

export default Loading;
