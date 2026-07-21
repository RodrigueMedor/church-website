import { createTheme as createMuiTheme } from '@mui/material/styles';

export const createTheme = (mode = 'light') => createMuiTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#0F4C81',
            light: '#3A7BB8',
            dark: '#0A3560',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#C9A227',
            light: '#E0C060',
            dark: '#A6841E',
            contrastText: '#ffffff',
          },
          background: {
            default: '#FAFAFA',
            paper: '#ffffff',
          },
          text: {
            primary: '#1A1A1A',
            secondary: '#6B7280',
          },
          divider: 'rgba(15, 76, 129, 0.1)',
          success: {
            main: '#4CAF50',
          },
          grey: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        }
      : {
          primary: {
            main: '#6BA3D6',
            light: '#8DBEE6',
            dark: '#4A8FC6',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#D4B445',
            light: '#E8CC70',
            dark: '#B89530',
            contrastText: '#ffffff',
          },
          background: {
            default: '#0F172A',
            paper: '#1E293B',
          },
          text: {
            primary: '#E2E8F0',
            secondary: '#94A3B8',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
          success: {
            main: '#66BB6A',
          },
          grey: {
            50: '#1E293B',
            100: '#2D3A4F',
            200: '#3D4F6A',
            300: '#5A6F8A',
            400: '#7A8FAA',
            500: '#94A3B8',
            600: '#B0BEC9',
            700: '#CCD5DD',
            800: '#E2E8F0',
            900: '#F1F5F9',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      fontSize: '2.75rem',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.05rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(15, 76, 129, 0.04)',
    '0 2px 6px rgba(15, 76, 129, 0.06)',
    '0 4px 12px rgba(15, 76, 129, 0.08)',
    '0 6px 16px rgba(15, 76, 129, 0.1)',
    '0 8px 24px rgba(15, 76, 129, 0.12)',
    '0 12px 32px rgba(15, 76, 129, 0.14)',
    '0 16px 40px rgba(15, 76, 129, 0.16)',
    '0 20px 48px rgba(15, 76, 129, 0.18)',
    '0 24px 56px rgba(15, 76, 129, 0.2)',
    '0 28px 64px rgba(15, 76, 129, 0.22)',
    '0 32px 72px rgba(15, 76, 129, 0.24)',
    '0 36px 80px rgba(15, 76, 129, 0.26)',
    '0 40px 88px rgba(15, 76, 129, 0.28)',
    '0 44px 96px rgba(15, 76, 129, 0.3)',
    '0 48px 104px rgba(15, 76, 129, 0.32)',
    '0 52px 112px rgba(15, 76, 129, 0.34)',
    '0 56px 120px rgba(15, 76, 129, 0.36)',
    '0 60px 128px rgba(15, 76, 129, 0.38)',
    '0 64px 136px rgba(15, 76, 129, 0.4)',
    '0 68px 144px rgba(15, 76, 129, 0.42)',
    '0 72px 152px rgba(15, 76, 129, 0.44)',
    '0 76px 160px rgba(15, 76, 129, 0.46)',
    '0 80px 168px rgba(15, 76, 129, 0.48)',
    '0 84px 176px rgba(15, 76, 129, 0.5)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: mode === 'light' ? '#1A1A1A' : '#E2E8F0',
          backgroundColor: mode === 'light' ? '#FAFAFA' : '#0F172A',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 28px',
          fontWeight: 600,
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: mode === 'light'
            ? '0 4px 14px rgba(15, 76, 129, 0.25)'
            : '0 4px 14px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 8px 25px rgba(15, 76, 129, 0.35)'
              : '0 8px 25px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light'
              ? '0 4px 12px rgba(15, 76, 129, 0.15)'
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${mode === 'light' ? 'rgba(15, 76, 129, 0.06)' : 'rgba(255, 255, 255, 0.06)'}`,
          boxShadow: mode === 'light'
            ? '0 1px 3px rgba(15, 76, 129, 0.04), 0 1px 2px rgba(15, 76, 129, 0.02)'
            : '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 8px 30px rgba(15, 76, 129, 0.12), 0 4px 12px rgba(15, 76, 129, 0.06)'
              : '0 8px 30px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-4px)',
          },
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: mode === 'light' ? '#E5E7EB' : 'rgba(255, 255, 255, 0.12)',
              transition: 'border-color 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: mode === 'light' ? '#9CA3AF' : 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0F4C81',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});

const lightTheme = createTheme('light');
export default lightTheme;
