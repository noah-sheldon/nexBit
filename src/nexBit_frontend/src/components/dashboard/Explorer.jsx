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
import useP2pkhAddress from "@/hooks/useP2pkhAddress";
import useFeePercentiles from "@/hooks/useFeePercentiles";
import useBalance from "@/hooks/useBalance";
import useUTXOs from "@/hooks/useUTXOs";

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
  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: balanceError,
  } = useBalance(address);

  // Fetch UTXOs
  const {
    data: utxoData,
    isLoading: isLoadingUTXOs,
    error: utxoError,
  } = useUTXOs(address);

  const utxos = utxoData?.utxos || [];

  // Decode txid (Uint8Array) to a hexadecimal string
  const decodeTxid = (txid) => {
    return Array.from(txid)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  // Helper Function: Convert Sats to BTC
  const satsToBTC = (sats) => (sats / 1e8).toFixed(8);

  return (
    <Card className="p-6 space-y-6 bg-gray-900 text-gray-300 rounded-lg shadow-md">
      {/* Search Section */}
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
          <FaBitcoin className="text-yellow-500" /> Search Bitcoin Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter Bitcoin Address"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="bg-gray-800 text-gray-300"
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
            <Skeleton className="h-6 w-full bg-gray-700" />
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
            <Skeleton className="h-6 w-full bg-gray-700" />
          ) : balanceError ? (
            <div className="text-red-500">Error fetching balance.</div>
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

      {/* Fee Percentiles Section */}
      <CardContent>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaBitcoin className="text-yellow-500" /> Fee Percentiles (sats/vB)
          </h2>
          {isLoadingFees ? (
            <Skeleton className="h-6 w-full bg-gray-700" />
          ) : feePercentiles && feePercentiles.length > 0 ? (
            <>
              {/* Summary Section */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-yellow-500">
                  Median Fee: {feePercentiles[50].toLocaleString()} sats/vB
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Transaction fee percentiles over the last 10,000 transactions.
                </p>
              </div>
            </>
          ) : (
            <div className="text-gray-500">No fee data available.</div>
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
            <Skeleton className="h-6 w-full bg-gray-700" />
          ) : utxoError ? (
            <div className="text-red-500">Error fetching UTXOs.</div>
          ) : utxos.length > 0 ? (
            <Table className="w-full border-collapse border border-gray-700">
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="py-2 px-4 text-left text-gray-400">
                    Tx ID
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-gray-400">
                    Height
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-gray-400">
                    Value (BTC)
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-gray-400">
                    Output Index
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utxos.slice(0, 10).map((utxo, idx) => (
                  <TableRow key={idx} className="hover:bg-gray-700">
                    <TableCell className="truncate max-w-[150px] py-2 px-4">
                      {decodeTxid(utxo.outpoint.txid)}
                    </TableCell>
                    <TableCell className="py-2 px-4">{utxo.height}</TableCell>
                    <TableCell className="py-2 px-4">
                      {satsToBTC(parseInt(utxo.value))}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {utxo.outpoint.vout}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-gray-500">No UTXOs available.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Explorer;
