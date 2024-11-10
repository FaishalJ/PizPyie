import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store';

interface ISort {
  alphabetSort: string;
  ingredientSort: string;
  viewSort: string;
  priceBar: number;
}

// Define the initial state using that type
const initialState: ISort = {
  alphabetSort: "a-z",
  ingredientSort: "all",
  viewSort: "Grid",
  priceBar: 16,
}

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    updateAlphabetSort: (state, action: PayloadAction<string>) => {
      state.alphabetSort = action.payload
    },
    updateIngredientSort: (state, action: PayloadAction<string>) => {
      state.ingredientSort = action.payload
    },
    updateViewSort: (state, action: PayloadAction<string>) => {
      state.viewSort= action.payload
    },
    updatePriceBar: (state, action: PayloadAction<number>) => {
      state.priceBar= action.payload
    }
  },
})

export const { updateAlphabetSort, updateIngredientSort, updateViewSort, updatePriceBar } = sortSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const alphabetSort = (state: RootState) => state.sort.alphabetSort;
export const ingredientSort = (state: RootState) => state.sort.ingredientSort;
export const viewSort = (state: RootState) => state.sort.viewSort;
export const pricebar = (state: RootState) => state.sort.priceBar;

export default sortSlice.reducer