import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './pizzaMenuSlice';
import addressReducer from './addressSlice';
import sortReducer from './sortSlice';
import cartReducer from './cartSlice';
import orderHistryReducer from './orderHistrySlice';
import loginReducer from './loginSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    address: addressReducer,
    sort: sortReducer,
    cart: cartReducer,
    orderHistry: orderHistryReducer,
    login: loginReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch