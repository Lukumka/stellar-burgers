import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, TFeedsResponse } from '@api';

export const getUserFeed = createAsyncThunk<TFeedsResponse>(
  'userFeed/getUserFeed',
  async (_, thunkAPI) => {
    try {
      return await getOrdersApi();
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка загрузки заказов пользователя');
    }
  }
);
