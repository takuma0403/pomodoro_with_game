import { useRef, useState, useEffect } from "react";
import { HourglassTimer } from "./component/Hourglass";
import { PomodoroTimer, PomodoroTimerHandle } from "./component/PomodoroTimer";
import { PomodoroController } from "./component/PomodoroController";
import { ToDoMemoBox } from "./component/ToDoMemoBox";
import { Phase } from "./types/type";

import "./App.css";

function App() {
  const WORK_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const timerRef = useRef<PomodoroTimerHandle>(null);

  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState<Phase>("work-before");
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    timerRef.current?.startTimer();
    setIsRunning(true);

    // 休憩が開始されたタイミングでアラームを止める、暫定処理
    if (phase === "break-before") {
      timerRef.current?.stopAlarm();
    }
  };

  const handlePause = () => {
    timerRef.current?.pauseTimer();
    setIsRunning(false);
  };

  const handleReset = () => {
    timerRef.current?.resetTimer();
    setIsRunning(false);
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  console.log("残り", seconds, "秒");
  console.log("now", phase);

  return (
    <>
      <HourglassTimer />
      <PomodoroTimer
        ref={timerRef}
        workDuration={WORK_DURATION}
        breakDuration={BREAK_DURATION}
        onSecondsChange={setSeconds}
        onPhaseChange={setPhase}
        volume={0.5}
      />
      <PomodoroController
        phase={phase}
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
      />
      <ToDoMemoBox phase={phase} />
    </>
  );
}

export default App;
