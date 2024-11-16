import { useMutation } from "@tanstack/react-query";
import { getActor } from "../../Actor";

export default function useSendTransaction() {
  const actor = getActor();

  return useMutation(async ({ endpoint, destination, amount }) => {
    if (!actor) throw new Error("Actor is not initialized.");

    console.log(`Sending transaction via ${endpoint}...`);
    try {
      const txId = await actor[endpoint]({
        destination_address: destination,
        amount_in_satoshi: BigInt(amount), // Ensure amount is a BigInt
      });
      console.log("Transaction ID:", txId);
      return txId;
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw new Error("Failed to send transaction.");
    }
  });
}
