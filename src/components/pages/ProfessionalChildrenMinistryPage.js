import React from 'react';

import { School, ChildCare, EmojiEvents, Book } from '@mui/icons-material';
import MinistriesLayout from '../common/MinistriesLayout';

const accent = "#4CAF50";

const activities = [
  {
    icon: <School />,
    title: "Sunday School",
    description: "Age-appropriate Bible lessons with interactive activities and crafts that make learning about God fun and memorable.",
    features: ["Bible Stories", "Interactive Learning", "Creative Crafts", "Memory Verses"]
  },
  {
    icon: <ChildCare />,
    title: "Nursery Care",
    description: "Safe and loving environment for infants and toddlers during services, allowing parents to worship peacefully.",
    features: ["Safe Environment", "Trained Staff", "Age-appropriate Toys", "Parent Notifications"]
  },
  {
    icon: <EmojiEvents />,
    title: "VBS & Events",
    description: "Exciting vacation Bible school and special events throughout the year with games, music, and learning.",
    features: ["Summer VBS", "Holiday Events", "Family Activities", "Community Outreach"]
  },
  {
    icon: <Book />,
    title: "Bible Club",
    description: "Weekly club where kids dive deeper into God's Word through stories, activities, and friendship.",
    features: ["Weekly Meetings", "Bible Reading", "Group Activities", "Character Building"]
  }
];

const schedule = [
  { day: "Sunday", time: "9:30 AM", activity: "Sunday School & Nursery", description: "Age-appropriate classes for all children during main service" },
  { day: "Wednesday", time: "7:00 PM", activity: "Bible Club & Activities", description: "Mid-week program with Bible study, games, and fellowship" }
];

const leaders = [
  {
    name: "Sarah Johnson", role: "Children's Ministry Director",
    description: "Passionate about creating a safe, fun environment where children can discover God's love and build lasting faith foundations.",
    image: "/images/easter/DSC_2261.jpg", avatar: "SJ", experience: "8 years", email: "sarah@church.org"
  },
  {
    name: "Michael Chen", role: "Elementary Coordinator",
    description: "Dedicated to making Bible stories come alive through creative teaching and engaging activities that kids love.",
    image: "/images/easter/DSC_2307.jpg", avatar: "MC", experience: "5 years", email: "michael@church.org"
  }
];

const ProfessionalChildrenMinistryPage = () => {
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle="Children's Ministry"
      heroSubtitle={'"Train up a child in the way he should go; even when he is old he will not depart from it."'}
      heroVerse="Proverbs 22:6"
      heroImage="/images/banner/children-banner.JPG"
      heroStats={[
        { value: "45+", label: "Children Enrolled" },
        { value: "12", label: "Dedicated Teachers" },
        { value: "4-12", label: "Age Range" },
        { value: "100%", label: "Safe & Fun" },
      ]}
      welcomeTitle="Welcome to Our Children's Ministry"
      welcomeDescription="We believe every child is precious in God's sight and deserves to experience His love in a safe, fun, and nurturing environment. Our dedicated team creates engaging experiences that help children build strong spiritual foundations while having the time of their lives."
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle="Ready to Join Our Family?"
      ctaDescription="We'd love to have your children join our growing family! Sign up today and watch them grow in faith while making new friends."
      ctaButtonText="Register Your Child"
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalChildrenMinistryPage;
