import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box, Container, Typography, Grid, Card, CardContent, Button, useTheme, alpha, Chip, Stack
} from '@mui/material';
import {
  Groups as GroupIcon, AccessTime as AccessTimeIcon, ArrowForward as ArrowForwardIcon,
  Favorite as FavoriteIcon, FamilyRestroom as FamilyRestroomIcon, Handyman as HandymanIcon,
  ChildCare as ChildCareIcon, Church as ChurchIcon, MusicNote as MusicNoteIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../../cms';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, SectionLabel, Counter } from '../common/animations';

const ministries = [
  { id: 1, title: "Children's Ministry", subtitle: 'Nurturing Young Faith', description: "A safe, engaging environment where children learn about God's love through Bible-based teaching, worship, and fun activities.", icon: <ChildCareIcon />, color: '#4CAF50', image: '/images/banner/children-banner.JPG', meetingTime: 'Sundays at 9:30 AM & Wednesdays at 7:00 PM', link: '/children-ministry', features: ['Bible Stories', 'Fun Activities', 'Safe Environment', 'Dedicated Teachers'] },
  { id: 2, title: 'Youth Ministry', subtitle: 'Building Future Leaders', description: 'A dynamic community for teenagers to grow in faith, build meaningful relationships, and discover their purpose.', icon: <GroupIcon />, color: '#2196F3', image: '/images/banner/youth-banner.jpg', meetingTime: 'Saturdays at 5:00 PM & Sundays at 11:30 AM', link: '/youth-ministry', features: ['Bible Studies', 'Fellowship', 'Community Service', 'Leadership Training'] },
  { id: 3, title: "Men's Ministry", subtitle: 'Strong Men of Faith', description: 'Building strong men of faith through fellowship, Bible study, service opportunities, and recreational activities.', icon: <HandymanIcon />, color: '#FF9800', image: '/images/banner/men-banner.JPG', meetingTime: 'Wednesdays at 7:00 PM & Saturdays at 10:00 AM', link: '/men-ministry', features: ['Bible Study', 'Service Projects', 'Fellowship', 'Mentorship'] },
  { id: 4, title: "Women's Ministry", subtitle: 'Sisters in Christ', description: "A supportive community for women to grow in faith, build lasting friendships, and serve together in Christ's love.", icon: <FavoriteIcon />, color: '#9C27B0', image: '/images/banner/women-banner.jpg', meetingTime: 'Tuesdays at 7:00 PM & Saturdays at 10:00 AM', link: '/women-ministry', features: ['Prayer Groups', 'Bible Studies', 'Fellowship', 'Outreach'] },
  { id: 5, title: 'Young Couples Ministry', subtitle: 'Strengthening Marriages', description: 'Strengthening marriages and building Christ-centered relationships through fellowship and shared experiences.', icon: <FamilyRestroomIcon />, color: '#F44336', image: '/images/banner/ycm-banner.jpg', meetingTime: 'Fridays at 7:30 PM & Saturdays at 6:00 PM', link: '/young-couples-ministry', features: ['Marriage Enrichment', 'Couples Fellowship', 'Parenting Support', 'Date Nights'] },
  { id: 6, title: 'Worship & Music Ministry', subtitle: 'Leading People to His Presence', description: 'Leading the congregation in heartfelt worship through music, song, and creative arts to glorify God.', icon: <MusicNoteIcon />, color: '#C9A227', image: '/images/banner/banner-sermont.jpg', meetingTime: 'Wednesdays at 7:00 PM & Sundays at 9:00 AM', link: '/worship-ministry', features: ['Choir', 'Praise Team', 'Instrumental', 'Sound & Media'] },
];

const ProfessionalMinistriesPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const content = usePageContent('ministries');
  const activeMinistries = content.ministries?.length
    ? content.ministries.map((m, i) => ({ ...(ministries.find(d => String(d.id) === String(m.id)) || ministries[i % ministries.length]), ...m }))
    : ministries;

  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: `linear-gradient(135deg, rgba(10,53,96,0.85), rgba(15,76,129,0.85)), url(/images/banner/pastor-sermon_1.JPG) center 10% / cover no-repeat`,
        color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 12, md: 18 }, position: 'relative',
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <Box textAlign="center" maxWidth="800px" mx="auto">
              <SectionLabel sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }}>Our Ministries</SectionLabel>
              <Typography variant="h1" component="h1" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                {content.hero?.title || t('ministriesPage.heroTitle', 'Our Ministries')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.7, mb: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                {content.hero?.subtitle || '"Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace."'}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', opacity: 0.7, color: '#C9A227', fontWeight: 500 }}>
                {content.scripture || '1 Peter 4:10'}
              </Typography>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, py: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <StaggerContainer stagger={0.1}>
            <Grid container spacing={3} justifyContent="center">
              {[
                { value: '6', label: t('ministriesPage.stats.activeMinistries', 'Active Ministries') },
                { value: '210', label: t('ministriesPage.stats.membersEngaged', 'Members Engaged'), suffix: '+' },
                { value: '15', label: t('ministriesPage.stats.weeklyActivities', 'Weekly Activities'), suffix: '+' },
                { value: 'All', label: t('ministriesPage.stats.agesWelcome', 'Ages Welcome') },
              ].map((stat, i) => (
                <Grid item xs={6} sm={3} key={i}>
                  <StaggerItem>
                    <Box textAlign="center">
                      <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
                        {stat.value === 'All' ? stat.value : <><Counter end={parseInt(stat.value)} suffix={stat.suffix || ''} duration={2} /></>}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.label}</Typography>
                    </Box>
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>

      {/* Ministries Grid */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Box textAlign="center" mb={8}>
              <SectionLabel>Explore</SectionLabel>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                {t('ministriesPage.tagline', 'Explore Our Ministries')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
                {t('ministriesPage.description', 'Discover how you can get involved and grow in your faith through our various ministries.')}
              </Typography>
            </Box>
          </FadeIn>
          <StaggerContainer stagger={0.12}>
            <Grid container spacing={4}>
              {activeMinistries.map((ministry) => (
                <Grid item xs={12} md={6} key={ministry.id}>
                  <StaggerItem>
                    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%', borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider', transition: 'all 0.35s ease', '&:hover': { boxShadow: '0 20px 50px rgba(15, 76, 129, 0.1)', transform: 'translateY(-4px)', borderColor: 'transparent' } }}>
                      <Box sx={{ width: { xs: '100%', sm: 200 }, minHeight: { xs: 140, sm: 'auto' }, flexShrink: 0, background: `linear-gradient(rgba(10,26,48,0.4), rgba(10,26,48,0.4)), url(${ministry.image})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease', '&:hover': { background: `linear-gradient(rgba(10,26,48,0.2), rgba(10,26,48,0.2)), url(${ministry.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } }}>
                        <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: alpha('#fff', 0.2), backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', '& svg': { fontSize: 28 } }}>
                          {ministry.icon}
                        </Box>
                      </Box>
                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, '&:last-child': { pb: 3 } }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', mb: 0.3 }}>{ministry.title}</Typography>
                        <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: '0.7rem', mb: 1.5 }}>{ministry.subtitle}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, flexGrow: 1, fontSize: '0.85rem' }}>{ministry.description}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, p: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.04), borderRadius: 2 }}>
                          <AccessTimeIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.78rem' }}>{ministry.meetingTime}</Typography>
                        </Box>
                        <Stack direction="row" flexWrap="wrap" gap={0.6} mb={2}>
                          {ministry.features.map((feature, idx) => (
                            <Chip key={idx} label={feature} size="small" sx={{ fontWeight: 500, fontSize: '0.68rem', height: 24, bgcolor: alpha(theme.palette.primary.main, 0.05), color: 'primary.main', borderRadius: 1.5 }} />
                          ))}
                        </Stack>
                        <Button component={RouterLink} to={ministry.link} variant="outlined" size="small" endIcon={<ArrowForwardIcon sx={{ fontSize: '0.8rem' }} />} sx={{ alignSelf: 'flex-start', fontWeight: 600, px: 2.5, py: 0.6, fontSize: '0.78rem', borderRadius: 50, borderColor: alpha(theme.palette.primary.main, 0.3), '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: '#fff' } }}>
                          {t('ministriesPage.learnMore', 'Learn More')}
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>

      {/* CTA */}
      <FadeIn>
        <Box sx={{ bgcolor: '#0F4C81', color: '#fff', py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 2 }}>{t('ministriesPage.ctaTitle', 'Ready to Get Involved?')}</Typography>
            <Typography variant="body1" sx={{ mb: 5, opacity: 0.85, maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
              {t('ministriesPage.ctaDescription', 'Join a community that will support you in your faith journey.')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
              <Button component={RouterLink} to="/contact" variant="outlined" sx={{ px: 4, borderColor: '#fff', color: '#fff', fontWeight: 600, '&:hover': { bgcolor: '#fff', color: '#0F4C81' } }}>
                {t('ministriesPage.contactUs', 'Contact Us')}
              </Button>
              <Button component={RouterLink} to="/events" variant="contained" sx={{ px: 4, bgcolor: 'secondary.main', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: 'secondary.dark' } }}>
                {t('ministriesPage.viewEvents', 'View Events')}
              </Button>
            </Stack>
          </Container>
        </Box>
      </FadeIn>
    </Box>
  );
};

export default ProfessionalMinistriesPage;
