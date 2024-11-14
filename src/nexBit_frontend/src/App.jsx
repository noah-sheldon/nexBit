// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Dashboard from './pages/Dashboard';
import AddressExplorer from './pages/AddressExplorer';
import BlockExplorer from './pages/BlockExplorer';
import TransactionExplorer from './pages/TransactionExplorer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
        <Navbar />
        <main className="p-6 md:p-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/address" element={<AddressExplorer />} />
            <Route path="/block" element={<BlockExplorer />} />
            <Route path="/transaction" element={<TransactionExplorer />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
