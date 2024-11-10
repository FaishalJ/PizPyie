import styles from "./styles/navigation.module.scss";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { cartData } from "../redux/cartSlice";

export default function Navcart() {
  const cart = useSelector(cartData)

  return (
    <Link to="/cart" className={`${styles.nav_link} ${styles.nav_link_cart}`}>
      {cart.length > 0 ? <span>{cart.length}</span> : null}
      <HiOutlineShoppingCart />
    </Link>
  )
}