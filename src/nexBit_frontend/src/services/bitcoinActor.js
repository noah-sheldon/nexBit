import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as bitcoinIDL } from "../../../declarations/basic_bitcoin/basic_bitcoin.did.js";
import { AuthClient } from "@dfinity/auth-client";

const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";
const agent = new HttpAgent();
let bitcoinActor = Actor.createActor(bitcoinIDL, { agent, canisterId });
let isAuthenticated = false;
let authClient = null;

const isLocal =
  process.env.NODE_ENV === "development" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Fetch root key in local development
if (isLocal) {
  agent.fetchRootKey().catch((err) => {
    console.warn("Unable to fetch root key:", err);
  });
}

export const initAuth = async () => {
  try {
    authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      isAuthenticated = true;
      agent = new HttpAgent({ identity: authClient.getIdentity() });
      if (isLocal) {
        await agent.fetchRootKey(); // Fetch root key after setting identity in local dev
      }
      bitcoinActor = Actor.createActor(bitcoinIDL, { agent, canisterId });
    }
  } catch (error) {
    console.error("Failed to initialize authentication:", error);
    throw new Error("Initialization of authentication failed");
  }
};

export const login = async () => {
  try {
    if (!authClient) await initAuth();
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        isAuthenticated = true;
        agent = new HttpAgent({ identity: authClient.getIdentity() });
        bitcoinActor = Actor.createActor(bitcoinIDL, { agent, canisterId });
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("User login failed");
  }
};

export const logout = async () => {
  try {
    if (authClient) {
      await authClient.logout();
      isAuthenticated = false;
      agent = new HttpAgent();
      bitcoinActor = Actor.createActor(bitcoinIDL, { agent, canisterId });
    }
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("User logout failed");
  }
};

export const fetchBalance = async (address) => {
  try {
    const result = await bitcoinActor.get_balance(address);
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch balance");
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw new Error("Error fetching balance");
  }
};

export const fetchBlockchainStats = async () => {
  try {
    const result = await bitcoinActor.get_blockchain_stats();
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch blockchain stats");
  } catch (error) {
    console.error("Failed to fetch blockchain stats:", error);
    throw new Error("Error fetching blockchain stats");
  }
};

export const fetchLatestBlocks = async () => {
  try {
    const result = await bitcoinActor.get_latest_blocks();
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch latest blocks");
  } catch (error) {
    console.error("Failed to fetch latest blocks:", error);
    throw new Error("Error fetching latest blocks");
  }
};

export const fetchCurrentFeePercentiles = async () => {
  try {
    return await bitcoinActor.get_current_fee_percentiles();
  } catch (error) {
    console.error("Failed to fetch current fee percentiles:", error);
    throw new Error("Error fetching current fee percentiles");
  }
};

export const fetchLatestTransactions = async () => {
  try {
    const result = await bitcoinActor.get_latest_transactions();
    if ("Ok" in result) return result.Ok;
    throw new Error(result.Err || "Failed to fetch latest transactions");
  } catch (error) {
    console.error("Failed to fetch latest transactions:", error);
    throw new Error("Error fetching latest transactions");
  }
};

export const fetchP2pkhAddress = async () => {
  if (!isAuthenticated) throw new Error("User not authenticated");
  try {
    return await bitcoinActor.get_p2pkh_address();
  } catch (error) {
    console.error("Failed to fetch P2PKH address:", error);
    throw new Error("Error fetching P2PKH address");
  }
};

export const fetchP2trScriptSpendAddress = async () => {
  if (!isAuthenticated) throw new Error("User not authenticated");
  try {
    return await bitcoinActor.get_p2tr_script_spend_address();
  } catch (error) {
    console.error("Failed to fetch P2TR script spend address:", error);
    throw new Error("Error fetching P2TR script spend address");
  }
};

export const fetchP2trRawKeySpendAddress = async () => {
  if (!isAuthenticated) throw new Error("User not authenticated");
  try {
    return await bitcoinActor.get_p2tr_raw_key_spend_address();
  } catch (error) {
    console.error("Failed to fetch P2TR raw key spend address:", error);
    throw new Error("Error fetching P2TR raw key spend address");
  }
};

export const sendFromP2pkh = async (destinationAddress, amountInSatoshi) => {
  if (!isAuthenticated) throw new Error("User not authenticated");
  try {
    return await bitcoinActor.send_from_p2pkh({
      destination_address: destinationAddress,
      amount_in_satoshi: amountInSatoshi,
    });
  } catch (error) {
    console.error("Failed to send from P2PKH address:", error);
    throw new Error("Error sending from P2PKH address");
  }
};

export const sendFromP2trScriptSpend = async (
  destinationAddress,
  amountInSatoshi
) => {
  if (!isAuthenticated) throw new Error("User not authenticated");
  try {
    return await bitcoinActor.send_from_p2tr_script_spend({
      destination_address: destinationAddress,
      amount_in_satoshi: amountInSatoshi,
    });
  } catch (error) {
    console.error("Failed to send from P2TR script spend address:", error);
    throw new Error("Error sending from P2TR script spend address");
  }
};

export const sendFromP2trRawKeySpend = async (
  destinationAddress,
  amountInSatoshi
) => {
  if (!isAuthenticated) throw new Error("User not authenticated");
  try {
    return await bitcoinActor.send_from_p2tr_raw_key_spend({
      destination_address: destinationAddress,
      amount_in_satoshi: amountInSatoshi,
    });
  } catch (error) {
    console.error("Failed to send from P2TR raw key spend address:", error);
    throw new Error("Error sending from P2TR raw key spend address");
  }
};
