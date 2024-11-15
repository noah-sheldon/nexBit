import { useActor } from "../Actor"; // Import the actor context hook

// Fetch the balance of a specific address
export const fetchBalance = async (address) => {
  try {
    const actor = useActor();
    const result = await actor.get_balance(address);
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch balance");
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw new Error("Error fetching balance");
  }
};

// Fetch blockchain statistics
export const fetchBlockchainStats = async () => {
  try {
    console.log("Initializing actor...");
    const actor = useActor();
    if (!actor) {
      throw new Error("Actor is not initialized.");
    }
    console.log("Actor initialized, calling get_blockchain_stats...");

    const result = await actor.get_blockchain_stats();
    console.log("Blockchain stats result:", result);

    if ("Ok" in result) {
      return result.Ok;
    } else {
      throw new Error(result.Err || "Failed to fetch blockchain stats");
    }
  } catch (error) {
    console.error("Error fetching blockchain stats:", error);
    throw error;
  }
};

// Fetch the latest blocks
export const fetchLatestBlocks = async () => {
  try {
    const actor = useActor();
    const result = await actor.get_latest_blocks();
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch latest blocks");
  } catch (error) {
    console.error("Failed to fetch latest blocks:", error);
    throw new Error("Error fetching latest blocks");
  }
};

// Fetch current fee percentiles
export const fetchCurrentFeePercentiles = async () => {
  try {
    const actor = useActor();
    return await actor.get_current_fee_percentiles();
  } catch (error) {
    console.error("Failed to fetch current fee percentiles:", error);
    throw new Error("Error fetching current fee percentiles");
  }
};

// Fetch the latest transactions
export const fetchLatestTransactions = async () => {
  try {
    const actor = useActor();
    const result = await actor.get_latest_transactions();
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch latest transactions");
  } catch (error) {
    console.error("Failed to fetch latest transactions:", error);
    throw new Error("Error fetching latest transactions");
  }
};

// Fetch P2PKH (Pay-to-Pubkey-Hash) address
export const fetchP2pkhAddress = async () => {
  try {
    const actor = useActor();
    return await actor.get_p2pkh_address();
  } catch (error) {
    console.error("Failed to fetch P2PKH address:", error);
    throw new Error("Error fetching P2PKH address");
  }
};

// Fetch P2TR Script Spend address
export const fetchP2trScriptSpendAddress = async () => {
  try {
    const actor = useActor();
    return await actor.get_p2tr_script_spend_address();
  } catch (error) {
    console.error("Failed to fetch P2TR script spend address:", error);
    throw new Error("Error fetching P2TR script spend address");
  }
};

// Fetch P2TR Raw Key Spend address
export const fetchP2trRawKeySpendAddress = async () => {
  try {
    const actor = useActor();
    return await actor.get_p2tr_raw_key_spend_address();
  } catch (error) {
    console.error("Failed to fetch P2TR raw key spend address:", error);
    throw new Error("Error fetching P2TR raw key spend address");
  }
};

// Send Bitcoin from a P2PKH address
export const sendFromP2pkh = async (destinationAddress, amountInSatoshi) => {
  try {
    const actor = useActor();
    return await actor.send_from_p2pkh({
      destination_address: destinationAddress,
      amount_in_satoshi: amountInSatoshi,
    });
  } catch (error) {
    console.error("Failed to send from P2PKH address:", error);
    throw new Error("Error sending from P2PKH address");
  }
};

// Send Bitcoin from a P2TR Script Spend address
export const sendFromP2trScriptSpend = async (
  destinationAddress,
  amountInSatoshi
) => {
  try {
    const actor = useActor();
    return await actor.send_from_p2tr_script_spend({
      destination_address: destinationAddress,
      amount_in_satoshi: amountInSatoshi,
    });
  } catch (error) {
    console.error("Failed to send from P2TR script spend address:", error);
    throw new Error("Error sending from P2TR script spend address");
  }
};

// Send Bitcoin from a P2TR Raw Key Spend address
export const sendFromP2trRawKeySpend = async (
  destinationAddress,
  amountInSatoshi
) => {
  try {
    const actor = useActor();
    return await actor.send_from_p2tr_raw_key_spend({
      destination_address: destinationAddress,
      amount_in_satoshi: amountInSatoshi,
    });
  } catch (error) {
    console.error("Failed to send from P2TR raw key spend address:", error);
    throw new Error("Error sending from P2TR raw key spend address");
  }
};
