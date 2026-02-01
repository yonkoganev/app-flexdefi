import { useAccount } from 'wagmi';
import { USDT_ABI } from '../abis/usdt';
import { useReadContract } from 'wagmi';
import { flexContracts } from '../contracts';

export function useGetAllowanceAuction() {
  const { address } = useAccount();

  return useReadContract({
    address: flexContracts.USDT,
    abi: USDT_ABI,
    functionName: 'allowance',
    args: [address, flexContracts.auctions],
    query: {
      enabled: !!address,
    },
  });
}
