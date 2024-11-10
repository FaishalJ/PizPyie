import styles from "./styles/logo.module.scss";
import { NavLink } from "react-router-dom";

interface ILogoProps {
  type: "white" | "main";
}
export default function Logo({type}: ILogoProps) {
  return <NavLink to="/home" className={`${styles.logo} ${type === "white" ? styles.white : styles.main}`}>pizzPyie</NavLink>
}