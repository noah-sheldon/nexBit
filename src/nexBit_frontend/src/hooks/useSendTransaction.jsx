import { useActor } from "../Actor";
import { useMutation } from "@tanstack/react-query";

export default function useSendTransaction() {
  const { actor } = useActor();

  return useMutation({
    // Define the mutation function
    mutationFn: async ({ destination_address, amount_in_satoshi }) => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Sending transaction...");
      try {
        // Call the backend function
        const txId = await actor.send_from_p2pkh({
          destination_address,
          amount_in_satoshi: BigInt(amount_in_satoshi), // Convert to BigInt as required by backend
        });
        console.log("Transaction ID:", txId);
        return txId;
      } catch (error) {
        console.error("Error sending transaction:", error);
        throw new Error("Failed to send transaction.");
      }
    },
    // Handle mutation errors
    onError: (error) => {
      console.error("Error in useSendTransaction:", error);
    },
  });
}
