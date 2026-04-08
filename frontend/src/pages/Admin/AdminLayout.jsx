import React, { useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Dynamic Sidebar */}
      <AdminSidebar 
        isMobileSidebarOpen={isMobileSidebarOpen} 
        setIsMobileSidebarOpen={setIsMobileSidebarOpen} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <h1 className="text-lg font-bold text-slate-800">Admin Panel</h1>
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-auto bg-slate-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
