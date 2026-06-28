import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const TermsPage = () => {
  const { t } = useTranslation();

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
            Terms of Use
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
          >
            {t('terms.subtitle', 'Guidelines for using our website')}
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          {t('terms.lastUpdated', 'Last updated: January 2024')}
        </Typography>

        <Section title="Acceptance of Terms">
          By accessing and using this website, you agree to comply with and be bound by 
          these Terms of Use. If you do not agree with any part of these terms, please 
          do not use our website.
        </Section>

        <Section title="Use of Content">
          All content on this website, including text, images, graphics, and videos, is 
          the property of First Haitian Baptist Church of Kissimmee unless otherwise noted. 
          You may not reproduce, distribute, or modify any content without prior written permission.
        </Section>

        <Section title="Donations">
          All donations made through this website are voluntary and non-refundable. 
          You will receive a receipt for tax purposes via email. Please consult your 
          tax advisor regarding deductibility.
        </Section>

        <Section title="External Links">
          Our website may contain links to third-party websites. We are not responsible 
          for the content or practices of these external sites.
        </Section>

        <Section title="Changes to Terms">
          We reserve the right to modify these terms at any time. Changes will be 
          effective immediately upon posting to this page. Your continued use of the 
          site constitutes acceptance of the updated terms.
        </Section>

        <Section title="Contact">
          For questions about these terms, please contact us at{' '}
          <Typography component="span" sx={{ color: 'primary.main' }}>
            info@fhbck.org
          </Typography>
          {' '}or call (407) 218-0827.
        </Section>
      </Container>
    </Box>
  );
};

const Section = ({ title, children }) => {
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
          borderBottom: '2px solid',
          borderColor: 'primary.main',
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

export default TermsPage;
