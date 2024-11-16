// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useInternetIdentity } from "ic-use-internet-identity";
import Navbar from "./shared/Navbar";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import { Toaster } from "./components/ui/toaster"; // Toaster for notifications

function App() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
        {/* Navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-grow p-6 md:p-12">
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

        {/* Toast notifications */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
