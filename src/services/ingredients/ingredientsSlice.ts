import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi, TIngredientsResponse } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredientsResponse>(
  'ingredients/fetch',
  getIngredientsApi
);

type IngredientsState = {
  isLoading: boolean;
  items: TIngredient[];
};

const initialState: IngredientsState = {
  isLoading: false,
  items: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = !action.payload.success;
    });
  }
});

export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
