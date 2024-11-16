import React from "react";
import useLatestTransactions from "../hooks/useLatestTransactions";
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
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Show Skeleton during loading state
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full" />
            ))}
          </div>
        ) : transactions && transactions.length > 0 ? (
          // Render Table with Transactions
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Input (USD)</TableHead>
                <TableHead>Output (USD)</TableHead>
                <TableHead>Fee (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 10).map((tx) => (
                <TableRow key={tx.txid}>
                  <TableCell className="truncate max-w-[150px]">
                    {tx.txid}
                  </TableCell>
                  <TableCell>{tx.time}</TableCell>
                  <TableCell>${tx.input_total_usd.toFixed(2)}</TableCell>
                  <TableCell>${tx.output_total_usd.toFixed(2)}</TableCell>
                  <TableCell>${tx.fee_usd.toFixed(2)}</TableCell>
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
