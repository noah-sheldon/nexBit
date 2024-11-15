// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useInternetIdentity } from 'ic-use-internet-identity';
import Navbar from './shared/Navbar';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';

function App() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
        <Navbar />
        <main className="p-6 md:p-12">
          <Routes>
            {/* Dashboard accessible without identity */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Wallet requires identity */}
            {principal ? (
              <Route path="/wallet" element={<Wallet />} />
            ) : (
              <Route path="/wallet" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
