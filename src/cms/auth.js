import api from '../services/api';
import i18n from '../i18n';

const AUTH_KEY = 'cms_auth';

const DEFAULT_ADMIN = {
  email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@fhbck.org',
  password: process.env.REACT_APP_ADMIN_PASSWORD || 'admin123',
  name: process.env.REACT_APP_ADMIN_NAME || 'Admin',
};

function init() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.users) data.users = [];
      if (!data.users.some(u => u.email === DEFAULT_ADMIN.email)) {
        data.users.push(DEFAULT_ADMIN);
      }
      if (!data.sessions) data.sessions = {};
      localStorage.setItem(AUTH_KEY, JSON.stringify(data));
      return;
    }
  } catch {}
  localStorage.setItem(AUTH_KEY, JSON.stringify({
    users: [DEFAULT_ADMIN],
    sessions: {},
  }));
}

init();

export const auth = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response && response.accessToken) {
      api.setTokens(response.accessToken, response.refreshToken);
      return { token: response.accessToken, user: { email, name: email.split('@')[0] } };
    }
    throw new Error(i18n.t('auth.loginFailed', 'Login failed'));
  },

  logout(token) {
    const data = JSON.parse(localStorage.getItem(AUTH_KEY));
    delete data.sessions[token];
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  },

  validate(token) {
    if (!token) return null;
    const data = JSON.parse(localStorage.getItem(AUTH_KEY));
    const session = data.sessions[token];
    if (!session) return null;
    return { email: session.email, name: session.name };
  },

  isLoggedIn() {
    const token = localStorage.getItem('adminToken');
    return !!this.validate(token);
  },

  updateProfile(email, updates) {
    const data = JSON.parse(localStorage.getItem(AUTH_KEY));
    const idx = data.users.findIndex(u => u.email === email);
    if (idx === -1) throw new Error(i18n.t('auth.userNotFound', 'User not found'));
    data.users[idx] = { ...data.users[idx], ...updates };
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    return data.users[idx];
  },

  changePassword(email, oldPassword, newPassword) {
    const data = JSON.parse(localStorage.getItem(AUTH_KEY));
    const user = data.users.find(u => u.email === email);
    if (!user || user.password !== oldPassword) throw new Error(i18n.t('auth.invalidCurrentPassword', 'Invalid current password'));
    user.password = newPassword;
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  },
};

export default auth;
