import { FLEX_ABI } from '../abis/flex';
import { flexContracts } from '../contracts';
import { useReadContract, useAccount } from 'wagmi';

export function useGetStakes({ offset, length }) {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.FLEX,
    abi: FLEX_ABI,
    functionName: "stakesDataPagination",
    args: [address, offset, length],
    query: {
      enabled: !!address,
    }
  });
}
