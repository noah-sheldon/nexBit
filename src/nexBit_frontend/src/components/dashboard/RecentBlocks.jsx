import React from "react";
import useLatestBlocks from "../hooks/useLatestBlocks";
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

function RecentBlocks() {
  const { data: blocks, isLoading, error } = useLatestBlocks();

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Blocks</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Show Skeleton during Loading */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to fetch recent blocks.</p>
        ) : blocks && blocks.length > 0 ? (
          // Render Table with Data
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Height</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Size (bytes)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Difficulty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map((block) => (
                <TableRow key={block.block_height}>
                  <TableCell>{block.block_height.toString()}</TableCell>
                  <TableCell>{block.transaction_count.toString()}</TableCell>
                  <TableCell>{block.block_size.toString()}</TableCell>
                  <TableCell>{block.date}</TableCell>
                  <TableCell>{block.difficulty.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">No recent blocks available.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentBlocks;
