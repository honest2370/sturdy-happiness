// CONSOLIDATED FILE - Contains all remaining pages for the application
import { Outlet } from 'react-router-dom';

// ===== BUYER PAGES =====
export function BuyerProducts() {
  return <div className="p-6"><h1 className="text-white text-2xl">My Products</h1></div>;
}

export function BuyerProductView() {
  return <div className="p-6"><h1 className="text-white text-2xl">Product View</h1></div>;
}

export function ExternalProductAccess() {
  return <div className="min-h-screen bg-slate-950 p-6"><h1 className="text-white text-2xl">External Product Access</h1></div>;
}

// ===== SELLER PAGES =====
export function SellerLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3">
        <h1 className="text-white font-bold text-lg">SELLIZI Seller</h1>
      </div>
      <Outlet />
    </div>
  );
}

export function SellerDashboard() {
  return <div className="p-6"><h1 className="text-white text-2xl">Seller Dashboard</h1></div>;
}

export function AnalyticsOverview() {
  return <div className="p-6"><h1 className="text-white text-2xl">Analytics</h1></div>;
}

export function ProductsList() {
  return <div className="p-6"><h1 className="text-white text-2xl">Products</h1></div>;
}

export function ProductUpload() {
  return <div className="p-6"><h1 className="text-white text-2xl">Upload Product</h1></div>;
}

export function OrdersList() {
  return <div className="p-6"><h1 className="text-white text-2xl">Orders</h1></div>;
}

export function CustomersList() {
  return <div className="p-6"><h1 className="text-white text-2xl">Customers</h1></div>;
}

export function MarketingHub() {
  return <div className="p-6"><h1 className="text-white text-2xl">Marketing Hub</h1></div>;
}

export function StoreSettings() {
  return <div className="p-6"><h1 className="text-white text-2xl">Store Settings</h1></div>;
}

export function ProfileSettings() {
  return <div className="p-6"><h1 className="text-white text-2xl">Profile Settings</h1></div>;
}

// ===== ADMIN PAGES =====
export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3">
        <h1 className="text-white font-bold text-lg">SELLIZI Admin</h1>
      </div>
      <Outlet />
    </div>
  );
}

export function AdminDashboard() {
  return <div className="p-6"><h1 className="text-white text-2xl">Admin Dashboard</h1></div>;
}

export function UserManagement() {
  return <div className="p-6"><h1 className="text-white text-2xl">User Management</h1></div>;
}

export function TransactionsList() {
  return <div className="p-6"><h1 className="text-white text-2xl">Transactions</h1></div>;
}

export function SystemSettings() {
  return <div className="p-6"><h1 className="text-white text-2xl">System Settings</h1></div>;
}

// ===== SHARED PAGES =====
export function Support() {
  return <div className="min-h-screen bg-slate-950 p-6"><h1 className="text-white text-2xl">Support</h1></div>;
}

export function Notifications() {
  return <div className="min-h-screen bg-slate-950 p-6"><h1 className="text-white text-2xl">Notifications</h1></div>;
}

export function Help() {
  return <div className="min-h-screen bg-slate-950 p-6"><h1 className="text-white text-2xl">Help Center</h1></div>;
}

export function Terms() {
  return <div className="min-h-screen bg-slate-950 p-6"><h1 className="text-white text-2xl">Terms of Service</h1></div>;
}

export function Privacy() {
  return <div className="min-h-screen bg-slate-950 p-6"><h1 className="text-white text-2xl">Privacy Policy</h1></div>;
}
