import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { ICartElement } from '../lib/types';

interface ICart {
  cartItem: ICartElement;
  cart: ICartElement[];
  cartTotalAmount: number;
  isDelivering: boolean;
  deliveryFee: number;
  totalAmount: number;
}

// Define the initial state using that type
const initialState: ICart = {
  cartItem: { id: 0, imageUrl: "", ingredients: [], name: "", soldOut: false, unitPrice: 0, count: 1, totalPrice: 0 },
  cart: [],
  cartTotalAmount: 0,
  isDelivering: true,
  deliveryFee: 0,
  totalAmount: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItem: (state, action: PayloadAction<ICartElement>) => {
      state.cartItem = action.payload;
    },
    resetCartItem: (state) => {
      state.cartItem = initialState.cartItem;
    },
    updateCart: (state, action: PayloadAction<number>) => {
      const pizzaID = state.cart.some(
        (item) => item.id === action.payload,
      );
      if (pizzaID) {
        state.cart = state.cart.filter(item => item.id !== action.payload);

      } else {
        state.cart.push(state.cartItem);
      }
    },
    orderCountIncrease: (state, action: PayloadAction<number>) => {
      const pizza = state.cart.find((item) => item.id === action.payload);
      if (pizza) {
        pizza.count++;
        pizza.totalPrice = pizza.count * pizza.unitPrice;
      }
    },
    orderCountDecrease: (state, action: PayloadAction<number>) => {
      const pizza = state.cart.find((item) => item.id === action.payload);
      if (pizza && pizza.count > 1) {
        pizza.count--;
        pizza.totalPrice = pizza.count * pizza.unitPrice;
      } else {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    },
    calculateCartTotalAmount: (state) => {
      state.cartTotalAmount = state.cart.reduce((total, item) => {
        return total + item.totalPrice;
      }, 0);
    },
    setIsDelivering: (state) => {
      state.isDelivering = !state.isDelivering;
    },
    calculateDeliveryFee: (state) => {
      const charge = state.cartTotalAmount * 3 / 100;
      state.deliveryFee = state.isDelivering ? charge : 0;
    },
    calculateTotalAmount: (state) => {
      state.totalAmount = state.cartTotalAmount + state.deliveryFee;
    },
    resetTotalAmount: (state) => {
      state.totalAmount = initialState.totalAmount;
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
})

export const { updateCart, updateCartItem, orderCountIncrease, orderCountDecrease, calculateCartTotalAmount, calculateDeliveryFee, setIsDelivering, calculateTotalAmount, clearCart, resetCartItem, resetTotalAmount } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const cartData = (state: RootState) => state.cart.cart;
export const cartItem = (state: RootState) => state.cart.cartItem;
export const cartTotalAmount = (state: RootState) => state.cart.cartTotalAmount;
export const isDelivering = (state: RootState) => state.cart.isDelivering;
export const deliveryFee = (state: RootState) => state.cart.deliveryFee;
export const totalAmount = (state: RootState) => state.cart.totalAmount;

export default cartSlice.reducer