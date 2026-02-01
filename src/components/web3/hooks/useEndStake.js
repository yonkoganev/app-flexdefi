import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { FLEX_ABI } from '../abis/flex';

export function useEndStake() {
  const { writeContractAsync } = useWriteContract();

  const endStake = async (id) => {
    return await writeContractAsync({
      address: flexContracts.FLEX,
      abi: FLEX_ABI,
      functionName: 'endStake',
      args: [id],
    });
  };

  return { endStake };
}
