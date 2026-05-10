import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import i18n from './i18n';
import theme from './theme/theme';

// Auth
import Login from './components/auth/Login';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
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
import ProfessionalChildrenMinistryPage from './components/pages/ProfessionalChildrenMinistryPage';
import ProfessionalYouthMinistryPage from './components/pages/ProfessionalYouthMinistryPage';
import ProfessionalMenMinistryPage from './components/pages/ProfessionalMenMinistryPage';
import ProfessionalWomenMinistryPage from './components/pages/ProfessionalWomenMinistryPage';
import ProfessionalYoungCouplesMinistryPage from './components/pages/ProfessionalYoungCouplesMinistryPage';
import YouthMinistryPage from './components/pages/YouthMinistryPage';
import WomenMinistryPage from './components/pages/WomenMinistryPage';
import MenMinistryPage from './components/pages/MenMinistryPage';
import ChildrenMinistryPage from './components/pages/ChildrenMinistryPage';
import YoungCouplesMinistryPage from './components/pages/YoungCouplesMinistryPage';
import SermonsPage from './components/pages/SermonsPage';
import ProfessionalSermonsPage from './components/pages/ProfessionalSermonsPage';
import ContactPageSimple from './components/pages/ContactPageSimple';
import ProfessionalContactPage from './components/pages/ProfessionalContactPage';
import GivingPage from './components/pages/GivingPage';
import ZellePage from './components/pages/ZellePage';
import GetInvolvedPage from './components/pages/GetInvolvedPage';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  useEffect(() => {
    // Force re-render when language changes
    const handleLanguageChanged = () => {
      // Removed setKey call as key is not used
      // Perhaps re-render is not needed, or use a different method
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);


  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<ProfessionalHomePage />} />
                  <Route path="/home-old" element={<HomePage />} />
                  <Route path="/about" element={<ProfessionalAboutPage />} />
                  <Route path="/about-old" element={<AboutPage />} />
                  <Route path="/notre-equipe" element={<TeamMembers />} />
                  <Route path="/events" element={<ProfessionalEventsPage />} />
                  <Route path="/events-old" element={<EventsPage />} />
                  <Route path="/evenements/:id" element={<EventDetailPage />} />
                  <Route path="/ministries" element={<ProfessionalMinistriesPage />} />
                  <Route path="/ministries-old" element={<MinistriesPage />} />
                  <Route path="/children-ministry" element={<ProfessionalChildrenMinistryPage />} />
                  <Route path="/children-ministry-old" element={<ChildrenMinistryPage />} />
                  <Route path="/youth-ministry" element={<ProfessionalYouthMinistryPage />} />
                  <Route path="/youth-ministry-old" element={<YouthMinistryPage />} />
                  <Route path="/women-ministry" element={<ProfessionalWomenMinistryPage />} />
                  <Route path="/women-ministry-old" element={<WomenMinistryPage />} />
                  <Route path="/men-ministry" element={<ProfessionalMenMinistryPage />} />
                  <Route path="/men-ministry-old" element={<MenMinistryPage />} />
                  <Route path="/young-couples-ministry" element={<ProfessionalYoungCouplesMinistryPage />} />
                  <Route path="/young-couples-ministry-old" element={<YoungCouplesMinistryPage />} />
                  <Route path="/sermons" element={<ProfessionalSermonsPage />} />
                  <Route path="/sermons-old" element={<SermonsPage />} />
                  <Route path="/contact" element={<ProfessionalContactPage />} />
                  <Route path="/contact-old" element={<ContactPageSimple />} />
                  <Route path="/giving" element={<GivingPage />} />
                  <Route path="/zelle" element={<ZellePage />} />
                  <Route path="/get-involved" element={<GetInvolvedPage />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    );
};

export default App;
