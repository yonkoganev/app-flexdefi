import { useReadContract } from 'wagmi';
import { FLEX_ABI } from '../abis/flex';
import { flexContracts } from '../contracts';

export function useGetGlobals() {

  return useReadContract({
    address: flexContracts.FLEX,
    abi: FLEX_ABI,
    functionName: 'globals'
  });
}
