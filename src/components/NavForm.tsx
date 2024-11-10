import styles from "./styles/navForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { HiMagnifyingGlass, HiMiniArrowLeft } from "react-icons/hi2";

import Button from "./Button";

import { updateSearchText, searchText } from "../redux/pizzaMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

export default function NavForm() {
  const inpt = useRef<null | HTMLInputElement>(null)
  const path = useMatch("/menu/search");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const text = useSelector(searchText);

  function handleBack(e: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault()
    navigate("/menu");
  }
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (inpt.current) {
      inpt.current.value = "";
    }

    navigate("/menu/search");
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <input type="text" placeholder="Search for pizza" ref={inpt} defaultValue={text} onChange={(e)=>dispatch(updateSearchText(e.target.value))}/>
      {
        path?.pathname === "/menu/search" ?
          <Button type="button" onClick={handleBack}><HiMiniArrowLeft /></Button> :
          <Button type="submit"><HiMagnifyingGlass /></Button>
      }
    </form>
  );
}