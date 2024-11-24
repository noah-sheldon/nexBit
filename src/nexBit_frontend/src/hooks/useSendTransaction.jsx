import { useActor } from "../Actor";
import { useMutation } from "@tanstack/react-query";

export default function useSendTransaction() {
  const { actor } = useActor();

  return useMutation({
    // Define the mutation function
    mutationFn: async ({ destination_address, amount_in_satoshi }) => {
      if (!actor) {
        console.error("Error: Actor is not initialized.");
        throw new Error("Actor is not initialized.");
      }

      console.log("Initiating transaction...");
      console.log("Destination Address:", destination_address);
      console.log(
        "Amount in Satoshis (before BigInt conversion):",
        amount_in_satoshi
      );

      try {
        // Convert the amount to BigInt as required by the backend
        const amountAsBigInt = BigInt(amount_in_satoshi);
        console.log("Amount in Satoshis (as BigInt):", amountAsBigInt);

        // Call the backend function
        const txId = await actor.send_from_p2pkh({
          destination_address,
          amount_in_satoshi: amountAsBigInt,
        });

        console.log("Transaction successfully sent.");
        console.log("Transaction ID:", txId);

        return txId;
      } catch (error) {
        console.error("Error sending transaction:", error);
        throw new Error("Failed to send transaction.");
      }
    },
    // Handle mutation errors
    onError: (error) => {
      console.error("Error in useSendTransaction mutation:", error);
    },
  });
}
