import { useImperativeHandle, useRef } from "react";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../App";
import Checkout from "./Checkout";
import { formatPrice } from "./utils/Utils";

export default function Cart({ ref }) {
  const cartDialogRef = useRef();
  const checkoutRef = useRef();
  const cartContext = useContext(CartContext);

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal() {
          cartDialogRef.current.showModal();
        },
      };
    },
    []
  );

  function handleCheckout() {
    cartDialogRef.current.close();
    checkoutRef.current.showModal();
  }

  return createPortal(
    <>
      <Checkout ref={checkoutRef} />
      <dialog className="modal cart" ref={cartDialogRef}>
        <h2>Your Cart</h2>
        <ul>
          {cartContext.currentItems.map((item) => (
            <li className="cart-item" key={item.id}>
              <p>
                {item.name +
                  " - " +
                  item.quantity +
                  " x " +
                  item.formattedPrice}
              </p>
              <p className="cart-item-actions">
                <button
                  onClick={() =>
                    cartContext.cartDispatcher({ type: "REMOVE", item })
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    cartContext.cartDispatcher({ type: "ADD", item })
                  }
                >
                  +
                </button>
              </p>
            </li>
          ))}
        </ul>
        <p className="cart-total">{formatPrice(cartContext.totalPrice)}</p>
        <p className="modal-actions">
          <button
            className="text-button"
            onClick={() => cartDialogRef.current.close()}
          >
            Close
          </button>
          {cartContext.totalPrice > 0 && (
            <button className="button" onClick={handleCheckout}>
              Go to Checkout
            </button>
          )}
        </p>
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
