import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../Actor";

export default function useUTXOs(address) {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["utxos", address],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");
      if (!address) throw new Error("Address is required.");

      console.log("Fetching UTXOs for address:", address);
      const utxoResponse = await actor.get_utxos(address);
      console.log("Fetched UTXOs:", utxoResponse);

      if (utxoResponse && utxoResponse.utxos) {
        return {
          utxos: utxoResponse.utxos,
          tipBlockHash: utxoResponse.tip_block_hash.toString(),
          tipHeight: utxoResponse.tip_height,
          nextPage: utxoResponse.next_page,
        };
      }
      throw new Error("Failed to fetch UTXOs.");
    },
    enabled: !!actor && !!address, // Fetch only when actor and address are available
    onError: (error) => {
      console.error("Error fetching UTXOs:", error);
    },
  });
}
