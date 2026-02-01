import { useReadContract } from 'wagmi';
import { onContracts } from '../contracts';
import { ABI } from '../contracts/abi';

export function useGetLastBurn8() {

  return useReadContract({
    address: onContracts.ON,
    abi: ABI,
    functionName: 'lastBurn8'
  });
}
