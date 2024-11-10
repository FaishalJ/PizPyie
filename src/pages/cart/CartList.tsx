import styles from "../_pageStyles/cartList.module.scss";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";

import { orderCountIncrease, orderCountDecrease, calculateCartTotalAmount, calculateDeliveryFee, calculateTotalAmount } from "../../redux/cartSlice";
import { ICartElement } from "../../lib/types";
import { formatCurrencies } from "../../lib/service";

interface CartListProps {
  pizza: ICartElement;
}

export default function CartList({ pizza }: CartListProps) {
  const dispatch = useDispatch();

  function handleIcrement(id: number) {
    dispatch(orderCountIncrease(id));
    dispatch(calculateCartTotalAmount());
    dispatch(calculateDeliveryFee());
    dispatch(calculateTotalAmount());
  }
  function handleDecreament(id: number) {
    dispatch(orderCountDecrease(id));
    dispatch(calculateCartTotalAmount());
    dispatch(calculateDeliveryFee());
    dispatch(calculateTotalAmount());
  }

  return (
    <li className={styles.list}>
      <div className={styles.list_item}>
        <img src={pizza.imageUrl} alt="cooking" />

        <div className={styles.list_details}>
          <p>{pizza.name}</p>
          <p>{formatCurrencies(pizza.totalPrice)}</p>
        </div>
      </div>

      <div className={styles.list_btns}>
        <Button onClick={() => handleDecreament(pizza.id)}><HiOutlineMinusSmall /></Button>
        <span>{pizza.count}</span>
        <Button onClick={() => handleIcrement(pizza.id)}><HiOutlinePlusSmall /></Button>
      </div>
    </li>
  )
}