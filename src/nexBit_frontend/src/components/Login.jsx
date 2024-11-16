import React from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "../components/ui/button";

function Login({ onLoginSuccess }) {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === "logging-in";

  const handleLogin = async () => {
    try {
      await login();
      onLoginSuccess?.();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoggingIn}
      variant="ghost"
      className="flex items-center space-x-2"
      aria-label="Login"
    >
      <img src="/favicon.ico" alt="Login Icon" className="w-4 h-4" />
      <span>{isLoggingIn ? "Logging in..." : "Login"}</span>
    </Button>
  );
}

export default Login;
