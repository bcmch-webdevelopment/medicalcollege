import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NewsMenu = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const navigate = useNavigate();

  // ✅ NMC Menu Data
  const menuData = [
   
    {
      title: "News & Events",
      key: "nmc-info",
      children: [
        { label: "News", path: "/news" },
        { label: "Events", path: "/events" },
        
      ],
    },
    {
      title: "College Newsletter",
      path: "/newsletter",
    }
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setSubmenu("");
      }}
    >
      {/* Main Button */}
      <button className="px-4 py-2 uppercase hover:text-red-700">
        News & Events
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 bg-white shadow-lg w-64 z-50 border">

          {menuData.map((item, index) => (
            <div key={index}>

              {/* With Submenu */}
              {item.children ? (
                <div
                  className="group relative px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onMouseEnter={() => setSubmenu(item.key)}
                  onMouseLeave={() => setSubmenu("")}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition" />
                  </div>

                  {/* Submenu */}
                  {submenu === item.key && (
                    <div className="absolute top-0 left-full bg-white shadow-lg w-72 border">
                      {item.children.map((sub, i) => (
                        <div
                          key={i}
                          onClick={() => navigate(sub.path)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        >
                          {sub.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Normal Item */
                <div
                  onClick={() => navigate(item.path)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                >
                  {item.title}
                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default NewsMenu;