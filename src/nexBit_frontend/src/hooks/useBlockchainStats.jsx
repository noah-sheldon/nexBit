import { useQuery } from "@tanstack/react-query";

export default function useBlockchainStats() {
  return useQuery({
    queryKey: ["blockchairStats"],
    queryFn: async () => {
      const url = "https://api.blockchair.com/bitcoin/stats";

      console.log("Fetching blockchain stats from Blockchair API...");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blockchain stats. HTTP Status: ${response.status}`
        );
      }

      const json = await response.json();

      // Extract the required fields from the response
      const strippedData = {
        blocks: json.data.blocks,
        transactions: json.data.transactions,
        market_price_usd: json.data.market_price_usd,
        market_cap_usd: json.data.market_cap_usd,
        difficulty: json.data.difficulty,
        average_transaction_fee_usd_24h:
          json.data.average_transaction_fee_usd_24h,
        market_dominance_percentage: json.data.market_dominance_percentage,
        suggested_transaction_fee_per_byte_sat:
          json.data.suggested_transaction_fee_per_byte_sat,
      };

      console.log("Stripped blockchain stats:", strippedData);

      return strippedData;
    },
    staleTime: 600000, // Cache the result for 10 minutes
    onError: (error) => {
      console.error("Error fetching blockchain stats:", error);
    },
  });
}
