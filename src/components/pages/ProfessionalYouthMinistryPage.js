import React from 'react';
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
  { name: "Brother Vlad", role: "Youth Pastor", description: "Passionate about helping teens discover their identity in Christ and develop leadership skills.", avatar: "BV", experience: "10 years", email: "vlad@church.org" },
  { name: "Brother Wisly", role: "Youth Leader", description: "Dedicated to mentoring teens and creating engaging environments for spiritual growth.", avatar: "BW", experience: "6 years", email: "wisly@church.org" }
];

const ProfessionalYouthMinistryPage = () => {
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle="Youth Ministry"
      heroSubtitle={'"Don\'t let anyone look down on you because you are young, but set an example for the believers in speech, conduct, love, faith and purity."'}
      heroVerse="1 Timothy 4:12"
      heroImage="/images/banner/youth-banner.jpg"
      heroStats={[
        { value: "60+", label: "Active Teens" },
        { value: "8", label: "Youth Leaders" },
        { value: "13-18", label: "Age Range" },
        { value: "Weekly", label: "Meetings" },
      ]}
      welcomeTitle="Welcome to Youth Ministry"
      welcomeDescription="We're a community where teens can be themselves, ask tough questions, and discover the amazing plans God has for their lives. Join us as we grow in faith, build friendships, and make a difference."
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle="Join Our Youth Community!"
      ctaDescription="Come be part of something amazing! Make friends, grow in faith, and discover your purpose."
      ctaButtonText="Join Youth Group"
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalYouthMinistryPage;
