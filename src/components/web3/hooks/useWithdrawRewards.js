import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { FLEX_ABI } from '../abis/flex';

export function useWithdrawRewards() {
  const { writeContractAsync } = useWriteContract();

  const withdrawRewards = async (id, days) => {
    return await writeContractAsync({
      address: flexContracts.FLEX,
      abi: FLEX_ABI,
      functionName: 'withdrawRewards',
      args: [id, days],
    });
  };

  return { withdrawRewards };
}
