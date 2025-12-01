import { useState } from "react";
import Toggle from "./Toggle";
import "Toggle.css";

export default function App() {
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div>
      <p className={switchOn ? "on" : "off"}>Ceci est un text</p>
      <Toggle onSwitchOn={setSwitchOn} />
    </div>
  );
}
