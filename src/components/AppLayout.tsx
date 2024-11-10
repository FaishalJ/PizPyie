import styles from "./styles/appLayout.module.scss";
import { Outlet, useNavigate, useMatch } from "react-router-dom";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

import {updateShowLogout} from "../redux/loginSlice";
import { useDispatch } from "react-redux";

export default function AppLayout() {
  const dispatch = useDispatch();
  
  const path = useMatch("/")
  const navigate = useNavigate();
  useEffect(function() {
    if (path?.pathname === "/") {
      navigate("/home")
    }
  }, [])

  return (
    <>
      <Navigation />
      <main className={styles.main} onClick={()=>dispatch(updateShowLogout(false))}>
        <Outlet />
        <Toaster />
      </main>
    </>
  )
}