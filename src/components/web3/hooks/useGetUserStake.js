import { useAccount, useReadContract } from 'wagmi';
import { onContracts } from '../contracts';
import { ABI } from '../contracts/abi';

export function useGetUserStake() {
  const { address } = useAccount();

  return useReadContract({
    address: onContracts.ON,
    abi: ABI,
    functionName: 'getUserStake',
    account: address,
    query: {
      enabled: !!address,
    }
  });
}
