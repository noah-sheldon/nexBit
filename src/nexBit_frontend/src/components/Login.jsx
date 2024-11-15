import React, { useState } from "react";
import { useInternetIdentity } from "ic-use-internet-identity";

function Login({ onLoginSuccess, className }) {
  const { login } = useInternetIdentity();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLogin} className={className} disabled={isLoading}>
      {isLoading ? "Logging in..." : "Login"}
    </button>
  );
}

export default Login;
