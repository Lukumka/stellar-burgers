import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './ingredientsThunks';

type IngredientsState = {
  isLoading: boolean;
  error: null | string;
  items: TIngredient[];
};

export const initialState: IngredientsState = {
  isLoading: false,
  error: null,
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
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});

export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
