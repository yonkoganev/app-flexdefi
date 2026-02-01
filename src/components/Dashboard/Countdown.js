import { useEffect, useState } from "react";
import { day_length, launchTimestamp } from "@/constants/TimestampLaunch";

// Convert seconds → ms ONCE
const DAY_MS = day_length * 1000;

function formatHHMMSS(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
}

export function Countdown() {
  const [state, setState] = useState({
    day: 0,
    remainingMs: DAY_MS,
    formatted: formatHHMMSS(DAY_MS),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // ⏳ BEFORE LAUNCH → real countdown
      if (now < launchTimestamp) {
        const remainingMs = launchTimestamp - now;

        setState({
          day: 0,
          remainingMs,
          formatted: formatHHMMSS(remainingMs),
        });
        return;
      }

      // 🚀 AFTER LAUNCH → day-cycle logic
      const elapsedMs = now - launchTimestamp;

      const currentDay = Math.floor(elapsedMs / DAY_MS);
      const timeIntoDay = elapsedMs % DAY_MS;
      const remainingMs = DAY_MS - timeIntoDay;

      setState({
        day: currentDay,
        remainingMs,
        formatted: formatHHMMSS(remainingMs),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}
