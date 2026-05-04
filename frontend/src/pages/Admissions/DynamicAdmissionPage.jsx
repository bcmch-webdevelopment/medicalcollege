import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdmissionDetails from '../../components/Admissions/AdmissionDetails';

const DynamicAdmissionPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [studentLists, setStudentLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch specific admission program data
        const res = await fetch(`http://localhost:5000/api/admissions/${slug}`);
        if (!res.ok) throw new Error('Admission program not found');
        const json = await res.json();
        setData(json);

        // Fetch dynamic student list uploads
        const uploadsRes = await fetch(`http://localhost:5000/api/student-list-uploads?limit=100`);
        if (uploadsRes.ok) {
          const uploadsJson = await uploadsRes.json();
          setStudentLists(uploadsJson.studentLists || []);
        }
      } catch (err) {
        console.error(err);
        if (!data) setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b71a22]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-32 text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Program Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">We couldn't track down the admission program you are looking for.</p>
        <Link to="/admissions" className="inline-block bg-[#b71a22] hover:bg-red-800 text-white font-bold py-3 px-8 rounded shadow-md transition transform hover:-translate-y-1">
           &larr; Back to Admissions
        </Link>
      </div>
    );
  }

  return (
    <AdmissionDetails 
      title={data.title}
      overview={data.overview ? <div dangerouslySetInnerHTML={{ __html: data.overview }} /> : null}
      eligibility={data.eligibility ? <div dangerouslySetInnerHTML={{ __html: data.eligibility }} /> : null}
      process={data.process ? <div dangerouslySetInnerHTML={{ __html: data.process }} /> : null}
      studentLists={studentLists}
    />
  );
};

export default DynamicAdmissionPage;
