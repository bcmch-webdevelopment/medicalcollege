import React from "react";

const LettersOfAffiliation = () => {
  const data = [
    {
      course: "MBBS",
      letters: [
        "KUHS2025","KUHS2024","KUHS2023","KUHS2022","KUHS2021",
        "KUHS2020","KUHS2019","KUHS2018","KUHS2017","KUHS2016"
      ],
    },
    {
      course: "MD Pathology",
      letters: [
        "KUHS2025","KUHS2024","KUHS2023/Reco","KUHS2023",
        "KUHS2022","KUHS2021","KUHS2020"
      ],
    },
    {
      course: "MD Anaesthesiology",
      letters: ["KUHS2025","KUHS2024","KUHS2023","KUHS2022","KUHS2021"],
    },
    {
      course: "MD General Medicine",
      letters: ["KUHS2025","KUHS2024","KUHS2023","KUHS2022","KUHS2021"],
    },
    {
      course: "MS Ophthalmology",
      letters: ["KUHS2025","KUHS2024","KUHS2023","KUHS2022","KUHS2021"],
    },
    {
      course: "MS Obstetrics & Gynaecology",
      letters: ["KUHS2025","KUHS2024","KUHS2023","KUHS2022","KUHS2021"],
    },
    {
      course: "MS Orthopaedics",
      letters: ["KUHS2025","KUHS2024","KUHS2023","KUHS2022","KUHS2021"],
    },
    {
      course: "MS General Surgery",
      letters: ["KUHS2025","KUHS2024"],
    },
    {
      course: "MD Microbiology",
      letters: ["KUHS2025","KUHS2024"],
    },
    {
      course: "MD Radio-Diagnosis",
      letters: ["KUHS2025","KUHS2024"],
    },
    {
      course: "MD Emergency Medicine",
      letters: ["KUHS2025","KUHS2024"],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Letters of Affiliation (KUHS)
        </h1>

        {/* Divider */}
        <div className="w-24 h-1 bg-red-700 mx-auto mb-8 rounded"></div>

        {/* Description */}
        <div className="text-gray-700 leading-relaxed mb-8 text-justify">
          <p>
            The following table displays the Letters of Affiliation issued by 
            Kerala University of Health Sciences (KUHS) for various undergraduate 
            and postgraduate medical courses.
          </p>

          <p className="mt-2">
            These affiliation letters confirm that the institution meets the 
            academic and regulatory requirements prescribed by KUHS for 
            conducting medical education programs.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">

            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">Sl. No</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Letters of Affiliation (KUHS)</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-gray-800">
                    {item.course}
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.letters.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Note */}
        <div className="mt-8 bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <p className="text-gray-700 text-sm">
            Note: Affiliation letters are issued periodically by KUHS after 
            verifying infrastructure, faculty, and academic compliance.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LettersOfAffiliation;