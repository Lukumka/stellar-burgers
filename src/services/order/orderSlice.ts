import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

type OrderState = {
  order: TOrder | null;
  name: string;
  isRequest: boolean;
};

const initialState: OrderState = {
  order: null,
  name: '',
  isRequest: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.isRequest = false;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.name = action.payload.name;
        state.isRequest = false;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isRequest = false;
      });
  }
});
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
