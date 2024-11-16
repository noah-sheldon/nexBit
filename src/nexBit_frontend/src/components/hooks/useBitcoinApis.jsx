import { useState } from "react";
import { useActor } from "../../Actor";

export default function useBitcoinAPIs() {
  const { actor } = useActor();
  const [feePercentiles, setFeePercentiles] = useState([]);
  const [balance, setBalance] = useState(null);
  const [utxos, setUtxos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPIs = async (address) => {
    setIsLoading(true);
    try {
      // Fetch Fee Percentiles
      const fees = await actor.get_current_fee_percentiles();
      setFeePercentiles(fees);

      // Fetch Balance
      const balance = await actor.get_balance(address);
      setBalance(balance);

      // Fetch UTXOs
      const utxoResponse = await actor.get_utxos(address);
      setUtxos(utxoResponse.utxos);
    } catch (error) {
      console.error("Error fetching Bitcoin APIs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { feePercentiles, balance, utxos, fetchAPIs, isLoading };
}
