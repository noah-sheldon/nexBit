import { useState } from 'react';
import { nexBit_backend } from 'declarations/nexBit_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [balance, setBalance] = useState(null);
  const [feePercentiles, setFeePercentiles] = useState([]);
  const [utxos, setUtxos] = useState([]);
  const [btcAmount, setBtcAmount] = useState('');
  const [transaction, setTransaction] = useState('');
  const [sendResult, setSendResult] = useState(null);

  // Greeting Function
  async function handleGreet(name) {
    const result = await nexBit_backend.greet(name);
    setGreeting(result);
  }

  // Get Balance Function
  async function handleGetBalance(address) {
    const result = await nexBit_backend.get_balance(address);
    setBalance(result.Ok ? result.Ok : `Error: ${result.Err}`);
  }

  // Get Current Fee Percentiles Function
  async function handleGetFeePercentiles() {
    const result = await nexBit_backend.get_current_fee_percentiles();
    setFeePercentiles(result.Ok ? result.Ok : `Error: ${result.Err}`);
  }

  // Get UTXOs Function
  async function handleGetUtxos(address) {
    const result = await nexBit_backend.get_utxos(address);
    setUtxos(result.Ok ? result.Ok.utxos : `Error: ${result.Err}`);
  }

  // Convert BTC to Raw Transaction Hash
  function convertBtcToTransactionHash() {
    const transactionHash = (btcAmount * 1e8).toString(16); // Basic conversion to hex format
    setTransaction(transactionHash);
  }

  // Send Transaction Function
  async function handleSendTransaction() {
    const result = await nexBit_backend.send_transaction(transaction);
    setSendResult(result.Ok ? "Transaction sent successfully!" : `Error: ${result.Err}`);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-10 font-sans">
      <header className="text-center mb-10">
        <img src="/logo2.svg" alt="nexBit Logo" className="mx-auto w-20 md:w-32" />
        <h1 className="text-3xl md:text-4xl font-bold mt-4">nexBit</h1>
        <p className="text-gray-400 mt-2">Explore Bitcoin Network Metrics on Local Network</p>
      </header>

      {/* Greeting Section */}
      <section className="my-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get a Greeting</h2>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => handleGreet(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
        />
        <button onClick={() => handleGreet(name)} className="bg-blue-500 px-4 py-2 rounded mt-4 hover:bg-blue-400">
          Submit
        </button>
        <p className="mt-4 text-lg">{greeting}</p>
      </section>

      {/* Check Balance Section */}
      <section className="my-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Check Bitcoin Balance</h2>
        <input
          type="text"
          placeholder="Enter Bitcoin Address"
          onBlur={(e) => handleGetBalance(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
        />
        <button onClick={() => handleGetBalance(address)} className="bg-blue-500 px-4 py-2 rounded mt-4 hover:bg-blue-400">
          Check Balance
        </button>
        <p className="mt-4 text-lg">{balance !== null && `Balance: ${balance} Satoshi`}</p>
      </section>

      {/* Get Fee Percentiles Section */}
      <section className="my-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Current Fee Percentiles</h2>
        <button onClick={handleGetFeePercentiles} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400">
          Get Fee Percentiles
        </button>
        {feePercentiles && (
          <ul className="mt-4 space-y-2">
            {feePercentiles.map((fee, index) => (
              <li key={index}>Fee Percentile: {fee} millisatoshi/byte</li>
            ))}
          </ul>
        )}
      </section>

      {/* Get UTXOs Section */}
      <section className="my-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Check UTXOs</h2>
        <input
          type="text"
          placeholder="Enter Bitcoin Address"
          onBlur={(e) => handleGetUtxos(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
        />
        <button onClick={() => handleGetUtxos(address)} className="bg-blue-500 px-4 py-2 rounded mt-4 hover:bg-blue-400">
          Check UTXOs
        </button>
        <ul className="mt-4 space-y-2">
          {utxos.length > 0
            ? utxos.map((utxo, index) => (
                <li key={index}>
                  UTXO #{index + 1}: {utxo}
                </li>
              ))
            : "No UTXOs found."}
        </ul>
      </section>

      {/* Send Bitcoin Transaction Section */}
      <section className="my-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Send Bitcoin Transaction</h2>
        <input
          type="number"
          placeholder="Enter Amount in BTC"
          value={btcAmount}
          onChange={(e) => setBtcAmount(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
        />
        <button onClick={convertBtcToTransactionHash} className="bg-green-500 px-4 py-2 rounded mt-2 hover:bg-green-400">
          Convert to Transaction Hash
        </button>
        <textarea
          placeholder="Transaction Hash (auto-filled)"
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
          rows="3"
        ></textarea>
        <button onClick={handleSendTransaction} className="bg-red-500 px-4 py-2 rounded mt-4 hover:bg-red-400">
          Send Transaction
        </button>
        <p className="mt-4 text-lg">{sendResult}</p>
      </section>
    </main>
  );
}

export default App;
