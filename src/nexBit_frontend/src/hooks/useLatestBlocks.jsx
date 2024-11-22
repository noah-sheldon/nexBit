import { useQuery } from "@tanstack/react-query";

export default function useLatestBlocks() {
  return useQuery({
    queryKey: ["latestBlocks"], // Query key
    queryFn: async () => {
      const response = await fetch("https://api.blockchair.com/bitcoin/blocks");
      if (!response.ok) {
        throw new Error("Failed to fetch recent blocks");
      }
      const data = await response.json();

      // Strip only the necessary fields
      return data.data.map((block) => ({
        block_height: block.id,
        transaction_count: block.transaction_count,
        block_size: block.size,
        date: block.time.split("T")[0], // Extract the date
        difficulty: block.difficulty,
      }));
    },
    staleTime: 600000, // Cache the result for 10 minutes
    onError: (error) => {
      console.error("Error fetching recent blocks:", error);
    },
  });
}
