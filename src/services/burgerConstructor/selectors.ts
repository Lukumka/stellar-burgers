import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

const selectItems = (state: RootState) => state.burgerConstructor;

export const selectIngredients = createSelector([selectItems], (items) => ({
  bun: items.bun,
  ingredients: items.ingredients
}));
