import React, { useState, useEffect } from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import Navbar from "./shared/Navbar";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  // State to manage the current path
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Get the canisterId from the environment variable
  const canisterId = process.env.CANISTER_ID_NEXBIT_FRONTEND;

  // Function to handle navigation
  const navigate = (path, query = {}) => {
    const searchParams = new URLSearchParams(query);
    const fullPath = `${path}?${searchParams.toString()}`;
    window.history.pushState({}, "", fullPath);
    setCurrentPath(path); // Update the state
  };

  useEffect(() => {
    // Handle browser navigation (back/forward buttons)
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Function to render the appropriate component
  const renderPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentCanisterId = searchParams.get("canisterId") || canisterId;

    switch (currentPath) {
      case "/wallet":
        // Require login for the Wallet page
        if (!principal) {
          return <Login />;
        }
        return <Wallet canisterId={currentCanisterId} />;
      case "/":
        return (
          <Dashboard
            canisterId={currentCanisterId}
            isAuthenticated={!!principal}
          />
        );
      default:
        return (
          <Dashboard
            canisterId={currentCanisterId}
            isAuthenticated={!!principal}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* Navbar */}
      <Navbar
        navigate={navigate}
        canisterId={canisterId}
        isAuthenticated={!!principal}
      />

      {/* Main content area */}
      <main className="flex-grow p-6 md:p-12">{renderPage()}</main>

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
  );
};

export default App;
