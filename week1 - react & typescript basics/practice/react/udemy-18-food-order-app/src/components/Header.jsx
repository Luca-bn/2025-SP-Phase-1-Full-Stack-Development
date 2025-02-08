import { useRef } from "react";
import { useContext } from "react";
import { CartContext } from "../App";
import logo from "../assets/logo.jpg";
import Cart from "./Cart";

export default function Header() {
  const cartContext = useContext(CartContext);
  const cart = useRef();

  function openCart() {
    cart.current.showModal();
  }

  return (
    <>
      <Cart ref={cart} />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <button className="text-button" onClick={openCart}>
            Cart({cartContext.itemsQuantity})
          </button>
        </nav>
      </header>
    </>
  );
}
