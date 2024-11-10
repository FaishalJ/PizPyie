import styles from "../_pageStyles/cartSummery.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/Button";

import { cartTotalAmount, setIsDelivering, isDelivering, deliveryFee, totalAmount, calculateDeliveryFee, calculateTotalAmount } from "../../redux/cartSlice";
import { formatCurrencies } from "../../lib/service";
import {isGuest, isLogIn} from "../../redux/loginSlice";

export default function CartSummery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subTotal = useSelector(cartTotalAmount);
  const deliveryCharge = useSelector(deliveryFee);
  const delivery = useSelector(isDelivering);
  const total = useSelector(totalAmount);
  const isGuestLogin = useSelector(isGuest);
  const isLoggedIn = useSelector(isLogIn);

  useEffect(function() {
    dispatch(calculateDeliveryFee())
    dispatch(calculateTotalAmount())
  }, [delivery])
  
  function handleOnDelivery() {
    dispatch(setIsDelivering())
  }

  function handleChekout() {
    return isGuestLogin || isLoggedIn ? navigate("/order") : navigate("/login");
  }

  return (
    <div className={styles.summery}>
      <h5>Basket summery</h5>

      <div>
        <p>Subtotal</p>
        <p>{formatCurrencies(subTotal)}</p>
      </div>
      <div>
        <p>Delivery Fee (3%)</p>
        <p>{formatCurrencies(deliveryCharge)}</p>
      </div>
      <div className={styles.summery_total}>
        <p>Total Amount</p>
        <p>{formatCurrencies(total)}</p>
      </div>

      <div className={styles.summery_radio}>
        <div>
          <input type="radio" id="delivery" name="drone" value="delivery" defaultChecked={delivery} onChange={()=>handleOnDelivery()} />
          <label htmlFor="delivery">Delivery</label>
        </div>

        <div className={styles.options_option}>
          <input type="radio" id="pickup" name="drone" value="pickup" onChange={()=>handleOnDelivery()} />
          <label htmlFor="pickup">Pickup</label>
        </div>
      </div>

      <Button onClick={handleChekout}>Checkout</Button>
    </div>
  )
}