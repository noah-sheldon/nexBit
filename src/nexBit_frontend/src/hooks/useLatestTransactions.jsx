import { useQuery } from "@tanstack/react-query";

export default function useLatestTransactions() {
  return useQuery({
    queryKey: ["latestTransactions"], // Unique key for caching
    queryFn: async () => {
      console.log("Fetching latest transactions...");

      try {
        const response = await fetch(
          "https://api.blockchair.com/bitcoin/transactions"
        );

        if (!response.ok) {
          console.error(
            "Response not OK. Status:",
            response.status,
            "Status Text:",
            response.statusText
          );
          throw new Error("Failed to fetch latest transactions");
        }

        const data = await response.json();

        // Log the entire response to ensure the structure is as expected
        console.log("Raw API response:", data);

        // Check for the presence of the `data` field
        if (!data || !data.data) {
          console.error("Missing 'data' field in API response:", data);
          throw new Error("Unexpected API response format");
        }

        // Log the mapped transactions for verification
        const mappedTransactions = data.data.map((tx, index) => ({
          txid: tx.hash,
          time: tx.time,
          input_total_usd: tx.input_total_usd || 0,
          output_total_usd: tx.output_total_usd || 0,
          fee_usd: tx.fee_usd || 0,
        }));

        console.log("Mapped transactions:", mappedTransactions);

        return mappedTransactions;
      } catch (error) {
        console.error("Error occurred during fetch or processing:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error in useLatestTransactions hook:", error.message);
    },
  });
}
