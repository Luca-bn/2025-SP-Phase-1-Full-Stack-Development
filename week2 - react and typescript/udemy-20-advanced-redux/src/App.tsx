import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelectorCart, useSelectorUi } from './stores';
import { fetchCart, putCart } from './stores/cart-actions';

let init = true;
function App() {
  const ui = useSelectorUi();
  const cart = useSelectorCart();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart() as any);
  }, []);

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }
    dispatch(putCart(cart) as any);
  }, [cart]);

  return (
    <>
      {ui.notification && <Notification
        status={ui.notification.status}
        title={ui.notification.title}
        message={ui.notification.message}
      />}
      < Layout >
        <Cart />
        < Products />
      </Layout >
    </>
  );
}

export default App;
