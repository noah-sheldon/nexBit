import { useQuery } from "@tanstack/react-query";
// Import the default actor from the generated declarations
import { createActor } from "../../../declarations/basic_bitcoin"; // Update path to match your project structure

export default function useBlockchainStats() {
  return useQuery({
    queryKey: ["blockchainStats"],
    queryFn: async () => {
      // Initialize the default actor
      const actor = createActor(process.env.CANISTER_ID_BACKEND, {
        agentOptions: {
          host: process.env.DFX_NETWORK || "http://localhost:8000",
        },
      });

      console.log("Default actor initialized, calling get_blockchain_stats...");

      const result = await actor.get_blockchain_stats();
      console.log("Blockchain stats result:", result);

      if ("Ok" in result) {
        console.log("Fetched stats:", result.Ok); // Log to verify structure
        return result.Ok;
      } else {
        throw new Error(result.Err || "Failed to fetch blockchain stats");
      }
    },
    staleTime: 600000, // Cache the result for 10 minutes
    onError: (error) => {
      console.error("Error fetching blockchain stats:", error);
    },
  });
}
