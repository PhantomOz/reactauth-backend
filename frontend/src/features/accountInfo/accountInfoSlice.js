import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountInfoService from "./accountInfoService";
const initialState = {
  accountInfo: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
//create new accountInfo
export const createAccountInfo = createAsyncThunk(
  "accountInfo/create",
  async (text, thunkAPI) => {
    try {
      console.log(text);
      const token = thunkAPI.getState().auth.user.token;
      return await accountInfoService.createAccountInfo(text, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Get Existing accountInfo
export const getAccountInfo = createAsyncThunk(
  "accountInfo/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountInfoService.getAccountInfo(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);
//Delete Existing accountInfo
export const deleteAccountInfo = createAsyncThunk(
  "accountInfo/delete",
  async (accountInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountInfoService.deleteAccountInfo(accountInfo, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);
export const accountInfoSlice = createSlice({
  name: "accountInfo",
  initialState,
  reducers: {
    reset: (state) => initialState,
    getAccountInfo: (state) => state.accountInfo,
    createAccountInfo: (state) => state.accountInfo,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccountInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountInfo.push(action.payload);
      })
      .addCase(createAccountInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getAccountInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountInfo = action.payload;
      })
      .addCase(getAccountInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteAccountInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccountInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountInfo = state.accountInfo.filter(
          (accountInfo) => accountInfo._id !== action.payload.id
        );
      })
      .addCase(deleteAccountInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = accountInfoSlice.actions;
export default accountInfoSlice.reducer;
