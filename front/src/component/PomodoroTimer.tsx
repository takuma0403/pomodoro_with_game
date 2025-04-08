import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import DotIconButton from "./DotIconButton";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

type Phase = "work-before" | "work-running" | "break-before" | "break-running";

export const PomodoroTimer = () => {
  const [phase, setPhase] = useState<Phase>("work-before");
  const { secondsLeft, isRunning, start, pause, reset } =
    useTimer(WORK_DURATION);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      pause();
      if (phase === "work-running") {
        setPhase("break-before");
      } else if (phase === "break-running") {
        setPhase("work-before");
      }
    }
  }, [secondsLeft, isRunning, pause, phase]);

  const handleStart = () => {
    if (phase === "work-before") {
      reset(WORK_DURATION);
      setPhase("work-running");
      start();
    } else if (phase === "break-before") {
      reset(BREAK_DURATION);
      setPhase("break-running");
      start();
    } else {
      start();
    }
  };

  const handlePause = () => {
    pause();
  };

  const handleReset = () => {
    reset(WORK_DURATION);
    setPhase("work-before");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case "work-before":
        return "作業開始";
      case "work-running":
        return "作業中";
      case "break-before":
        return "休憩前";
      case "break-running":
        return "休憩中";
      default:
        return "";
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>
        {" "}
        {formatTime(
          phase === "work-before"
            ? WORK_DURATION
            : phase === "break-before"
            ? BREAK_DURATION
            : secondsLeft
        )}
      </h1>
      <h2>{getPhaseLabel()}</h2>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        {(phase === "work-before" || phase === "break-before") && (
          <DotIconButton type="play" onClick={handleStart} />
        )}
        {(phase === "work-running" || phase === "break-running") && (
          <>
            {isRunning ? (
              <DotIconButton type="pause" onClick={handlePause} />
            ) : (
              <DotIconButton type="play" onClick={handleStart} />
            )}
          </>
        )}
        {phase === "work-running" && (
          <DotIconButton type="reset" onClick={handleReset} />
        )}
      </div>
    </div>
  );
};
