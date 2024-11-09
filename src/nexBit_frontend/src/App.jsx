import React from 'react';
import Navbar from './shared/Navbar';
import BalanceComponent from './components/BalanceComponent';
import FeePercentileComponent from './components/FeePercentileComponent';
import UtxoComponent from './components/UtxoComponent';
// import TransactionComponent from './components/TransactionComponent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      <main className="p-6 md:p-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <BalanceComponent />
          <FeePercentileComponent />
          <UtxoComponent />
          {/* Uncomment the following line to include the TransactionComponent */}
          {/* <TransactionComponent /> */}
        </div>
      </main>
    </div>
  );
}

export default App;
