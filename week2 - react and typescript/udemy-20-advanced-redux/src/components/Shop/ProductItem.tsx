import { useDispatch } from 'react-redux';
import classes from './ProductItem.module.css';
import { CartActions } from "../../stores/index"
import { CartSliceStateItem } from '../../stores/cart-slice';
import Card from '../UI/Card';


const ProductItem = ({ item }: { item: Omit<CartSliceStateItem, "quantity"> & { description: string } }) => {
  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{item.name}</h3>
          <div className={classes.price}>${item.unitPrice.toFixed(2)}</div>
        </header>
        <p>{item.description}</p>
        <div className={classes.actions}>
          <button onClick={() => dispatch(CartActions.addItemToCart(
            {
              id: item.id,
              name: item.name,
              unitPrice: item.unitPrice,
              quantity: 1
            }
          ))}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
