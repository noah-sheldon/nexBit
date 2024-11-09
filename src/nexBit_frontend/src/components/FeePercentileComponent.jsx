// components/FeePercentileComponent.jsx
import React, { useState } from 'react';
import { basic_bitcoin } from 'declarations/basic_bitcoin';

const FeePercentileComponent = () => {
  const [feePercentiles, setFeePercentiles] = useState([]);
  const [error, setError] = useState(null);

  const getFeePercentiles = async () => {
    try {
      const result = await basic_bitcoin.get_current_fee_percentiles();
      setFeePercentiles(result); // Assuming result is an array of fee percentiles
      setError(null);
    } catch (err) {
      setError("Failed to fetch fee percentiles");
      setFeePercentiles([]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">Current Fee Percentiles</h2>
      <button onClick={getFeePercentiles} className="bg-blue-500 mt-4 px-4 py-2 rounded text-white">
        Get Fee Percentiles
      </button>
      {feePercentiles.length > 0 ? (
        <ul className="mt-4 text-indigo-200">
          {feePercentiles.map((fee, index) => (
            <li key={index}>Percentile {index + 1}: {fee} millisatoshi/byte</li>
          ))}
        </ul>
      ) : (
        error && <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default FeePercentileComponent;
