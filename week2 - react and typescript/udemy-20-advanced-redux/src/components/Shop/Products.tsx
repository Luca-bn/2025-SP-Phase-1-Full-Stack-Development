import { CartSliceStateItem } from '../../stores/cart-slice';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [{
  id: "1",
  name: "name1",
  unitPrice: 6,
  description: "This is a first product - amazing!",
},
{
  id: "2",
  name: "name2",
  unitPrice: 8,
  description: "This is a second product - amazing!",
}, {
  id: "3",
  name: "name3",
  unitPrice: 12,
  description: "This is a third product - amazing!",
}];

const Products = () => {

  const products: (Omit<CartSliceStateItem, "quantity"> & { description: string })[] = PRODUCTS;

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(item => <ProductItem
          key={item.id}
          item={item}
        />)}
      </ul>
    </section>
  );
};

export default Products;
