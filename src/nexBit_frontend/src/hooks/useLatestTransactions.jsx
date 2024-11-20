import { useQuery } from "@tanstack/react-query";

export default function useLatestTransactions() {
  return useQuery({
    queryKey: ["latestTransactions"], // Unique key for caching
    queryFn: async () => {
      const url = "https://www.fcn.social/api/proxy/bitcoin/transactions";

      console.log("Fetching latest transactions from:", url);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const json = await response.json();

        // Validate and extract required fields
        if (json?.data && Array.isArray(json.data)) {
          return json.data.map((transaction) => ({
            txid: transaction.hash, // Transaction ID
            time: transaction.time, // Time of transaction
            input_total_usd: transaction.input_total_usd, // Input total in USD
            output_total_usd: transaction.output_total_usd, // Output total in USD
            fee_usd: transaction.fee_usd, // Fee in USD
          }));
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching latest transactions:", error);
        throw error;
      }
    },
    staleTime: 600000, // Cache the data for 10 minutes
    onError: (error) => {
      console.error("Error in useLatestTransactions:", error);
    },
  });
}
