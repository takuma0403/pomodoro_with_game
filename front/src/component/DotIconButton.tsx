import React from "react";
import styles from "../styles/DotIconButton.module.css";

type DotIconButtonProps = {
  type: "play" | "pause" | "reset";
  onClick?: () => void;
};

export const DotIconButton: React.FC<DotIconButtonProps> = ({ type, onClick }) => {
  const dotClass = {
    play: styles.playDot,
    pause: styles.pauseDot,
    reset: styles.resetDot,
  }[type];

  return (
    <button className={`${styles.iconButton} ${dotClass}`} onClick={onClick} />
  );
};

type MiniDotIconButtonProps = {
  type: "trashCan";
  onClick?: () => void;
};

export const MiniDotIconButton: React.FC<MiniDotIconButtonProps> = ({ type, onClick }) => {
  const dotClass = {
    trashCan: styles.resetDotMini,
  }[type];

  return (
    <button className={`${styles.miniIconButton} ${dotClass}`} onClick={onClick}></button>
  )
}
