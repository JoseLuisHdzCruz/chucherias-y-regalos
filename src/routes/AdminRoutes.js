import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext';
import AdminLayout from '../layout/AdminLayout';

const AdminLogin = lazy(() => import('../components/Admin/AdminLogin'));
const HomeAdmin = lazy(() => import('../views/Admin/Home'));
const PrecioEnvios = lazy(() => import('../views/Admin/PrecioEnvios'));
const NotificationAdmin = lazy(() => import('../views/Admin/NotificationAdmin'));
const Inventario = lazy(() => import('../views/Admin/Inventario'));
const AddProduct = lazy(() => import('../views/Admin/AddProduct'));
const EditProduct = lazy(() => import('../views/Admin/EditProduct'));
const Empleados = lazy(() => import('../views/Admin/Empleados'));
const AddEmpleados = lazy(() => import('../views/Admin/AddEmpleados'));
const EditEmpleados = lazy(() => import('../views/Admin/EditEmpleados'));
const SuspendedUsers = lazy(() => import('../views/Admin/SuspendedUsers'));
const SalesStatistics = lazy(() => import('../views/Admin/SalesStatistics'));
const EditPriceProducts = lazy(() => import('../views/Admin/EditPriceProducts'));
const EditStockProducts = lazy(() => import('../views/Admin/EditStockProducts'));

const title = "Chucherías & Regalos";

// Componente para proteger las rutas administrativas
const PrivateRoute = ({ children }) => {
  const { token } = useAdminAuth();
  return token ? children : <Navigate to="/admin" />;
};

const AdminRoutes = () => (
  <AdminAuthProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <AdminLayout><HomeAdmin title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/precio-envios" 
          element={
            <PrivateRoute>
              <AdminLayout><PrecioEnvios title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-stock" 
          element={
            <PrivateRoute>
              <AdminLayout><EditStockProducts title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-price" 
          element={
            <PrivateRoute>
              <AdminLayout><EditPriceProducts title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/sales-statictics" 
          element={
            <PrivateRoute>
              <AdminLayout><SalesStatistics title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/notificationsAdmin" 
          element={
            <PrivateRoute>
              <AdminLayout><NotificationAdmin title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory" 
          element={
            <PrivateRoute>
              <AdminLayout><Inventario title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/suspended-users" 
          element={
            <PrivateRoute>
              <AdminLayout><SuspendedUsers title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory/add-product" 
          element={
            <PrivateRoute>
              <AdminLayout><AddProduct title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory/edit-product/:productId" 
          element={
            <PrivateRoute>
              <AdminLayout><EditProduct title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/employs/add-employee" 
          element={
            <PrivateRoute>
              <AdminLayout><AddEmpleados title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/employs/edit-employee/:empleadoId" 
          element={
            <PrivateRoute>
              <AdminLayout><EditEmpleados title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/employs" 
          element={
            <PrivateRoute>
              <AdminLayout><Empleados title={title} /></AdminLayout>
            </PrivateRoute>
          } 
        />
      </Routes>
    </Suspense>
  </AdminAuthProvider>
);

export default AdminRoutes;
