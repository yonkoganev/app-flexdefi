import { BFLEX_ABI } from '../abis/bflex';
import { flexContracts } from '../contracts';
import { useAccount, useReadContract } from 'wagmi';

export function useGetBalanceOfBFLEX() {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.bFLEX,
    abi: BFLEX_ABI,
    functionName: 'balanceOf',
    args: [address]
  });
}
