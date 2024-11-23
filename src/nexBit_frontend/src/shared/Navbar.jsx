import React, { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardCopy } from "lucide-react";
import { FaBitcoin } from "react-icons/fa";
import useP2pkhAddress from "@/hooks/useP2pkhAddress";
import { useToast } from "@/hooks/use-toast";
import { useInternetIdentity } from "ic-use-internet-identity";

const Navbar = ({ navigate, canisterId }) => {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal(); // Determine if the user is logged in
  const isAuthenticated = !!principal;

  const { data: address, isLoading, error } = useP2pkhAddress();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      try {
        const input = document.createElement("input");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        input.value = address;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        toast({
          title: "Copied!",
          description: "BTC address copied to clipboard.",
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to copy BTC address.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 px-6 py-4 shadow-md text-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => navigate("/", { canisterId })}
          className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2"
        >
          <FaBitcoin className="text-yellow-500" />
          nexBit
        </button>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
          {/* Explorer Link - Always Visible */}
          <Button variant="link" asChild>
            <button
              onClick={() => navigate("/", { canisterId })}
              className="hover:text-black/80 transition text-white"
            >
              Explorer
            </button>
          </Button>

          {/* Wallet Link - Visible Only to Authenticated Users */}
          {isAuthenticated && (
            <Button variant="link" asChild>
              <button
                onClick={() => navigate("/wallet", { canisterId })}
                className="hover:text-black/80 transition text-white"
              >
                Wallet
              </button>
            </Button>
          )}

          {/* BTC Address Copy - Visible Only to Authenticated Users */}
          {isAuthenticated && address && !error && (
            <div className="flex items-center bg-white/10 text-white px-4 py-2 rounded-lg">
              <span
                className="truncate max-w-xs text-sm"
                title={address}
                style={{ maxWidth: "150px" }}
              >
                BTC: {address}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition focus:ring focus:ring-yellow-400"
                    aria-label="Copy BTC Address"
                  >
                    <ClipboardCopy className="w-5 h-5 text-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{copied ? "Copied!" : "Copy BTC Address"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Logout Button - Visible Only to Authenticated Users */}
          {isAuthenticated && (
            <Logout
              className="ml-4"
              navigate={navigate}
              canisterId={canisterId}
            />
          )}

          {/* Login Button - Visible Only to Unauthenticated Users */}
          {!isAuthenticated && <Login />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
