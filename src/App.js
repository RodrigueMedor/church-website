import React, { useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import i18n from './i18n';
import { createTheme } from './theme/theme';
import { ThemeModeProvider, useThemeMode } from './theme/ThemeModeContext';

import Login from './components/auth/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './components/pages/HomePage';
import ProfessionalHomePage from './components/pages/ProfessionalHomePage';
import AboutPage from './components/pages/AboutPage';
import ProfessionalAboutPage from './components/pages/ProfessionalAboutPage';
import TeamMembers from './components/pages/TeamMembers';
import EventsPage from './components/pages/EventsPage';
import ProfessionalEventsPage from './components/pages/ProfessionalEventsPage';
import EventDetailPage from './components/pages/EventDetailPage';
import MinistriesPage from './components/pages/MinistriesPage';
import ProfessionalMinistriesPage from './components/pages/ProfessionalMinistriesPage';
import CMSMinistryPage from './components/pages/CMSMinistryPage';

import SermonsPage from './components/pages/SermonsPage';
import ProfessionalSermonsPage from './components/pages/ProfessionalSermonsPage';
import ContactPageSimple from './components/pages/ContactPageSimple';
import ProfessionalContactPage from './components/pages/ProfessionalContactPage';
import GivingPage from './components/pages/GivingPage';
import ZellePage from './components/pages/ZellePage';
import GetInvolvedPage from './components/pages/GetInvolvedPage';
import PrivacyPage from './components/pages/PrivacyPage';
import TermsPage from './components/pages/TermsPage';
import NotFoundPage from './components/pages/NotFoundPage';

import AdminRoutes from './admin/AppRoutes';
import { ContentProvider } from './admin/context/ContentContext';
import { CMSProvider } from './cms/CMSContext';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.35,
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><ProfessionalHomePage /></AnimatedPage>} />
            <Route path="/home-old" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/about" element={<AnimatedPage><ProfessionalAboutPage /></AnimatedPage>} />
            <Route path="/about-old" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
            <Route path="/notre-equipe" element={<AnimatedPage><TeamMembers /></AnimatedPage>} />
            <Route path="/events" element={<AnimatedPage><ProfessionalEventsPage /></AnimatedPage>} />
            <Route path="/events-old" element={<AnimatedPage><EventsPage /></AnimatedPage>} />
            <Route path="/evenements/:id" element={<AnimatedPage><EventDetailPage /></AnimatedPage>} />
            <Route path="/ministries" element={<AnimatedPage><ProfessionalMinistriesPage /></AnimatedPage>} />
            <Route path="/ministries-old" element={<AnimatedPage><MinistriesPage /></AnimatedPage>} />
            <Route path="/children-ministry" element={<AnimatedPage><CMSMinistryPage /></AnimatedPage>} />
            <Route path="/youth-ministry" element={<AnimatedPage><CMSMinistryPage /></AnimatedPage>} />
            <Route path="/women-ministry" element={<AnimatedPage><CMSMinistryPage /></AnimatedPage>} />
            <Route path="/men-ministry" element={<AnimatedPage><CMSMinistryPage /></AnimatedPage>} />
            <Route path="/young-couples-ministry" element={<AnimatedPage><CMSMinistryPage /></AnimatedPage>} />
            <Route path="/worship-ministry" element={<AnimatedPage><CMSMinistryPage /></AnimatedPage>} />
            <Route path="/sermons" element={<AnimatedPage><ProfessionalSermonsPage /></AnimatedPage>} />
            <Route path="/sermons-old" element={<AnimatedPage><SermonsPage /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><ProfessionalContactPage /></AnimatedPage>} />
            <Route path="/contact-old" element={<AnimatedPage><ContactPageSimple /></AnimatedPage>} />
            <Route path="/giving" element={<AnimatedPage><GivingPage /></AnimatedPage>} />
            <Route path="/zelle" element={<AnimatedPage><ZellePage /></AnimatedPage>} />
            <Route path="/get-involved" element={<AnimatedPage><GetInvolvedPage /></AnimatedPage>} />
            <Route path="/privacy" element={<AnimatedPage><PrivacyPage /></AnimatedPage>} />
            <Route path="/terms" element={<AnimatedPage><TermsPage /></AnimatedPage>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function AppContent() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createTheme(mode), [mode]);

  useEffect(() => {
    const handleLanguageChanged = () => {};
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CMSProvider>
        <ContentProvider>
          <Router>
            <Routes>
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </Router>
        </ContentProvider>
      </CMSProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeModeProvider>
        <AppContent />
      </ThemeModeProvider>
    </I18nextProvider>
  );
}

export default App;
