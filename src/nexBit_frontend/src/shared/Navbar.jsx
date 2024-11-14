// src/components/shared/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import { fetchP2pkhAddress, login, initAuth } from '../services/bitcoinActor';

function Navbar() {
  const [address, setAddress] = useState(null);

  const handleLogin = async () => {
    await initAuth();
    await login();
    const userAddress = await fetchP2pkhAddress();
    setAddress(userAddress);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          nexBit
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-white/80 px-3 py-2 rounded-lg transition">
            Dashboard
          </Link>
          <Link to="/address" className="hover:text-white/80 px-3 py-2 rounded-lg transition">
            Address Explorer
          </Link>
          <Link to="/block" className="hover:text-white/80 px-3 py-2 rounded-lg transition">
            Block Explorer
          </Link>
          <Link to="/transaction" className="hover:text-white/80 px-3 py-2 rounded-lg transition">
            Transaction Explorer
          </Link>
          {address ? (
            <span className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
              BTC Address: {address}
            </span>
          ) : (
            <LoginButton onLogin={handleLogin} className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-white/90 transition" />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
