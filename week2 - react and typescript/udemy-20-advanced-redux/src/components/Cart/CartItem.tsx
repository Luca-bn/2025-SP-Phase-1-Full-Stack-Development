import { useDispatch } from 'react-redux';
import { CartActions } from '../../stores';
import { CartSliceStateItem } from '../../stores/cart-slice';
import classes from './CartItem.module.css';

const CartItem = ({ item }: { item: CartSliceStateItem }) => {
  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <header>
        <h3>{item.name}</h3>
        <div className={classes.price}>
          ${(item.unitPrice * item.quantity).toFixed(2)}{' '}
          <span className={classes.itemprice}>(${item.unitPrice.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => dispatch(CartActions.removeItemFromCart(item))}>-</button>
          <button onClick={() => dispatch(CartActions.addItemToCart(item))}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
