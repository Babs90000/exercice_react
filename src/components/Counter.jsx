import { useState } from "React";

export default function Counter() {
  const [compteur, setCompteur] = useState(0);
  function incrementClick() {
    setCompteur((c) => c + 1);
  }

  function decrementClick() {
    setCompteur((c) => c - 1);
  }

  function reintializeClick() {
    setCompteur(0);
  }

  return (
    <div>
      <p>{compteur}</p>
      <button onClick={incrementClick}>Incrémenter</button>
      <button onClick={decrementClick}>Décrémenter</button>
      <button onClick={reintializeClick}>Réintialiser</button>
    </div>
  );
}
