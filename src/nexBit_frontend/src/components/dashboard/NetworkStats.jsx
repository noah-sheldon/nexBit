// src/components/dashboard/NetworkStatsComponent.jsx
import React, { useEffect, useState } from 'react';
import { fetchBlockchainStats } from '../../services/bitcoinActor';

function NetworkStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchBlockchainStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadStats();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold">Network Stats</h2>
      <p>Market Cap: ${stats.market_cap_usd}</p>
      <p>Market Price: ${stats.market_price_usd}</p>
      <p>Difficulty: {stats.difficulty}</p>
      <p>Suggested Fee (sat/byte): {stats.suggested_transaction_fee_per_byte_sat}</p>
    </div>
  );
}

export default NetworkStats;
