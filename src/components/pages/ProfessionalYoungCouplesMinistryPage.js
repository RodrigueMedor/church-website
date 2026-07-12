import React from 'react';
import { useTranslation } from 'react-i18next';
import { Church, Favorite, FamilyRestroom, Home } from '@mui/icons-material';
import MinistriesLayout from '../common/MinistriesLayout';

const accent = "#F44336";

const activityIcons = [<Church />, <Favorite />, <FamilyRestroom />, <Home />];

const activities = [
  { icon: activityIcons[0], title: "Bible Studies", description: "Explore God's design for marriage and relationships through relevant biblical teaching.", features: ["Marriage Principles", "Biblical Teaching", "Group Discussion"] },
  { icon: activityIcons[1], title: "Date Nights", description: "Romantic evenings designed to strengthen your connection and create lasting memories.", features: ["Themed Events", "Romantic Dinners", "Quality Time"] },
  { icon: activityIcons[2], title: "Parenting Support", description: "Navigate the journey of parenthood with guidance from experienced couples and biblical wisdom.", features: ["Parenting Classes", "Family Activities", "Childcare Support"] },
  { icon: activityIcons[3], title: "Home Building", description: "Practical workshops on creating a Christ-centered home that honors God.", features: ["Financial Planning", "Home Management", "Spiritual Leadership"] }
];

const schedule = [
  { day: "Friday", time: "7:30 PM", activity: "Couples Fellowship", description: "Weekly gathering for Bible study, discussion, and fellowship" },
  { day: "Saturday", time: "6:00 PM", activity: "Date Night Events", description: "Monthly themed date nights and special couples events" }
];

const leaders = [
  { name: "Brother & Sister Jean", role: "Young Couples Leaders", description: "Passionate about helping couples build strong, Christ-centered marriages that last a lifetime.", image: "/images/church-event.jpg", avatar: "JJ", experience: "8 years", email: "jean@church.org" },
  { name: "Brother & Sister Marie", role: "Marriage Mentors", description: "Dedicated to walking alongside couples through the joys and challenges of married life.", image: "/images/hero-bg.jpg", avatar: "JM", experience: "12 years", email: "marie@church.org" }
];

const ProfessionalYoungCouplesMinistryPage = () => {
  const { t } = useTranslation();
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle={t('youngCouples.title')}
      heroSubtitle={'"Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken."'}
      heroVerse="Ecclesiastes 4:12"
      heroImage="/images/banner/ycm-banner.jpg"
      heroImagePosition="center 30%"
      heroStats={[
        { value: "25+", label: t('youngCouples.stats.activeCouples', 'Active Couples') },
        { value: "4", label: t('youngCouples.stats.groupLeaders', 'Group Leaders') },
        { value: "20-35", label: t('youngCouples.stats.ageRange', 'Age Range') },
        { value: "Bi-weekly", label: t('youngCouples.stats.meetings', 'Meetings') },
      ]}
      welcomeTitle={t('youngCouples.welcome')}
      welcomeDescription={t('youngCouples.welcomeDescription')}
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle={t('youngCouples.readyToJoin')}
      ctaDescription={t('youngCouples.readyToJoinDescription')}
      ctaButtonText={t('youngCouples.joinGroup', 'Join Couples Group')}
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalYoungCouplesMinistryPage;
