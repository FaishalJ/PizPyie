import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store';
import { ILoginInput } from '../lib/types';

interface ILogin {
  login: ILoginInput;
  isLogIn: boolean;
  isGuest: boolean;
  showLogout: boolean;
}

// Define the initial state using that type
const initialState: ILogin = {
  login: {name: "", email: ""},
  isLogIn: false,
  isGuest: false,
  showLogout: false
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLogin: (state, action: PayloadAction<ILoginInput>) => {
      state.login = action.payload
    },
    updateIsLogin: (state) => {
      state.isLogIn = state.login.email !== "" && state.login.name !== "";
    },
    updateIsGuest: (state, action: PayloadAction<boolean>) => {
      state.isGuest = action.payload;
    },
    updateShowLogout: (state, action: PayloadAction<boolean>) => {
      state.showLogout = action.payload;
    },
    logout: (state) => {
      state.login = initialState.login;
    },
  },
})

export const { updateLogin, updateIsLogin, updateIsGuest, updateShowLogout, logout } = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const login = (state: RootState) => state.login.login;
export const isLogIn = (state: RootState) => state.login.isLogIn;
export const isGuest = (state: RootState) => state.login.isGuest;
export const showLogout = (state: RootState) => state.login.showLogout;

export default loginSlice.reducer