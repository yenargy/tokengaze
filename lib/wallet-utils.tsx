import { useAccount, useBalance } from 'wagmi';

export function useIsConnected() {
  const { isConnected } = useAccount();
  return isConnected;
}

export function getUserBalance() {
  const address = getUserAddress();
  if (!address) {
    return null;
  }
  const { data: balance, isLoading: isBalanceLoading } = useBalance({ address });
  return balance?.formatted.slice(0,5);
}

export function getUserAddress() {
  const { address } = useAccount();
  return address;
}