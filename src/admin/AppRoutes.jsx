import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const PageList = lazy(() => import('./pages/Content/PageList'));
const PageEditor = lazy(() => import('./pages/Content/PageEditor'));
const NewsManagement = lazy(() => import('./pages/NewsManagement'));
const MediaLibrary = lazy(() => import('./pages/Media/MediaLibrary'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/pages" element={<ProtectedRoute><PageList /></ProtectedRoute>} />
        <Route path="/pages/:pageKey" element={<ProtectedRoute><PageEditor /></ProtectedRoute>} />
        <Route path="/news" element={<ProtectedRoute><NewsManagement /></ProtectedRoute>} />
        <Route path="/media" element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
