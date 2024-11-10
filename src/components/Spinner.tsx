import styles from "./styles/spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner}></div>
    </div>
  )
}