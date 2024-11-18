import { useActor } from "../Actor";
import { useQuery } from "@tanstack/react-query";

export default function useBlockchainStats() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["blockchainStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Actor initialized, calling get_blockchain_stats...");

      const result = await actor.get_blockchain_stats();
      console.log("Blockchain stats result:", result);

      if ("Ok" in result) {
        console.log("Fetched stats:", result.Ok); // Log to verify structure
        return result.Ok;
      } else {
        throw new Error(result.Err || "Failed to fetch blockchain stats");
      }
    },
    enabled: !!actor,
    onError: (error) => {
      console.error("Error fetching blockchain stats:", error);
    },
  });
}
