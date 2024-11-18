import React from "react";
import useLatestTransactions from "@/hooks/useLatestTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ShadCN Table
import { Skeleton } from "@/components/ui/skeleton";

function RecentTransactions() {
  const { data: transactions, isLoading } = useLatestTransactions();

  return (
    <Card className="p-4 bg-gray-900 text-gray-300 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Show Skeleton during loading state
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full bg-gray-700" />
            ))}
          </div>
        ) : transactions && transactions.length > 0 ? (
          // Render Table with Transactions
          <Table className="w-full border-collapse border border-gray-700">
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Transaction ID
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Time
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Input (USD)
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Output (USD)
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Fee (USD)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 10).map((tx) => (
                <TableRow key={tx.txid} className="hover:bg-gray-700">
                  <TableCell className="truncate max-w-[150px] py-2 px-4">
                    {tx.txid}
                  </TableCell>
                  <TableCell className="py-2 px-4">{tx.time}</TableCell>
                  <TableCell className="py-2 px-4">
                    ${tx.input_total_usd.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    ${tx.output_total_usd.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    ${tx.fee_usd.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // Handle the case where no transactions are available
          <p className="text-gray-500">No recent transactions available.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentTransactions;
