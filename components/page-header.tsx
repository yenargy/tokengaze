"use client"

import * as React from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SearchDialog } from './search-dialog';
import type { Token } from '@/types/token';
import { useIsConnected } from '@/lib/wallet-utils';
import TokenDetails from "./token-details";
import TokenChart from "./token-chart";

export default function PageHeader() {
  const isConnected = useIsConnected();
  const [tokenID, setTokenID] = React.useState<string>("ethereum")

  const handleResultClick = (token: Token) => {
    console.log("Clicked result ID:", token);
    setTokenID(token.id);
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center space-y-4 py-12 ">
      {isConnected ? 
        <div className='w-full'>
          <SearchDialog onResultClick={handleResultClick} />
          <div className="flex space-x-4 pt-4 items-start">
            <TokenDetails id={tokenID}/>
            <TokenChart id={tokenID} />
          </div>
        </div>
        : 
        <>
          <h1 className='text-7xl text-center font-extralight'>Search and discover <br/> your crypto tokens</h1>
          <p className='text-xl opacity-30 font-light py-6'>Connect your wallet to get started</p>
          <ConnectButton/>
        </>
      }
    </div>
  );
}

