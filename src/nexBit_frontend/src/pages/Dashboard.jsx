// src/pages/Dashboard.jsx
import React from 'react';
import RecentBlocks from '../components/dashboard/RecentBlocks';
import NetworkStats from '../components/dashboard/NetworkStats';
import FeePercentiles from '../components/dashboard/FeePercentiles';
import RecentTransactions from '../components/dashboard/RecentTransactions';

function Dashboard() {
  console.log("Rendering Dashboard"); 
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <NetworkStats />
        </div>
        {/* <div>
          <FeePercentiles />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <RecentBlocks />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <RecentTransactions />
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
