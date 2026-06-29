const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

class ApiClient {
  constructor() {
    this.baseUrl = `${API_BASE}/api`;
    this.token = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  setTokens(accessToken, refreshToken) {
    this.token = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('auth_token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  async request(endpoint, options = {}) {
    const { method = 'GET', body, auth = false, params } = options;

    const headers = { 'Content-Type': 'application/json' };
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
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

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(url, config);

    if (response.status === 401 && auth) {
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${this.token}`;
        const retryResponse = await fetch(url, { ...config, headers });
        if (!retryResponse.ok) {
          const err = await retryResponse.json().catch(() => ({ message: retryResponse.statusText }));
          throw new ApiError(retryResponse.status, err.message || 'Request failed');
        }
        if (retryResponse.status === 204) return null;
        return retryResponse.json();
      }
      this.clearTokens();
      throw new ApiError(401, 'Session expired');
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: response.statusText }));
      throw new ApiError(response.status, err.message || 'Request failed');
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async tryRefresh() {
    const refresh = this.refreshToken;
    if (!refresh) return false;
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refresh }),
      });
      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
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
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/admin/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Upload failed' }));
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
