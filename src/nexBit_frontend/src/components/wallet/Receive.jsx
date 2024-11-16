import React from "react";
import { Button } from "../ui/button";

const Receive = ({ onClose }) => {
  const address = "your-bitcoin-address"; // Replace with actual address from backend

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Receive Bitcoin</h2>
      <p className="text-sm text-gray-400 mb-2">Your Bitcoin Address</p>
      <p className="text-gray-300 mb-4">{address}</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => alert("QR Code clicked!")}>
          QR Code
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(address);
            alert("Address copied!");
          }}
        >
          Copy Address
        </Button>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Receive;
