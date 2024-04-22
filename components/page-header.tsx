"use client"

import * as React from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SearchDialog } from './search-dialog';
import type { Token } from '@/types/token';
import TokenDetails from "./token-details";
import TokenChart from "./token-chart";
import { useAccount } from "wagmi";

export default function PageHeader() {
  const { isConnected } = useAccount();
  const [tokenID, setTokenID] = React.useState<string>("ethereum")
  const [tokenContract, setTokenContract] = React.useState<string>()

  const handleResultClick = (token: Token) => {
    console.log("Clicked result ID:", token);
    setTokenID(token.id);
    setTokenContract(token.platforms.ethereum);
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center space-y-4 py-12 ">
      {isConnected ? 
        <div className='w-full'>
          <SearchDialog onResultClick={handleResultClick} />
          <div className="flex space-x-4 pt-4 items-start">
            <TokenDetails id={tokenID} contract={tokenContract || ''}/>
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

