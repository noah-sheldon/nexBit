import React from "react";
import RecentBlocks from "@/components/dashboard/RecentBlocks";
import NetworkStats from "@/components/dashboard/NetworkStats";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Explorer from "@/components/dashboard/Explorer";
import { FaBitcoin } from "react-icons/fa";

function Dashboard({ canisterId, isAuthenticated }) {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex justify-center">
      <div className="max-w-screen-lg w-full space-y-6">
        {/* Tabs for Dashboard Sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* Show Explorer Tab only if logged in */}
            {isAuthenticated && (
              <TabsTrigger value="explorer">Explorer</TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              <NetworkStats />
              <RecentBlocks />
              <RecentTransactions />
            </div>
          </TabsContent>

          {/* Explorer Tab */}
          {isAuthenticated && (
            <TabsContent value="explorer">
              <Explorer />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
