import { useQuery } from "@tanstack/react-query";
import { getActor } from "../Actor";

export default function useP2trScriptSpendAddress() {
  const actor = getActor();

  return useQuery({
    queryKey: ["p2trScriptSpendAddress"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor is not initialized.");

      console.log("Fetching P2TR Script Spend address...");
      try {
        const address = await actor.get_p2tr_script_spend_address();
        console.log("P2TR Script Spend address:", address);
        return address;
      } catch (error) {
        console.error("Error fetching P2TR Script Spend address:", error);
        throw new Error("Failed to fetch P2TR Script Spend address.");
      }
    },
    staleTime: 60000, // Cache for 1 minute
    onError: (error) => {
      console.error("Error fetching P2TR Script Spend address:", error);
    },
  });
}
