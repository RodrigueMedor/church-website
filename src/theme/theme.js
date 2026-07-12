import { createTheme as createMuiTheme } from '@mui/material/styles';

export const createTheme = (mode = 'light') => createMuiTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1a365d',
            light: '#2c5282',
            dark: '#0f2440',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#c9a84c',
            light: '#f4e4bc',
            dark: '#a8882e',
            contrastText: '#1a365d',
          },
          background: {
            default: '#fafafa',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a1a2e',
            secondary: '#4a5568',
          },
          divider: 'rgba(26, 54, 93, 0.1)',
        }
      : {
          primary: {
            main: '#4a8fd4',
            light: '#6aafe8',
            dark: '#2a6fa0',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#e0b84c',
            light: '#f0d070',
            dark: '#c09030',
            contrastText: '#0f172a',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#e2e8f0',
            secondary: '#94a3b8',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 50,
          padding: '10px 28px',
          fontWeight: 600,
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: mode === 'light'
            ? '0 4px 14px rgba(26, 54, 93, 0.25)'
            : '0 4px 14px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 8px 25px rgba(26, 54, 93, 0.35)'
              : '0 8px 25px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light'
              ? '0 4px 12px rgba(26, 54, 93, 0.15)'
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light'
            ? '0 1px 3px rgba(26, 54, 93, 0.08), 0 1px 2px rgba(26, 54, 93, 0.06)'
            : '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const lightTheme = createTheme('light');
export default lightTheme;
