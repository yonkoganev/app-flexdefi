import { useAccount, useReadContract } from 'wagmi';
import { onContracts } from '../contracts';
import { ABI } from '../contracts/abi';

export function useGetMintRewards({ cRank, term, maturityTs, amplifier, eaaRate }) {
  const { address } = useAccount();

  return useReadContract({
    address: onContracts.ON,
    abi: ABI,
    functionName: 'balanceOf',
    args: [cRank, term, maturityTs, amplifier, eaaRate],
    query: {
      enabled: !!address,
    }
  });
}
