// import styles from "./styles/orderSummery.module.scss";
import { ICartElement } from "../../lib/types";

import { formatCurrencies } from "../../lib/service";

interface OrderSummeryListProps {
  pizza: ICartElement;
}

export default function OrderSummeryList({ pizza }: OrderSummeryListProps) {
  return (
    <tr>
      <td scope="row">{pizza.name}</td>
      <td>{pizza.count}</td>
      <td>{formatCurrencies(pizza.unitPrice)}</td>
      <td>{formatCurrencies(pizza.totalPrice)}</td>
    </tr>
  )
}