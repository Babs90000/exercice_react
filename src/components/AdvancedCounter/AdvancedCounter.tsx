import { useState, useEffect, useRef } from "react";
import CounterDisplay from "./CounterDisplay";
import styles from "./AdvancedCounter.module.css";

type Fonction = () => void;

export default function AdvancedCounter() {
  const [count, setCount] = useState<number>(0);
  const [initialValue, setInitialValue] = useState<number>(0);
  const [mountedTime, setMountedTime] = useState<number>(0);

  function increment(): void {
    setCount(count + 1);
  }

  function decrement(): void {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("La valeur ne peut pas être négative");
    }
  }

  function reset(): void {
    setCount(0);
  }

  function handleInitialValue() {
    setCount(initialValue);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    document.title = count.toString();
  }, [count]);

  useEffect(() => {
    let seconds = 0;
    const timer = setInterval(() => {
      seconds++;
      setMountedTime(seconds);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  console.log(mountedTime);

  return (
    <>
      <h1 className={styles.title}>Compteur avancé</h1>
      <CounterDisplay count={count} />
      <div>
        <input
          type="number"
          min="0"
          onChange={(e) => setInitialValue(Number(e.target.value))}
          ref={inputRef}
          className={styles.input}
        />
        <button
          onClick={handleInitialValue}
          className={`${styles.button} ${styles.buttonValidate}`}
        >
          Valider
        </button>
        <p className={styles.mountedTime}>
          Le count est monté depuis {mountedTime} secondes{" "}
        </p>
      </div>
      <div className={styles.buttonsGroup}>
        <button
          onClick={increment}
          className={`${styles.button} ${styles.buttonIncrement}`}
        >
          Incrementer
        </button>
        <button
          onClick={decrement}
          className={`${styles.button} ${styles.buttonDecrement}`}
        >
          Décrementer
        </button>
        <button
          onClick={reset}
          className={`${styles.button} ${styles.buttonReset}`}
        >
          Réintialiser
        </button>
      </div>
    </>
  );
}
