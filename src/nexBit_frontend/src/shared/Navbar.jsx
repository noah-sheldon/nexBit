import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { ClipboardCopy } from "lucide-react";
import useP2pkhAddress from "../components/hooks/useP2pkhAddress";
import { useToast } from "../hooks/use-toast";
import { FaBitcoin } from "react-icons/fa";

function Navbar() {
  const { data: address, isLoading, error, refetch } = useP2pkhAddress();
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

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
        console.error("Failed to copy BTC address:", error);
        toast({
          title: "Error",
          description: "Unable to copy BTC address.",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 px-6 py-4 shadow-md text-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2"
        >
          <FaBitcoin className="text-yellow-500" />
          nexBit
        </Link>
        <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
          <Button variant="link" asChild>
            <Link to="/" className="hover:text-white/80 transition">
              Explorer
            </Link>
          </Button>
          {address && !error && (
            <Button variant="link" asChild>
              <Link to="/wallet" className="hover:text-white/80 transition">
                Wallet
              </Link>
            </Button>
          )}
          {address && !error ? (
            <>
              {isLoading ? (
                <span className="text-sm text-gray-300">
                  Fetching BTC Address...
                </span>
              ) : (
                <div className="flex items-center bg-white/10 text-white px-4 py-2 rounded-lg">
                  <span className="truncate max-w-xs text-sm" title={address}>
                    BTC: {address}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopy}
                        className="ml-2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
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
              <Logout className="ml-4" />
            </>
          ) : (
            <Login onLoginSuccess={() => refetch()} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
