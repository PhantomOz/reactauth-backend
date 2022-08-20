import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accountInfoReducer from "../features/accountInfo/accountInfoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accountInfo: accountInfoReducer,
  },
});
