import { useEffect, useState } from "react";
import { day_length, launchTimestamp } from "@/constants/TimestampLaunch";

function formatHHMMSS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / day_length);
  const minutes = Math.floor((totalSeconds % day_length) / 60);
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
    remainingMs: day_length,
    formatted: formatHHMMSS(day_length),
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

      // 🚀 AFTER LAUNCH → your existing logic
      const elapsed = now - launchTimestamp;

      const currentDay = Math.floor(elapsed / day_length);
      const timeIntoDay = elapsed % day_length;

      const remainingMs =
        timeIntoDay === 0 ? 0 : day_length - timeIntoDay;

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
