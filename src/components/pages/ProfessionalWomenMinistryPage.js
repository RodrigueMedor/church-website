import React from 'react';
import { Church, Favorite, VolunteerActivism as OutreachIcon, Star } from '@mui/icons-material';
import MinistriesLayout from '../common/MinistriesLayout';

const accent = "#9C27B0";

const activityIcons = [<Church />, <Favorite />, <OutreachIcon />, <Star />];

const activities = [
  { icon: activityIcons[0], title: "Bible Study", description: "Deep dive into God's Word with discussions relevant to women's lives and spiritual journeys.", features: ["Bible Discussion", "Life Applications", "Prayer Circles"] },
  { icon: activityIcons[1], title: "Fellowship Events", description: "Build authentic friendships through gatherings designed for connection and support.", features: ["Tea Time", "Social Events", "Support Groups"] },
  { icon: activityIcons[2], title: "Outreach Ministry", description: "Serve together in love through projects that impact our community and beyond.", features: ["Community Service", "Mission Projects", "Care Ministries"] },
  { icon: activityIcons[3], title: "Spiritual Growth", description: "Grow deeper in faith through retreats, workshops, and discipleship opportunities.", features: ["Retreats", "Workshops", "Mentoring"] }
];

const schedule = [
  { day: "Tuesday", time: "7:00 PM", activity: "Women's Bible Study", description: "Weekly gathering for Bible study, prayer, and fellowship" },
  { day: "Saturday", time: "10:00 AM", activity: "Women's Fellowship", description: "Monthly brunch, service projects, or special events" }
];

const leaders = [
  { name: "Sister Marie", role: "Women's Ministry Director", description: "Passionate about empowering women to discover their God-given purpose and grow in spiritual maturity.", image: "/images/easter/multimedia-photo.jpg", avatar: "SM", experience: "15 years", email: "marie@church.org" },
  { name: "Sister Josette", role: "Fellowship Coordinator", description: "Dedicated to creating warm, welcoming environments where women can build lasting friendships.", image: "/images/contact-image.jpg", avatar: "SJ", experience: "10 years", email: "josette@church.org" }
];

const ProfessionalWomenMinistryPage = () => {
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle="Women's Ministry"
      heroSubtitle={'"She is clothed with strength and dignity; she can laugh at the days to come."'}
      heroVerse="Proverbs 31:25"
      heroImage="/images/banner/women-banner.jpg"
      heroStats={[
        { value: "50+", label: "Active Members" },
        { value: "10", label: "Group Leaders" },
        { value: "18+", label: "Age Range" },
        { value: "Weekly", label: "Meetings" },
      ]}
      welcomeTitle="Welcome to Women's Ministry"
      welcomeDescription="We're a community of women supporting each other in faith, growing together in God's love, and making a difference in our world. Join us as we discover the amazing plans God has for our lives."
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle="Join Our Sisterhood!"
      ctaDescription="Be part of a loving community where women grow together in faith, friendship, and purpose."
      ctaButtonText="Join Women's Group"
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalWomenMinistryPage;
