import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider, 
  Button,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Church as ChurchIcon
} from '@mui/icons-material';

// Team member data (you might want to move this to a separate data file)
const teamMembers = [
  {
    name: 'Pasteur Fritzner JB Brouard',
    role: 'Pasteur Principal',
    bio: 'Le Pasteur Brouard apporte plus de 25 ans d\'expérience dans le ministère pastoral. Diplômé du Séminaire de Théologie Évangélique d\'Haïti, il est passionné par l\'enseignement biblique et le développement spirituel de la communauté.',
    email: 'pasteur@fhbck.org',
    phone: '(407) 123-4567',
    photo: '/images/staff/pastor-charles.jpg'
  },
  {
    name: 'Pasteur Marie-Claire Laurent',
    role: 'Pasteur Principal Adjoint',
    bio: 'Le Pasteur Laurent apporte une riche expérience dans le ministère pastoral et le leadership spirituel. Son cœur pour le discipolat et la formation des leaders a profondément impacté notre communauté.',
    email: 'pasteur.laurent@fhbck.org',
    phone: '(407) 123-4576',
    photo: '/images/staff/pastor-laurent.jpg'
  },
  {
    name: 'Pasteur Jean-Robert Simon',
    role: 'Pasteur Adjoint',
    bio: 'Le Pasteur Simon apporte son soutien dans la direction spirituelle de l\'église. Il est particulièrement impliqué dans le conseil pastoral et l\'enseignement biblique.',
    email: 'pasteur.adjoint@fhbck.org',
    phone: '(407) 123-4570',
    photo: '/images/staff/pastor-simon.jpg'
  },
  {
    name: 'Diacre Samuel Pierre',
    role: 'Responsable du Culte',
    bio: 'Le Diacre Pierre dirige notre ministère de louange avec un engagement profond pour une adoration qui unit tradition et modernité, reflétant la richesse de notre héritage chrétien haïtien.',
    email: 'culte@fhbck.org',
    phone: '(407) 123-4568',
    photo: '/images/staff/deacon-pierre.jpg'
  },
  {
    name: 'Diacre Marc Antoine',
    role: 'Responsable de la Jeunesse',
    bio: 'Le Diacre Antoine est passionné par le ministère auprès des jeunes. Il dirige notre programme jeunesse avec créativité et dévouement, aidant les jeunes à grandir dans leur foi.',
    email: 'jeunesse@fhbck.org',
    phone: '(407) 123-4571',
    photo: '/images/staff/deacon-antoine.jpg'
  },
  {
    name: 'Diaconesse Marie L. Joseph',
    role: 'Ministère des Femmes',
    bio: 'La Diaconesse Joseph coordonne les activités du ministère des femmes, encourageant la croissance spirituelle et le soutien mutuel parmi les femmes de notre assemblée.',
    email: 'femmes@fhbck.org',
    phone: '(407) 123-4569',
    photo: '/images/staff/deaconess-joseph.jpg'
  },
  {
    name: 'Diaconesse Sophie Laurent',
    role: 'Responsable de l\'École du Dimanche',
    bio: 'La Diaconesse Laurent dirige notre programme d\'école du dimanche avec passion. Elle s\'assure que les enfants apprennent la Parole de Dieu de manière engageante et adaptée à leur âge.',
    email: 'ecoledimanche@fhbck.org',
    phone: '(407) 123-4572',
    photo: '/images/staff/deaconess-laurent.jpg'
  },
  {
    name: 'Frère Michel Jean',
    role: 'Responsable de la Mission',
    bio: 'Frère Jean coordonne nos efforts missionnaires locaux et internationaux. Il est passionné par l\'évangélisation et le service communautaire.',
    email: 'mission@fhbck.org',
    phone: '(407) 123-4573',
    photo: '/images/staff/brother-jean.jpg'
  },
  {
    name: 'Soeur Nadège François',
    role: 'Responsable de la Musique',
    bio: 'Soeur François dirige notre équipe de louange avec talent et dévouement. Elle s\'assure que nos temps de louange honorent Dieu et élèvent les cœurs vers Lui.',
    email: 'musique@fhbck.org',
    phone: '(407) 123-4574',
    photo: '/images/staff/sister-francois.jpg'
  },
  {
    name: 'Frère Daniel Bernard',
    role: 'Responsable de la Communication',
    bio: 'Frère Bernard gère nos canaux de communication, y compris les médias sociaux, le site web et les bulletins d\'information. Il s\'assure que notre message atteint notre communauté.',
    email: 'communication@fhbck.org',
    phone: '(407) 123-4575',
    photo: '/images/staff/brother-bernard.jpg'
  }
];

const TeamMembers = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Separate the lead pastor
  const leadPastor = teamMembers.find(member => member.role === 'Pasteur Principal');
  const otherMembers = teamMembers.filter(member => member.role !== 'Pasteur Principal');

  const MemberCard = ({ member, isPastor = false }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease-in-out',
        border: isPastor ? `2px solid ${theme.palette.primary.main}` : 'none',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 35px -5px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Member Photo */}
      <Box
        sx={{
          width: '100%',
          height: isPastor ? 400 : 300,
          overflow: 'hidden',
          position: 'relative',
          '&:hover img': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Box
          component="img"
          src={member.photo}
          alt={member.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            transition: 'all 0.5s ease',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder-profile.jpg';
          }}
        />
      </Box>

      {/* Member Info */}
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Typography
          variant={isPastor ? 'h4' : 'h5'}
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
            textAlign: isPastor ? 'center' : 'left',
          }}
        >
          {member.name}
        </Typography>
        <Typography
          variant={isPastor ? 'h6' : 'subtitle1'}
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            mb: 3,
            fontStyle: 'italic',
            textAlign: isPastor ? 'center' : 'left',
          }}
        >
          {member.role}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            mb: 3,
            minHeight: isPastor ? 'auto' : '72px',
            textAlign: isPastor ? 'center' : 'left',
          }}
        >
          {member.bio}
        </Typography>

        <Box sx={{ mt: 'auto', textAlign: isPastor ? 'center' : 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: isPastor ? 'center' : 'flex-start' }}>
            <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography
              variant="body2"
              component="a"
              href={`mailto:${member.email}`}
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {member.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isPastor ? 'center' : 'flex-start' }}>
            <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {member.phone}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/images/banner/team-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(26, 75, 140, 0.85)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent 0%, #f8f9fa 100%)',
            zIndex: 1,
            opacity: 0.5,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Button
            component={RouterLink}
            to="/about"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'white',
              mb: 4,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Retour
          </Button>
          
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            Notre Équipe Pastorale
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              maxWidth: '800px',
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            Rencontrez les membres dévoués de notre équipe pastorale qui servent avec passion notre communauté.
          </Typography>
        </Container>
      </Box>

      {/* Lead Pastor Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: 'primary.main',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: 'primary.main',
                borderRadius: '2px'
              }
            }}
          >
            Notre Pasteur Principal
          </Typography>
        </Box>
        
        {leadPastor && (
          <Grid container justifyContent="center" sx={{ mb: 8 }}>
            <Grid item xs={12} md={8} lg={6}>
              <MemberCard member={leadPastor} isPastor={true} />
            </Grid>
          </Grid>
        )}

        {/* Other Team Members */}
        <Box sx={{ textAlign: 'center', mb: 6, mt: 12 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: 'primary.main',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: 'primary.main',
                borderRadius: '2px'
              }
            }}
          >
            Notre Équipe
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {otherMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <ChurchIcon sx={{ fontSize: 60, mb: 3, opacity: 0.8 }} />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Rejoignez Notre Communauté
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Nous serions ravis de vous accueillir dans notre église et de vous présenter personnellement notre équipe.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              },
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
          >
            {t('contactUs')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default TeamMembers;
