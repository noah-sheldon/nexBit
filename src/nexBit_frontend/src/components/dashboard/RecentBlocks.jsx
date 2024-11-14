// src/components/dashboard/RecentBlocksComponent.jsx
import React, { useEffect, useState } from 'react';
import { fetchLatestBlocks } from '../../services/bitcoinActor';

function RecentBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const data = await fetchLatestBlocks();
        setBlocks(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadBlocks();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!blocks.length) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold">Recent Blocks</h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.block_height}>
            <p>Block Height: {block.block_height}</p>
            <p>Transaction Count: {block.transaction_count}</p>
            <p>Size: {block.block_size} bytes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentBlocks;
