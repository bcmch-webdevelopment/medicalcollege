import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AcademicsMenu = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const navigate = useNavigate();

  // ✅ Hardcoded Menu Data (inside component)
  const menuData = [
    {
      title: "Attendance",
      key: "attendance",
      children: [
        { label: "UG", path: "/attendance/ug" },
        { label: "PG", path: "/attendance/pg" },
      ],
    },
    {
      title: "Exam",
      key: "exam",
      children: [
        { label: "Notification", path: "/exam/notification" },
        { label: "Time Table", path: "/exam/timetable" },
        { label: "Results", path: "/exam/results" },
      ],
    },
    {
      title: "Teaching Schedule",
      key: "teaching",
      children: [
        { label: "UG", path: "/teaching/ug" },
        { label: "PG", path: "/teaching/pg" },
        { label: "Super Specialty", path: "/teaching/superspeciality" },
      ],
    },
    {
      title: "Research",
      key: "research",
      children: [
        { label: "Research Team", path: "/research/team" },
        { label: "Ongoing Projects", path: "/research/projects" },
        { label: "Publications", path: "/research/publications" },
      ],
    },
    {
      title: "Awards & Achievements",
      path: "/awards",
    },
    {
      title: "CME",
      path: "/cme",
    },
    {
      title: "Workshops & Conference",
      key: "workshops",
      children: [
        { label: "CME", path: "/workshops/cme" },
        { label: "Workshops & Conference", path: "/workshops/conference" },
      ],
    },
    {
      title: "Students Feedback",
      path: "/student-feedback",
    },
    {
      title: "Revised UG Curriculum",
      key: "ug",
      children: [
        { label: "Foundation Course", path: "/ug/foundation" },
        { label: "CBME Time Table", path: "/ug/cbme" },
      ],
    },
    {
      title: "Student Manual",
      path: "/student-manual",
    },
    {
      title: "Student Support",
      path: "/student-support",
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
        Academics
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

export default AcademicsMenu;