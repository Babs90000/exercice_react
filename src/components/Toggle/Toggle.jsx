import { useState } from "react";

export default function Toggle({ onSwitchOn }) {
  const [on, setOn] = useState(true);

  function handleClick() {
    const newValue = !on;
    setOn(newValue);
    onSwitchOn(newValue);
  }

  return <button onClick={handleClick}>{on ? "OFF" : "ON"}</button>;
}
