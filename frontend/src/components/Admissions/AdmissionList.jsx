import React, { useState, useEffect } from 'react';
import AdmissionCard from './AdmissionCard';

const AdmissionList = () => {
  const [admissionCategories, setAdmissionCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admissions');
        const data = await res.json();
        setAdmissionCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch admissions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading admission programs...</div>;
  }

  if (admissionCategories.length === 0) {
    return <div className="text-center py-10 text-gray-500">No admission programs found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {admissionCategories.map(category => (
        <AdmissionCard 
          key={category._id}
          title={category.title}
          description={category.shortDescription}
          linkTo={`/admissions/${category.slug}`}
        />
      ))}
    </div>
  );
};

export default AdmissionList;
