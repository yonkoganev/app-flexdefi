import { useReadContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useGetAuctionGlobals() {

  return useReadContract({
    address: flexContracts.auctions,
    abi: DAILY_AUCTIONS_ABI,
    functionName: 'g'
  });
}
