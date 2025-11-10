import React, { Suspense, useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import i18n from './i18n';
import theme from './theme/theme';
import { CircularProgress, Box } from '@mui/material';

// Auth
import Login from './components/auth/Login';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import TeamMembers from './components/pages/TeamMembers';
import EventsPage from './components/pages/EventsPage';
import EventDetailPage from './components/pages/EventDetailPage';
import MinistriesPage from './components/pages/MinistriesPage';
import SermonsPage from './components/pages/SermonsPage';
import ContactPage from './components/pages/ContactPage';
import GivingPage from './components/pages/GivingPage';
import GetInvolvedPage from './components/pages/GetInvolvedPage';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render when language changes
    const handleLanguageChanged = () => {
      setKey(prevKey => prevKey + 1);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Simple loading component
  const PageLoading = () => (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Router>
          <React.Suspense fallback={<PageLoading />}>
            <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/notre-equipe" element={<TeamMembers />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/evenements/:id" element={<EventDetailPage />} />
                  <Route path="/ministries" element={<MinistriesPage />} />
                  <Route path="/sermons" element={<SermonsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/giving" element={<GivingPage />} />
                  <Route path="/get-involved" element={<GetInvolvedPage />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </React.Suspense>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
