import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";
import { useTimer } from "../hooks/useTimer";
import { Phase } from "../types/type";

import notificationSound from "../assets/iwashiro_May_Be_A_Battle.mp3";

export type PomodoroTimerHandle = {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  stopAlarm: () => void; // 🔔 アラーム停止
};

const delayTime = 200;

type PomodoroTimerProps = {
  workDuration?: number;
  breakDuration?: number;
  volume?: number; // 🔊 音量 0.0〜1.0
  onSecondsChange?: (seconds: number) => void;
  onPhaseChange?: (phase: Phase) => void;
};

export const PomodoroTimer = forwardRef<PomodoroTimerHandle, PomodoroTimerProps>(
  (
    {
      workDuration = 25 * 60,
      breakDuration = 5 * 60,
      volume = 1.0,
      onSecondsChange,
      onPhaseChange,
    },
    ref
  ) => {
    const [phase, setPhase] = useState<Phase>("work-before");
    const { secondsLeft, isRunning, start, pause, reset } = useTimer(workDuration);

    const audioRef = useRef<HTMLAudioElement>(new Audio(notificationSound));

    // 初期設定（ループ＆音量）
    useEffect(() => {
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }, [volume]);

    const showNotification = (title: string, body: string) => {
      if (Notification.permission === "granted") {
        new Notification(title, { body });
      }
    };

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

        if (phase === "work-running") {
          showNotification("作業終了", "Let's Play a Game !!");
          audioRef.current.play();
        } else if (phase === "break-running") {
          showNotification("休憩終了", "You Should Work Now !!");
        }

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

    useImperativeHandle(ref, () => ({
      startTimer() {
        if (phase === "work-before") {
          reset(workDuration);
          setPhase("work-running");
          start();
        } else if (phase === "break-before") {
          reset(breakDuration);
          setPhase("break-running");
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
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
      stopAlarm() {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
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
