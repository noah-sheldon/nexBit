import React from "react";
import useBlockchainStats from "@/hooks/useBlockchainStats";
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
    <Card className="p-4 bg-gray-900 text-gray-300 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Network Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full bg-gray-700" />
            ))}
          </div>
        ) : error ? (
          // Error State
          <p className="text-red-500">Error: {error.message}</p>
        ) : stats ? (
          // Success State: Display Stats in a Table
          <Table className="w-full border-collapse border border-gray-700">
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="text-left py-2 px-4 text-gray-400">
                  Metric
                </TableHead>
                <TableHead className="text-left py-2 px-4 text-gray-400">
                  Value
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">Blocks</TableCell>
                <TableCell className="py-2 px-4">
                  {stats.blocks?.toString() ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">Transactions</TableCell>
                <TableCell className="py-2 px-4">
                  {stats.transactions?.toString() ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">Market Cap</TableCell>
                <TableCell className="py-2 px-4">
                  ${stats.market_cap_usd?.toFixed(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">Market Price</TableCell>
                <TableCell className="py-2 px-4">
                  ${stats.market_price_usd?.toFixed(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">Difficulty</TableCell>
                <TableCell className="py-2 px-4">
                  {stats.difficulty?.toExponential(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">
                  Avg. Transaction Fee (24h)
                </TableCell>
                <TableCell className="py-2 px-4">
                  ${stats.average_transaction_fee_usd_24h?.toFixed(2) ?? "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">Market Dominance</TableCell>
                <TableCell className="py-2 px-4">
                  {stats.market_dominance_percentage?.toFixed(2) ?? "N/A"}%
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-700">
                <TableCell className="py-2 px-4">
                  Suggested Fee (sat/byte)
                </TableCell>
                <TableCell className="py-2 px-4">
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
