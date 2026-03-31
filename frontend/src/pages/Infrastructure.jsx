import React, { useState, useEffect } from "react";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/facilities');
        if (!res.ok) throw new Error('Failed to fetch facilities');
        const data = await res.json();
        setFacilities(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Facilities
        </h1>

        <div className="w-20 h-1 bg-red-700 mx-auto mb-10 rounded"></div>

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10 text-gray-700">
          <p>
            Believers Church Medical College & Hospital provides world-class 
            infrastructure and learning resources designed to create an 
            advanced and comfortable academic environment for students.
          </p>
        </div>

        {loading && <p className="text-center">Loading facilities...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading && !error && facilities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
            >
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-md mb-4" />}
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description || item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Additional Features
          </h2>

          <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
            {[
              "Eco-friendly, vehicle-free and plastic-free campus",
              "Well-connected campus network",
              "Computerized Hospital Information System (HIS)",
              "Bedside teaching with real patient interaction",
              "Medical Education Unit for faculty development",
              "Remote Digital Evaluation Centre (KUHS)",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Facilities;