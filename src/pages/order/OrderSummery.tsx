import styles from "../_pageStyles/orderSummery.module.scss";
import { useDispatch, useSelector } from "react-redux";

import TableHead from "../../components/TableHead";
import OrderSummeryList from "./OrderSummeryList";

import { cartData } from "../../redux/cartSlice";

export default function OrderSummery() {
  const orderCart = useSelector(cartData);

  return (
    <div className={styles.order_summery}>
      <h4>Order Summery</h4>

      <table>
        <TableHead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">QTY</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Totoal</th>
          </tr>
        </TableHead>
        <tbody>
          {orderCart.map(pizza => <OrderSummeryList pizza={pizza} key={pizza.id} />)}
        </tbody>
      </table>
    </div>
  )
}