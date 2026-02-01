import { useReadContract } from 'wagmi';
import { onContracts } from '../contracts';
import { ABI } from '../contracts/abi';

export function useGetLastBurn888() {

  return useReadContract({
    address: onContracts.ON,
    abi: ABI,
    functionName: 'lastBurn888'
  });
}
