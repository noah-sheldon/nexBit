import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SendTransaction = ({ onClose }) => {
  const [transaction, setTransaction] = useState({
    destination: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending transaction:", transaction);
    alert("Transaction sent!");
    onClose(); // Close the modal after submission
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Send Bitcoin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="destination">Recipient Address</Label>
          <Input
            id="destination"
            type="text"
            placeholder="Enter Bitcoin address"
            value={transaction.destination}
            onChange={(e) =>
              setTransaction({ ...transaction, destination: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount in BTC"
            value={transaction.amount}
            onChange={(e) =>
              setTransaction({ ...transaction, amount: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default SendTransaction;
