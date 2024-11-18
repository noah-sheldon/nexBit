import { useActor } from "../Actor";
import { useQuery } from "@tanstack/react-query";

export default function useP2pkhAddress() {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["p2pkhAddress"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Actor initialized, calling get_p2pkh_address...");

      try {
        const address = await actor.get_p2pkh_address();
        console.log("Fetched P2PKH address:", address); // Log to verify the result
        return address;
      } catch (error) {
        console.error("Failed to fetch P2PKH address:", error);
        throw new Error("Failed to fetch P2PKH address.");
      }
    },
    enabled: !!actor,
    onError: (error) => {
      console.error("Error in useP2pkhAddress:", error);
    },
  });
}
