import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Container, Typography, Grid, Button, Paper, Card, CardContent, Avatar,
  useTheme, useMediaQuery, Divider, Chip, IconButton, Dialog, DialogContent, alpha, Stack
} from '@mui/material';
import {
  Close as CloseIcon, Church as ChurchIcon, Visibility as VisionIcon, Favorite as MissionIcon,
  Group as GroupIcon, Book as BookIcon, MusicNote as MusicIcon, Favorite as HeartIcon,
  ArrowForward as ArrowForwardIcon, EmailOutlined as EmailIcon, Phone as PhoneIcon, Star
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { usePageContent } from '../../cms';
import { pageDefaults } from '../../cms/defaults';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, SectionLabel, Counter } from '../common/animations';

const iconMap = {
  Book: <BookIcon sx={{ fontSize: 32, color: 'white' }} />,
  Music: <MusicIcon sx={{ fontSize: 32, color: 'white' }} />,
  Group: <GroupIcon sx={{ fontSize: 32, color: 'white' }} />,
  Heart: <HeartIcon sx={{ fontSize: 32, color: 'white' }} />,
};

const ProfessionalAboutPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const content = usePageContent('about');
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const staffData = (content.staffData || []).length
    ? content.staffData.map(s => ({
        name: s.name, role: s.role, bio: s.bio, fullBio: s.fullBio || s.bio,
        email: s.email || '', phone: s.phone || '', experience: s.experience || '',
        image: s.image || '',
      }))
    : [
        { name: 'Rev. JB Fritzner Brouard', role: 'Pastor', bio: 'Pastor Jean Smith has been leading FHBCK since 2010...', fullBio: 'Originally from Haiti, Reverend Brouard pursued theological studies in the United States and began his ministry in Brooklyn.', email: 'pastor@fhbck.org', phone: '(407) 218-0827', experience: '20+ years', image: '/images/staff/pastor-senior.jpg' },
      ];

  const defaultLeaders = pageDefaults.about?.otherLeaders || [];
  const leadersSource = (content.otherLeaders || []).length ? content.otherLeaders : defaultLeaders;
  const otherLeadersData = leadersSource.map(s => ({ name: s.name, role: s.role, bio: s.bio || '', email: s.email || '', image: s.image || '' }));

  const coreValues = (content.coreValues || []).length
    ? content.coreValues.map((cv, i) => ({
        title: cv.title, description: cv.description,
        icon: iconMap[cv.icon] || <Star sx={{ fontSize: 32, color: 'white' }} />,
        color: cv.color && /^#/.test(cv.color) ? cv.color : ['#0F4C81', '#C9A227', '#4CAF50', '#F57C00'][i] || '#0F4C81',
        features: cv.features || [],
      }))
    : [
        { title: t('professionalAbout.coreValuesList.biblicalFoundation.title'), description: t('professionalAbout.coreValuesList.biblicalFoundation.description'), icon: <BookIcon sx={{ fontSize: 32, color: 'white' }} />, color: '#0F4C81', features: t('professionalAbout.coreValuesList.biblicalFoundation.features', { returnObjects: true }) },
        { title: t('professionalAbout.coreValuesList.passionateWorship.title'), description: t('professionalAbout.coreValuesList.passionateWorship.description'), icon: <MusicIcon sx={{ fontSize: 32, color: 'white' }} />, color: '#C9A227', features: t('professionalAbout.coreValuesList.passionateWorship.features', { returnObjects: true }) },
        { title: t('professionalAbout.coreValuesList.unitedCommunity.title'), description: t('professionalAbout.coreValuesList.unitedCommunity.description'), icon: <GroupIcon sx={{ fontSize: 32, color: 'white' }} />, color: '#4CAF50', features: t('professionalAbout.coreValuesList.unitedCommunity.features', { returnObjects: true }) },
        { title: t('professionalAbout.coreValuesList.missionDriven.title'), description: t('professionalAbout.coreValuesList.missionDriven.description'), icon: <HeartIcon sx={{ fontSize: 32, color: 'white' }} />, color: '#F57C00', features: t('professionalAbout.coreValuesList.missionDriven.features', { returnObjects: true }) },
      ];

  const stats = (content.stats || []).length
    ? content.stats.map(s => ({ number: s.number, label: s.label }))
    : [
        { number: '1985', label: t('professionalAbout.stats.founded') },
        { number: '500', label: t('professionalAbout.stats.members'), suffix: '+' },
        { number: '5', label: t('professionalAbout.stats.ministries') },
        { number: '3', label: t('professionalAbout.stats.services') },
      ];

  const handleOpenModal = (member) => { setSelectedMember(member); setOpenModal(true); };
  const handleCloseModal = () => { setOpenModal(false); setTimeout(() => setSelectedMember(null), 300); };

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* Hero */}
      <Box sx={{
        position: 'relative', minHeight: '65vh',
        background: 'linear-gradient(135deg, #0A3560 0%, #0F4C81 50%, #C9A227 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          background: 'url(/images/banner/pastor-sermon_1.JPG)', backgroundSize: 'cover', backgroundPosition: 'center 20%', opacity: 0.12,
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <FadeIn>
            <Box textAlign="center" color="white">
              <SectionLabel sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', mb: 3 }}>About Us</SectionLabel>
              <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 3, lineHeight: 1.1 }}>
                {content.hero?.title || t('professionalAbout.title')}
              </Typography>
              <Typography variant="h5" sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}>
                {content.hero?.subtitle || t('professionalAbout.subtitle')}
              </Typography>
            </Box>
          </FadeIn>
          <StaggerContainer stagger={0.15} delay={0.3}>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {stats.map((stat, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <StaggerItem>
                    <Paper elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, p: 3, textAlign: 'center', color: '#fff' }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
                        <Counter end={parseInt(stat.number) || 0} suffix={stat.suffix || ''} duration={2} />
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>{stat.label}</Typography>
                    </Paper>
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Welcome */}
        <FadeIn>
          <Box textAlign="center" mb={10}>
            <SectionLabel>{t('professionalAbout.welcomeTitle')}</SectionLabel>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 3, color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              {t('professionalAbout.welcomeTitle')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.8, mb: 3 }}>
              {t('professionalAbout.welcomeDescription')}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
              {t('professionalAbout.missionStatement')}
            </Typography>
          </Box>
        </FadeIn>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {[
            { icon: <MissionIcon />, title: t('professionalAbout.ourMission'), desc: content.mission || t('professionalAbout.missionDescription'), color: '#0F4C81' },
            { icon: <VisionIcon />, title: t('professionalAbout.ourVision'), desc: content.vision || t('professionalAbout.visionDescription'), color: '#C9A227' },
          ].map((item, i) => (
            <Grid item xs={12} md={6} key={i}>
              <FadeIn delay={i * 0.15}>
                <Card sx={{ height: '100%', borderRadius: 5, border: `1px solid ${alpha(item.color, 0.1)}`, transition: 'all 0.35s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px ${alpha(item.color, 0.15)}` } }}>
                  <CardContent sx={{ p: 5, textAlign: 'center' }}>
                    <Box sx={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${item.color}, ${alpha(item.color, 0.7)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, boxShadow: `0 8px 24px ${alpha(item.color, 0.25)}` }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: 32, color: 'white' } })}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>{item.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>{item.desc}</Typography>
                  </CardContent>
                </Card>
              </FadeIn>
            </Grid>
          ))}
        </Grid>

        {/* Core Values */}
        <FadeIn>
          <Box textAlign="center" mb={8}>
            <SectionLabel>Our Values</SectionLabel>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              {t('professionalAbout.coreValues')}
            </Typography>
          </Box>
        </FadeIn>
        <StaggerContainer stagger={0.12}>
          <Grid container spacing={3}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StaggerItem>
                  <Card sx={{ height: '100%', borderRadius: 5, border: `1px solid ${alpha(value.color, 0.08)}`, transition: 'all 0.35s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 40px ${alpha(value.color, 0.12)}` } }}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ width: 68, height: 68, borderRadius: '50%', background: `linear-gradient(135deg, ${value.color}, ${alpha(value.color, 0.7)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, boxShadow: `0 8px 20px ${alpha(value.color, 0.2)}` }}>
                        {value.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>{value.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>{value.description}</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={0.8} justifyContent="center">
                        {value.features.map((feature, idx) => (
                          <Chip key={idx} label={feature} size="small" sx={{ bgcolor: alpha(value.color, 0.08), color: value.color, fontWeight: 500, fontSize: '0.72rem' }} />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>

        {/* Pastoral Team */}
        <FadeIn>
          <Box textAlign="center" mb={8} mt={10}>
            <SectionLabel>Our Team</SectionLabel>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              {t('professionalAbout.meetOurTeam')}
            </Typography>
          </Box>
        </FadeIn>
        <StaggerContainer stagger={0.15}>
          <Grid container spacing={4} justifyContent="center">
            {staffData.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StaggerItem>
                  <Card sx={{ height: '100%', borderRadius: 5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', transition: 'all 0.35s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px rgba(15, 76, 129, 0.12)' } }}>
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <Avatar src={member.image || undefined} imgProps={{ style: { objectPosition: 'top center' } }} sx={{ width: '100%', height: 260, borderRadius: 0, bgcolor: 'primary.main', fontSize: '2.5rem' }}>
                        {(member.name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                      </Avatar>
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', p: 2, pt: 6 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>{member.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>{member.role}</Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>{member.bio}</Typography>
                      <Button variant="outlined" size="small" onClick={() => handleOpenModal(member)} endIcon={<ArrowForwardIcon />} sx={{ borderColor: 'primary.main', color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.main', color: '#fff' } }}>
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>

        {/* Other Leaders */}
        {otherLeadersData.length > 0 && (
          <Box sx={{ mt: 10 }}>
            <FadeIn>
              <Box textAlign="center" mb={6}>
                <SectionLabel>Leadership</SectionLabel>
                <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                  {t('professionalAbout.otherLeaders')}
                </Typography>
              </Box>
            </FadeIn>
            <StaggerContainer stagger={0.12}>
              <Grid container spacing={3} justifyContent="center">
                {otherLeadersData.map((member, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <StaggerItem>
                      <Card sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', transition: 'all 0.35s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 36px rgba(15, 76, 129, 0.1)' } }}>
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                          <Avatar src={member.image || undefined} imgProps={{ style: { objectPosition: 'top center' } }} sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: '3px solid', borderColor: 'secondary.main', bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                            {(member.name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>{member.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600, mb: 1.5 }}>{member.role}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{member.bio}</Typography>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  </Grid>
                ))}
              </Grid>
            </StaggerContainer>
          </Box>
        )}

        {/* CTA */}
        <FadeIn>
          <Box sx={{ mt: 10, py: 6, background: 'linear-gradient(135deg, #0F4C81, #0A3560)', borderRadius: 6, textAlign: 'center', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', inset: 0, background: 'url(/images/banner/pastor-sermon_1.JPG)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 } }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 2, color: '#fff', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                {t('professionalAbout.joinOurFamily')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
                {t('professionalAbout.joinDescription')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button variant="outlined" component={RouterLink} to="/contact" sx={{ borderColor: '#fff', color: '#fff', fontWeight: 600, px: 4, '&:hover': { bgcolor: '#fff', color: '#0F4C81' } }}>
                  {t('contactUs')}
                </Button>
                <Button variant="contained" component={RouterLink} to="/events" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: 'secondary.main', color: '#fff', fontWeight: 700, px: 4, '&:hover': { bgcolor: 'secondary.dark' } }}>
                  {t('about.visitUs')}
                </Button>
              </Stack>
            </Container>
          </Box>
        </FadeIn>
      </Container>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 5, overflow: 'hidden' } }}>
        <DialogContent sx={{ p: 0 }}>
          {selectedMember && (
            <Box>
              <Box sx={{ p: 4, background: 'linear-gradient(135deg, #0F4C81, #0A3560)', color: '#fff', position: 'relative' }}>
                <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 16, right: 16, color: '#fff' }}><CloseIcon /></IconButton>
                <Avatar src={selectedMember.image || undefined} imgProps={{ style: { objectPosition: 'top center' } }} sx={{ width: 200, height: 200, mx: 'auto', mb: 2, border: '3px solid rgba(255,255,255,0.5)', bgcolor: 'rgba(255,255,255,0.2)', fontSize: '2.5rem' }}>
                  {(selectedMember.name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>{selectedMember.name}</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', opacity: 0.9, color: 'secondary.main', fontWeight: 600 }}>{selectedMember.role}</Typography>
              </Box>
              <Box sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>{selectedMember.fullBio || selectedMember.bio}</Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {selectedMember.email && <Button variant="outlined" startIcon={<EmailIcon />} href={`mailto:${selectedMember.email}`} sx={{ borderColor: 'primary.main', color: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: '#fff' } }}>{selectedMember.email}</Button>}
                  {selectedMember.phone && <Button variant="outlined" startIcon={<PhoneIcon />} href={`tel:${selectedMember.phone}`} sx={{ borderColor: 'secondary.main', color: 'secondary.main', '&:hover': { bgcolor: 'secondary.main', color: '#fff' } }}>{selectedMember.phone}</Button>}
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfessionalAboutPage;
