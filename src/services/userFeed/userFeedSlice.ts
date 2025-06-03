import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, TFeedsResponse } from '@api';

export const getUserFeed = createAsyncThunk<TFeedsResponse>(
  'userFeed/getUserFeed',
  async (_, thunkAPI) => {
    try {
      return await getOrdersApi();
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('');
    }
  }
);

type feedState = {
  isLoading: boolean;
  orders: TOrder[];
};

const initialState: feedState = {
  isLoading: false,
  orders: []
};

const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const {} = userFeedSlice.actions;
export default userFeedSlice.reducer;
