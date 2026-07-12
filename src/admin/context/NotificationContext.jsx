import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Snackbar, Alert, Badge } from '@mui/material';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

const apiWithAuth = {
  get: (path, params) => api.get(path, params, true),
};

export function NotificationProvider({ children }) {
  const { t } = useTranslation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [toast, setToast] = useState(null);
  const prevCountRef = useRef(0);
  const intervalRef = useRef(null);

  const fetchUnread = useCallback(async () => {
    try {
      const data = await apiWithAuth.get('/admin/dashboard');
      const count = data?.unreadMessages ?? 0;
      const prev = prevCountRef.current;
      if (count > prev && prev > 0) {
        setToast({ open: true, message: t('admin.notifications.newMessages', { count: count - prev, defaultValue: '{{count}} new contact message(s) received' }), severity: 'info' });
      }
      prevCountRef.current = count;
      setUnreadCount(count);
    } catch {}
  }, [t]);

  useEffect(() => {
    fetchUnread();
    intervalRef.current = setInterval(fetchUnread, 15000);
    return () => clearInterval(intervalRef.current);
  }, [fetchUnread]);

  const dismissToast = () => setToast({ ...toast, open: false });

  return (
    <NotificationContext.Provider value={{ unreadCount, fetchUnread }}>
      {children}
      <Snackbar open={toast?.open} autoHideDuration={6000} onClose={dismissToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast?.severity || 'info'} variant="filled" onClose={dismissToast}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
