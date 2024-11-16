import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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

  return (
    <Card className="p-6 space-y-6">
      {/* Search Section */}
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Search Bitcoin Address
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
          >
            Search
          </Button>
        </div>
      </CardContent>

      {/* Address Section */}
      <CardContent>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Current Address</h2>
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
          <h2 className="text-lg font-semibold">Balance</h2>
          {isLoadingBalance ? (
            <Skeleton className="h-6 w-full" />
          ) : balance !== null && balance !== undefined ? (
            <div className="text-lg font-medium text-gray-200">
              {`${balance.toLocaleString()} sats`}
            </div>
          ) : (
            "-"
          )}
        </div>
      </CardContent>

      {/* Fee Percentiles Section */}
      <CardContent>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Fee Percentiles</h2>
          {isLoadingFees ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-full" />
              ))}
            </div>
          ) : feePercentiles && feePercentiles.length > 0 ? (
            <ul className="space-y-2 text-gray-300">
              {feePercentiles.map((fee, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>Percentile {idx + 1}:</span>
                  <span>{fee.toLocaleString()} msats/byte</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">-</div>
          )}
        </div>
      </CardContent>

      {/* UTXOs Section */}
      <CardContent>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">UTXOs</h2>
          {isLoadingUTXOs ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-full" />
              ))}
            </div>
          ) : utxos && utxos.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-1 text-gray-300">
                <div>
                  <strong>Tip Block Hash:</strong> {tipBlockHash}
                </div>
                <div>
                  <strong>Tip Height:</strong> {tipHeight}
                </div>
              </div>
              <ul className="space-y-4">
                {utxos.map((utxo, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col gap-2 p-4 rounded-md bg-gray-800"
                  >
                    <div className="flex justify-between">
                      <span>Tx ID:</span>
                      <span className="truncate max-w-[200px]">
                        {utxo.outpoint.txid.toString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span>{utxo.value.toLocaleString()} sats</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-gray-500">-</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Explorer;
