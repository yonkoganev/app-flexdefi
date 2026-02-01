import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { FLEX_ABI } from '../abis/flex';

export function useRenameStake() {
  const { writeContractAsync } = useWriteContract();

  const renameStake = async (id, name) => {
    return await writeContractAsync({
      address: flexContracts.FLEX,
      abi: FLEX_ABI,
      functionName: 'renameStake',
      args: [id, name],
    });
  };

  return { renameStake };
}
