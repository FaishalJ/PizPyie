import styles from "../_pageStyles/addressForm.module.scss";
import { useNavigate, useNavigation } from "react-router-dom";
import { HiArrowUpRight, HiBuildingLibrary } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/Button";

import { useGeolocation } from "../../hooks/useGeolocation";
import { useReverseGeo } from "../../hooks/useReverseGeo";
import {
  updateAddress,
  addressData,
  updateIsChangingAddress,
  updateContinueOrder,
} from "../../redux/addressSlice";
import { ILocation } from "../../lib/types";

export default function AddressForm() {
  const { isLoading, position, error, getPosition } = useGeolocation();
  const {
    isLoading: isLoadingLocation,
    error: locationError,
    getLocation,
  } = useReverseGeo();

  const address = useSelector(addressData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();

  async function handleGetLocation(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    getPosition();
    if (!position) return;
    const location = (await getLocation(
      position.lat,
      position.lng
    )) as ILocation;
    const { country, county, formatted, suburb, city, street } = location;
    const local: ILocation = {
      country,
      county,
      formatted,
      suburb,
      city,
      street,
    };
    dispatch(updateAddress(local));
    dispatch(updateIsChangingAddress(true));
  }

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch(updateAddress({ ...address, suburb: e.target.value }));
    dispatch(updateIsChangingAddress(true));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/menu");
    setTimeout(function () {
      dispatch(updateIsChangingAddress(false));
    }, 1500);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form_delivery}>
        <HiBuildingLibrary />
        <p> Delivery</p>
      </div>
      <h4>TELL US WHERE YOU ARE</h4>

      <div className={styles.input_label}>
        <label>Enter your address to set local deals and pricing.</label>
        <div className={styles.input_cont}>
          <input
            className={isLoadingLocation ? styles.load_input : ""}
            type="text"
            placeholder="Enter your street address"
            name="address"
            disabled={isLoading || isLoadingLocation}
            value={address.suburb}
            onChange={handleOnchange}
          />

          {address.suburb && (
            <Button btnType="absolute">
              {navigation.state === "loading" ? "Loading..." : "Order Now"}
            </Button>
          )}
        </div>
      </div>

      <Button btnType="clear" onClick={handleGetLocation}>
        <HiArrowUpRight /> Or use my current location
      </Button>
      {(error || locationError) && (
        <p className={styles.form_text}>
          {error || locationError}.{" "}
          {error
            ? "Please enable access to your location"
            : "Change your location address"}
        </p>
      )}
    </form>
  );
}
