import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { sendOrder } from './orderThunks';

type OrderState = {
  order: TOrder | null;
  name: string;
  isRequest: boolean;
  error: null | string;
};

export const initialState: OrderState = {
  order: null,
  name: '',
  isRequest: false,
  error: null
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
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.name = action.payload.name;
        state.isRequest = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isRequest = false;
        state.error = action.payload as string;
      });
  }
});
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
