import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  FileText,
  Users,
  Settings,
  Layers,
  Hash,
  List,
  Phone,
  Link as LinkIcon,
  Database,
  Menu,
} from "lucide-react";

const sections = [
  { key: "overview", name: "Overview", icon: BookOpen },
  { key: "hours", name: "Hours", icon: Clock },
  { key: "rules", name: "Rules", icon: FileText },
  { key: "staff", name: "Staff", icon: Users },
  { key: "services", name: "Services", icon: Settings },
  { key: "sections", name: "Sections", icon: Layers },
  { key: "guide", name: "Guide to Class Numbers", icon: Hash },
  { key: "index", name: "Index to Class Numbers", icon: List },
  { key: "contact", name: "Contact", icon: Phone },
  { key: "link", name: "Link", icon: LinkIcon },
  { key: "holdings", name: "Holdings", icon: Database },
];

const Library = () => {
  const [active, setActive] = useState("overview");
  const [showMenu, setShowMenu] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "overview":
        return (
          <p>
            The Central Library is a major academic resource center with a large
            collection of books, journals, and digital resources supporting
            education and research.
          </p>
        );

      case "hours":
        return (
          <div>
            <p><strong>Monday – Saturday:</strong> 8:00 AM – 8:00 PM</p>
            <p><strong>Closed:</strong> Public Holidays</p>
          </div>
        );

      case "rules":
        return (
          <ul className="list-disc ml-6">
            <li>Maintain silence inside the library</li>
            <li>Carry ID card at all times</li>
            <li>No food allowed</li>
            <li>Return books on time</li>
          </ul>
        );

      case "staff":
        return <p>Details of librarians and supporting staff will be updated here.</p>;

      case "services":
        return (
          <ul className="list-disc ml-6">
            <li>Book lending</li>
            <li>E-library access</li>
            <li>Reference services</li>
            <li>Photocopy services</li>
          </ul>
        );

      case "sections":
        return <p>Includes Reference Section, Periodicals, Digital Library, etc.</p>;

      case "guide":
        return <p>Guide to classification system used in the library.</p>;

      case "index":
        return <p>Index of classification numbers for easy book search.</p>;

      case "contact":
        return <p>Library contact details will be provided here.</p>;

      case "link":
        return <p>Useful library links and external resources.</p>;

      case "holdings":
        return <p>Information about total books, journals, and digital materials.</p>;

      default:
        return <p>Select a section to view details.</p>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-red-700 text-white py-10 relative">
        <div className="max-w-7xl mx-auto px-4">

          {/* TITLE ROW */}
          <div className="flex items-center justify-between">

            {/* Left: Title */}
            <div>
              <h1 className="text-3xl font-bold">Central Library</h1>
              <p className="text-sm opacity-80">
                Home / Facilities / Library
              </p>
            </div>

            {/* Right: Hamburger */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-md hover:bg-red-800 transition"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-4 mt-6 bg-white text-black rounded-xl shadow-lg p-6 z-[9999] w-[90%] max-w-3xl">

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-center">

                {sections.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.key}
                      onClick={() => {
                        setActive(item.key);
                        setShowMenu(false);
                      }}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 group-hover:bg-red-700 transition">
                        <Icon className="w-5 h-5 text-red-700 group-hover:text-white" />
                      </div>

                      <span className="text-xs mt-1 text-gray-700 group-hover:text-red-700">
                        {item.name}
                      </span>
                    </div>
                  );
                })}

              </div>

            </div>
          )}

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white shadow-md rounded-xl p-6 border">

          <h2 className="text-xl font-semibold text-red-700 mb-4 capitalize">
            {active.replace("-", " ")}
          </h2>

          <div className="text-gray-700 leading-relaxed">
            {renderContent()}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Library;