import React from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "@/components/ui/button";

function Logout() {
  const { clear } = useInternetIdentity();

  return (
    <Button
      variant="ghost"
      onClick={clear}
      className="flex items-center space-x-2"
    >
      <img src="/favicon.ico" alt="Logout Icon" className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
}

export default Logout;
