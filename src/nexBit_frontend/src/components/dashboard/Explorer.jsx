import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaBitcoin } from "react-icons/fa"; // Bitcoin Icon
import useP2pkhAddress from "../hooks/useP2pkhAddress";
import useFeePercentiles from "../hooks/useFeePercentiles";
import useBalance from "../hooks/useBalance";
import useUTXOs from "../hooks/useUTXOs";

function Explorer() {
  const [manualAddress, setManualAddress] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // Fetch P2PKH Address
  const { data: p2pkhAddress, isLoading: isLoadingAddress } = useP2pkhAddress();

  const address = searchAddress || p2pkhAddress;

  // Fetch Fee Percentiles
  const { data: feePercentiles, isLoading: isLoadingFees } =
    useFeePercentiles();

  // Fetch Balance
  const { data: balance, isLoading: isLoadingBalance } = useBalance(address);

  // Fetch UTXOs
  const { data: utxoData, isLoading: isLoadingUTXOs } = useUTXOs(address);

  const utxos = utxoData?.utxos || [];
  const tipBlockHash = utxoData?.tip_block_hash || "-";
  const tipHeight = utxoData?.tip_height?.toString() || "-";

  // Decode txid (Uint8Array) to a hexadecimal string
  const decodeTxid = (txid) => {
    return Array.from(txid)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  // Helper Function: Convert Sats to BTC
  const satsToBTC = (sats) => (sats / 1e8).toFixed(8);

  return (
    <Card className="p-6 space-y-6">
      {/* Search Section */}
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <FaBitcoin className="text-yellow-500" /> Search Bitcoin Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter Bitcoin Address"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
          />
          <Button
            onClick={() => setSearchAddress(manualAddress)}
            disabled={!manualAddress}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Search
          </Button>
        </div>
      </CardContent>

      {/* Address Section */}
      <CardContent>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaBitcoin className="text-yellow-500" /> Current Address
          </h2>
          {isLoadingAddress ? (
            <Skeleton className="h-6 w-full" />
          ) : (
            <div className="text-lg font-medium text-gray-200">
              {address || "-"}
            </div>
          )}
        </div>
      </CardContent>

      {/* Balance Section */}
      <CardContent>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaBitcoin className="text-yellow-500" /> Balance
          </h2>
          {isLoadingBalance ? (
            <Skeleton className="h-6 w-full" />
          ) : balance !== null && balance !== undefined ? (
            <div className="text-lg font-medium text-gray-200 flex items-center gap-2">
              <span>{`${satsToBTC(balance)} BTC`}</span>
              <span className="text-sm text-gray-400">{`(${balance.toLocaleString()} sats)`}</span>
            </div>
          ) : (
            <div className="text-gray-500">-</div>
          )}
        </div>
      </CardContent>

      {/* UTXOs Section */}
      <CardContent>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaBitcoin className="text-yellow-500" /> UTXOs
          </h2>
          {isLoadingUTXOs ? (
            <Skeleton className="h-6 w-full" />
          ) : utxos.length > 0 ? (
            <div>
              {/* <div className="mb-4 text-gray-300">
                <div>
                  <strong>Tip Block Hash:</strong> {decodeTxid(tipBlockHash)}
                </div>
                <div>
                  <strong>Tip Height:</strong> {tipHeight}
                </div>
              </div> */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tx ID</TableHead>
                    <TableHead>Height</TableHead>
                    <TableHead>Value (BTC)</TableHead>
                    <TableHead>Output Index</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {utxos.slice(0, 10).map((utxo, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="truncate max-w-[150px]">
                        {decodeTxid(utxo.outpoint.txid)}
                      </TableCell>
                      <TableCell>{utxo.height}</TableCell>
                      <TableCell>{satsToBTC(parseInt(utxo.value))}</TableCell>
                      <TableCell>{utxo.outpoint.vout}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-gray-500">No UTXOs available.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Explorer;
