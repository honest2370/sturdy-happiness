import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Auth Pages
import WelcomePage from './pages/auth/WelcomePage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Buyer Pages
import BuyerLayout from './pages/buyer/BuyerLayout';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerProducts from './pages/buyer/BuyerProducts';
import BuyerProductView from './pages/buyer/BuyerProductView';
import ExternalProductAccess from './pages/buyer/ExternalProductAccess';

// Seller Pages
import SellerLayout from './pages/seller/SellerLayout';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerAnalytics from './pages/seller/analytics/AnalyticsOverview';
import SellerProducts from './pages/seller/products/ProductsList';
import SellerProductUpload from './pages/seller/products/ProductUpload';
import SellerOrders from './pages/seller/orders/OrdersList';
import SellerCustomers from './pages/seller/customers/CustomersList';
import SellerMarketing from './pages/seller/marketing/MarketingHub';
import SellerStoreSettings from './pages/seller/settings/StoreSettings';
import SellerProfile from './pages/seller/profile/ProfileSettings';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/users/UserManagement';
import AdminTransactions from './pages/admin/transactions/TransactionsList';
import AdminSettings from './pages/admin/settings/SystemSettings';

// Shared Pages
import SupportPage from './pages/shared/Support';
import NotificationsPage from './pages/shared/Notifications';
import HelpPage from './pages/shared/Help';
import TermsPage from './pages/shared/Terms';
import PrivacyPage from './pages/shared/Privacy';

// Progress Bar
import ProgressBar from './components/ProgressBar';

function App() {
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service worker registration failed:', error);
      });
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ProgressBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/external-access/:productId" element={<ExternalProductAccess />} />
        
        {/* Shared Routes */}
        <Route path="/support" element={<SupportPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* Buyer Routes */}
        <Route path="/buyer" element={<BuyerLayout />}>
          <Route index element={<Navigate to="/buyer/dashboard" replace />} />
          <Route path="dashboard" element={<BuyerDashboard />} />
          <Route path="products" element={<BuyerProducts />} />
          <Route path="products/:id" element={<BuyerProductView />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<Navigate to="/seller/dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="analytics" element={<SellerAnalytics />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/upload" element={<SellerProductUpload />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="customers" element={<SellerCustomers />} />
          <Route path="marketing" element={<SellerMarketing />} />
          <Route path="settings" element={<SellerStoreSettings />} />
          <Route path="profile" element={<SellerProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/adminentry" element={<AdminLayout />}>
          <Route index element={<Navigate to="/adminentry/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
