// context/index.js
'use client';

import { wagmiAdapter, projectId } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { bscTestnet, mainnet } from '@reown/appkit/networks';
import { cookieToInitialState, WagmiProvider } from 'wagmi';
import React from 'react';

const queryClient = new QueryClient();

const metadata = {
  name: 'ONCrypto',
  description: 'ONCrypto App',
  url: 'https://localhost:3000', // use your domain in production
  icons: ['https://assets.reown.com/reown-profile-pic.png']
};

// ✅ Export the modal!
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [bscTestnet],
  defaultNetwork: mainnet,
  metadata,
  features: {
    analytics: false,
    socials: false,
    email: false
  }
});

export default function ContextProvider({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
