interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id != action.payload),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

import { useEffect, useReducer } from "react";
import { useLocalStorage } from "./useLocalStorage";
export const useCart = () => {
  const [savedCarts, setSavedCarts] = useLocalStorage<CartState>("carts", {
    items: [],
  });

  const [state, dispatch] = useReducer(
    cartReducer,
    savedCarts ?? { items: [] },
  );

  useEffect(() => setSavedCarts(state), [state]);

  return { state, dispatch };
};
