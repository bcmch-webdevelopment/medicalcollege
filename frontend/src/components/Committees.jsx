import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Shield,
  Users,
  BookOpen,
  AlertTriangle,
  FileText,
  DollarSign,
  Heart,
  Settings,
  Award,
  ClipboardList,
} from "lucide-react";

// Committees Data
const committees = [
  { title: "Academic Monitoring Cell", icon: BookOpen, description: "Monitors academic quality and standards." },
  { title: "Alumni Association (AA)", icon: Users, description: "Connects alumni with institution activities." },
  { title: "Anti-Ragging Committee", icon: Shield, description: "Prevents and addresses ragging incidents." },
  { title: "College Council", icon: ClipboardList, description: "Governs academic and administrative decisions." },
  { title: "Curriculum Committee", icon: BookOpen, description: "Designs and updates curriculum structure." },
  { title: "Disciplinary Committee", icon: AlertTriangle, description: "Handles student discipline and conduct issues." },
  { title: "Ethics Committee", icon: Heart, description: "Ensures ethical standards in academics and research." },
  { title: "Exam Scrutiny Committee", icon: FileText, description: "Reviews examination processes and results." },
  { title: "Finance Committee", icon: DollarSign, description: "Manages institutional financial planning." },
  { title: "Grievance Redressal Committee", icon: AlertTriangle, description: "Handles complaints from students and staff." },
  { title: "Hospital Management Committee", icon: Settings, description: "Oversees hospital operations and services." },
  { title: "Hostel Management Committee", icon: Users, description: "Manages hostel facilities and student welfare." },
  { title: "IQAC Committee", icon: Award, description: "Ensures internal quality assurance and improvement." },
];

export default function Committees() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Institutional Committees
        </h1>

        {/* List */}
        <div className="space-y-4">
          {committees.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">

                    {/* Red + White Icon Style */}
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 border border-red-200">
                      <Icon className="text-red-600" size={18} />
                    </div>

                    <span className="font-medium text-gray-800">
                      {item.title}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="text-gray-600" />
                  ) : (
                    <ChevronDown className="text-gray-600" />
                  )}
                </button>

                {/* Content */}
                {isOpen && (
                  <div className="px-5 pb-4 pt-2 text-sm text-gray-600 border-t">
                    {item.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}