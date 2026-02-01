import { useEffect, useState } from "react";

export function useCountdownToTimestamp(timestampSec) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!timestampSec) return;

    const update = () => {
      const now = Date.now();
      const diff = Number(timestampSec) * 1000 - now;
      setRemaining(diff > 0 ? diff : 0);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timestampSec]);

  const totalSeconds = Math.floor(remaining / 1000);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isFinished: remaining === 0,
  };
}
