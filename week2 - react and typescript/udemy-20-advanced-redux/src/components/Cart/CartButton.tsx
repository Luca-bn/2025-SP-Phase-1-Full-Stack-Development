import { useDispatch } from 'react-redux';
import { useSelectorCart, UiActions } from '../../stores';
import classes from './CartButton.module.css';

const CartButton = () => {

  const cartState = useSelectorCart();
  const dispatch = useDispatch();

  return (
    <button className={classes.button} onClick={() => dispatch(UiActions.toggleCart())}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartState.totalQuantity}</span>
    </button>
  );
};

export default CartButton;
