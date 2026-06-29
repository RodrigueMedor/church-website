import React from 'react';
import { Church, Handyman, SportsSoccer, Groups } from '@mui/icons-material';
import MinistriesLayout from '../common/MinistriesLayout';

const accent = "#FF9800";

const activityIcons = [<Church />, <Handyman />, <SportsSoccer />, <Groups />];

const activities = [
  { icon: activityIcons[0], title: "Bible Study", description: "Deep dive into Scripture with practical applications for men's daily lives and challenges.", features: ["Bible Discussion", "Life Applications", "Prayer Time"] },
  { icon: activityIcons[1], title: "Service Projects", description: "Use your skills to serve the church and community through practical hands-on projects.", features: ["Church Maintenance", "Community Help", "Skill Training"] },
  { icon: activityIcons[2], title: "Sports & Recreation", description: "Build friendships through sports activities and recreational events.", features: ["Basketball", "Softball", "Tournaments"] },
  { icon: activityIcons[3], title: "Mentorship", description: "Younger men paired with mature believers for spiritual growth and life guidance.", features: ["One-on-One", "Group Mentoring", "Accountability"] }
];

const schedule = [
  { day: "Wednesday", time: "7:00 PM", activity: "Men's Bible Study", description: "Weekly gathering for Bible study, fellowship, and prayer" },
  { day: "Saturday", time: "10:00 AM", activity: "Men's Fellowship", description: "Monthly breakfast, service projects, or recreational activities" }
];

const leaders = [
  { name: "Brother Jean", role: "Men's Ministry Leader", description: "Passionate about helping men become strong spiritual leaders in their homes and community.", image: "/images/easter/bridge-ministry-photo.jpg", avatar: "JJ", experience: "12 years", email: "jean@church.org" },
  { name: "Brother Pierre", role: "Men's Fellowship Coordinator", description: "Dedicated to creating authentic community where men can grow together in faith.", image: "/images/easter/DSC_2261_proper.jpg", avatar: "JP", experience: "8 years", email: "pierre@church.org" }
];

const ProfessionalMenMinistryPage = () => {
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle="Men's Ministry"
      heroSubtitle={'"Be watchful, stand firm in the faith, act like men, be strong."'}
      heroVerse="1 Corinthians 16:13"
      heroImage="/images/banner/men-banner.JPG"
      heroStats={[
        { value: "30+", label: "Active Members" },
        { value: "6", label: "Group Leaders" },
        { value: "18+", label: "Age Range" },
        { value: "Weekly", label: "Meetings" },
      ]}
      welcomeTitle="Welcome to Men's Ministry"
      welcomeDescription="We're building strong men of faith who lead courageously at home, work, and in their communities. Join us as we grow together in God's strength and purpose."
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle="Join Our Brotherhood!"
      ctaDescription="Be part of a community of men committed to growing in faith and making a difference."
      ctaButtonText="Join Men's Group"
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalMenMinistryPage;
