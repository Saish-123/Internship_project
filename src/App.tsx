import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store';
import { setOfflineStatus } from './store/uiSlice';
import { fetchShipments } from './store/shipmentsSlice';
import { SkipLink } from './components/common/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LoadingSkeleton } from './components/common/LoadingSkeleton';

// Code splitting with React.lazy
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ShipmentsListPage = lazy(() => import('./pages/ShipmentsListPage').then(m => ({ default: m.ShipmentsListPage })));
const ShipmentDetailPage = lazy(() => import('./pages/ShipmentDetailPage').then(m => ({ default: m.ShipmentDetailPage })));
const BookingFormPage = lazy(() => import('./pages/BookingFormPage').then(m => ({ default: m.BookingFormPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const AdminHubPage = lazy(() => import('./pages/AdminHubPage').then(m => ({ default: m.AdminHubPage })));
const WireframePage = lazy(() => import('./pages/WireframePage').then(m => ({ default: m.WireframePage })));

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { wireframeMode } = useAppSelector(state => state.ui);

  // Sync online/offline status with browser events
  useEffect(() => {
    const handleOnline = () => dispatch(setOfflineStatus(false));
    const handleOffline = () => dispatch(setOfflineStatus(true));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial fetch of consignments
    dispatch(fetchShipments());

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  return (
    <div className={`min-h-screen flex flex-col ${wireframeMode ? 'blueprint-mode font-mono' : ''}`}>
      <SkipLink />
      <Navbar />

      {wireframeMode && (
        <div 
          role="status" 
          aria-live="polite"
          className="bg-cyan-900 text-cyan-200 border-b border-cyan-700 py-1 px-4 text-xs font-mono text-center flex items-center justify-center gap-2"
        >
          <span className="font-bold uppercase tracking-wider">[BLUEPRINT WIREFRAME MODE ACTIVE]</span>
          <span>Showing layout structural components &amp; accessibility landmarks</span>
        </div>
      )}

      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 focus:outline-none" tabIndex={-1}>
        <Suspense fallback={<LoadingSkeleton count={3} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shipments" element={<ShipmentsListPage />} />
            <Route path="/shipments/:id" element={<ShipmentDetailPage />} />
            <Route path="/book" element={<BookingFormPage />} />
            <Route path="/admin" element={<AdminHubPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wireframes" element={<WireframePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
