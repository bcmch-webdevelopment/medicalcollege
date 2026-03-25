import React, { useState } from "react";

const Faculty = ({ faculty }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-[#b71a22] mb-8">Teaching Faculty</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {faculty.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition transform hover:-translate-y-2 hover:scale-105 flex flex-col"
          >
            <div className="w-full h-44 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {doc.image ? (
                <img src={doc.image} alt={doc.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800">{doc.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{doc.role}</p>

            <button
              onClick={() => setSelectedFaculty(doc)}
              className="mt-auto bg-[#b71a22] hover:bg-red-800 text-white py-2 px-4 rounded-lg transition"
            >
              View Profile →
            </button>
          </div>
        ))}
      </div>

      {/* -------- MODAL -------- */}
      {selectedFaculty && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedFaculty(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {selectedFaculty.image ? (
                <img
                  src={selectedFaculty.image}
                  alt={selectedFaculty.name}
                  className="h-full object-contain"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* Details */}
            <h2 className="text-2xl font-bold text-[#b71a22] mb-4">{selectedFaculty.name}</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Emp ID:</strong> {selectedFaculty.empId}</p>
              <p><strong>Post:</strong> {selectedFaculty.role}</p>
              <p><strong>NMC:</strong> {selectedFaculty.nmc}</p>
              <p><strong>Qualification:</strong> {selectedFaculty.qualification}</p>
              <p><strong>Phone:</strong> {selectedFaculty.phone}</p>
              <p><strong>Email:</strong> {selectedFaculty.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty;