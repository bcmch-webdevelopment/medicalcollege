import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NavDropdown = ({ title, section }) => {
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [activeItem, setActiveItem] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pages/${section}`);
        if (res.ok) {
          const data = await res.json();
          setMenuData(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(`Failed to fetch ${title} menu`, err);
      }
    };
    fetchMenu();
  }, [section]);

  const rootItems = menuData.filter(item => !item.parentId);
  const children = activeItem ? menuData.filter(item => item.parentId === activeItem._id) : [];

  return (
    <div
      className="relative z-50 group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setActiveItem(null);
      }}
    >
      <button className="px-4 py-2 uppercase hover:text-red-700 font-semibold transition-colors flex items-center">
        {title}
      </button>

      {open && (
        <div className="absolute top-full left-0 flex bg-white shadow-lg border border-gray-100 rounded-md overflow-hidden min-w-[16rem]">
          
          {/* Main Menu */}
          <div className="w-64 max-h-[70vh] overflow-y-auto">
            {rootItems.length > 0 ? (
              rootItems.map((item) => {
                const hasChildren = menuData.some(m => m.parentId === item._id);
                return (
                  <div
                    key={item._id}
                    onMouseEnter={() => setActiveItem(item)}
                    onClick={() => {
                      if (!hasChildren) {
                        navigate(`/${section}/${item.slug}`);
                        setOpen(false);
                      }
                    }}
                    className="flex justify-between items-center px-4 py-3 hover:bg-red-50 hover:text-red-700 cursor-pointer text-gray-700 text-sm font-medium border-b border-gray-50 last:border-none"
                  >
                    {item.title}
                    {hasChildren && <ChevronRight size={16} />}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm italic">
                No items found
              </div>
            )}
          </div>

          {/* Sub Menu */}
          {children.length > 0 && (
            <div className="w-64 border-l border-gray-100 bg-gray-50 max-h-[70vh] overflow-y-auto">
              {children.map((sub) => {
                const hasSubChildren = menuData.some(m => m.parentId === sub._id);
                return (
                  <div
                    key={sub._id}
                    onClick={() => {
                      navigate(`/${section}/${sub.slug}`);
                      setOpen(false);
                    }}
                    className="flex justify-between items-center px-4 py-3 hover:bg-red-100 cursor-pointer text-gray-700 text-sm border-b border-gray-200 font-medium"
                  >
                    {sub.title}
                    {hasSubChildren && <ChevronRight size={16} className="text-gray-400" />}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default NavDropdown;
