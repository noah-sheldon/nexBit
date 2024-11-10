// App.js
import React from 'react';
import Navbar from './shared/Navbar';
import BalanceComponent from './components/BalanceComponent';
import UtxoComponent from './components/UtxoComponent';
import FeePercentileComponent from './components/FeePercentileComponent';
import BlockHeaderComponent from './components/BlockHeaderComponent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      <main className="p-6 md:p-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BalanceComponent />
          <UtxoComponent />
          <FeePercentileComponent />
          <BlockHeaderComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
