import { useContext } from "react";
import { CartContext, Meal } from "../App";
import { HTTP_CONFIGS } from "./utils/Utils";

export default function Product({ meal }: { meal: Meal }) {
  const { cartDispatcher } = useContext(CartContext);

  return (
    <article>
      <img
        src={HTTP_CONFIGS.BACKEND_BASE_PATH + "/" + meal.image}
        alt={meal.name}
      />
      <div>
        <h3>{meal.name}</h3>
        <p className="meal-item-price">{meal.formattedPrice}</p>
        <p className="meal-item-description">{meal.description}</p>
      </div>
      <p className="meal-item-actions">
        <button
          className="button"
          onClick={() =>
            cartDispatcher!({ type: "ADD", item: { ...meal, quantity: 1 } })
          }
        >
          Add To Cart
        </button>
      </p>
    </article>
  );
}
