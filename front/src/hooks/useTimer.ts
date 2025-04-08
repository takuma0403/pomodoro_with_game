import { useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      pause();
    }
  }, [secondsLeft]);

  const start = () => setIsRunning(true);
  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };
  const reset = (newTime?: number) => {
    pause();
    setSecondsLeft(newTime ?? initialSeconds);
  };

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}
