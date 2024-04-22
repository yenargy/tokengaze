'use client';

import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme
} from '@rainbow-me/rainbowkit';
import type { Theme } from '@rainbow-me/rainbowkit';
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
import merge from 'lodash.merge';

const { wallets } = getDefaultWallets();

const myTheme = merge(darkTheme(), {
    colors: {
      accentColor: 'hsl(221 100% 44%)',
      accentColorForeground: 'hsl(0, 0%, 100%)',
      actionButtonBorder: 'hsl(228, 9%, 11%)',
      actionButtonBorderMobile: 'hsl(228, 9%, 11%)',
      actionButtonSecondaryBackground: 'hsl(0, 0%, 100%)',
      closeButton: 'hsl(226, 11%, 64%)',
      closeButtonBackground: 'hsl(228, 5%, 18%)',
      connectButtonBackground: 'hsl(228, 9%, 11%)',
      connectButtonBackgroundError: 'hsl(360,100%,64%)',
      connectButtonInnerBackground: 'hsl(225, 4%, 21%)',
      connectButtonText: 'hsl(0, 0%, 100%)',
      connectButtonTextError: 'hsl(0,0%,100%)',
      error: 'hsl(0,0%,100%)',
      generalBorder: 'hsl(228, 5%, 18%)',
      generalBorderDim: 'rgba(0, 0, 0, 0.03)',
      menuItemBackground: 'hsl(229, 9%, 20%)',
      modalBackdrop: 'rgba(0, 0, 0, 0.5)',
      modalBackground: 'hsl(228, 9%, 11%)',
      modalBorder: 'hsl(228, 5%, 18%)',
      modalText: 'hsl(0, 0%, 100%)',
      modalTextDim: 'rgba(60, 66, 66, 0.3)',
      modalTextSecondary: 'hsl(0, 0%, 60%)',
      profileAction: 'hsl(218, 9%, 23%)',
      profileActionHover: 'hsl(230, 7%, 31%)',
      profileForeground: 'hsl(220, 8%, 15%)',
      selectedOptionBorder: 'hsl(221 100% 44%)',
      downloadBottomCardBackground: 'linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.1) 71.04%), #050505',
      downloadTopCardBackground: 'linear-gradient(126deg, rgba(120, 120, 120, 0.1) 9.49%, rgba(0, 0, 0, 0) 71.04%), #050505',
      connectionIndicator: 'hsl(107, 100%, 44%)',
      standby: 'hsl(47, 100%, 63%)',
    },
    radii: {
      actionButton: '0px',
      connectButton: '0px',
      menuButton: '0px',
      modal: '0px',
      modalMobile: '0px',
    },
    shadows: {
      connectButton: '0px 8px 32px rgba(0, 0, 0, 0.32)',
      dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
      profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
      selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
      selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
      walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
    },
    blurs: {
      modalOverlay: 'blur(0px)', // e.g. 'blur(4px)'
    },
    fonts: {
      body: '',
    },
  } as Theme);
  


const config = getDefaultConfig({
  appName: 'tokengaze',
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
        <RainbowKitProvider coolMode theme={myTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}