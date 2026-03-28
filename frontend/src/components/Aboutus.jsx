import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AboutUsMenu = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const navigate = useNavigate();

  // ✅ Hardcoded About Us Menu Data
  const menuData = [
    {
      title: "About College",
      key: "about-college",
      children: [
        { label: "History", path: "/about/history" },
        { label: "Vision & Mission", path: "/about/vision-mission" },
      ],
    },
    {
      title: "Administration",
      key: "administration",
      children: [
        { label: "Metropolitan Message", path: "/about/metropolitan-message" },
        { label: "Principal Message", path: "/about/principal-message" },
        { label: "Admin Team", path: "/about/admin-team" },
      ],
    },
    {
      title: "Infrastructure",
      path: "/about/infrastructure",
    },
    {
      title: "Affiliation & Recognition",
      path: "/about/affiliation",
    },
    {
      title: "Hospital",
      path: "/about/hospital",
    },
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
        About Us
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
                    <div className="absolute top-0 left-full bg-white shadow-lg w-56 border">
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

export default AboutUsMenu;