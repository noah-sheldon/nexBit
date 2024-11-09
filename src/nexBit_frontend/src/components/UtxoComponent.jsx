// components/UtxoComponent.jsx
import React, { useState } from 'react';
import { basic_bitcoin } from 'declarations/basic_bitcoin';

const UtxoComponent = () => {
  const [address, setAddress] = useState('');
  const [utxos, setUtxos] = useState([]);
  const [error, setError] = useState(null);

  const getUtxos = async () => {
    try {
      const result = await basic_bitcoin.get_utxos(address);
      setUtxos(result.utxos || []); // Assuming result contains an array of UTXOs
      setError(null);
    } catch (err) {
      setError("Failed to fetch UTXOs");
      setUtxos([]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">Check UTXOs</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Bitcoin Address"
        className="p-3 w-full bg-gray-700 text-white rounded focus:outline-none focus:border-indigo-500"
      />
      <button onClick={getUtxos} className="bg-blue-500 mt-4 px-4 py-2 rounded text-white">
        Check UTXOs
      </button>
      {utxos.length > 0 ? (
        <ul className="mt-4 text-indigo-200">
          {utxos.map((utxo, index) => (
            <li key={index}>UTXO #{index + 1}: {JSON.stringify(utxo)}</li>
          ))}
        </ul>
      ) : (
        error && <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default UtxoComponent;
