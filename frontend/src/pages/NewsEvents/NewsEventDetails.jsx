import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Just for standard styles if they leak into pure HTML viewing

const NewsEventDetails = () => {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    const fetchItemAndRelated = async () => {
      try {
        setLoading(true);
        // Fetch specifics
        const res = await fetch(`http://localhost:5000/api/news-events/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setItem(data);

        // Fetch related (same category, max 3)
        const relatedRes = await fetch(`http://localhost:5000/api/news-events?category=${data.category}&limit=3`);
        if (relatedRes.ok) {
           const relatedData = await relatedRes.json();
           setRelatedItems(relatedData.filter(i => i._id !== data._id).slice(0, 3));
        }

      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItemAndRelated();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b71a22]"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center py-40 bg-[#f8f9fa] flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <Link to="/news-and-events" className="text-[#b71a22] font-semibold hover:underline">
          &larr; Return to News & Events
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-grow bg-[#f8f9fa] font-sans text-gray-800">
      
      {/* Dynamic Banner */}
      <section className="relative w-full h-[40vh] md:h-[50vh] bg-gray-900 flex items-end">
        {item.featuredImage && (
           <img 
             src={`http://localhost:5000${item.featuredImage}`} 
             alt={item.title} 
             className="absolute inset-0 w-full h-full object-cover opacity-60"
           />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-12">
           <div className="flex items-center space-x-3 mb-4">
             <span className="px-3 py-1 bg-[#b71a22] text-white text-xs font-bold uppercase tracking-widest rounded shadow-md">
               {item.category}
             </span>
             <span className="text-gray-200 text-sm font-semibold flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {new Date(item.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
           </div>
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
             {item.title}
           </h1>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Article Body */}
          <div className="w-full lg:w-8/12">
             <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                <div 
                   className="prose prose-lg max-w-none text-gray-700 ql-editor px-0"
                   dangerouslySetInnerHTML={{ __html: item.content }}
                />
             </div>

             {/* Gallery Section */}
             {item.galleryImages && item.galleryImages.length > 0 && (
               <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                 <h3 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-[#b71a22] pl-4 uppercase tracking-wider">
                   Image Gallery
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {item.galleryImages.map((img, idx) => (
                     <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                       <img 
                         src={`http://localhost:5000${img}`} 
                         alt={`Gallery ${idx + 1}`} 
                         className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                       />
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12">
             <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#b71a22] pl-3 uppercase tracking-wider">
                  Related {item.category}s
                </h3>
                
                {relatedItems.length > 0 ? (
                  <div className="space-y-6">
                    {relatedItems.map(related => (
                       <div key={related._id} className="group cursor-pointer border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                         <div className="flex gap-4">
                           <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                             {related.featuredImage ? (
                               <img src={`http://localhost:5000${related.featuredImage}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt=""/>
                             ) : (
                               <div className="w-full h-full bg-gray-100"></div>
                             )}
                           </div>
                           <div>
                             <div className="text-xs text-gray-500 font-semibold mb-1">
                               {new Date(related.publishDate).toLocaleDateString()}
                             </div>
                             <Link to={`/news-and-events/${related.slug}`} className="text-sm font-bold text-gray-800 group-hover:text-[#b71a22] leading-snug line-clamp-2 transition-colors">
                               {related.title}
                             </Link>
                           </div>
                         </div>
                       </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No related content found.</p>
                )}
             </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default NewsEventDetails;
