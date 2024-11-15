import React from "react";
import { useInternetIdentity } from "ic-use-internet-identity";

function Logout({ className }) {
  const { logout } = useInternetIdentity();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
}

export default Logout;
