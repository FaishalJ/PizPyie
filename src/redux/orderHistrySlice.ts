import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { IClientDetails, ICartElement } from '../lib/types';

interface IOrderHistry {
  orderHistryItem: IClientDetails;
  orderHistry: IClientDetails[];
}

const initialState: IOrderHistry = {
  orderHistryItem: { name: "", email: "", phone: "", address: "", date: "", orderId: "", deliver: 0, total: 0, cart: [] },
  orderHistry: [],
}

export const orderHistrySlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    updateOrderHistryItem: (state, action: PayloadAction<IClientDetails>) => {
      state.orderHistryItem = action.payload;
    },
    updateOrderHistry: (state, action: PayloadAction<string>) => {
      const newOrderID = state.orderHistry.some((item) => item.id === action.payload);
      if (newOrderID) {
        state.orderHistry = state.orderHistry.filter(item => item.id !== action.payload)
      } else {
        state.orderHistry.push(state.orderHistryItem);
      }
    },
  },
})

export const { updateOrderHistryItem, updateOrderHistry } = orderHistrySlice.actions
export const orderHistry = (state: RootState) => state.orderHistry.orderHistry;

export default orderHistrySlice.reducer
