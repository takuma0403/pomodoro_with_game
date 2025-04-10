import { useState } from "react";
import { HourglassTimer } from "./component/Hourglass";
import { PomodoroTimer, Phase } from "./component/PomodoroTimer";
import { ToDoMemoBox } from "./component/ToDoMemoBox";

import "./App.css";

function App() {
  const WORK_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState<Phase>("work-before");

  console.log("残り", seconds, "秒")
  console.log("now", phase)

  return (
    <>
      <HourglassTimer />
      <PomodoroTimer
        workDuration={WORK_DURATION}
        breakDuration={BREAK_DURATION}
        onSecondsChange={setSeconds}
        onPhaseChange={setPhase}
      />
      <ToDoMemoBox/>
    </>
  );
}

export default App;
