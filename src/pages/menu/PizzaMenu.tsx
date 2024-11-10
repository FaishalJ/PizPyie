// import styles from "./styles/pizzaMenu.module.scss";
import { useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useDispatch } from 'react-redux';

import PizzaItem from "../../components/PizzaItem";
import Spinner from "../../components/Spinner";
import { add } from '../../redux/pizzaMenuSlice';

import { getPizzaMenu } from "../../lib/service";
import { IPizza } from "../../lib/types";

export default function PizzaMenu() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useLoaderData() as IPizza[];

  useEffect(function() {
    dispatch(add(user))
  }, []);

  return (
    <>
    { navigation?.state === "loading" ? <Spinner/> : <PizzaItem /> }
    </>
  );
}

export async function loadPizzaMenu() {
  const pizzaMenu = await getPizzaMenu();
  return pizzaMenu;
}