import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: string[], thunkAPI) => {
    try {
      return await orderBurgerApi(data);
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка оформления заказа');
    }
  }
);
