import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Logout from "../components/dashboard/Logout";
import { useInternetIdentity } from "ic-use-internet-identity";
import { fetchP2pkhAddress } from "../services/bitcoinActor";

function Navbar() {
  const { isAuthenticated } = useInternetIdentity();
  const [address, setAddress] = useState(null);

  const handleLoginSuccess = async () => {
    try {
      const userAddress = await fetchP2pkhAddress();
      setAddress(userAddress);
    } catch (error) {
      console.error("Failed to fetch BTC address:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          nexBit
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-white/80 px-3 py-2 rounded-lg transition">
            Explorer
          </Link>
          {isAuthenticated ? (
            <>
              {address && (
                <span className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  BTC Address: {address}
                </span>
              )}
              <Logout className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-white/90 transition" />
            </>
          ) : (
            <Login
              onLoginSuccess={handleLoginSuccess}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-white/90 transition"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
