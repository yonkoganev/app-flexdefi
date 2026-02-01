import { useReadContract } from 'wagmi';
import { onContracts } from '../contracts';
import { ABI } from '../contracts/abi';

export function useGetTotalStaked() {

  return useReadContract({
    address: onContracts.ON,
    abi: ABI,
    functionName: 'totalXenStaked'
  });
}
