import React from 'react';
import { useTranslation } from 'react-i18next';
import { Church, Groups, Star, Favorite } from '@mui/icons-material';
import MinistriesLayout from '../common/MinistriesLayout';

const accent = "#2196F3";

const activities = [
  { icon: <Church />, title: "Bible Discussions", description: "Deep dive into Scripture with relevant topics that matter to teens today.", features: ["Interactive Discussions", "Real Topics", "Life Applications"] },
  { icon: <Groups />, title: "Fellowship & Fun", description: "Build lasting friendships through games, activities, and authentic community.", features: ["Team Building", "Social Events", "Friendship Circles"] },
  { icon: <Star />, title: "Worship Night", description: "Passionate worship experiences designed for and led by youth.", features: ["Live Worship", "Youth Band", "Creative Arts"] },
  { icon: <Favorite />, title: "Community Service", description: "Make a difference through service projects that impact our community.", features: ["Local Outreach", "Mission Trips", "Service Hours"] }
];

const schedule = [
  { day: "Saturday", time: "5:00 PM", activity: "Youth Service & Fellowship", description: "Weekly gathering with worship, message, games, and dinner" },
  { day: "Sunday", time: "11:30 AM", activity: "Sunday School Class", description: "Age-specific Bible study and discussion for teens" }
];

const leaders = [
  { name: "Brother Vlad", role: "Youth Pastor", description: "Passionate about helping teens discover their identity in Christ and develop leadership skills.", image: "/images/easter/bridge-photo.jpg", avatar: "BV", experience: "10 years", email: "vlad@church.org" },
  { name: "Brother Wisly", role: "Youth Leader", description: "Dedicated to mentoring teens and creating engaging environments for spiritual growth.", image: "/images/easter/offering-photo.jpg", avatar: "BW", experience: "6 years", email: "wisly@church.org" }
];

const ProfessionalYouthMinistryPage = () => {
  const { t } = useTranslation();
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle={t('youth.title')}
      heroSubtitle={'"Don\'t let anyone look down on you because you are young, but set an example for the believers in speech, conduct, love, faith and purity."'}
      heroVerse="1 Timothy 4:12"
      heroImage="/images/banner/youth-banner.jpg"
      heroStats={[
        { value: "60+", label: t('youth.stats.activeTeens', 'Active Teens') },
        { value: "8", label: t('youth.stats.youthLeaders', 'Youth Leaders') },
        { value: "13-18", label: t('youth.stats.ageRange', 'Age Range') },
        { value: "Weekly", label: t('youth.stats.meetings', 'Meetings') },
      ]}
      welcomeTitle={t('youth.welcome')}
      welcomeDescription={t('youth.welcomeDescription')}
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle={t('youth.readyToJoin')}
      ctaDescription={t('youth.readyToJoinDescription')}
      ctaButtonText={t('youth.joinGroup', 'Join Youth Group')}
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalYouthMinistryPage;
