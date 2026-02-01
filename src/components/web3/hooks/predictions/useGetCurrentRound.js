import { useReadContract } from 'wagmi';
import { flexContracts } from '../../contracts';
import { PREDICTIONS_ABI } from '../../abis/predictions';

export function useGetCurrentRound() {

  return useReadContract({
    address: flexContracts.predictions,
    abi: PREDICTIONS_ABI,
    functionName: 'currentRoundId'
  });
}
