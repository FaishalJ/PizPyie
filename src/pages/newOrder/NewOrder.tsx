import styles from "../_pageStyles/newOrder.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Logo from "../../components/Logo";
import NewOrderList from "./NewOrderList";
import TableHead from "../../components/TableHead";
import OrderDetails from "./OrderDetails";

import { formatCurrencies } from "../../lib/service";
import { orderHistry } from "../../redux/orderHistrySlice";

export default function NewOrder() {
  const clientHistory = useSelector(orderHistry);
  let { orderId } = useParams();
  const [client] = clientHistory.filter((word) => word.orderId === orderId);

  return (
    <div className={styles.order}>
      <div className={styles.order_logo}>
        <Logo type="main" />
      </div>

      <div className={styles.order_header}>
        <h2>Your Order Confirmed!</h2>
        <p>Hi {client.name},</p>
        <p>Your order has been confirmed and will be ready soon</p>
      </div>

      <div className={styles.order_summery}>
        <div>
          <OrderDetails title="Order ID" detail={!orderId ? "..." : `#${orderId}`} />
        </div>
        <div>
          <OrderDetails title="Email" detail={client.email} />
        </div>
        <div>
          <OrderDetails title="Order Date" detail={client.date} />
        </div>
        <div>
          <OrderDetails title="Address" detail={client.address} />
        </div>
        <div>
          <OrderDetails title="Phone" detail={client.phone} />
        </div>
      </div>

      <div className={styles.order_item}>
        <table>
          <TableHead>
            <tr>
              <th scope="col">Items</th>
              <th scope="col">QTY</th>
              <th scope="col">Unit Price</th>
            </tr>
          </TableHead>
          <tbody>
            {client.cart.map(pizza => <NewOrderList pizza={pizza} key={pizza.id} />)}
          </tbody>
        </table>
      </div>

      <div className={styles.order_sub_total}>
        <div>
          <p>Subtotal</p>
          <p>{formatCurrencies(client.total)}</p>
        </div>
        <div>
          <p>Delivery fee</p>
          <p>{formatCurrencies(client.deliver)}</p>
        </div>
      </div>

      <div className={styles.order_total}>
        <p>Total</p>
        <p>{formatCurrencies(client.total)}</p>
      </div>

      <div className={styles.order_text}>
        <p>Your order is being prepared. We appreciate your support, and hope you enjoy your Pizza.</p>

        <p>Thank you!</p>
        <p>PizzPyie</p>
      </div>

      <div className={styles.order_footer}>
        <p>Questions? visit <a href=" https://faishaljaffar.netlify.app/" target="_blank">Customer Support</a></p>
        <span>&copy; Faishal Jaffar</span>
      </div>
    </div>
  )
}