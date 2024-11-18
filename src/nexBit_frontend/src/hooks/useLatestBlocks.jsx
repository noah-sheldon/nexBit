import { useActor } from "../Actor";
import { useQuery } from "@tanstack/react-query";

export default function useLatestBlocks() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["latestBlocks"], // Query key
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Actor initialized, calling get_latest_blocks...");
      const result = await actor.get_latest_blocks();

      if ("Ok" in result) {
        console.log("Fetched latest blocks:", result.Ok);
        return result.Ok; // Return the successful result
      } else {
        throw new Error(result.Err || "Failed to fetch latest blocks.");
      }
    },
    enabled: !!actor, // Only fetch if the actor is initialized
    staleTime: 600000, // Cache the result for 10 minutes
    onError: (error) => {
      console.error("Error fetching latest blocks:", error);
    },
  });
}
