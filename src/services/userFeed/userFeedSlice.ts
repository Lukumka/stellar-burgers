import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getUserFeed } from './userFeedThunks';

type feedState = {
  isLoading: boolean;
  error: null | string;
  orders: TOrder[];
};

export const initialState: feedState = {
  isLoading: false,
  error: null,
  orders: []
};

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getUserFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const {} = userFeedSlice.actions;
export default userFeedSlice.reducer;
