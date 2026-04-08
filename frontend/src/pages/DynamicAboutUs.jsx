import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DynamicAboutUs = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/aboutus/slug/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The section you are looking for does not exist or has been removed.</p>
        <Link to="/" className="text-red-700 font-semibold hover:underline flex items-center justify-center gap-2">
           <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // Backwards compatibility for images
  const displayImage = data.image || (data.images && data.images.length > 0 ? data.images[0] : null);

  // Determine layout classes based on imagePosition
  const layoutClass = 
    data.imagePosition === 'left' ? "flex flex-col lg:flex-row gap-10 items-start" :
    data.imagePosition === 'right' ? "flex flex-col lg:flex-row-reverse gap-10 items-start" :
    "flex flex-col gap-10 items-center"; // top

  const imageContainerClass = 
    data.imagePosition === 'top' ? "w-full overflow-hidden" : "w-full lg:w-5/12 overflow-hidden";

  const contentContainerClass = 
    data.imagePosition === 'top' ? "w-full" : "w-full lg:w-7/12";

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Layout Container */}
        <div className="bg-white rounded-2xl shadow p-8 md:p-12 mb-8 border-t-[6px] border-red-700 hover:shadow-lg transition-shadow duration-300">
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-10 tracking-tight relative pb-4 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-red-600">
            {data.title}
          </h1>

          <div className={layoutClass}>
            
            {displayImage && (
               <div className={imageContainerClass}>
                 <img 
                   src={`http://localhost:5000${displayImage}`} 
                   alt={data.heading || data.title} 
                   className="w-full h-auto object-cover rounded-xl shadow-md border border-gray-100"
                 />
               </div>
            )}

            <div className={contentContainerClass}>
              {data.heading && (
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
                   {data.heading}
                 </h2>
              )}
              
              {data.content && (
                <div 
                  className="prose prose-lg prose-red max-w-none text-slate-600 text-left prose-table:table-auto prose-table:w-full prose-td:border prose-td:border-gray-300 prose-th:border prose-th:bg-red-50 prose-td:p-3 prose-th:p-3"
                  dangerouslySetInnerHTML={{ __html: data.content }} 
                />
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicAboutUs;
