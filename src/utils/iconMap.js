import React from 'react';
import {
  School, Favorite, MenuBook, WbSunny, People, MusicNote, Mic, Build,
  AccessTime, Church, Email, ChildCare, EmojiEvents, Star,
  HowToReg, Mood, CameraAlt, ArrowForward, Facebook, YouTube, PlayCircle,
  Group, Lightbulb, Handshake, Language, VolunteerActivism, Event, SelfImprovement,
  LocationOn, Male, Female, CalendarToday, CalendarMonth, Category, Mail,
  Phone, AccountBalance, PlaylistPlay, Visibility, Groups, FamilyRestroom
} from '@mui/icons-material';

const iconComponents = {
  School, Favorite, MenuBook, WbSunny, People, MusicNote, Mic, Build,
  AccessTime, Church, Email, ChildCare, EmojiEvents, Star,
  HowToReg, Mood, CameraAlt, ArrowForward, Facebook, YouTube, PlayCircle,
  Group, Lightbulb, Handshake, Language, VolunteerActivism, Event, SelfImprovement,
  LocationOn, Male, Female, CalendarToday, CalendarMonth, Category, Mail,
  Phone, AccountBalance, PlaylistPlay, Visibility, Groups, FamilyRestroom,
  BookOpen: MenuBook,
  Sun: WbSunny,
  Tool: Build,
  UserCheck: HowToReg,
  Smile: Mood,
  Camera: CameraAlt,
  Heart: Favorite,
  Prayer: SelfImprovement,
  Book: MenuBook,
  MapPin: LocationOn,
  Calendar: CalendarToday,
  'get-involved': Event,
  Users: People,
  PrayerTimes: SelfImprovement,
  Music: MusicNote,
};

export function getIcon(name, props = {}) {
  const Icon = iconComponents[name] || Star;
  return React.createElement(Icon, { ...props });
}

export default iconComponents;
