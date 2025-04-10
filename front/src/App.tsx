import { useState } from "react";
import { HourglassTimer } from "./component/Hourglass";
import { PomodoroTimer } from "./component/PomodoroTimer";

import "./App.css";

function App() {
  const WORK_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const [seconds, setSeconds] = useState(0);

  console.log(seconds)

  return (
    <>
      <HourglassTimer />
      <PomodoroTimer
        workDuration={WORK_DURATION}
        breakDuration={BREAK_DURATION}
        onSecondsChange={(s) => {
          setSeconds(s);
          console.log("残り秒数:", s);
        }}
      />
    </>
  );
}

export default App;
