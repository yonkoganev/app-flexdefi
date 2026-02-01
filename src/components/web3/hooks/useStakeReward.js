import { useReadContracts } from "wagmi";
import { flexContracts } from "../contracts";
import { FLEX_ABI } from "../abis/flex";

export function useStakeRewards(stakeIDs, address) {
  const calls = stakeIDs?.map(id => ({
    address: flexContracts.FLEX,
    abi: FLEX_ABI,
    functionName: "_checkRewardAmountbyID",
    args: [address, id, 0],
  })) ?? [];

  return useReadContracts({ contracts: calls });
}