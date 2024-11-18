import { useQuery } from "@tanstack/react-query";
import { useActor } from "../Actor";

export default function useFeePercentiles() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["feePercentiles"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Fetching fee percentiles...");
      const fees = await actor.get_current_fee_percentiles();
      return fees;
    },
    enabled: !!actor, // Fetch only when the actor is initialized
    staleTime: 1000 * 60, // Cache for 1 minute
    onError: (error) => {
      console.error("Error fetching fee percentiles:", error);
    },
  });
}
