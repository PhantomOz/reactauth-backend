import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accountinfoReducer from "../features/accountinfos/accountinfoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accountinfos: accountinfoReducer,
  },
});
