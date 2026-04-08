import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DynamicPage = () => {
  const { section, slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/pages/${section}/${slug}`);
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
  }, [section, slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-32 text-center flex flex-col items-center">
        <div className="text-9xl mb-4 opacity-5">📄</div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Page Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">We couldn't track down the content you are looking for. It might have been moved or removed.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow hover:shadow-lg">
           <ArrowLeft className="w-5 h-5" /> Back to Homepage
        </Link>
      </div>
    );
  }

  // Determine layout classes based on imagePosition
  const layoutClass = 
    data.imagePosition === 'left' ? "flex flex-col lg:flex-row gap-12 items-start" :
    data.imagePosition === 'right' ? "flex flex-col lg:flex-row-reverse gap-12 items-start" :
    "flex flex-col gap-10 items-center"; // top

  const imageContainerClass = 
    data.imagePosition === 'top' ? "w-full overflow-hidden" : "w-full lg:w-5/12 overflow-hidden sticky top-32";

  const contentContainerClass = 
    data.imagePosition === 'top' ? "w-full" : "w-full lg:w-7/12";

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 lg:py-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Layout Container */}
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-md p-8 md:p-14 mb-8 border border-slate-100 transition-shadow duration-300 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="mb-12">
            {/* Breadcrumb style parent indication could go here */}
            {data.parentId && data.parentId.title && (
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-100">
                {data.parentId.title}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {data.title}
            </h1>
          </div>

          <div className={layoutClass}>
            
            {data.image && (
               <div className={imageContainerClass}>
                 <img 
                   src={`http://localhost:5000/uploads/${data.image}`} 
                   alt={data.heading || data.title} 
                   className="w-full h-auto object-cover rounded-2xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 hover:scale-[1.02] transition-transform duration-500"
                 />
               </div>
            )}

            <div className={contentContainerClass}>
              {data.heading && (
                 <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-snug">
                   {data.heading}
                 </h2>
              )}
              
              {data.content && (
                <div 
                  className="prose prose-lg max-w-none text-slate-600 prose-headings:text-slate-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 text-left prose-table:table-auto prose-table:w-full prose-table:border-collapse prose-td:border prose-td:border-slate-200 prose-th:border prose-th:border-slate-200 prose-th:bg-slate-50 prose-td:p-4 prose-th:p-4 prose-img:rounded-xl prose-img:shadow-md"
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

export default DynamicPage;
