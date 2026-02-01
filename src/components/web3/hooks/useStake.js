import { FLEX_ABI } from '../abis/flex';
import { flexContracts } from '../contracts';
import { useAccount, useWriteContract } from 'wagmi';

export function useStake() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const createStake = async ({ description, amount, days, irrevocable }) => {
    return await writeContractAsync({
      address: flexContracts.FLEX,
      abi: FLEX_ABI,
      functionName: 'createStake',
      args: [address, amount, days, description, irrevocable],
      query: {
        enabled: !!address,
      }
    });
  };

  return { createStake };
}
