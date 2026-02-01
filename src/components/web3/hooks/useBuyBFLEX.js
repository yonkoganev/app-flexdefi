import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { BFLEX_ABI } from '../abis/bflex';

export function useBuyBFLEX() {
  const { writeContractAsync } = useWriteContract();

  const buyBFLEX = async (amount) => {
    return await writeContractAsync({
      address: flexContracts.bFLEX,
      abi: BFLEX_ABI,
      args: [amount],
      functionName: 'buy'
    });
  };

  return { buyBFLEX };
}
