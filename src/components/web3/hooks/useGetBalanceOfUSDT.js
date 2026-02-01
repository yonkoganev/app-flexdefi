import { USDT_ABI } from '../abis/usdt';
import { flexContracts } from '../contracts';
import { useAccount, useReadContract } from 'wagmi';

export function useGetBalanceOfUSDT() {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.USDT,
    abi: USDT_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address,
    }
  });
}
