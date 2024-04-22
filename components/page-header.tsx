"use client"

import * as React from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SearchDialog } from './search-dialog'
import type { Token } from '@/types/token'
import TokenDetails from "./token-details"
import TokenChart from "./token-chart"
import { useAccount } from "wagmi"
import Image from "next/image"

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
    <div className="flex w-full flex-col items-center space-y-4">
      {isConnected ? 
        <div className='w-full max-w-5xl px-8 lg:px-0 py-12'>
          <SearchDialog onResultClick={handleResultClick} />
          <div className="flex flex-col md:flex-row space-x-0 space-y-4 md:space-y-0 md:space-x-4 pt-4 items-start">
            <TokenDetails id={tokenID} contract={tokenContract || ''}/>
            <TokenChart id={tokenID} />
          </div>
        </div>
        : 
        <>
          <h1 className='text-3xl md:text-5xl xl:text-7xl text-center font-extralight pt-12'>Search and discover <br/> your erc-20 tokens</h1>
          <p className='text-sm md:text-xl opacity-30 font-light py-6'>Connect your wallet to get started</p>
          <ConnectButton/>
          <img src="/hero-banner.png" alt="hero-banner" className="w-full pt-24 xl:pt-20 opacity-50"/>
        </>
      }
    </div>
  );
}

