import styles from "./styles/pageNotFound.module.scss";
import { useRouteError, Link } from "react-router-dom";

interface IError {
  statusText: string;
  data: string;
}

export default function ErrorPage() {
  const error = useRouteError() as IError;

  return (
    <div className={styles.error}>
      <div><img src="./oops.svg" /></div>
      <p>Sorry, the page that you are looking for doesn't exist!.</p>
      <p>
        {error?.data || error?.statusText}
      </p>
      <Link to="/menu">Go to Home</Link>
    </div>
  );
}