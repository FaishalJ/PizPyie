import styles from "../_pageStyles/home.module.scss";
import { useSelector } from "react-redux";

import ContinueOrder from "./ContinueOrder";
import AddressForm from "./AddressForm";

import { addressData, isChangingAddress } from "../../redux/addressSlice";

export default function Home() {
  const address = useSelector(addressData);
  const isAddressChange = useSelector(isChangingAddress);

  const shouldShowAddressForm =
    !address.suburb || (address.suburb && isAddressChange);
  const shouldShowContinueOrder = address.suburb && !isAddressChange;

  return (
    <div className={styles.home}>
      {shouldShowAddressForm && <AddressForm />}
      {shouldShowContinueOrder && <ContinueOrder />}
    </div>
  );
}
