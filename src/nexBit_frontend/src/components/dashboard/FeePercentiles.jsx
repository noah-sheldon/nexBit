// src/components/dashboard/FeePercentileComponent.jsx
import React, { useEffect, useState } from 'react';
import { fetchCurrentFeePercentiles } from '../../services/bitcoinActor';

function FeePercentile() {
  const [feePercentiles, setFeePercentiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeePercentiles = async () => {
      try {
        const data = await fetchCurrentFeePercentiles();
        setFeePercentiles(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadFeePercentiles();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!feePercentiles.length) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold">Fee Percentiles</h2>
      <ul>
        {feePercentiles.map((fee, index) => (
          <li key={index}>Percentile {index + 1}: {fee} msat/byte</li>
        ))}
      </ul>
    </div>
  );
}

export default FeePercentile;
