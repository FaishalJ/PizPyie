import styles from "./styles/navigation.module.scss";
import { HiArrowRightOnRectangle, HiOutlineShoppingBag } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from "./Logo";
import NavForm from "./NavForm";
import NavCart from "./NavCart";
import NavProfile from "./NavProfile";

import { updateIsLogin, updateIsGuest, isLogIn, updateShowLogout, showLogout, logout } from "../redux/loginSlice";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isLogIn);
  const isShowLogout = useSelector(showLogout);


  function HandleShowOrders(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(updateShowLogout(false));
    navigate("/history")
  }
  function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(logout());
    dispatch(updateShowLogout(false));
    dispatch(updateIsGuest(false));
    dispatch(updateIsLogin());
    navigate("/menu")
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_div}>
        <Logo type="white" />
        <NavForm />

        <div className={styles.nav_profile}>

          <NavCart />
          {
            isLoggedIn ? <NavProfile /> :
              <NavLink to="/login" className={`${styles.nav_link} ${styles.nav_link_register}`}>Login</NavLink>
          }
        </div>

        <div className={`${styles.nav_pop__up} ${!isShowLogout ? styles.show : ""}`}>
          <button onClick={HandleShowOrders}><span>Orders</span> <HiOutlineShoppingBag /></button>
          <button onClick={handleLogout}><span>Logout</span> <HiArrowRightOnRectangle /></button>
        </div>
      </div>
    </nav>
  );
}