import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeed, fetchOrder } from './feedThunks';

type feedState = {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
  current: TOrder | null;
  feed: {
    totalToday: number;
    total: number;
  };
};

export const initialState: feedState = {
  isLoading: true,
  error: null,
  orders: [],
  current: null,
  feed: {
    totalToday: 0,
    total: 0
  }
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = !action.payload.success;
        state.orders = action.payload.orders;
        state.feed.totalToday = action.payload.totalToday;
        state.feed.total = action.payload.total;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = !action.payload.success;
        state.current = action.payload.orders[0];
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
