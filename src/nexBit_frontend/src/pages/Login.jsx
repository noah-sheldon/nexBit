import React, { useState } from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Spinner Icon

const Login = () => {
  const { login } = useInternetIdentity();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white px-4">
      {/* Adjust height dynamically: Navbar height is accounted for */}
      <Card className="w-full max-w-xl p-8 bg-gray-900 shadow-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold tracking-tight text-white">
            Welcome to nexBit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-center text-lg text-gray-300">
            Your gateway to secure Bitcoin transactions.
            <br />
            Log in with Internet Identity to explore your wallet and dashboard.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Logging In...
                </>
              ) : (
                <div className="flex items-center">
                  <img
                    src="/favicon.ico"
                    alt="Login Icon"
                    className="w-6 h-6 mr-2 align-middle"
                  />
                  Log In with Internet Identity
                </div>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500 mt-4">
          By logging in, you agree to our&nbsp;
          <a href="#" className="text-yellow-500 hover:underline">
            Terms of Service&nbsp;
          </a>
          and&nbsp;
          <a href="#" className="text-yellow-500 hover:underline">
            Privacy Policy
          </a>
          .
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
