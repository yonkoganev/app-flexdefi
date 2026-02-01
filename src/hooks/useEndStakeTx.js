import { usePublicClient } from 'wagmi';
import { useEndStake } from '@/components/web3/hooks/useEndStake';

export function useEndStakeTx() {
  const publicClient = usePublicClient();
  const { endStake } = useEndStake();

  const endStakeTx = async (stakeId) => {
    const txHash = await endStake(stakeId);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    if (receipt.status !== 'success') {
      throw new Error('End stake failed');
    }

    return receipt;
  };

  return { endStakeTx };
}
