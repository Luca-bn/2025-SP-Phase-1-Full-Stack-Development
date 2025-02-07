import { useReducer } from "react";
import { createContext } from "react";
import Header from "./components/Header";
import Products from "./components/Products";

export const CartContext = createContext({
  currentItems: [],
  cartDispatcher: undefined,
  totalPrice: undefined,
  itemsQuantity: undefined,
});

function cartReducer(state, action) {
  const item = action.item;
  const type = action.type;
  switch (type) {
    case "ADD": {
      const newItems = [];
      let alreadyPresent = false;

      for (const el of state) {
        const newItem = Object.fromEntries(Object.entries(el));
        if (el.id === item.id) {
          newItem.quantity++;
          alreadyPresent = true;
        }
        newItems.push(newItem);
      }

      alreadyPresent || newItems.push(Object.fromEntries(Object.entries(item)));
      return newItems;
    }
    case "REMOVE": {
      const newItems = [];

      for (const el of state) {
        const newItem = Object.fromEntries(Object.entries(el));
        if (el.id === item.id) newItem.quantity--;
        if (newItem.quantity > 0) newItems.push(newItem);
      }

      return newItems;
    }
    case "RESET":
      return [];
    default:
      throw new Error("Unandled Operation!");
  }
}

export function App() {
  const [cartItems, cartDispatcher] = useReducer(cartReducer, []);
  const totalPrice = cartItems
    .map((item) => +item.price * +item.quantity)
    .reduce((accumulator, current) => accumulator + current, 0);
  const itemsQuantity = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <CartContext
      value={{
        currentItems: cartItems,
        cartDispatcher,
        totalPrice,
        itemsQuantity,
      }}
    >
      <Header />
      <Products />
    </CartContext>
  );
}
