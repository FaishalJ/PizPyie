import styles from "./styles/sideBar.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { menuData } from "../redux/pizzaMenuSlice";
import { findMaxNumber } from "../lib/service";
import { updateAlphabetSort, updateIngredientSort, updateViewSort, updatePriceBar, alphabetSort, ingredientSort, pricebar } from "../redux/sortSlice";

const sort = ["a-z", "z-a", "price"];
const view = ["Grid", "List"];

export default function SideBar() {
  const dispatch = useDispatch();
  const menu = useSelector(menuData);
  const maxValue = findMaxNumber(menu);
  const min = 1

  const priceSelect = useSelector(pricebar);
  const ingredients = menu.flatMap(el => el.ingredients);
  const ing = Array.from(new Set(ingredients));

  return (
    <aside className={styles.options}>
      <div className={styles.options_option}>
        <label htmlFor="ingredients">Sort By</label>
        <select name="alphabet" id="alphabet-sort" onChange={(e) => dispatch(updateAlphabetSort(e.target.value))}>
          {Array.from({ length: sort.length }, (_, i) => <option value={sort[i]} key={i}>{sort[i]}</option>)}
        </select>
      </div>

      <div className={styles.options_option}>
        <label htmlFor="ingredients">Filter by Ingredients</label>
        <select name="pets" id="pet-select" onChange={(e) => dispatch(updateIngredientSort(e.target.value))}>
          <option value="">all</option>
          {Array.from({ length: ing.length }, (_, i) => <option value={ing[i]} key={i}>{ing[i]}</option>)}
        </select>
      </div>

      <div className={styles.options_option}>
        <label htmlFor="ingredients">View</label>
        <select name="pets" id="pet-select" onChange={(e) => dispatch(updateViewSort(e.target.value))}>
          {Array.from({ length: view.length }, (_, i) => <option value={view[i]} key={i}>{view[i]}</option >)}
        </select>
      </div>

      <div className={styles.options_option}>
        <div className={styles.options_option__price_label}>
          <label className={styles.options_option__label} htmlFor="cowbell">Filter by Price</label>
          <p className={styles.options_option__price}>${priceSelect}</p>
        </div>
        <input type="range" id="cowbell" name="cowbell" min={min} max={maxValue} value={priceSelect} onChange={(e) => dispatch(updatePriceBar(+e.target.value))} />
      </div>

      <p>Developed by <a href="https://faishaljaffar.netlify.app/" target="_blank">FAISHAL JAFFAR</a></p>
    </aside>
  )
}