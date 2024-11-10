// components/BlockHeaderComponent.jsx
import React, { useState } from 'react';
import { basic_bitcoin } from 'declarations/basic_bitcoin';

const BlockHeaderComponent = () => {
  const [startHeight, setStartHeight] = useState('');
  const [endHeight, setEndHeight] = useState('');
  const [blockHeaders, setBlockHeaders] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlockHeaders = async () => {
    try {
      // Parse the start and end height as integers
      const start = parseInt(startHeight, 10);
      const end = endHeight ? parseInt(endHeight, 10) : null;

      // Call the canister method to retrieve block headers
      const result = await basic_bitcoin.get_block_headers(start, end);
      setBlockHeaders(result.block_headers || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching block headers:", err);
      setError("Failed to fetch block headers");
      setBlockHeaders([]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">Fetch Block Headers</h2>

      <input
        type="number"
        placeholder="Start Height"
        value={startHeight}
        onChange={(e) => setStartHeight(e.target.value)}
        className="p-3 w-full bg-gray-700 text-white rounded focus:outline-none focus:border-indigo-500 mb-2"
      />

      <input
        type="number"
        placeholder="End Height (optional)"
        value={endHeight}
        onChange={(e) => setEndHeight(e.target.value)}
        className="p-3 w-full bg-gray-700 text-white rounded focus:outline-none focus:border-indigo-500 mb-2"
      />

      <button onClick={fetchBlockHeaders} className="bg-blue-500 mt-4 px-4 py-2 rounded text-white">
        Fetch Headers
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {blockHeaders.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-400 mb-2">Block Headers</h3>
          <ul className="bg-gray-700 p-4 rounded-lg">
            {blockHeaders.map((header, index) => (
              <li key={index} className="text-indigo-200 mb-2">
                Block #{startHeight + index}: {header}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlockHeaderComponent;
