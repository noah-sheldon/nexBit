import React from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function Logout({ className }) {
  const { clear } = useInternetIdentity();
  const { toast } = useToast();

  const handleLogout = () => {
    clear();
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
      variant: "success",
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={`flex items-center space-x-2 ${className}`}
      aria-label="Logout"
    >
      <img src="/favicon.ico" alt="Logout Icon" className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
}

export default Logout;
