import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
export const selectItems = (state: RootState) => state.ingredients.items;

export const selectBuns = createSelector([selectItems], (items) =>
  items.filter((i) => i.type === 'bun')
);

export const selectMains = createSelector([selectItems], (items) =>
  items.filter((i) => i.type === 'main')
);

export const selectSauces = createSelector([selectItems], (items) =>
  items.filter((i) => i.type === 'sauce')
);

export const selectIngredient = (id: string) =>
  createSelector([selectItems], (items) => items.find((i) => i._id === id));

export const selectIsIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
