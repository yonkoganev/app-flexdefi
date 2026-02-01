import { USDT_ABI } from '../abis/usdt';
import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';

export function useApprove() {
  const { writeContractAsync } = useWriteContract();

  const approve = async (spender, amount) => {
    return await writeContractAsync({
      address: flexContracts.USDT,
      abi: USDT_ABI,
      functionName: 'approve',
      args: [spender, amount],
    });
  };

  return { approve };
}
