import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import useP2pkhAddress from "@/hooks/useP2pkhAddress";
import useBalance from "@/hooks/useBalance";
import useSendTransaction from "@/hooks/useSendTransaction";

export default function Wallet() {
  const [view, setView] = useState("main");
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [transactionResult, setTransactionResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const { data: p2pkhAddress, isLoading: isLoadingAddress } = useP2pkhAddress();
  const { data: balance, isLoading: isLoadingBalance } =
    useBalance(p2pkhAddress);
  const { toast } = useToast();

  const sendTransaction = useSendTransaction();

  const handleCopy = () => {
    if (p2pkhAddress) {
      try {
        const input = document.createElement("input");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        input.value = p2pkhAddress;
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

  const handleSend = async (e) => {
    e.preventDefault();

    const amountInSatoshi = parseInt(amount, 10); // Directly treat the amount as satoshis

    if (amountInSatoshi > balance) {
      toast({
        title: "Insufficient Balance",
        description: "The amount exceeds your available balance.",
        variant: "destructive",
      });
      return;
    }

    try {
      const txId = await sendTransaction.mutateAsync({
        destination_address: destination,
        amount_in_satoshi: amountInSatoshi, // Already in satoshis
      });

      setTransactionResult(txId);
      setAmount("");
      setDestination("");
    } catch (error) {
      console.error("Transaction failed:", error);
      setTransactionResult(null);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 text-gray-300">
      <CardHeader>
        <CardTitle className="text-yellow-500">nexBit Wallet</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your Bitcoin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-white">
            {isLoadingBalance ? (
              <span className="animate-pulse">Loading...</span>
            ) : balance !== undefined ? (
              `${(balance / 1e8).toFixed(8)} BTC`
            ) : (
              "0 BTC"
            )}
          </div>
          <div>
            <Button
              onClick={() => setView("send")}
              className="mr-2 bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Send
            </Button>
            <Button
              onClick={() => setView("receive")}
              variant="outline"
              className="text-yellow-500 border-yellow-500"
            >
              Receive
            </Button>
          </div>
        </div>

        {view === "send" && (
          <form onSubmit={handleSend} className="space-y-4">
            <Input
              type="text"
              placeholder="Destination Address"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="bg-gray-800 text-gray-300"
            />
            <Input
              type="number"
              placeholder="Amount to send (satoshis)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="1"
              min="0"
              required
              className="bg-gray-800 text-gray-300"
            />
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              disabled={sendTransaction.isLoading}
            >
              {sendTransaction.isLoading ? "Sending..." : "Send Bitcoin"}
            </Button>
          </form>
        )}

        {view === "receive" && (
          <div className="text-center">
            <p className="mb-2">Your Bitcoin Address:</p>
            <div className="flex items-center justify-center space-x-2">
              <code className="block px-4 py-2 bg-gray-800 rounded-lg text-yellow-400 truncate">
                {p2pkhAddress || "Loading..."}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopy}
                      className="ml-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-full"
                      aria-label="Copy BTC Address"
                    >
                      <Copy className="w-5 h-5 text-yellow-500" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{copied ? "Copied!" : "Copy BTC Address"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}

        {transactionResult && (
          <div className="mt-4 p-4 bg-green-800 text-green-300 rounded-md flex items-center">
            <CheckCircle2 className="mr-2" />
            <div>
              <p>Transaction Successful!</p>
              <p className="text-sm">Transaction ID: {transactionResult}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {view !== "main" && (
          <Button
            onClick={() => setView("main")}
            variant="ghost"
            className="w-full text-yellow-500"
          >
            Back
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
