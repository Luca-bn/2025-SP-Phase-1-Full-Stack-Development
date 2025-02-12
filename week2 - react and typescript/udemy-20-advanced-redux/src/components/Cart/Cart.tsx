import { useSelectorCart, useSelectorUi } from '../../stores';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {

  const cartState = useSelectorCart();
  const uiState = useSelectorUi();

  if (!uiState.showCart)
    return <></>;

  if (cartState.items.length === 0)
    return <Card className={classes.cart}>
      <h2>Cart is empty!</h2>
    </Card>

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {
          cartState.items.map(item => <CartItem
            key={item.id}
            item={{ id: item.id, name: item.name, quantity: item.quantity, unitPrice: item.unitPrice }}
          />)
        }
      </ul>
    </Card>
  );
};

export default Cart;
