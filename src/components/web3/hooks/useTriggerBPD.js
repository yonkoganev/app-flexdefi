import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useTriggerBPD() {
  const { writeContractAsync } = useWriteContract();

  const triggerBPD = async () => {
    return await writeContractAsync({
      address: flexContracts.auctions,
      abi: DAILY_AUCTIONS_ABI,
      functionName: 'consumeBPD'
    });
  };

  return { triggerBPD };
}
