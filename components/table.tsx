"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

export default function Table() {
  const { address, isConnected, connector } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })

  return (
    <div className="flex flex-col items-center space-y-4 pt-24 pb-12">
      {isConnected ? 
        <div>{isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'}</div>
        : 
        <>
          <h1 className='text-5xl text-center font-extralight'>Search and discover <br/> your crypto tokens</h1>
          <p className='text-xl opacity-30 font-light'>Connect your wallet to get started</p>
          <ConnectButton/>
        </>
      }
    </div>
  );
}