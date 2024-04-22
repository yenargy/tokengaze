import { useBalance, useAccount } from 'wagmi';

export function getUserBalance(contract: string) {
  const { address } = useAccount();
  if (!address) {
    return null;
  }
  const { data: balance} = useBalance({
    address,
    token: contract as `0x${string}`,
  });
  return balance?.formatted
}