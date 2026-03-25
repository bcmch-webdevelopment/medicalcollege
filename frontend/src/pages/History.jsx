import React from "react";
import { Route, Routes } from "react-router-dom";
import principalImg from "../img/principal.jpg"; // update with your actual file path
import thirumeniImg from "../img/thirumeni.jpg"; // update with your actual file path

const History = () => {
  return (
    <div className="flex-grow bg-[#f8f9fa] py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white p-12 rounded-xl shadow-sm border-t-4 border-red-700">
        <h1 className="text-4xl font-bold text-red-900 mb-12 uppercase tracking-wide border-b border-gray-100 pb-4">
          History & Values
        </h1>

        {/* Section 1 - Thirumeni */}
        <div className="flex flex-col md:flex-row mb-8 items-start gap-6">
          <img src={thirumeniImg} alt="Thirumeni" className="w-48 rounded-lg shadow-md flex-shrink-0" />
          <p className="text-gray-700 text-lg leading-relaxed">
            Believers Church Medical College and Hospital is the healthcare arm of Believers Church. 
            The Church is dynamically involved in nation-building social and educational projects, healthcare initiatives, charitable activities, community development programs, rehabilitation projects, and relief works. 
            Moran Mor Samuel Theophilus Metropolitan of Believers Church is the patron of the hospital.
          </p>
        </div>

        {/* Section 2 - Principal */}
        <div className="flex flex-col md:flex-row mb-8 items-start gap-6">
          <img src={principalImg} alt="Principal" className="w-48 rounded-lg shadow-md flex-shrink-0" />
          <p className="text-gray-700 text-lg leading-relaxed">
            Dr. George Chandy is the Director, and Prof. Dr. Elizabeth Joseph serves as the Principal. 
            Believers Hospital, one of the best multispeciality hospitals in Kerala, provides specialized services in several departments including Internal Medicine, Surgery, Obstetrics/Gynaecology, Paediatrics, Otolaryngology, Ophthalmology, Psychiatry, Anaesthesiology, Pulmonology, Orthopaedics, Dentistry, and Dermatology. 
            We also provide the best Pediatric Neurologists in Kerala.
          </p>
        </div>

        {/* Section 3 - Content without image */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            We offer a wide range of super speciality services, including Cardiology, Neurology, Fetal Medicine, Nephrology, Gastroenterology, Clinical Hematology, Interventional Radiology, Endocrinology, Neonatology, Neurosurgery, Adult and Paediatric Cardiology, Medical Oncology, Surgical Oncology, Paediatric Surgery, Reproductive Medicine, Urology, and Gastrointestinal and Hepatobiliary Surgery. 
            We have successfully replaced Hip and knee of many patients who suffered due to serious conditions, making BCMCH one of the best Hip and Knee Replacement hospitals in Kerala.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            The hospital's laboratory, the first and only one accredited by NABL in a medical college hospital nationwide, and its radiology department enable rapid, accurate diagnoses to support other clinical departments. 
            Intensive care teams with specialized training care for patients with complex disorders in the ICU, CCU, NICU, and PICU. 
            State-of-the-art technology and a dedicated surgical team enable the operating theatres to accommodate all surgical needs.
          </p>
        </div>

        <div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Believers Church Medical College Hospital, one of the best hospitals in Kerala, is devoted to excellence in teaching, learning, and healing. 
            The college enrols 100 students annually into its MBBS program. 
            The curriculum centres on a holistic student learning program. 
            Postgraduate courses offered include MD General Medicine, MD Pathology, and MD Anaesthesiology; MS Obstetrics & Gynaecology, MS Ophthalmology, and MS Orthopaedics; and DNB in Gastroenterology. 
            Students reside on campus and can access an extensive library. Recreational facilities, including a gym, indoor games, basketball, badminton, and volleyball courts, are available to students.
          </p>
        </div>
      </div>
    </div>
  );
};

// Example usage with React Router
const App = () => {
  return (
    <Routes>
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default History;