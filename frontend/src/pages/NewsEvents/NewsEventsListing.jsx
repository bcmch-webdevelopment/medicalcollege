import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsEventsListing = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/news-events?status=published`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (err) {
        console.error('Failed to fetch news and events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = activeFilter === 'All' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <main className="flex-grow bg-[#f8f9fa] font-sans text-gray-800">
      {/* Header Banner */}
      <section className="bg-red-50 py-16 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#b71a22] tracking-wide mb-4 uppercase">
            News & Events
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay updated with the latest happenings, academic announcements, and upcoming events at Believers Church Medical College.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="flex justify-center gap-4 mb-12 border-b border-gray-200 pb-6">
            {['All', 'News', 'Event'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`py-2 px-6 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-sm ${
                  activeFilter === filter 
                    ? 'bg-[#b71a22] text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-[#b71a22] border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b71a22]"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 italic">
               No updates available at this moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <div key={item._id} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(183,26,34,0.15)] transition duration-500 overflow-hidden flex flex-col group">
                  <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                    {item.featuredImage ? (
                      <img 
                        src={`http://localhost:5000${item.featuredImage}`} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-300">
                        {/* Placeholder */}
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#b71a22] text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded shadow-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col border-t-4 border-transparent group-hover:border-[#b71a22] transition-colors">
                    <div className="text-sm text-gray-500 font-semibold mb-3 flex items-center">
                       <svg className="w-4 h-4 mr-2 text-[#b71a22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                       {new Date(item.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#b71a22] transition-colors leading-snug line-clamp-2">
                       {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow line-clamp-3">
                       {item.shortDescription}
                    </p>
                    <Link to={`/news-and-events/${item.slug}`} className="text-[#b71a22] font-bold hover:underline inline-block mt-auto w-max">
                       Read Full Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default NewsEventsListing;
