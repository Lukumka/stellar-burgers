import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type constructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderIngredients: string[];
};

export const initialState: constructorState = {
  bun: null,
  ingredients: [],
  orderIngredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveUpIngredient: (state, action) => {
      const index = action.payload;
      const [movedItem] = state.ingredients.splice(index, 1);
      state.ingredients.splice(index - 1, 0, movedItem);
    },
    moveDownIngredient: (state, action) => {
      const index = action.payload;
      const [movedItem] = state.ingredients.splice(index, 1);
      state.ingredients.splice(index + 1, 0, movedItem);
    },
    parseIngredientIds: (state) => {
      if (state.bun?._id) {
        const bun = state.bun._id;
        const filling = state.ingredients.map((item) => item._id);
        state.orderIngredients = [bun, ...filling, bun];
      }
    },
    clearIngredients: (state) => {
      state.orderIngredients = [];
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  parseIngredientIds,
  clearIngredients
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
