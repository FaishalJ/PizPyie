import styles from "./styles/pizzaItem.module.scss";
import { useSelector } from "react-redux";

import PizzaList from "./PizzaList";

import { menuData } from "../redux/pizzaMenuSlice";
import { viewSort, alphabetSort, ingredientSort, pricebar } from "../redux/sortSlice";

export default function PizzaItem() {
  const menu = useSelector(menuData);
  const view = useSelector(viewSort);
  const sortItem = useSelector(alphabetSort);
  const filterIngredient = useSelector(ingredientSort);
  const filterPrice = useSelector(pricebar);
  
  let currmenu = menu;

  // filter by ingredient
  if (filterIngredient === "" || filterIngredient === "all") {
    currmenu = menu;
  } else {
    currmenu = menu.filter(el => el.ingredients.includes(filterIngredient));
  }

  // filter by price
  if (filterPrice > 0) {
    currmenu = currmenu.filter(el => el.unitPrice <= filterPrice);
  }

  if(!sortItem) {
    currmenu = menu;
  } else {
    currmenu = currmenu.sort((a, b) => {
      if(sortItem === "a-z") {
        return a.name.localeCompare(b.name);
      } else if(sortItem === "z-a") {
        return b.name.localeCompare(a.name);
      } else {
        return a.unitPrice - b.unitPrice;
      }
    });
  }

  return (
    <ul className={`${view === "Grid" ? styles.list_el : styles.list_view}`}>
      {currmenu.map(pizza => <PizzaList key={pizza.id} pizza={pizza} />)}
    </ul>
  )
}