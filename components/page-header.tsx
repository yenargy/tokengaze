"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { SearchDialog } from './ui/search-dialog';
import type { Token } from '@/types/token';

export default function PageHeader() {
  const { address, isConnected, connector } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })

  const handleResultClick = (token: Token) => {
    console.log("Clicked result ID:", token);
  }

  return (
    <div className="flex w-1/3 flex-col items-center space-y-4 pt-24 pb-12">
      {isConnected ? 
        <>
          {/* {isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'} */}
          <SearchDialog onResultClick={handleResultClick} />
        </>
        : 
        <>
          <h1 className='text-5xl text-center font-extralight'>Search and discover <br/> your crypto tokens</h1>
          <p className='text-xl opacity-30 font-light py-6'>Connect your wallet to get started</p>
          <ConnectButton/>
        </>
      }
    </div>
  );
}

