import { useEffect, useState } from "react";
import { day_length, launchTimestamp } from "@/constants/TimestampLaunch";

const DAY_LENGTH = 60 * 60 * 1000; // 10 minutes

function formatHHMMSS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const duration_day = day_length
  const hours = Math.floor(totalSeconds / duration_day);
  const minutes = Math.floor((totalSeconds % duration_day) / 60);
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
    remainingMs: DAY_LENGTH,
    formatted: formatHHMMSS(DAY_LENGTH),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // Before launch
      if (now < launchTimestamp) {
        setState({
          day: 0,
          remainingMs: DAY_LENGTH,
          formatted: formatHHMMSS(DAY_LENGTH),
        });
        return;
      }

      const elapsed = now - launchTimestamp;

      const currentDay = Math.floor(elapsed / DAY_LENGTH);
      const timeIntoDay = elapsed % DAY_LENGTH;

      const remainingMs =
        timeIntoDay === 0 ? 0 : DAY_LENGTH - timeIntoDay;

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
