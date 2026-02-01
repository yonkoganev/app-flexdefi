import { useReadContract } from 'wagmi';
import { BFLEX_ABI } from '../abis/bflex';
import { flexContracts } from '../contracts';

export function useGetSoldBFLEX() {

  return useReadContract({
    address: flexContracts.bFLEX,
    abi: BFLEX_ABI,
    functionName: 'totalSupply'
  });
}
