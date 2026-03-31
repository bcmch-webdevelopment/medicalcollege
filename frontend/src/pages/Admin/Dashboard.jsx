import React, { useEffect, useState } from 'react';
import { Building, Image, Users } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ facilities: 0, banners: 0 });
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    // Fetch stats here
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/facilities');
        const data = await res.json();
        setStats({ facilities: data.length || 0, banners: 0 });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Overview Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Building className="h-8 w-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Facilities</p>
            <p className="text-2xl font-bold">{stats.facilities}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="p-4 bg-purple-100 rounded-full text-purple-600">
            <Image className="h-8 w-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Banners</p>
            <p className="text-2xl font-bold">{stats.banners}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Users</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
