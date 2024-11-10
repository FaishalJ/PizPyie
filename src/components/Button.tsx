import styles from "./styles/button.module.scss";

interface IButtonProps {
  children: React.ReactNode;
  btnType?: "absolute" | "clear" | "guest" | "disable" | "remove" | "cancel";
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

export default function Button({children, onClick, btnType, type, disabled}: IButtonProps) {
  let style = "";
  if(btnType === "absolute") {
    style = styles.absolute;
  } else if(btnType === "clear") {
    style = styles.clear;
  } else if(btnType === "guest"){
    style = styles.guest;
  } else if(btnType === "disable") {
    style = styles.disable;
  } else if(btnType === "remove") {
    style = styles.remove;
  } else if(btnType === "cancel") {
    style = styles.cancel;
  } else {
    style = "";
  }
  
  return (
    <button onClick={onClick} type={type} className={`${styles.btn} ${style}`} disabled={disabled}>
      {children}
    </button>
  )
}