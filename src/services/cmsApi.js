import api from './api';
import { pageDefaults } from '../cms/defaults';

const CMS_API = {
  async fetchHeroSlides(page = 'homepage') {
    try { return await api.get('/public/hero-slides', { page }); } catch { return []; }
  },

  async fetchEvents(page = 0, size = 10) {
    try { return await api.get('/public/events', { page, size }); } catch { return { content: [], totalElements: 0 }; }
  },

  async fetchUpcomingEvents() {
    try { return await api.get('/public/events/upcoming'); } catch { return []; }
  },

  async fetchFeaturedEvents() {
    try { return await api.get('/public/events/featured'); } catch { return []; }
  },

  async fetchEventById(id) {
    try { return await api.get(`/public/events/${id}`); } catch { return null; }
  },

  async fetchSermons(page = 0, size = 10) {
    try { return await api.get('/public/sermons', { page, size }); } catch { return { content: [], totalElements: 0 }; }
  },

  async fetchSermonById(id) {
    try { return await api.get(`/public/sermons/${id}`); } catch { return null; }
  },

  async fetchMinistries() {
    try { return await api.get('/public/ministries'); } catch { return []; }
  },

  async fetchMinistryBySlug(slug) {
    try { return await api.get(`/public/ministries/${slug}`); } catch { return null; }
  },

  async fetchNews(page = 0, size = 10) {
    try { return await api.get('/public/news', { page, size }); } catch { return { content: [], totalElements: 0 }; }
  },

  async fetchFeaturedNews() {
    try { return await api.get('/public/news/featured'); } catch { return []; }
  },

  async fetchNewsById(id) {
    try { return await api.get(`/public/news/${id}`); } catch { return null; }
  },

  async fetchPastors() {
    try { return await api.get('/public/pastors'); } catch { return []; }
  },

  async fetchTestimonials() {
    try { return await api.get('/public/testimonials'); } catch { return []; }
  },

  async fetchGallery() {
    try { return await api.get('/public/gallery'); } catch { return []; }
  },

  async fetchSettings() {
    try { return await api.get('/public/settings'); } catch { return []; }
  },

  async submitContact(data) { return api.post('/public/contact', data); },
  async submitPrayerRequest(data) { return api.post('/public/prayer-requests', data); },

  async fetchPublicPrayerRequests() {
    try { return await api.get('/public/prayer-requests/public'); } catch { return []; }
  },
};

const slugToPageKey = {
  'children': 'children-ministry',
  'youth': 'youth-ministry',
  'women': 'women-ministry',
  'men': 'men-ministry',
  'young-couples': 'young-couples-ministry',
  'worship': 'worship-ministry',
};

const pageKeyToSlug = {
  'children-ministry': 'children',
  'youth-ministry': 'youth',
  'women-ministry': 'women',
  'men-ministry': 'men',
  'young-couples-ministry': 'young-couples',
  'worship-ministry': 'worship',
};

async function fetchAndBuildPageContent(pageKey) {
  const defaults = pageDefaults[pageKey];
  if (!defaults) return null;

  try {
    let content = { ...defaults };

    // Handle individual ministry pages
    if (pageKeyToSlug[pageKey]) {
      const slug = pageKeyToSlug[pageKey];
      const ministry = await CMS_API.fetchMinistryBySlug(slug);
      if (ministry) {
        content = {
          ...content,
          name: ministry.name || content.name,
          tagline: ministry.tagline || content.tagline,
          description: ministry.description || content.description,
          longDescription: ministry.longDescription || content.longDescription,
          imageUrl: ministry.imageUrl || content.imageUrl,
          heroImagePosition: ministry.heroImagePosition || content.heroImagePosition,
          meetingTime: ministry.meetingTime || content.meetingTime,
          meetingLocation: ministry.meetingLocation || content.meetingLocation,
          contactEmail: ministry.contactEmail || content.contactEmail,
          leaders: ministry.leaders?.length > 0 ? ministry.leaders : content.leaders,
          hero: {
            ...content.hero,
            title: ministry.name || content.hero?.title,
            subtitle: ministry.tagline || content.hero?.subtitle,
            backgroundImages: ministry.imageUrl
              ? [ministry.imageUrl, ...(content.hero?.backgroundImages || [])]
              : content.hero?.backgroundImages,
          },
        };
      }
      return content;
    }

    const heroSlides = await CMS_API.fetchHeroSlides(pageKey);

    if (heroSlides.length > 0) {
      content.hero = {
        ...content.hero,
        backgroundImages: heroSlides.map(s => s.imageUrl).filter(Boolean),
        title: heroSlides[0]?.title || content.hero?.title,
        subtitle: heroSlides[0]?.subtitle || content.hero?.subtitle,
        ctaText: heroSlides[0]?.ctaText || content.hero?.ctaText,
        ctaLink: heroSlides[0]?.ctaLink || content.hero?.ctaLink,
      };
    }

    if (pageKey === 'homepage') {
      const [eventsData, sermonsData, newsData, testimonialsData] = await Promise.all([
        CMS_API.fetchUpcomingEvents(),
        CMS_API.fetchSermons(0, 3),
        CMS_API.fetchFeaturedNews(),
        CMS_API.fetchTestimonials(),
      ]);

      content = {
        ...content,
        upcomingEvents: eventsData.length > 0 ? eventsData : defaults.upcomingEvents,
        latestSermons: sermonsData.content?.length > 0 ? sermonsData.content : defaults.latestSermons,
        news: newsData.length > 0 ? newsData : defaults.news,
        testimonials: testimonialsData.length > 0 ? testimonialsData : defaults.testimonials,
      };
    }

    if (pageKey === 'about') {
      const [pastors, testimonialData] = await Promise.all([
        CMS_API.fetchPastors(),
        CMS_API.fetchTestimonials(),
      ]);

      if (pastors.length > 0) {
        content.leadership = {
          ...content.leadership,
          seniorPastor: pastors[0],
        };
        content.staffData = pastors.map(p => ({
          name: p.name,
          role: p.title,
          bio: p.bio,
          image: p.imageUrl,
          email: p.email,
        }));
      }
    }

    if (pageKey === 'sermons') {
      const sermonsData = await CMS_API.fetchSermons(0, 100);
      content.sermons = sermonsData.content || [];
      content.pagination = {
        page: sermonsData.page || 0,
        totalPages: sermonsData.totalPages || 0,
        totalElements: sermonsData.totalElements || 0,
      };
    }

    if (pageKey === 'events') {
      const [eventsData, featuredEvents] = await Promise.all([
        CMS_API.fetchEvents(0, 100),
        CMS_API.fetchFeaturedEvents(),
      ]);
      content.events = eventsData.content || [];
      content.featuredEvents = featuredEvents;
      content.items = eventsData.content || [];
      content.pagination = {
        page: eventsData.page || 0,
        totalPages: eventsData.totalPages || 0,
        totalElements: eventsData.totalElements || 0,
      };
    }

    if (pageKey === 'contact') {
      const settings = await CMS_API.fetchSettings();
      const settingMap = {};
      if (Array.isArray(settings)) {
        settings.forEach(s => { settingMap[s.settingKey] = s.settingValue; });
      }
      content = {
        ...content,
        churchInfo: {
          ...content.churchInfo,
          address: settingMap['church.address'] || content.churchInfo?.address,
          phone: settingMap['church.phone'] || content.churchInfo?.phone,
          email: settingMap['church.email'] || content.churchInfo?.email,
          serviceTime: settingMap['church.service_time'] || content.churchInfo?.serviceTime,
        },
        address: settingMap['church.address'] || content.address,
        phone: settingMap['church.phone'] || content.phone,
        email: settingMap['church.email'] || content.email,
      };

      const socialLinks = [
        { platform: 'Facebook', icon: 'Facebook', url: settingMap['church.social_facebook'], color: '#1877F2' },
        { platform: 'YouTube', icon: 'YouTube', url: settingMap['church.social_youtube'], color: '#FF0000' },
        { platform: 'Instagram', icon: 'Instagram', url: settingMap['church.social_instagram'], color: '#E4405F' },
      ].filter(s => s.url);
      if (socialLinks.length > 0) content.socialLinks = socialLinks;
    }

    if (pageKey === 'ministries') {
      const ministriesData = await CMS_API.fetchMinistries();
      content.ministries = ministriesData.length > 0 ? ministriesData : defaults.ministries;
    }

    return content;
  } catch {
    return defaults;
  }
}

const contentCache = new Map();

export async function getPublishedContent(pageKey) {
  if (contentCache.has(pageKey)) {
    return contentCache.get(pageKey);
  }
  const content = await fetchAndBuildPageContent(pageKey);
  contentCache.set(pageKey, content);
  return content;
}

export function invalidateCache(pageKey) {
  if (pageKey) contentCache.delete(pageKey);
  else contentCache.clear();
}

export { slugToPageKey, pageKeyToSlug };

export default CMS_API;
