import styles from "./styles/navigation.module.scss";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";

import { login, showLogout, updateShowLogout } from "../redux/loginSlice";

export default function NavProfile() {
  const dispatch = useDispatch();
  const { name } = useSelector(login);
  const isShowLogout = useSelector(showLogout);
  
  function HandleShowProfile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(updateShowLogout(!isShowLogout));
  }
  
  function HandleShowProfile2(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div className={styles.nav_image} onMouseOver={HandleShowProfile2}>
      <Button onClick={HandleShowProfile}>
        <img src="https://i.pravatar.cc/100" alt="profile picture" />
        {/* <img src="./Jonel.png" alt="profile picture" /> */}
        <p>Hi, {name}!</p>
      </Button>
    </div>
  )
}