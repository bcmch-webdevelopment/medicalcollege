import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NMCMenu = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const navigate = useNavigate();

  // ✅ NMC Menu Data
  const menuData = [
    {
      title: "NMC Inspection Data",
      path: "/nmc/inspection-data",
    },
    {
      title: "NMC Information",
      key: "nmc-info",
      children: [
        { label: "Principal and Medical Superintendent", path: "/nmc/principal-medical-superintendent" },
        { label: "Teaching and Non-Teaching", path: "/nmc/teaching-non-teaching" },
        { label: "Affiliation", path: "/nmc/affiliation" },
        { label: "Fee Details", path: "/nmc/fee-details" },
        { label: "Students Admitted", path: "/nmc/students-admitted" },
        { label: "Exam Result", path: "/nmc/exam-result" },
        { label: "Anti Ragging", path: "/nmc/anti-ragging" },
        { label: "Gender Harassment", path: "/nmc/gender-harassment" },
        { label: "Anti Ragging Toll Free", path: "/nmc/anti-ragging-toll-free" },
        { label: "Status of Recognition", path: "/nmc/status-recognition" },
        { label: "Research Publications Yearly", path: "/nmc/research-publications" },
        { label: "Clinical Material", path: "/nmc/clinical-material" },
        { label: "College Council", path: "/nmc/college-council" },
      ],
    },
    {
      title: "NMC Biometric Attandance",
      path: "/inspection-data",
    },
    {
      title: "Anti Ragging",
      path: "/inspection-data",
    },
    {
      title: "Stipend Details",
      path: "/inspection-data",
    },
    {
      title: "Village Adoption Details",
      path: "/inspection-data",
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
        NMC
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 bg-white shadow-lg w-64 z-50 border">

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
                    <ChevronRight className="w-4 h-4 text-black-600 group-hover:translate-x-1 transition" />
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

export default NMCMenu;