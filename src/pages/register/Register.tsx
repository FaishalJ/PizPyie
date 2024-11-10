import styles from "../_pageStyles/login.module.scss";
import { redirect, Navigate, useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";

export default function Register() {
  const navigate = useNavigate();
  const minimumLength = 8;
  return (
    <div className={styles.login}>
      <form className={styles.login_form}>
        <p className={styles.login_title}>Register</p>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Name"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="pass"
            name="password"
            minLength={minimumLength}
            placeholder="password"
            required
          />
        </div>

        <Button>REGISTER</Button>
        {/* <Button>GUEST USER</Button> */}

        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
