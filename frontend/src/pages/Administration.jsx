import React from "react";

const Administrative = () => {
  const leadership = [
    { name: "Prof. Dr. George Chandy Matteethra", role: "Director" },
    { name: "Prof. Dr. Elizabeth Joseph", role: "Principal" },
    { name: "Dr. Joe Jacob K", role: "Medical Superintendent" },
  ];

  const vicePrincipals = [
    { name: "Dr. Vijayamma K N" },
    { name: "Dr. Abel K Samuel Johnson" },
  ];

  const admin = [
    { name: "Prof. Dr. Joji Joshua Philipose", role: "Registrar" },
    { name: "Dr. Abel Jaison", role: "Deputy Registrar" },
  ];

  const deans = [
    { name: "Prof. Dr. Jacob Jesurun R. S.", role: "Student Affairs Dean" },
    { name: "Prof. Dr. Renu Mathew", role: "PG Studies Dean" },
    { name: "Dr. Reena Anie Jose", role: "PG Vice Dean" },
    { name: "Prof. Dr. Jacob Koshy", role: "UG Studies Dean" },
    { name: "Dr. Abel K Samuel Johnson", role: "UG Vice Dean" },
    { name: "Prof. Dr. Thomas Chacko", role: "Medical Education Unit Dean" },
    { name: "Prof. Dr. Jijo Joseph John", role: "Research Dean" },
    { name: "Dr. Cleetus C C", role: "Research Vice Dean" },
    { name: "Dr. Chary T Mathew", role: "Ethics Chairperson" },
  ];

  const Card = ({ name, role }) => (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
      <div className="h-16 w-16 bg-red-100 text-red-700 flex items-center justify-center rounded-full mx-auto mb-3 font-bold text-lg">
        {name.charAt(0)}
      </div>
      <h3 className="text-center font-semibold text-gray-800">{name}</h3>
      {role && (
        <p className="text-center text-red-600 text-sm mt-1">{role}</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Administrative Team
        </h1>
        <div className="w-20 h-1 bg-red-700 mx-auto mb-10 rounded"></div>

        {/* Leadership */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-6">
            Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((item, i) => (
              <Card key={i} {...item} />
            ))}
          </div>
        </section>

        {/* Vice Principals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-6">
            Vice Principals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {vicePrincipals.map((item, i) => (
              <Card key={i} {...item} />
            ))}
          </div>
        </section>

        {/* Administration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-6">
            Administration
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {admin.map((item, i) => (
              <Card key={i} {...item} />
            ))}
          </div>
        </section>

        {/* Deans */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-6">
            Deans & Academic Heads
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {deans.map((item, i) => (
              <Card key={i} {...item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Administrative;