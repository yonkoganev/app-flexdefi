import { useWriteContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useDonateUSDT() {
  const { writeContractAsync } = useWriteContract();

  const donate = async (amount) => {
    return await writeContractAsync({
      address: flexContracts.auctions,
      abi: DAILY_AUCTIONS_ABI,
      args: [amount],
      functionName: 'donateUSDT'
    });
  };

  return { donate };
}
