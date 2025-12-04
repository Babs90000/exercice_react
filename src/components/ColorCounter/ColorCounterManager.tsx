import { useState } from "react";
import ColorCounter from "./ColorCounter";
import styles from "./colorCounterManager.module.css";

export default function ColorCounterManager() {
  const [count, setCount] = useState(0);

  function incrementClick() {
    setCount((c) => c + 1);
  }

  function decrementClick() {
    setCount((c) => c - 1);
  }

  function resetClick() {
    setCount(0);
  }

  let color = "";

  if (count < 0) {
    color = styles.negatif;
  } else if (count > 0) {
    color = styles.positif;
  } else {
    color = "";
  }

  return (
    <ColorCounter
      onIncrementClick={incrementClick}
      onDecrementClick={decrementClick}
      onResetClick={resetClick}
      count={count}
      color={color}
    />
  );
}
