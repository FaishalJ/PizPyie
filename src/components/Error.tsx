import styles from "./styles/error.module.scss";

interface IErrorProps {
  children: React.ReactNode;
}
export default function Error({children} : IErrorProps) {
  return(
    <div className={styles.error}>
      {children}
    </div>
  )
}