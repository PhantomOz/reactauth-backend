import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountinfoService from "./accountinfoService";

const initialState = {
  accountinfos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
//Create new accountinfo
export const createAccountinfo = createAsyncThunk(
  "accountinfos/create",
  async (accountinfoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountinfoService.createAccountinfo(accountinfoData, token);
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
//Get user accountinfo
export const getAccountinfos = createAsyncThunk(
  "accountinfos/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountinfoService.getAccountinfos(token);
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
//Delete user accountinfo
export const deleteAccountinfo = createAsyncThunk(
  "accountinfos/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountinfoService.deleteAccountinfo(id, token);
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
export const accountinfoSlice = createSlice({
  name: "accountinfo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountinfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAccountinfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountinfos.push(action.payload);
      })
      .addCase(createAccountinfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAccountinfos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAccountinfos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountinfos = action.payload;
      })
      .addCase(getAccountinfos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAccountinfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccountinfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountinfos = state.accountinfos.filter(
          (accountinfo) => accountinfo._id !== action.payload.id
        );
      })
      .addCase(deleteAccountinfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = accountinfoSlice.actions;
export default accountinfoSlice.reducer;
