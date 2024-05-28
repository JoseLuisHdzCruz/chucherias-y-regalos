import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';

const AdminLogin = lazy(() => import('../components/Admin/AdminLogin'));
const HomeAdmin = lazy(() => import('../views/Admin/Home'));
const PrecioEnvios = lazy(() => import('../views/Admin/PrecioEnvios'));
const NotificationAdmin = lazy(() => import('../views/Admin/NotificationAdmin'));
const Inventario = lazy(() => import('../views/Admin/Inventario'));
const AddProduct = lazy(() => import('../views/Admin/AddProduct'));

const title = "Chucherias & Regalos";

const AdminRoutes = () => (
  
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminLayout><HomeAdmin title={title} /></AdminLayout>} />
      <Route path="/precio-envios" element={<AdminLayout><PrecioEnvios title={title} /></AdminLayout>} />
      <Route path="/notificationsAdmin" element={<AdminLayout><NotificationAdmin title={title} /></AdminLayout>} />
      <Route path="/inventory" element={<AdminLayout><Inventario title={title} /></AdminLayout>} />
      <Route path="/inventory/add-product" element={<AdminLayout><AddProduct title={title} /></AdminLayout>} />
    </Routes>
  </Suspense>
);

export default AdminRoutes;
