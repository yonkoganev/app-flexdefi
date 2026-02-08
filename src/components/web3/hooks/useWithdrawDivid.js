import {
  useWriteContract,
  useSwitchChain,
  useChainId,
} from 'wagmi';

import { bsc, bscTestnet } from '@reown/appkit/networks';
import { flexContracts } from '../contracts';
import { DIV_ABI } from '../abis/divid';

const STAKE_INDEX = 4;
const FULL_AMOUNT = 546280000000000000000000n;

export function useWithdrawDivid() {
  const { writeContractAsync, isPending } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const currentChainId = useChainId();

  const withdrawDiv = async () => {
    const originalChainId = currentChainId;

    try {
      // 1️⃣ Switch to MAINNET
      if (currentChainId !== bsc.id) {
        await switchChainAsync({ chainId: bsc.id });
      }

      // 2️⃣ Attempt withdraw tx
      const tx = await writeContractAsync({
        chainId: bsc.id,
        address: flexContracts.divid,
        abi: DIV_ABI,
        functionName: 'withdrawStake',
        args: [FULL_AMOUNT, STAKE_INDEX],
      });

      return tx;
    } catch (err) {
      // Optional: handle rejection / revert / cancel here
      // if (err?.code === 4001) user rejected
      throw err;
    } finally {
      // 3️⃣ ALWAYS switch back to TESTNET
      if (originalChainId === bscTestnet.id) {
        try {
          await switchChainAsync({ chainId: bscTestnet.id });
        } catch (switchErr) {
          // User may reject switch-back — nothing else you can do
          console.warn('User rejected switch back to testnet');
        }
      }
    }
  };

  return {
    withdrawDiv,
    isPending,
  };
}
