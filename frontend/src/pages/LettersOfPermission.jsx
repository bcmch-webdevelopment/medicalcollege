import React from "react";

const LettersOfPermission = () => {
  const data = [
    {
      course: "MBBS",
      approvals: [
        "UPR2023",
        "UPR2021",
        "UPR2020",
        "UPR2019",
        "UPR2018",
        "UPR2017",
        "UPR2016",
      ],
    },
    {
      course: "MD Pathology",
      approvals: ["UPR 2020", "UPR 2025"],
    },
    {
      course: "MD Anaesthesiology",
      approvals: ["UPR 2021", "UPR 2025"],
    },
    {
      course: "MD General Medicine",
      approvals: ["UPR 2021", "UPR 2025"],
    },
    {
      course: "MS Ophthalmology",
      approvals: ["UPR 2021", "UPR 2025"],
    },
    {
      course: "MS Obstetrics & Gynaecology",
      approvals: ["UPR 2021", "UPR 2025"],
    },
    {
      course: "MS Orthopaedics",
      approvals: ["UPR 2022", "UPR 2025"],
    },
    {
      course: "MS General Surgery",
      approvals: ["UPR 2024", "UPR 2025"],
    },
    {
      course: "MD Microbiology",
      approvals: ["UPR 2024", "UPR 2025"],
    },
    {
      course: "MD Radio-Diagnosis",
      approvals: ["UPR 2024", "UPR 2025"],
    },
    {
      course: "MD Emergency Medicine",
      approvals: ["UPR 2024", "UPR 2025"],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Letters of Permission / Renewal / Recognition (NMC)
        </h1>

        {/* Divider */}
        <div className="w-24 h-1 bg-red-700 mx-auto mb-8 rounded"></div>

        {/* Description */}
        <div className="text-gray-700 leading-relaxed mb-8 text-justify">
          <p>
            The following table displays the Letters of Permission, Renewal, and 
            Recognition issued by the National Medical Commission (NMC) for 
            various undergraduate and postgraduate medical courses.
          </p>

          <p className="mt-2">
            These approvals confirm that the institution meets the required 
            standards for medical education, infrastructure, and faculty as 
            mandated by regulatory authorities.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">

            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">Sl. No</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">
                  Letters of Permission / Renewal / Recognition
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-gray-800">
                    {item.course}
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.approvals.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Note */}
        <div className="mt-8 bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <p className="text-gray-700 text-sm">
            Note: These permissions are issued periodically by the National 
            Medical Commission (NMC) after evaluating infrastructure, faculty, 
            and academic compliance.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LettersOfPermission;