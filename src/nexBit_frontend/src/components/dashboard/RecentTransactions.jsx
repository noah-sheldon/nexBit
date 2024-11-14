// src/components/dashboard/RecentTransactionsComponent.jsx
import React, { useEffect, useState } from 'react';
import { fetchLatestTransactions } from '../../services/bitcoinActor';

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchLatestTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadTransactions();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!transactions.length) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
      <ul>
        {transactions.slice(0, 10).map((tx) => (
          <li key={tx.txid} className="border-b border-gray-200 py-2">
            <p><strong>Transaction ID:</strong> {tx.txid}</p>
            <p><strong>Time:</strong> {tx.time}</p>
            <p><strong>Input Total (USD):</strong> ${tx.input_total_usd.toFixed(2)}</p>
            <p><strong>Output Total (USD):</strong> ${tx.output_total_usd.toFixed(2)}</p>
            <p><strong>Fee (USD):</strong> ${tx.fee_usd.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTransactions;
