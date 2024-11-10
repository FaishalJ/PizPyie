import styles from "../_pageStyles/cart.module.scss";
import { useNavigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

import CartSummery from "./CartSummery";
import Spinner from "../../components/Spinner";
import CartList from "./CartList";
import EmptyCart from "../../components/EmptyCart";

import { cartData } from "../../redux/cartSlice";

export default function Cart() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const cart = useSelector(cartData);

  return (
    <>
      {
        navigation.state === "loading" ? <Spinner /> :
          (cart.length === 0 ?
            <EmptyCart message="Oops!! Your cart is still empty. Click below ⬇️ to start adding some pizzas 😇"/> :
            <div className={styles.cart}>
              <div className={styles.cart_header}>
                <h4>My Pizza Cart ({cart.length})</h4>
                <button onClick={() => navigate("/menu")}>X</button>
              </div>

              <section className={styles.cart_section}>
                <ul className={styles.cart_item}>
                  {cart.map(pizza => <CartList pizza={pizza} key={pizza.id} />)}
                </ul>
                <CartSummery />
              </section>
            </div>)
      }
    </>
  )
}