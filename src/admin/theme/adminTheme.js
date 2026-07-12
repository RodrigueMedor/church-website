import { createTheme } from '@mui/material/styles';

export const createAdminTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#fff' },
          secondary: { main: '#dc004e', light: '#ff4081', dark: '#9a0036', contrastText: '#fff' },
          background: { default: '#f5f7fa', paper: '#ffffff' },
          text: { primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)', disabled: 'rgba(0, 0, 0, 0.38)' },
          divider: 'rgba(0, 0, 0, 0.12)',
        }
      : {
          primary: { main: '#64b5f6', light: '#90caf9', dark: '#42a5f5', contrastText: '#000' },
          secondary: { main: '#f06292', light: '#f48fb1', dark: '#ec407a', contrastText: '#000' },
          background: { default: '#121212', paper: '#1e1e1e' },
          text: { primary: '#e0e0e0', secondary: '#a0a0a0', disabled: '#6c6c6c' },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.2 },
    h3: { fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.2 },
    h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2 },
    h5: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2 },
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: '8px 16px', fontWeight: 500 },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.1)'
            : '0 1px 3px rgba(0,0,0,0.4)',
          borderRadius: 8,
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.1)'
            : '0 1px 3px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: mode === 'light'
            ? '1px 0 10px rgba(0,0,0,0.08)'
            : '1px 0 10px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          padding: '8px 12px',
          '&.Mui-selected': {
            backgroundColor: mode === 'light'
              ? 'rgba(25, 118, 210, 0.08)'
              : 'rgba(100, 181, 246, 0.15)',
            '&:hover': {
              backgroundColor: mode === 'light'
                ? 'rgba(25, 118, 210, 0.12)'
                : 'rgba(100, 181, 246, 0.2)',
            },
          },
          '&:hover': {
            backgroundColor: mode === 'light'
              ? 'rgba(0, 0, 0, 0.04)'
              : 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: mode === 'light' ? '#fff' : 'rgba(255,255,255,0.05)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
          },
        },
      },
    },
  },
});

const adminTheme = createAdminTheme('light');
export default adminTheme;
