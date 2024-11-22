import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useInternetIdentity } from "ic-use-internet-identity";
import Navbar from "@/shared/Navbar";
import Dashboard from "@/pages/Dashboard";
import Wallet from "@/pages/Wallet";
import Login from "@/pages/Login";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();
  const canisterId = process.env.CANISTER_ID_NEXBIT_FRONTEND;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
        {/* Navbar */}
        <Navbar canisterId={canisterId} isAuthenticated={!!principal} />

        {/* Main content area */}
        <main className="flex-grow p-6 md:p-12">
          <Routes>
            {/* Public route for Dashboard */}
            <Route path="/" element={<Dashboard canisterId={canisterId} />} />

            {/* Protected route for Wallet */}
            <Route
              path="/wallet"
              element={
                principal ? (
                  <Wallet canisterId={canisterId} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Login route */}
            <Route path="/login" element={<Login />} />

            {/* Fallback to Dashboard for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "bg-gray-900 text-yellow-400 border border-yellow-500 shadow-md p-4 rounded-lg",
            duration: 5000,
          }}
        />
      </div>
    </Router>
  );
};

export default App;
