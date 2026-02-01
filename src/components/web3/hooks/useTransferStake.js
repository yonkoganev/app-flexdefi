import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { FLEX_ABI } from '../abis/flex';

export function useTransferStake() {
  const { writeContractAsync } = useWriteContract();

  const transferStake = async (id, address) => {
    return await writeContractAsync({
      address: flexContracts.FLEX,
      abi: FLEX_ABI,
      functionName: 'transferStake',
      args: [id, address],
    });
  };

  return { transferStake };
}
