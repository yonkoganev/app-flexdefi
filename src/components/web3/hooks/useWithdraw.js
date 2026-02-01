import { ABI } from '../contracts/abi';
import { useWriteContract } from 'wagmi';
import { onContracts } from '../contracts';

export function useWithdraw() {
  const { writeContractAsync } = useWriteContract();

  const withdraw = async () => {
    return await writeContractAsync({
      address: onContracts.ON,
      abi: ABI,
      functionName: 'withdraw',
    });
  };

  return { withdraw };
}
