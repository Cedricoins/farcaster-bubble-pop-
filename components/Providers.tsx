"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { farcaster } from "@farcaster/connect";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Bubble Pop",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Optionnel
  chains: [farcaster],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
