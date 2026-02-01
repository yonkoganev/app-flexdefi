import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useTriggerDay() {
  const { writeContractAsync } = useWriteContract();

  const triggerDay = async () => {
    return await writeContractAsync({
      address: flexContracts.auctions,
      abi: DAILY_AUCTIONS_ABI,
      functionName: 'triggerDailyRoutineOneDay'
    });
  };

  return { triggerDay };
}
