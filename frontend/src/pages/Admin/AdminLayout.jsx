import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Settings, Image, Building } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 bg-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/facilities" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition-colors">
            <Building className="h-5 w-5" />
            Facilities
          </Link>
          <Link to="/admin/banners" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition-colors">
            <Image className="h-5 w-5" />
            Banners & Sliders
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded hover:bg-red-600 transition-colors text-left"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
