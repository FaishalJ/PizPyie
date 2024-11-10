import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { IPizza } from '../lib/types';

interface IMenuState {
  menu: IPizza[];
  searchText: string;
}

// Define the initial state using that type
const initialState: IMenuState = {
  menu: [],
  searchText: "",
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IPizza[]>) => {
      state.menu = action.payload
    },
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
  },
})

export const { add, updateSearchText } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const menuData = (state: RootState) => state.menu.menu;
export const searchText = (state: RootState) => state.menu.searchText;

export default menuSlice.reducer