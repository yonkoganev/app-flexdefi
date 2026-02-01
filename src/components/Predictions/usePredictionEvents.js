// src/web3/hooks/predictions/usePredictionEvents.js
import { useEffect } from "react";
import { usePublicClient } from "wagmi";
import { flexContracts } from "../web3/contracts";
import { PREDICTIONS_ABI } from "../web3/abis/predictions";

export function usePredictionEvents(onUpdate) {
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!publicClient) return;

    const unwatchStarted = publicClient.watchContractEvent({
      address: flexContracts.predictions,
      abi: PREDICTIONS_ABI,
      eventName: "RoundStarted",
      onLogs() {
        onUpdate && onUpdate();
      },
    });

    const unwatchResolved = publicClient.watchContractEvent({
      address: flexContracts.predictions,
      abi: PREDICTIONS_ABI,
      eventName: "RoundResolved",
      onLogs() {
        onUpdate && onUpdate();
      },
    });

    return () => {
      unwatchStarted?.();
      unwatchResolved?.();
    };
  }, [publicClient, onUpdate]);
}
