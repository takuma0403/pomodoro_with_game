import styles from "../styles/ToDoMemoBox.module.css";

export const ToDoMemoBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>ToDo</div>
      <div className={styles.textbox}>
        <textarea className={styles.textarea}></textarea>
      </div>
    </div>
  );
};
