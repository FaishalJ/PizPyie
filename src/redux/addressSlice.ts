import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store';
import { ILocation } from '../lib/types';

interface IAddress {
  address: ILocation;
  isChangingAddress: boolean;
  continueOrder: boolean;
}

// Define the initial state using that type
const initialState: IAddress = {
  address: {formatted: "", county: "", country: "", suburb: "", city: "", street: ""},
  isChangingAddress: false,
  continueOrder: false,
}

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<ILocation>) => {
      state.address = action.payload
    },
    updateIsChangingAddress: (state, action: PayloadAction<boolean>) => {
      state.isChangingAddress = action.payload
    },
    updateContinueOrder: (state, action: PayloadAction<boolean>) => {
      state.continueOrder = action.payload
    },
  },
})

export const { updateAddress, updateIsChangingAddress, updateContinueOrder } = addressSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const addressData = (state: RootState) => state.address.address;
export const isChangingAddress = (state: RootState) => state.address.isChangingAddress;
export const continueOrder = (state: RootState) => state.address.continueOrder;

export default addressSlice.reducer