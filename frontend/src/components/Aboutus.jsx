import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AboutUsMenu = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const navigate = useNavigate();

  //  About Us Menu Data
  const menuData = [
    {
      title: "History &Values",
      path: "/history",
      
    },
    
    {
      title: "Mission & Objective",
      path: "/vision-mission",
    },
    {
      title: "Metropolitan's Message",
      path: "/metropolitan",
    },
    {
      title: "Principal Message",
      path: "/principal-message",
    },
    {
      title: "Administrative Team",
      path: "/admin-team",
    },
    {
      title: "Affiliation",
      key: "Affiliation",
      children: [
        { label: "Affiliation", path: "/affiliation" },
        { label: "Letter of Permission/Renewal/Recognition(NMC)", path: "/letter-of-permission" },
         { label: "Letter of Affiliation(KUHS)", path: "/letter-of-affiliation" },
        
      ],
    },
    {
      title: "Infrastructure & Facilities",
      path: "/infrastructure",
    },
    {
      title: "Citizen Charter",
      path: "/citizen-charter",
    },
    {
      title: "Contact Us",
      path: "/contact-us",
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
      
      <button className="px-4 py-2 uppercase hover:text-red-700">
        About Us
      </button>

     
      {open && (
        <div className="absolute top-full left-0 bg-white shadow-lg w-64 z-50 border">

          {menuData.map((item, index) => (
            <div key={index}>
              
             
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

                
                  {submenu === item.key && (
                    <div className="absolute top-0 left-full bg-white shadow-lg w-68 border">
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