import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback((newTime?: number) => {
    pause();
    setSecondsLeft(newTime ?? initialSeconds);
  }, [pause, initialSeconds]);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      pause();
    }
  }, [secondsLeft, pause]);

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}
