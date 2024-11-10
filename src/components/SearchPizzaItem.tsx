import styles from "./styles/pizzaItem.module.scss";
import { useSelector } from "react-redux";

import PizzaList from "./PizzaList";
import EmptyCart from "./EmptyCart";

import { menuData, searchText } from "../redux/pizzaMenuSlice";
import { viewSort, alphabetSort, ingredientSort, pricebar } from "../redux/sortSlice";

export default function PizzaItem() {
  const menu = useSelector(menuData);
  const text = useSelector(searchText);
  const view = useSelector(viewSort);
  const sortItem = useSelector(alphabetSort);
  const filterIngredient = useSelector(ingredientSort);
  const filterPrice = useSelector(pricebar);

  const pizzas = menu.filter(pizza => pizza.name.toLowerCase().includes(text.toLowerCase()));
  let currmenu = pizzas;

  // filter by ingredient
  if (filterIngredient === "" || filterIngredient === "all") {
    currmenu = pizzas;
  } else {
    currmenu = pizzas.filter(el => el.ingredients.includes(filterIngredient));
  }

  // filter by price
  if (filterPrice > 0) {
    currmenu = currmenu.filter(el => el.unitPrice <= filterPrice);
  }

  if (!sortItem) {
    currmenu = menu;
  } else {
    currmenu = currmenu.sort((a, b) => {
      if (sortItem === "a-z") {
        return a.name.localeCompare(b.name);
      } else if (sortItem === "z-a") {
        return b.name.localeCompare(a.name);
      } else {
        return a.unitPrice - b.unitPrice;
      }
    });
  }
  const noPizzas = currmenu.some(pizza => pizza.name.toLowerCase().includes(text.toLowerCase()));

  return (
    <>
      {(text.length < 2) || !noPizzas ? <EmptyCart message={`Oops!, looks like ${text} 🍕 is not ready yet. Please visit our menu page for ready meals 🧑‍🍳.`} /> :
        <ul className={`${view === "Grid" ? styles.list_el : styles.list_view}`}>
          {currmenu.map(pizza => <PizzaList key={pizza.id} pizza={pizza} />)}
        </ul>}
    </>
  )
}