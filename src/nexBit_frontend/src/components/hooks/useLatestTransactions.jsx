import { useQuery } from "@tanstack/react-query";
import { useActor } from "../Actor"; // Import the actor context for backend calls

export default function useLatestTransactions() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["latestTransactions"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Fetching latest transactions...");
      const result = await actor.get_latest_transactions();

      if ("Ok" in result) {
        console.log("Fetched latest transactions:", result.Ok);
        return result.Ok;
      } else {
        throw new Error(result.Err || "Failed to fetch latest transactions.");
      }
    },
    enabled: !!actor, // Only fetch if the actor is initialized
    onError: (error) => {
      console.error("Error fetching latest transactions:", error);
    },
  });
}
