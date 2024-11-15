import React from 'react';
import useBlockchainStats from '../hooks/useBlockchainStats';

function NetworkStats() {
  const { data: stats, error, isLoading } = useBlockchainStats();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold">Network Stats</h2>
      <p>Blocks: {stats?.blocks ?? "N/A"}</p>
      <p>Transactions: {stats?.transactions ?? "N/A"}</p>
      <p>Market Cap: ${stats?.market_cap_usd ?? "N/A"}</p>
      <p>Market Price: ${stats?.market_price_usd ?? "N/A"}</p>
      <p>Difficulty: {stats?.difficulty ?? "N/A"}</p>
      <p>Average Transaction Fee (24h): ${stats?.average_transaction_fee_usd_24h ?? "N/A"}</p>
      <p>Market Dominance: {stats?.market_dominance_percentage ?? "N/A"}%</p>
      <p>Suggested Fee (sat/byte): {stats?.suggested_transaction_fee_per_byte_sat ?? "N/A"}</p>
    </div>
  );
}

export default NetworkStats;
