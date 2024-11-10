import styles from "./styles/introSpinner.module.scss";

export default function IntroSpinner() {
  return (
    <div className={`${styles.spinner} flex justify-center items-center`}>
      <img src="../pizza.svg" alt="pizza vector illustration" />
    </div>
  )
}