import { useWriteContract } from 'wagmi';
import { flexContracts } from '../../contracts';
import { PREDICTIONS_ABI } from '../../abis/predictions';

export function useBet() {
  const { writeContractAsync } = useWriteContract();

  const betLong = (amount) =>
    writeContractAsync({
      address: flexContracts.predictions,
      abi: PREDICTIONS_ABI,
      functionName: "betLONG",
      args: [amount],
    });

  const betShort = (amount) =>
    writeContractAsync({
      address: flexContracts.predictions,
      abi: PREDICTIONS_ABI,
      functionName: "betSHORT",
      args: [amount],
    });

  return { betLong, betShort };
}
