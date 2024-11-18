import React, { useState } from "react";
import useBalance from "@/hooks/useBalance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import SendTransaction from "../components/wallet/SendTransaction";
import Receive from "../components/wallet/Receive";

const Wallet = () => {
  const { data: balance, isLoading: loadingBalance } = useBalance(); // Hook for fetching balance
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              nexBit Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {/* Display BTC Balance */}
            <h2 className="text-4xl font-bold mb-4">
              {loadingBalance ? "Loading..." : `$${balance?.usd || "0.00"}`}
            </h2>
            <p className="text-lg text-gray-400">
              {balance?.btc || "0.00 BTC"}
            </p>

            {/* Buttons for Send and Receive */}
            <div className="flex justify-center gap-4 mt-6">
              {/* Receive Dialog */}
              <Dialog open={isReceiveOpen} onOpenChange={setIsReceiveOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Receive</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Receive Bitcoin</DialogTitle>
                    <DialogDescription>
                      Share your Bitcoin address to receive payments.
                    </DialogDescription>
                  </DialogHeader>
                  <Receive onClose={() => setIsReceiveOpen(false)} />
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      className="mt-4 w-full"
                      onClick={() => setIsReceiveOpen(false)}
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>

              {/* Send Dialog */}
              <Dialog open={isSendOpen} onOpenChange={setIsSendOpen}>
                <DialogTrigger asChild>
                  <Button>Send</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Bitcoin</DialogTitle>
                    <DialogDescription>
                      Enter the recipient's Bitcoin address and amount to send.
                    </DialogDescription>
                  </DialogHeader>
                  <SendTransaction onClose={() => setIsSendOpen(false)} />
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      className="mt-4 w-full"
                      onClick={() => setIsSendOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
