import React from "react";

const Affiliation = () => {
  const courses = [
    {
      name: "MBBS",
      years: ["2025", "2024", "2023", "2022", "2021", "2020", "2019"],
    },
    {
      name: "MD General Medicine",
      years: ["2025", "2024", "2023", "2022", "2021"],
    },
    {
      name: "MD Anaesthesiology",
      years: ["2025", "2024", "2023", "2022", "2021"],
    },
    {
      name: "MS Obstetrics & Gynaecology",
      years: ["2025", "2024", "2023", "2022", "2021"],
    },
    {
      name: "MS Orthopaedics",
      years: ["2025", "2024", "2023", "2022", "2021"],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Affiliation
        </h1>

        <div className="w-20 h-1 bg-red-700 mx-auto mb-8 rounded"></div>

        {/* University Section */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-10 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Affiliated University
          </h2>
          <p className="text-gray-700">
            This institution is affiliated with
          </p>
          <p className="text-lg font-semibold text-red-700 mt-2">
            Kerala University of Health Sciences (KUHS)
          </p>
          <p className="text-gray-600 mt-1">Thrissur, Kerala, India</p>
        </div>

        {/* Description */}
        <div className="text-gray-700 space-y-4 leading-relaxed mb-10 text-justify">
          <p>
            Believers Church Medical College Hospital is a recognized medical 
            institution affiliated with the Kerala University of Health Sciences (KUHS). 
            The affiliation ensures that the academic curriculum, examinations, and 
            degree certifications are governed by KUHS regulations.
          </p>

          <p>
            The college offers undergraduate and postgraduate medical programs 
            including MBBS, MD, and MS courses. Each program is periodically 
            reviewed and approved by KUHS through official affiliation letters.
          </p>

          <p>
            The institution maintains high standards in medical education, 
            clinical training, and research as per the guidelines set by the 
            university and regulatory authorities.
          </p>
        </div>

        {/* Affiliation Table */}
        <div>
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Course-wise Affiliation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Affiliation Years</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {course.name}
                    </td>
                    <td className="p-3 text-gray-600">
                      {course.years.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-gray-50 border-l-4 border-red-600 p-4 rounded">
          <p className="text-gray-700 text-sm">
            Note: Affiliation letters are issued annually by KUHS for each 
            course after evaluation and compliance verification.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Affiliation;