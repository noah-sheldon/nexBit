import React from 'react';

const Navbar = ({ isAuthenticated, onLogin, onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 flex items-center justify-between text-white shadow-lg">
      {/* App Logo / Name */}
      <h1 className="text-2xl font-bold tracking-wide">🚀 nexBit</h1>
      
      {/* Login/Logout Button */}
      <div>
        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
          >
            Login with Internet Identity
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
