import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DIV_ABI } from '../abis/divid';

// hardcoded values from hasStake
const STAKE_INDEX = 4;
const FULL_AMOUNT = 546280000000000000000000n; // BigInt

export function useWithdrawDivid() {
  const { writeContractAsync, isPending } = useWriteContract();

  const withdrawDiv = async () => {
    return await writeContractAsync({
      address: flexContracts.divid,
      abi: DIV_ABI,
      functionName: 'withdrawStake',
      args: [FULL_AMOUNT, STAKE_INDEX],
    });
  };

  return {
    withdrawDiv,
    isPending,
  };
}
