import styles from "./CounterDisplay.module.css";
export default function CounterDisplay({ count }) {
  return (
    <div className={styles.display}>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
