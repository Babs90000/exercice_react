interface CounterDisplayProps {
  count: number;
}

import styles from "./CounterDisplay.module.css";
export default function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <div className={styles.display}>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
