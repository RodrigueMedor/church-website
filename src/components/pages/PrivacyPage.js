import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../../cms';

const PrivacyPage = () => {
  const { t } = useTranslation();
  const content = usePageContent('privacy');
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #0f2440 0%, #1a365d 50%, #2c5282 100%)`,
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.1) 0%, transparent 50%)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#fff',
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Playfair Display", serif',
              mb: 2,
            }}
          >
            {content.title || t('privacy.title', 'Privacy Policy')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
          >
            {t('privacy.subtitle', 'How we protect and handle your information')}
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          {t('privacy.lastUpdated', 'Last updated: January 2024')}
        </Typography>

        <Section title={t('privacy.sectionCollect', 'Information We Collect')}>
          {t('privacy.sectionCollectText', 'We collect information you provide directly, such as when you fill out contact forms, register for events, or make donations. This may include your name, email address, phone number, and mailing address.')}
        </Section>

        <Section title={t('privacy.sectionUse', 'How We Use Your Information')}>
          {t('privacy.sectionUseText', 'We use the information we collect to communicate with you about church activities, process donations, respond to your inquiries, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.')}
        </Section>

        <Section title={t('privacy.sectionDonations', 'Donation Processing')}>
          {t('privacy.sectionDonationsText', 'When you make a donation, your payment information is processed securely through our payment partners. We do not store full credit card numbers on our servers.')}
        </Section>

        <Section title={t('privacy.sectionCookies', 'Cookies')}>
          {t('privacy.sectionCookiesText', 'Our website may use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.')}
        </Section>

        <Section title={t('privacy.sectionContact', 'Contact Us')}>
          {t('privacy.sectionContactText', 'If you have questions about this privacy policy, please contact us at')}{' '}
          <Typography component="span" sx={{ color: theme.palette.primary.main }}>
            info@fhbck.org
          </Typography>
          {' '}{t('privacy.sectionContactOrCall', 'or call')} (407) 218-0827.
        </Section>
      </Container>
    </Box>
  );
};

const Section = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          fontFamily: '"Playfair Display", serif',
          mb: 2,
          pb: 1,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          display: 'inline-block',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
        {children}
      </Typography>
    </Box>
  );
};

export default PrivacyPage;
