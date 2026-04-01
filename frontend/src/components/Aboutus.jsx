import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AboutUsMenu = () => {
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/aboutus');
        if (res.ok) {
          const data = await res.json();
          setMenuData(data);
        }
      } catch (err) {
        console.error("Failed to fetch About Us menu", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="px-4 py-2 uppercase hover:text-red-700 font-semibold transition-colors">
        About Us
      </button>

      {open && (
        <div className="absolute top-full left-0 bg-white shadow-lg w-64 z-50 border border-gray-100 rounded-b-md overflow-hidden">
          {menuData.length > 0 ? (
            menuData.map((item) => (
              <div 
                key={item._id}
                onClick={() => {
                  navigate(`/about/${item.slug}`);
                  setOpen(false);
                }}
                className="px-4 py-3 hover:bg-red-50 hover:text-red-700 cursor-pointer text-gray-700 text-sm font-medium border-b border-gray-50 last:border-none transition-colors"
              >
                {item.title}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 italic text-sm">
              Loading items...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUsMenu;