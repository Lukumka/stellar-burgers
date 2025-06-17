import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  TFeedsResponse,
  TOrderResponse
} from '@api';

export const fetchFeed = createAsyncThunk<TFeedsResponse>(
  'feed/fetchFeed',
  async (_, thunkAPI) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка загрузки заказов');
    }
  }
);

export const fetchOrder = createAsyncThunk<TOrderResponse, number>(
  'feed/fetchOrder',
  async (number: number, thunkAPI) => {
    try {
      return await getOrderByNumberApi(number);
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка загрузки заказа');
    }
  }
);
