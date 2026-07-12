import i18n from '../i18n';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

class ApiClient {
  constructor() {
    this.baseUrl = `${API_BASE}/api`;
    this.token = localStorage.getItem('auth_token') || localStorage.getItem('adminToken');
    this._refreshPromise = null;
  }

  setTokens(accessToken, refreshToken) {
    this.token = accessToken;
    localStorage.setItem('auth_token', accessToken);
  }

  clearTokens() {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('adminToken');
    // Clear the httpOnly refresh cookie via logout endpoint
    fetch(`${this.baseUrl}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
  }

  _resolveToken(auth) {
    if (!auth) return null;
    const t = this.token || localStorage.getItem('auth_token') || localStorage.getItem('adminToken');
    if (t && t !== 'undefined' && t !== 'null') {
      if (t !== this.token) this.token = t;
      return t;
    }
    return null;
  }

  async request(endpoint, options = {}) {
    const { method = 'GET', body, auth = false, params } = options;

    const headers = { 'Content-Type': 'application/json' };
    const token = this._resolveToken(auth);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) searchParams.append(k, v);
      });
      const qs = searchParams.toString();
      if (qs) url += `?${qs}`;
    }

    const config = { method, headers, credentials: 'include' };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(url, config);

    if ((response.status === 401 || response.status === 403) && auth) {
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${this.token}`;
        const retryResponse = await fetch(url, { ...config, headers });
        if (!retryResponse.ok) {
          const err = await retryResponse.json().catch(() => ({ message: retryResponse.statusText }));
          throw new ApiError(retryResponse.status, err.message || i18n.t('api.requestFailed', 'Request failed'));
        }
        if (retryResponse.status === 204) return null;
        return retryResponse.json();
      }
      this.clearTokens();
      throw new ApiError(response.status, i18n.t('api.sessionExpired', 'Session expired'));
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: response.statusText }));
      throw new ApiError(response.status, err.message || i18n.t('api.requestFailed', 'Request failed'));
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async tryRefresh() {
    if (this._refreshPromise) return this._refreshPromise;
    this._refreshPromise = this._doRefresh();
    try {
      return await this._refreshPromise;
    } finally {
      this._refreshPromise = null;
    }
  }

  async _doRefresh() {
    try {
      // Try cookie-based refresh (browser sends httpOnly cookie automatically)
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({}), // body may be ignored if cookie is present
      });
      if (response.ok) {
        const data = await response.json();
        this.token = data.accessToken;
        localStorage.setItem('auth_token', data.accessToken);
        return true;
      }
    } catch {}
    return false;
  }

  get(endpoint, params, auth = false) {
    return this.request(endpoint, { method: 'GET', params, auth });
  }

  post(endpoint, body, auth = false) {
    return this.request(endpoint, { method: 'POST', body, auth });
  }

  put(endpoint, body, auth = false) {
    return this.request(endpoint, { method: 'PUT', body, auth });
  }

  patch(endpoint, body, auth = false) {
    return this.request(endpoint, { method: 'PATCH', body, auth });
  }

  delete(endpoint, auth = false) {
    return this.request(endpoint, { method: 'DELETE', auth });
  }

  async upload(file, altText, auth = true) {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);

    const headers = {};
    const token = this._resolveToken(auth);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/admin/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: i18n.t('api.uploadFailed', 'Upload failed') }));
      throw new ApiError(response.status, err.message);
    }
    return response.json();
  }
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const api = new ApiClient();
export default api;
