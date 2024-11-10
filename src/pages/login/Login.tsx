import styles from "../_pageStyles/login.module.scss";
import { useNavigate, Link, useNavigation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";

import { ILoginInput } from "../../lib/types";
import { updateLogin, updateIsLogin, updateIsGuest } from "../../redux/loginSlice";
import Spinner from "../../components/Spinner";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ILoginInput>();
  const onSubmit: SubmitHandler<ILoginInput> = data => {
    setIsSubmitting(true);
    setTimeout(function() {
      dispatch(updateLogin(data))
      dispatch(updateIsLogin())
      dispatch(updateIsGuest(false))
      setIsSubmitting(false);
      return navigate(-1);
    }, 1000)
  }

  function handleGuest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dispatch(updateIsGuest(true))
    navigate(-1)
  }

  return (
    <div className={styles.login}>
     { navigation.state === "loading" ? <Spinner /> : <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.login_title}>Login to keep track of your orders</p>

        <div>
          <label>User name</label>
          <input type="text" id="userName" placeholder="User name" {...register("name", { required: true })} />
          {errors.name && <small>Please input your name.</small>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" id="email" placeholder="Email" {...register("email", { required: true })} />
          {errors.email && <small>Please input your valid email</small>}
        </div>

        <Button type="submit">{isSubmitting ? "Logging..." : "LOGIN"}</Button>
        <Button btnType="guest" onClick={handleGuest}>GUEST USER</Button>

        <p>Not a member yet? <Link to="/login">Register</Link></p>
      </form>}
    </div>
  )
}