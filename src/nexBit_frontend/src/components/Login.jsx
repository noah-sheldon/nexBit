import React from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "@/components/ui/button";

function Login({ onLoginSuccess }) {
  const { login, loginStatus } = useInternetIdentity();

  // Determine button state
  const isLoggingIn = loginStatus === "logging-in";
  const isLoggedIn = loginStatus === "success";
  const disabled = isLoggingIn || isLoggedIn;

  const handleLogin = async () => {
    try {
      await login();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={disabled}
      variant="ghost"
      className="flex items-center space-x-2"
    >
      <img src="/favicon.ico" alt="Login Icon" className="w-4 h-4" />
      <span>{isLoggingIn ? "Logging in..." : "Login"}</span>
    </Button>
  );
}

export default Login;
