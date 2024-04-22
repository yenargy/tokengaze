import { useAccount } from "wagmi";

  
export const WalletStatus = () => {
  const { isConnected } = useAccount();

  if (isConnected) return;

  return (
    <div className="flex space-x-4">
      
      <p className="uppercase">Wallet not connected</p>
    </div>
  );
};