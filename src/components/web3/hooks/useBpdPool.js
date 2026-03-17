import { useReadContract } from 'wagmi';
import { flexContracts } from '../contracts';
import { DAILY_AUCTIONS_ABI } from '../abis/dailyauctions';

export function useBpdPool() {
    const USDTPOOL = useReadContract({
        address: flexContracts.auctions,
        abi: DAILY_AUCTIONS_ABI,
        functionName: 'USDTPOOL',
    });

    const bpdDistributed = useReadContract({
        address: flexContracts.auctions,
        abi: DAILY_AUCTIONS_ABI,
        functionName: 'bpdDistributed',
    });

    const bpdPoolSnapshot = useReadContract({
        address: flexContracts.auctions,
        abi: DAILY_AUCTIONS_ABI,
        functionName: 'bpdPoolSnapshot',
    });

    return {
        USDTPOOL,
        bpdDistributed,
        bpdPoolSnapshot
    };
}
