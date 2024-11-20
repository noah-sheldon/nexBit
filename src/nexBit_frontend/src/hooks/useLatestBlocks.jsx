import { useQuery } from "@tanstack/react-query";

export default function useLatestBlocks() {
  return useQuery({
    queryKey: ["latestBlocks"], // Query key
    queryFn: async () => {
      const url = "https://www.fcn.social/api/proxy/bitcoin/blocks";

      console.log("Fetching latest blocks from:", url);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const json = await response.json();

        // Extract only the required fields
        if (json?.data && Array.isArray(json.data)) {
          return json.data.map((block) => ({
            block_height: block.id, // Assuming `id` is equivalent to `block_height`
            block_hash: block.hash,
            date: block.date,
            time: block.time,
            transaction_count: block.transaction_count,
            fee_total: block.fee_total,
            block_size: block.size,
            difficulty: block.difficulty,
          }));
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching latest blocks:", error);
        throw error;
      }
    },
    staleTime: 600000, // Cache the result for 10 minutes
    onError: (error) => {
      console.error("Error in useLatestBlocks:", error);
    },
  });
}
