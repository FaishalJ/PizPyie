import { Link } from "react-router-dom";

import { IClientDetails } from "../../lib/types";
import { formatCurrencies } from "../../lib/service";

interface IOrderHistoryProps {
  order: IClientDetails;
}

export default function OrderHistoryList({ order }: IOrderHistoryProps) {

  return (
    <tr>
      <td>{`#${order.orderId}`}</td>
      <td>{order.date}</td>
      <td>{formatCurrencies(order.total)}</td>
      <td>Pending..</td>
      <td><Link to={`/newOrder/${order.orderId}`}>View</Link></td>
    </tr>
  )
}