import styles from "./styles/pizzaList.module.scss";
import { IPizza, ICartElement } from "../lib/types";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import toast from 'react-hot-toast';

import Button from "./Button";

import { viewSort } from "../redux/sortSlice";
import { updateCartItem, updateCart, cartData, calculateCartTotalAmount, calculateDeliveryFee, calculateTotalAmount } from "../redux/cartSlice";
import { formatCurrencies } from "../lib/service";

interface PizzaListProps {
  pizza: IPizza;
}

export default function PizzaList({ pizza }: PizzaListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const view = useSelector(viewSort);
  const cart = useSelector(cartData);

  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  const newcart = { id, imageUrl, ingredients, name, soldOut, unitPrice, count: 1, totalPrice: unitPrice } as ICartElement;

  function handleAddTocart(id: number) {
    setIsAdding(true);
    if (id === pizza.id) {
      setTimeout(function() {
        dispatch(updateCartItem(newcart));
        dispatch(updateCart(pizza.id));
        dispatch(calculateCartTotalAmount());
        dispatch(calculateDeliveryFee());
        dispatch(calculateTotalAmount());
        setIsAdding(false);
        if (cart.some(item => item.id === pizza.id)) {
          toast.success('Successfully removed from cart');
        } else {
          toast.success('Successfully added to cart');
        }
      }, 1000)
    }
  }

  return (
    <li className={`${view === "Grid" ? styles.pizza_item : styles.pizza_listview}`}>
      {pizza.soldOut && <span>Sold out</span>}
      <figure>
        <img src={pizza.imageUrl} alt={pizza.name} />

        <figcaption>{pizza.name}</figcaption>
      </figure>

      <p>{formatCurrencies(pizza.unitPrice)}</p>
      {cart.some(item => item.id === pizza.id) ?
        <Button disabled={pizza.soldOut || isAdding} btnType={(pizza.soldOut || isAdding) ? "disable" : "remove"} onClick={() => handleAddTocart(pizza.id)}>REMOVE</Button> :
        <Button disabled={pizza.soldOut || isAdding} btnType={(pizza.soldOut || isAdding) ? "disable" : undefined} onClick={() => handleAddTocart(pizza.id)}>ADD TO CART</Button>}
    </li>
  )
}