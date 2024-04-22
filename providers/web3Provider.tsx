'use client';

import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const { wallets } = getDefaultWallets();


const config = getDefaultConfig({
  appName: 'web3-boilerplate',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  // transports: {
  //   [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/-Jq9Zd1ofDYnBp6yK8hPlLOLlLe2AKyR'),
  // },
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColorForeground: 'white',
          borderRadius: 'medium',
          overlayBlur: 'large',
        })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}