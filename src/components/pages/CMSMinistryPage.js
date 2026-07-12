import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../../cms';
import MinistriesLayout from '../common/MinistriesLayout';
import { getIcon } from '../../utils/iconMap';

const accentColors = {
  'children': '#4CAF50',
  'youth': '#FF9800',
  'women': '#E91E63',
  'men': '#1565C0',
  'young-couples': '#9C27B0',
  'worship': '#F44336',
};

const pathToSlug = {
  '/children-ministry': 'children',
  '/youth-ministry': 'youth',
  '/women-ministry': 'women',
  '/men-ministry': 'men',
  '/young-couples-ministry': 'young-couples',
  '/worship-ministry': 'worship',
};

const slugToPageKey = {
  'children': 'children-ministry',
  'youth': 'youth-ministry',
  'women': 'women-ministry',
  'men': 'men-ministry',
  'young-couples': 'young-couples-ministry',
  'worship': 'worship-ministry',
};

const CMSMinistryPage = () => {
  const location = useLocation();
  const slug = pathToSlug[location.pathname] || location.pathname.replace('/','').replace('-ministry','');
  const pageKey = slugToPageKey[slug] || `${slug}-ministry`;
  const content = usePageContent(pageKey);
  const { t } = useTranslation();
  const accent = accentColors[slug] || '#4CAF50';

  if (!content) {
    return <MinistriesLayout accentColor={accent} heroTitle={t('cmsMinistry.defaultTitle', 'Ministry')} heroSubtitle="" heroImage="" />;
  }

  const activities = (content.activities || []).map(a => ({
    ...a,
    icon: getIcon(a.icon || 'Star', { sx: { fontSize: 32 } }),
    features: a.features || [],
  }));

  const schedule = (content.activities || []).map(a => ({
    day: a.schedule?.split(' ')[0] || '',
    time: a.schedule?.split(' ').slice(1).join(' ') || '',
    activity: a.title || '',
    description: a.description || '',
  }));

  const leaders = (content.leaders || []).map(l => ({
    name: l.name || '',
    role: l.role || l.title || '',
    description: l.description || l.bio || '',
    image: l.image || l.imageUrl || '',
    avatar: (l.name || '').split(' ').map(n => n[0]).join('').toUpperCase() || '?',
    experience: l.experience || '',
    email: l.email || '',
  }));

  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle={content.hero?.title || content.name || slug || t('cmsMinistry.pageTitle', 'Ministry')}
      heroSubtitle={content.hero?.subtitle || content.tagline || ''}
      heroVerse={content.hero?.verse || ''}
      heroImage={content.imageUrl || content.hero?.backgroundImages?.[0] || ''}
      heroImagePosition={content.heroImagePosition || 'center'}
      heroStats={content.heroStats || []}
      welcomeTitle={t('cmsMinistry.welcomeTitle', 'Welcome to Our ' + (content.name || slug))}
      welcomeDescription={content.description || ''}
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle={content.cta?.title || `Get Involved with ${content.name || ''}`}
      ctaDescription={content.cta?.description || content.longDescription || content.description || ''}
      ctaButtonText={content.cta?.buttonText || t('cmsMinistry.contactUs', 'Contact Us')}
      ctaButtonLink={content.cta?.buttonLink || '/contact'}
    />
  );
};

export default CMSMinistryPage;
