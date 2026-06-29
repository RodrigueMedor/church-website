import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  alpha,
  Chip,
  Stack,
  Avatar,
  Paper
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
  Church as ChurchIcon,
  Email as EmailIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const MinistriesLayout = ({
  accentColor,
  heroTitle,
  heroSubtitle,
  heroVerse,
  heroImage,
  heroImagePosition,
  heroStats,
  welcomeTitle,
  welcomeDescription,
  activities,
  schedule,
  leaders,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaButtonLink,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: heroImagePosition || 'center',
          backgroundRepeat: 'no-repeat',
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, md: 14 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center" maxWidth="800px" mx="auto">
            <ChurchIcon sx={{ fontSize: 48, color: alpha('#fff', 0.8), mb: 2 }} />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              {heroTitle}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                lineHeight: 1.6,
                mb: 2,
                fontSize: { xs: '1rem', md: '1.15rem' },
              }}
            >
              {heroSubtitle}
            </Typography>
            {heroVerse && (
              <Typography
                variant="body1"
                sx={{ fontStyle: 'italic', opacity: 0.7, fontWeight: 500 }}
              >
                {heroVerse}
              </Typography>
            )}

            {/* Stats */}
            {heroStats && (
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                {heroStats.map((stat, i) => (
                  <Grid item xs={6} sm={3} key={i}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 2, md: 2.5 },
                        bgcolor: alpha('#fff', 0.12),
                        backdropFilter: 'blur(8px)',
                        borderRadius: 2,
                        border: `1px solid ${alpha('#fff', 0.15)}`,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#fff' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, color: '#fff' }}>
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Welcome */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, color: theme.palette.primary.dark, mb: 2 }}
          >
            {welcomeTitle}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '750px', mx: 'auto', lineHeight: 1.7 }}
          >
            {welcomeDescription}
          </Typography>
        </Box>

        {/* Activities */}
        {activities && (
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, textAlign: 'center', color: theme.palette.primary.dark, mb: 5 }}
            >
              {t('ministry.whatWeDo', 'What We Do')}
            </Typography>
            <Grid container spacing={3}>
              {activities.map((activity, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      '&:hover': {
                        boxShadow: `0 12px 40px ${alpha(accentColor, 0.15)}`,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          bgcolor: alpha(accentColor, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2.5,
                          color: accentColor,
                          '& .MuiSvgIcon-root': { fontSize: 32 },
                        }}
                      >
                        {activity.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: theme.palette.primary.dark }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                        {activity.description}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={0.8} justifyContent="center">
                        {(activity.features || []).map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: alpha(accentColor, 0.08),
                              color: accentColor,
                              fontWeight: 600,
                              fontSize: '0.72rem',
                              height: 26,
                            }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Schedule */}
        {schedule && (
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, textAlign: 'center', color: theme.palette.primary.dark, mb: 5 }}
            >
              {t('ministry.whenWeMeet', 'When We Meet')}
            </Typography>
            <Grid container spacing={3}>
              {schedule.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: accentColor,
                        boxShadow: `0 4px 20px ${alpha(accentColor, 0.1)}`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarIcon sx={{ mr: 1.5, color: accentColor, fontSize: 24 }} />
                      <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
                        {item.day}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <AccessTimeIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.time}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: accentColor, mb: 0.5 }}>
                      {item.activity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Leaders */}
        {leaders && (
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, textAlign: 'center', color: theme.palette.primary.dark, mb: 5 }}
            >
              {t('ministry.ourLeaders', 'Our Leaders')}
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {leaders.map((leader, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: `0 12px 40px ${alpha(accentColor, 0.12)}`,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: 260,
                        background: leader.image
                          ? `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.4)), url(${leader.image})`
                          : accentColor,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        pb: 2,
                      }}
                    >
                      {!leader.image && (
                        <Typography sx={{ color: 'common.white', fontSize: '4rem', fontWeight: 700 }}>
                          {leader.avatar}
                        </Typography>
                      )}
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.primary.dark }}>
                        {leader.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: accentColor, fontWeight: 600, mb: 1.5 }}>
                        {leader.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                        {leader.description}
                      </Typography>
                      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                        {leader.email && (
                          <Chip
                            icon={<EmailIcon sx={{ fontSize: 15 }} />}
                            label={leader.email}
                            size="small"
                            sx={{ bgcolor: alpha(accentColor, 0.08), color: accentColor, fontWeight: 500 }}
                          />
                        )}
                        {leader.experience && (
                          <Chip
                            icon={<SchoolIcon sx={{ fontSize: 15 }} />}
                            label={leader.experience}
                            size="small"
                            sx={{ bgcolor: alpha(accentColor, 0.08), color: accentColor, fontWeight: 500 }}
                          />
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* CTA */}
        {ctaTitle && (
          <Box
            sx={{
              py: 5,
              px: 3,
              borderRadius: 3,
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
              textAlign: 'center',
              color: 'common.white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                {ctaTitle}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.85, maxWidth: '560px', mx: 'auto' }}>
                {ctaDescription}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: 'common.white',
                    color: 'common.white',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'common.white',
                      color: accentColor,
                      borderColor: 'common.white',
                    },
                  }}
                >
                  {t('ministry.learnMore', 'Learn More')}
                </Button>
                <Button
                  component={RouterLink}
                  to={ctaButtonLink || '/contact'}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: 'common.white',
                    color: accentColor,
                    fontWeight: 700,
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.9),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {ctaButtonText}
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MinistriesLayout;



