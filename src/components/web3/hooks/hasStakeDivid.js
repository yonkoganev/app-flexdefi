import { useReadContract } from 'wagmi';
import { flexContracts } from '../contracts';

export function useHasStakeDivid() {

  return useReadContract({
    address: flexContracts.divid,
    abi: DIV_ABI,
    functionName: 'hasStake'
  });
}
