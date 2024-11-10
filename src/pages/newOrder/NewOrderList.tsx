import styles from "../_pageStyles/orderlist.module.scss";
import { ICartElement } from "../../lib/types";

import { formatCurrencies } from "../../lib/service";

interface INewOrderProps {
  pizza: ICartElement;
}

export default function NewOrderList({ pizza }: INewOrderProps) {
  return (
    <tr>
      <td scope="row" className={styles.order_List}>
        <div>
          <img src={pizza.imageUrl} alt={pizza.name} />
          <p>{pizza.name}</p>
        </div>
      </td>
      <td>{pizza.count}</td>
      <td>{formatCurrencies(pizza.unitPrice)}</td>
    </tr>
  )
}