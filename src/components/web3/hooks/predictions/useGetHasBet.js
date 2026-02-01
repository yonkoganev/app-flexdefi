import { flexContracts } from '../../contracts';
import { useAccount, useReadContract } from 'wagmi';
import { PREDICTIONS_ABI } from '../../abis/predictions';

export function useGetHasBet({ roundId }) {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.predictions,
    abi: PREDICTIONS_ABI,
    functionName: 'bets',
    args: [roundId, address],
    query: {
      enabled: !!address,
    }
  });
}
