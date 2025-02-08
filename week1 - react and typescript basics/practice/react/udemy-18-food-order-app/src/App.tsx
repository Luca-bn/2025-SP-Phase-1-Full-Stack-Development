import { useReducer } from "react";
import { createContext } from "react";
import Header from "./components/Header";
import Products from "./components/Products";

export type Meal = {
  id: string,
  name: string,
  price: number,
  description: string,
  image: string,
  quantity?: number
  formattedPrice?: string
}

export const CartContext = createContext<{
  currentItems: Meal[],
  cartDispatcher: ((action: { item?: Meal, type: "ADD" | "REMOVE" | "RESET" }) => void) | undefined,
  totalPrice: number | undefined,
  itemsQuantity: number | undefined,
}>({
  currentItems: [],
  cartDispatcher: undefined,
  totalPrice: undefined,
  itemsQuantity: undefined,
});

function cartReducer(state: Meal[], action: { item?: Meal, type: "ADD" | "REMOVE" | "RESET" }): Meal[] {
  const item = action.item;
  const type = action.type;
  switch (type) {
    case "ADD": {
      const newItems = [];
      let alreadyPresent = false;

      for (const el of state) {
        const newItem = Object.fromEntries(Object.entries(el)) as Meal;
        if (el.id === item?.id) {
          newItem.quantity!++;
          alreadyPresent = true;
        }
        newItems.push(newItem);
      }

      alreadyPresent || newItems.push(Object.fromEntries(Object.entries(item!)) as Meal);
      return newItems;
    }
    case "REMOVE": {
      const newItems = [];

      for (const el of state) {
        const newItem = Object.fromEntries(Object.entries(el)) as Meal;
        if (el.id === item?.id) newItem.quantity!--;
        if (newItem.quantity && newItem.quantity > 0) newItems.push(newItem);
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
    .map((item: Meal) => +item.price * +item.quantity!)
    .reduce((accumulator: number, current: number) => accumulator + current, 0);
  const itemsQuantity = cartItems.reduce(
    (accumulator: number, currentValue: Meal) => accumulator + currentValue.quantity!,
    0
  );

  return (
    <CartContext.Provider
      value={{
        currentItems: cartItems,
        cartDispatcher,
        totalPrice,
        itemsQuantity,
      }}
    >
      <Header />
      <Products />
    </CartContext.Provider>
  );
}
