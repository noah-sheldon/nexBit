import { useQuery } from "@tanstack/react-query";
import { useActor } from "../Actor"; // Import the actor context for backend calls

export default function useLatestTransactions() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["latestTransactions"], // Unique key for caching
    queryFn: async () => {
      if (!actor) {
        console.error("Actor is not initialized.");
        throw new Error("Actor is not initialized.");
      }

      console.log("Fetching latest transactions...");

      const result = await actor.get_latest_transactions(); // Backend call

      if ("Ok" in result) {
        console.log("Fetched latest transactions:", result.Ok);
        return result.Ok; // Return the successful result
      } else {
        throw new Error(result.Err || "Failed to fetch latest transactions.");
      }
    },
    enabled: !!actor, // Only fetch if the actor is initialized
    staleTime: 600000, // Cache the data for 10 minutes
    onError: (error) => {
      console.error("Error fetching latest transactions:", error);
    },
  });
}