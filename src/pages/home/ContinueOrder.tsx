import styles from "../_pageStyles/continueOrder.module.scss";
import { useNavigate, useNavigation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/Button";

import {
  updateIsChangingAddress,
  addressData,
  updateContinueOrder,
} from "../../redux/addressSlice";

export default function ContinueOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector(addressData);
  const navigation = useNavigation();

  function HandleContinueOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(updateIsChangingAddress(false));
    dispatch(updateContinueOrder(true));
    return navigate("/menu");
  }

  function handleChangeOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(updateIsChangingAddress(true));
  }

  return (
    <form className={styles.form}>
      <p>
        {" "}
        Delivery to:
        <strong>{address.suburb}</strong>
      </p>
      <Button onClick={handleChangeOrder}>Change address</Button>
      <Button onClick={HandleContinueOrder}>
        {navigation.state === "loading" ? "Loading..." : "Continue order"}
      </Button>
    </form>
  );
}
