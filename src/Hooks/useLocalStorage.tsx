import { useState } from "react";

export const useLocalStorage = <T,>(clé: string, valeurParDefaut: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(clé);
    if (stored == null) {
      return valeurParDefaut;
    } else {
      return JSON.parse(stored);
    }
  });

  const setAndStore = (nouvelleValeur: T) => {
    setValue(nouvelleValeur);
    localStorage.setItem(clé, JSON.stringify(nouvelleValeur));
  };

  return [value, setAndStore] as const;
};
