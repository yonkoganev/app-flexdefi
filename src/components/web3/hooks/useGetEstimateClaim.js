import { FLEX_ABI } from '../abis/flex';
import { flexContracts } from '../contracts';
import { useReadContract, useAccount } from 'wagmi';

export function useGetEstimateClaim(id, days) {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.FLEX,
    abi: FLEX_ABI,
    functionName: '_checkRewardAmountbyID',
    args: address && id != null && days != null
      ? [address, id, days]
      : undefined,
    query: {
      enabled: Boolean(address && id && days >= 0),
    }
  });
}
