import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi, TIngredientsResponse } from '@api';

export const fetchIngredients = createAsyncThunk<TIngredientsResponse>(
  'ingredients/fetch',
  async (_, thunkApi) => {
    try {
      return await getIngredientsApi();
    } catch (e) {
      return thunkApi.rejectWithValue('Ошибка загрузки ингредиентов');
    }
  }
);
