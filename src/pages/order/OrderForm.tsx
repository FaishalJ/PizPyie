import styles from "../_pageStyles/orderForm.module.scss";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../components/Button";

import { updateAddress, addressData } from "../../redux/addressSlice";
import {
  clearCart,
  resetCartItem,
  resetTotalAmount,
  deliveryFee,
  totalAmount,
  cartData,
} from "../../redux/cartSlice";
import {
  updateOrderHistryItem,
  updateOrderHistry,
} from "../../redux/orderHistrySlice";
import { generateRandomID, generateDate } from "../../lib/service";
import { IClientInput } from "../../lib/types";
import { login } from "../../redux/loginSlice";

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const address = useSelector(addressData);
  const date = generateDate().split(",")[0];
  const total = useSelector(totalAmount);
  const deliver = useSelector(deliveryFee);
  const cartList = useSelector(cartData);
  const { name: loginName, email } = useSelector(login);

  function handleCancelOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return navigate("/menu");
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IClientInput>();
  const onSubmit: SubmitHandler<IClientInput> = (data) => {
    setIsSubmitting(true);

    setTimeout(function () {
      console.log(data);
      const clientId = generateRandomID();
      dispatch(
        updateOrderHistryItem({ ...data, orderId: clientId, cart: cartList })
      );
      dispatch(updateOrderHistry(clientId));
      setIsSubmitting(false);
      dispatch(updateAddress({ ...address, suburb: data.address }));
      dispatch(clearCart());
      dispatch(resetCartItem());
      dispatch(resetTotalAmount());
      return navigate(`/newOrder/${clientId}`);
    }, 1000);
  };

  return (
    <form className={styles.order_form} onSubmit={handleSubmit(onSubmit)}>
      <h4>Confirm your delivery address/details</h4>

      <div>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="full name"
          defaultValue={loginName}
          {...register("name", { required: true })}
        />
        {errors.name && <small>This field is required</small>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <small>Please input your valid email</small>}
      </div>
      <div>
        <label>Phone number</label>
        <input
          type="tel"
          id="phone"
          placeholder="phone number"
          {...register("phone", { required: true })}
        />
        {errors.phone && <small>This field is required</small>}
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          placeholder="address"
          defaultValue={address.suburb}
          {...register("address", { required: true })}
        />
        {errors.address && <small>This field is required</small>}
      </div>
      <div className={styles.order_form__buttons}>
        <Button type="submit">
          {isSubmitting ? "SUBMITTING..." : "ORDER NOW"}
        </Button>
        <Button onClick={handleCancelOrder} btnType="cancel">
          {navigation.state === "loading" ? "CANCELING..." : "CANCEL"}
        </Button>
      </div>
      <input type="hidden" id="date" value={date} {...register("date")} />
      <input
        type="hidden"
        id="deliver"
        value={+deliver}
        {...register("deliver")}
      />
      <input type="hidden" id="total" value={+total} {...register("total")} />
    </form>
  );
}
