import { useEffect, useRef, useState } from "react";
import styles from "../styles/ToDoMemoBox.module.css";
import { Phase } from "../types/type";

type ToDoMemoBoxProps = {
  onPhaseChange?: (phase: Phase) => void;
  phase: Phase;
};

export const ToDoMemoBox = ({ onPhaseChange, phase }: ToDoMemoBoxProps) => {
  const [text, setText] = useState("");
  const savedTextRef = useRef("");
  const wasVisibleRef = useRef(false);
  const isVisible = phase === "work-before" || phase === "work-running";

  useEffect(() => {
    if (!wasVisibleRef.current && isVisible) {
      setText(savedTextRef.current);
    }
  }, [isVisible]);

  useEffect(() => {
    if (wasVisibleRef.current && !isVisible) {
      savedTextRef.current = text;
    }
  }, [isVisible, text]);

  useEffect(() => {
    wasVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  return (
    isVisible && (
      <div className={styles.container}>
        <div className={styles.label}>ToDo</div>
        <div className={styles.textbox}>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
      </div>
    )
  );
};