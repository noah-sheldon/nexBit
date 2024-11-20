import { useQuery } from "@tanstack/react-query";

export default function useBlockchainStats() {
  return useQuery({
    queryKey: ["blockchainStats"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://www.fcn.social/api/proxy/bitcoin/stats"
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const json = await response.json();

        // Validate the structure and extract the required fields
        if (json && json.data) {
          const {
            blocks,
            transactions,
            difficulty,
            market_price_usd,
            market_cap_usd,
            average_transaction_fee_usd_24h,
            market_dominance_percentage,
            suggested_transaction_fee_per_byte_sat,
          } = json.data;

          // Return only the required fields
          return {
            blocks,
            transactions,
            difficulty,
            market_price_usd,
            market_cap_usd,
            average_transaction_fee_usd_24h,
            market_dominance_percentage,
            suggested_transaction_fee_per_byte_sat,
          };
        }

        throw new Error("Invalid response structure");
      } catch (error) {
        console.error("Error fetching blockchain stats:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error in useBlockchainStats:", error);
    },
  });
}
