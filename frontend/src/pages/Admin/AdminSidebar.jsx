import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, LayoutDashboard, Settings, Info, Building, BookOpen, Image, X, LogOut } from 'lucide-react';
import adminMenu from './adminMenu.json';

const iconMap = {
  LayoutDashboard,
  Settings,
  Info,
  Building,
  BookOpen,
  Image
};

const MenuItem = ({ item, level = 0, setIsMobileSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const hasChildren = item.children && item.children.length > 0;
  
  // Helper to accurately match paths or check if any child is active
  const isItemActive = (navItem) => {
    if (navItem.path === location.pathname) return true;
    if (navItem.children) {
      return navItem.children.some(child => isItemActive(child));
    }
    return false;
  };

  const isActive = hasChildren ? false : location.pathname === item.path;
  const isChildActive = hasChildren && isItemActive(item);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const IconComponent = item.icon ? iconMap[item.icon] : null;

  const handleToggle = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const navLinkClasses = ({ isActive }) => `
    flex items-center gap-3 w-full p-3 rounded transition-colors
    ${level > 0 ? (level === 1 ? 'pl-9' : 'pl-14 text-sm') : ''}
    ${isActive ? 'bg-indigo-600 text-white font-medium shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
  `;

  if (hasChildren) {
    return (
      <div className="flex flex-col">
        <button 
          onClick={handleToggle}
          className={`flex items-center justify-between w-full p-3 rounded transition-colors text-slate-300 hover:bg-slate-800 hover:text-white ${level > 0 ? (level === 1 ? 'pl-9' : 'pl-14 text-sm') : ''} ${isChildActive ? 'bg-slate-800/50 text-white font-medium border-l-4 border-indigo-500' : 'border-l-4 border-transparent'}`}
        >
          <div className="flex items-center gap-3">
            {IconComponent && <IconComponent className="h-5 w-5" />}
            <span className="text-left">{item.title}</span>
          </div>
          {isOpen ? <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> : <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />}
        </button>
        
        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="mt-1 space-y-1">
              {item.children.map((child, index) => (
                <MenuItem key={index} item={child} level={level + 1} setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink 
      to={item.path} 
      className={navLinkClasses}
      onClick={() => {
        // on mobile collapse the sidebar when a link is clicked
        if (setIsMobileSidebarOpen && window.innerWidth < 1024) {
          setIsMobileSidebarOpen(false);
        }
      }}
    >
      {IconComponent && <IconComponent className="h-5 w-5" />}
      <span>{item.title}</span>
    </NavLink>
  );
};

const AdminSidebar = ({ isMobileSidebarOpen, setIsMobileSidebarOpen, handleLogout }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-white flex flex-col 
        transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Settings className="h-5 w-5 text-white animate-spin-slow" />
            </div>
            <h2 className="text-xl font-bold tracking-wide">
              Admin Panel
            </h2>
          </div>
          <button 
            className="lg:hidden p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {adminMenu.map((item, index) => (
            <MenuItem key={index} item={item} setIsMobileSidebarOpen ={setIsMobileSidebarOpen} />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg bg-red-500/10 hover:bg-red-600 transition-colors text-left text-red-500 hover:text-white font-medium"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
