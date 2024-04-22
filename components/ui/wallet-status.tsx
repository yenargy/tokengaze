"use client"

import { useAccount } from "wagmi";

export const WalletStatus = () => {
  const { isConnected } = useAccount();

  if (isConnected) return;

  return (
    <div className="flex space-x-4 items-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="4" fill="#E64747"/>
        <circle cx="8" cy="8" r="6" stroke="#E64747" strokeOpacity="0.67" strokeWidth="4"/>
      </svg>
      <p className="uppercase text-xs opacity-50">Wallet not connected</p>
    </div>
  );
};