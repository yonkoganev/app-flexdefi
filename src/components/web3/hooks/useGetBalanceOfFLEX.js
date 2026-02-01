import { FLEX_ABI } from '../abis/flex';
import { flexContracts } from '../contracts';
import { useAccount, useReadContract } from 'wagmi';

export function useGetBalanceOfFLEX() {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.FLEX,
    abi: FLEX_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address,
    }
  });
}
