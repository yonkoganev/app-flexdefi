import { useReadContract } from 'wagmi';
import { onContracts } from '../contracts';
import { ABI } from '../contracts/abi';

export function useGetActiveStakes() {

  return useReadContract({
    address: onContracts.ON,
    abi: ABI,
    functionName: 'activeStakes'
  });
}
