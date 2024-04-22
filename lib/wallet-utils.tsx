import { useAccount, useBalance } from 'wagmi';

export function useIsConnected() {
  const { isConnected } = useAccount();
  return isConnected;
}

export function getUserBalance(contract: string) {
  const address = getUserAddress();
  if (!address) {
    return null;
  }
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: contract as `0x${string}`,
  });
  console.log(balance);
  return balance?.formatted
}

export function getUserAddress() {
  const { address } = useAccount();
  return address;
}