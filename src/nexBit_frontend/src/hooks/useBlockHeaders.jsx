import { useQuery } from "@tanstack/react-query";
import { useActor } from "../Actor";

export default function useBlockHeaders(startHeight) {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["blockHeaders", startHeight],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");
      if (startHeight === undefined || startHeight === null) {
        throw new Error("Start height is required.");
      }

      console.log(`Fetching block headers from ${startHeight}`);

      const response = await actor.get_block_headers(startHeight);

      console.log("Fetched block headers:", response);

      if (response) {
        const tipHeight = response?.tip_height?.toString() || "N/A";
        const blockHeaders =
          response?.block_headers?.map((header) =>
            header.map((byte) => byte.toString(16).padStart(2, "0")).join("")
          ) || [];
        return { tipHeight, blockHeaders };
      }

      throw new Error("Failed to fetch block headers.");
    },
    enabled: !!actor && startHeight !== undefined, // Fetch only when actor and startHeight are available
    onError: (error) => {
      console.error("Error fetching block headers:", error.message);
    },
  });
}
