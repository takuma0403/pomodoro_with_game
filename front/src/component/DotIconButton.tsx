import React from "react";
import styles from "../styles/DotIconButton.module.css";

type DotIconButtonProps = {
  type: "play" | "pause" | "reset";
  onClick?: () => void;
};

const DotIconButton: React.FC<DotIconButtonProps> = ({ type, onClick }) => {
  const dotClass = {
    play: styles.playDot,
    pause: styles.pauseDot,
    reset: styles.resetDot,
  }[type];

  return (
    <button className={`${styles.iconButton} ${dotClass}`} onClick={onClick} />
  );
};

export default DotIconButton;
