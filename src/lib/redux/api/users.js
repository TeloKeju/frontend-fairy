import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getUserById = createAsyncThunk(
  "users/getAllUsers",
  async (paylaod) => {
    try {
      const response = await fairyApi.get(`users/${paylaod}`);

      if (response.data) {
        return response.data;
      }

      throw new Error();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    users: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = action.error;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
