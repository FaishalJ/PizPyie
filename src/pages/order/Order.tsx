import styles from "../_pageStyles/order.module.scss";

import OrderForm from "./OrderForm";
import OrderSummery from "./OrderSummery";

export default function Order() {

  return (
    <div className={styles.order}>
      <OrderSummery />
      <OrderForm />
    </div>
  )
}