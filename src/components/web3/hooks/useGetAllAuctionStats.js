import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { flexContracts } from "../contracts";
import { DAILY_AUCTIONS_ABI } from "../abis/dailyauctions";
import { useGetCurrentDay } from "./useGetCurrentDay";

export function useGetAllAuctionStats() {
  // 1️⃣ Get current day (single hook, fine)
  const { data: currentDay } = useGetCurrentDay();

  // 2️⃣ Build array [0, 1, 2, ..., currentDay]
  const days = useMemo(() => {
    if (currentDay == null) return [];
    return Array.from({ length: Number(currentDay - 1) }, (_, i) => i + 1);
  }, [currentDay]);

  // 3️⃣ Batch read all auctionStatsOfDay calls
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContracts({
    contracts: days.map((day) => ({
      address: flexContracts.auctions,
      abi: DAILY_AUCTIONS_ABI,
      functionName: "auctionStatsOfDay",
      args: [day],
    })),
    query: {
      enabled: days.length > 0,
    },
  });

  // 4️⃣ Normalize results into clean array
  const allStats = useMemo(() => {
    if (!data) return [];

    return data.map((item, index) => ({
      day: days[index],
      stats: item.result,
    }));
  }, [data, days]);

  return {
    allStats,      // [{ day, stats }, ...]
    isLoading,
    isError,
    refetch,
    currentDay,
  };
}
