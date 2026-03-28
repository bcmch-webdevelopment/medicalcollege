import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AccreditationMenu = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const navigate = useNavigate();

  // ✅ Hardcoded Menu Data
  const menuData = [
    {
      title: "NAAC",
      path: "/accreditation/naac",
    },
    {
      title: "KUHS",
      path: "/accreditation/kuhs",
    },
    {
      title: "Accreditation",
      path: "/accreditation",
    },
    {
      title: "Prospectus",
      path: "/prospectus",
    },
    {
      title: "Core Competencies",
      path: "/core-competencies",
    },
    {
      title: "NIRF Ranking",
      key: "nirf",
      children: [
        { label: "NIRF", path: "/nirf" },
        { label: "NIRF 2024", path: "/nirf-2024" },
        { label: "NIRF 2025", path: "/nirf-2025" },
      ],
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
      <button className="px-4 py-2 uppercase hover:text-red-700 transition">
        Accreditation
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

export default AccreditationMenu;