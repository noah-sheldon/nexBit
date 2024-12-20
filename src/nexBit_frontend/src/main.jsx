import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import Actors from "./Actor";
import { TooltipProvider } from "@/components/ui/tooltip";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      retry: false,
      gcTime: Infinity,
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <InternetIdentityProvider>
          <Actors>
            <App />
          </Actors>
        </InternetIdentityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
