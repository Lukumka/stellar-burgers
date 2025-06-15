import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getFeedsApi,
  getOrderByNumberApi,
  TFeedsResponse,
  TOrderResponse
} from '@api';

export const fetchFeed = createAsyncThunk<TFeedsResponse>(
  'feed/fetchFeed',
  getFeedsApi
);

export const fetchOrder = createAsyncThunk<TOrderResponse, number>(
  'feed/fetchOrder',
  async (number) => await getOrderByNumberApi(number)
);

type feedState = {
  isLoading: boolean;
  orders: TOrder[];
  current: TOrder | null;
  feed: {
    totalToday: number;
    total: number;
  };
};

const initialState: feedState = {
  isLoading: true,
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
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = !action.payload.success;
        state.orders = action.payload.orders;
        state.feed.totalToday = action.payload.totalToday;
        state.feed.total = action.payload.total;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = !action.payload.success;
        state.current = action.payload.orders[0];
      });
  }
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
