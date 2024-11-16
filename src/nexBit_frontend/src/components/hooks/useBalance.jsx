import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../Actor";

export default function useBalance(address) {
  const { actor } = useActor();

  console.log("Actor in useBalance:", actor); // Debug log

  return useQuery({
    queryKey: ["balance", address], // Include address in the query key
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");
      if (!address) throw new Error("Address is required.");

      console.log("Fetching balance for address:", address);
      try {
        const result = await actor.get_balance(address);
        console.log("Raw balance result:", result);

        // If result is a BigInt, convert it to a string
        if (typeof result === "bigint") {
          return result.toString(); // Convert BigInt to string
        }

        // Handle unexpected structures gracefully
        throw new Error(
          `Unexpected result structure: ${JSON.stringify(result)}`
        );
      } catch (error) {
        console.error("Error in useBalance queryFn:", error);
        throw new Error(error.message || "Failed to fetch balance.");
      }
    },
    enabled: !!actor && !!address, // Ensure actor and address are available before fetching
    staleTime: 60000, // Cache result for 1 minute
    onError: (error) => {
      console.error("Error fetching balance:", error);
    },
  });
}
