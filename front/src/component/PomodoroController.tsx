import { DotIconButton } from "./DotIconButton";
import { Phase } from "../types/type";

type PomodoroControllerProps = {
  phase: Phase;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export const PomodoroController = ({
  phase,
  isRunning,
  onStart,
  onPause,
  onReset,
}: PomodoroControllerProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
      {(phase === "work-before" || phase === "break-before") && (
        <DotIconButton type="play" onClick={onStart} />
      )}
      {(phase === "work-running" || phase === "break-running") && (
        <>
          {isRunning ? (
            <DotIconButton type="pause" onClick={onPause} />
          ) : (
            <DotIconButton type="play" onClick={onStart} />
          )}
        </>
      )}
      {phase === "work-running" && (
        <DotIconButton type="reset" onClick={onReset} />
      )}
    </div>
  );
};
