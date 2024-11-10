import styles from "../_pageStyles/orderHistory.module.scss";
import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";

import OrderHistoryList from "./OrderHistoryList";
import TableHead from "../../components/TableHead";
import EmptyCart from "../../components/EmptyCart";
import Spinner from "../../components/Spinner";

import { orderHistry } from "../../redux/orderHistrySlice";
import {isLogIn, login} from "../../redux/loginSlice";

export default function OrderHistory() {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(isLogIn);
  const loginDetails = useSelector(login);
  const orderBucket = useSelector(orderHistry);

  const myOrders = orderBucket.filter((order) => order.email === loginDetails.email);

  return (
    <>
      {navigation.state === "loading" ? <Spinner /> :
        <div className={styles.history}>
          {myOrders.length > 0 ? <><h2>My Orders</h2>

            <table>
              <TableHead>
                <tr>
                  <th scope="col">Order_ID</th>
                  <th scope="col">Order_date</th>
                  <th scope="col">Total_price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Details</th>
                </tr>
              </TableHead>
              <tbody>
                {myOrders.map(order => (
                  <OrderHistoryList key={order.orderId} order={order} />
                ))}
              </tbody>
            </table></> : <EmptyCart message="Oops!! You have no pending orders. Click below ⬇️ to start ordering pizzas 😇" />}
        </div>}
    </>
  )
}