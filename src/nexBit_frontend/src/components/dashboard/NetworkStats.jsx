import React from "react";
import useBlockchainStats from "../hooks/useBlockchainStats";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN components
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ShadCN Table

function NetworkStats() {
  const { data: stats, error, isLoading } = useBlockchainStats();

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Network Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full" />
            ))}
          </div>
        ) : error ? (
          // Error State
          <p className="text-red-500">Error: {error.message}</p>
        ) : stats ? (
          // Success State: Display Stats in a Table
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Blocks</TableCell>
                <TableCell>{stats.blocks?.toString() ?? "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transactions</TableCell>
                <TableCell>{stats.transactions?.toString() ?? "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Market Cap</TableCell>
                <TableCell>
                  ${stats.market_cap_usd?.toFixed(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Market Price</TableCell>
                <TableCell>
                  ${stats.market_price_usd?.toFixed(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Difficulty</TableCell>
                <TableCell>
                  {stats.difficulty?.toExponential(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Avg. Transaction Fee (24h)</TableCell>
                <TableCell>
                  ${stats.average_transaction_fee_usd_24h?.toFixed(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Market Dominance</TableCell>
                <TableCell>
                  {stats.market_dominance_percentage?.toFixed(2) ?? "N/A"}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Suggested Fee (sat/byte)</TableCell>
                <TableCell>
                  {stats.suggested_transaction_fee_per_byte_sat?.toString() ??
                    "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          // No Data State
          <p className="text-gray-500">No stats available.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default NetworkStats;
