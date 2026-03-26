import React, { useState } from "react";

const Faculty = ({ faculty }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (doc) => {
    setSelectedFaculty(doc);
    // small delay to trigger animation
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFaculty(null), 300); // wait for animation
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-[#b71a22] mb-10 text-center">
        Teaching Faculty
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {faculty.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col cursor-pointer"
            onClick={() => openModal(doc)}
          >
            {/* Grid Image */}
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
              {doc.image ? (
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="text-gray-400 text-sm">No Image</div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col items-center text-center flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{doc.role}</p>
              <button
                className="mt-auto bg-[#b71a22] hover:bg-red-800 text-white py-2 px-5 rounded-lg transition"
              >
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -------- MODAL -------- */}
      {selectedFaculty && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white w-full max-w-lg rounded-2xl p-6 flex flex-col items-center transform transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

           {/* Modal Profile Image (Larger Oval with Shadow) */}
            <div className="flex justify-center mb-6">
              <div
                className="w-40 h-52 overflow-hidden bg-gray-100 shadow-xl border-4 border-gray-100 flex items-center justify-center"
                style={{ borderRadius: "50% / 60%" }}
              >
                {selectedFaculty.image ? (
                  <img
                    src={selectedFaculty.image}
                    alt={selectedFaculty.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 flex items-center justify-center h-full">
                    No Image
                  </div>
                )}
              </div>
            </div>
            {/* Details */}
            <h2 className="text-2xl font-bold text-[#b71a22] text-center mb-4">
              {selectedFaculty.name}
            </h2>

            <div className="space-y-2 text-gray-700 w-full">
              <p><strong>Emp ID:</strong> {selectedFaculty.empId}</p>
              <p><strong>Post:</strong> {selectedFaculty.role}</p>
              <p><strong>NMC:</strong> {selectedFaculty.nmc}</p>
              <p><strong>Qualification:</strong> {selectedFaculty.qualification}</p>
              <p><strong>Phone:</strong> {selectedFaculty.phone}</p>
              <p><strong>Email:</strong> {selectedFaculty.email}</p>
              <p><strong>Bio:</strong> {selectedFaculty.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty;