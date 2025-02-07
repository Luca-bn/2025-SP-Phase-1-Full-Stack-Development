import { useRef } from "react";
import { useContext, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../App";
import useHttp from "../custom-hooks/UseHttp";
import Input from "./Input";
import { formatPrice, HTTP_CONFIGS } from "./utils/Utils";

export default function Checkout({ ref }) {
  const checkoutDialogRef = useRef();
  const cartContext = useContext(CartContext);
  const { sent, data, error, httpCall, resetHttpState } = useHttp();

  const isPending = sent && !data && !error;

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal: () => checkoutDialogRef.current.showModal(),
      };
    },
    []
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function call() {
      const body = JSON.stringify({
        order: {
          items: cartContext.currentItems,
          customer: Object.fromEntries(new FormData(event.target).entries()),
        },
      });
      await httpCall(HTTP_CONFIGS.POST_ORDER_PARAMS(body));
    }
    call();
  }

  function handleSuccess() {
    cartContext.cartDispatcher({ type: "RESET" });
    resetHttpState();
    checkoutDialogRef.current.close();
  }

  let dialogContent;
  if (error) {
    dialogContent = (
      <>
        <h2>Error...</h2>
        <p>The following error occurred:</p>
        <p>{error}</p>
        <p className="modal-actions">
          <button
            className="button"
            onClick={() => (
              resetHttpState(), checkoutDialogRef.current.close()
            )}
          >
            Close
          </button>
        </p>
      </>
    );
  } else if (data) {
    dialogContent = (
      <>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <button className="button" onClick={handleSuccess}>
            Okay
          </button>
        </p>
      </>
    );
  } else {
    dialogContent = (
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {formatPrice(cartContext.totalPrice)}</p>
        <Input
          name="name"
          type="text"
          label="Full Name"
          required
          // defaultValue="dasf@dfasfas"
        />
        <Input
          name="email"
          type="email"
          label="E-Mail Address"
          required
          // defaultValue="dasf@dfasfas"
        />
        <Input
          name="street"
          type="text"
          label="Street"
          required
          // defaultValue="dasf@dfasfas"
        />
        <div className="control-row">
          <Input
            name="postal-code"
            type="text"
            label="Postal Code"
            //defaultValue="dasf@dfasfas"
          />
          <Input
            name="city"
            type="text"
            label="City"
            //defaultValue="dasf@dfasfas"
          />
        </div>
        <p className="modal-actions">
          {isPending ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <button
                className="text-button"
                type="button"
                onClick={() => checkoutDialogRef.current.close()}
              >
                Close
              </button>
              <button className="button">Submit Order</button>
            </>
          )}
        </p>
      </form>
    );
  }

  return createPortal(
    <dialog className="modal" ref={checkoutDialogRef}>
      {dialogContent}
    </dialog>,
    document.getElementById("modal")
  );
}
