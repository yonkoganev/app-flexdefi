import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useClaimFLEX() {
  const { writeContractAsync } = useWriteContract();

  const claimLiquid = () =>
    writeContractAsync({
      address: flexContracts.auctions,
      abi: DAILY_AUCTIONS_ABI,
      functionName: "claimFlexFromDonations",
    });

  const claimStake = (days) =>
    writeContractAsync({
      address: flexContracts.auctions,
      abi: DAILY_AUCTIONS_ABI,
      functionName: "claimStakeFromDonations",
      args: [Number(days)],
    });

  return { claimLiquid, claimStake };
}
