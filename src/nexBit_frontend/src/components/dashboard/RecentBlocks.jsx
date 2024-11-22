import React from "react";
import useLatestBlocks from "@/hooks/useLatestBlocks";
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
    <Card className="p-4 bg-gray-900 text-gray-300 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Recent Blocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full bg-gray-700" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to fetch recent blocks.</p>
        ) : blocks && blocks.length > 0 ? (
          <Table className="w-full border-collapse border border-gray-700">
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Height
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Transactions
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Size (bytes)
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Date
                </TableHead>
                <TableHead className="py-2 px-4 text-left text-gray-400">
                  Difficulty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map((block) => (
                <TableRow
                  key={block.block_height}
                  className="hover:bg-gray-700"
                >
                  <TableCell className="py-2 px-4">
                    {block.block_height.toString()}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {block.transaction_count.toString()}
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    {block.block_size.toString()}
                  </TableCell>
                  <TableCell className="py-2 px-4">{block.date}</TableCell>
                  <TableCell className="py-2 px-4">
                    {block.difficulty.toExponential(2)}
                  </TableCell>
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
