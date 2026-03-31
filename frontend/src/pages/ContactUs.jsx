import React from "react";

const Contacts = () => {
  const contacts = [
    {
      title: "Medical College Reception",
      phone: "+91-469-2742800",
      extra: "Toll Free: 18004253010",
    },
    {
      title: "Principal",
      name: "Prof. Dr. Elizabeth Joseph",
      phone: "+91-469-2742801 / 2013",
      email: "principal@bcmch.org",
    },
    {
      title: "Medical Superintendent",
      name: "Dr. Joe Jacob K",
      phone: "+91-469-2703100",
      email: "ms@bcmch.org",
    },
    {
      title: "Vice Principal",
      name: "Dr. Elizabeth Joseph",
      phone: "+91-469-2742803 / 2012",
      email: "viceprincipal@bcmch.org",
    },
    {
      title: "Registrar",
      name: "Dr. Joji Joshua Philipose",
      phone: "+91-469-2742805",
      email: "registrar@bcmch.org",
    },
    {
      title: "Admin Manager",
      name: "Mr. Rajesh Chacko",
      phone: "+91-9495998437",
      email: "adminmanager@bcmch.edu.in",
    },
  ];

  const hostels = [
    {
      title: "Boy's Hostel",
      wardens: "Dr. Jacob Jesurun R S, Mr. Kurian K.K, Mr. Dileep D",
      phone: "+91-9495999257 / 9495253219",
      email: "bhwarden@bcmch.edu.in",
    },
    {
      title: "Girl's Hostel",
      wardens: "Dr. Lynn Elizabeth Thomas, Dr. Sumitha Arun, Ms. Jessy Samuel, Mrs. Saly Rajan",
      phone: "+91-9495999256",
      email: "ghwarden@bcmch.edu.in",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Contacts
        </h1>

        <div className="w-20 h-1 bg-red-700 mx-auto mb-10 rounded"></div>

        {/* Address */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10 border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Address
          </h2>
          <p className="text-gray-700">
            St. Thomas Nagar, PO Box-31, Kuttapuzha,  
            Thiruvalla, Kerala, India
          </p>
          <p className="text-gray-600 mt-2">
            Email: info@bcmch.org
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {contacts.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-red-700 font-semibold mb-2">
                {item.title}
              </h3>

              {item.name && (
                <p className="text-gray-800 text-sm">{item.name}</p>
              )}

              <p className="text-gray-700 mt-2">📞 {item.phone}</p>

              {item.extra && (
                <p className="text-gray-600 text-sm">{item.extra}</p>
              )}

              {item.email && (
                <p className="text-gray-600 text-sm mt-1">
                  ✉️ {item.email}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Hostel Section */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-red-800 mb-6">
            Hostel Contacts
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {hostels.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h3 className="text-red-700 font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {item.wardens}
                </p>
                <p className="text-gray-700 mt-2">📞 {item.phone}</p>
                <p className="text-gray-600 text-sm mt-1">
                  ✉️ {item.email}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-red-700 mb-4 text-center">
            Locate Us
          </h2>

          <iframe
            title="BCMCH Location"
            src="https://maps.google.com/maps?q=Believers%20Church%20Medical%20College%20Hospital&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-64 rounded-lg border"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contacts;