import { useCallback, useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { useTimer } from "../hooks/useTimer";
import { Phase } from "../types/type";

export type PomodoroTimerHandle = {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
};

const delayTime = 200;

type PomodoroTimerProps = {
  workDuration?: number;
  breakDuration?: number;
  onSecondsChange?: (seconds: number) => void;
  onPhaseChange?: (phase: Phase) => void;
};

export const PomodoroTimer = forwardRef<PomodoroTimerHandle, PomodoroTimerProps>(
  (
    {
      workDuration = 25 * 60,
      breakDuration = 5 * 60,
      onSecondsChange,
      onPhaseChange,
    },
    ref
  ) => {
    const [phase, setPhase] = useState<Phase>("work-before");
    const { secondsLeft, isRunning, start, pause, reset } = useTimer(workDuration);

    const getPhaseLabel = useCallback(() => {
      switch (phase) {
        case "work-before":
          return "Let's Work !!";
        case "work-running":
          return "Now Working ...";
        case "break-before":
          return "Let's Play";
        case "break-running":
          return "Now Playing";
        default:
          return "";
      }
    }, [phase]);

    const [phaseLabel, setPhaseLabel] = useState<string>(getPhaseLabel());

    useEffect(() => {
      if (secondsLeft === 0 && isRunning) {
        pause();
        setTimeout(() => {
          if (phase === "work-running") {
            setPhase("break-before");
          } else if (phase === "break-running") {
            setPhase("work-before");
          }
        }, delayTime);
      }
    }, [secondsLeft, isRunning, pause, phase]);

    useEffect(() => {
      onSecondsChange?.(secondsLeft);
    }, [secondsLeft, onSecondsChange]);

    useEffect(() => {
      onPhaseChange?.(phase);
    }, [phase, onPhaseChange]);

    useEffect(() => {
      setPhaseLabel("");
      setTimeout(() => {
        setPhaseLabel(getPhaseLabel());
      }, delayTime);
    }, [phase, getPhaseLabel]);

    // 外部から呼び出せる操作
    useImperativeHandle(ref, () => ({
      startTimer() {
        if (phase === "work-before") {
          reset(workDuration);
          setPhase("work-running");
          start();
        } else if (phase === "break-before") {
          reset(breakDuration);
          setPhase("break-running");
          start();
        } else {
          start();
        }
      },
      pauseTimer() {
        pause();
      },
      resetTimer() {
        reset(workDuration);
        setPhase("work-before");
      },
    }));

    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
      const s = (seconds % 60).toString().padStart(2, "0");
      return `${m}:${s}`;
    };

    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>
          {formatTime(
            phase === "work-before"
              ? workDuration
              : phase === "break-before"
              ? breakDuration
              : secondsLeft
          )}
        </h1>
        <h2>{phaseLabel}</h2>
      </div>
    );
  }
);
