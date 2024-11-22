import { useQuery } from "@tanstack/react-query";
import { useActor } from "../Actor";

export default function useFeePercentiles() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["feePercentiles"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Fetching fee percentiles...");
      const feeResponse = await actor.get_current_fee_percentiles();
      console.log("Fetched fee percentiles:", feeResponse);

      if (feeResponse && feeResponse instanceof BigUint64Array) {
        // Convert BigUint64Array to an array of strings
        return Array.from(feeResponse).map((bigInt) => bigInt.toString());
      }
      throw new Error("Failed to fetch fee percentiles.");
    },
    enabled: !!actor, // Fetch only when actor is available
    onError: (error) => {
      console.error("Error fetching fee percentiles:", error);
    },
  });
}
