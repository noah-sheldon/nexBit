import React from "react";
import RecentBlocks from "../components/dashboard/RecentBlocks";
import NetworkStats from "../components/dashboard/NetworkStats";
import FeePercentiles from "../components/dashboard/FeePercentiles";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/card"; // ShadCN Card components

function Dashboard() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex justify-center">
      <div className="max-w-screen-lg w-full space-y-6">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Network Stats */}
        <NetworkStats />

        {/* Fee Percentiles */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Fee Percentiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeePercentiles />
          </CardContent>
        </Card> */}

        {/* Recent Blocks */}
        <RecentBlocks />

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
