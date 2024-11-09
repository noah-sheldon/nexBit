// components/BalanceComponent.jsx
import React, { useState } from 'react';
import { basic_bitcoin } from 'declarations/basic_bitcoin';

const BalanceComponent = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const getBalance = async () => {
    try {
      const result = await basic_bitcoin.get_balance(address);
      setBalance(result.Ok !== undefined ? result.Ok.toString() : result.toString());
      setError(null);
    } catch (err) {
      setError("Failed to fetch balance");
      setBalance(null);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">Check Bitcoin Balance</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Bitcoin Address"
        className="p-3 w-full bg-gray-700 text-white rounded focus:outline-none focus:border-indigo-500"
      />
      <button onClick={getBalance} className="bg-blue-500 mt-4 px-4 py-2 rounded text-white">
        Check Balance
      </button>
      {balance && <p className="mt-4">Balance: {balance} Satoshi</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BalanceComponent;
