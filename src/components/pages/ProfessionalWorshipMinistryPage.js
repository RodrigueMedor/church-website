import React from 'react';
import { Church, MusicNote, Mic, SurroundSound } from '@mui/icons-material';
import MinistriesLayout from '../common/MinistriesLayout';

const accent = "#C9A84C";

const activities = [
  { icon: <MusicNote />, title: "Choir Ministry", description: "Voices united in harmony to lead the congregation in worship through hymns, gospel, and anthems.", features: ["Hymns", "Gospel", "Anthems", "Special Presentations"] },
  { icon: <Church />, title: "Praise Team", description: "Contemporary worship leading with modern songs and arrangements to create an atmosphere of praise.", features: ["Vocals", "Band", "Modern Worship", "Rehearsals"] },
  { icon: <Mic />, title: "Instrumental Ministry", description: "Musicians using their gifts to glorify God through instrumental music during services.", features: ["Piano/Keys", "Guitar", "Drums", "Orchestra"] },
  { icon: <SurroundSound />, title: "Sound & Media", description: "Technical team supporting worship services with sound engineering, visuals, and streaming.", features: ["Sound Engineering", "Projection", "Streaming", "Lighting"] }
];

const schedule = [
  { day: "Wednesday", time: "7:00 PM", activity: "Choir & Band Rehearsal", description: "Weekly practice for choir, praise team, and musicians" },
  { day: "Sunday", time: "9:00 AM", activity: "Pre-Service Sound Check", description: "Technical setup and sound check before Sunday service" }
];

const leaders = [
  { name: "Joseph Laurent", role: "Worship Director", description: "Leading the worship ministry with passion, musical excellence, and a heart for God.", image: "/images/easter/worship-solo.jpg", avatar: "JL", experience: "12 years", email: "joseph.laurent@fhbck.org" },
  { name: "Marie-Claire Duval", role: "Choir Director", description: "Directing the choir and coordinating vocal teams to create beautiful worship experiences.", image: "/images/easter/music2--photo.jpg", avatar: "MD", experience: "9 years", email: "mc.duval@fhbck.org" }
];

const ProfessionalWorshipMinistryPage = () => {
  return (
    <MinistriesLayout
      accentColor={accent}
      heroTitle="Worship & Music Ministry"
      heroSubtitle={'"Let everything that has breath praise the Lord. Praise the Lord!"'}
      heroVerse="Psalm 150:6"
      heroImage="/images/banner/banner-sermont.jpg"
      heroStats={[
        { value: "40+", label: "Worship Team Members" },
        { value: "4", label: "Ministry Areas" },
        { value: "Ages 14+", label: "Open To" },
        { value: "Weekly", label: "Rehearsals" },
      ]}
      welcomeTitle="Welcome to Worship & Music Ministry"
      welcomeDescription="We are a community of musicians, singers, and technical artists dedicated to leading the congregation into the presence of God through excellence in worship. Whether you sing, play an instrument, or have a passion for sound and media, there is a place for you to serve."
      activities={activities}
      schedule={schedule}
      leaders={leaders}
      ctaTitle="Join the Worship Team!"
      ctaDescription="Use your musical gifts to glorify God and help lead others into His presence. All skill levels welcome."
      ctaButtonText="Get Involved"
      ctaButtonLink="/contact"
    />
  );
};

export default ProfessionalWorshipMinistryPage;
