import { flexContracts } from '../contracts';
import { useAccount, useReadContract } from 'wagmi';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useGetHasContributed({ day }) {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.auctions,
    abi: DAILY_AUCTIONS_ABI,
    functionName: 'donatorBalances',
    args: [address, day],
    query: {
      enabled: !!address,
    }
  });
}
